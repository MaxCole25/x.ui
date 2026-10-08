<script setup lang="ts">
import Example1 from '../examples/alert/Example1.vue'
import Example1Source from '../examples/alert/Example1.vue?raw'
</script>
# 提示 Alert

用于页面内的结果、警告和说明提示，区别于短暂浮出的 Message。

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
| `title` | 标题 | `string` | `''` | — |
| `description` | 描述 | `string` | `''` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 形态 | `AlertVariant` | `'light'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `status` | 状态 | `AlertStatus` | `'info'` | — |
| `showIcon` | 是否显示图标 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `closable` | 是否可关闭 | `boolean` | `false` | — |
| `center` | 是否居中展示内容 | `boolean` | `false` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### AlertProps

```ts
export interface AlertProps {
  title?: string
  description?: string
  status?: AlertStatus
  variant?: AlertVariant
  closable?: boolean
  showIcon?: boolean
  center?: boolean
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### AlertStatus

```ts
export type AlertStatus = 'success' | 'warning' | 'info' | 'error'
```

### AlertVariant

```ts
export type AlertVariant = 'light' | 'plain'
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
