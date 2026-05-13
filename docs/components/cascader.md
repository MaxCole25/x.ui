# 级联选择器 Cascader

用于从多级树形数据中逐级选择。

## 基础用法

```vue
<XCascader v-model="area" :options="areaOptions" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 已选路径值 | `SelectOptionValue[]` | `[]` |
| options | 级联选项 | `CascaderOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `请选择` |
| disabled | 是否禁用 | `boolean` | `false` |
