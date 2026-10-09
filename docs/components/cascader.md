<script setup lang="ts">
import Example1 from '../examples/cascader/Example1.vue'
import Example1Source from '../examples/cascader/Example1.vue?raw'
import Example2 from '../examples/cascader/Example2.vue'
import Example2Source from '../examples/cascader/Example2.vue?raw'
import Example3 from '../examples/cascader/Example3.vue'
import Example3Source from '../examples/cascader/Example3.vue?raw'
import Example4 from '../examples/cascader/Example4.vue'
import Example4Source from '../examples/cascader/Example4.vue?raw'
import Example5 from '../examples/cascader/Example5.vue'
import Example5Source from '../examples/cascader/Example5.vue?raw'
</script>
# 级联选择器 Cascader

用于从多级树形数据中逐级选择路径，适合省市区、组织层级、业务分类等场景。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 可清空与前后缀

<XDocDemo title="可清空与前后缀" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 父级可选

开启 `changeOnSelect` 后，点击非叶子节点也会立即更新绑定值。

<XDocDemo title="父级可选" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 显示选项值

`displayField` 默认显示 `label`。设置为 `value` 后，面板选项和已选路径会显示选项值；如果 `fieldNames.value` 映射的是后端 `id` 字段，就会显示 id。

<XDocDemo title="显示选项值" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 服务端级联与键值数据

开启 `remote` 后，展开面板时会请求根级选项，点击未加载子级的父节点时会把当前节点和路径传给 `remoteMethod`，用于按需请求下一列。后端字段不是 `label` / `value` / `children` 时，可用 `fieldNames` 映射。

<XDocDemo title="服务端级联与键值数据" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 已选路径值 | `SelectOptionValue[]` | `() => []` | — |
| `options` | 级联选项，可传入标准选项或配合 `fieldNames` 的键值数据 | `CascaderOptionSource[]` | `() => []` | — |
| `fieldNames` | 选项字段映射，用于后端键值数据 | `CascaderFieldNames` | `() => ({})` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `emptyText` | 空状态文案 | `string` | `'暂无数据'` | — |
| `placeholder` | 占位文本 | `string` | `'请选择'` | — |
| `prefix` | 前缀文本 | `string` | `—` | — |
| `suffix` | 后缀文本 | `string` | `—` | — |
| `separator` | 已选路径分隔符 | `string` | `' / '` | — |
| `name` | 控件 name | `string` | `—` | — |
| `id` | 控件 id | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `autoWidth` | 是否自动宽度 | `boolean` | `—` | — |
| `clearIconSize` | 清空图标尺寸 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `textAlign` | 文本对齐 | `CascaderTextAlign` | `'left'` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框色 | `string` | `—` | — |
| `clearIconColor` | 清空图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字色 | `string` | `—` | — |
| `fontFamily` | 字体 | `string` | `—` | — |
| `padding` | 内边距 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 是否显示加载状态，可用于外部控制远程加载态 | `boolean` | `false` | — |
| `loadingText` | 加载状态文案 | `string` | `'加载中'` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |
| `clearable` | 是否显示清空能力 | `boolean` | `false` | — |
| `hideClearButton` | 是否隐藏清空按钮 | `boolean` | `false` | — |
| `status` | 状态 | `CascaderStatus` | `'default'` | — |
| `changeOnSelect` | 是否允许选择父级节点 | `boolean` | `false` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | `—` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `popperMaxHeight` | 弹层最大高度；每个级联列按内容高度收缩，超出时独立滚动；没有可选项的列不会显示 | `number \| string` | `260` | 数字为 px；字符串使用 CSS 单位 |
| `teleported` | 是否将面板挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 面板挂载目标 | `string` | `'body'` | — |
| `zIndex` | 面板层级 | `number` | `2000` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `displayField` | 选项显示字段。设为 `value` 时显示选项值；若 `fieldNames.value` 映射为 `id`，则显示 id | `CascaderDisplayField` | `'label'` | — |
| `remote` | 是否按需请求服务端级联数据 | `boolean` | `false` | — |
| `remoteMethod` | 服务端级联请求方法，接收当前节点和已选路径 | `CascaderRemoteMethod` | `—` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 选中路径变化时触发 | `[value: SelectOptionValue[]]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 选中路径变化时触发 | `[value: SelectOptionValue[]]` |
| `clear` | 清空时触发 | `[]` |
| `focus` | 控件聚焦时触发 | `[event: FocusEvent]` |
| `blur` | 控件失焦时触发 | `[event: FocusEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `query` | 开启 `remote` 后，请求服务端级联数据时触发 | `[option: CascaderOption \| undefined, path: CascaderOption[]]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀文本 | `无作用域参数` |
| `suffix` | 后缀文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### CascaderFontSize

```ts
export type CascaderFontSize = number
```

### CascaderStatus

```ts
export type CascaderStatus = InputStatus
```

### CascaderTextAlign

```ts
export type CascaderTextAlign = InputTextAlign
```

### CascaderDisplayField

```ts
export type CascaderDisplayField = 'label' | 'value'
```

### CascaderOption

```ts
export interface CascaderOption {
  label: string
  value: SelectOptionValue
  disabled?: boolean
  children?: CascaderOption[]
}
```

### CascaderProps

```ts
export interface CascaderProps
  extends Omit<
    InputProps,
    'modelValue' | 'type' | 'maxlength' | 'inputOffsetY' | 'prefixOffsetY' | 'suffixOffsetY'
  > {
  modelValue?: SelectOptionValue[]
  options?: CascaderOptionSource[]
  fieldNames?: CascaderFieldNames
  displayField?: CascaderDisplayField
  remote?: boolean
  remoteMethod?: CascaderRemoteMethod
  loading?: boolean
  loadingText?: string
  emptyText?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  fontSize?: number
  status?: CascaderStatus
  prefix?: string
  suffix?: string
  autoWidth?: boolean
  textAlign?: CascaderTextAlign
  separator?: string
  changeOnSelect?: boolean
  popperMaxHeight?: number | string
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
  name?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### CascaderFieldNames

```ts
export interface CascaderFieldNames {
  label?: string
  value?: string
  disabled?: string
  children?: string
}
```

### CascaderOptionSource

```ts
export type CascaderOptionSource = CascaderOption | Record<string, unknown>
```

### CascaderRemoteMethod

```ts
export type CascaderRemoteMethod = (
  option?: CascaderOption,
  path?: CascaderOption[]
) => CascaderOptionSource[] | Promise<CascaderOptionSource[] | void> | void
```

## 验收说明

- 在 Histoire 的“外观接口”中检查四列交互器是否覆盖所有公开属性。
- 检查禁用、只读、可清空、父级可选、空数据和长路径文本。
`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

- 打开浮层后切换 `teleported`，滚动父容器并调整窗口大小，检查定位；快速关闭、重开及在 Story 中恢复默认，检查旧实例不会重新注册定位监听。
- 在开发者工具中卸载组件后滚动或缩放，检查该实例不再响应定位；重新打开时应按当前触发元素定位。
