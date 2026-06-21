<script setup lang="ts">
const uploadCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XUpload button-text="选择附件" tip="支持拖拽或点击选择" />
  </div>`
</script>

# 上传 Upload

用于选择、拖拽和提交文件，支持文件列表、进度、限制数量和自定义上传方法。

## 基础用法

<XDocDemo title="基础用法" :code="uploadCode">
  <div class="x-demo-row">
    <XUpload button-text="选择附件" tip="支持拖拽或点击选择" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 文件列表 | `UploadFile[]` | `[]` |
| multiple | 是否多选 | `boolean` | `false` |
| drag | 是否启用拖拽区域 | `boolean` | `false` |
| autoUpload | 是否选择后自动上传 | `boolean` | `true` |
| limit | 最大文件数量 | `number` | `0` |
| maxSize | 最大文件体积，单位 byte | `number` | `0` |
| requestMethod | 自定义上传方法 | `(file, onProgress) => Promise<unknown>` | - |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 文件列表变化 |
| change | 文件列表变化 |
| exceed | 超出数量限制 |
| remove | 移除文件 |
| progress | 上传进度变化 |
| success | 上传成功 |
| error | 上传失败 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
