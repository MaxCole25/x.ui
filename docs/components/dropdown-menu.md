<script setup lang="ts">
import Example1 from '../examples/dropdown-menu/Example1.vue'
import Example1Source from '../examples/dropdown-menu/Example1.vue?raw'
import Example2 from '../examples/dropdown-menu/Example2.vue'
import Example2Source from '../examples/dropdown-menu/Example2.vue?raw'
import Example3 from '../examples/dropdown-menu/Example3.vue'
import Example3Source from '../examples/dropdown-menu/Example3.vue?raw'
</script>
# 下拉菜单容器 DropdownMenu

`XDropdownMenu` 用于承载一组 `XDropdownItem`，可以单独作为菜单列表展示，也可以放入 `XDropdown` 的 `dropdown` 插槽中作为弹层内容。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 配合 Dropdown

放入 `XDropdown` 时，`XDropdownItem` 的 `command` 会通过父级 `XDropdown` 触发 `command` 事件。

<XDocDemo title="配合 Dropdown" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 外观控制

菜单容器继承通用外观属性，也提供宽度、最大高度、圆角、阴影和内边距等容器级属性。

<XDocDemo title="外观控制" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 菜单宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `maxHeight` | 菜单最大高度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 菜单最小宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 菜单内边距，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 菜单圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `shadow` | 菜单阴影 | `string` | `—` | — |
| `borderWidth` | 边框宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 菜单项内容，通常放置 `XDropdownItem` | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DropdownMenuProps

```ts
export interface DropdownMenuProps extends ElementStyleProps {
  fontSize?: number
  width?: number | string
  maxHeight?: number | string
  minWidth?: number | string
  padding?: number | string
  radius?: number | string
  shadow?: string
}
```

## 验收说明

1. 在 `XDropdown` 弹层中检查菜单是否能跟随触发器显示，并确认菜单内容不会被父容器裁剪。
2. 设置 `maxHeight` 后放入较多菜单项，检查容器滚动和圆角边界是否正常。
3. 在亮色、深色或业务主题色下检查 `borderColor`、`backgroundColor`、`textColor` 与菜单项 hover/active 状态是否协调。
