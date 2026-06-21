<script setup lang="ts">
import { ref } from 'vue'

const mode = ref('default')

const buttonMode = ref('day')

const priority = ref('normal')

const level = ref('middle')

const radioBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const mode = ref('default')
<\/script>

<div class="x-demo-row">
    <XRadio v-model="mode" name="mode" value="day">日视图</XRadio>
    <XRadio v-model="mode" name="mode" value="week">周视图</XRadio>
    <XRadio v-model="mode" name="mode" value="month">月视图</XRadio>
  </div>
  <p class="x-demo-label">当前值：{{ mode }}</p>`

const radioButtonCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const buttonMode = ref('day')
<\/script>

<div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton v-model="buttonMode" name="city-button" value="new-york">New York</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="washington">Washington</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="los-angeles">Los Angeles</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="chicago">Chicago</XRadioButton>
  </div>
  <p class="x-demo-label">当前值：{{ buttonMode }}</p>`

const radioGroupCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const priority = ref('normal')
<\/script>

<div class="x-demo-row">
    <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
    <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
    <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
  </div>
  <p class="x-demo-label">当前优先级：{{ priority }}</p>`

const radioDisabledCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const level = ref('middle')
<\/script>

<div class="x-demo-row">
    <XRadio v-model="level" name="level" value="p0">P0</XRadio>
    <XRadio v-model="level" name="level" value="p1">P1</XRadio>
    <XRadio v-model="level" name="level" value="p2" disabled>P2 禁用</XRadio>
  </div>`

const radioSizeCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XRadio size="sm" model-value="sm" value="sm">小尺寸</XRadio>
    <XRadio model-value="md" value="md">默认尺寸</XRadio>
    <XRadio size="lg" model-value="lg" value="lg">大尺寸</XRadio>
  </div>`

const radioThemeCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XRadio model-value="custom" value="custom" button-color="#7c3aed">主题覆盖</XRadio>
    <XRadioButton model-value="button" value="button" button-color="#7c3aed">按钮主题</XRadioButton>
  </div>`

const radioCustomCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XRadio
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="16px"
      label-color="#4c1d95"
      font-size="15px"
      font-family="SimSun, 宋体, serif"
    >
      自定义外观
    </XRadio>
    <XRadio
      model-value="silent"
      value="silent"
      button-color="#0f766e"
      label-color="#115e59"
    >
      另一主题
    </XRadio>
  </div>`
</script>

# Radio 单选框

用于在一组选项中选择一个值。

## 基础用法

<XDocDemo title="基础用法" :code="radioBasicCode">
  <div class="x-demo-row">
    <XRadio v-model="mode" name="mode" value="day">日视图</XRadio>
    <XRadio v-model="mode" name="mode" value="week">周视图</XRadio>
    <XRadio v-model="mode" name="mode" value="month">月视图</XRadio>
  </div>
  <p class="x-demo-label">当前值：{{ mode }}</p>
</XDocDemo>

## 按钮形态

`XRadioButton` 是 `XRadio` 的按钮形态，绑定值、选项值、`name`、禁用状态和事件逻辑保持一致。多个按钮绑定同一个 `v-model`，并设置同一个 `name`，即可像普通 `XRadio` 一样形成一组按钮式单选。

<XDocDemo title="按钮形态" :code="radioButtonCode">
  <div style="display: inline-flex; flex-wrap: wrap">
    <XRadioButton v-model="buttonMode" name="city-button" value="new-york">New York</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="washington">Washington</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="los-angeles">Los Angeles</XRadioButton>
    <XRadioButton v-model="buttonMode" name="city-button" value="chicago">Chicago</XRadioButton>
  </div>
  <p class="x-demo-label">当前值：{{ buttonMode }}</p>
</XDocDemo>

## 分组单选控制

页面中有多个 `XRadio` 时，同一组单选项绑定同一个 `v-model`，并设置相同的 `name`；不同分组使用不同的 `v-model` 和 `name`，即可互不影响。

<XDocDemo title="分组单选控制" :code="radioGroupCode">
  <div class="x-demo-row">
    <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
    <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
    <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
  </div>
  <p class="x-demo-label">当前优先级：{{ priority }}</p>
</XDocDemo>

## 禁用状态

<XDocDemo title="禁用状态" :code="radioDisabledCode">
  <div class="x-demo-row">
    <XRadio v-model="level" name="level" value="p0">P0</XRadio>
    <XRadio v-model="level" name="level" value="p1">P1</XRadio>
    <XRadio v-model="level" name="level" value="p2" disabled>P2 禁用</XRadio>
  </div>
</XDocDemo>

## 尺寸

<XDocDemo title="尺寸" :code="radioSizeCode">
  <div class="x-demo-row">
    <XRadio size="sm" model-value="sm" value="sm">小尺寸</XRadio>
    <XRadio model-value="md" value="md">默认尺寸</XRadio>
    <XRadio size="lg" model-value="lg" value="lg">大尺寸</XRadio>
  </div>
</XDocDemo>

## 业务主题

<XDocDemo title="业务主题" :code="radioThemeCode">
  <div class="x-demo-row">
    <XRadio model-value="custom" value="custom" button-color="#7c3aed">主题覆盖</XRadio>
    <XRadioButton model-value="button" value="button" button-color="#7c3aed">按钮主题</XRadioButton>
  </div>
</XDocDemo>

## 外观定制

<XDocDemo title="外观定制" :code="radioCustomCode">
  <div class="x-demo-row">
    <XRadio
      model-value="custom"
      value="custom"
      button-color="#7c3aed"
      button-size="16px"
      label-color="#4c1d95"
      font-size="15px"
      font-family="SimSun, 宋体, serif"
    >
      自定义外观
    </XRadio>
    <XRadio
      model-value="silent"
      value="silent"
      button-color="#0f766e"
      label-color="#115e59"
    >
      另一主题
    </XRadio>
  </div>
</XDocDemo>

## Props

`XRadio` 与 `XRadioButton` 使用相同的核心 Props。`XRadioButton` 额外支持按钮外观相关 Props。

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number \| boolean` | - |
| value | 当前选项值 | `string \| number \| boolean` | - |
| label | 文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| variant | 按钮类型，仅 `XRadioButton` 生效 | `solid \| outline \| ghost` | `outline` |
| direction | 相邻按钮拼接方向，仅 `XRadioButton` 生效 | `horizontal \| vertical` | `horizontal` |
| width | 按钮宽度，仅 `XRadioButton` 生效 | `number \| string` | - |
| height | 按钮高度，仅 `XRadioButton` 生效 | `number \| string` | - |
| radius | 按钮组外侧圆角，仅 `XRadioButton` 生效 | `number \| string` | `6px` |
| fontFamily | 字体 | `string` | - |
| fontSize | 字体大小 | `number \| string` | - |
| labelColor | 标签文字颜色 | `string` | - |
| buttonColor | 按钮颜色 | `string` | - |
| activeBackgroundColor | 选中态背景色，仅 `XRadioButton` 生效 | `string` | `buttonColor` |
| activeBorderColor | 选中态边框色，仅 `XRadioButton` 生效 | `string` | `activeBackgroundColor` |
| activeTextColor | 选中态文字色，仅 `XRadioButton` 生效 | `string` | `#ffffff` |
| buttonSize | 按钮大小；`XRadio` 中作用于原生 radio 的宽高，`XRadioButton` 中作用于矩形按钮高度 | `number \| string` | - |
| name | 原生 name | `string` | - |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XRadio / `RadioProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
