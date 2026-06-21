<script setup lang="ts">
import { ref } from 'vue'

const selectStatus = ref('todo')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]

const selectMultiple = ref(['todo'])

const remoteStatus = ref('')

const statusFieldNames = { label: 'name', value: 'id' }

function queryStatus() {
  return [
    { name: '待处理', id: 'todo' },
    { name: '处理中', id: 'doing' },
    { name: '已完成', id: 'done' }
  ]
}

const selectClear = ref('todo')

const selectBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectStatus = ref('todo')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus" :options="statusOptions" placeholder="请选择状态" />
    <p class="x-demo-label">当前值：{{ selectStatus }}</p>
  </div>`

const selectOptionCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectStatus = ref('todo')
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus">
      <XOption label="待处理" value="todo" />
      <XOption label="处理中" value="doing" />
      <XOption label="已完成" value="done" />
      <XOption label="已归档" value="archived" disabled />
    </XSelect>
  </div>`

const selectMultipleCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectMultiple = ref(['todo'])

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectMultiple" multiple :options="statusOptions" />
    <p class="x-demo-label">当前值：{{ selectMultiple.join('、') }}</p>
  </div>`

const selectDisplayValueCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectStatus = ref('todo')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus" :options="statusOptions" display-field="value" />
  </div>`

const selectRemoteCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const remoteStatus = ref('')

const statusFieldNames = { label: 'name', value: 'id' }

function queryStatus() {
  return [
    { name: '待处理', id: 'todo' },
    { name: '处理中', id: 'doing' },
    { name: '已完成', id: 'done' }
  ]
}
<\/script>

<div class="x-demo-column" style="width: 280px">
    <XSelect
      v-model="remoteStatus"
      remote
      :field-names="statusFieldNames"
      :remote-method="queryStatus"
      placeholder="展开后请求服务端"
    />
    <p class="x-demo-label">当前值：{{ remoteStatus }}</p>
  </div>`

const selectStateCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectClear = ref('todo')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectClear" :options="statusOptions" clearable />
    <XSelect v-model="selectClear" :options="statusOptions" readonly clearable />
    <XSelect :options="statusOptions" disabled placeholder="禁用状态" />
  </div>`

const selectAffixCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectStatus = ref('todo')

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 280px">
    <XSelect v-model="selectStatus" prefix="状态" suffix="必选" status="success" :options="statusOptions" />
    <XSelect v-model="selectStatus" prefix="负责人" suffix="只读" readonly :options="statusOptions" />
  </div>`

const selectSizeCode = `\x3Cscript setup lang="ts">
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 260px">
    <XSelect size="sm" :options="statusOptions" placeholder="小尺寸" />
    <XSelect :options="statusOptions" placeholder="默认尺寸" />
    <XSelect size="lg" :options="statusOptions" placeholder="大尺寸" />
  </div>`

const selectThemeCode = `\x3Cscript setup lang="ts">
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
<\/script>

<div class="x-demo-column" style="width: 280px">
    <XSelect
      accent-color="#7c3aed"
      border-color="#c4b5fd"
      radius="12px"
      input-background-color="#faf5ff"
      :options="statusOptions"
      placeholder="单组件主题覆盖"
    />
  </div>`
</script>

# Select 下拉框

用于从一组候选项中选择一个或多个值。支持 `options` 配置，也支持配合 `XOption` 使用。新版外观接口与输入类组件保持一致，可配置前后缀、只读、清除按钮、状态和常用样式变量。

## 基础用法

<XDocDemo title="基础用法" :code="selectBasicCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus" :options="statusOptions" placeholder="请选择状态" />
    <p class="x-demo-label">当前值：{{ selectStatus }}</p>
  </div>
</XDocDemo>

## 使用 XOption

<XDocDemo title="使用 XOption" :code="selectOptionCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus">
      <XOption label="待处理" value="todo" />
      <XOption label="处理中" value="doing" />
      <XOption label="已完成" value="done" />
      <XOption label="已归档" value="archived" disabled />
    </XSelect>
  </div>
</XDocDemo>

## 多选

<XDocDemo title="多选" :code="selectMultipleCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectMultiple" multiple :options="statusOptions" />
    <p class="x-demo-label">当前值：{{ selectMultiple.join('、') }}</p>
  </div>
</XDocDemo>

## 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，下拉项和已选内容会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

<XDocDemo title="显示选项值" :code="selectDisplayValueCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectStatus" :options="statusOptions" display-field="value" />
  </div>
</XDocDemo>

## 服务端下拉与键值数据

开启 `remote` 后，展开下拉时会触发 `query` 事件，并调用 `remoteMethod` 获取选项。后端返回 `id`、`name` 这类键值字段时，可通过 `fieldNames` 映射为组件内部的 `value` 和 `label`。

<XDocDemo title="服务端下拉与键值数据" :code="selectRemoteCode">
  <div class="x-demo-column" style="width: 280px">
    <XSelect
      v-model="remoteStatus"
      remote
      :field-names="statusFieldNames"
      :remote-method="queryStatus"
      placeholder="展开后请求服务端"
    />
    <p class="x-demo-label">当前值：{{ remoteStatus }}</p>
  </div>
</XDocDemo>

## 可清空和禁用

设置 `clearable` 后，已选中内容时鼠标悬停在组件上会在后缀图标位置显示清除图标；未悬停、无内容、只读或禁用时仍显示下拉图标。

<XDocDemo title="可清空和禁用" :code="selectStateCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect v-model="selectClear" :options="statusOptions" clearable />
    <XSelect v-model="selectClear" :options="statusOptions" readonly clearable />
    <XSelect :options="statusOptions" disabled placeholder="禁用状态" />
  </div>
</XDocDemo>

## 前后缀和状态

<XDocDemo title="前后缀和状态" :code="selectAffixCode">
  <div class="x-demo-column" style="width: 280px">
    <XSelect v-model="selectStatus" prefix="状态" suffix="必选" status="success" :options="statusOptions" />
    <XSelect v-model="selectStatus" prefix="负责人" suffix="只读" readonly :options="statusOptions" />
  </div>
</XDocDemo>

## 尺寸

<XDocDemo title="尺寸" :code="selectSizeCode">
  <div class="x-demo-column" style="width: 260px">
    <XSelect size="sm" :options="statusOptions" placeholder="小尺寸" />
    <XSelect :options="statusOptions" placeholder="默认尺寸" />
    <XSelect size="lg" :options="statusOptions" placeholder="大尺寸" />
  </div>
</XDocDemo>

## 业务主题

<XDocDemo title="业务主题" :code="selectThemeCode">
  <div class="x-demo-column" style="width: 280px">
    <XSelect
      accent-color="#7c3aed"
      border-color="#c4b5fd"
      radius="12px"
      input-background-color="#faf5ff"
      :options="statusOptions"
      placeholder="单组件主题覆盖"
    />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| boolean \| array` | - |
