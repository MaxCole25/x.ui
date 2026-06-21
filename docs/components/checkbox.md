<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)

const permissions = ref(['read'])

const indeterminate = ref(true)

const checkboxBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
<\/script>

<div class="x-demo-row">
    <XCheckbox v-model="checked">启用通知</XCheckbox>
    <span class="x-demo-label">当前值：{{ checked }}</span>
  </div>`

const checkboxMultipleCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const permissions = ref(['read'])
<\/script>

<div class="x-demo-row">
    <XCheckbox v-model="permissions" value="read">读取</XCheckbox>
    <XCheckbox v-model="permissions" value="write">写入</XCheckbox>
    <XCheckbox v-model="permissions" value="admin">管理</XCheckbox>
  </div>
  <p class="x-demo-label">当前值：{{ permissions.join('、') || '暂无' }}</p>`

const checkboxStateCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const indeterminate = ref(true)
<\/script>

<div class="x-demo-row">
    <XCheckbox v-model="indeterminate" indeterminate>部分选择</XCheckbox>
    <XCheckbox disabled>禁用未选</XCheckbox>
    <XCheckbox model-value disabled>禁用已选</XCheckbox>
  </div>`

const checkboxSizeCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XCheckbox size="sm" model-value>小尺寸</XCheckbox>
    <XCheckbox model-value>默认尺寸</XCheckbox>
    <XCheckbox size="lg" model-value>大尺寸</XCheckbox>
  </div>`

const checkboxThemeCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XCheckbox model-value checked-color="#7c3aed" border-color="#c4b5fd" radius="6px">主题覆盖</XCheckbox>
  </div>`
</script>

# Checkbox 多选框

用于布尔选择或一组选项的多选。

## 基础用法

<XDocDemo title="基础用法" :code="checkboxBasicCode">
  <div class="x-demo-row">
    <XCheckbox v-model="checked">启用通知</XCheckbox>
    <span class="x-demo-label">当前值：{{ checked }}</span>
  </div>
</XDocDemo>

## 多选数组

<XDocDemo title="多选数组" :code="checkboxMultipleCode">
  <div class="x-demo-row">
    <XCheckbox v-model="permissions" value="read">读取</XCheckbox>
    <XCheckbox v-model="permissions" value="write">写入</XCheckbox>
    <XCheckbox v-model="permissions" value="admin">管理</XCheckbox>
  </div>
  <p class="x-demo-label">当前值：{{ permissions.join('、') || '暂无' }}</p>
</XDocDemo>

## 半选和禁用

<XDocDemo title="半选和禁用" :code="checkboxStateCode">
  <div class="x-demo-row">
    <XCheckbox v-model="indeterminate" indeterminate>部分选择</XCheckbox>
    <XCheckbox disabled>禁用未选</XCheckbox>
    <XCheckbox model-value disabled>禁用已选</XCheckbox>
  </div>
</XDocDemo>

## 尺寸

<XDocDemo title="尺寸" :code="checkboxSizeCode">
  <div class="x-demo-row">
    <XCheckbox size="sm" model-value>小尺寸</XCheckbox>
    <XCheckbox model-value>默认尺寸</XCheckbox>
    <XCheckbox size="lg" model-value>大尺寸</XCheckbox>
  </div>
</XDocDemo>

## 业务主题

<XDocDemo title="业务主题" :code="checkboxThemeCode">
  <div class="x-demo-row">
    <XCheckbox model-value checked-color="#7c3aed" border-color="#c4b5fd" radius="6px">主题覆盖</XCheckbox>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `boolean \| array` | - |
| label | 文案 | `string` | - |
| value | 多选时的选项值 | `string \| number \| boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否半选 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| checkedColor | 选中色 | `string` | - |
| borderColor | 边框色 | `string` | - |
| radius | 圆角 | `string` | - |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XCheckbox / `CheckboxProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生 name 属性 | `string` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
