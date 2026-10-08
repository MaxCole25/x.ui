<script setup lang="ts">
import Example1 from '../examples/login/Example1.vue'
import Example1Source from '../examples/login/Example1.vue?raw'
import Example2 from '../examples/login/Example2.vue'
import Example2Source from '../examples/login/Example2.vue?raw'
import Example3 from '../examples/login/Example3.vue'
import Example3Source from '../examples/login/Example3.vue?raw'
import Example4 from '../examples/login/Example4.vue'
import Example4Source from '../examples/login/Example4.vue?raw'
import Example5 from '../examples/login/Example5.vue'
import Example5Source from '../examples/login/Example5.vue?raw'
</script>
# 登录 Login



`XLogin` 用于构建通用登录入口，内置用户名、密码、注册提示、滑块图像验证、字母识别验证、微信登录和短信验证的界面与事件接口。组件不绑定具体认证服务，业务项目可以通过事件接入自己的登录、注册、验证码、微信或短信逻辑。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 启用验证方式

图像验证、字母识别、微信登录、短信验证都可以独立启用。

<XDocDemo title="启用验证方式" :code="Example2Source">
  <Example2 />
</XDocDemo>

图像验证是滑块拼图形式。用户拖动滑块后，组件会通过 `image-captcha-change` 暴露滑动百分比，拖动到目标位置后触发 `image-captcha-success`。真实的服务端校验可以在这两个事件中接入。

### 回车登录

组件内部监听回车键，用户在任意输入框中按回车时，会自动触发登录按钮的点击逻辑，并派发 `login` 事件。`disabled` 或 `loading` 状态下不会触发登录。

### 记住我

默认显示“记住我”复选框，支持 `v-model:remember`。点击登录时，`login` 事件的 `LoginSubmitPayload` 会带上 `remember` 字段，业务侧可以据此决定是否记住账号或延长登录状态有效期。

<XDocDemo title="记住我" :code="Example3Source">
  <Example3 />
</XDocDemo>

### Logo 与标题区域

通过 `logoSrc` 设置 Logo 图片，通过 `logoPosition` 控制 Logo 位置。标题和介绍区域会自动撑满父元素宽度，适合放在不同宽度的登录卡片或布局容器中。

<XDocDemo title="Logo 与标题区域" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 标签位置和主题色

`labelPosition` 可以控制用户名、密码等表单标签显示在输入框上方或左侧。配色相关属性会映射为组件内部 CSS 变量，适合在业务系统中接入主题色。

<XDocDemo title="标签位置和主题色" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `username` | 用户名，支持 `v-model:username` | `string` | `''` | — |
| `title` | 登录标题 | `string` | `'欢迎登录'` | — |
| `description` | 登录介绍 | `string` | `'请输入账号信息继续访问系统'` | — |
| `labelPosition` | 表单标签位置 | `LoginLabelPosition` | `'top'` | — |
| `usernameLabel` | 公开属性，详见类型定义 | `string` | `'用户名'` | — |
| `passwordLabel` | 公开属性，详见类型定义 | `string` | `'密码'` | — |
| `usernamePlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入用户名'` | — |
| `passwordPlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入密码'` | — |
| `imageCodePlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入图像验证码'` | — |
| `letterCodePlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入字母验证码'` | — |
| `phonePlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入手机号'` | — |
| `smsCodePlaceholder` | 公开属性，详见类型定义 | `string` | `'请输入短信验证码'` | — |
| `loginText` | 登录按钮文案 | `string` | `'登录'` | — |
| `registerPromptText` | 注册提示前缀文案 | `string` | `'还没有账号？'` | — |
| `registerText` | 注册按钮文案 | `string` | `'立即注册'` | — |
| `smsButtonText` | 获取短信验证码按钮文案 | `string` | `'获取验证码'` | — |
| `wechatText` | 微信登录按钮文案 | `string` | `'微信登录'` | — |
| `rememberText` | 记住我复选框文案 | `string` | `'记住我'` | — |
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
| `loading` | 登录中状态 | `boolean` | `false` | — |
| `disabled` | 禁用状态 | `boolean` | `false` | — |
| `showRemember` | 是否显示“记住我”复选框 | `boolean` | `true` | — |
| `showRegister` | 是否显示注册按钮 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `password` | 密码，支持 `v-model:password` | `string` | `''` | — |
| `remember` | 是否记住登录，支持 `v-model:remember` | `boolean` | `false` | — |
| `imageCode` | 图像验证码，支持 `v-model:image-code` | `string` | `''` | — |
| `letterCode` | 字母识别验证码，支持 `v-model:letter-code` | `string` | `''` | — |
| `phone` | 手机号，支持 `v-model:phone` | `string` | `''` | — |
| `smsCode` | 短信验证码，支持 `v-model:sms-code` | `string` | `''` | — |
| `logoSrc` | Logo 图片地址 | `string` | `''` | — |
| `logoAlt` | Logo 图片替代文本 | `string` | `'Logo'` | — |
| `logoPosition` | Logo 位置 | `LoginLogoPosition` | `'top'` | — |
| `imageCaptchaSrc` | 滑块图像验证背景图片地址 | `string` | `''` | — |
| `imageCaptchaAlt` | 公开属性，详见类型定义 | `string` | `'滑块图像验证'` | — |
| `imageCaptchaTip` | 滑块图像验证提示 | `string` | `'按住滑块，拖动拼图完成验证'` | — |
| `enableImageCaptcha` | 是否启用图像验证 | `boolean` | `false` | — |
| `enableLetterCaptcha` | 是否启用字母识别验证 | `boolean` | `false` | — |
| `enableWechatLogin` | 是否启用微信登录入口 | `boolean` | `false` | — |
| `enableSmsLogin` | 是否启用短信验证区域 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:username` | 用户名变更 | `[value: string]` |
| `update:password` | 密码变更 | `[value: string]` |
| `update:remember` | 记住我状态变更 | `[value: boolean]` |
| `update:imageCode` | 图像验证码变更 | `[value: string]` |
| `update:letterCode` | 字母识别验证码变更 | `[value: string]` |
| `update:phone` | 手机号变更 | `[value: string]` |
| `update:smsCode` | 短信验证码变更 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `image-captcha-change` | 滑块图像验证拖动进度变化 | `[percent: number]` |
| `image-captcha-close` | 点击滑块验证关闭按钮 | `[]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `login` | 点击登录或按回车触发 | `[payload: LoginSubmitPayload]` |
| `register` | 点击注册按钮触发 | `[]` |
| `send-sms-code` | 点击获取短信验证码触发 | `[phone: string]` |
| `wechat-login` | 点击微信登录触发 | `[]` |
| `refresh-image-captcha` | 点击图像验证码区域触发 | `[]` |
| `refresh-letter-captcha` | 点击字母识别区域触发 | `[]` |
| `image-captcha-success` | 滑块图像验证拖动到目标位置 | `[]` |
| `image-captcha-help` | 点击滑块验证帮助按钮 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 登录标题 | `无作用域参数` |
| `description` | 登录介绍 | `无作用域参数` |
| `wechat-icon` | 自定义微信登录图标 | `无作用域参数` |
| `footer` | 表单底部扩展内容 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `logo` | 自定义 Logo 区域 | `无作用域参数` |
| `image-captcha` | 自定义图像验证码展示区域 | `无作用域参数` |
| `letter-captcha` | 自定义字母识别展示区域 | `无作用域参数` |
| `extra` | 表单中部扩展内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### LoginLogoPosition

