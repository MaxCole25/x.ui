<script setup lang="ts">
import Example1 from '../examples/button-group/Example1.vue'
import Example1Source from '../examples/button-group/Example1.vue?raw'
import Example2 from '../examples/button-group/Example2.vue'
import Example2Source from '../examples/button-group/Example2.vue?raw'
import Example3 from '../examples/button-group/Example3.vue'
import Example3Source from '../examples/button-group/Example3.vue?raw'
import Example4 from '../examples/button-group/Example4.vue'
import Example4Source from '../examples/button-group/Example4.vue?raw'
</script>
# 按钮组 ButtonGroup

用于将多个按钮组合成一组连续操作，常见于工具栏、筛选切换和弹窗底部的相邻动作。

按钮组只负责排列和外侧圆角控制，按钮本身仍使用 `XButton`。组内按钮会去掉各自圆角，仅保留按钮组最外侧的四个角。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 竖向排列

通过 `direction="vertical"` 让按钮竖向排列。

<XDocDemo title="竖向排列" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义圆角

`radius` 只作用于整组按钮最外侧四个角，中间按钮不会保留独立圆角。

<XDocDemo title="自定义圆角" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 混合状态

按钮组不改变按钮自身能力，`disabled`、`loading`、`variant` 和点击事件仍然由每个 `XButton` 控制。

<XDocDemo title="混合状态" :code="Example4Source">
  <Example4 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 排列方向 | `ButtonGroupDirection` | `'horizontal'` | — |
| `width` | 按钮组宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 按钮组高度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `radius` | 按钮组外侧圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 传递给组内按钮的边框宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 通过按钮级变量传递给组内按钮的边框色 | `string` | `—` | — |
| `backgroundColor` | 通过按钮级变量传递给组内按钮的背景色 | `string` | `—` | — |
| `textColor` | 通过按钮级变量传递给组内按钮的文字色 | `string` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 一组按钮，推荐直接放置多个 `XButton` | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ButtonGroupDirection

```ts
export type ButtonGroupDirection = 'horizontal' | 'vertical'
```

### ButtonGroupProps

```ts
export interface ButtonGroupProps extends ElementStyleProps {
  fontSize?: number
  direction?: ButtonGroupDirection
  width?: number | string
  height?: number | string
  radius?: number | string
}
```

## 验收说明

- 切换横向和竖向排列，确认按钮之间连续贴合。
- 修改 `radius`，确认只有按钮组最外侧四个角出现圆角。
- 放入不同 `variant`、`disabled`、`loading` 的按钮，确认按钮自身状态仍正常。
- 设置较窄父容器，确认长文本不会溢出到相邻按钮外。
