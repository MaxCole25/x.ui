<script setup lang="ts">
import { ref } from 'vue'

const area = ref(['zhejiang', 'hangzhou'])

const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]

const areaWithAffix = ref(['zhejiang', 'hangzhou'])

const areaParent = ref(['zhejiang'])

const areaValue = ref(['zhejiang', 'hangzhou'])

const remoteArea = ref([])

const areaFieldNames = { label: 'name', value: 'id', children: 'children' }

function queryArea() {
  return [
    { name: '浙江', id: 'zhejiang', children: [{ name: '杭州', id: 'hangzhou' }] },
    { name: '广东', id: 'guangdong', children: [{ name: '深圳', id: 'shenzhen' }] }
  ]
}

const cascaderBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const area = ref(['zhejiang', 'hangzhou'])

const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]
<\/script>

<div style="width: 280px">
    <XCascader v-model="area" :options="areaOptions" placeholder="请选择地区" />
  </div>`

const cascaderAffixCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const areaWithAffix = ref(['zhejiang', 'hangzhou'])

const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]
<\/script>

<div style="width: 320px">
    <XCascader
      v-model="areaWithAffix"
      :options="areaOptions"
      prefix="地区"
      suffix="必选"
      clearable
    />
  </div>`

const cascaderParentCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const areaParent = ref(['zhejiang'])

const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]
<\/script>

<div style="width: 280px">
    <XCascader v-model="areaParent" :options="areaOptions" change-on-select />
  </div>`

const cascaderDisplayCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const areaValue = ref(['zhejiang', 'hangzhou'])

const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]
<\/script>

<div style="width: 280px">
    <XCascader v-model="areaValue" :options="areaOptions" display-field="value" />
  </div>`

const cascaderRemoteCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const remoteArea = ref([])

const areaFieldNames = { label: 'name', value: 'id', children: 'children' }

function queryArea() {
  return [
    { name: '浙江', id: 'zhejiang', children: [{ name: '杭州', id: 'hangzhou' }] },
    { name: '广东', id: 'guangdong', children: [{ name: '深圳', id: 'shenzhen' }] }
  ]
}
<\/script>

<div style="width: 280px">
  <XCascader
    v-model="remoteArea"
    remote
    :field-names="areaFieldNames"
    :remote-method="queryArea"
    placeholder="请选择地区"
  />
  </div>`
</script>

# 级联选择器 Cascader

用于从多级树形数据中逐级选择路径，适合省市区、组织层级、业务分类等场景。

## 基础用法

<XDocDemo title="基础用法" :code="cascaderBasicCode">
  <div style="width: 280px">
    <XCascader v-model="area" :options="areaOptions" placeholder="请选择地区" />
  </div>
</XDocDemo>

## 可清空与前后缀

<XDocDemo title="可清空与前后缀" :code="cascaderAffixCode">
  <div style="width: 320px">
    <XCascader
      v-model="areaWithAffix"
      :options="areaOptions"
      prefix="地区"
      suffix="必选"
      clearable
    />
  </div>
</XDocDemo>

## 父级可选

开启 `changeOnSelect` 后，点击非叶子节点也会立即更新绑定值。

<XDocDemo title="父级可选" :code="cascaderParentCode">
  <div style="width: 280px">
    <XCascader v-model="areaParent" :options="areaOptions" change-on-select />
  </div>
</XDocDemo>

## 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，面板选项和已选路径会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

<XDocDemo title="显示选项值" :code="cascaderDisplayCode">
  <div style="width: 280px">
    <XCascader v-model="areaValue" :options="areaOptions" display-field="value" />
  </div>
</XDocDemo>

## 服务端级联与键值数据

开启 `remote` 后，展开面板时会请求根级选项，点击未加载子级的父节点时会把当前节点和路径传给 `remoteMethod`，用于按需请求下一列。后端字段不是 `label` / `value` / `children` 时，可用 `fieldNames` 映射。

<XDocDemo title="服务端级联与键值数据" :code="cascaderRemoteCode">
  <div style="width: 280px">
  <XCascader
    v-model="remoteArea"
    remote
    :field-names="areaFieldNames"
    :remote-method="queryArea"
    placeholder="请选择地区"
  />
  </div>
</XDocDemo>

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
| dropdownMaxHeight | 弹层最大高度；每个级联列按内容高度收缩，超出时独立滚动；没有可选项的列不会显示 | `number \| string` | `260` |
| teleportTo | 面板挂载目标。传入选择器（如 `body`）后，级联面板会通过 Teleport 挂载到该目标 | `string` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |
| id | 控件 id | `string` | - |
| name | 控件 name | `string` | - |
| accentColor | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | - |
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
| inputBackgroundColor | 输入区域背景色，优先级高于 `backgroundColor` | `string` | - |
| borderWidth | 边框粗细 | `number \| string` | - |
| borderColor | 边框色 | `string` | - |
| backgroundColor | 背景色，优先级低于 `inputBackgroundColor` | `string` | - |
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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XCascader / `CascaderProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
