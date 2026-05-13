# 日期选择器面板 DatePickerPanel

用于展示月份日期网格并选择日期。

## 基础用法

```vue
<XDatePickerPanel v-model="date" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前日期 | `string` | - |
| year | 展示年份 | `number` | 当前年份 |
| month | 展示月份 | `number` | 当前月份 |
