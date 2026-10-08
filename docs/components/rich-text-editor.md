<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
const Example1 = defineClientComponent(() => import('../examples/rich-text-editor/Example1.vue'))
import Example1Source from '../examples/rich-text-editor/Example1.vue?raw'
const Example2 = defineClientComponent(() => import('../examples/rich-text-editor/Example2.vue'))
import Example2Source from '../examples/rich-text-editor/Example2.vue?raw'
const Example3 = defineClientComponent(() => import('../examples/rich-text-editor/Example3.vue'))
import Example3Source from '../examples/rich-text-editor/Example3.vue?raw'
</script>
# 富文本 RichTextEditor



`XRichTextEditor` 是从 NexMod `XlEdit` 迁移来的完整 TipTap 富文本编辑器，适合文档编辑、知识库正文、富文本消息和后台内容录入场景。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 保存为 JSON 字符串

组件推荐把 `modelValue` 保存为 TipTap JSON 字符串。传入空字符串时会显示空文档；传入非 JSON 字符串时会按 HTML 内容载入，便于兼容旧数据。

<XDocDemo title="保存为 JSON 字符串" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 填满父容器高度

`minHeight` 用于普通表单、弹窗等场景，控制编辑区域的最小高度。若父容器已经有明确高度，并希望富文本整体占满剩余空间，请使用 `fullHeight`。开启后组件根节点、编辑器外壳、内容区和 ProseMirror 编辑面会沿父容器高度链填满，工具栏保持自身高度，滚动保留在内容 viewport 内。

<XDocDemo title="填满父容器高度" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 工具栏白名单

通过 `toolbarButtons` 控制哪些工具功能可见。组件导出了 `RICH_TEXT_EDITOR_TOOLBAR_BUTTONS` 和 `RichTextEditorToolbarButton`，可用于复用完整列表或做类型约束。

```ts
import { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS, type RichTextEditorToolbarButton } from '@x-soft88/x-ui'

const allTools = [...RICH_TEXT_EDITOR_TOOLBAR_BUTTONS]

const toolbarButtons: RichTextEditorToolbarButton[] = [
  'save',
  'import-markdown',
  'undo',
  'redo',
  'bold',
  'italic',
  'underline',
  'bullet-list',
  'ordered-list',
  'blockquote',
  'link',
  'image',
  'attachment',
  'table'
]
```

可配置工具项如下：

| 工具项 | 功能 |
| --- | --- |
| `save` | 保存按钮，配合 `canSave` 和 `save-doc` 使用 |
| `import-markdown` | 导入 Markdown 文件 |
| `undo` / `redo` | 撤销、重做 |
| `bold` / `italic` / `underline` / `strike` | 加粗、斜体、下划线、删除线 |
| `code` / `subscript` / `superscript` / `clear-formatting` / `format-painter` | 行内代码、下标、上标、清除格式、格式刷 |
| `font-family` / `font-size` | 字体、字号 |
| `text-color` / `highlight` | 文字颜色、高亮颜色，面板内包含常用预设颜色和自定义色 |
| `heading` | 正文、一级/二级/三级标题 |
| `bullet-list` / `ordered-list` / `task-list` | 无序列表、有序列表、任务列表 |
| `blockquote` | 引用段落 |
| `code-block` | 代码块 |
| `outline` | 大纲开关 |
| `align` | 左对齐、居中、右对齐、两端对齐 |
| `horizontal-rule` | 水平分割线 |
| `link` | 链接 |
| `image` | 图片选择上传 |
| `attachment` | 附件选择上传 |
| `table` | 表格插入和行列操作 |

### 注意事项

