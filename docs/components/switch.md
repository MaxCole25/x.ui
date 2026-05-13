<script setup>
import { ref } from 'vue'

const enabled = ref(true)
const notice = ref(false)
</script>

# Switch 开关

用于在开和关两种状态之间切换。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="enabled" />
    <span class="x-demo-label">当前值：{{ enabled }}</span>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <XSwitch v-model="enabled" />
</template>
```

## 带文字

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="notice" active-text="开启通知" inactive-text="关闭通知" />
  </div>
</div>

```vue
<XSwitch v-model="notice" active-text="开启通知" inactive-text="关闭通知" />
```

## 文字位置

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="outside" />
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="inside" />
  </div>
</div>

```vue
<XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="outside" />
<XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="inside" />
```

## 尺寸

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch size="sm" model-value />
    <XSwitch model-value />
    <XSwitch size="lg" model-value />
  </div>
</div>

```vue
<XSwitch size="sm" model-value />
<XSwitch model-value />
<XSwitch size="lg" model-value />
```

## 禁用状态

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch disabled />
    <XSwitch model-value disabled />
  </div>
</div>

```vue
<XSwitch disabled />
<XSwitch model-value disabled />
```

## 业务主题

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch
      model-value
      color="#409eff"
      inactive-color="#dcdfe6"
      thumb-color="#ffffff"
      button-size="20"
      font-size="15"
      font-family="Arial, sans-serif"
    />
  </div>
</div>

```vue
<XSwitch
  model-value
  color="#409eff"
  inactive-color="#dcdfe6"
  thumb-color="#ffffff"
  button-size="20"
  font-size="15"
  font-family="Arial, sans-serif"
/>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| activeText | 开启文案 | `string` | `开` |
| inactiveText | 关闭文案 | `string` | `关` |
| labelPosition | 文案位置，`outside` 为开关左右两侧，`inside` 为圆形按钮中间 | `outside \| inside` | `outside` |
| activeValue | 开启值 | `boolean` | `true` |
| inactiveValue | 关闭值 | `boolean` | `false` |
| color | 开启时背景色 | `string` | - |
| inactiveColor | 关闭时背景色 | `string` | - |
| thumbColor | 圆形按钮色 | `string` | - |
| buttonSize | 开关按钮高度，宽度按 2:1 等比调整 | `number \| string` | - |
| fontSize | 开/关文字大小 | `number \| string` | - |
| fontFamily | 开/关文字字体 | `string` | - |
| borderColor | 边框色 | `string` | - |
| radius | 圆角 | `string` | - |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: boolean)` |
| change | 用户切换状态时触发 | `(value: boolean)` |
