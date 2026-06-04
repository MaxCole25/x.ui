<script setup lang="ts">
import { ref } from 'vue'

const value = ref(36)
const verticalValue = ref(64)

const sliderBasicCode = `<XSlider v-model="value" show-value />`
const sliderVerticalCode = `<XSlider v-model="verticalValue" vertical show-value />`
</script>

# 滑块 Slider

用于在连续或离散区间内选择数值。

## 基础用法

<XDocDemo title="基础用法" :code="sliderBasicCode">
  <div class="x-demo-column" style="width: 320px">
    <XSlider v-model="value" show-value />
  </div>
</XDocDemo>

## 竖向显示

设置 `vertical` 后滑块按竖向展示，适合音量、亮度或窄栏设置面板。

<XDocDemo title="竖向显示" :code="sliderVerticalCode">
  <div class="x-demo-column" style="height: 200px">
    <XSlider v-model="verticalValue" vertical show-value />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步进 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| showValue | 是否显示当前值 | `boolean` | `false` |
| vertical | 是否竖向显示 | `boolean` | `false` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XSlider / `SliderProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
