# 分割线 Divider

用于分隔内容区域，支持水平、垂直、标题文本和线型。

## 基础用法

```vue
<XDivider>标题</XDivider>
文本 <XDivider direction="vertical" /> 文本
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 方向 | `horizontal \| vertical` | `horizontal` |
| contentPosition | 文本位置 | `left \| center \| right` | `center` |
| borderStyle | 线型 | `solid \| dashed \| dotted` | `solid` |
| spacing | 外边距间距 | `number \| string` | 水平 `16px`，垂直 `8px` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 水平分割线中的文本 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDivider / `DividerProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
