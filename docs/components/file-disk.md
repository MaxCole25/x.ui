<script setup lang="ts">
import Example1 from '../examples/file-disk/Example1.vue'
import Example1Source from '../examples/file-disk/Example1.vue?raw'
import Example2 from '../examples/file-disk/Example2.vue'
import Example2Source from '../examples/file-disk/Example2.vue?raw'
import Example3 from '../examples/file-disk/Example3.vue'
import Example3Source from '../examples/file-disk/Example3.vue?raw'
import Example4 from '../examples/file-disk/Example4.vue'
import Example4Source from '../examples/file-disk/Example4.vue?raw'
</script>
# 文件磁盘 FileDisk

`XFileDisk` 用于在相对目录下管理单据附件，提供类似资源管理器的目录浏览、上传、下载、复制、剪切、粘贴和删除能力。组件默认撑满父容器，实际文件读写通过业务侧 `adapter` 对接后端接口，便于按单据、用户或角色控制读、写、删、看权限。

## 使用示例

非根目录会在文件内容区首项显示「上级目录」，点击即可返回上一级；列表和图标视图均支持，根目录不显示该入口。上级目录不参与选择、计数或文件操作。

设置 `:enable-minimize="true"` 后仅显示文件内容区，隐藏标题、工具栏和路径栏；仍可通过上级目录入口导航，通过右键菜单操作文件和切换视图。

网格模式采用约 112px 宽的紧凑文件项，从左向右排列，图标、文件名和辅助信息分行显示；上级目录使用柔和绿色箭头图标。列表模式铺满内容区宽度，窄容器下可横向滚动。

`viewMode` 支持 'grid'（图标）和 'list'（列表）。点击工具栏或右键菜单即可切换，也可使用 `v-model:viewMode` 同步外部状态。

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 最小化显示

设置 `:enable-minimize="true"`，隐藏标题、工具栏和路径栏，仅保留文件内容区。此示例从「设计稿」目录开始：点击「上级目录」返回根目录，再双击「设计稿」进入子目录；根目录不显示上级入口。右键菜单仍可切换列表和网格视图。

<XDocDemo title="最小化显示" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 权限控制

<XDocDemo title="权限控制" :code="Example2Source">
  <Example2 />
</XDocDemo>

`read` 控制目录读取，`write` 控制新建目录、上传和粘贴，`delete` 控制删除，`view` 控制双击打开目录或文件。

### 主题配色

`XFileDisk` 默认跟随 @x-soft88/x-ui 全局主题语义变量；切换 `data-theme="regular"`、`light` 或 `dark` 时，主体、表头、文字、边框、悬浮和选中状态会同步变化。通过主题 props 或 `colors` 可以局部覆盖文件磁盘常用配色；未传入的字段继续使用全局设计变量。

<XDocDemo title="主题配色" :code="Example3Source">
  <Example3 />
</XDocDemo>

这些 props 会映射为组件根节点上的 CSS variables，也可以直接通过外部 CSS 覆盖：

| prop | CSS variable | 说明 |
| --- | --- | --- |
| `backgroundColor` | `--x-file-disk-bg` | 整体背景 |
| `textColor` | `--x-file-disk-text` | 主文字颜色 |
| `mutedTextColor` | `--x-file-disk-muted-text` | 次级文字、空状态文字 |
| `borderColor` | `--x-file-disk-border-color` | 外框、分割线、文件项边框 |
| `headerBackgroundColor` | `--x-file-disk-header-bg` | 头部背景 |
| `toolbarBackgroundColor` | `--x-file-disk-toolbar-bg` | 工具栏按钮背景 |
| `itemBackgroundColor` | `--x-file-disk-item-bg` | 文件/目录项背景 |
| `itemHoverBackgroundColor` | `--x-file-disk-item-hover-bg` | 文件/目录项 hover 背景 |
| `itemActiveBackgroundColor` | `--x-file-disk-item-active-bg` | 选中项背景 |
| `itemActiveTextColor` | `--x-file-disk-item-active-text` | 选中项文字 |
| `iconColor` | `--x-file-disk-icon-color` | 普通图标颜色 |
| `activeIconColor` | `--x-file-disk-active-icon-color` | 选中或强调图标颜色 |
| `emptyBackgroundColor` | `--x-file-disk-empty-bg` | 空状态背景 |
| `dragOverBackgroundColor` | `--x-file-disk-drag-over-bg` | 拖拽悬浮背景 |

