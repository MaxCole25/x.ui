# 页面构建器 PageBuilder

`XPageBuilder` 是从 NexMod 的 PageBuilder 思路中拆出的独立编辑器组件。它不再生成前端文件、不绑定路由和接口动作，只维护组件编辑器里的 UI 布局 JSON。

内部组件库只保留 PageBuilder 自身的 `容器` 组件，其余可拖入组件来自 x.ui，例如 `XButton`、`XInput`、`XSelect`、`XTable`、`XTree`、`XTabs` 等。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XPageBuilder, createDefaultPageBuilderSchema, type PageBuilderSchema } from 'x.ui'
import 'x.ui/style.css'

const schema = ref<PageBuilderSchema>(createDefaultPageBuilderSchema())
</script>

<template>
  <XPageBuilder v-model="schema" @export-json="(value) => console.log(value)" />
</template>
```

## 动态字段组件

业务系统可以通过 `customWidgets` 给组件库追加动态组件，例如把当前数据表字段作为“字段”页签注入。字段拖入画布后仍然是普通节点，可以在 `props` 中保存 `tableKey`、`fieldKey`、`fieldLabel` 等绑定信息。

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { XInput, XPageBuilder, createDefaultPageBuilderSchema, type PageBuilderWidgetDefinition } from 'x.ui'

const schema = ref(createDefaultPageBuilderSchema())
const fieldWidgets = computed<PageBuilderWidgetDefinition[]>(() => [
  {
    type: 'field-input:customers:fullName',
    component: 'XInput',
    category: 'fields',
    label: '客户全称',
    description: 'fullName',
    previewIcon: 'ri-input-field',
    renderer: XInput,
    defaultLayout: { x: 0, y: 0, w: 4, h: 1 },
    defaultProps: {
      modelValue: '',
      placeholder: '客户全称',
      clearable: true,
      size: 'md',
      tableKey: 'customers',
      fieldKey: 'fullName',
      fieldLabel: '客户全称'
    }
  }
])
</script>

<template>
  <XPageBuilder v-model="schema" :custom-widgets="fieldWidgets" />
</template>
```

## 输出数据

组件通过 `v-model` 和 `export-json` 输出布局 JSON。数据只描述画布、节点、组件名、布局、props、slots 和容器子节点，不包含代码生成结果。右侧属性面板用于可视化编辑，顶部“输出 JSON”按钮用于导出当前 schema。

```ts
interface PageBuilderSchema {
  version: '1.0'
  canvas: {
    columns: number
    rowHeight: number
    gap: number
    padding: number
    background: string
  }
  nodes: PageBuilderNodeSchema[]
}
```

容器组件的 `props.gap` 表示内部组件间距，默认值为 `0`。该值只影响容器内子组件之间的栅格间隔，不会给容器内容区增加内边距。

属性面板中，“组件”tab 维护名称、类型、栅格位置、尺寸和预览区上下左右内边距等通用属性；“特性”tab 维护当前组件专属的 Props。

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `PageBuilderSchema` | `createDefaultPageBuilderSchema()` | 当前编辑器布局 JSON |
| `readonly` | `boolean` | `false` | 是否禁用编辑操作 |
| `customWidgets` | `PageBuilderWidgetDefinition[]` | `[]` | 追加到组件库的动态组件，常用于数据表字段等业务组件 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `PageBuilderSchema` | 布局 JSON 变化时触发 |
| `change` | `PageBuilderSchema` | 布局 JSON 变化时触发 |
| `select-node` | `PageBuilderNodeSchema \| null` | 选择画布节点时触发 |
| `export-json` | `PageBuilderSchema` | 点击输出 JSON 时触发 |

## 手动验收建议

- 从左侧组件库点击或拖拽 x.ui 组件到画布。
- 选中容器后添加组件，确认新组件进入容器子节点。
- 修改画布列数、行高、节点位置和尺寸，确认右侧 JSON 同步更新。
- 修改组件通用属性、特性 Props JSON 或 Slots JSON，确认画布预览和 `v-model` 数据同步。
- 使用只读模式确认组件库按钮、复制、删除和 JSON 应用操作被禁用。
