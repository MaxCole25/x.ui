<script setup lang="ts">
import { ref } from 'vue'
const rules = { username: [{ required: true, message: '请输入用户名称' }] }
const username = ref('')
function validate() {
  result.value = '已触发表单校验'
}
const result = ref('')
import Example1 from '../examples/form/Example1.vue'
import Example1Source from '../examples/form/Example1.vue?raw'
import Example2 from '../examples/form/Example2.vue'
import Example2Source from '../examples/form/Example2.vue?raw'
import Example3 from '../examples/form/Example3.vue'
import Example3Source from '../examples/form/Example3.vue?raw'
import Example4 from '../examples/form/Example4.vue'
import Example4Source from '../examples/form/Example4.vue?raw'
import Example5 from '../examples/form/Example5.vue'
import Example5Source from '../examples/form/Example5.vue?raw'
import Example6 from '../examples/form/Example6.vue'
import Example6Source from '../examples/form/Example6.vue?raw'
import Example7 from '../examples/form/Example7.vue'
import Example7Source from '../examples/form/Example7.vue?raw'
</script>
# Form 表单

`XForm` 和 `XFormItem` 用于统一企业业务表单的布局、标签宽度、尺寸、禁用状态、校验行为和错误提示。业务项目应优先使用 `XForm` / `XFormItem`，避免直接散落使用底层表单实现。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 继承机制

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

<XDocDemo title="继承机制" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 标签与插槽

`XFormItem` 支持默认插槽、`#label`、`#help` 和 `#error`，便于业务表单放置复杂标签、辅助说明和统一错误文案。

<XDocDemo title="标签与插槽" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 紧凑横向控件

短标签搭配开关、复选框等小控件时，可在 `XFormItem` 上设置 `align="center"`，让标签和控件在垂直方向居中对齐，避免业务页面通过 `:deep` 覆写内部结构。该模式会保留错误和帮助文案的独立换行区域；更推荐用于没有错误提示的状态开关条等紧凑场景。

<XDocDemo title="紧凑横向控件" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 标签与内容对齐

`XFormItem` 提供 `labelAlign`、`contentAlign` 和 `contentJustify` 控制内部 label 与 content 的横向布局。开关、复选框等自身宽度较小的控件可通过 `content-justify="end"` 靠右放置；只读文本或居中输入框可通过 `content-align="center"` 统一控制内容区文本对齐。

<XDocDemo title="标签与内容对齐" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 内容区填满高度

父容器有明确高度时，可在 `label-position="top"` 的 `XFormItem` 上开启 `content-full-height`。标签保持自然高度，内容区和字段容器会填满剩余高度，适合放置已经支持 `full-height` 的富文本、表格等复杂控件。

<XDocDemo title="内容区填满高度" :code="Example6Source">
  <Example6 />
</XDocDemo>

### 表单项主题配色

`XFormItem` 默认仍保持通用浅色风格。业务系统需要适配暗色主题时，可以通过 props 快速映射到 CSS variables，也可以在父级容器直接覆盖 `--x-form-item-*` 变量，统一控制 label、内容、背景、边框、必填星号、错误提示和辅助说明颜色。

<XDocDemo title="表单项主题配色" :code="Example7Source">
  <Example7 />
</XDocDemo>

### 暴露方法

`XForm` 通过 `defineExpose` 暴露以下方法：

| 方法 | 说明 |
| --- | --- |
| validate | 校验全部字段，返回 `Promise<boolean>` |
| validateField | 校验指定字段 |
| resetFields | 重置指定字段或全部字段 |
| clearValidate | 清除指定字段或全部字段的校验信息 |
| scrollToField | 滚动到指定字段 |

