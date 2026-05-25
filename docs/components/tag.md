# 标签 Tag

用于标记状态、分类和轻量提示，支持关闭事件和自定义颜色。

## 基础用法

```vue
<XTag>默认标签</XTag>
<XTag type="success" closable @close="handleClose">成功</XTag>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `primary \| success \| warning \| danger \| info` | `primary` |
| effect | 显示效果 | `light \| dark \| plain` | `light` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| closable | 是否可关闭 | `boolean` | `false` |
| round | 是否圆角胶囊 | `boolean` | `false` |
| hit | 是否用当前颜色描边 | `boolean` | `false` |
| disabled | 是否禁用交互 | `boolean` | `false` |
| color | 自定义主题色 | `string` | - |

## Events

| 名称 | 说明 |
| --- | --- |
| click | 点击标签时触发 |
| close | 点击关闭按钮时触发 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XTag / `TagProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
