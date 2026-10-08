<script setup lang="ts">
import Example1 from '../examples/avatar/Example1.vue'
import Example1Source from '../examples/avatar/Example1.vue?raw'
import Example2 from '../examples/avatar/Example2.vue'
import Example2Source from '../examples/avatar/Example2.vue?raw'
import Example3 from '../examples/avatar/Example3.vue'
import Example3Source from '../examples/avatar/Example3.vue?raw'
</script>
# 头像 Avatar

用于展示用户头像、姓名缩写或自定义头像内容。默认宽高为 32px，`avatarSize` 同时控制宽高，数字单位为 px，字符串使用 CSS 长度；`fontSize` 只控制文字大小，不改变头像尺寸。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 图标头像

`icon` 会交给 `XIcon` 渲染，支持 @x-soft88/x-ui 语义别名、Remix Icon 名称和 `ri-` 前缀名称。常规使用只需要引入 `@x-soft88/x-ui/style.css`，无需额外引入图标样式。

<XDocDemo title="图标头像" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 边框与形状

<XDocDemo title="边框与形状" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `name` | 显示名称，图片不可用时取前两个字符 | `string` | `''` | — |
| `icon` | 使用 `XIcon` 渲染的图标名称 | `string` | `''` | — |
| `iconTitle` | 图标可访问标题 | `string` | `undefined` | — |
| `iconSpin` | 图标是否旋转 | `boolean` | `false` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `iconFull` | 图标是否撑满头像尺寸 | `boolean` | `false` | — |
| `avatarSize` | 头像宽高，未设置时为 32px，与 fontSize 独立 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `iconVariant` | 图标类型 | `IconVariant` | `'line'` | — |
| `iconColor` | 图标颜色 | `string` | `undefined` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `avatarBackgroundColor` | 头像背景色 | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字会按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `src` | 图片地址 | `string` | `—` | — |
| `alt` | 图片替代文本 | `string` | `''` | — |
| `shape` | 形状 | `AvatarShape` | `'circle'` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### AvatarShape

```ts
export type AvatarShape = 'circle' | 'square'
```

### AvatarFontSize

```ts
export type AvatarFontSize = FontSize
```

### AvatarProps

```ts
export interface AvatarProps extends ElementStyleProps {
  src?: string
  alt?: string
  name?: string
  icon?: string
  iconVariant?: IconVariant
  iconFull?: boolean
  iconColor?: string
  iconTitle?: string
  iconSpin?: boolean
  fontSize?: number
  avatarSize?: number | string
  shape?: AvatarShape
  avatarBackgroundColor?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。

- 未设置 `avatarSize` 时检查宽高为 32px；分别调整 `avatarSize` 与 `fontSize`，确认只有前者改变头像宽高。`iconFull` 为 false 时图标使用头像尺寸的 56%（数字尺寸四舍五入到 px），为 true 时图标使用完整头像尺寸；恢复默认后检查公共控件与预览同步。

- 图片加载失败后显示默认插槽、图标或姓名缩写。将 `src` 改为另一个有效图片地址时会重新尝试加载；清空 `src` 后恢复回退内容。检查这一过程的 `alt` 与 `name` 说明，并在 Story 中恢复默认。
