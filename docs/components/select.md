<script setup lang="ts">
import Example1 from '../examples/select/Example1.vue'
import Example1Source from '../examples/select/Example1.vue?raw'
import Example2 from '../examples/select/Example2.vue'
import Example2Source from '../examples/select/Example2.vue?raw'
import Example3 from '../examples/select/Example3.vue'
import Example3Source from '../examples/select/Example3.vue?raw'
import Example4 from '../examples/select/Example4.vue'
import Example4Source from '../examples/select/Example4.vue?raw'
import Example5 from '../examples/select/Example5.vue'
import Example5Source from '../examples/select/Example5.vue?raw'
import Example6 from '../examples/select/Example6.vue'
import Example6Source from '../examples/select/Example6.vue?raw'
import Example7 from '../examples/select/Example7.vue'
import Example7Source from '../examples/select/Example7.vue?raw'
import Example8 from '../examples/select/Example8.vue'
import Example8Source from '../examples/select/Example8.vue?raw'
import Example9 from '../examples/select/Example9.vue'
import Example9Source from '../examples/select/Example9.vue?raw'
</script>
# Select 下拉框

用于从一组候选项中选择一个或多个值。支持 `options` 配置，也支持配合 `XOption` 使用。新版外观接口与输入类组件保持一致，可配置前后缀、只读、清除按钮、状态和常用样式变量。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 使用 XOption

<XDocDemo title="使用 XOption" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 多选

<XDocDemo title="多选" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，下拉项和已选内容会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

<XDocDemo title="显示选项值" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 服务端下拉与键值数据

开启 `remote` 后，展开下拉时会触发 `query` 事件，并调用 `remoteMethod` 获取选项。后端返回 `id`、`name` 这类键值字段时，可通过 `fieldNames` 映射为组件内部的 `value` 和 `label`。

<XDocDemo title="服务端下拉与键值数据" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 可清空和禁用

设置 `clearable` 后，已选中内容时鼠标悬停在组件上会在后缀图标位置显示清除图标；未悬停、无内容、只读或禁用时仍显示下拉图标。

<XDocDemo title="可清空和禁用" :code="Example6Source">
  <Example6 />
</XDocDemo>

### 前后缀和状态

<XDocDemo title="前后缀和状态" :code="Example7Source">
  <Example7 />
</XDocDemo>

### 尺寸

<XDocDemo title="尺寸" :code="Example8Source">
  <Example8 />
</XDocDemo>

### 业务主题

<XDocDemo title="业务主题" :code="Example9Source">
  <Example9 />
</XDocDemo>

