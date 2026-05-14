# 时间选择 TimeSelect

用于从固定时间段中选择时间。

## 基础用法

```vue
<XTimeSelect v-model="time" start="09:00" end="18:00" :step-minutes="30" />
```

## 输入框与弹窗

时间选择的输入框复用 `XInput`，点击输入框会通过可拖动的 `XDialog` 打开自定义时间选择界面，不使用浏览器原生 `select`。

时间面板参考 `XDateTimePicker` 的时间选择样式，但只展示由 `start`、`end` 和 `stepMinutes` 生成的固定时间列表。滚动列表会自动吸附到最近选项，也可以点击选项直接选择，点击“确定”后提交 `HH:mm` 格式的值。

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前时间 | `string` | - |
| start | 起始时间 | `string` | `09:00` |
| end | 结束时间 | `string` | `18:00` |
| stepMinutes | 步进分钟 | `number` | `30` |
| placeholder | 占位文本 | `string` | `请选择时间` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 输入框尺寸 | `'sm' \| 'md' \| 'lg'` | - |
| status | 输入框状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| prefix | 前缀文本，会显示在默认时间图标后 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 时间值更新时触发 | `(value: string)` |
| input | 输入、清空或确认选择时触发 | `(value: string)` |
| change | 输入内容变化或确认选择时触发 | `(value: string)` |
| clear | 点击清除按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容，未传入时显示默认时间图标 |
| suffix | 输入框后缀内容 |
