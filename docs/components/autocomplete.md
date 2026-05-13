# 自动补全输入框 Autocomplete

用于输入关键词并从建议列表中选择结果。

## 基础用法

```vue
<XAutocomplete v-model="keyword" :options="cities" clearable />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 输入值 | `string` | - |
| options | 候选项 | `AutocompleteOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `请输入` |
| clearable | 是否可清空 | `boolean` | `false` |
