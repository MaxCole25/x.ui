<script setup lang="ts">
import Example1 from '../examples/descriptions/Example1.vue'
import Example1Source from '../examples/descriptions/Example1.vue?raw'
</script>
# 描述列表 Descriptions

用于详情页字段展示，适合用户资料、订单信息和审批摘要。

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
| `items` | 描述项 | `DescriptionItem[]` | `() => []` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `labelWidth` | 标签宽度 | `number \| string` | `'96px'` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `bordered` | 是否显示边框 | `boolean` | `false` | — |
| `labelColor` | 标签文字颜色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `column` | 列数 | `number` | `3` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 标题 | `无作用域参数` |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `item` | item 插槽 | `item: DescriptionItem; index: number` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DescriptionsProps

```ts
export interface DescriptionsProps {
  title?: string
  items?: DescriptionItem[]
  column?: number
  bordered?: boolean
  labelWidth?: number | string
  labelColor?: string
  textColor?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### DescriptionItem

```ts
export interface DescriptionItem {
  label: string
  value?: string | number
  span?: number
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
