<script setup lang="ts">
import Example1 from '../examples/data-table-settings/Example1.vue'
import Example1Source from '../examples/data-table-settings/Example1.vue?raw'
import Example2 from '../examples/data-table-settings/Example2.vue'
import Example2Source from '../examples/data-table-settings/Example2.vue?raw'
</script>
# 数据表设置 DataTableSettings

`XDataTableSettings` 是一个完整的数据表字段配置面板，用于把“远程获取数据表列表、选择数据表、加载字段配置、编辑字段配置、保存回后端”的流程封装成通用组件。

组件不内置 axios、URL、鉴权或业务权限；所有远程行为都通过 `adapter` 回调注入，适合在不同业务项目中复用。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 主题配色

业务项目可以通过公开配色属性覆盖组件外层、表格、内置控件和保存按钮的主题色，不需要依赖深层选择器。

<XDocDemo title="主题配色" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 远程适配器

`adapter` 必须提供数据表列表、字段元数据、已保存配置和保存配置四个回调。组件会先调用 `loadTables`，默认选择第一张表；用户切换表后会并行调用 `loadColumns` 和 `loadSettings`，并把二者合并为可编辑行。

`loadDataSources` 可选，用于给下拉、单选、自动完成等编辑类型提供数据源选项。

保存时组件会统一规范化字段：

- `keyType` 为 `primary` 或 `normal` 时自动设置 `isKey: true`，并强制 `isHidden: false`。
- 非 `select`、`radio`、`autocomplete` 编辑类型不会保留 `dataSourceKey`。
- 拖拽排序后会按当前行顺序重算 `sortOrder`。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `emptyText` | 字段空态文案 | `string` | `'暂无字段配置'` | — |
| `saveButtonText` | 保存按钮文案 | `string` | `'保存配置'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 组件高度，数字会转为 px | `number \| string` | `'100%'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `backgroundColor` | 组件外层和表格面板背景色 | `string` | `—` | — |
| `textColor` | 组件主文字色，作为表体和控件文字色兜底 | `string` | `—` | — |
| `borderColor` | 组件外框、表格线和控件边框色兜底 | `string` | `—` | — |
| `metaTextColor` | 物理表、模型类、业务 Key 等元信息文字色 | `string` | `—` | — |
| `headerBackgroundColor` | 表头背景色 | `string` | `—` | — |
| `headerTextColor` | 表头文字色 | `string` | `—` | — |
| `bodyBackgroundColor` | 表体背景色，未设置时使用 `backgroundColor` | `string` | `—` | — |
| `bodyStripeBackgroundColor` | 表体斑马纹背景色 | `string` | `—` | — |
| `bodyTextColor` | 表体文字色，未设置时使用 `textColor` | `string` | `—` | — |
| `controlBackgroundColor` | 顶部选择器和弹窗输入框背景色，未设置时使用 `backgroundColor` | `string` | `—` | — |
| `controlTextColor` | 顶部选择器、表格内编辑控件和弹窗输入框文字色，未设置时使用 `textColor` | `string` | `—` | — |
| `controlBorderColor` | 顶部选择器和弹窗输入框边框色，未设置时使用 `borderColor` | `string` | `—` | — |
| `dropdownBackgroundColor` | 下拉面板背景色，未设置时使用 `controlBackgroundColor` 或 `backgroundColor` | `string` | `—` | — |
| `saveButtonBackgroundColor` | 保存按钮背景色 | `string` | `—` | — |
| `saveButtonTextColor` | 保存按钮文字色 | `string` | `—` | — |
| `saveButtonBorderColor` | 保存按钮边框色，未设置时使用 `saveButtonBackgroundColor` | `string` | `—` | — |
| `saveButtonActiveBackgroundColor` | 保存按钮按下背景色 | `string` | `—` | — |
| `saveButtonActiveBorderColor` | 保存按钮按下边框色 | `string` | `—` | — |
| `saveButtonActiveTextColor` | 保存按钮按下文字色 | `string` | `—` | — |
| `alignOptions` | 对齐方式选项 | `Array<DataTableSettingsOption<TableAlign>>` | `() => [     { label: '左', value: 'left' },     { label: '中', value: 'center' },     { label: '右', value: 'right' }   ]` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showTableMeta` | 是否显示物理表、模型类和业务 Key | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `adapter` | 远程数据适配器 | `DataTableSettingsAdapter` | `—` | — |
| `initialTableKey` | 初始选中的数据表 key | `string` | `—` | — |
| `displayTypeOptions` | 显示类型选项 | `Array<DataTableSettingsOption<DataTableSettingsDisplayType>>` | `() => [     { label: '默认', value: '' },     { label: '文本', value: 'text' },     { label: '标签', value: 'tag' },     { label: '布尔', value: 'boolean' },     { label: '日期', value: 'date' },     { label: '数字', value: 'number' }   ]` | — |
| `editorTypeOptions` | 编辑类型选项 | `Array<DataTableSettingsOption<DataTableSettingsEditorType>>` | `() => [     { label: '不编辑', value: '' },     { label: '输入框', value: 'input' },     { label: '自动完成', value: 'autocomplete' },     { label: '下拉选择', value: 'select' },     { label: '单选框', value: 'radio' },     { label: '开关', value: 'boolean' },     { label: '日期', value: 'date' },     { label: '日期时间', value: 'datetime' }   ]` | — |
| `keyTypeOptions` | Key 类型选项 | `Array<DataTableSettingsOption<DataTableSettingsKeyType>>` | `() => [     { label: '非 Key', value: '' },     { label: '主 Key', value: 'primary' },     { label: '普通 Key', value: 'normal' }   ]` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `table-change` | 当前选择的数据表变化 | `[table: DataTableSettingsTable \| null]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `loaded` | 当前表字段配置加载完成 | `[payload: DataTableSettingsLoadedPayload]` |
| `save-success` | 保存成功 | `[payload: DataTableSettingsSavePayload]` |
| `save-error` | 保存失败 | `[payload: DataTableSettingsErrorPayload]` |
| `load-error` | 加载失败 | `[payload: DataTableSettingsErrorPayload]` |

