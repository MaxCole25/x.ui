# 注册 Register

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const phone = ref('')
const smsCode = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreementChecked = ref(false)
const themedUsername = ref('new-user')
const themedPhone = ref('13800000000')

function handleRegister() {}

function handleLogin() {}

function sendSmsCode() {}

const registerBasicCode = `<XRegister
  v-model:username="username"
  v-model:phone="phone"
  v-model:sms-code="smsCode"
  v-model:password="password"
  v-model:confirm-password="confirmPassword"
  v-model:agreement-checked="agreementChecked"
  title="创建账号"
  description="填写注册信息后即可开始使用"
  @register="handleRegister"
/>`

const registerCaptchaCode = `<XRegister
  enable-image-captcha
  enable-letter-captcha
  letter-captcha-text="A7KQ"
  @send-sms-code="sendSmsCode"
  @register="handleRegister"
/>`

const registerThemeCode = `<XRegister
  label-position="left"
  accent-color="#8a4b12"
  accent-soft-color="#fff0d7"
  background-color="#fffaf1"
  border-color="#e7c892"
  border-width="2px"
  radius="16px"
  width="420px"
/>`
</script>

`XRegister` 用于构建通用注册入口，内置用户名、手机号、短信验证码、密码、确认密码和协议勾选的界面与事件接口。组件只负责收集表单状态并派发事件，不绑定具体注册服务。

## 基础用法

<XDocDemo title="基础用法" :code="registerBasicCode">
  <div style="max-width: 420px">
    <XRegister
      v-model:username="username"
      v-model:phone="phone"
      v-model:sms-code="smsCode"
      v-model:password="password"
      v-model:confirm-password="confirmPassword"
      v-model:agreement-checked="agreementChecked"
      title="创建账号"
      description="填写注册信息后即可开始使用"
      @register="handleRegister"
      @login="handleLogin"
    />
  </div>
</XDocDemo>

## 启用验证方式

图像验证和字母识别可以独立启用。短信验证码入口默认显示，点击按钮会通过 `send-sms-code` 暴露当前手机号。

<XDocDemo title="启用验证方式" :code="registerCaptchaCode">
  <div style="max-width: 420px">
    <XRegister
      enable-image-captcha
      enable-letter-captcha
      letter-captcha-text="A7KQ"
      title="安全注册"
      description="示例展示验证码入口"
      @send-sms-code="sendSmsCode"
      @register="handleRegister"
    />
  </div>
</XDocDemo>

## 标签位置和主题色

`labelPosition` 可以控制表单标签显示在输入框上方或左侧。配色相关属性会映射为组件内部 CSS 变量，适合在业务系统中接入主题色。

<XDocDemo title="标签位置和主题色" :code="registerThemeCode">
  <div style="max-width: 460px">
    <XRegister
      v-model:username="themedUsername"
      v-model:phone="themedPhone"
      label-position="left"
      accent-color="#8a4b12"
      accent-soft-color="#fff0d7"
      background-color="#fffaf1"
      border-color="#e7c892"
      border-width="2px"
      radius="16px"
      width="420px"
    />
  </div>
