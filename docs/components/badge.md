<script setup lang="ts">
import Example1 from '../examples/badge/Example1.vue'
import Example1Source from '../examples/badge/Example1.vue?raw'
</script>
# 徽标 Badge

用于消息数量、状态点和菜单提醒，可包裹任意触发元素。

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
| `modelValue` | 徽标内容 | `string \| number` | `''` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |
| `accentColor` | 主题强调色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |
| `borderColor` | 边框颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showZero` | 数值为零时是否显示徽标 | `boolean` | `false` | — |
| `status` | 颜色状态 | `BadgeStatus` | `'danger'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `max` | 最大数字 | `number` | `—` | — |
| `dot` | 是否显示圆点 | `boolean` | `false` | — |
| `hidden` | 是否隐藏 | `boolean` | `false` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### BadgeProps

```ts
export interface BadgeProps {
  modelValue?: string | number
  max?: number
  showZero?: boolean
  dot?: boolean
  hidden?: boolean
  status?: BadgeStatus
  fontSize?: number
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### BadgeStatus

```ts
export type BadgeStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info'
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
