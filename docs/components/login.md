# 登录 Login

`XLogin` 用于构建通用登录入口，内置用户名、密码、注册提示、滑块图像验证、字母识别验证、微信登录和短信验证的界面与事件接口。组件不绑定具体认证服务，业务项目可以通过事件接入自己的登录、注册、验证码、微信或短信逻辑。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XLogin } from 'x.ui'
import 'x.ui/style.css'

const username = ref('')
const password = ref('')
const remember = ref(false)

function handleLogin(payload) {
  console.log('登录数据', payload)
}

function handleRegister() {
  console.log('跳转注册页或打开注册弹窗')
}
</script>

<template>
  <XLogin
    v-model:username="username"
    v-model:password="password"
    v-model:remember="remember"
    title="系统登录"
    description="请输入账号和密码继续访问"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>
```

## 启用验证方式

图像验证、字母识别、微信登录、短信验证都可以独立启用。

```vue
<XLogin
  enable-image-captcha
  enable-letter-captcha
  enable-wechat-login
  enable-sms-login
  image-captcha-src="/api/captcha/background"
  image-captcha-title="拖动下方滑块完成拼图"
  letter-captcha-text="A7KQ"
  @refresh-image-captcha="refreshImageCaptcha"
  @image-captcha-success="verifyImageCaptcha"
  @refresh-letter-captcha="refreshLetterCaptcha"
  @send-sms-code="sendSmsCode"
  @wechat-login="startWechatLogin"
  @login="submitLogin"
/>
```

图像验证是滑块拼图形式。用户拖动滑块后，组件会通过 `image-captcha-change` 暴露滑动百分比，拖动到目标位置后触发 `image-captcha-success`。真实的服务端校验可以在这两个事件中接入。

## 回车登录

组件内部监听回车键，用户在任意输入框中按回车时，会自动触发登录按钮的点击逻辑，并派发 `login` 事件。`disabled` 或 `loading` 状态下不会触发登录。

## 记住我

默认显示“记住我”复选框，支持 `v-model:remember`。点击登录时，`login` 事件的 `LoginSubmitPayload` 会带上 `remember` 字段，业务侧可以据此决定是否记住账号或延长登录状态有效期。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const remember = ref(true)

function handleLogin(payload) {
  // payload.remember 为 true 时，业务侧可保存账号或使用更长有效期的会话
}
</script>

<template>
  <XLogin v-model:remember="remember" @login="handleLogin" />
</template>
```

## Logo 与标题区域

通过 `logoSrc` 设置 Logo 图片，通过 `logoPosition` 控制 Logo 位置。标题和介绍区域会自动撑满父元素宽度，适合放在不同宽度的登录卡片或布局容器中。

```vue
<XLogin
  logo-src="/logo.svg"
  logo-position="left"
  title="NexMod 工作台"
  description="统一身份入口"
/>
```

## 标签位置和主题色

`labelPosition` 可以控制用户名、密码等表单标签显示在输入框上方或左侧。配色相关属性会映射为组件内部 CSS 变量，适合在业务系统中接入主题色。