## 实例方法

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `reloadTables` | 重新加载数据表列表，并加载当前或默认表配置 | `() => Promise<void>` |
| `reloadSettings` | 重新加载当前表字段配置 | `() => Promise<void>` |
| `save` | 保存当前表字段配置 | `() => Promise<void>` |
| `getRows` | 获取当前编辑行副本 | `() => { columnKey: string; columnLabel: string; displayType: import("@x-soft88/x-ui").DataTableSettingsDisplayType; editType: DataTableSettingsEditorType; dataSourceKey: string; isKey: boolean; keyType: import("@x-soft88/x-ui").DataTableSettingsKeyType; isHidden: boolean; isSortable: boolean; align: import("@x-soft88/x-ui").TableAlign; defaultFormatter: string; sortOrder: number \| string; }[]` |
| `setSelectedTableKey` | 切换选中的数据表 | `(key: string) => Promise<void>` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DataTableSettingsDisplayType

```ts
export type DataTableSettingsDisplayType = '' | 'text' | 'tag' | 'boolean' | 'date' | 'number' | string
```

### DataTableSettingsEditorType

```ts
export type DataTableSettingsEditorType = '' | 'input' | 'autocomplete' | 'select' | 'radio' | 'boolean' | 'date' | 'datetime' | string
```

### DataTableSettingsKeyType

```ts
export type DataTableSettingsKeyType = '' | 'primary' | 'normal'
```

### DataTableSettingsOption

```ts
export interface DataTableSettingsOption<Value extends string = string> {
  label: string
  value: Value
}
```

### DataTableSettingsTable

```ts
export interface DataTableSettingsTable {
  tableKey: string
  label: string
  physicalTableName?: string
  modelName?: string
  modelFullName?: string
  group?: string
  businessKeys?: Array<{
    key: string
    label: string
  }>
}
```

### DataTableSettingsColumnMeta

```ts
export interface DataTableSettingsColumnMeta {
  key: string
  label?: string
  type?: DataTableSettingsDisplayType | null
  displayType?: DataTableSettingsDisplayType | null
  editType?: DataTableSettingsEditorType | null
  dataSourceKey?: string | null
  isKey?: boolean
  keyType?: DataTableSettingsKeyType | string | null
  isHidden?: boolean
  isSortable?: boolean
  sortable?: boolean
  align?: TableAlign | string | null
  defaultFormatter?: string | null
  sortOrder?: number
}
```

