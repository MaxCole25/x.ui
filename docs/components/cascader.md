# 级联选择器 Cascader

用于从多级树形数据中逐级选择路径，适合省市区、组织层级、业务分类等场景。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XCascader } from 'x.ui'

const area = ref(['zhejiang', 'hangzhou'])

const areaOptions = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      { label: '杭州', value: 'hangzhou' },
      { label: '宁波', value: 'ningbo' }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [{ label: '南京', value: 'nanjing' }]
  }
]
</script>

<template>
  <XCascader v-model="area" :options="areaOptions" placeholder="请选择地区" />
</template>
```

## 可清空与前后缀

```vue
<XCascader
  v-model="area"
  :options="areaOptions"
  prefix="地区"
  suffix="必选"
  clearable
/>
```

## 父级可选

开启 `changeOnSelect` 后，点击非叶子节点也会立即更新绑定值。

```vue
<XCascader v-model="area" :options="areaOptions" change-on-select />
```

## 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，面板选项和已选路径会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

```vue
<XCascader v-model="area" :options="areaOptions" display-field="value" />
```

## 服务端级联与键值数据

开启 `remote` 后，展开面板时会请求根级选项，点击未加载子级的父节点时会把当前节点和路径传给 `remoteMethod`，用于按需请求下一列。后端字段不是 `label` / `value` / `children` 时，可用 `fieldNames` 映射。

```vue
<script setup lang="ts">
const area = ref([])
const areaFieldNames = { label: 'name', value: 'id', children: 'items' }

const queryArea = async (option, path) => {
  const parentId = option?.value ?? ''
  const response = await fetch(`/api/areas?parentId=${parentId}`)
  return response.json()
}
</script>

<template>
  <XCascader
    v-model="area"
    remote
    :field-names="areaFieldNames"
    :remote-method="queryArea"
    placeholder="请选择地区"
  />
</template>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 已选路径值 | `SelectOptionValue[]` | `[]` |
| options | 级联选项，可传入标准选项或配合 `fieldNames` 的键值数据 | `Array<CascaderOption \| Record<string, unknown>>` | `[]` |
| fieldNames | 选项字段映射，用于后端键值数据 | `{ label?: string; value?: string; disabled?: string; children?: string }` | `{}` |
| displayField | 选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `'label' \| 'value'` | `label` |
| remote | 是否按需请求服务端级联数据 | `boolean` | `false` |
| remoteMethod | 服务端级联请求方法，接收当前节点和已选路径 | `(option?: CascaderOption, path?: CascaderOption[]) => CascaderOption[] \| Promise<CascaderOption[] \| void> \| void` | - |
| loading | 是否显示加载状态，可用于外部控制远程加载态 | `boolean` | `false` |
| loadingText | 加载状态文案 | `string` | `加载中` |
| emptyText | 空状态文案 | `string` | `暂无数据` |
| placeholder | 占位文本 | `string` | `请选择` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空能力 | `boolean` | `false` |
| hideClearButton | 是否隐藏清空按钮 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `md` |
| status | 状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| prefix | 前缀文本 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| autoWidth | 是否自动宽度 | `boolean` | `false` |
| autoHeight | 是否自动高度 | `boolean` | `false` |
| textAlign | 文本对齐 | `'left' \| 'center' \| 'right'` | `left` |
| separator | 已选路径分隔符 | `string` | ` / ` |
| changeOnSelect | 是否允许选择父级节点 | `boolean` | `false` |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |
| id | 控件 id | `string` | - |
| name | 控件 name | `string` | - |
| activeBorderColor | 激活边框色 | `string` | - |
| clearIconColor | 清空图标颜色 | `string` | - |
| clearIconSize | 清空图标尺寸 | `number \| string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| fontFamily | 字体 | `string` | - |
| fontSize | 字号 | `number \| string` | - |
| height | 高度 | `number \| string` | - |
| padding | 内边距 | `number \| string` | - |
| radius | 圆角 | `string` | - |
| background | 输入背景色 | `string` | - |
| borderWidth | 边框粗细 | `number \| string` | - |
| borderColor | 边框色 | `string` | - |
| backgroundColor | 背景色 | `string` | - |
| textColor | 文字色 | `string` | - |

## Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中路径变化时触发 | `(value: SelectOptionValue[]) => void` |
| change | 选中路径变化时触发 | `(value: SelectOptionValue[]) => void` |
| clear | 清空时触发 | `() => void` |
| focus | 控件聚焦时触发 | `(event: FocusEvent) => void` |
| blur | 控件失焦时触发 | `(event: FocusEvent) => void` |
| query | 开启 `remote` 后，请求服务端级联数据时触发 | `(option?: CascaderOption, path: CascaderOption[]) => void` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 自定义前缀内容 |
| suffix | 自定义后缀内容 |

## 手动验收建议

- 在 Histoire 的“外观接口”中检查四列交互器是否覆盖所有公开属性。
- 检查禁用、只读、可清空、父级可选、空数据和长路径文本。
- 检查 `sm`、`md`、`lg` 三种尺寸是否符合统一尺寸约束。
