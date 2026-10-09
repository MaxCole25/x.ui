<script setup lang="ts">
import Example1 from '../examples/autocomplete/Example1.vue'
import Example1Source from '../examples/autocomplete/Example1.vue?raw'
import Example2 from '../examples/autocomplete/Example2.vue'
import Example2Source from '../examples/autocomplete/Example2.vue?raw'
import Example3 from '../examples/autocomplete/Example3.vue'
import Example3Source from '../examples/autocomplete/Example3.vue?raw'
import Example4 from '../examples/autocomplete/Example4.vue'
import Example4Source from '../examples/autocomplete/Example4.vue?raw'
import Example5 from '../examples/autocomplete/Example5.vue'
import Example5Source from '../examples/autocomplete/Example5.vue?raw'
</script>
# 自动补全输入框 Autocomplete

`XAutocomplete` 基于 `XBaseInput` 输入框实现，并在输入框外扩展候选项弹层。默认会展示组件内置候选项，例如输入 `上` 会匹配 `上海`；激活输入框时会按当前已有输入内容筛选候选项。也可以通过 `options` 提供只读候选列表，或开启 `remote` 后按输入内容请求服务端数据。

组件内部输入类型固定为 `text`，不暴露 `type` 接口。

## 使用示例

### 基础用法

简单输入模式下直接使用 `v-model` 即可，输入内容会同步到 `modelValue`，保持旧版本行为。
设置 `clearable` 后，有输入内容时鼠标悬停在组件上会在后缀图标位置显示清除图标；其它时候显示下拉图标。

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义候选列表

<XDocDemo title="自定义候选列表" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 选中值与输入文本分离

当组件作为选择器使用时，可以让 `modelValue` 保存真实业务值，例如客户 ID，同时用 `inputValue` 保存输入框显示文本或搜索关键词。设置 `valueOnInput="false"` 后，用户输入只更新 `inputValue`、`input` 和 `query`，点击候选项时才会更新 `modelValue`。

<XDocDemo title="选中值与输入文本分离" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，候选项会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

<XDocDemo title="显示选项值" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 服务端输入查询

开启 `remote` 后，组件不再进行本地过滤，会按 `remoteTrigger` 触发 `query` 事件，并可通过 `remoteMethod` 返回服务端候选项。后端字段不是 `label` / `value` 时，可用 `fieldNames` 映射键值数据。

<XDocDemo title="服务端输入查询" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 键盘操作

| 按键 | 行为 |
| --- | --- |
| Enter | 当 `remoteTrigger="enter"` 且未高亮候选项时触发远程查询；当候选项已高亮时选择该项 |
| ArrowDown / ArrowUp | 在候选项中向下 / 向上移动高亮项 |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `options` | 候选列表。传入字符串数组、`{ label, value, disabled }` 对象数组或可被 `fieldNames` 映射的键值数据 | `AutocompleteOptionSource[]` | `() => []` | — |
| `fieldNames` | 候选项字段映射，用于服务端或业务键值数据 | `AutocompleteFieldNames` | `() => ({})` | — |
| `modelValue` | 绑定值 | `string \| number` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `emptyText` | 空状态文案 | `string` | `'暂无匹配数据'` | — |
| `placeholder` | 占位文本 | `string` | `—` | — |
| `prefix` | 输入框前缀内容 | `string` | `—` | — |
| `suffix` | 输入框后缀内容 | `string` | `—` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |
| `id` | 原生元素标识 id | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `autoWidth` | 是否自动宽度 | `boolean` | `false` | — |
| `clearIconSize` | 清除按钮尺寸 | `number \| string` | `—` | — |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | — |
| `height` | 高度，独立于字号设置 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置聚焦边框色时作为聚焦边框色 | `string` | `—` | — |
| `activeBorderColor` | 聚焦边框色 | `string` | `—` | — |
| `clearIconColor` | 清除按钮颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字色 | `string` | `—` | — |
| `fontFamily` | 字体族 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 输入框内边距，候选项内边距会与输入框保持一致 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文本对齐方式 | `BaseInputTextAlign` | `'center'` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `inputValue` | 输入框显示文本。传入后优先用于显示和过滤，可与 `modelValue` 分离 | `string \| number` | `—` | — |
| `valueOnInput` | 输入时是否同步更新 `modelValue`。关闭后只更新 `inputValue`，点击候选项才更新 `modelValue` | `boolean` | `true` | — |
| `clearModelValueOnInput` | 输入内容变化时是否清空已选 `modelValue` | `boolean` | `false` | — |
| `remoteTrigger` | 服务端查询触发方式。`input` 为输入防抖查询，`enter` 为按回车查询 | `AutocompleteRemoteTrigger` | `'input'` | — |
| `loading` | 是否显示加载状态，可用于外部控制远程查询加载态 | `boolean` | `false` | — |
| `loadingText` | 加载状态文案 | `string` | `'加载中'` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | `—` | — |
| `disabled` | 是否禁用 | `boolean` | `—` | — |
| `readonly` | 是否只读 | `boolean` | `—` | — |
| `clearable` | 是否可清空 | `boolean` | `—` | — |
| `status` | 输入状态 | `BaseInputStatus` | `—` | — |
| `hideClearButton` | 是否隐藏清除按钮 | `boolean` | `—` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `popperMaxHeight` | 候选项弹层最大高度，候选项超过高度时可滚动选择。组件会先按输入内容筛选，再从筛选结果中最多渲染 50 条；输入内容为空时展示前 50 条 | `number \| string` | `260` | 数字为 px；字符串使用 CSS 单位 |
| `popperMaxWidth` | 候选项弹层最大宽度。弹层会按候选项内容自适应展开，但不会小于输入框宽度，也不会超过该最大宽度 | `number \| string` | `360` | 数字为 px；字符串使用 CSS 单位 |
| `teleported` | 是否将候选项弹层挂载到 `teleportTo`，用于避免被表格、滚动容器等父级裁剪 | `boolean` | `true` | — |
| `teleportTo` | 候选项弹层挂载目标 | `string` | `'body'` | — |
| `zIndex` | 候选项弹层层级 | `number` | `2000` | — |
| `popperBackgroundColor` | 候选项弹层背景色 | `string` | `'#ffffff'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `displayField` | 候选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `AutocompleteDisplayField` | `'label'` | — |
| `remote` | 是否开启服务端输入查询。开启后不做本地过滤 | `boolean` | `false` | — |
| `remoteMethod` | 服务端查询方法，输入时接收关键词，可返回候选列表或 Promise | `AutocompleteRemoteMethod` | `—` | — |
| `remoteDebounce` | 服务端查询防抖时间，单位毫秒 | `number` | `200` | ms |
| `remoteMinLength` | 触发服务端查询的最小输入长度 | `number` | `0` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |
| `maxlength` | 最大输入长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发；当 `valueOnInput` 为 `false` 时，仅在选择候选项或清空时触发 | `[value: string \| number]` |
| `update:inputValue` | 输入框显示文本变化时触发 | `[value: string \| number]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入时触发 | `[value: string \| number]` |
| `change` | 原生 change 或选择候选项时触发 | `[value: string \| number]` |
| `clear` | 点击清除按钮时触发 | `[]` |
| `focus` | focus 事件 | `[event: FocusEvent]` |
| `blur` | blur 事件 | `[event: FocusEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `query` | 开启 `remote` 后，按 `remoteTrigger` 触发服务端查询时触发 | `[keyword: string]` |
| `select` | 点击候选项时触发，参数为归一化后的 `{ label, value, disabled? }` | `[option: AutocompleteOption]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 输入框前缀内容 | `无作用域参数` |
| `suffix` | 输入框后缀内容 | `无作用域参数` |

