# 时间选择 TimeSelect

用于从固定时间段中选择时间。

## 基础用法

```vue
<XTimeSelect v-model="time" start="09:00" end="18:00" :step-minutes="30" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前时间 | `string` | - |
| start | 起始时间 | `string` | `09:00` |
| end | 结束时间 | `string` | `18:00` |
| stepMinutes | 步进分钟 | `number` | `30` |
| disabled | 是否禁用 | `boolean` | `false` |
