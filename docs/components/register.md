<script setup lang="ts">
import Example1 from '../examples/register/Example1.vue'
import Example1Source from '../examples/register/Example1.vue?raw'
import Example2 from '../examples/register/Example2.vue'
import Example2Source from '../examples/register/Example2.vue?raw'
import Example3 from '../examples/register/Example3.vue'
import Example3Source from '../examples/register/Example3.vue?raw'
</script>
# 注册 Register



`XRegister` 用于构建通用注册入口，内置用户名、手机号、短信验证码、密码、确认密码和协议勾选的界面与事件接口。组件只负责收集表单状态并派发事件，不绑定具体注册服务。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 启用验证方式

图像验证和字母识别可以独立启用。短信验证码入口默认显示，点击按钮会通过 `send-sms-code` 暴露当前手机号。

<XDocDemo title="启用验证方式" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 标签位置和主题色

`labelPosition` 可以控制表单标签显示在输入框上方或左侧。配色相关属性会映射为组件内部 CSS 变量，适合在业务系统中接入主题色。

<XDocDemo title="标签位置和主题色" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `username` | 用户名，支持 `v-model:username` | `string` | `''` | — |
| `displayName` | 显示名称 | `string` | `''` | — |
| `title` | 注册标题 | `string` | `'创建账号'` | — |
| `description` | 注册介绍 | `string` | `'填写注册信息后即可开始使用'` | — |
| `labelPosition` | 表单标签位置 | `RegisterLabelPosition` | `'top'` | — |
| `usernameLabel` | 用户名标签文字 | `string` | `'用户名'` | — |
| `displayNameLabel` | 显示名称标签文字 | `string` | `'显示名称'` | — |
| `phoneLabel` | 手机号标签文字 | `string` | `'手机号'` | — |
| `smsCodeLabel` | 短信验证码标签文字 | `string` | `'短信验证'` | — |
| `passwordLabel` | 密码标签文字 | `string` | `'密码'` | — |
| `confirmPasswordLabel` | 确认密码标签文字 | `string` | `'确认密码'` | — |
| `usernamePlaceholder` | 用户名输入框占位文字 | `string` | `'请输入用户名'` | — |
| `displayNamePlaceholder` | 显示名称输入框占位文字 | `string` | `'请输入显示名称'` | — |
| `phonePlaceholder` | 手机号输入框占位文字 | `string` | `'请输入手机号'` | — |
| `smsCodePlaceholder` | 短信验证码输入框占位文字 | `string` | `'请输入短信验证码'` | — |
| `passwordPlaceholder` | 密码输入框占位文字 | `string` | `'请输入密码'` | — |
| `confirmPasswordPlaceholder` | 确认密码输入框占位文字 | `string` | `'请再次输入密码'` | — |
| `imageCodePlaceholder` | 图片验证码输入框占位文字 | `string` | `'请输入图像验证码'` | — |
| `letterCodePlaceholder` | 字符验证码输入框占位文字 | `string` | `'请输入字母验证码'` | — |
| `registerText` | 注册按钮文案 | `string` | `'注册'` | — |
| `loginPromptText` | 登录提示前缀文案 | `string` | `'已有账号？'` | — |
| `loginText` | 登录按钮文案 | `string` | `'立即登录'` | — |
| `smsButtonText` | 获取短信验证码按钮文案 | `string` | `'获取验证码'` | — |
| `agreementText` | 协议勾选文案 | `string` | `'我已阅读并同意用户协议'` | — |
| `imageCaptchaTitle` | 滑块图像验证标题 | `string` | `'拖动下方滑块完成拼图'` | — |
| `imageCaptchaSuccessText` | 滑块图像验证成功文案 | `string` | `'验证通过'` | — |
| `letterCaptchaText` | 字母识别展示文本 | `string` | `''` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 组件宽度 | `string` | `'100%'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `accentColor` | 主题主色 | `string` | `'#0b4a52'` | — |
| `accentSoftColor` | 主题浅色 | `string` | `'#e1f5f7'` | — |
| `backgroundColor` | 卡片背景色 | `string` | `'#ffffff'` | — |
| `borderColor` | 边框色 | `string` | `'#cfe0e6'` | — |
| `borderWidth` | 边框粗细 | `string` | `'1px'` | — |
| `radius` | 外边框圆角大小 | `number \| string` | `'18px'` | 数字为 px；字符串使用 CSS 单位 |
| `textColor` | 主文字色 | `string` | `'#12323a'` | — |
| `mutedTextColor` | 次级文字色 | `string` | `'#6b7c93'` | — |
| `inputBackgroundColor` | 输入框背景色 | `string` | `'#ffffff'` | — |
| `buttonTextColor` | 主按钮文字色 | `string` | `'#ffffff'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 注册中状态 | `boolean` | `false` | — |
| `disabled` | 禁用状态 | `boolean` | `false` | — |
| `showDisplayName` | 是否显示名称输入框 | `boolean` | `false` | — |
| `showPhone` | 是否显示手机号输入框 | `boolean` | `true` | — |
| `showSmsCode` | 是否显示短信验证码输入框 | `boolean` | `true` | — |
| `showAgreement` | 是否显示协议勾选 | `boolean` | `true` | — |
| `showLogin` | 是否显示登录入口 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `phone` | 手机号，支持 `v-model:phone` | `string` | `''` | — |
| `smsCode` | 短信验证码，支持 `v-model:sms-code` | `string` | `''` | — |
| `password` | 密码，支持 `v-model:password` | `string` | `''` | — |
| `confirmPassword` | 确认密码，支持 `v-model:confirm-password` | `string` | `''` | — |
| `agreementChecked` | 是否同意协议，支持 `v-model:agreement-checked` | `boolean` | `false` | — |
| `letterCode` | 字母识别验证码，支持 `v-model:letter-code` | `string` | `''` | — |
| `imageCode` | 图像验证码，支持 `v-model:image-code` | `string` | `''` | — |
| `logoSrc` | Logo 图片地址 | `string` | `''` | — |
| `logoAlt` | Logo 图片替代文本 | `string` | `'Logo'` | — |
| `logoPosition` | Logo 位置 | `RegisterLogoPosition` | `'top'` | — |
| `imageCaptchaSrc` | 滑块图像验证背景图片地址 | `string` | `''` | — |
| `imageCaptchaAlt` | 验证码图片的替代文字 | `string` | `'滑块图像验证'` | — |
| `imageCaptchaTip` | 滑块图像验证提示 | `string` | `'按住滑块，拖动拼图完成验证'` | — |
| `enableImageCaptcha` | 是否启用图像验证 | `boolean` | `false` | — |
| `enableLetterCaptcha` | 是否启用字母识别验证 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:username` | 用户名变更 | `[value: string]` |
| `update:displayName` | update:displayName 事件 | `[value: string]` |
| `update:phone` | 手机号变更 | `[value: string]` |
| `update:smsCode` | 短信验证码变更 | `[value: string]` |
| `update:password` | 密码变更 | `[value: string]` |
| `update:confirmPassword` | 确认密码变更 | `[value: string]` |
| `update:agreementChecked` | 协议勾选状态变更 | `[value: boolean]` |
| `update:letterCode` | 字母识别验证码变更 | `[value: string]` |
| `update:imageCode` | 图像验证码变更 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `image-captcha-change` | 滑块图像验证拖动进度变化 | `[percent: number]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `register` | 点击注册或按回车触发 | `[payload: RegisterSubmitPayload]` |
| `login` | 点击登录入口触发 | `[]` |
| `send-sms-code` | 点击获取短信验证码触发 | `[phone: string]` |
| `refresh-image-captcha` | 点击刷新图像验证码触发 | `[]` |
| `refresh-letter-captcha` | 点击字母识别区域触发 | `[]` |
| `image-captcha-success` | 滑块图像验证拖动到目标位置 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 注册标题 | `无作用域参数` |
| `description` | 注册介绍 | `无作用域参数` |
| `footer` | 表单底部扩展内容 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `logo` | 自定义 Logo 区域 | `无作用域参数` |
| `image-captcha` | 自定义图像验证码展示区域 | `无作用域参数` |
| `letter-captcha` | 自定义字母识别展示区域 | `无作用域参数` |
| `agreement` | 自定义协议勾选文案 | `无作用域参数` |
| `extra` | 表单中部扩展内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### RegisterLogoPosition

