<script setup lang="ts">
import { ref } from 'vue'

const buttonVariantCode = `<XButton>主要按钮</XButton>
<XButton variant="outline">描边按钮</XButton>
<XButton variant="ghost">文本按钮</XButton>`

const buttonSizeCode = `<XButton>默认宽度</XButton>
<XButton width="100%">撑满父元素</XButton>
<XButton width="160px" height="40px" radius="12px">固定宽高</XButton>
<XButton variant="outline" width="160px" :border-width="2" border-color="#16a34a">自定义边框</XButton>
<XButton variant="outline" width="32px" height="32px" padding="0" radius="999px" :lift-on-hover="false">+</XButton>`

const buttonStateCode = `<XButton loading>加载中</XButton>
<XButton disabled>禁用状态</XButton>`

const buttonSlotCode = `<XButton width="180px">
  <template #prefix>+</template>
  新建
</XButton>

<XButton width="220px" variant="outline">
  保存
  <template #suffix>Ctrl+S</template>
</XButton>`

const buttonClickCode = `<XButton @click="handleClick">保存</XButton>`
const clickCount = ref(0)

function handleClick() {
  clickCount.value += 1
}
</script>

# 按钮 Button

用于表单、弹窗、工具栏等场景中的基础操作。

## 交互式预览

你可以在这里手动切换按钮类型、宽高、圆角、加载状态和禁用状态，并点击按钮确认事件是否正常触发。

<ButtonPlayground />

## 类型

<XDocDemo title="基础类型" :code="buttonVariantCode">
  <div class="x-demo-row">
    <XButton>主要按钮</XButton>
    <XButton variant="outline">描边按钮</XButton>
    <XButton variant="ghost">文本按钮</XButton>
  </div>
</XDocDemo>

## 宽高、圆角和边框

按钮默认宽度为 `120px`。可以通过 `width` 和 `height` 调整宽高，通过 `radius` 调整圆角，通过 `borderWidth` 和 `borderColor` 调整边框，通过 `backgroundColor` 和 `textColor` 调整按钮自身颜色。需要撑满父元素时显式传入 `width="100%"`。

<XDocDemo title="宽高和边框" :code="buttonSizeCode">
  <div class="x-demo-row">
    <XButton>默认宽度</XButton>
    <XButton width="100%">撑满父元素</XButton>
    <XButton width="160px" height="40px" radius="12px">固定宽高</XButton>
    <XButton variant="outline" width="160px" :border-width="2" border-color="#16a34a">自定义边框</XButton>
    <XButton variant="outline" width="32px" height="32px" padding="0" radius="999px" :lift-on-hover="false">+</XButton>
  </div>
</XDocDemo>

## 状态

<XDocDemo title="加载和禁用" :code="buttonStateCode">
  <div class="x-demo-row">
    <XButton loading>加载中</XButton>
    <XButton disabled>禁用状态</XButton>
  </div>
</XDocDemo>

## 前后缀

通过 `prefix` 和 `suffix` 插槽在按钮文字前后放置辅助文本。

<XDocDemo title="前后缀插槽" :code="buttonSlotCode">
  <div class="x-demo-row">
    <XButton width="180px"><template #prefix>+</template>新建</XButton>
    <XButton width="220px" variant="outline">保存<template #suffix>Ctrl+S</template></XButton>
  </div>
</XDocDemo>

## 点击事件

按钮只负责自身点击事件，不承载表单提交逻辑。组件内部固定使用原生 `type="button"`，因此放在 `form` 中时不会因为输入框回车而自动提交。

<XDocDemo title="点击事件" :code="buttonClickCode">
  <div class="x-demo-row">
    <XButton @click="handleClick">保存</XButton>
    <span>点击次数：{{ clickCount }}</span>
  </div>
</XDocDemo>

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: MouseEvent)` |

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 按钮类型 | `'solid' \| 'outline' \| 'ghost'` | `'solid'` |
| `width` | 按钮宽度，数字按 px 处理；需要撑满父元素时传入 `100%` | `number \| string` | `'120px'` |
| `height` | 按钮高度，数字按 px 处理 | `number \| string` | `'36px'` |
| `borderWidth` | 按钮边框粗细，数字按 px 处理 | `number \| string` | `1px` |
| `borderColor` | 按钮边框颜色 | `string` | 按按钮类型决定 |
| `backgroundColor` | 按钮背景色，映射到按钮自身背景变量 | `string` | 按按钮类型决定 |
| `textColor` | 按钮文字颜色，映射到按钮自身文字变量 | `string` | 按按钮类型决定 |
| `padding` | 按钮内边距，数字按 px 处理；设置 `size` 时由尺寸规格接管 | `number \| string` | `0 8px` |
| `radius` | 按钮圆角，数字按 px 处理；设置 `size` 时由尺寸规格接管 | `number \| string` | `6px` |
| `activeBackgroundColor` | 按下激活时的背景色 | `string` | 按按钮类型决定 |
| `activeBorderColor` | 按下激活时的边框色 | `string` | 按按钮类型决定 |
| `activeTextColor` | 按下激活时的文字色 | `string` | 当前文字色 |
| `liftOnHover` | 是否在悬浮时轻微上移；紧凑工具栏或可能被裁剪的容器内可设为 `false` | `boolean` | `true` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否加载中 | `boolean` | `false` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 按钮文字内容 |
| `prefix` | 按钮文字前缀 |
| `suffix` | 按钮文字后缀 |

## 手动验收建议

- 切换 `类型`，确认主要、描边、文本按钮的颜色层级是否符合预期。
- 修改 `宽度`、`高度`、`边框粗细`、`边框颜色`、`背景色` 和 `文字色`，确认默认 `120px` 宽度、撑满父元素宽度和自定义宽度都符合预期。
- 修改激活背景色、边框色、文字色，确认按下按钮时颜色符合预期。
- 添加前缀和后缀内容，确认文字顺序和间距符合预期。
- 设置 `:lift-on-hover="false"`，确认悬浮颜色反馈保留但按钮不再上移。
- 勾选 `加载中`，确认按钮不可重复点击，并出现加载图标。
- 勾选 `禁用`，确认按钮不可点击，视觉上有明确禁用态。
- 在桌面和移动端宽度下检查按钮文本是否溢出。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XButton / `ButtonProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fontSize` | 字号，数字按 px 处理 | `string \| number` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
