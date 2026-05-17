<script setup>
import { ref } from 'vue'

const mode = ref('day')
const level = ref('p1')
const priority = ref('normal')
</script>

# RadioButton 单选按钮

用于在一组选项中选择一个值。`XRadioButton` 复用 `XRadio` 的对外接口，只是把圆形 radio 控件改成矩形按钮。

## 基础用法

<div class="x-demo-block">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton v-model="mode" name="mode-button" value="day">日视图</XRadioButton>
    <XRadioButton v-model="mode" name="mode-button" value="week">周视图</XRadioButton>
    <XRadioButton v-model="mode" name="mode-button" value="month">月视图</XRadioButton>
  </div>
  <p class="x-demo-label">当前值：{{ mode }}</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const mode = ref('day')
</script>

<template>
  <XRadioButton v-model="mode" name="mode-button" value="day">日视图</XRadioButton>
  <XRadioButton v-model="mode" name="mode-button" value="week">周视图</XRadioButton>
  <XRadioButton v-model="mode" name="mode-button" value="month">月视图</XRadioButton>
</template>
```

## 分组单选控制

同一组 `XRadioButton` 绑定同一个 `v-model`，并设置相同的 `name`；不同分组使用不同的 `v-model` 和 `name`，即可互不影响。

<div class="x-demo-block">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton v-model="priority" name="priority-button" value="normal">普通</XRadioButton>
    <XRadioButton v-model="priority" name="priority-button" value="urgent">紧急</XRadioButton>
    <XRadioButton v-model="priority" name="priority-button" value="blocked">阻塞</XRadioButton>
  </div>
  <p class="x-demo-label">当前优先级：{{ priority }}</p>
</div>

```vue
<XRadioButton v-model="priority" name="priority-button" value="normal">普通</XRadioButton>
<XRadioButton v-model="priority" name="priority-button" value="urgent">紧急</XRadioButton>
<XRadioButton v-model="priority" name="priority-button" value="blocked">阻塞</XRadioButton>
```

## 禁用状态

<div class="x-demo-block">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton v-model="level" name="level-button" value="p0">P0</XRadioButton>
    <XRadioButton v-model="level" name="level-button" value="p1">P1</XRadioButton>
    <XRadioButton v-model="level" name="level-button" value="p2" disabled>P2 禁用</XRadioButton>
  </div>
</div>

```vue
<XRadioButton v-model="level" name="level-button" value="p0">P0</XRadioButton>
<XRadioButton v-model="level" name="level-button" value="p1">P1</XRadioButton>
<XRadioButton v-model="level" name="level-button" value="p2" disabled>P2 禁用</XRadioButton>
```

## 尺寸

<div class="x-demo-block">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton size="sm" model-value="sm" value="sm">小尺寸</XRadioButton>
    <XRadioButton model-value="md" value="md">默认尺寸</XRadioButton>
    <XRadioButton size="lg" model-value="lg" value="lg">大尺寸</XRadioButton>
  </div>
</div>

```vue
<XRadioButton size="sm" model-value="sm" value="sm">小尺寸</XRadioButton>
<XRadioButton model-value="md" value="md">默认尺寸</XRadioButton>
<XRadioButton size="lg" model-value="lg" value="lg">大尺寸</XRadioButton>
```

## 外观定制

<div class="x-demo-block">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="36px"
      font-size="14px"
      font-family="Microsoft YaHei, 微软雅黑, sans-serif"
    >
      自定义按钮
    </XRadioButton>
    <XRadioButton
      model-value="silent"
      value="silent"
      button-color="#0f766e"
    >
      另一主题
    </XRadioButton>
  </div>
</div>

```vue
<XRadioButton
  model-value="custom"
  value="custom"
  button-color="#7c3aed"
  button-size="36px"
  font-size="14px"
  font-family="Microsoft YaHei, 微软雅黑, sans-serif"
>
  自定义按钮
</XRadioButton>
```

## Props

`XRadioButton` 与 `XRadio` 使用相同的 Props。

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| boolean` | - |
| value | 当前选项值 | `string \| number \| boolean` | - |
| label | 文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| variant | 按钮类型，对齐 `XButton` | `solid \| outline \| ghost` | `outline` |
| direction | 相邻按钮拼接方向，对齐 `XButtonGroup` | `horizontal \| vertical` | `horizontal` |
| width | 按钮宽度，数字按 px 处理 | `number \| string` | - |
| height | 按钮高度，数字按 px 处理，优先级高于 `buttonSize` | `number \| string` | - |
| radius | 按钮组外侧圆角，数字按 px 处理 | `number \| string` | `6px` |
| fontFamily | 字体 | `string` | - |
| fontSize | 字体大小 | `number \| string` | - |
| labelColor | 标签文字颜色 | `string` | - |
| buttonColor | 按钮颜色 | `string` | - |
| activeBackgroundColor | 选中态背景色，对齐按钮激活色接口 | `string` | `buttonColor` |
| activeBorderColor | 选中态边框色，对齐按钮激活色接口 | `string` | `activeBackgroundColor` |
| activeTextColor | 选中态文字色，对齐按钮激活色接口 | `string` | `#ffffff` |
| buttonSize | 矩形按钮高度，兼容旧接口 | `number \| string` | - |
| name | 原生 name | `string` | - |

## Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中时触发，用于 `v-model` | `value` |
| change | 选中时触发 | `value` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 按钮文案 |
