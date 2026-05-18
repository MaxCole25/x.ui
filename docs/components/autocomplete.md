# 自动补全输入框 Autocomplete

`XAutocomplete` 基于 `XBaseInput` 输入框实现，并在输入框外扩展候选项弹层。默认会展示组件内置候选项，例如输入 `上` 会匹配 `上海`；激活输入框时会按当前已有输入内容筛选候选项。也可以通过 `options` 提供只读候选列表，或开启 `remote` 后按输入内容请求服务端数据。

组件内部输入类型固定为 `text`，不暴露 `type` 接口。

## 基础用法

简单输入模式下直接使用 `v-model` 即可，输入内容会同步到 `modelValue`，保持旧版本行为。

```vue
<XAutocomplete v-model="keyword" placeholder="请输入关键词" clearable />
```

## 自定义候选列表

```vue
<script setup lang="ts">
const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
]
</script>

<template>
  <XAutocomplete v-model="city" :options="cities" placeholder="请选择城市" />
</template>
```

## 选中值与输入文本分离

当组件作为选择器使用时，可以让 `modelValue` 保存真实业务值，例如客户 ID，同时用 `inputValue` 保存输入框显示文本或搜索关键词。设置 `valueOnInput="false"` 后，用户输入只更新 `inputValue`、`input` 和 `query`，点击候选项时才会更新 `modelValue`。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const customerId = ref<string | number>('')
const customerKeyword = ref('')
const customerOptions = ref([
  { label: '南通某客户', value: 456 }
])

const searchCustomers = async (keyword: string) => {
  const response = await fetch(`/api/customers?keyword=${encodeURIComponent(keyword)}`)
  customerOptions.value = await response.json()
}
</script>

<template>
  <XAutocomplete
    v-model="customerId"
    v-model:input-value="customerKeyword"
    :options="customerOptions"
    remote
    remote-trigger="enter"
    :remote-method="searchCustomers"
    :value-on-input="false"
    placeholder="请输入ID或名称"
  />
</template>
```

## 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，候选项会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

```vue
<XAutocomplete v-model="city" :options="cities" display-field="value" placeholder="显示城市 id" />
```

## 服务端输入查询

开启 `remote` 后，组件不再进行本地过滤，会按 `remoteTrigger` 触发 `query` 事件，并可通过 `remoteMethod` 返回服务端候选项。后端字段不是 `label` / `value` 时，可用 `fieldNames` 映射键值数据。

```vue
<script setup lang="ts">
const queryCity = async (keyword: string) => {
  const response = await fetch(`/api/cities?keyword=${encodeURIComponent(keyword)}`)
  return response.json()
}

const cityFieldNames = { label: 'name', value: 'id' }
</script>

<template>
  <XAutocomplete
    v-model="city"
    remote
    :field-names="cityFieldNames"
    :remote-method="queryCity"
    :remote-debounce="300"
    :remote-min-length="1"
    placeholder="输入城市关键词"
  />
</template>
```

## Props

`XAutocomplete` 暴露与 `XInput` 一致的输入框公开接口。

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number` | `''` |
| inputValue | 输入框显示文本。传入后优先用于显示和过滤，可与 `modelValue` 分离 | `string \| number` | - |
| valueOnInput | 输入时是否同步更新 `modelValue`。关闭后只更新 `inputValue`，点击候选项才更新 `modelValue` | `boolean` | `true` |
| clearModelValueOnInput | 输入内容变化时是否清空已选 `modelValue` | `boolean` | `false` |
| placeholder | 占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| autoWidth | 是否自动宽度 | `boolean` | `false` |
| size | 尺寸。外层高度、内部输入框和候选项字号会同步采用 `sm=22px/10px`、`md=30px/12px`、`lg=38px/14px` 预设 | `sm \| md \| lg` | `md` |
| status | 输入状态 | `default \| success \| warning \| error` | `default` |
| height | 高度，传入 `size` 时由尺寸预设优先控制 | `number \| string` | - |
| fontSize | 字号，传入 `size` 时由尺寸预设优先控制；候选项字号会与输入框保持一致 | `number \| string` | - |
| padding | 输入框内边距，候选项内边距会与输入框保持一致 | `number \| string` | - |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| color | 主题色，未设置聚焦边框色时作为聚焦边框色 | `string` | - |
| activeBorderColor | 聚焦边框色 | `string` | - |
| clearIconColor | 清除按钮颜色 | `string` | - |
| clearIconSize | 清除按钮尺寸 | `number \| string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| prefix / suffix | 输入框前后缀文本 | `string` | - |
| name / id / maxlength | 原生输入属性 | `string \| number` | - |
| options | 候选列表。传入字符串数组、`{ label, value, disabled }` 对象数组或可被 `fieldNames` 映射的键值数据 | `Array<string \| AutocompleteOption \| Record<string, unknown>>` | `[]` |
| fieldNames | 候选项字段映射，用于服务端或业务键值数据 | `{ label?: string; value?: string; disabled?: string }` | `{}` |
| displayField | 候选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `'label' \| 'value'` | `'label'` |
| remote | 是否开启服务端输入查询。开启后不做本地过滤 | `boolean` | `false` |
| remoteMethod | 服务端查询方法，输入时接收关键词，可返回候选列表或 Promise | `(keyword: string) => AutocompleteOption[] \| Promise<AutocompleteOption[] \| void> \| void` | - |
| remoteTrigger | 服务端查询触发方式。`input` 为输入防抖查询，`enter` 为按回车查询 | `'input' \| 'enter'` | `'input'` |
| remoteDebounce | 服务端查询防抖时间，单位毫秒 | `number` | `200` |
| remoteMinLength | 触发服务端查询的最小输入长度 | `number` | `0` |
| dropdownMaxHeight | 候选项弹层最大高度，候选项超过高度时可滚动选择。组件会先按输入内容筛选，再从筛选结果中最多渲染 50 条；输入内容为空时展示前 50 条 | `number \| string` | `260` |
| loading | 是否显示加载状态，可用于外部控制远程查询加载态 | `boolean` | `false` |
| loadingText | 加载状态文案 | `string` | `'加载中'` |
| emptyText | 空状态文案 | `string` | `'暂无匹配数据'` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发；当 `valueOnInput` 为 `false` 时，仅在选择候选项或清空时触发 |
| update:inputValue | 输入框显示文本变化时触发 |
| input | 输入时触发 |
| change | 原生 change 或选择候选项时触发 |
| clear | 点击清除按钮时触发 |
| focus / blur | 聚焦和失焦时触发 |
| query | 开启 `remote` 后，按 `remoteTrigger` 触发服务端查询时触发 |
| select | 点击候选项时触发，参数为归一化后的 `{ label, value, disabled? }` |

## 键盘操作

| 按键 | 行为 |
| --- | --- |
| Enter | 当 `remoteTrigger="enter"` 且未高亮候选项时触发远程查询；当候选项已高亮时选择该项 |
| ArrowDown / ArrowUp | 在候选项中向下 / 向上移动高亮项 |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容 |
| suffix | 输入框后缀内容 |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getOptions | 读取当前候选列表内容，返回拷贝后的只读数组 | `() => readonly AutocompleteOption[]` |
| getVisibleOptions | 读取当前弹层可见候选列表内容，返回拷贝后的只读数组 | `() => readonly AutocompleteOption[]` |
