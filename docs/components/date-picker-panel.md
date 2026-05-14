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
| showChinaFestivals | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` |
| festivals | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, { name: string; type: 'festival' \| 'solar-term' \| 'custom' }>` | - |

## 传统日期显示

面板默认显示中国传统日期信息，包括春节、元宵、端午、中秋、重阳等农历节日，以及小寒、大寒、立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至二十四节气。面板不显示每年变化的法定放假和调休上班安排。

```vue
<XDatePickerPanel
  v-model="date"
  :year="2026"
  :month="10"
/>
```
