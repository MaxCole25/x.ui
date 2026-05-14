# 自动补全输入框 Autocomplete

`XAutocomplete` 基于 `XInput` 输入框实现，并在输入框外扩展候选项弹层。输入关键词时会展示组件内置候选项，例如输入 `上` 会匹配 `上海`。

组件内部输入类型固定为 `text`，不暴露 `type` 接口。

## 基础用法

```vue
<XAutocomplete v-model="keyword" placeholder="请输入关键词" clearable />
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
| activeBorderColor | 聚焦边框色 | `string` | - |
| clearIconColor | 清除按钮颜色 | `string` | - |
| clearIconSize | 清除按钮尺寸 | `number \| string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| prefix / suffix | 输入框前后缀文本 | `string` | - |
| name / id / maxlength | 原生输入属性 | `string \| number` | - |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发 |
| input | 输入时触发 |
| change | 原生 change 时触发 |
| clear | 点击清除按钮时触发 |
| focus / blur | 聚焦和失焦时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容 |
| suffix | 输入框后缀内容 |
