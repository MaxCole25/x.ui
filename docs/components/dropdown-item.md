<script setup lang="ts">
import Example1 from '../examples/dropdown-item/Example1.vue'
import Example1Source from '../examples/dropdown-item/Example1.vue?raw'
import Example2 from '../examples/dropdown-item/Example2.vue'
import Example2Source from '../examples/dropdown-item/Example2.vue?raw'
import Example3 from '../examples/dropdown-item/Example3.vue'
import Example3Source from '../examples/dropdown-item/Example3.vue?raw'
import Example4 from '../examples/dropdown-item/Example4.vue'
import Example4Source from '../examples/dropdown-item/Example4.vue?raw'
</script>
# 下拉菜单项 DropdownItem

`XDropdownItem` 是下拉菜单中的单个命令项，支持图标、分割线、禁用、激活和命令值。放在 `XDropdown` 内部时，点击可用菜单项会向父级触发 `command`。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 状态

`active` 用于标记当前项，`disabled` 会阻止点击和命令触发，`divided` 会在当前项上方显示分割线。

<XDocDemo title="状态" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 命令事件

`command` 只在注入了 `XDropdown` 上下文时向父级派发；单独渲染 `XDropdownItem` 时仍会触发自身的 `click` 事件。

<XDocDemo title="命令事件" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 外观控制

菜单项继承通用外观属性，并额外提供悬浮、激活和分割线颜色控制。

<XDocDemo title="外观控制" :code="Example4Source">
  <Example4 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `icon` | 图标 class，通常传入 Remix Icon 类名 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 菜单项高度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `padding` | 菜单项内边距 | `string` | `—` | — |
| `radius` | 菜单项圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `hoverBackgroundColor` | 悬浮背景色 | `string` | `—` | — |
| `hoverTextColor` | 悬浮文字颜色 | `string` | `—` | — |
| `activeBackgroundColor` | 激活背景色 | `string` | `—` | — |
| `activeTextColor` | 激活文字颜色 | `string` | `—` | — |
| `dividedColor` | 分割线颜色 | `string` | `—` | — |
| `borderWidth` | 边框宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `command` | 点击后传给父级 `XDropdown` 的命令值 | `unknown` | `—` | — |
| `divided` | 是否在当前项上方显示分割线 | `boolean` | `false` | — |
| `active` | 是否为激活状态 | `boolean` | `false` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `click` | 点击可用菜单项时触发，禁用状态不会触发 | `[event: MouseEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 菜单项文本或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DropdownItemProps

```ts
export interface DropdownItemProps extends ElementStyleProps {
  command?: unknown
  disabled?: boolean
  divided?: boolean
  icon?: string
  fontSize?: number
  active?: boolean
  height?: number | string
  padding?: string
  radius?: number | string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
  dividedColor?: string
}
```

## 验收说明

1. 在 `XDropdown` 内点击可用菜单项，确认父级收到对应 `command`，且 `hideOnClick` 默认会关闭弹层。
2. 分别检查 `disabled`、`active`、`divided` 与图标同时存在时的对齐和 hover 状态。
`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。
