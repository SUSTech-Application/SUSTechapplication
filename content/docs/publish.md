# 帖子发表工作流程

这篇文档解读飞跃手册的审稿、编辑、发布流程，为编辑们的工作提供规范化指导。经验分享作者们也可以了解该流程并完成其中的部分甚至全部步骤。

## 预先准备

- 创建自己的 fork，并 clone 到本地
- 安装一个 Node.js 包管理器，飞跃手册建议使用 [Bun](https://bun.sh)，请查看 Bun 文档以了解安装方法。
- 进入仓库所在的文件夹，并安装依赖：`bun install`
- 推荐审稿人使用 [VSCode](https://code.visualstudio.com) 来编辑文件。本项目仓库中已经预置了 VSCode 推荐配置和推荐的插件，请安装推荐的插件以实现所有功能。

## 稿件提交

作者可能以两种方式提交稿件：

- 直接提交 PR，此种情况下，直接在 PR 上进行工作即可。
- 将帖子文件发送给维护团队，文件格式可能为：
  - Markdown 文件
  - 其他类型

作者提交的文件不为 Markdown 格式的，应先转换为 Markdown 格式。可用的工具包括微软开发的 [MarkItDown](https://github.com/microsoft/markitdown) 和其他各种基于生成式 AI 的工具等。

如作者已提交了 PR，维护者可通过 [GitHub 命令行工具](https://cli.github.com)快速地切换到 PR 分支进行后续工作。安装该工具并配置完成后，可进行如下操作：

```sh
gh pr list        # 列出仓库中的 PR
gh pr checkout <id> # 切换到指定的 PR
```

其他情况下，需要维护者手动创建 PR：

```sh
git checkout -b post/<id> upstream/master # 从上游仓库的主分支建立新分支
# 将文件放置在合适的位置
git add <files> # 将新增的文件添加到 staging area
git commit -m "add files for ..." # 提交更改，始终填写有意义的 commit message
git push -u upstream post/id
gh pr create # 创建 PR，注意目标为上游仓库的主分支
```

建议在添加了第一个 commit 之后就及时提交 PR，以方便团队协作和查看预览。

## Prettier 格式化

飞跃手册使用 [Prettier](https://prettier.io) 格式化所有代码和帖子以确保代码质量与可维护性。你可以通过运行 `bun run format` 来检查是否有文件存在格式问题。如果你正确配置了 VSCode，未被正确格式化的文档将会提示问题，且文件会在被保存时就自动格式化。

## 盘古格式化

<!-- cSpell:words pangu -->

除了使用 Prettier 进行格式化外，还应该使用「盘古」进行格式化，即在中文汉字和西文字母之间插入空格，以提升阅读体验。VSCode 中有许多插件执行这个功能，这里并不指定使用的插件，作者和审稿人可自行以 "pangu" 为关键词搜索。

## Markdown Lint

除了格式化之外，本项目还使用 [Markdown Lint](https://github.com/DavidAnson/markdownlint) 来确保 Markdown 文件符合一定的行文规范，提升用户的阅读体验。你可以通过运行 `bun run lint:md` 来检查是否有贴文有 Markdown 格式问题。

除了 Markdown Lint 中明确列出的规则之外，作者和审稿人也可以做出其他的调整，以提升读者的阅读体验。例如：

- 短句子并列的，应该使用有序或无序列表
- 长段落并列的，应使用小标题而非列表
- 非引用内容，则不应该使用普通引用
- 作者需要强调段落的，可以适时地使用 callout
- 正确使用超链接
- 使用相对路径而非绝对路径引用其他贴文
- ...

## 拼写检查

为了确保文档的准确性，我们还使用 [cSpell](https://cspell.org) 进行拼写检查。你可以通过运行 `bun run spellcheck` 来检查文档中的拼写错误。如果有正确的单词被识别为拼写错误（这种情况在缩写中尤为常见），需要手动将他们加入字典中，即需要在文档中（推荐在这个词第一次使用的段落前）添加一行注释：

```markdown
<!-- cSpell:words UAB UCD UEF -->

我申请了这几个学校：UAB、UCD、UEF……
```

通过这行注释，文中提到的单词将会被正确识别。一些会被大量重复使用的单词（如 `sustech`、`SDIM`），可以将他们添加到项目的全局字典 `words.txt` 文件中。

## 其他注意事项

- 由于新版网站不再依赖于标题进行导航且可以通过元数据显示更丰富的内容，作者现在可以为经验分享起更有意义的标题，而不再只是列举年纪、地区、学校、专业等。审稿人应该鼓励作者起更有描述性、趣味性的标题。
- 持续集成系统会自动检查各种错误，如果出错，可查看日志了解具体原因。

## 帖子发布

审稿人确认无误后，应将预览链接发送给原作者，请他们确认最终呈现效果。如无误，审稿人可申请其他维护者进行 code review，批准后，审稿人即可选择合并 PR，新帖子自动上线。