- 默认图片上传会转成 DataURL，默认附件上传会使用 ObjectURL，适合本地预览；生产项目建议传入 `uploadImage` 和 `uploadFile` 对接后端文件服务。
- 图片选择上传和复制粘贴图片都会调用 `uploadImage`，因此外部只需要实现一套图片上传逻辑。
- `fullHeight` 依赖父容器具有明确高度；普通场景继续使用 `minHeight` 即可。
- 组件内部已包含从 `XlEdit` 迁移来的富文本内核、扩展、节点视图、Markdown 适配器和样式。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 编辑器内容，推荐 TipTap JSON 字符串，也兼容 HTML 字符串 | `string` | `''` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `minHeight` | 编辑区域最小高度 | `number \| string` | `520` | 数字为 px；字符串使用 CSS 单位 |
| `fullHeight` | 是否填满已有明确高度的父容器，并让内容区在工具栏下方内部滚动 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `contentBackgroundColor` | 编辑区域背景色 | `string` | `'var(--x-color-surface, #ffffff)'` | — |
| `contentTextColor` | 编辑区域正文颜色，适合深色表单或自定义主题中直接覆盖 | `string` | `'var(--x-color-text, #111827)'` | — |
| `contentFontSize` | 编辑区域正文字号，数字按 px 处理 | `number \| string` | `14` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `readonly` | 只读模式 | `boolean` | `false` | — |
| `showToolbar` | 是否显示工具栏 | `boolean` | `true` | — |
| `showOutline` | 是否显示右侧大纲 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `toolbarTooltipPlacement` | 工具提示位置，兼容参考组件 API | `'top' \| 'bottom'` | `'bottom'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fallbackHtml` | `modelValue` 为空或需要回退时使用的 HTML | `string` | `''` | — |
| `canSave` | 是否启用保存按钮和 `Ctrl/Cmd + S` 保存快捷键 | `boolean` | `false` | — |
| `toolbarButtons` | 工具栏按钮白名单 | `RichTextEditorToolbarButton[]` | `—` | — |
| `pasteImages` | 是否允许从剪贴板粘贴图片，粘贴后复用 `uploadImage` 管线 | `boolean` | `true` | — |
| `theme` | 工具栏、内容区和浮层主题变量 | `RichTextEditorTheme` | `—` | — |
| `uploadImage` | 自定义图片上传方法，按钮上传和复制粘贴图片都会调用 | `(file: File) => Promise<UploadResult>` | `—` | — |
| `uploadFile` | 自定义附件上传方法 | `(file: File) => Promise<UploadResult>` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | `(value: string)` | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `htmlChange` | htmlChange 事件 | `[value: string]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `save-doc` | `()` | `[]` |

## 实例方法

### 内容与展示

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `setContent` | `JSONContent \| string \| null \| undefined` | `(content: JSONContent \| string \| null \| undefined) => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `getJson` | - | `() => JSONContent \| null` |
| `getHtml` | - | `() => string` |
| `insertImage` | `fileKey: string` | `(fileKey: string) => void` |
| `insertAttachment` | `UploadResult` | `(file: UploadResult) => void` |
| `locateKeyword` | `keyword: string` | `(keyword: string) => boolean` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### RichTextEditorToolbarButton

```ts
export type RichTextEditorToolbarButton = (typeof RICH_TEXT_EDITOR_TOOLBAR_BUTTONS)[number]
```

### RichTextEditorTheme

```ts
export interface RichTextEditorTheme {
  toolbarBackground?: string
  toolbarBorderColor?: string
  toolbarTextColor?: string
  toolbarHoverBackground?: string
  toolbarHoverTextColor?: string
  toolbarActiveBackground?: string
  toolbarActiveTextColor?: string
  toolbarDividerColor?: string
  contentBackgroundColor?: string
  contentTextColor?: string
  placeholderColor?: string
  overlayBackground?: string
  overlayBorderColor?: string
  overlayTextColor?: string
  outlineActiveColor?: string
}
```

### RichTextEditorProps

```ts
export interface RichTextEditorProps {
  fontSize?: number
  modelValue?: string
  fallbackHtml?: string
  readonly?: boolean
  minHeight?: number | string
  fullHeight?: boolean
  canSave?: boolean
  showToolbar?: boolean
  toolbarButtons?: RichTextEditorToolbarButton[]
  toolbarTooltipPlacement?: 'top' | 'bottom'
  showOutline?: boolean
  pasteImages?: boolean
  contentBackgroundColor?: string
  contentTextColor?: string
  contentFontSize?: number | string
  theme?: RichTextEditorTheme
  uploadImage?: (file: File) => Promise<UploadResult>
  uploadFile?: (file: File) => Promise<UploadResult>
}
```

### RichTextEditorValue

```ts
export type RichTextEditorValue = JSONContent | string | null
```

### RichTextEditorExpose

```ts
export type RichTextEditorExpose = RichEditorExpose
```

## 验收说明

- 检查粗体、斜体、下划线、删除线、行内代码、上下标和清除格式。
- 检查标题、无序列表、有序列表、任务列表、引用和代码块。
- 检查字体、字号、文字颜色、高亮颜色和段落对齐；文字颜色和高亮颜色面板应从图标按钮附近弹出，并能选择预设常用颜色或自定义颜色。
- 选中一段带格式文本后点击格式刷，再选中另一段文字，确认常见内联格式和段落/标题对齐能单次复制过去。
- 检查插入水平线、链接、图片、附件和表格操作。
- 复制本地图片或截图后直接粘贴，确认图片能进入编辑器；关闭 `pasteImages` 后应不再拦截粘贴图片。
- 检查引用段落是否有明显的左侧色条、背景色和引号装饰。
- 检查 Markdown 导入、大纲开关、关键词定位和只读状态。
- 检查 `Ctrl/Cmd + S` 是否触发 `save-doc`。


## 交互验收补充

Ctrl/Cmd+S 仅在当前编辑器实例内部获得焦点、canSave=true 且 readonly=false 时阻止浏览器默认保存，并触发一次 save-doc。多个实例共存时仅当前实例响应；焦点在其它控件时不触发编辑器保存。工具栏保存按钮和公开事件保持原语义。