### XForm Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, unknown>` | - |
| rules | 表单校验规则 | `FormRules` | - |
| disabled | 是否禁用内部组件 | `boolean` | `false` |
| fontSize | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` |
| inline | 是否行内布局 | `boolean` | `false` |
| height | 表单高度，数字按 px 处理 | `string \| number` | `auto` |
| labelWidth | 标签宽度 | `string \| number` | `96px` |
| labelPosition | 标签位置 | `left \| right \| top` | `right` |
| loading | 是否显示加载遮罩 | `boolean` | `false` |

### XFormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 字段路径 | `string` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 当前项校验规则 | `FormItemRule[]` | - |
| error | 外部错误信息 | `string` | - |
| fontSize | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` |
| disabled | 覆盖当前项禁用状态 | `boolean` | - |
| help | 帮助文本 | `string` | - |
| contentFullHeight | 内容区是否填满表单项扣除标签后的剩余高度 | `boolean` | `false` |
| align | 标签和内容的垂直对齐方式 | `start \| center` | `start` |
| labelAlign | 标签文本横向对齐方式 | `left \| center \| right` | - |
| contentAlign | 内容区文本横向对齐方式 | `left \| center \| right \| stretch` | - |
| contentJustify | 内容区网格项横向分布方式 | `start \| center \| end \| stretch` | - |
| contentClass | 追加到内容区的 class | `string \| string[] \| Record<string, boolean>` | - |
| contentStyle | 追加到内容区的 style | `string \| Record<string, string \| number>` | - |
| labelClass | 追加到标签的 class | `string \| string[] \| Record<string, boolean>` | - |
| labelStyle | 追加到标签的 style | `string \| Record<string, string \| number>` | - |
| labelTextColor | 标签文字颜色，映射到 `--x-form-item-label-color` | `string` | - |
| labelColor | 标签文字颜色别名，映射到 `--x-form-item-label-color` | `string` | - |
| contentTextColor | 内容区域文字颜色，映射到 `--x-form-item-content-color` | `string` | - |
| backgroundColor | 表单项背景色，映射到 `--x-form-item-bg` | `string` | - |
| borderColor | 表单项边框或分隔线颜色，映射到 `--x-form-item-border-color` | `string` | - |
| requiredMarkColor | 必填星号颜色，映射到 `--x-form-item-required-color` | `string` | - |
| errorTextColor | 错误提示文字颜色，映射到 `--x-form-item-error-color` | `string` | - |
| hintTextColor | 辅助说明文字颜色，映射到 `--x-form-item-hint-color` | `string` | - |
| descriptionTextColor | 辅助说明文字颜色别名，映射到 `--x-form-item-hint-color` | `string` | - |
| loading | 当前项加载状态 | `boolean` | `false` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XForm · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `labelPosition` | 标签位置 | `FormLabelPosition` | `'right'` | — |

### XForm · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 表单高度，数字按 px 处理 | `string \| number` | `'auto'` | 数字为 px；字符串使用 CSS 单位 |
| `labelWidth` | 标签宽度 | `string \| number` | `'96px'` | — |

### XForm · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `accentColor` | 表单主题色，会作为子表单控件的主题色默认值 | `string` | `—` | — |
| `radius` | 圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 表单项边框或分隔线颜色，映射到 `--x-form-item-border-color` | `string` | `—` | — |
| `backgroundColor` | 表单项背景色，映射到 `--x-form-item-bg` | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### XForm · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用内部组件 | `boolean` | `false` | — |
| `loading` | 是否显示加载遮罩 | `boolean` | `false` | — |

### XForm · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `model` | 表单数据对象 | `Record<string, unknown>` | `—` | — |
| `rules` | 表单校验规则 | `FormRules` | `—` | — |
| `inline` | 是否行内布局 | `boolean` | `false` | — |

### XFormItem · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `label` | 标签文本 | `string` | `—` | — |
| `labelPosition` | 标签位置 | `FormLabelPosition` | `—` | — |
| `contentJustify` | 内容区网格项横向分布方式 | `FormItemContentJustify` | `—` | — |
| `contentClass` | 追加到内容区的 class | `FormItemClass` | `—` | — |
| `contentStyle` | 追加到内容区的 style | `FormItemStyle` | `—` | — |
| `labelClass` | 追加到标签的 class | `FormItemClass` | `—` | — |
| `labelStyle` | 追加到标签的 style | `FormItemStyle` | `—` | — |

