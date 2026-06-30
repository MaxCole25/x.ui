# 登录页 LoginPage

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const basicLoginProps = {
  username,
  password,
  title: '个人中心登录',
  description: '统一账号，安全访问业务中心'
}
const splitContentLeft = {
  visible: true,
  width: '48%',
  padding: 72,
  backgroundColor: '#0f766e'
}
const splitContentCenter = {
  width: '52%',
  padding: 48,
  backgroundColor: '#f8fafc'
}

function handleLogin() {}

const basicCode = `<XLoginPage
  preset="finance"
  :login-props="{
    username,
    password,
    title: '个人中心登录',
    description: '统一账号，安全访问业务中心'
  }"
  @login="handleLogin"
/>`

const sectionCode = `<XLoginPage
  preset="split"
  :content-left="{
    visible: true,
    width: '48%',
    padding: 72,
    backgroundColor: '#0f766e'
  }"
  :content-center="{
    width: '52%',
    padding: 48,
    backgroundColor: '#f8fafc'
  }"
  :login-width="420"
/>`

const slotCode = `<XLoginPage preset="recruit">
  <template #header>
    <strong>智联招聘</strong>
    <span>客服热线：400-885-9898</span>
  </template>

  <template #content-left>
    <h1>找风口工作</h1>
    <p>超全行业岗位等你来挑</p>
  </template>
</XLoginPage>`
</script>

`XLoginPage` 是页面级登录布局组件，负责顶栏、底栏、内容区和营销区域的布局、背景、留白与对齐。内部默认嵌套 `XLogin`，认证逻辑仍由业务侧通过事件处理。

## 基础用法

<XDocDemo title="基础用法" :code="basicCode">
  <div style="height: 560px; overflow: hidden">
    <XLoginPage
      preset="finance"
      :login-props="basicLoginProps"
      @login="handleLogin"
    />
  </div>
</XDocDemo>

## 区域配置

每个区域都使用同一个 `LoginPageSectionConfig` 配置对象。用户传入的配置会覆盖当前 `preset` 的默认值。

<XDocDemo title="区域配置" :code="sectionCode">
  <div style="height: 560px; overflow: hidden">
    <XLoginPage
      preset="split"
      :content-left="splitContentLeft"
      :content-center="splitContentCenter"
      :login-width="420"
    />
  </div>
</XDocDemo>

## 自定义区域

通过插槽可以替换顶栏、营销区、内容区、底栏或登录表单本身。

```vue
{{ slotCode }}
```

## 预设

| 预设 | 说明 |
| --- | --- |
| `finance` | 蓝紫金融风，顶栏、底栏、左侧营销区和中间登录卡片 |
| `recruit` | 蓝色招聘风，左营销右登录 |
| `retail` | 粉色电商风，顶部品牌、内容营销区和登录卡片 |
| `centered` | 居中简洁风，适合后台系统 |
| `split` | 左右分屏风，适合 SaaS 或企业系统 |

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `preset` | 登录页预设 | `'finance' \| 'recruit' \| 'retail' \| 'centered' \| 'split'` | `'centered'` |
| `width` | 根容器宽度，数字按 px 处理 | `number \| string` | `'100%'` |
| `height` | 根容器高度，数字按 px 处理 | `number \| string` | — |
| `minHeight` | 根容器最小高度，数字按 px 处理 | `number \| string` | `'100vh'` |
| `backgroundColor` | 根容器背景色 | `string` | `'#f6f8fb'` |
| `backgroundImage` | 根容器背景图地址 | `string` | `''` |
| `header` | 顶栏区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `footer` | 底栏区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `content` | 内容区配置 | `LoginPageSectionConfig` | 当前预设 |
| `contentTop` | 内容顶部区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `contentLeft` | 内容左侧区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `contentCenter` | 内容中间区域配置，默认放置 `XLogin` | `LoginPageSectionConfig` | 当前预设 |
| `contentRight` | 内容右侧区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `contentBottom` | 内容底部区域配置 | `LoginPageSectionConfig` | 当前预设 |
| `loginWidth` | 内部登录卡片期望宽度，桌面端优先保持该宽度，窄屏或父容器不足时按 `max-width: 100%` 收缩 | `number \| string` | 当前预设 |
| `loginProps` | 透传给内部 `XLogin` 的属性；显式传入 `width` 时会覆盖内部登录表单宽度 | `LoginProps` | `{}` |

## LoginPageSectionConfig

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

## Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `login` | 内部 `XLogin` 登录事件透传 | `LoginSubmitPayload` |
| `register` | 内部注册事件透传 | `void` |
| `send-sms-code` | 内部短信验证码事件透传 | `phone: string` |
| `wechat-login` | 内部微信登录事件透传 | `void` |
| `refresh-image-captcha` | 刷新图像验证码事件透传 | `void` |
| `refresh-letter-captcha` | 刷新字母验证码事件透传 | `void` |
| `image-captcha-change` | 图像验证码拖动变化事件透传 | `percent: number` |
| `image-captcha-success` | 图像验证码成功事件透传 | `void` |
| `image-captcha-help` | 图像验证码帮助事件透传 | `void` |
| `image-captcha-close` | 图像验证码关闭事件透传 | `void` |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `header` | 自定义顶栏 |
| `footer` | 自定义底栏 |
| `content-top` | 自定义内容顶部区域 |
| `content-left` | 自定义内容左侧区域 |
| `content-center` | 自定义内容中间区域 |
| `content-right` | 自定义内容右侧区域 |
| `content-bottom` | 自定义内容底部区域 |
| `login` | 完全替换默认内部 `XLogin` |
| `brand` | 替换默认品牌内容 |
| `slogan` | 替换默认营销文案 |

## 手动验收建议

- 切换 5 种 `preset`，确认布局和配色能正常变化。
- 分别设置各区域 `visible`，确认顶栏、底栏、内容顶、内容左、内容中、内容右、内容下可以独立显示或隐藏。
- 修改区域的宽度、高度、内边距、对齐、背景色和背景图，确认只影响对应区域。
- 修改 `loginWidth` 和 `loginProps`，确认内部 `XLogin` 能接收配置。
- 触发登录、注册、短信、验证码和第三方登录事件，确认事件能从 `XLoginPage` 透传出来。
