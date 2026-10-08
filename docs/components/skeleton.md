<script setup lang="ts">
import Example1 from '../examples/skeleton/Example1.vue'
import Example1Source from '../examples/skeleton/Example1.vue?raw'
</script>
# 骨架屏 Skeleton

用于异步内容加载中的占位反馈，比整块 Loading 更适合局部数据区域。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 是否显示标题占位 | `boolean` | `true` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `'100%'` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 高度，数字按 px 处理 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 是否显示骨架 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `rows` | 段落行数 | `number` | `3` | — |
| `animated` | 是否动画 | `boolean` | `true` | — |
| `avatar` | 是否显示头像占位 | `boolean` | `false` | — |
| `round` | 是否使用圆形外观 | `boolean` | `false` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### SkeletonProps

```ts
export interface SkeletonProps {
  loading?: boolean
  rows?: number
  animated?: boolean
  avatar?: boolean
  title?: boolean
  round?: boolean
  width?: number | string
  height?: number | string
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
