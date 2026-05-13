# 数字输入框 InputNumber

用于输入带步进控制的数值。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(12)
</script>

<template>
  <XInputNumber v-model="count" :min="0" :max="99" />
</template>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前值 | `number` | - |
| min | 最小值 | `number` | - |
| max | 最大值 | `number` | - |
| step | 步进 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
