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
