<script setup lang="ts">
import Example1 from '../examples/breadcrumb/Example1.vue'
import Example1Source from '../examples/breadcrumb/Example1.vue?raw'
</script>
# 面包屑 Breadcrumb

用于展示当前页面在信息架构中的位置，并支持点击中间层级返回。

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
| `items` | 面包屑列表 | `BreadcrumbItem[]` | `() => []` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `separator` | 分隔符 | `string` | `'/'` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `click` | 点击可用项时触发 | `[item: BreadcrumbItem, index: number, event: MouseEvent]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### BreadcrumbProps

```ts
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  separator?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### BreadcrumbItem

```ts
export interface BreadcrumbItem {
  label: string
  to?: string
  disabled?: boolean
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