### XFormItem · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `labelWidth` | 标签宽度 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `labelHeight` | 标签区域高度，数字按 px 处理 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `labelGap` | 标签与内容间距，数字按 px 处理 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `contentHeight` | 内容区域高度，数字按 px 处理 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `contentFullHeight` | 内容区是否填满表单项扣除标签后的剩余高度 | `boolean` | `false` | — |

### XFormItem · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `align` | 标签和内容的垂直对齐方式 | `FormItemAlign` | `'start'` | — |
| `labelAlign` | 标签文本横向对齐方式 | `FormItemHorizontalAlign` | `—` | — |
| `contentAlign` | 内容区文本横向对齐方式 | `FormItemHorizontalAlign \| 'stretch'` | `—` | — |
| `labelTextColor` | 标签文字颜色，映射到 `--x-form-item-label-color` | `string` | `—` | — |
| `labelColor` | 标签文字颜色别名，映射到 `--x-form-item-label-color` | `string` | `—` | — |
| `contentTextColor` | 内容区域文字颜色，映射到 `--x-form-item-content-color` | `string` | `—` | — |
| `backgroundColor` | 表单项背景色，映射到 `--x-form-item-bg` | `string` | `—` | — |
| `borderColor` | 表单项边框或分隔线颜色，映射到 `--x-form-item-border-color` | `string` | `—` | — |
| `requiredMarkColor` | 必填星号颜色，映射到 `--x-form-item-required-color` | `string` | `—` | — |
| `errorTextColor` | 错误提示文字颜色，映射到 `--x-form-item-error-color` | `string` | `—` | — |
| `hintTextColor` | 辅助说明文字颜色，映射到 `--x-form-item-hint-color` | `string` | `—` | — |
| `descriptionTextColor` | 辅助说明文字颜色别名，映射到 `--x-form-item-hint-color` | `string` | `—` | — |

### XFormItem · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 覆盖当前项禁用状态 | `boolean` | `—` | — |
| `labelVisible` | 是否显示标签区域 | `boolean` | `true` | — |
| `loading` | 当前项加载状态 | `boolean` | `false` | — |

### XFormItem · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `prop` | 字段路径 | `string` | `—` | — |
| `required` | 是否必填 | `boolean` | `false` | — |
| `rules` | 当前项校验规则 | `FormItemRule[]` | `—` | — |
| `error` | 外部错误信息 | `string` | `—` | — |
| `help` | 帮助文本 | `string` | `—` | — |

## 事件

### XForm · 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `validate` | 校验全部字段，返回 `Promise<boolean>` | `[prop: string, valid: boolean, message: string]` |
| `submit` | submit 事件 | `[event: SubmitEvent]` |

### XFormItem · 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `validate` | 校验全部字段，返回 `Promise<boolean>` | `[valid: boolean, message: string]` |

## 插槽

### XForm · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

### XFormItem · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `label` | 标签文本 | `无作用域参数` |
| `default` | default 插槽 | `无作用域参数` |

### XFormItem · 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `error` | 外部错误信息 | `无作用域参数` |
| `help` | 帮助文本 | `无作用域参数` |

