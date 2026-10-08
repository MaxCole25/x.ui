<script setup lang="ts">
import Example1 from '../examples/icon/Example1.vue'
import Example1Source from '../examples/icon/Example1.vue?raw'
import Example2 from '../examples/icon/Example2.vue'
import Example2Source from '../examples/icon/Example2.vue?raw'
import Example3 from '../examples/icon/Example3.vue'
import Example3Source from '../examples/icon/Example3.vue?raw'
import Example4 from '../examples/icon/Example4.vue'
import Example4Source from '../examples/icon/Example4.vue?raw'
import Example5 from '../examples/icon/Example5.vue'
import Example5Source from '../examples/icon/Example5.vue?raw'
</script>
# 图标 Icon

`XIcon` 提供 @x-soft88/x-ui 统一的图标调用方式。组件基于 Remix Icon，并额外提供常用语义别名，方便在按钮、表单、菜单、工具栏和业务组件中保持一致的尺寸、颜色和可访问性写法。

常规使用只需要引入 `@x-soft88/x-ui/style.css`，其中已包含图标字体样式。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 风格

当传入 `name="home"` 这类不带风格后缀的名称时，组件默认使用 `line` 风格。可通过 `variant="fill"` 切换填充风格。你也可以直接传入完整 Remix Icon 名称，例如 `home-fill`、`settings-3-line`。

<XDocDemo title="风格" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 尺寸、颜色和旋转

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

<XDocDemo title="尺寸、颜色和旋转" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 垂直微调

在图标和文字同处一行时，可以通过 `offset-y` 单独微调图标的垂直位置，避免通过相邻文本的 padding 修正基线偏移。负值让图标上移，正值让图标下移。

<XDocDemo title="垂直微调" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 语义别名

以下别名由 @x-soft88/x-ui 维护，适合常见业务界面直接使用。

| 别名 | 对应图标 |
| --- | --- |
| `add` / `plus` | `add-line` |
| `edit` | `edit-line` |
| `delete` | `delete-bin-line` |
| `search` | `search-line` |
| `close` | `close-line` |
| `upload` | `upload-cloud-line` |
| `download` | `download-line` |
| `save` | `save-line` |
| `home` | `home-line` |
| `user` | `user-line` |
| `setting` | `settings-3-line` |
| `success` | `checkbox-circle-line` |
| `warning` | `alert-line` |
| `error` | `error-warning-line` |
| `info` | `information-line` |
| `loading` | `loader-4-line` |

### 全部图标

下面展示当前 @x-soft88/x-ui 可用的全部 Remix Icon 图标。输入英文关键词可以快速筛选，复制卡片下方的名称作为 `name` 使用。

<IconGallery></IconGallery>

### 可访问性

默认情况下，未设置 `title` 的图标会被视为装饰图标，并设置 `aria-hidden="true"`。如果图标本身承担语义，请传入 `title`。

<XDocDemo title="可访问名称" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 图标来源和许可

图标资产来自 Remix Icon。@x-soft88/x-ui 仅作为组件库的一部分提供统一调用方式，不将 Remix Icon 重新包装为独立图标库。使用品牌类图标时，请同时遵守对应品牌的商标规则。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `name` | 图标名称，支持 @x-soft88/x-ui 语义别名、Remix Icon 名称或 `ri-` 前缀名称 | `string` | `—` | — |
| `title` | 图标可访问名称 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `iconSize` | 图标本身尺寸，数字按 px 处理；独立控制图标尺寸 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |
| `offsetY` | 图标自身垂直偏移量，数字按 px 处理；负值上移，正值下移 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 当名称不带 `line` / `fill` 后缀时使用的风格 | `IconVariant` | `'line'` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `color` | 图标颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `decorative` | 是否作为装饰图标处理 | `boolean` | `undefined` | — |
| `spin` | 是否旋转，常用于加载图标 | `boolean` | `false` | — |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### IconVariant

```ts
export type IconVariant = 'line' | 'fill'
```

### IconFontSize

```ts
export type IconFontSize = FontSize
```

### IconProps

```ts
export interface IconProps {
  name: string
  variant?: IconVariant
  fontSize?: number
  iconSize?: number | string
  offsetY?: number | string
  color?: string
  title?: string
  decorative?: boolean
  spin?: boolean
}
```

## 验收说明

- 搜索 `home`、`file`、`arrow` 等关键词，确认全部图标列表可以筛选。
- 检查 `line` 和 `fill` 风格是否能正确切换。
- 设置 `offset-y="-1px"` 和 `offset-y="1px"`，确认只微调图标自身位置，不影响同行文字基线。
- 设置 `color`，确认图标颜色不影响周围文本。
- 设置 `title`，确认图标具有可访问名称。
