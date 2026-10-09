<script setup lang="ts">
import Example1 from '../examples/input/Example1.vue'
import Example1Source from '../examples/input/Example1.vue?raw'
import Example2 from '../examples/input/Example2.vue'
import Example2Source from '../examples/input/Example2.vue?raw'
import Example3 from '../examples/input/Example3.vue'
import Example3Source from '../examples/input/Example3.vue?raw'
</script>
# Input 输入框

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 尺寸

<XDocDemo title="尺寸" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 前后缀

通过三个数字输入框微调输入内容、前缀和后缀的位置。偏移仅调整显示位置，不改变外框高度、内边距或清空按钮位置；输入内容偏移也会移动占位文本和光标。

<XDocDemo title="前后缀" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string \| number` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `—` | — |
| `prefix` | 前缀内容 | `string` | `—` | — |
| `suffix` | 后缀内容 | `string` | `—` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |
| `id` | 原生 id 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `clearIconSize` | 公开属性，详见类型定义 | `number \| string` | `—` | — |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | — |
| `height` | 高度，数字按 px 处理 | `number \| string` | `—` | — |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活状态边框颜色 | `string` | `—` | — |
| `clearIconColor` | clear图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字颜色 | `string` | `—` | — |
| `fontFamily` | 字体族 | `string` | `—` | — |
| `padding` | 内边距，数字按 px 处理；字符串使用 CSS 单位 | `number \| string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | — |
| `textAlign` | 文本对齐方式 | `BaseInputTextAlign` | `—` | — |
| `inputOffsetY` | 输入内容垂直偏移，正值向下、负值向上，支持小数 | `number` | `0` | px |
| `prefixOffsetY` | 前缀垂直偏移，作用于前缀文本或插槽，正值向下、负值向上 | `number` | `0` | px |
| `suffixOffsetY` | 后缀垂直偏移，作用于后缀文本或插槽，正值向下、负值向上 | `number` | `0` | px |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | — |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | `—` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` | — |
| `status` | 校验状态 | `BaseInputStatus` | `'default'` | — |
| `hideClearButton` | 是否隐藏清空按钮 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `type` | 原生输入类型 | `BaseInputType` | `'text'` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |
| `maxlength` | 最大输入长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `[value: string \| number]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入时触发 | `[value: string \| number]` |
| `change` | 原生 change 时触发 | `[value: string \| number]` |
| `clear` | 点击清空时触发 | `[]` |
| `focus` | focus 事件 | `[event: FocusEvent]` |
| `blur` | blur 事件 | `[event: FocusEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀内容 | `无作用域参数` |
| `suffix` | 后缀内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### InputFontSize

```ts
export type InputFontSize = BaseInputFontSize
```

### InputType

```ts
export type InputType = BaseInputType
```

### InputStatus

```ts
export type InputStatus = BaseInputStatus
```

### InputTextAlign

```ts
export type InputTextAlign = BaseInputTextAlign
```

### InputProps

```ts
export interface InputProps extends BaseInputProps {
  fontSize?: number
}
```

## 验收说明

- 在前后缀示例中分别调整三个垂直偏移，确认输入内容、前缀、后缀独立移动；恢复默认后偏移均为 0。
- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
