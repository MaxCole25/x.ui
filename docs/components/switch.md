<script setup>
import { ref } from 'vue'

const enabled = ref(true)
const notice = ref(false)
</script>

# Switch 开关

用于在开和关两种状态之间切换。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="enabled" />
    <span class="x-demo-label">当前值：{{ enabled }}</span>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <XSwitch v-model="enabled" />
</template>
```

## 带文字

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="notice" active-text="开启通知" inactive-text="关闭通知" />
  </div>
</div>

```vue
<XSwitch v-model="notice" active-text="开启通知" inactive-text="关闭通知" />
```

## 文字位置

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="outside" />
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="inside" />
  </div>
</div>

```vue
<XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="outside" />
<XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="inside" />
```

## 尺寸

显式传入 `size` 时，开关字号由统一尺寸预设接管：`sm` 为 `10px`，`md` 为 `12px`，`lg` 为 `14px`。`XSwitch` 是尺寸特例：为保持视觉比例，轨道宽高按统一尺寸高度的 `80%` 渲染，`sm` 高度为 `17.6px`、`md` 高度为 `24px`、`lg` 高度为 `30.4px`，宽度保持高度的 2 倍。`size` 不接管圆角，轨道默认始终保持左右半圆的胶囊边线。未显式传入 `size` 时，可继续用 `buttonSize`、`fontSize`、`radius` 做局部微调。

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch size="sm" model-value />
    <XSwitch model-value />
    <XSwitch size="lg" model-value />
  </div>
</div>

```vue
<XSwitch size="sm" model-value />
<XSwitch model-value />
<XSwitch size="lg" model-value />
```

## 禁用状态

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch disabled />
    <XSwitch model-value disabled />
  </div>
</div>

```vue
<XSwitch disabled />
<XSwitch model-value disabled />
```

## 业务主题

<div class="x-demo-block">
  <div class="x-demo-row">
    <XSwitch
      model-value
      color="#1264f4"
      inactive-color="#dcdfe6"
      thumb-color="#ffffff"
      button-size="20"
      font-size="15"
      font-family="Arial, sans-serif"
    />
  </div>
</div>

```vue
<XSwitch
  model-value
  color="#1264f4"
  inactive-color="#dcdfe6"
  thumb-color="#ffffff"
  button-size="20"
  font-size="15"
  font-family="Arial, sans-serif"
/>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| activeText | 开启文案 | `string` | `开` |
| inactiveText | 关闭文案 | `string` | `关` |
| labelPosition | 文案位置，`outside` 为开关左右两侧，`inside` 为轨道内部 | `outside \| inside` | `outside` |
| activeValue | 开启值 | `boolean` | `true` |
| inactiveValue | 关闭值 | `boolean` | `false` |
| color | 开启时背景色 | `string` | - |
| inactiveColor | 关闭时背景色 | `string` | - |
| thumbColor | 圆形按钮色 | `string` | - |
| buttonSize | 开关按钮高度，未显式传入 `size` 时生效，宽度按 2:1 等比调整 | `number \| string` | - |
| fontSize | 开/关文字大小，未显式传入 `size` 时生效 | `number \| string` | - |
| fontFamily | 开/关文字字体 | `string` | - |
| borderColor | 边框色 | `string` | - |
| radius | 圆角，未显式传入 `size` 时生效 | `string` | - |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: boolean)` |
| change | 用户切换状态时触发 | `(value: boolean)` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XSwitch / `SwitchProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 原生 name 属性 | `string` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