| options | 选项列表，可传入标准选项或配合 `fieldNames` 的键值数据 | `Array<SelectOption \| Record<string, unknown>>` | `[]` |
| fieldNames | 选项字段映射，用于后端键值数据 | `{ label?: string; value?: string; disabled?: string }` | `{}` |
| displayField | 选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `'label' \| 'value'` | `label` |
| remote | 是否展开下拉时请求服务端选项 | `boolean` | `false` |
| remoteMethod | 服务端下拉请求方法，可返回选项数组或 Promise | `() => SelectOption[] \| Promise<SelectOption[] \| void> \| void` | - |
| loading | 是否显示加载状态，可用于外部控制远程加载态 | `boolean` | `false` |
| loadingText | 加载状态文案 | `string` | `加载中` |
| emptyText | 空状态文案 | `string` | `暂无数据` |
| placeholder | 占位文本 | `string` | `请选择` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读，只读时不展开、不清空 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| status | 状态样式 | `default \| success \| warning \| error` | `default` |
| prefix | 前缀文本 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| showActiveBorder | 聚焦或展开时是否显示激活边框 | `boolean` | `true` |
| autoWidth | 是否自动宽度 | `boolean` | `false` |
| autoHeight | 是否自动高度 | `boolean` | `false` |
| teleported | 是否将下拉弹层挂载到 `teleportTo`，用于避免被表格、滚动容器等父级裁剪 | `boolean` | `true` |
| teleportTo | 下拉弹层挂载目标 | `string` | `body` |
| zIndex | 下拉弹层层级 | `string \| number` | `2000` |
| dropdownMaxWidth | 下拉弹层最大宽度，选项文本较长时会在该宽度内扩展 | `string \| number` | `360` |
| accentColor | 主题色，未设置激活边框色时作为激活边框色 | `string` | - |
| activeBorderColor | 激活边框色 | `string` | - |
| borderColor | 边框色 | `string` | - |
| borderWidth | 边框宽度 | `string \| number` | - |
| radius | 圆角 | `string` | - |
| inputBackgroundColor | 输入区域背景色，优先级高于 `backgroundColor` | `string` | - |
| backgroundColor | 背景色，优先级低于 `inputBackgroundColor` | `string` | - |
| dropdownBackgroundColor | 选项弹窗背景色 | `string` | `#ffffff` |
| textColor | 文字色 | `string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| clearIconColor | 清除图标颜色 | `string` | - |
| clearIconSize | 清除图标尺寸 | `string \| number` | - |
| fontFamily | 字体 | `string` | - |
| fontSize | 字号 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| padding | 内边距 | `string \| number` | - |
| textAlign | 文本对齐 | `left \| center \| right` | `left` |
| id | 控件 id | `string` | - |
| name | 控件 name | `string` | - |

## Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `value` |
| change | 选择值变化时触发 | `value` |
| clear | 点击清除按钮时触发 | - |
| focus | 控件获得焦点时触发 | `FocusEvent` |
| blur | 控件失去焦点时触发 | `FocusEvent` |
| query | 开启 `remote` 后，展开下拉请求服务端时触发 | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义 `XOption` 选项 |
| prefix | 自定义前缀内容 |
| suffix | 自定义后缀内容 |

## XOption Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项文本 | `string` | - |
| value | 选项值 | `string \| number \| boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XSelect / `SelectProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
