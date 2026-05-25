# 富文本 RichTextEditor

`XRichTextEditor` 是从 NexMod `XlEdit` 迁移来的完整 TipTap 富文本编辑器，适合文档编辑、知识库正文、富文本消息和后台内容录入场景。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XRichTextEditor } from 'x.ui'
import 'x.ui/style.css'

const content = ref('')
</script>

<template>
  <XRichTextEditor v-model="content" />
</template>
```

## 保存为 JSON 字符串

组件推荐把 `modelValue` 保存为 TipTap JSON 字符串。传入空字符串时会显示空文档；传入非 JSON 字符串时会按 HTML 内容载入，便于兼容旧数据。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref(JSON.stringify({
  type: 'doc',
  content: [
    { type: 'paragraph', content: [{ type: 'text', text: '你好，x.ui' }] }
  ]
}))
</script>

<template>
  <XRichTextEditor
    v-model="content"
    :min-height="420"
    :can-save="true"
    :show-outline="true"
    @save-doc="() => console.log('save')"
    @html-change="(html) => console.log(html)"
  />
</template>
```

## 填满父容器高度

`minHeight` 用于普通表单、弹窗等场景，控制编辑区域的最小高度。若父容器已经有明确高度，并希望富文本整体占满剩余空间，请使用 `fillHeight`。开启后组件根节点、编辑器外壳、内容区和 ProseMirror 编辑面会沿父容器高度链填满，工具栏保持自身高度，滚动保留在内容 viewport 内。

```vue
<template>
  <div style="height: 520px; min-height: 0">
    <XRichTextEditor
      v-model="content"
      fill-height
      :show-outline="false"
    />
  </div>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 编辑器内容，推荐 TipTap JSON 字符串，也兼容 HTML 字符串 | `string` | `''` |
| `fallbackHtml` | `modelValue` 为空或需要回退时使用的 HTML | `string` | `''` |
| `readonly` | 只读模式 | `boolean` | `false` |
| `minHeight` | 编辑区域最小高度 | `number \| string` | `520` |
| `fillHeight` | 是否填满已有明确高度的父容器，并让内容区在工具栏下方内部滚动 | `boolean` | `false` |
| `canSave` | 是否启用保存按钮和 `Ctrl/Cmd + S` 保存快捷键 | `boolean` | `false` |
| `showToolbar` | 是否显示工具栏 | `boolean` | `true` |
| `toolbarButtons` | 工具栏按钮白名单 | `RichTextEditorToolbarButton[]` | 完整工具栏 |
| `toolbarTooltipPlacement` | 工具提示位置，兼容参考组件 API | `'top' \| 'bottom'` | `'bottom'` |
| `showOutline` | 是否显示右侧大纲 | `boolean` | `true` |
| `pasteImages` | 是否允许从剪贴板粘贴图片，粘贴后复用 `uploadImage` 管线 | `boolean` | `true` |
| `contentBackground` | 编辑区域背景 | `string` | `var(--x-color-surface, #ffffff)` |
| `contentTextColor` | 编辑区域正文颜色，适合深色表单或自定义主题中直接覆盖 | `string` | `var(--x-color-text, #111827)` |
| `contentFontSize` | 编辑区域正文字号，数字按 px 处理 | `number \| string` | `14` |
| `theme` | 工具栏、内容区和浮层主题变量 | `RichTextEditorTheme` | `undefined` |
| `uploadImage` | 自定义图片上传方法，按钮上传和复制粘贴图片都会调用 | `(file: File) => Promise<UploadResult>` | 本地 DataURL |
| `uploadFile` | 自定义附件上传方法 | `(file: File) => Promise<UploadResult>` | 本地 ObjectURL |

## Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `(value: string)` | 内容变化时触发，返回 JSON 字符串或兼容字符串 |
| `html-change` | `(html: string)` | 内容变化时触发，返回 HTML |
| `save-doc` | `()` | 点击保存或按下 `Ctrl/Cmd + S` 时触发 |

## Expose 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `getJson` | - | `JSONContent \| null` | 获取 TipTap JSON |
| `getHtml` | - | `string` | 获取 HTML |
| `setContent` | `JSONContent \| string \| null \| undefined` | `void` | 设置编辑器内容 |
| `insertImage` | `fileKey: string` | `void` | 插入图片，支持 URL、DataURL、Blob URL 或自定义 fileKey |
| `insertAttachment` | `UploadResult` | `void` | 插入附件块 |
| `locateKeyword` | `keyword: string` | `boolean` | 定位并选中第一个关键词 |

## 工具栏白名单

通过 `toolbarButtons` 控制哪些工具功能可见。组件导出了 `RICH_TEXT_EDITOR_TOOLBAR_BUTTONS` 和 `RichTextEditorToolbarButton`，可用于复用完整列表或做类型约束。

```ts
import { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS, type RichTextEditorToolbarButton } from 'x.ui'

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
| `code` / `subscript` / `superscript` / `clear-formatting` | 行内代码、下标、上标、清除格式 |
| `font-family` / `font-size` | 字体、字号 |
| `text-color` / `highlight` | 文字颜色、高亮颜色 |
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

## 手动验收建议

- 检查粗体、斜体、下划线、删除线、行内代码、上下标和清除格式。
- 检查标题、无序列表、有序列表、任务列表、引用和代码块。
- 检查字体、字号、文字颜色、高亮颜色和段落对齐；文字颜色和高亮颜色的原生色卡应从图标按钮附近弹出。
- 检查插入水平线、链接、图片、附件和表格操作。
- 复制本地图片或截图后直接粘贴，确认图片能进入编辑器；关闭 `pasteImages` 后应不再拦截粘贴图片。
- 检查引用段落是否有明显的左侧色条、背景色和引号装饰。
- 检查 Markdown 导入、大纲开关、关键词定位和只读状态。
- 检查 `Ctrl/Cmd + S` 是否触发 `save-doc`。

## 注意事项

- 默认图片上传会转成 DataURL，默认附件上传会使用 ObjectURL，适合本地预览；生产项目建议传入 `uploadImage` 和 `uploadFile` 对接后端文件服务。
- 图片选择上传和复制粘贴图片都会调用 `uploadImage`，因此外部只需要实现一套图片上传逻辑。
- `fillHeight` 依赖父容器具有明确高度；普通场景继续使用 `minHeight` 即可。
- 组件内部已包含从 `XlEdit` 迁移来的富文本内核、扩展、节点视图、Markdown 适配器和样式。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XRichTextEditor / `RichTextEditorProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