```ts
export type LoginLogoPosition = 'top' | 'left' | 'right'
```

### LoginLabelPosition

```ts
export type LoginLabelPosition = 'top' | 'left'
```

### LoginFontSize

```ts
export type LoginFontSize = number
```

### LoginSubmitPayload

```ts
export interface LoginSubmitPayload {
  username: string
  password: string
  remember: boolean
  imageCode: string
  letterCode: string
  phone: string
  smsCode: string
}
```

### LoginProps

```ts
export interface LoginProps {
  username?: string
  password?: string
  remember?: boolean
  imageCode?: string
  letterCode?: string
  phone?: string
  smsCode?: string
  title?: string
  description?: string
  logoSrc?: string
  logoAlt?: string
  logoPosition?: LoginLogoPosition
  labelPosition?: LoginLabelPosition
  fontSize?: number
  loading?: boolean
  disabled?: boolean
  usernameLabel?: string
  passwordLabel?: string
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  imageCodePlaceholder?: string
  letterCodePlaceholder?: string
  phonePlaceholder?: string
  smsCodePlaceholder?: string
  loginText?: string
  registerPromptText?: string
  registerText?: string
  smsButtonText?: string
  wechatText?: string
  rememberText?: string
  imageCaptchaSrc?: string
  imageCaptchaAlt?: string
  imageCaptchaTitle?: string
  imageCaptchaTip?: string
  imageCaptchaSuccessText?: string
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
  letterCaptchaText?: string
  enableImageCaptcha?: boolean
  enableLetterCaptcha?: boolean
  enableWechatLogin?: boolean
  enableSmsLogin?: boolean
  showRemember?: boolean
  showRegister?: boolean
}
```

## 验收说明

- 切换图像验证、字母识别、微信登录、短信验证开关，确认区域显示和隐藏正常。
- 在用户名或密码输入框中按回车，确认触发 `login` 事件。
- 勾选或取消“记住我”，确认触发 `update:remember`，登录 payload 中的 `remember` 与界面一致。
- 点击“还没有账号？立即注册”，确认只派发 `register` 事件，具体注册逻辑由业务侧实现。
- 点击密码框右侧眼睛图标，确认密码明文和密文显示可以切换。
- 拖动滑块图像验证，确认进度事件和成功事件正常触发。
- 切换 `labelPosition` 为 `top` 和 `left`，确认用户名和密码标签位置正常。
- 修改主题色相关 props，确认卡片、按钮、边框和文字色能跟随业务主题变化。
- 切换 `logoPosition` 为 `top`、`left`、`right`，确认标题和介绍区域自动撑满可用宽度。
- 在窄容器窄屏下检查验证码输入框和按钮是否自动换行，不出现遮挡。
