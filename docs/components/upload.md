<script setup lang="ts">
import Example1 from '../examples/upload/Example1.vue'
import Example1Source from '../examples/upload/Example1.vue?raw'
</script>
# 上传 Upload

用于选择、拖拽和提交文件，支持文件列表、进度、限制数量和自定义上传方法。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 文件列表 | `UploadFile[]` | `() => []` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `buttonText` | 操作按钮文字 | `string` | `'选择文件'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 高度，数字按 px 处理 | `number \| string` | `—` | — |
| `maxSize` | 最大文件体积，单位 byte | `number` | `0` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `accept` | 允许选择的文件扩展名或 MIME 类型 | `string` | `—` | — |
| `multiple` | 是否多选 | `boolean` | `false` | — |
| `drag` | 是否启用拖拽区域 | `boolean` | `false` | — |
| `autoUpload` | 是否选择后自动上传 | `boolean` | `true` | — |
| `limit` | 最大文件数量 | `number` | `0` | — |
| `tip` | 上传提示文字 | `string` | `''` | — |
| `listType` | 上传文件列表的展示样式 | `UploadListType` | `'text'` | — |
| `requestMethod` | 自定义上传方法 | `(file: File, onProgress: UploadProgressHandler) => Promise<unknown>` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 文件列表变化 | `[files: UploadFile[]]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 文件列表变化 | `[files: UploadFile[]]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `exceed` | 超出数量限制 | `[files: File[]]` |
| `remove` | 移除文件 | `[file: UploadFile, files: UploadFile[]]` |
| `progress` | 上传进度变化 | `[file: UploadFile]` |
| `success` | 上传成功 | `[file: UploadFile]` |
| `error` | 上传失败 | `[file: UploadFile]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 实例方法

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `clearFiles` | clearFiles 方法 | `() => void` |
| `openPicker` | openPicker 方法 | `() => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `submit` | submit 方法 | `() => void` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### UploadProps

```ts
export interface UploadProps {
  height?: number | string
  modelValue?: UploadFile[]
  accept?: string
  multiple?: boolean
  disabled?: boolean
  drag?: boolean
  autoUpload?: boolean
  limit?: number
  maxSize?: number
  buttonText?: string
  tip?: string
  listType?: UploadListType
  fontSize?: number
  requestMethod?: (file: File, onProgress: UploadProgressHandler) => Promise<unknown>
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### UploadStatus

```ts
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
```

### UploadListType

```ts
export type UploadListType = 'text' | 'card'
```

### UploadFile

```ts
export interface UploadFile {
  uid: string
  name: string
  size: number
  status: UploadStatus
  percentage: number
  raw?: File
  response?: unknown
  error?: unknown
}
```

### UploadProgressHandler

```ts
export interface UploadProgressHandler {
  (percentage: number): void
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
