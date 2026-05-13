<script setup>
import { ref } from 'vue'

const inputBasic = ref('')
const inputAmount = ref(128)
const inputClearable = ref('可清空内容')
</script>

# BaseInput 基础输入框

`XBaseInput` 是输入框的底层基础组件。它使用外层 `div.x-base-input` 承载边框、圆角、背景和聚焦状态，内部原生 `input.x-base-input__inner` 隐藏边框并保持透明背景，适合被更上层的输入框组件复用。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-column">
    <XBaseInput v-model="inputBasic" placeholder="请输入名称" />
    <p class="x-demo-label">当前输入：{{ inputBasic || '暂无' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <XBaseInput v-model="value" placeholder="请输入名称" />
</template>
```

## 可清空

<div class="x-demo-block">
  <div class="x-demo-column">
    <XBaseInput v-model="inputClearable" placeholder="请输入内容" clearable />
  </div>
</div>

```vue
<XBaseInput v-model="value" placeholder="请输入内容" clearable />
```

## 前后缀

<div class="x-demo-block">
  <div class="x-demo-column">
    <XBaseInput v-model="inputAmount" type="number" prefix="￥" suffix="元" />
  </div>
</div>

```vue
<XBaseInput v-model="amount" type="number" prefix="￥" suffix="元" />
```

## 外观接口

<div class="x-demo-block">
  <div class="x-demo-column">
    <XBaseInput
      active-border-color="#2563eb"
      border-color="#dc2626"
      background-color="#f0fdf4"
      text-color="#000000"
      clear-icon-color="#67c23a"
      clear-icon-size="18px"
      font-size="12px"
      height="40px"
      auto-height
      radius="8px"
      padding="5px 10px"
      text-align="center"
      clearable
      model-value="外层 div 承载边框"
    />
  </div>
</div>

```vue
<XBaseInput
  active-border-color="#2563eb"
  border-color="#dc2626"
  background-color="#f0fdf4"
  text-color="#000000"
  clear-icon-color="#67c23a"
  clear-icon-size="18px"
  font-size="12px"
  height="40px"
  auto-height
  radius="8px"
  padding="5px 10px"
  text-align="center"
  clearable
  model-value="外层 div 承载边框"
/>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number` | `''` |
| type | 原生输入类型 | `text \| password \| email \| number \| tel \| url \| search` | `text` |
| placeholder | 占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 尺寸，可继承表单尺寸 | `sm \| md \| lg` | `md` |
| status | 状态 | `default \| success \| warning \| error` | `default` |
| activeBorderColor | 激活边框色，聚焦时生效 | `string` | - |
| color | 兼容旧写法，未设置 `activeBorderColor` 时作为激活边框色 | `string` | - |
| borderColor | 边框色 | `string` | - |
| borderWidth | 边框粗细 | `number \| string` | - |
| backgroundColor | 背景色 | `string` | - |
| textColor | 文字颜色 | `string` | - |
| clearIconColor | 清除图标颜色 | `string` | - |
| clearIconSize | 清除图标大小 | `number \| string` | - |
| disabledBackgroundColor | 禁用状态背景色 | `string` | - |
| disabledTextColor | 禁用状态文字色 | `string` | - |
| fontFamily | 字体样式 | `string` | - |
| fontSize | 字体大小 | `number \| string` | - |
| height | 输入框高度 | `number \| string` | - |
| autoHeight | 自动高度，比组件高度 `height` 优先级高；开启后 `height` 不再参与最小高度计算，适合嵌入表格单元格等容器 | `boolean` | `false` |
| padding | 外层 `div` 内边距 | `number \| string` | - |
| radius | 圆角 | `string` | - |
| textAlign | 文字对齐方式 | `left \| center \| right` | `left` |
| prefix | 前缀文本 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| name | 原生 `input` 的 `name` 属性 | `string` | - |
| id | 原生 `input` 的 `id` 属性 | `string` | - |
| maxlength | 最大输入长度 | `number` | - |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发 |
| input | 输入时触发 |
| change | 原生 change 时触发 |
| clear | 点击清空时触发 |
| focus / blur | 聚焦和失焦时触发 |
