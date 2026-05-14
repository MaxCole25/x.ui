# 日期时间选择器 DateTimePicker

用于选择日期和时间。

## 基础用法

```vue
<XDateTimePicker v-model="dateTime" />
```

## 输入框与弹窗

日期时间选择器的输入框直接复用 `XInput`，点击输入框会通过可拖动的 `XDialog` 打开自定义日期时间选择界面，不使用浏览器原生 `datetime-local` 选择器。

日期部分复用 `XDatePickerPanel`，默认显示中国传统节日和二十四节气；时间部分放在日历右侧，参考 Vant TimePicker 的滚轮选择体验，提供小时、分钟两列竖向数字选择器。拖动滚动列会自动吸附到最近选项，也可以点击数字直接选择，点击“确定”后统一提交 `YYYY-MM-DD HH:mm` 格式的值。

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前日期时间 | `string` | - |
| placeholder | 占位文本 | `string` | `请选择日期时间` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 输入框尺寸 | `'sm' \| 'md' \| 'lg'` | - |
| status | 输入框状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| prefix | 前缀文本，会显示在默认日期时间图标后 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| showChinaFestivals | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` |
| festivals | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, { name: string; type: 'festival' \| 'solar-term' \| 'custom' }>` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 日期时间值更新时触发 | `(value: string)` |
| input | 输入或确认选择时触发 | `(value: string)` |
| change | 输入内容变化或确认选择时触发 | `(value: string)` |
| clear | 点击清除按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容，未传入时显示默认日期时间图标 |
| suffix | 输入框后缀内容 |