### FileDiskColors

| 字段 | 说明 |
| --- | --- |
| `backgroundColor` | 整体背景，对应 `--x-file-disk-bg` |
| `textColor` | 主文字颜色，对应 `--x-file-disk-text` |
| `mutedTextColor` | 次级文字、空状态文字，对应 `--x-file-disk-muted-text` |
| `borderColor` | 外框、分割线、文件项边框，对应 `--x-file-disk-border-color` |
| `headerBackgroundColor` | 头部背景，对应 `--x-file-disk-header-bg` |
| `toolbarBackgroundColor` | 工具栏按钮背景，对应 `--x-file-disk-toolbar-bg` |
| `itemBackgroundColor` | 文件/目录项背景，对应 `--x-file-disk-item-bg` |
| `itemHoverBackgroundColor` | 文件/目录项 hover 背景，对应 `--x-file-disk-item-hover-bg` |
| `itemActiveBackgroundColor` | 选中项背景，对应 `--x-file-disk-item-active-bg` |
| `itemActiveTextColor` | 选中项文字，对应 `--x-file-disk-item-active-text` |
| `iconColor` | 普通图标颜色，对应 `--x-file-disk-icon-color` |
| `activeIconColor` | 选中或强调图标颜色，对应 `--x-file-disk-active-icon-color` |
| `emptyBackgroundColor` | 空状态背景，对应 `--x-file-disk-empty-bg` |
| `dragOverBackgroundColor` | 拖拽悬浮背景，对应 `--x-file-disk-drag-over-bg` |
| `primary` | 主色，用于工具按钮激活、路径悬停、拖拽蒙层和上传进度 |
| `primarySoft` | 主色浅底，用于按钮悬停、输入框聚焦阴影 |
| `primaryWeak` | 更弱的主色底，用于路径和菜单悬停 |
| `background` | 组件外层背景 |
| `toolbarBackground` | 顶部工具栏和表头背景 |
| `pathBackground` | 路径栏背景 |
| `panelBackground` | 按钮、文件项、表格单元格、菜单和上传面板背景 |
| `text` | 主要文字颜色 |
| `mutedText` | 次级文字颜色 |
| `subtleText` | 工具按钮、菜单和上传面板文字颜色 |
| `border` | 主要边框颜色 |
| `softBorder` | 分割线、表格线、缩略图边框等弱边框颜色 |
| `hoverBackground` | 文件项悬停背景 |
| `selectedBackground` | 文件项选中背景 |
| `selectedBorder` | 图标视图选中文件项边框 |
| `disabledText` | 禁用文字颜色 |
| `thumbBackground` | 缩略图默认背景 |
| `selectionBackground` | 框选区域背景 |
| `selectionBorder` | 框选区域边框 |
| `dropBackground` | 拖拽上传蒙层背景 |
| `success` | 上传成功进度条颜色 |
| `danger` | 上传失败进度条颜色 |
| `previewBackground` | 图片预览遮罩背景 |
| `previewText` | 图片预览文字和按钮图标颜色 |
| `previewControlBackground` | 图片预览按钮背景 |
| `previewControlBorder` | 图片预览按钮边框 |
| `previewControlHoverBackground` | 图片预览按钮悬停背景 |
| `shadow` | 右键菜单和上传面板阴影 |

### 上传进度

大文件上传时组件会在底部悬浮显示每个文件的进度条。业务侧适配器可以在上传过程中调用第三个参数中的 `onProgress`：

```ts
const adapter: FileDiskAdapter = {
  async upload(path, files, { onProgress }) {
    await uploadByChunks(files, {
      onFileProgress(file, percent) {
        onProgress({ file, percent })
      }
    })
  }
}
```

### 图片预览

