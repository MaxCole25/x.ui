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
