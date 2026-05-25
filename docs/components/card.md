# 卡片 Card

用于承载一组相关内容，可配置头部、底部、边框、背景和阴影。

## 基础用法

```vue
<XCard header="卡片标题" footer="底部内容">
  卡片正文
</XCard>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| header | 头部文本 | `string` | - |
| footer | 底部文本 | `string` | - |
| size | 尺寸规格，仅影响文字大小，不影响卡片内边距与圆角 | `sm \| md \| lg` | `md` |
| shadow | 阴影策略 | `always \| hover \| never` | `always` |
| width | 宽度 | `number \| string` | `100%` |
| height | 高度 | `number \| string` | - |
| bodyStyle | 正文区域样式 | `CSSProperties` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XCard / `CardProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