### XOption Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项文本 | `string` | - |
| value | 选项值 | `string \| number \| boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XOption · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `value` | 选项值 | `SelectOptionValue` | `—` | — |

### XOption · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `label` | 选项文本 | `string` | `—` | — |

### XOption · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### XSelect · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `SelectOptionValue \| SelectOptionValue[]` | `—` | — |
| `options` | 选项列表，可传入标准选项或配合 `fieldNames` 的键值数据 | `SelectOptionSource[]` | `() => []` | — |
| `fieldNames` | 选项字段映射，用于后端键值数据 | `SelectFieldNames` | `() => ({})` | — |

### XSelect · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `emptyText` | 空状态文案 | `string` | `'暂无数据'` | — |
| `placeholder` | 占位文本 | `string` | `'请选择'` | — |
| `prefix` | 前缀文本 | `string` | `—` | — |
| `suffix` | 后缀文本 | `string` | `—` | — |
| `name` | 控件 name | `string` | `—` | — |
| `id` | 控件 id | `string` | `—` | — |

### XSelect · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `autoWidth` | 是否自动宽度 | `boolean` | `—` | — |
| `clearIconSize` | 清除图标尺寸 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | — |
| `height` | 高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### XSelect · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `textAlign` | 文本对齐 | `SelectTextAlign` | `'left'` | — |
| `showActiveBorder` | 聚焦或展开时是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置激活边框色时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框色 | `string` | `—` | — |
| `clearIconColor` | 清除图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字色 | `string` | `—` | — |
| `fontFamily` | 字体 | `string` | `—` | — |
| `padding` | 内边距 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字色 | `string` | `—` | — |

### XSelect · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 是否显示加载状态，可用于外部控制远程加载态 | `boolean` | `false` | — |
| `loadingText` | 加载状态文案 | `string` | `'加载中'` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读，只读时不展开、不清空 | `boolean` | `false` | — |
| `clearable` | 是否可清空 | `boolean` | `false` | — |
| `hideClearButton` | 是否隐藏清除按钮 | `boolean` | `false` | — |
| `status` | 状态样式 | `SelectStatus` | `'default'` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | `—` | — |

### XSelect · 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `teleported` | 是否将下拉弹层挂载到 `teleportTo`，用于避免被表格、滚动容器等父级裁剪 | `boolean` | `true` | — |
| `teleportTo` | 下拉弹层挂载目标 | `string` | `'body'` | — |
| `zIndex` | 下拉弹层层级 | `number \| string` | `2000` | — |
| `popperMaxWidth` | 下拉弹层最大宽度，选项文本较长时会在该宽度内扩展 | `number \| string` | `360` | 数字为 px；字符串使用 CSS 单位 |
| `popperBackgroundColor` | 选项弹窗背景色 | `string` | `'#ffffff'` | — |

### XSelect · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `displayField` | 选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `SelectDisplayField` | `'label'` | — |
| `remote` | 是否展开下拉时请求服务端选项 | `boolean` | `false` | — |
| `remoteMethod` | 服务端下拉请求方法，可返回选项数组或 Promise | `SelectRemoteMethod` | `—` | — |
| `multiple` | 是否多选 | `boolean` | `false` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 绑定值更新时触发 | `[value: SelectOptionValue \| SelectOptionValue[] \| undefined]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 选择值变化时触发 | `[value: SelectOptionValue \| SelectOptionValue[] \| undefined]` |
| `clear` | 点击清除按钮时触发 | `[]` |
| `focus` | 控件获得焦点时触发 | `[event: FocusEvent]` |
| `blur` | 控件失去焦点时触发 | `[event: FocusEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `query` | 开启 `remote` 后，展开下拉请求服务端时触发 | `[]` |

## 插槽

### XOption · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 自定义 `XOption` 选项 | `无作用域参数` |

### XSelect · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀文本 | `无作用域参数` |
| `suffix` | 后缀文本 | `无作用域参数` |
| `default` | 自定义 `XOption` 选项 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### SelectFontSize

```ts
export type SelectFontSize = number
```

### SelectOptionValue

```ts
export type SelectOptionValue = string | number | boolean
```

### SelectStatus

```ts
export type SelectStatus = InputStatus
```

### SelectTextAlign

```ts
export type SelectTextAlign = InputTextAlign
```

### SelectDisplayField

```ts
export type SelectDisplayField = 'label' | 'value'
```

### SelectOption

```ts
export interface SelectOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}
```

### SelectProps

```ts
export interface SelectProps
  extends Omit<
    InputProps,
    'modelValue' | 'type' | 'maxlength' | 'inputOffsetY' | 'prefixOffsetY' | 'suffixOffsetY'
  > {
  modelValue?: SelectOptionValue | SelectOptionValue[]
  options?: SelectOptionSource[]
  fieldNames?: SelectFieldNames
  displayField?: SelectDisplayField
  remote?: boolean
  remoteMethod?: SelectRemoteMethod
  loading?: boolean
  loadingText?: string
  emptyText?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  multiple?: boolean
  fontSize?: number
  status?: SelectStatus
  prefix?: string
  suffix?: string
  autoWidth?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
  popperMaxWidth?: number | string
  popperBackgroundColor?: string
  textAlign?: SelectTextAlign
  name?: string
}
```

### OptionProps

```ts
export interface OptionProps {
  label: string
  value: SelectOptionValue
  disabled?: boolean
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### SelectFieldNames

```ts
export interface SelectFieldNames {
  label?: string
  value?: string
  disabled?: string
}
```

### SelectOptionSource

```ts
export type SelectOptionSource = SelectOption | Record<string, unknown>
```

### SelectRemoteMethod

```ts
export type SelectRemoteMethod = () => SelectOptionSource[] | Promise<SelectOptionSource[] | void> | void
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。

- 打开浮层后切换 `teleported`，滚动父容器并调整窗口大小，检查定位；快速关闭、重开及在 Story 中恢复默认，检查旧实例不会重新注册定位监听。
- 在开发者工具中卸载组件后滚动或缩放，检查该实例不再响应定位；重新打开时应按当前触发元素定位。


## 交互验收补充

选项渲染、键盘激活与滚动定位统一按 options（远程模式使用当前远程选项）在前、XOption 插槽在后的顺序处理。纯插槽和混合用法均支持方向键及 Enter，禁用项会跳过；多选模式 Enter 切换当前项。每个实例使用独立 listbox 和选项标识，通过 aria-controls、aria-activedescendant 关联激活项。
