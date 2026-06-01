# 头像 Avatar

用于展示用户头像、姓名缩写或自定义头像内容。

## 基础用法

<XAvatar name="UX" />
<XAvatar name="王小明" size="lg" />
<XAvatar icon="user" />
<XAvatar icon="user" icon-variant="fill" icon-full icon-color="#fff" />
<XAvatar name="边框" border-width="2px" border-color="#0f172a" />

```vue
<XAvatar name="UX" />
<XAvatar name="王小明" size="lg" />
<XAvatar icon="user" />
<XAvatar icon="user" icon-variant="fill" icon-full icon-color="#fff" />
<XAvatar name="边框" border-width="2px" border-color="#0f172a" />
```

## 图标头像

`icon` 会交给 `XIcon` 渲染，支持 x.ui 语义别名、Remix Icon 名称和 `ri-` 前缀名称。常规使用只需要引入 `x.ui/style.css`，无需额外引入图标样式。

```ts
import 'x.ui/style.css'
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| name | 显示名称，图片不可用时取前两个字符 | `string` | - |
| icon | 使用 `XIcon` 渲染的图标名称 | `string` | - |
| iconVariant | 图标类型 | `line \| fill` | `line` |
| iconFull | 图标是否撑满头像尺寸 | `boolean` | `false` |
| iconColor | 图标颜色 | `string` | 继承头像文字色 |
| iconTitle | 图标可访问标题 | `string` | - |
| iconSpin | 图标是否旋转 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| shape | 形状 | `circle \| square` | `circle` |
| color | 背景色 | `string` | - |
| borderWidth | 边框粗细，数字会按 px 处理 | `number \| string` | - |
| borderColor | 边框颜色 | `string` | `#fff` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XAvatar / `AvatarProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `alt` | 图片替代文本 | `string` | — |
| `avatarSize` | 公开属性，详见类型定义 | `string \| number` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
