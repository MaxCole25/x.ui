# 滑块 Slider

用于在连续或离散区间内选择数值。

## 基础用法

```vue
<XSlider v-model="value" show-value />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步进 | `number` | `1` |
| showValue | 是否显示当前值 | `boolean` | `false` |
