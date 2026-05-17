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
