---
date: 2025-03-19
---

# 通过 Clean URL 访问飞跃手册

作者：[黄冠超](https://sghua.ng) (<hi@sghua.ng>)

飞跃手册的访问看似直白，实则是由许多技术细节所支撑的。例如，如何通过不带 `.html` 后缀的链接正常访问飞跃手册？

## 问题

浏览器需要通过访问 `.html` 文件来渲染网页，而 URL 正是这个 HTML 文件的「地址」。然而，每次都添加 `.html` 后缀来访问帖子，不太优雅。

VitePress 提供了一个 [`cleanUrls`](https://vitepress.dev/guide/routing#generating-clean-url) 选项，使得在站内导航时，网页链接可以不带 `.html` 后缀。但在实际部署中，也需要平台支持这个的功能才行。Netlify 和 Vercel 都提供了相关选项，飞跃手册过去使用的 Nginx 也提供这个配置。不过，在飞跃手册迁移到基于对象存储的静态网页托管之后，阿里云 OSS 就并不提供这个配置了——也好理解，对象存储应该只是负责文件读写的，对这样的网页业务逻辑并不负责。

问题的具体表现，是通过点击站内访问帖子时，所有帖子可以正常加载。而若复制网页链接再打开，或是刷新网页，则帖子内容为空，检查控制台，报错 404 Not Found。

## 方案 1：改写 404 时重定向逻辑

注意到，既然错误是由 404 引发的，即我需要 `/path/post`，但这个资源不存在，实际上只有 `/path/post.html`，我们可以通过修改 404 页面上的脚本，来进行一次重定向，通过添加上 `.html` 后缀来正常访问真实的资源。这个解决方按在 [#165](https://github.com/SUSTech-Application/SUSTechapplication/pull/165) 中实现。

需要向 `404.html` 的 `<head>` 中添加这个脚本：

```js
if (
  !window.location.pathname.endsWith(".html") &&
  !window.location.pathname.endsWith("/")
) {
  window.location.href =
    window.location.pathname + ".html" + window.location.search;
}
```

通过这个脚本实现：

```sh
FILE=".vitepress/dist/404.html"

cat > script.txt << EOL
<script>
  ...
<script>
EOL

cp "$FILE" "$FILE.bak"

awk '{
  if (match($0, "</head>")) {
    while (getline line < "script.txt") {
      print line
    }
    close("script.txt")
  }
  print $0
}' "$FILE.bak" > "$FILE"

rm script.txt "$FILE".bak
```

在 `build` 命令中添加：

```json
"build": "./scripts/bracket-routes-fix.sh && vitepress build && ./scripts/404-html.sh",
```

这个方案成功解决了问题，不过还不够「优雅」：

- 404 报错依然会产生，我们只是在错误发生后，再进行一次重定向。
- 用户在刷新网页，或者直接通过链接访问时，由于几次重定向，响应速度会受影响。
- 最后网页成功加载时，地址栏里依然会有 `.html` 后缀——只解决了访问问题，但依然不够 "clean"。

## 方案 2：利用 CDN 改写访问 URL

在引入了 CDN 之后，我们总算可以对用户访问的 URL 进行一些网络边缘上的操作，同时所有细节对用户全部透明。简言之，我们使用正则表达式匹配用户的 URL，添加 `.html` 后缀，利用这个真实地址查找缓存或进行回源。浏览器使用的是「干净」的地址，但是依然能拿到真实的资源文件——地址栏中的链接不会被添加上后缀！

在 CDN 配置中，找到「缓存配置」下的「重写访问 URL」。匹配 `^/([^.]*?[^/])$`，改写为 `/$1.html`。即，匹配一个不包含 `.`，且不以 `/` 结尾的地址，在其末尾加上 `.html` 后缀。

为什么强调不以 `/` 结尾？如果网页链接以 `/` 结尾，则 VitePress 和 OSS 会将其理解为一个目录，并且试图寻找目录下的 `index.html` 文件。因此，一些院系的索引，如 `/.../xxx-engineering/`，是必须加上 `/` 才能正常访问的。
