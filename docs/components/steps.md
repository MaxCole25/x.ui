<script setup lang="ts">
import Example1 from '../examples/steps/Example1.vue'
import Example1Source from '../examples/steps/Example1.vue?raw'
</script>
# 步骤条 Steps

用于流程进度、分步表单和审批链路，支持横向、纵向和可点击切换。

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
| `modelValue` | 当前步骤索引 | `number` | `0` | — |
| `items` | 步骤列表 | `StepItem[]` | `() => []` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 方向 | `StepsDirection` | `'horizontal'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `clickable` | 是否可点击切换 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 当前步骤变化 | `[value: number]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 点击步骤时触发 | `[value: number, item: StepItem]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### StepsProps

```ts
export interface StepsProps {
  modelValue?: number
  items?: StepItem[]
  direction?: StepsDirection
  clickable?: boolean
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### StepStatus

```ts
export type StepStatus = 'wait' | 'process' | 'success' | 'error'
```

### StepsDirection

```ts
export type StepsDirection = 'horizontal' | 'vertical'
```

### StepItem

```ts
export interface StepItem {
  title: string
  description?: string
  status?: StepStatus
  disabled?: boolean
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