## 实例方法

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `getVisibleOptions` | 读取当前弹层可见候选列表内容，返回拷贝后的只读数组 | `() => { label: string; value: import("@x-soft88/x-ui").AutocompleteOptionValue; disabled?: boolean; }[]` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `getOptions` | 读取当前候选列表内容，返回拷贝后的只读数组 | `() => { label: string; value: import("@x-soft88/x-ui").AutocompleteOptionValue; disabled?: boolean; }[]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### AutocompleteOptionValue

```ts
export type AutocompleteOptionValue = string | number
```

### AutocompleteDisplayField

```ts
export type AutocompleteDisplayField = 'label' | 'value'
```

### AutocompleteOption

```ts
export interface AutocompleteOption {
  label: string
  value: AutocompleteOptionValue
  disabled?: boolean
}
```

### AutocompleteOptionSource

```ts
export type AutocompleteOptionSource = string | AutocompleteOption | Record<string, unknown>
```

### AutocompleteRemoteMethod

```ts
export type AutocompleteRemoteMethod = (
  keyword: string
) => AutocompleteOptionSource[] | Promise<AutocompleteOptionSource[] | void> | void
```

### AutocompleteExpose

```ts
export interface AutocompleteExpose {
  getOptions: () => readonly AutocompleteOption[]
  getVisibleOptions: () => readonly AutocompleteOption[]
}
```

### AutocompleteProps

```ts
export interface AutocompleteProps
  extends Omit<
    InputProps,
    'type' | 'inputOffsetY' | 'prefixOffsetY' | 'suffixOffsetY'
  > {
  inputValue?: string | number
  valueOnInput?: boolean
  clearModelValueOnInput?: boolean
  autoWidth?: boolean
  options?: AutocompleteOptionSource[]
  fieldNames?: AutocompleteFieldNames
  displayField?: AutocompleteDisplayField
  remote?: boolean
  remoteMethod?: AutocompleteRemoteMethod
  remoteTrigger?: AutocompleteRemoteTrigger
  remoteDebounce?: number
  remoteMinLength?: number
  popperMaxHeight?: number | string
  popperMaxWidth?: number | string
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
  popperBackgroundColor?: string
  loading?: boolean
  loadingText?: string
  emptyText?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### AutocompleteFontSize

```ts
export type AutocompleteFontSize = NonNullable<InputProps['fontSize']>
```

### AutocompleteRemoteTrigger

```ts
export type AutocompleteRemoteTrigger = 'input' | 'enter'
```

### AutocompleteFieldNames

```ts
export interface AutocompleteFieldNames {
  label?: string
  value?: string
  disabled?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。

- 打开浮层后切换 `teleported`，滚动父容器并调整窗口大小，检查定位；快速关闭、重开及在 Story 中恢复默认，检查旧实例不会重新注册定位监听。
- 在开发者工具中卸载组件后滚动或缩放，检查该实例不再响应定位；重新打开时应按当前触发元素定位。
