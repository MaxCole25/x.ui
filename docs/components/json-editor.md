<script setup lang="ts">
import Example1 from '../examples/json-editor/Example1.vue'
import Example1Source from '../examples/json-editor/Example1.vue?raw'
</script>
# JSON编辑器 JsonEditor

`XJsonEditor` 支持行号、高亮、错误定位和一键格式化。

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
| `modelValue` | JSON 文本 | `string` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `'JSON 数据对象'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `externalError` | 外部错误提示 | `string` | `''` | — |
| `resizable` | 编辑区是否可拖拽高度 | `boolean` | `true` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 内容变化 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `blur` | 失焦触发 | `[]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### JsonEditorProps

```ts
export interface JsonEditorProps {
  fontSize?: number
  modelValue: string
  title?: string
  externalError?: string
  resizable?: boolean
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
