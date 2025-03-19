---
sidebar: false
---

# 如何在飞跃手册进行经验分享

感谢你查看这份指南并着手分享你的经验！要进行分享，主要有三个方法：

- 通过 GitHub Pull Request 进行贡献（推荐），具体有两种方式：
  - 直接在 GitHub 网页上进行编辑，或者
  - Fork 本仓库，clone 到本地，修改，发起 PR（**强烈推荐**）
- 上传文件（**不推荐**）：在网站 GitHub 仓库中新建一个 Issue，并上传你的帖子文件，或直接将文件发送给我们。建议使用 Markdown（`.md`）文件，其他文件格式也可。

## 关于 Markdown

飞跃手册中的页面使用 Markdown 撰写。Markdown 是一个被广泛使用的标记语言（markup language），它允许你使用纯文本来创建带有简单格式的文档，实现样式与内容的分离。如果你暂不熟悉 Markdown，可以参考以下内容：

- 飞跃手册其他帖子的[源代码](https://github.com/SUSTech-Application/SUSTechapplication/tree/master/docs)
- 由飞跃手册维护者撰写的经验分享[范例](grad-application/microelectronics/[US]-19-huangguanchao)
- [Markdown 基本语法](https://markdown.com.cn/basic-syntax/)

::: tip
请不要被「代码」、「语法」吓倒！Markdown 格式简单明了，可以被迅速掌握，也许你在了解它之后，会有相见恨晚之感，并迫不及待地把它应用到飞跃手册之外的学习、工作中！
:::

除了 Markdown 通行的一些语法外，VitePress 还支持一些「方言」，可以让你的经验分享更多样，具体请查看[Markdown 扩展 | VitePress 文档](https://vitepress.dev/zh/guide/markdown)。如果你熟悉 Vue，甚至可以在经验分享中使用一些 Vue 组件，给读者留下更深的印象！详见[在 Markdown 使用 Vue | VitePress 文档](https://vitepress.dev/zh/guide/using-vue)。

:::info
飞跃手册指定使用 [PrimeVue](https://primevue.org) 作为组件库。你可以自行撰写一些组件，但除非有迫切的需要，我们不会向网站中添加新的的依赖。同理，如果你需要添加 markdown-it 插件，也请与维护者联系。
:::

## 在 GitHub 网页上进行编辑

下文假定你已经拥有并且登录了 GitHub 账号。你也可以先[注册账号](https://github.com/signup)。

::: warning
GitHub 的用户界面可能在本指南发布后有所变动，请以实际为准。如遇到问题，欢迎在[讨论区](https://github.com/SUSTech-Application/SUSTechapplication/discussions)提出。
:::

1. 访问我们的[仓库](https://github.com/SUSTech-Application/SUSTechapplication/tree/master/docs/)，并进入你的分享所属的文件夹，如 `grad-application/computer-science-and-engineering`。
2. 点击右上角 `Add file`
   - 如果要在网页上进行编辑，选择 `Create new file`
   - 如果你已经在本地撰写好了 Markdown 格式的经验分享，也可以选择 `Upload files`
3. 若选择在网页上进行编辑，请填写内容，文件名应为 `[地区]-年级-姓名.md`，如 `[US]-15-yanxiangyi.md`。
4. 选择 `Commit changes`。
5. 在 `Commit message` 中概括你的更改，你也可以在 `Extended description` 中进一步描述你的分享。
6. 点击 `Propose changes`。
7. 为 PR 设置标题，例如 `post: [US]-15-yanxiangyi`。你也可以添加描述，进一步介绍你的分享，或者添加给维护者的消息。
8. 确保侧边栏中的 `Allow edits from maintainers` 被勾选。
9. 点击`Create pull request`。

到此，PR 就已经创建完成！维护者将会查看 PR，进行调整，确认无误后将其合并到主分支，网站更新即完成。提交 PR 后，你可以继续在 PR 上进行修改。[Netlify](https://netlify.com) 将会在 PR 中自动添加一条评论，你可以通过点击评论中的预览链接查看网页实际效果。

## 上传非 Markdown 文件（不推荐）

- 撰写经验分享帖子
- 在仓库中[创建新 Issue](https://github.com/SUSTech-Application/SUSTechapplication/issues/new)，并将你的帖子作为附件上传。
- 如果你不希望使用 GitHub，也可以直接将文件发送给维护者。

::: warning 为什么不推荐使用非 Markdown 格式进行分享？

- 飞跃手册维护者们需要处理大量帖子以及对网站进行升级，维护。尤其是将帖子从其他格式转换为 Markdown 十分耗费时间。撰写 Markdown 文件，通过 GitHub 提交 PR 进行分享，将大大减轻维护者们的负担。
- 通过 GitHub 贡献，可以提供更好的编辑体验，你将能够使用 Markdown 语法及其拓展，预览网站效果，确保网页的最终效果符合你的期待，并与社群进行讨论。
- 通过 GitHub 贡献，可以让你成为 本项目的 GitHub contributors 之一，你的头像和用户名将会出现在贡献者列表中。
- 通过 GitHub 贡献，可以让你体验开源项目的工作流程，了解 git 的使用，也是一份有趣的经历！

:::

## 写在最后

首先请我们代表学弟学妹们，感谢你愿意分享自己宝贵的经历，同时我们也要感谢你选择了自食其力的方式，这为我们节省了大量格式转换的时间，现在我们只需专注于修改、审核即可。同时我们要恭喜你拥有了自己的`Github`账号并且了解了`.md`也就是`Markdown`这种神奇的事物。希望这个账号不会就此荒废，因为`Github`是这个世界上最富饶的代码库，你几乎可以找到任何你想要的东西。

最后，祝前程似锦。
