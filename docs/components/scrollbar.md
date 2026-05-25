# 滚动条 Scrollbar

用于约束内容区域高度并提供统一滚动条样式。

## 基础用法

```vue
<XScrollbar max-height="120px">
  <p>列表项 A</p>
  <p>列表项 B</p>
</XScrollbar>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 固定高度 | `string \| number` | - |
| maxHeight | 最大高度 | `string \| number` | - |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XScrollbar / `ScrollbarProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
