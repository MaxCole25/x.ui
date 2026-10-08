<script setup lang="ts">
import Example1 from '../examples/login-page/Example1.vue'
import Example1Source from '../examples/login-page/Example1.vue?raw'
import Example2 from '../examples/login-page/Example2.vue'
import Example2Source from '../examples/login-page/Example2.vue?raw'
</script>
# 登录页 LoginPage



`XLoginPage` 是页面级登录布局组件，负责顶栏、底栏、内容区和营销区域的布局、背景、留白与对齐。内部默认嵌套 `XLogin`，认证逻辑仍由业务侧通过事件处理。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 区域配置

每个区域都使用同一个 `LoginPageSectionConfig` 配置对象。用户传入的配置会覆盖当前 `preset` 的默认值。

<XDocDemo title="区域配置" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义区域

通过插槽可以替换顶栏、营销区、内容区、底栏或登录表单本身。

```vue
{{ slotCode }}
```

### 预设

| 预设 | 说明 |
| --- | --- |
| `finance` | 蓝紫金融风，顶栏、底栏、左侧营销区和中间登录卡片 |
| `recruit` | 蓝色招聘风，左营销右登录 |
| `retail` | 粉色电商风，顶部品牌、内容营销区和登录卡片 |
| `centered` | 居中简洁风，适合后台系统 |
| `split` | 左右分屏风，适合 SaaS 或企业系统 |

