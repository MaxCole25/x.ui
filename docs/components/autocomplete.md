# 自动补全输入框 Autocomplete

`XAutocomplete` 基于 `XInput` 输入框实现，并在输入框外扩展候选项弹层。默认会展示组件内置候选项，例如输入 `上` 会匹配 `上海`；也可以通过 `options` 提供只读候选列表，或开启 `remote` 后按输入内容请求服务端数据。

组件内部输入类型固定为 `text`，不暴露 `type` 接口。

## 基础用法

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

## 服务端输入查询

开启 `remote` 后，组件不再进行本地过滤，会在输入时触发 `query` 事件，并可通过 `remoteMethod` 返回服务端候选项。后端字段不是 `label` / `value` 时，可用 `fieldNames` 映射键值数据。

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

`XAutocomplete` 暴露 `XInput` 的公开接口。

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number` | `''` |
| placeholder | 占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| autoWidth | 是否自动宽度 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| status | 输入状态 | `default \| success \| warning \| error` | `default` |
| height | 高度，传入 `size` 时由尺寸预设优先控制 | `number \| string` | - |
| fontSize | 字号，传入 `size` 时由尺寸预设优先控制；候选项字号会与输入框保持一致 | `number \| string` | - |
| padding | 输入框内边距，候选项内边距会与输入框保持一致 | `number \| string` | - |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| activeBorderColor | 聚焦边框色 | `string` | - |
| clearIconColor | 清除按钮颜色 | `string` | - |
| clearIconSize | 清除按钮尺寸 | `number \| string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| prefix / suffix | 输入框前后缀文本 | `string` | - |
| name / id / maxlength | 原生输入属性 | `string \| number` | - |
| options | 候选列表。传入字符串数组、`{ label, value, disabled }` 对象数组或可被 `fieldNames` 映射的键值数据 | `Array<string \| AutocompleteOption \| Record<string, unknown>>` | `[]` |
| fieldNames | 候选项字段映射，用于服务端或业务键值数据 | `{ label?: string; value?: string; disabled?: string }` | `{}` |
| remote | 是否开启服务端输入查询。开启后不做本地过滤 | `boolean` | `false` |
| remoteMethod | 服务端查询方法，输入时接收关键词，可返回候选列表或 Promise | `(keyword: string) => AutocompleteOption[] \| Promise<AutocompleteOption[] \| void> \| void` | - |
| remoteDebounce | 服务端查询防抖时间，单位毫秒 | `number` | `200` |
| remoteMinLength | 触发服务端查询的最小输入长度 | `number` | `0` |
| loading | 是否显示加载状态，可用于外部控制远程查询加载态 | `boolean` | `false` |
| loadingText | 加载状态文案 | `string` | `'加载中'` |
| emptyText | 空状态文案 | `string` | `'暂无匹配数据'` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发 |
| input | 输入时触发 |
| change | 原生 change 时触发 |
| clear | 点击清除按钮时触发 |
| focus / blur | 聚焦和失焦时触发 |
| query | 开启 `remote` 后，输入触发服务端查询时触发 |

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
