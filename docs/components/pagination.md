<script setup lang="ts">
import Example1 from '../examples/pagination/Example1.vue'
import Example1Source from '../examples/pagination/Example1.vue?raw'
</script>
# 分页 Pagination

用于列表、表格和卡片流分页，支持总数、页码切换和页容量切换。

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
| `modelValue` | 当前页 | `number` | `1` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 高度，数字按 px 处理 | `number \| string` | `—` | — |
| `pageSize` | 每页条数 | `number` | `10` | — |
| `showPageSize` | 是否显示页容量选择 | `boolean` | `false` | — |
| `pageSizes` | 每页条数的可选值列表 | `number[]` | `() => [10, 20, 50, 100]` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `showTotal` | 是否显示总数 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `total` | 总条数 | `number` | `0` | — |
| `pagerCount` | 最多显示的页码按钮数量 | `number` | `7` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 当前页变化 | `[value: number]` |
| `update:pageSize` | 页容量变化 | `[value: number]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 页码或页容量变化 | `[page: number, pageSize: number]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### PaginationProps

```ts
export interface PaginationProps {
  height?: number | string
  modelValue?: number
  total?: number
  pageSize?: number
  pagerCount?: number
  disabled?: boolean
  showTotal?: boolean
  showPageSize?: boolean
  pageSizes?: number[]
  fontSize?: number
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
