<script setup lang="ts">
import Example1 from '../examples/collapse/Example1.vue'
import Example1Source from '../examples/collapse/Example1.vue?raw'
</script>
# 折叠面板 Collapse

用于把设置项、说明内容和详情分组折叠收纳。

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
| `modelValue` | 当前展开项 | `CollapseValue \| CollapseValue[]` | `—` | — |
| `items` | 面板列表 | `CollapseItem[]` | `() => []` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `accordion` | 是否手风琴模式 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 展开项变化 | `[value: CollapseValue \| CollapseValue[]]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 展开项变化 | `[value: CollapseValue \| CollapseValue[]]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | title 插槽 | `item: CollapseItem; index: number` |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `item` | item 插槽 | `item: CollapseItem; index: number` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### CollapseProps

```ts
export interface CollapseProps {
  modelValue?: CollapseValue | CollapseValue[]
  items?: CollapseItem[]
  accordion?: boolean
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### CollapseValue

```ts
export type CollapseValue = string | number
```

### CollapseItem

```ts
export interface CollapseItem {
  name: CollapseValue
  title: string
  content?: string
  disabled?: boolean
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
