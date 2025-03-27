# 路径格式

## 已弃用的路径格式

> [!WARNING] 已弃用
>
> 这一节中描述的路径格式已在 `v3` 中被弃用。

样例：

- `/grad-application/computer-science-and-engineering/[US]-15-yanxiangyi`
- `/grad-application/finance/financial-engineering/[SG]-16-liyilin`
- `/oversea-program/semester-program/uc_yangzonghao`

### 路径名

路径格式为：`<type>[/<subtype>]/<department>[/<major>]`，其中

- `<type>` 为帖子类别，如 `grad-application`、`oversea-program` 等。
- `<subtype>` 为可选的细分类别，如 `英语学习` 下细分 `TOEFL`、`GRE` 等。
- `<department>` 为院系名称，如 `computer-science-and-engineering`、`microelectronics` 等。
- `<major>` 为可选的专业名称，当一个院系下有多个专业时使用，如 `biology` 下的 `bioinformatics`、`bioscience` 等。

> [!WARNING] 已弃用
>
> 这个格式已被弃用，一来因其过长，二来不应在 URL 中使用 `[]` 等的特殊字符。

### 文件名

文件名格式为：`[<region>]-<year>-<name>`，其中

- `<region>` 为地区代码，如 `US`、`CN`、`HK` 等
- `<year>` 为年级的后两位数字，如 2019 年入学对应 `19`
- `<name>` 为姓名的全拼写，如「李小明」对应 `lixiaoming`。

> [!WARNING] 已弃用
>
> 这个格式已被弃用，一来因其过长，二来不应在 URL 中使用 `[]` 等的特殊字符。
