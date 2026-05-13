<script setup>
import { ref } from 'vue'

const selectStatus = ref('todo')
const selectMultiple = ref(['todo', 'done'])
const selectClear = ref('doing')
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' },
  { label: '已归档', value: 'archived', disabled: true }
]
</script>

# Select 下拉框

用于从一组候选项中选择一个或多个值。支持 `options` 配置，也支持配合 `XOption` 使用。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect v-model="selectStatus" :options="statusOptions" placeholder="请选择状态" />
    <p class="x-demo-label">当前值：{{ selectStatus }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const status = ref('todo')
const options = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
</script>

<template>
  <XSelect v-model="status" :options="options" placeholder="请选择状态" />
</template>
```

## 使用 XOption

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect v-model="selectStatus">
      <XOption label="待处理" value="todo" />
      <XOption label="处理中" value="doing" />
      <XOption label="已完成" value="done" />
      <XOption label="已归档" value="archived" disabled />
    </XSelect>
  </div>
</div>

```vue
<XSelect v-model="status">
  <XOption label="待处理" value="todo" />
  <XOption label="处理中" value="doing" />
  <XOption label="已完成" value="done" />
  <XOption label="已归档" value="archived" disabled />
</XSelect>
```

## 多选

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect v-model="selectMultiple" multiple :options="statusOptions" />
    <p class="x-demo-label">当前值：{{ selectMultiple.join('、') }}</p>
  </div>
</div>

```vue
<XSelect v-model="values" multiple :options="options" />
```

## 可清空和禁用

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect v-model="selectClear" :options="statusOptions" clearable />
    <XSelect :options="statusOptions" disabled placeholder="禁用状态" />
  </div>
</div>

```vue
<XSelect v-model="value" :options="options" clearable />
<XSelect :options="options" disabled placeholder="禁用状态" />
```

## 尺寸

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect size="sm" :options="statusOptions" placeholder="小尺寸" />
    <XSelect :options="statusOptions" placeholder="默认尺寸" />
    <XSelect size="lg" :options="statusOptions" placeholder="大尺寸" />
  </div>
</div>

```vue
<XSelect size="sm" :options="options" placeholder="小尺寸" />
<XSelect :options="options" placeholder="默认尺寸" />
<XSelect size="lg" :options="options" placeholder="大尺寸" />
```

## 业务主题

<div class="x-demo-block">
  <div class="x-demo-column">
    <XSelect color="#7c3aed" border-color="#c4b5fd" radius="12px" background="#faf5ff" :options="statusOptions" placeholder="单组件主题覆盖" />
  </div>
</div>

```vue
<XSelect
  color="#7c3aed"
  border-color="#c4b5fd"
  radius="12px"
  background="#faf5ff"
  :options="options"
/>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| boolean \| array` | - |
| options | 选项列表 | `SelectOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `请选择` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| color | 主题色 | `string` | - |
| borderColor | 边框色 | `string` | - |
| radius | 圆角 | `string` | - |
| background | 背景色 | `string` | - |

## XOption Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项文本 | `string` | - |
| value | 选项值 | `string \| number \| boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |
