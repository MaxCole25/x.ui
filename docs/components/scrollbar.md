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
