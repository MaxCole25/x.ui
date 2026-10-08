<script setup lang="ts">
import Example1 from '../examples/tag/Example1.vue'
import Example1Source from '../examples/tag/Example1.vue?raw'
import Example2 from '../examples/tag/Example2.vue'
import Example2Source from '../examples/tag/Example2.vue?raw'
import Example3 from '../examples/tag/Example3.vue'
import Example3Source from '../examples/tag/Example3.vue?raw'
</script>
# 标签 Tag

用于标记状态、分类和轻量提示，支持关闭事件和自定义颜色。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 显示效果

<XDocDemo title="显示效果" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义颜色

<XDocDemo title="自定义颜色" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 标签视觉形态 | `TagType` | `'primary'` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `accentColor` | 自定义主题色 | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用交互 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `effect` | 显示效果 | `TagEffect` | `'light'` | — |
| `closable` | 是否可关闭 | `boolean` | `false` | — |
| `round` | 是否圆角胶囊 | `boolean` | `false` | — |
| `hit` | 是否用当前颜色描边 | `boolean` | `false` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `[event: MouseEvent]` |
| `click` | 点击标签时触发 | `[event: MouseEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TagType

```ts
export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
```

### TagEffect

```ts
export type TagEffect = 'light' | 'dark' | 'plain'
```

### TagFontSize

```ts
export type TagFontSize = number
```

### TagProps

```ts
export interface TagProps extends ElementStyleProps {
  variant?: TagType
  effect?: TagEffect
  fontSize?: number
  closable?: boolean
  round?: boolean
  hit?: boolean
  disabled?: boolean
  accentColor?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
