# 数据表设置 DataTableSettings

`XDataTableSettings` 是一个完整的数据表字段配置面板，用于把“远程获取数据表列表、选择数据表、加载字段配置、编辑字段配置、保存回后端”的流程封装成通用组件。

组件不内置 axios、URL、鉴权或业务权限；所有远程行为都通过 `adapter` 回调注入，适合在不同业务项目中复用。

## 基础用法

```vue
<script setup lang="ts">
import { XDataTableSettings, type DataTableSettingsAdapter } from 'x.ui'

const adapter: DataTableSettingsAdapter = {
  loadTables: () => http.get('/system/data-tables').then((res) => res.data),
  loadColumns: (table) => http.get(`/system/data-tables/${table.tableKey}/columns`).then((res) => res.data),
  loadSettings: (table) => http.get(`/system/table-column-settings/${table.tableKey}`).then((res) => res.data),
  loadDataSources: () => http.get('/system/dictionaries/sources').then((res) => res.data),
  saveSettings: (table, rows) => http.put(`/system/table-column-settings/${table.tableKey}`, { items: rows })
}
</script>

<template>
  <XDataTableSettings :adapter="adapter" height="100%" />
</template>
```

## 主题配色

业务项目可以通过公开配色属性覆盖组件外层、表格、内置控件和保存按钮的主题色，不需要依赖深层选择器。

```vue
<template>
  <XDataTableSettings
    :adapter="adapter"
    background-color="#ffffff"
    text-color="#0f172a"
    border-color="#d7e3f0"
    header-background-color="#f3f7fb"
    header-text-color="#0f172a"
    control-border-color="#cbd5e1"
    save-button-background-color="#1264f4"
    save-button-text-color="#ffffff"
  />
</template>
```

## 远程适配器

`adapter` 必须提供数据表列表、字段元数据、已保存配置和保存配置四个回调。组件会先调用 `loadTables`，默认选择第一张表；用户切换表后会并行调用 `loadColumns` 和 `loadSettings`，并把二者合并为可编辑行。

`loadDataSources` 可选，用于给下拉、单选、自动完成等编辑类型提供数据源选项。

保存时组件会统一规范化字段：

- `keyType` 为 `primary` 或 `normal` 时自动设置 `isKey: true`，并强制 `isHidden: false`。
- 非 `select`、`radio`、`autocomplete` 编辑类型不会保留 `dataSourceKey`。
- 拖拽排序后会按当前行顺序重算 `sortOrder`。

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| adapter | 远程数据适配器 | `DataTableSettingsAdapter` | 必填 |
| initialTableKey | 初始选中的数据表 key | `string` | - |
| height | 组件高度，数字会转为 px | `number \| string` | `'100%'` |
| emptyText | 字段空态文案 | `string` | `'暂无字段配置'` |
| saveButtonText | 保存按钮文案 | `string` | `'保存配置'` |
| showTableMeta | 是否显示物理表、模型类和业务 Key | `boolean` | `true` |
| backgroundColor | 组件外层和表格面板背景色 | `string` | - |
| textColor | 组件主文字色，作为表体和控件文字色兜底 | `string` | - |
| borderColor | 组件外框、表格线和控件边框色兜底 | `string` | - |
| metaTextColor | 物理表、模型类、业务 Key 等元信息文字色 | `string` | - |
| headerBackgroundColor | 表头背景色 | `string` | - |
| headerTextColor | 表头文字色 | `string` | - |
| bodyBackgroundColor | 表体背景色，未设置时使用 `backgroundColor` | `string` | - |
| bodyStripeBackgroundColor | 表体斑马纹背景色 | `string` | - |
| bodyTextColor | 表体文字色，未设置时使用 `textColor` | `string` | - |
| controlBackgroundColor | 顶部选择器和弹窗输入框背景色，未设置时使用 `backgroundColor` | `string` | - |
| controlTextColor | 顶部选择器、表格内编辑控件和弹窗输入框文字色，未设置时使用 `textColor` | `string` | - |
| controlBorderColor | 顶部选择器和弹窗输入框边框色，未设置时使用 `borderColor` | `string` | - |
| dropdownBackgroundColor | 下拉面板背景色，未设置时使用 `controlBackgroundColor` 或 `backgroundColor` | `string` | - |
| saveButtonBackgroundColor | 保存按钮背景色 | `string` | - |
| saveButtonTextColor | 保存按钮文字色 | `string` | - |
| saveButtonBorderColor | 保存按钮边框色，未设置时使用 `saveButtonBackgroundColor` | `string` | - |
| saveButtonActiveBackgroundColor | 保存按钮按下背景色 | `string` | - |
| saveButtonActiveBorderColor | 保存按钮按下边框色 | `string` | - |
| saveButtonActiveTextColor | 保存按钮按下文字色 | `string` | - |
| displayTypeOptions | 显示类型选项 | `DataTableSettingsOption[]` | 内置常用选项 |
| editorTypeOptions | 编辑类型选项 | `DataTableSettingsOption[]` | 内置常用选项 |
| alignOptions | 对齐方式选项 | `DataTableSettingsOption[]` | 左、中、右 |
| keyTypeOptions | Key 类型选项 | `DataTableSettingsOption[]` | 非 Key、主 Key、普通 Key |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| loaded | 当前表字段配置加载完成 | `{ table, rows }` |
| table-change | 当前选择的数据表变化 | `DataTableSettingsTable \| null` |
| save-success | 保存成功 | `{ table, rows, result }` |
| save-error | 保存失败 | `{ stage, error }` |
| load-error | 加载失败 | `{ stage, error }` |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| reloadTables | 重新加载数据表列表，并加载当前或默认表配置 | `() => Promise<void>` |
| reloadSettings | 重新加载当前表字段配置 | `() => Promise<void>` |
| save | 保存当前表字段配置 | `() => Promise<void>` |
| getRows | 获取当前编辑行副本 | `() => DataTableSettingsRow[]` |
| setSelectedTableKey | 切换选中的数据表 | `(key: string) => Promise<void>` |

## 手动验收建议

- 检查默认加载第一张表后，表元信息和字段配置是否显示。
- 切换数据表，确认会重新请求字段元数据和已保存配置。
- 修改显示名、显示类型、编辑类型、数据源、Key、隐藏、排序、对齐方式和默认格式后保存，确认 `saveSettings` 收到规范化后的字段。
- 把某字段设置为主 Key，确认其它主 Key 自动降为普通 Key，当前 Key 不可隐藏。
- 拖拽字段行后保存，确认 `sortOrder` 按新顺序递增。