## 实例方法

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `clearValidate` | 清除指定字段或全部字段的校验信息 | `(propsFilter?: string \| string[]) => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `validate` | 校验全部字段，返回 `Promise<boolean>` | `(callback?: FormValidateCallback) => Promise<boolean>` |
| `validateField` | 校验指定字段 | `(propsFilter?: string \| string[], callback?: FormValidateCallback) => Promise<boolean>` |
| `resetFields` | 重置指定字段或全部字段 | `(propsFilter?: string \| string[]) => void` |
| `scrollToField` | 滚动到指定字段 | `(prop: string) => void` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### FormFontSize

```ts
export type FormFontSize = FontSize
```

### FormPublicFontSize

```ts
export type FormPublicFontSize = FontSize
```

### FormControlFontSize

```ts
export type FormControlFontSize = number
```

### FormLabelPosition

```ts
export type FormLabelPosition = 'left' | 'right' | 'top'
```

### FormItemAlign

```ts
export type FormItemAlign = 'start' | 'center'
```

### FormItemHorizontalAlign

```ts
export type FormItemHorizontalAlign = 'left' | 'center' | 'right'
```

### FormItemContentJustify

```ts
export type FormItemContentJustify = 'start' | 'center' | 'end' | 'stretch'
```

### FormItemClass

```ts
export type FormItemClass = string | string[] | Record<string, boolean>
```

### FormItemStyle

```ts
export type FormItemStyle = string | Record<string, string | number>
```

### FormItemRule

```ts
export interface FormItemRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  validator?: (rule: FormItemRule, value: unknown, model?: Record<string, unknown>) => boolean | string | Error | Promise<boolean | string | Error>
}
```

### FormRules

```ts
export type FormRules = Record<string, FormItemRule | FormItemRule[]>
```

### FormValidateCallback

```ts
export type FormValidateCallback = (valid: boolean, errors: Record<string, string>) => void
```

### FormValidateResult

```ts
export type FormValidateResult = Promise<boolean>
```

### FormValidateMethod

```ts
export type FormValidateMethod = (callback?: FormValidateCallback) => FormValidateResult
```

### FormValidateFieldMethod

```ts
export type FormValidateFieldMethod = (props?: string | string[], callback?: FormValidateCallback) => FormValidateResult
```

### FormProps

```ts
export interface FormProps extends ElementStyleProps {
  model?: Record<string, unknown>
  rules?: FormRules
  disabled?: boolean
  fontSize?: number
  inline?: boolean
  height?: string | number
  labelWidth?: string | number
  labelPosition?: FormLabelPosition
  loading?: boolean
  accentColor?: string
  radius?: number | string
}
```

### FormItemProps

```ts
export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  rules?: FormItemRule[]
  error?: string
  help?: string
  fontSize?: number
  disabled?: boolean
  labelWidth?: string | number
  labelHeight?: string | number
  labelGap?: string | number
  labelPosition?: FormLabelPosition
  labelVisible?: boolean
  contentHeight?: string | number
  contentFullHeight?: boolean
  align?: FormItemAlign
  labelAlign?: FormItemHorizontalAlign
  contentAlign?: FormItemHorizontalAlign | 'stretch'
  contentJustify?: FormItemContentJustify
  contentClass?: FormItemClass
  contentStyle?: FormItemStyle
  labelClass?: FormItemClass
  labelStyle?: FormItemStyle
  labelTextColor?: string
  labelColor?: string
  contentTextColor?: string
  backgroundColor?: string
  borderColor?: string
  requiredMarkColor?: string
  errorTextColor?: string
  hintTextColor?: string
  descriptionTextColor?: string
  loading?: boolean
}
```

### FormExpose

```ts
export interface FormExpose {
  validate: FormValidateMethod
  validateField: FormValidateFieldMethod
  resetFields: (props?: string | string[]) => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
}
```

## 验收说明

- 检查 `disabled`、`labelWidth`、`labelPosition` 是否能从 `XForm` 自动继承到内部表单项。
- 检查 `validate`、`validateField`、`resetFields`、`clearValidate` 和 `scrollToField` 是否可通过 `ref` 调用。
- 检查错误提示、帮助文本、自定义插槽和加载状态是否符合业务视觉规范。
- 在固定高度父容器内检查 `content-full-height` 搭配 `label-position="top"` 和 `XRichTextEditor full-height` 时，内容区是否填满标签下方剩余高度且不遮挡下一项。

- 调整 `fontSize`，确认标签、输入框和选择器继承数字字号，同时常规控件高度保持 32px；表单项和控件显式字号优先于表单字号。Story 的姓名字段 `prop="input"` 带必填规则，可清空后调用 `validate` 或 `validateField("input")`，再检查 `clearValidate`、`resetFields`、`scrollToField`；“恢复默认”会重建示例模型。
