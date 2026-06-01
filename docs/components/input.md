<script setup>
import { ref } from 'vue'

const inputValue = ref('默认尺寸')
</script>

# Input 输入框

`XInput` 是面向业务使用的输入框组件，内部基于 `XBaseInput` 实现，并在基础能力之上提供 `size` 尺寸预设。

## 基础用法

<div class="x-demo-block">
  <div class="x-demo-column">
    <XInput v-model="inputValue" placeholder="请输入内容" clearable />
    <p class="x-demo-label">当前输入：{{ inputValue || '暂无' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <XInput v-model="value" placeholder="请输入内容" clearable />
</template>
```

## 尺寸

<div class="x-demo-block">
  <div class="x-demo-column">
    <XInput size="sm" placeholder="小尺寸" />
    <XInput size="md" placeholder="默认尺寸" />
    <XInput size="lg" placeholder="大尺寸" />
  </div>
</div>

```vue
<XInput size="sm" placeholder="小尺寸" />
<XInput size="md" placeholder="默认尺寸" />
<XInput size="lg" placeholder="大尺寸" />
```

尺寸预设只在显式传入 `size` 时生效。未传入 `size` 时，`XInput` 会保留 `XBaseInput` 的表单继承能力，例如在 `XForm size="lg"` 中自动继承表单尺寸。

`size` 会映射到内部 `XBaseInput` 的 `height`、`fontSize`、`padding`、`radius` 公开接口：

| 尺寸 | 高度 | 字体 | padding | 圆角 |
| --- | --- | --- | --- | --- |
| `sm` | `22px` | `10px` | `0 4px` | `4px` |
| `md` | `30px` | `12px` | `0 8px` | `6px` |
| `lg` | `38px` | `14px` | `0 10px` | `8px` |

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number` | `''` |
| type | 原生输入类型 | `text \| password \| email \| number \| tel \| url \| search` | `text` |
| placeholder | 占位文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发 |
| input | 输入时触发 |
| change | 原生 change 时触发 |
| clear | 点击清空时触发 |
| focus / blur | 聚焦和失焦时触发 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XInput / `InputProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |
| `status` | 校验状态 | `BaseInputStatus` | — |
| `prefix` | 前缀内容 | `string` | — |
| `suffix` | 后缀内容 | `string` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | — |
| `activeBorderColor` | 激活状态边框颜色 | `string` | — |
| `clearIconColor` | clear图标颜色 | `string` | — |
| `clearIconSize` | 公开属性，详见类型定义 | `string \| number` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | — |
| `disabledTextColor` | 禁用文字颜色 | `string` | — |
| `fontFamily` | 字体族 | `string` | — |
| `autoHeight` | 是否自动高度 | `boolean` | — |
| `hideClearButton` | 是否隐藏清空按钮 | `boolean` | — |
| `textAlign` | 文本对齐方式 | `BaseInputTextAlign` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | — |
| `name` | 原生 name 属性 | `string` | — |
| `id` | 原生 id 属性 | `string` | — |
| `maxlength` | 最大输入长度 | `number` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