```ts
export type RegisterLogoPosition = 'top' | 'left' | 'right'
```

### RegisterLabelPosition

```ts
export type RegisterLabelPosition = 'top' | 'left'
```

### RegisterFontSize

```ts
export type RegisterFontSize = number
```

### RegisterSubmitPayload

```ts
export interface RegisterSubmitPayload {
  username: string
  displayName: string
  phone: string
  smsCode: string
  password: string
  confirmPassword: string
  agreementChecked: boolean
  letterCode: string
  imageCode: string
}
```

### RegisterProps

```ts
export interface RegisterProps {
  username?: string
  displayName?: string
  phone?: string
  smsCode?: string
  password?: string
  confirmPassword?: string
  agreementChecked?: boolean
  letterCode?: string
  imageCode?: string
  title?: string
  description?: string
  logoSrc?: string
  logoAlt?: string
  logoPosition?: RegisterLogoPosition
  labelPosition?: RegisterLabelPosition
  fontSize?: number
  loading?: boolean
  disabled?: boolean
  usernameLabel?: string
  displayNameLabel?: string
  phoneLabel?: string
  smsCodeLabel?: string
  passwordLabel?: string
  confirmPasswordLabel?: string
  usernamePlaceholder?: string
  displayNamePlaceholder?: string
  phonePlaceholder?: string
  smsCodePlaceholder?: string
  passwordPlaceholder?: string
  confirmPasswordPlaceholder?: string
  imageCodePlaceholder?: string
  letterCodePlaceholder?: string
  registerText?: string
  loginPromptText?: string
  loginText?: string
  smsButtonText?: string
  agreementText?: string
  imageCaptchaSrc?: string
  imageCaptchaAlt?: string
  imageCaptchaTitle?: string
  imageCaptchaTip?: string
  imageCaptchaSuccessText?: string
  letterCaptchaText?: string
  accentColor?: string
  accentSoftColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  radius?: number | string
  width?: string
  textColor?: string
  mutedTextColor?: string
  inputBackgroundColor?: string
  buttonTextColor?: string
  enableImageCaptcha?: boolean
  enableLetterCaptcha?: boolean
  showDisplayName?: boolean
  showPhone?: boolean
  showSmsCode?: boolean
  showAgreement?: boolean
  showLogin?: boolean
}
```

## 验收说明

- 输入用户名、手机号、短信验证码、密码和确认密码，确认对应 `update:*` 事件正常触发。
- 点击注册按钮或在输入框中按回车，确认派发 `register` 事件。
- 点击获取验证码，确认 `send-sms-code` 事件携带当前手机号。
- 勾选或取消协议，确认 `RegisterSubmitPayload.agreementChecked` 与界面一致。
- 切换图像验证和字母识别开关，确认区域显示和隐藏正常。
- 点击“已有账号？立即登录”，确认只派发 `login` 事件。
- 修改主题色相关 props，确认卡片、按钮、边框和文字色能跟随业务主题变化。
- 在窄容器窄屏下检查验证码输入框和按钮是否自动换行，不出现遮挡。
