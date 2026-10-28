<script setup lang="ts">
import Example1 from '../examples/card/Example1.vue'
import Example1Source from '../examples/card/Example1.vue?raw'
import Example2 from '../examples/card/Example2.vue'
import Example2Source from '../examples/card/Example2.vue?raw'
import Example3 from '../examples/card/Example3.vue'
import Example3Source from '../examples/card/Example3.vue?raw'
</script>
# 卡片 Card

用于承载一组相关内容，可配置头部、底部、边框、背景和阴影。

头部和底部的两条分隔线可通过 `dividerWidth` 和 `dividerColor` 统一设置粗细和颜色，独立于外框的 `borderWidth` 和 `borderColor`。未设置时，分隔线粗细为 `1px`，颜色使用全局变量 `--x-color-border`；将 `dividerWidth` 设为 `0` 可隐藏分隔线。

```vue
<XCard header="项目概览" footer="更新时间：09:30" :divider-width="2" divider-color="#a5b4fc">
  今日新增 12 条任务，3 条需要优先处理。
</XCard>
```

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义插槽

通过 `header`、`default` 和 `footer` 插槽组合更完整的内容区块。

<XDocDemo title="自定义插槽" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 外沿泛光

通过 `enableGlow` 开关控制泛光，默认关闭。泛光颜色默认跟随卡片的实际边框颜色（`borderColor` 或主题边框色），也可通过 `glowColor` 单独指定。边框色变化时，未指定颜色的泛光会同步变化。

泛光只绘制在卡片外沿，不改变边框粗细、卡片尺寸或内容布局。启用时优先显示泛光，`shadow="never"` 也可配合使用；父容器需为外沿预留空间，避免裁剪。

<XDocDemo title="跟随边框色与指定泛光色" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `header` | 头部文本 | `string` | `—` | — |
| `footer` | 底部文本 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `dividerWidth` | 分隔线粗细，统一控制头部和底部分隔线；设为 0 可隐藏，未设置时为 1px | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `shadow` | 阴影策略 | `CardShadow` | `'always'` | — |
| `enableGlow` | 是否启用外沿泛光，不影响边框、尺寸和内容布局 | `boolean` | `false` | — |
| `glowColor` | 泛光色，未指定时跟随卡片边框颜色 | `string` | `—` | — |
| `padding` | 内边距，数字按 px 处理；字符串使用 CSS 单位 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `dividerColor` | 分隔线颜色，未设置时使用全局变量 --x-color-border | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `bodyStyle` | 正文区域样式 | `CSSProperties` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 头部文本 | `无作用域参数` |
| `default` | 卡片内容 | `无作用域参数` |
| `footer` | 底部文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### CardShadow

```ts
export type CardShadow = 'always' | 'hover' | 'never'
```

### CardProps

```ts
export interface CardProps extends ElementStyleProps {
  fontSize?: number
  header?: string
  footer?: string
  shadow?: CardShadow
  /** 是否启用外沿泛光，不影响边框、尺寸和内容布局 */
  enableGlow?: boolean
  /** 泛光色，未指定时跟随卡片边框颜色 */
  glowColor?: string
  width?: number | string
  height?: number | string
  padding?: number | string
  /** 分隔线粗细，数字按 px 处理；设为 0 可隐藏 */
  dividerWidth?: number | string
  /** 分隔线颜色 */
  dividerColor?: string
  bodyStyle?: CSSProperties
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
