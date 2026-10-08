<script setup lang="ts">
import Example1 from '../examples/button/Example1.vue'
import Example1Source from '../examples/button/Example1.vue?raw'
import Example2 from '../examples/button/Example2.vue'
import Example2Source from '../examples/button/Example2.vue?raw'
import Example3 from '../examples/button/Example3.vue'
import Example3Source from '../examples/button/Example3.vue?raw'
import Example4 from '../examples/button/Example4.vue'
import Example4Source from '../examples/button/Example4.vue?raw'
import Example5 from '../examples/button/Example5.vue'
import Example5Source from '../examples/button/Example5.vue?raw'
</script>
# 按钮 Button

用于表单、弹窗、工具栏等场景中的基础操作。

## 使用示例

### 交互式预览

你可以在这里手动切换按钮类型、宽高、圆角、加载状态和禁用状态，并点击按钮确认事件是否正常触发。

<ButtonPlayground />

### 类型

<XDocDemo title="基础类型" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 宽高、圆角和边框

按钮默认宽度为 `120px`。可以通过 `width` 和 `height` 调整宽高，通过 `radius` 调整圆角，通过 `borderWidth` 和 `borderColor` 调整边框，通过 `backgroundColor` 和 `textColor` 调整按钮自身颜色。需要撑满父元素时显式传入 `width="100%"`。

<XDocDemo title="宽高和边框" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 状态

<XDocDemo title="加载和禁用" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 前后缀

通过 `prefix` 和 `suffix` 插槽在按钮文字前后放置辅助文本。

<XDocDemo title="前后缀插槽" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 点击事件

按钮只负责自身点击事件，不承载表单提交逻辑。组件内部固定使用原生 `type="button"`，因此放在 `form` 中时不会因为输入框回车而自动提交。

<XDocDemo title="点击事件" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 按钮宽度，数字按 px 处理；需要撑满父元素时传入 `100%` | `number \| string` | `120` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 按钮高度，数字按 px 处理 | `number \| string` | `—`<br>未设置时为 32px，与字号独立 | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 按钮类型 | `ButtonVariant` | `'solid'` | — |
| `borderWidth` | 按钮边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 按钮边框颜色 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined`<br>未设置时继承父级字号，独立使用时为 14px | px |
| `padding` | 按钮内边距，数字按 px 处理 | `number \| string` | `—`<br>未设置时为 0 8px | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 按钮圆角，数字按 px 处理 | `number \| string` | `—`<br>未设置时为 6px | 数字为 px；字符串使用 CSS 单位 |
| `hoverBackgroundColor` | 鼠标悬停背景色 | `string` | `—` | — |
| `activeBackgroundColor` | 按下激活时的背景色 | `string` | `—` | — |
| `activeBorderColor` | 按下激活时的边框色 | `string` | `—` | — |
| `activeTextColor` | 按下激活时的文字色 | `string` | `—` | — |
| `backgroundColor` | 按钮背景色，映射到按钮自身背景变量 | `string` | `—` | — |
| `textColor` | 按钮文字颜色，映射到按钮自身文字变量 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `liftOnHover` | 是否在悬浮时轻微上移；需要悬浮上移反馈时可设为 `true` | `boolean` | `false` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `loading` | 是否加载中 | `boolean` | `false` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `[event: MouseEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 按钮文字前缀 | `无作用域参数` |
| `default` | 按钮文字内容 | `无作用域参数` |
| `suffix` | 按钮文字后缀 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ButtonVariant

```ts
export type ButtonVariant = 'solid' | 'outline' | 'ghost'
```

### ButtonProps

```ts
export interface ButtonProps extends ElementStyleProps {
  variant?: ButtonVariant
  width?: number | string
  height?: number | string
  borderWidth?: number | string
  borderColor?: string
  fontSize?: number
  padding?: number | string
  radius?: number | string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  liftOnHover?: boolean
  disabled?: boolean
  loading?: boolean
}
```

## 验收说明

- 切换 `类型`，确认主要、描边、文本按钮的颜色层级是否符合预期。
- 修改 `宽度`、`高度`、`边框粗细`、`边框颜色`、`背景色` 和 `文字色`，确认默认 `120px` 宽度、撑满父元素宽度和自定义宽度都符合预期。
- 修改激活背景色、边框色、文字色，确认按下按钮时颜色符合预期。
- 添加前缀和后缀内容，确认文字顺序和间距符合预期。
- 设置 `:lift-on-hover="true"`，确认悬浮时按钮会轻微上移。
- 勾选 `加载中`，确认按钮不可重复点击，并出现加载图标。
- 勾选 `禁用`，确认按钮不可点击，视觉上有明确禁用态。
- 在桌面和窄容器宽度下检查按钮文本是否溢出。