```vue
<XLogin
  label-position="left"
  accent-color="#8a4b12"
  accent-soft-color="#fff0d7"
  background-color="#fffaf1"
  border-color="#e7c892"
  border-width="2px"
  border-radius="16px"
  width="420px"
  text-color="#3f2d1b"
  muted-color="#806b55"
/>
```

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `username` | 用户名，支持 `v-model:username` | `string` | `''` |
| `password` | 密码，支持 `v-model:password` | `string` | `''` |
| `remember` | 是否记住登录，支持 `v-model:remember` | `boolean` | `false` |
| `imageCode` | 图像验证码，支持 `v-model:image-code` | `string` | `''` |
| `letterCode` | 字母识别验证码，支持 `v-model:letter-code` | `string` | `''` |
| `phone` | 手机号，支持 `v-model:phone` | `string` | `''` |
| `smsCode` | 短信验证码，支持 `v-model:sms-code` | `string` | `''` |
| `title` | 登录标题 | `string` | `'欢迎登录'` |
| `description` | 登录介绍 | `string` | `'请输入账号信息继续访问系统'` |
| `logoSrc` | Logo 图片地址 | `string` | `''` |
| `logoAlt` | Logo 图片替代文本 | `string` | `'Logo'` |
| `logoPosition` | Logo 位置 | `'top' \| 'left' \| 'right'` | `'top'` |
| `labelPosition` | 表单标签位置 | `'top' \| 'left'` | `'top'` |
| `size` | 组件尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | 登录中状态 | `boolean` | `false` |
| `disabled` | 禁用状态 | `boolean` | `false` |
| `enableImageCaptcha` | 是否启用图像验证 | `boolean` | `false` |
| `enableLetterCaptcha` | 是否启用字母识别验证 | `boolean` | `false` |
| `enableWechatLogin` | 是否启用微信登录入口 | `boolean` | `false` |
| `enableSmsLogin` | 是否启用短信验证区域 | `boolean` | `false` |
| `showRemember` | 是否显示“记住我”复选框 | `boolean` | `true` |
| `showRegister` | 是否显示注册按钮 | `boolean` | `true` |
| `loginText` | 登录按钮文案 | `string` | `'登录'` |
| `registerText` | 注册按钮文案 | `string` | `'注册'` |
| `smsButtonText` | 获取短信验证码按钮文案 | `string` | `'获取验证码'` |
| `wechatText` | 微信登录按钮文案 | `string` | `'微信登录'` |
| `rememberText` | 记住我复选框文案 | `string` | `'记住我'` |
| `registerPromptText` | 注册提示前缀文案 | `string` | `'还没有账号？'` |
| `imageCaptchaSrc` | 滑块图像验证背景图片地址 | `string` | `''` |
| `imageCaptchaTitle` | 滑块图像验证标题 | `string` | `'拖动下方滑块完成拼图'` |
| `imageCaptchaTip` | 滑块图像验证提示 | `string` | `'按住滑块，拖动拼图完成验证'` |
| `imageCaptchaSuccessText` | 滑块图像验证成功文案 | `string` | `'验证通过'` |
| `letterCaptchaText` | 字母识别展示文本 | `string` | `''` |
| `accentColor` | 主题主色 | `string` | `'#0b4a52'` |
| `accentSoftColor` | 主题浅色 | `string` | `'#e1f5f7'` |
| `backgroundColor` | 卡片背景色 | `string` | `'#ffffff'` |
| `borderColor` | 边框色 | `string` | `'#cfe0e6'` |
| `borderWidth` | 边框粗细 | `string` | `'1px'` |
| `borderRadius` | 外边框圆角大小 | `string` | `'18px'` |
| `width` | 组件宽度 | `string` | `'100%'` |
| `textColor` | 主文字色 | `string` | `'#12323a'` |
| `mutedColor` | 次级文字色 | `string` | `'#6b7c93'` |
| `inputBackgroundColor` | 输入框背景色 | `string` | `'#ffffff'` |
| `buttonTextColor` | 主按钮文字色 | `string` | `'#ffffff'` |

## Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `login` | 点击登录或按回车触发 | `LoginSubmitPayload` |
| `register` | 点击注册按钮触发 | `void` |
| `send-sms-code` | 点击获取短信验证码触发 | `phone: string` |
| `wechat-login` | 点击微信登录触发 | `void` |
| `refresh-image-captcha` | 点击图像验证码区域触发 | `void` |
| `image-captcha-change` | 滑块图像验证拖动进度变化 | `percent: number` |
| `image-captcha-success` | 滑块图像验证拖动到目标位置 | `void` |
| `image-captcha-help` | 点击滑块验证帮助按钮 | `void` |
| `image-captcha-close` | 点击滑块验证关闭按钮 | `void` |
| `refresh-letter-captcha` | 点击字母识别区域触发 | `void` |
| `update:username` | 用户名变更 | `value: string` |
| `update:password` | 密码变更 | `value: string` |
| `update:remember` | 记住我状态变更 | `value: boolean` |
| `update:imageCode` | 图像验证码变更 | `value: string` |
| `update:letterCode` | 字母识别验证码变更 | `value: string` |
| `update:phone` | 手机号变更 | `value: string` |
| `update:smsCode` | 短信验证码变更 | `value: string` |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `logo` | 自定义 Logo 区域 |
| `title` | 自定义标题 |
| `description` | 自定义介绍 |
| `image-captcha` | 自定义图像验证码展示区域 |
| `letter-captcha` | 自定义字母识别展示区域 |
| `wechat-icon` | 自定义微信登录图标 |
| `extra` | 表单中部扩展内容 |
| `footer` | 表单底部扩展内容 |

## 手动验收建议

- 切换图像验证、字母识别、微信登录、短信验证开关，确认区域显示和隐藏正常。
- 在用户名或密码输入框中按回车，确认触发 `login` 事件。
- 勾选或取消“记住我”，确认触发 `update:remember`，登录 payload 中的 `remember` 与界面一致。
- 点击“还没有账号？立即注册”，确认只派发 `register` 事件，具体注册逻辑由业务侧实现。
- 点击密码框右侧眼睛图标，确认密码明文和密文显示可以切换。
- 拖动滑块图像验证，确认进度事件和成功事件正常触发。
- 切换 `labelPosition` 为 `top` 和 `left`，确认用户名和密码标签位置正常。
- 修改主题色相关 props，确认卡片、按钮、边框和文字色能跟随业务主题变化。
- 切换 `logoPosition` 为 `top`、`left`、`right`，确认标题和介绍区域自动撑满可用宽度。
- 在移动端窄屏下检查验证码输入框和按钮是否自动换行，不出现遮挡。
