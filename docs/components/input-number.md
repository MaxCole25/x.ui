# 数字输入框 InputNumber

用于输入带步进控制的数值。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(12)
</script>

<template>
  <XInputNumber v-model="count" :min="0" :max="99" :step="3" />
</template>
```

## 尺寸规则

当显式传入 `size` 时，`XInputNumber` 会按统一尺寸预设接管控件高度、字号、内边距和圆角：`sm` 为 `22px / 10px / 0 4px / 4px`，`md` 为 `30px / 12px / 0 8px / 6px`，`lg` 为 `38px / 14px / 0 10px / 8px`。未显式传入 `size` 时，仍可通过 `fontSize` 和 `borderRadius` 做局部外观调整。

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前值 | `number` | - |
| min | 最小值 | `number` | - |
| max | 最大值 | `number` | - |
| step | 步进 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| placeholder | 占位文本 | `string` | `'请输入数字'` |
| fullWidth | 是否撑满父元素宽度 | `boolean` | `false` |
| fullHeight | 是否撑满父元素高度 | `boolean` | `false` |
| color | 激活边框颜色 | `string` | - |
| activeBorderColor | 激活边框颜色，优先级高于 `color` | `string` | - |
| fontFamily | 字体 | `string` | - |
| fontSize | 字体大小，未显式传入 `size` 时生效，同时影响输入值和加减按钮文字 | `number \| string` | - |
| borderRadius | 圆角，未显式传入 `size` 时生效 | `number \| string` | - |
| decreaseButtonBackgroundColor | 减号按钮背景色 | `string` | - |
| increaseButtonBackgroundColor | 加号按钮背景色 | `string` | - |
| borderWidth | 边框粗细 | `number \| string` | - |
| borderColor | 边框颜色 | `string` | - |
| backgroundColor | 背景色 | `string` | - |
| textColor | 文字颜色 | `string` | - |
| showActiveBorder | 是否显示聚焦边框 | `boolean` | `true` |