</XDocDemo>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `username` | 用户名，支持 `v-model:username` | `string` | `''` |
| `phone` | 手机号，支持 `v-model:phone` | `string` | `''` |
| `smsCode` | 短信验证码，支持 `v-model:sms-code` | `string` | `''` |
| `password` | 密码，支持 `v-model:password` | `string` | `''` |
| `confirmPassword` | 确认密码，支持 `v-model:confirm-password` | `string` | `''` |
| `agreementChecked` | 是否同意协议，支持 `v-model:agreement-checked` | `boolean` | `false` |
| `letterCode` | 字母识别验证码，支持 `v-model:letter-code` | `string` | `''` |
| `imageCode` | 图像验证码，支持 `v-model:image-code` | `string` | `''` |
| `title` | 注册标题 | `string` | `'创建账号'` |
| `description` | 注册介绍 | `string` | `'填写注册信息后即可开始使用'` |
| `logoSrc` | Logo 图片地址 | `string` | `''` |
| `logoAlt` | Logo 图片替代文本 | `string` | `'Logo'` |
| `logoPosition` | Logo 位置 | `'top' \| 'left' \| 'right'` | `'top'` |
| `labelPosition` | 表单标签位置 | `'top' \| 'left'` | `'top'` |
| `size` | 组件尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | 注册中状态 | `boolean` | `false` |
| `disabled` | 禁用状态 | `boolean` | `false` |
| `enableImageCaptcha` | 是否启用图像验证 | `boolean` | `false` |
| `enableLetterCaptcha` | 是否启用字母识别验证 | `boolean` | `false` |
| `showAgreement` | 是否显示协议勾选 | `boolean` | `true` |
| `showLogin` | 是否显示登录入口 | `boolean` | `true` |
| `registerText` | 注册按钮文案 | `string` | `'注册'` |
| `loginPromptText` | 登录提示前缀文案 | `string` | `'已有账号？'` |
| `loginText` | 登录按钮文案 | `string` | `'立即登录'` |
| `smsButtonText` | 获取短信验证码按钮文案 | `string` | `'获取验证码'` |
| `agreementText` | 协议勾选文案 | `string` | `'我已阅读并同意用户协议'` |
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
| `radius` | 外边框圆角大小 | `string` | `'18px'` |
| `width` | 组件宽度 | `string` | `'100%'` |
| `textColor` | 主文字色 | `string` | `'#12323a'` |
| `mutedTextColor` | 次级文字色 | `string` | `'#6b7c93'` |
| `inputBackgroundColor` | 输入框背景色 | `string` | `'#ffffff'` |
| `buttonTextColor` | 主按钮文字色 | `string` | `'#ffffff'` |

## Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `register` | 点击注册或按回车触发 | `RegisterSubmitPayload` |
| `login` | 点击登录入口触发 | `void` |
| `send-sms-code` | 点击获取短信验证码触发 | `phone: string` |
| `refresh-image-captcha` | 点击刷新图像验证码触发 | `void` |
| `image-captcha-change` | 滑块图像验证拖动进度变化 | `percent: number` |
| `image-captcha-success` | 滑块图像验证拖动到目标位置 | `void` |
| `refresh-letter-captcha` | 点击字母识别区域触发 | `void` |
| `update:username` | 用户名变更 | `value: string` |
| `update:phone` | 手机号变更 | `value: string` |
| `update:smsCode` | 短信验证码变更 | `value: string` |
| `update:password` | 密码变更 | `value: string` |
| `update:confirmPassword` | 确认密码变更 | `value: string` |
| `update:agreementChecked` | 协议勾选状态变更 | `value: boolean` |
| `update:imageCode` | 图像验证码变更 | `value: string` |
| `update:letterCode` | 字母识别验证码变更 | `value: string` |

## Slots

| 插槽 | 说明 |
| --- | --- |
| `logo` | 自定义 Logo 区域 |
| `title` | 自定义标题 |
| `description` | 自定义介绍 |
| `image-captcha` | 自定义图像验证码展示区域 |
| `letter-captcha` | 自定义字母识别展示区域 |
| `agreement` | 自定义协议勾选文案 |
| `extra` | 表单中部扩展内容 |
| `footer` | 表单底部扩展内容 |

## 手动验收建议

- 输入用户名、手机号、短信验证码、密码和确认密码，确认对应 `update:*` 事件正常触发。
- 点击注册按钮或在输入框中按回车，确认派发 `register` 事件。
- 点击获取验证码，确认 `send-sms-code` 事件携带当前手机号。
- 勾选或取消协议，确认 `RegisterSubmitPayload.agreementChecked` 与界面一致。
- 切换图像验证和字母识别开关，确认区域显示和隐藏正常。
- 点击“已有账号？立即登录”，确认只派发 `login` 事件。
- 修改主题色相关 props，确认卡片、按钮、边框和文字色能跟随业务主题变化。
- 在移动端窄屏下检查验证码输入框和按钮是否自动换行，不出现遮挡。