`jpg`、`jpeg`、`png`、`gif`、`webp`、`bmp`、`svg`、`avif` 等图片文件会优先显示缩略图。业务侧可以在 `FileDiskItem` 中提供 `thumbnailUrl`、`previewUrl` 或 `url`，也可以放在 `meta.thumbnailUrl`、`meta.previewUrl`、`meta.url` 中。双击图片时组件会全屏预览，并支持在当前目录的所有图片中通过按钮或鼠标滚轮切换。

### FileDiskItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 唯一标识 | `string \| number` |
| `name` | 文件或目录名 | `string` |
| `type` | 类型 | `'file' \| 'folder'` |
| fontSize | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` |
| `extension` | 文件扩展名 | `string` |
| `mimeType` | MIME 类型 | `string` |
| `url` | 文件访问地址，图片可用于缩略图和预览 | `string` |
| `thumbnailUrl` | 图片缩略图地址 | `string` |
| `previewUrl` | 图片大图预览地址 | `string` |
| `updatedAt` | 更新时间 | `string` |
| `path` | 可选完整相对路径 | `string` |
| `readonly` | 业务只读标记 | `boolean` |
| `disabled` | 当前项不可选择 | `boolean` |
| `meta` | 后端扩展数据 | `Record<string, unknown>` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | `'/'` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 左上角标题 | `string` | `'附件管理'` | — |
| `emptyText` | 空目录文案 | `string` | `'暂无文件'` | — |
| `promptFolderName` | 自定义新建目录名称输入 | `(path: string) => string \| null \| Promise<string \| null>` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `colors` | 常用主题配色配置 | `FileDiskColors` | `—` | — |
| `backgroundColor` | `--x-file-disk-bg` | `string` | `—` | — |
| `textColor` | `--x-file-disk-text` | `string` | `—` | — |
| `mutedTextColor` | `--x-file-disk-muted-text` | `string` | `—` | — |
| `borderColor` | `--x-file-disk-border-color` | `string` | `—` | — |
| `headerBackgroundColor` | `--x-file-disk-header-bg` | `string` | `—` | — |
| `toolbarBackgroundColor` | `--x-file-disk-toolbar-bg` | `string` | `—` | — |
| `itemBackgroundColor` | `--x-file-disk-item-bg` | `string` | `—` | — |
| `itemHoverBackgroundColor` | `--x-file-disk-item-hover-bg` | `string` | `—` | — |
| `itemActiveBackgroundColor` | `--x-file-disk-item-active-bg` | `string` | `—` | — |
| `itemActiveTextColor` | `--x-file-disk-item-active-text` | `string` | `—` | — |
| `iconColor` | `--x-file-disk-icon-color` | `string` | `—` | — |
| `activeIconColor` | `--x-file-disk-active-icon-color` | `string` | `—` | — |
| `emptyBackgroundColor` | `--x-file-disk-empty-bg` | `string` | `—` | — |
| `dragOverBackgroundColor` | `--x-file-disk-drag-over-bg` | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 外部加载状态 | `boolean` | `false` | — |
| `disabled` | 当前项不可选择 | `boolean` | `false` | — |
| `showHeader` | 是否显示顶部标题和工具栏区域 | `boolean` | `true` | — |
| `showTitle` | 是否显示标题文字和数量 | `boolean` | `true` | — |
| `showToolbar` | 是否显示顶部功能图标 | `boolean` | `true` | — |
| `showPath` | 是否显示路径栏和返回上级按钮 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `entries` | 外部受控的当前目录文件列表 | `FileDiskItem[]` | `() => []` | — |
| `adapter` | 后端文件操作适配器 | `FileDiskAdapter` | `—` | — |
| `permissions` | 读、写、删、看权限 | `Partial<Record<FileDiskPermission, boolean>>` | `() => ({ read: true, write: true, delete: true, view: true })` | — |
| `viewMode` | 文件展示模式：列表或网格 | `FileDiskViewMode` | `'grid'` | — |
| `enableMinimize` | 是否最小化显示，仅展示文件内容区 | `boolean` | `false` | — |
| `multiple` | 文件选择器是否允许多选 | `boolean` | `true` | — |
| `accept` | 上传文件类型限制 | `string` | `''` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 路径变化 | `[value: string]` |
| `update:viewMode` | 视图变化 | `[value: FileDiskViewMode]` |

### 内容与展示

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `rename` | 重命名单个文件或目录 | `[payload: FileDiskRenamePayload]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `selection-change` | 多选内容变化 | `[items: FileDiskItem[]]` |
| `path-change` | 点击面包屑、返回上级或双击目录后触发 | `[path: string]` |
| `open` | 双击非图片文件时触发；图片文件会优先进入内置预览 | `[item: FileDiskItem]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `create-folder` | 请求新建目录 | `[payload: { path: string; name: string }]` |
| `upload` | 请求上传文件 | `[payload: FileDiskUploadPayload]` |
| `download` | 请求下载；单个文件为直接下载，多个或目录为压缩包 | `[payload: FileDiskDownloadPayload]` |
| `delete` | 请求删除选中项 | `[payload: { path: string; items: FileDiskItem[] }]` |
| `copy` | 复制选中项 | `[payload: FileDiskClipboardPayload]` |
| `cut` | 剪切选中项 | `[payload: FileDiskClipboardPayload]` |
| `paste` | 粘贴到当前路径 | `[payload: FileDiskClipboardPayload]` |
| `refresh` | 刷新当前目录 | `[path: string]` |

## 实例方法

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `clearSelection` | clearSelection 方法 | `() => void` |
| `openPath` | openPath 方法 | `(path: string) => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `refresh` | 刷新当前目录 | `() => Promise<void>` |
| `getSelection` | getSelection 方法 | `() => FileDiskItem[]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### FileDiskItemType

```ts
export type FileDiskItemType = 'file' | 'folder'
```

### FileDiskViewMode

```ts
export type FileDiskViewMode = 'list' | 'grid'
```

### FileDiskPermission

```ts
export type FileDiskPermission = 'read' | 'write' | 'delete' | 'view'
```

### FileDiskClipboardAction

```ts
export type FileDiskClipboardAction = 'copy' | 'cut'
```

### FileDiskColors

```ts
export interface FileDiskColors {
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
  headerBackgroundColor?: string
  toolbarBackgroundColor?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  iconColor?: string
  activeIconColor?: string
  emptyBackgroundColor?: string
  dragOverBackgroundColor?: string
  primary?: string
  primarySoft?: string
  primaryWeak?: string
  background?: string
  toolbarBackground?: string
  pathBackground?: string
  panelBackground?: string
  text?: string
  mutedText?: string
  subtleText?: string
  border?: string
  softBorder?: string
  hoverBackground?: string
  selectedBackground?: string
  selectedBorder?: string
  disabledText?: string
  thumbBackground?: string
  selectionBackground?: string
  selectionBorder?: string
  dropBackground?: string
  success?: string
  danger?: string
  previewBackground?: string
  previewText?: string
  previewControlBackground?: string
  previewControlBorder?: string
  previewControlHoverBackground?: string
  shadow?: string
}
```

### FileDiskItem

```ts
export interface FileDiskItem {
  id: string | number
  name: string
  type: FileDiskItemType
  size?: number
  extension?: string
  mimeType?: string
  url?: string
  thumbnailUrl?: string
  previewUrl?: string
  updatedAt?: string
  createdAt?: string
  path?: string
  readonly?: boolean
  disabled?: boolean
  meta?: Record<string, unknown>
}
```

### FileDiskDownloadOptions

```ts
export interface FileDiskDownloadOptions {
  archive: boolean
  filename?: string
}
```

### FileDiskTransferPayload

```ts
export interface FileDiskTransferPayload {
  sourcePath: string
  targetPath: string
  items: FileDiskItem[]
}
```

### FileDiskAdapter

```ts
export interface FileDiskAdapter {
  list?: (path: string) => FileDiskItem[] | Promise<FileDiskItem[]>
  getFileUrl?: (path: string, item: FileDiskItem, usage: FileDiskFileUrlUsage) => string | Promise<string>
  createFolder?: (path: string, name: string) => FileDiskItem | void | Promise<FileDiskItem | void>
  upload?: (path: string, files: File[], context: FileDiskUploadContext) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
  download?: (path: string, items: FileDiskItem[], options: FileDiskDownloadOptions) => void | Promise<void>
  remove?: (path: string, items: FileDiskItem[]) => void | Promise<void>
  rename?: (path: string, item: FileDiskItem, name: string) => FileDiskItem | void | Promise<FileDiskItem | void>
  copy?: (payload: FileDiskTransferPayload) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
  move?: (payload: FileDiskTransferPayload) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
}
```

### FileDiskCreateFolderPayload

```ts
export interface FileDiskCreateFolderPayload {
  path: string
  name: string
}
```

### FileDiskUploadPayload

```ts
export interface FileDiskUploadPayload {
  path: string
  files: File[]
}
```

### FileDiskDownloadPayload

```ts
export interface FileDiskDownloadPayload {
  path: string
  items: FileDiskItem[]
  archive: boolean
}
```

### FileDiskRenamePayload

```ts
export interface FileDiskRenamePayload {
  path: string
  item: FileDiskItem
  name: string
}
```

### FileDiskClipboardPayload

```ts
export interface FileDiskClipboardPayload {
  action: FileDiskClipboardAction
  sourcePath: string
  targetPath?: string
  items: FileDiskItem[]
}
```

### FileDiskProps

```ts
export interface FileDiskProps {
  fontSize?: number
  modelValue?: string
  entries?: FileDiskItem[]
  adapter?: FileDiskAdapter
  permissions?: Partial<Record<FileDiskPermission, boolean>>
  viewMode?: FileDiskViewMode
  title?: string
  loading?: boolean
  colors?: FileDiskColors
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
  headerBackgroundColor?: string
  toolbarBackgroundColor?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  iconColor?: string
  activeIconColor?: string
  emptyBackgroundColor?: string
  dragOverBackgroundColor?: string
  emptyText?: string
  multiple?: boolean
  accept?: string
  disabled?: boolean
  showHeader?: boolean
  showTitle?: boolean
  showToolbar?: boolean
  showPath?: boolean
  enableMinimize?: boolean
  promptFolderName?: (path: string) => string | null | Promise<string | null>
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### FileDiskUploadStatus

```ts
export type FileDiskUploadStatus = 'uploading' | 'success' | 'error'
```

### FileDiskFileUrlUsage

```ts
export type FileDiskFileUrlUsage = 'thumbnail' | 'preview' | 'download'
```

### FileDiskUploadProgress

```ts
export interface FileDiskUploadProgress {
  file: File
  percent: number
}
```

### FileDiskUploadContext

```ts
export interface FileDiskUploadContext {
  onProgress: (progress: FileDiskUploadProgress) => void
}
```

## 验收说明

Histoire 的外观接口使用内存 adapter，可检查上传进度、目录和文件操作；恢复默认会重新创建目录存储。该场景的下载只通过 `download` 事件日志核对参数，不产生实际文件；正式接入仍需对照业务 adapter 验证实际下载结果。

- 将父容器高度改为不同尺寸，确认组件始终撑满并在内部滚动。
- 在列表视图中放入较多文件，滚动时确认表头固定。
- 双击目录进入子级，点击路径文字跳回上级目录。
- 切换读、写、删、看权限，确认对应按钮和双击行为受控。
- 选择一个文件下载时应走直接下载；选择多个或目录时应走压缩包下载。
- 在 Histoire 中测试上传、新建目录、复制、剪切、粘贴和删除。
- 在文件区域空白处拖动框选，确认列表视图和图标视图都能多选。
- 点击新建目录，确认文件区出现待编辑目录名称输入框，不出现弹窗。
- 右键文件区域，确认菜单按创建、上传、选中项操作、剪贴板、危险操作和视图切换分组。
- 右键单个文件或目录，确认可以重命名；未选择或多选时重命名应禁用。
- 文件名被截断时悬停查看完整名称提示。
- 图片文件显示缩略图，双击后确认可全屏预览，并能在当前目录图片中滚轮切换。