### DataTableSettingsRow

```ts
export interface DataTableSettingsRow {
  columnKey: string
  columnLabel: string
  displayType: DataTableSettingsDisplayType
  editType: DataTableSettingsEditorType
  dataSourceKey: string
  isKey: boolean
  keyType: DataTableSettingsKeyType
  isHidden: boolean
  isSortable: boolean
  align: TableAlign
  defaultFormatter: string
  sortOrder: number | string
}
```

### DataTableSettingsDataSourceOption

```ts
export interface DataTableSettingsDataSourceOption {
  key: string
  label: string
  name?: string
  sourceTableName?: string | null
  sourceColumnName?: string | null
  valueCount?: number
}
```

### DataTableSettingsAdapter

```ts
export interface DataTableSettingsAdapter {
  loadTables: () => Promise<DataTableSettingsTable[]> | DataTableSettingsTable[]
  loadColumns: (table: DataTableSettingsTable) => Promise<DataTableSettingsColumnMeta[]> | DataTableSettingsColumnMeta[]
  loadSettings: (table: DataTableSettingsTable) => Promise<DataTableSettingsRow[]> | DataTableSettingsRow[]
  saveSettings: (table: DataTableSettingsTable, rows: DataTableSettingsRow[]) => Promise<unknown> | unknown
  loadDataSources?: () => Promise<DataTableSettingsDataSourceOption[]> | DataTableSettingsDataSourceOption[]
}
```

### DataTableSettingsLoadedPayload

```ts
export interface DataTableSettingsLoadedPayload {
  table: DataTableSettingsTable | null
  rows: DataTableSettingsRow[]
}
```

### DataTableSettingsErrorPayload

```ts
export interface DataTableSettingsErrorPayload {
  stage: 'tables' | 'settings' | 'dataSources' | 'save'
  error: unknown
}
```

### DataTableSettingsSavePayload

```ts
export interface DataTableSettingsSavePayload {
  table: DataTableSettingsTable
  rows: DataTableSettingsRow[]
  result: unknown
}
```

### DataTableSettingsProps

```ts
export interface DataTableSettingsProps {
  adapter: DataTableSettingsAdapter
  initialTableKey?: string
  height?: number | string
  emptyText?: string
  saveButtonText?: string
  showTableMeta?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  metaTextColor?: string
  headerBackgroundColor?: string
  headerTextColor?: string
  bodyBackgroundColor?: string
  bodyStripeBackgroundColor?: string
  bodyTextColor?: string
  controlBackgroundColor?: string
  controlTextColor?: string
  controlBorderColor?: string
  dropdownBackgroundColor?: string
  saveButtonBackgroundColor?: string
  saveButtonTextColor?: string
  saveButtonBorderColor?: string
  saveButtonActiveBackgroundColor?: string
  saveButtonActiveBorderColor?: string
  saveButtonActiveTextColor?: string
  displayTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsDisplayType>>
  editorTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsEditorType>>
  alignOptions?: Array<DataTableSettingsOption<TableAlign>>
  keyTypeOptions?: Array<DataTableSettingsOption<DataTableSettingsKeyType>>
}
```

## 验收说明

- 检查默认加载第一张表后，表元信息和字段配置是否显示。
- 切换数据表，确认会重新请求字段元数据和已保存配置。
- 修改显示名、显示类型、编辑类型、数据源、Key、隐藏、排序、对齐方式和默认格式后保存，确认 `saveSettings` 收到规范化后的字段。
- 把某字段设置为主 Key，确认其它主 Key 自动降为普通 Key，当前 Key 不可隐藏。
- 拖拽字段行后保存，确认 `sortOrder` 按新顺序递增。

- 调整 `dropdownBackgroundColor` 后，依次打开顶部数据表及行内显示类型、编辑类型、数据源、Key、对齐方式下拉框，检查面板背景颜色。未设置时先使用 `controlBackgroundColor`，再使用 `backgroundColor`；最终交给 Select 自身的样式默认值。

- Story 使用独立的内存适配器：编辑后调用 `save`，切换数据表再切回可读取本场景保存结果；点击“恢复默认”会重建适配器及初始数据，不会写入实际业务后端。按钮文字与适配器共用公共属性面板，加载、切换和保存事件在公共日志中查看。
