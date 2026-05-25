# 文件磁盘 FileDisk

`XFileDisk` 用于在相对目录下管理单据附件，提供类似资源管理器的目录浏览、上传、下载、复制、剪切、粘贴和删除能力。组件默认撑满父容器，实际文件读写通过业务侧 `adapter` 对接后端接口，便于按单据、用户或角色控制读、写、删、看权限。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XFileDisk } from 'x.ui'
import type { FileDiskAdapter } from 'x.ui'
import 'x.ui/style.css'

const path = ref('/合同附件')

const adapter: FileDiskAdapter = {
  list: (path) => fetch(`/api/files?path=${encodeURIComponent(path)}`).then((res) => res.json()),
  createFolder: (path, name) => fetch('/api/files/folders', { method: 'POST', body: JSON.stringify({ path, name }) }),
  upload: (path, files, context) => {
    const form = new FormData()
    form.append('path', path)
    files.forEach((file) => form.append('files', file))
    // 业务侧可以在 XHR / 分片上传中调用 context.onProgress({ file, percent })
    return fetch('/api/files/upload', { method: 'POST', body: form })
  },
  download: (path, items, options) => {
    return fetch('/api/files/download', {
      method: 'POST',
      body: JSON.stringify({ path, items, archive: options.archive })
    }).then(() => undefined)
  },
  remove: (path, items) => fetch('/api/files', { method: 'DELETE', body: JSON.stringify({ path, items }) }),
  rename: (path, item, name) => fetch('/api/files/rename', { method: 'POST', body: JSON.stringify({ path, item, name }) }),
  copy: (payload) => fetch('/api/files/copy', { method: 'POST', body: JSON.stringify(payload) }),
  move: (payload) => fetch('/api/files/move', { method: 'POST', body: JSON.stringify(payload) })
}
</script>

<template>
  <div style="height: 520px">
    <XFileDisk
      v-model="path"
      title="销售单附件"
      :adapter="adapter"
      :permissions="{ read: true, write: true, delete: true, view: true }"
    />
  </div>
</template>
```

## 权限控制

```vue
<XFileDisk
  :entries="entries"
  :permissions="{ read: true, write: false, delete: false, view: true }"
/>
```

`read` 控制目录读取，`write` 控制新建目录、上传和粘贴，`delete` 控制删除，`view` 控制双击打开目录或文件。

## 主题配色

通过主题 props 或 `colors` 可以覆盖文件磁盘常用配色，便于和业务系统主题色保持一致。x.ui 默认色保持通用，不内置具体业务系统主题；未传入的字段会继续使用组件默认色或全局设计变量。

```vue
<XFileDisk
  :entries="entries"
  background-color="#0f172a"
  text-color="#e2e8f0"
  muted-text-color="#94a3b8"
  border-color="#334155"
  header-background-color="#111827"
  toolbar-background-color="#1e293b"
  item-background-color="#111827"
  item-hover-background-color="#1e3a5f"
  item-active-background-color="#155e75"
  item-active-text-color="#f8fafc"
  icon-color="#cbd5e1"
  active-icon-color="#67e8f9"
  empty-background-color="#111827"
  drag-over-background-color="rgba(103, 232, 249, 0.14)"
  :colors="{
    primary: '#67e8f9',
    primarySoft: 'rgba(103, 232, 249, 0.16)',
    primaryWeak: 'rgba(103, 232, 249, 0.10)',
    success: '#16a34a',
    danger: '#dc2626'
  }"
/>
```

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

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前相对路径 | `string` | `/` |
| `entries` | 外部受控的当前目录文件列表 | `FileDiskItem[]` | `[]` |
| `adapter` | 后端文件操作适配器 | `FileDiskAdapter` | - |
| `permissions` | 读、写、删、看权限 | `Partial<Record<FileDiskPermission, boolean>>` | 全部允许 |
| `viewMode` / `v-model:viewMode` | 显示方式 | `'list' \| 'grid'` | `list` |
| `title` | 左上角标题 | `string` | `附件管理` |
| `loading` | 外部加载状态 | `boolean` | `false` |
| `colors` | 常用主题配色配置 | `FileDiskColors` | - |
| `backgroundColor` | 整体背景 | `string` | - |
| `textColor` | 主文字颜色 | `string` | - |
| `mutedTextColor` | 次级文字、空状态文字 | `string` | - |
| `borderColor` | 外框、分割线、文件项边框 | `string` | - |
| `headerBackgroundColor` | 头部背景 | `string` | - |
| `toolbarBackgroundColor` | 工具栏按钮背景 | `string` | - |
| `itemBackgroundColor` | 文件/目录项背景 | `string` | - |
| `itemHoverBackgroundColor` | 文件/目录项 hover 背景 | `string` | - |
| `itemActiveBackgroundColor` | 选中项背景 | `string` | - |
| `itemActiveTextColor` | 选中项文字 | `string` | - |
| `iconColor` | 普通图标颜色 | `string` | - |
| `activeIconColor` | 选中或强调图标颜色 | `string` | - |
| `emptyBackgroundColor` | 空状态背景 | `string` | - |
| `dragOverBackgroundColor` | 拖拽悬浮背景 | `string` | - |
| `emptyText` | 空目录文案 | `string` | `暂无文件` |
| `multiple` | 文件选择器是否允许多选 | `boolean` | `true` |
| `accept` | 上传文件类型限制 | `string` | - |
| `disabled` | 禁用写入类操作 | `boolean` | `false` |
| `showHeader` | 是否显示顶部标题和工具栏区域 | `boolean` | `true` |
| `showTitle` | 是否显示标题文字和数量 | `boolean` | `true` |
| `showToolbar` | 是否显示顶部功能图标 | `boolean` | `true` |
| `showPath` | 是否显示路径栏和返回上级按钮 | `boolean` | `true` |
| `promptFolderName` | 自定义新建目录名称输入 | `(path) => string \| null \| Promise<string \| null>` | - |

## FileDiskColors

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

## 上传进度

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

## 图片预览

`jpg`、`jpeg`、`png`、`gif`、`webp`、`bmp`、`svg`、`avif` 等图片文件会优先显示缩略图。业务侧可以在 `FileDiskItem` 中提供 `thumbnailUrl`、`previewUrl` 或 `url`，也可以放在 `meta.thumbnailUrl`、`meta.previewUrl`、`meta.url` 中。双击图片时组件会全屏预览，并支持在当前目录的所有图片中通过按钮或鼠标滚轮切换。

## FileDiskItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 唯一标识 | `string \| number` |
| `name` | 文件或目录名 | `string` |
| `type` | 类型 | `'file' \| 'folder'` |
| `size` | 文件大小，单位 B | `number` |
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

## Events

| 事件 | 说明 |
| --- | --- |
| `update:modelValue` | 路径变化 |
| `update:viewMode` | 视图变化 |
| `selection-change` | 多选内容变化 |
| `path-change` | 点击面包屑、返回上级或双击目录后触发 |
| `create-folder` | 请求新建目录 |
| `upload` | 请求上传文件 |
| `download` | 请求下载；单个文件为直接下载，多个或目录为压缩包 |
| `delete` | 请求删除选中项 |
| `rename` | 重命名单个文件或目录 |
| `copy` | 复制选中项 |
| `cut` | 剪切选中项 |
| `paste` | 粘贴到当前路径 |
| `refresh` | 刷新当前目录 |
| `open` | 双击非图片文件时触发；图片文件会优先进入内置预览 |

## 手动验收建议

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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XFileDisk / `FileDiskProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
