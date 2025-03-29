---
date: 2025-03-28
---

# 井号路径兼容性

作者：[黄冠超](https://sghua.ng) (<hi@sghua.ng>)

飞跃手册过去使用 [Docsify](https://docsify.js.org/#/) 作为引擎，但因为一些已不能考据的技术原因，网站使用了 `hash` 模式进行路由（参考 [`routerMode`](https://docsify.js.org/#/configuration?id=routermode)）。这意味着所有路径都会以井号开头，如 `domain.com/#/path`。

迁移到 VitePress 之后，这个问题已经不复存在，但我们仍然需要保持最大的兼容性，确保过去的链接依然能正常使用。

## 客户端重定向

最直接的解决方法是在客户端进行重定向：

```ts
// .vitepress/theme/index.ts
export default {
  enhanceApp({ router }) {
    router.onAfterRouteChange = async (to) => {
      const hashPath = /^\/#\/(.+)\/?$/.exec(to);
      if (hashPath) {
        console.warn("Hash path is deprecated, redirecting...");
        await router.go(hashPath[1]);
      }
    };
    // ...
  },
} satisfies Theme;
```

## 尝试：CDN URL 重写

我们始终尝试将更多的复杂度从客户端移动到服务端。由于没有我们采用无服务器模式，网站静态托管在对象存储中，因此只能借助于 CDN 来实现。

阿里云 CDN 提供一些 URL 重写规则，可以利用正则表达式进行简单的匹配和改写。使用 [clean url](clean-url) 访问网站，就是基于此实现的。我们自然想要进行尝试。具体而言，需要将 `^/#/(.*)` 重写为 `/$1`。

然而，这个解决方案并不起效——似乎这个正则表达式并没有匹配到任何内容。

## 尝试：EdgeScript 规则

阿里云 CDN 还提供通过 EdgeScript 添加规则的选项。我们尝试如下：

```php
pcs = capture_re($uri, '^/#/(.+)$')
path = get(pcs, 1)
if path {
    dst = concat('/', $path)
    rewrite(dst, 'redirect')
}
```

而这依然不起作用，通过调试，发现这个正则表达式依然没有匹配到任何内容，因此规则也没有被执行。

## 结论

到这里，终于意识到，`$uri` 只包含了路径本身，而不包含路径后的其他参数以及 anchor！

在普通的 CDN 之外，阿里云还提供了 [边缘加速 ESA](https://cn.aliyun.com/product/esa) 服务，其所包含的边缘函数或许可以提供更细粒度的控制，并实现我们所需的功能。不过，其最基础版本一年的价格也「高达」80 余元人民币——这是相对于我们静态部署一个月耗资 1 元左右而言的——因此也作罢了。
