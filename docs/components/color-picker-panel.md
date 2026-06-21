<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#1677ff')

const customColor = ref('#7c3aed')

const customColors = ['#1677ff', '#16a34a', '#f97316', '#dc2626']

const colorPickerPanelBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const color = ref('#1677ff')
<\/script>

<div class="x-demo-column">
    <XColorPickerPanel v-model="color" />
    <p class="x-demo-label">当前颜色：{{ color }}</p>
  </div>`

const colorPickerPanelCustomCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const customColor = ref('#7c3aed')

const customColors = ['#1677ff', '#16a34a', '#f97316', '#dc2626']
<\/script>

<div class="x-demo-column">
    <XColorPickerPanel
      v-model="customColor"
      :colors="customColors"
      border-color="#c4b5fd"
      background-color="#faf5ff"
    />
    <p class="x-demo-label">当前颜色：{{ customColor }}</p>
  </div>`
</script>

# 颜色选择器面板 ColorPickerPanel

用于展示颜色预览、色板和颜色值输入。

## 基础用法

<XDocDemo title="基础用法" :code="colorPickerPanelBasicCode">
  <div class="x-demo-column">
    <XColorPickerPanel v-model="color" />
    <p class="x-demo-label">当前颜色：{{ color }}</p>
  </div>
</XDocDemo>

## 自定义色板

通过 `colors` 控制面板可选色板，也可以使用外观属性调整边框和背景。

<XDocDemo title="自定义色板" :code="colorPickerPanelCustomCode">
  <div class="x-demo-column">
    <XColorPickerPanel
      v-model="customColor"
      :colors="customColors"
      border-color="#c4b5fd"
      background-color="#faf5ff"
    />
    <p class="x-demo-label">当前颜色：{{ customColor }}</p>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前颜色值 | `string` | `#1264f4` |
| colors | 预设色板 | `string[]` | 内置色板 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XColorPickerPanel / `ColorPickerPanelProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
