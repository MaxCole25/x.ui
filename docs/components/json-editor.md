<script setup lang="ts">
import { ref } from 'vue'

const jsonText = ref('{\n  "name": "x.ui"\n}')

const jsonEditorBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const jsonText = ref('{\n  "name": "x.ui"\n}')
<\/script>

<div style="max-width: 720px">
      <XJsonEditor v-model="jsonText" />
    </div>`
</script>

# JSON编辑器 JsonEditor

`XJsonEditor` 支持行号、高亮、错误定位和一键格式化。

## 基础用法

<XDocDemo title="基础用法" :code="jsonEditorBasicCode">
  <ClientOnly>
    <div style="max-width: 720px">
      <XJsonEditor v-model="jsonText" />
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | JSON 文本 | `string` | - |
| title | 标题 | `string` | `JSON 数据对象` |
| externalError | 外部错误提示 | `string` | `''` |
| resizable | 编辑区是否可拖拽高度 | `boolean` | `true` |

## 事件

| 事件 | 说明 |
| --- | --- |
| `update:modelValue` | 内容变化 |
| `blur` | 失焦触发 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XJsonEditor / `JsonEditorProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
