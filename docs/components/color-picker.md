<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#1677ff')

const disabledColor = ref('#94a3b8')

const colorPickerBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const color = ref('#1677ff')
<\/script>

<div class="x-demo-column">
    <XColorPicker v-model="color" />
    <p class="x-demo-label">当前颜色：{{ color }}</p>
  </div>`

const colorPickerDisabledCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const disabledColor = ref('#94a3b8')
<\/script>

<XColorPicker v-model="disabledColor" disabled />`
</script>

# 颜色选择器 ColorPicker

用于选择和展示当前颜色，内置颜色选择器面板。

## 基础用法

<XDocDemo title="基础用法" :code="colorPickerBasicCode">
  <div class="x-demo-column">
    <XColorPicker v-model="color" />
    <p class="x-demo-label">当前颜色：{{ color }}</p>
  </div>
</XDocDemo>

## 禁用状态

禁用后色块和颜色输入都不可交互。

<XDocDemo title="禁用状态" :code="colorPickerDisabledCode">
  <XColorPicker v-model="disabledColor" disabled />
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前颜色值 | `string` | `#1264f4` |
| disabled | 是否禁用 | `boolean` | `false` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XColorPicker / `ColorPickerProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
