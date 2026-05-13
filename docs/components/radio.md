<script setup>
import { ref } from 'vue'

const mode = ref('day')
const level = ref('p1')
const priority = ref('normal')
</script>

# Radio 单选框

用于在一组选项中选择一个值。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio v-model="mode" name="mode" value="day">日视图</XRadio>
    <XRadio v-model="mode" name="mode" value="week">周视图</XRadio>
    <XRadio v-model="mode" name="mode" value="month">月视图</XRadio>
  </div>
  <p class="x-demo-label">当前值：{{ mode }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const mode = ref('day')
</script>

<template>
  <XRadio v-model="mode" name="mode" value="day">日视图</XRadio>
  <XRadio v-model="mode" name="mode" value="week">周视图</XRadio>
  <XRadio v-model="mode" name="mode" value="month">月视图</XRadio>
</template>
```

## 分组单选控制

页面中有多个 `XRadio` 时，同一组单选项绑定同一个 `v-model`，并设置相同的 `name`；不同分组使用不同的 `v-model` 和 `name`，即可互不影响。

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
    <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
    <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
  </div>
  <p class="x-demo-label">当前优先级：{{ priority }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const priority = ref('normal')
</script>

<template>
  <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
  <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
  <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
</template>
```

## 禁用状态

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio v-model="level" name="level" value="p0">P0</XRadio>
    <XRadio v-model="level" name="level" value="p1">P1</XRadio>
    <XRadio v-model="level" name="level" value="p2" disabled>P2 禁用</XRadio>
  </div>
</div>

```vue
<XRadio v-model="level" name="level" value="p0">P0</XRadio>
<XRadio v-model="level" name="level" value="p1">P1</XRadio>
<XRadio v-model="level" name="level" value="p2" disabled>P2 禁用</XRadio>
```

## 尺寸

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio size="sm" model-value="sm" value="sm">小尺寸</XRadio>
    <XRadio model-value="md" value="md">默认尺寸</XRadio>
    <XRadio size="lg" model-value="lg" value="lg">大尺寸</XRadio>
  </div>
</div>

```vue
<XRadio size="sm" model-value="sm" value="sm">小尺寸</XRadio>
<XRadio model-value="md" value="md">默认尺寸</XRadio>
<XRadio size="lg" model-value="lg" value="lg">大尺寸</XRadio>
```

## 业务主题

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio model-value="custom" value="custom" button-color="#7c3aed">主题覆盖</XRadio>
  </div>
</div>

```vue
<XRadio model-value="custom" value="custom" button-color="#7c3aed">
  主题覆盖
</XRadio>
```

## 外观定制

<div class="x-demo-block">
  <div class="x-demo-row">
    <XRadio
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="16px"
      label-color="#4c1d95"
      font-size="15px"
      font-family="SimSun, 宋体, serif"
    >
      自定义外观
    </XRadio>
    <XRadio
      model-value="silent"
      value="silent"
      button-color="#0f766e"
      label-color="#115e59"
    >
      另一主题
    </XRadio>
  </div>
</div>

```vue
<XRadio
  model-value="custom"
  value="custom"
  button-color="#7c3aed"
  button-size="16px"
  label-color="#4c1d95"
  font-size="15px"
  font-family="SimSun, 宋体, serif"
>
  自定义外观
</XRadio>

<XRadio
  model-value="silent"
  value="silent"
  button-color="#0f766e"
  label-color="#115e59"
>
  另一主题
</XRadio>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| boolean` | - |
| value | 当前选项值 | `string \| number \| boolean` | - |
| label | 文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| fontFamily | 字体 | `string` | - |
| fontSize | 字体大小 | `number \| string` | - |
| labelColor | 标签文字颜色 | `string` | - |
| buttonColor | 按钮颜色 | `string` | - |
| buttonSize | 按钮大小，作用于原生 radio 的宽高 | `number \| string` | - |
| name | 原生 name | `string` | - |
