<script setup lang="ts">
import Example1 from '../examples/statistic/Example1.vue'
import Example1Source from '../examples/statistic/Example1.vue?raw'
</script>
# 统计数值 Statistic

用于仪表盘指标、经营数据和摘要数值展示。

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
| `modelValue` | 数值 | `string \| number` | `0` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `—` | — |
| `prefix` | 前缀 | `string` | `—` | — |
| `suffix` | 后缀 | `string` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `valueColor` | 数值文字颜色 | `string` | `—` | — |
| `titleColor` | 标题文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `precision` | 小数位数 | `number` | `undefined` | — |
| `formatter` | 自定义格式化 | `(value: string \| number) => string` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 标题 | `无作用域参数` |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### StatisticProps

```ts
export interface StatisticProps {
  modelValue?: string | number
  title?: string
  precision?: number
  prefix?: string
  suffix?: string
  formatter?: (value: string | number) => string
  valueColor?: string
  titleColor?: string
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