### LoginPageSectionConfig

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `visible` | 是否显示当前区域 | `boolean` |
| `width` / `minWidth` / `maxWidth` | 宽度、最小宽度、最大宽度 | `number \| string` |
| `height` / `minHeight` / `maxHeight` | 高度、最小高度、最大高度 | `number \| string` |
| `padding` | 内边距 | `number \| string` |
| `gap` | 子元素间距 | `number \| string` |
| `align` | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` |
| `justify` | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` |
| `direction` | 排列方向 | `'row' \| 'column'` |
| `backgroundColor` | 背景色 | `string` |
| `backgroundImage` | 背景图地址 | `string` |
| `backgroundSize` | 背景尺寸 | `'auto' \| 'cover' \| 'contain' \| string` |
| `backgroundPosition` | 背景位置 | `string` |
| `backgroundRepeat` | 背景重复方式 | `'repeat' \| 'no-repeat'` |
| `radius` | 圆角 | `number \| string` |
| `borderWidth` | 边框粗细 | `number \| string` |
| `borderColor` | 边框色 | `string` |
| `textColor` | 文字色 | `string` |
| `overflow` | 溢出方式 | `'visible' \| 'hidden' \| 'auto'` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `header` | 顶栏区域配置 | `LoginPageSectionConfig` | `—` | — |
| `footer` | 底栏区域配置 | `LoginPageSectionConfig` | `—` | — |
| `content` | 内容区配置 | `LoginPageSectionConfig` | `—` | — |
| `contentTop` | 内容顶部区域配置 | `LoginPageSectionConfig` | `—` | — |
| `contentLeft` | 内容左侧区域配置 | `LoginPageSectionConfig` | `—` | — |
| `contentCenter` | 内容中间区域配置，默认放置 `XLogin` | `LoginPageSectionConfig` | `—` | — |
| `contentRight` | 内容右侧区域配置 | `LoginPageSectionConfig` | `—` | — |
| `contentBottom` | 内容底部区域配置 | `LoginPageSectionConfig` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 根容器宽度，数字按 px 处理 | `number \| string` | `'100%'` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 根容器高度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 根容器最小高度，数字按 px 处理 | `number \| string` | `'100vh'` | 数字为 px；字符串使用 CSS 单位 |
| `loginWidth` | 内部登录卡片期望宽度，桌面端优先保持该宽度，窄屏或父容器不足时按 `max-width: 100%` 收缩 | `number \| string` | `420` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `backgroundColor` | 背景色 | `string` | `'#f6f8fb'` | — |
| `backgroundImage` | 背景图地址 | `string` | `''` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `preset` | 登录页预设 | `LoginPagePreset` | `'centered'` | — |
| `loginProps` | 透传给内部 `XLogin` 的属性；显式传入 `width` 时会覆盖内部登录表单宽度 | `LoginProps` | `() => ({})` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `image-captcha-change` | 图像验证码拖动变化事件透传 | `[percent: number]` |
| `image-captcha-close` | 图像验证码关闭事件透传 | `[]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `login` | 内部 `XLogin` 登录事件透传 | `[payload: LoginSubmitPayload]` |
| `register` | 内部注册事件透传 | `[]` |
| `send-sms-code` | 内部短信验证码事件透传 | `[phone: string]` |
| `wechat-login` | 内部微信登录事件透传 | `[]` |
| `refresh-image-captcha` | 刷新图像验证码事件透传 | `[]` |
| `refresh-letter-captcha` | 刷新字母验证码事件透传 | `[]` |
| `image-captcha-success` | 图像验证码成功事件透传 | `[]` |
| `image-captcha-help` | 图像验证码帮助事件透传 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 顶栏区域配置 | `无作用域参数` |
| `content-top` | 自定义内容顶部区域 | `无作用域参数` |
| `content-left` | 自定义内容左侧区域 | `无作用域参数` |
| `content-center` | 自定义内容中间区域 | `无作用域参数` |
| `content-right` | 自定义内容右侧区域 | `无作用域参数` |
| `content-bottom` | 自定义内容底部区域 | `无作用域参数` |
| `footer` | 底栏区域配置 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `brand` | 替换默认品牌内容 | `无作用域参数` |
| `slogan` | 替换默认营销文案 | `无作用域参数` |
| `login` | 内部 `XLogin` 登录事件透传 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### LoginPagePreset

```ts
export type LoginPagePreset = 'finance' | 'recruit' | 'retail' | 'centered' | 'split'
```

### LoginPageAlign

```ts
export type LoginPageAlign = 'start' | 'center' | 'end' | 'stretch'
```

### LoginPageJustify

```ts
export type LoginPageJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
```

### LoginPageDirection

```ts
export type LoginPageDirection = 'row' | 'column'
```

### LoginPageBackgroundSize

```ts
export type LoginPageBackgroundSize = 'auto' | 'cover' | 'contain'
```

### LoginPageBackgroundRepeat

```ts
export type LoginPageBackgroundRepeat = 'repeat' | 'no-repeat'
```

### LoginPageSectionOverflow

```ts
export type LoginPageSectionOverflow = 'visible' | 'hidden' | 'auto'
```

### LoginPageSectionConfig

```ts
export interface LoginPageSectionConfig {
  visible?: boolean
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  padding?: number | string
  gap?: number | string
  align?: LoginPageAlign
  justify?: LoginPageJustify
  direction?: LoginPageDirection
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: LoginPageBackgroundSize | string
  backgroundPosition?: string
  backgroundRepeat?: LoginPageBackgroundRepeat
  radius?: number | string
  borderWidth?: number | string
  borderColor?: string
  textColor?: string
  overflow?: LoginPageSectionOverflow
}
```

### LoginPageProps

```ts
export interface LoginPageProps {
  preset?: LoginPagePreset
  width?: number | string
  height?: number | string
  minHeight?: number | string
  backgroundColor?: string
  backgroundImage?: string

  header?: LoginPageSectionConfig
  footer?: LoginPageSectionConfig
  content?: LoginPageSectionConfig
  contentTop?: LoginPageSectionConfig
  contentLeft?: LoginPageSectionConfig
  contentCenter?: LoginPageSectionConfig
  contentRight?: LoginPageSectionConfig
  contentBottom?: LoginPageSectionConfig

  loginWidth?: number | string
  loginProps?: LoginProps
}
```

## 验收说明

- 切换 5 种 `preset`，确认布局和配色能正常变化。
- 分别设置各区域 `visible`，确认顶栏、底栏、内容顶、内容左、内容中、内容右、内容下可以独立显示或隐藏。
- 修改区域的宽度、高度、内边距、对齐、背景色和背景图，确认只影响对应区域。
- 修改 `loginWidth` 和 `loginProps`，确认内部 `XLogin` 能接收配置。
- 触发登录、注册、短信、验证码和第三方登录事件，确认事件能从 `XLoginPage` 透传出来。
