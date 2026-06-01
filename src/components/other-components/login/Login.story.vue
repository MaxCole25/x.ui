<script setup lang="ts">
import { computed, reactive } from 'vue'
import { XLogin } from './index'
import type { LoginLabelPosition, LoginLogoPosition, LoginSize, LoginSubmitPayload } from './src/types'
import '../../../styles/index.css'

const state = reactive({
  username: 'admin',
  password: '123456',
  remember: true,
  imageCode: '',
  letterCode: '',
  phone: '13800000000',
  smsCode: '',
  title: 'NexMod 工作台',
  description: '统一身份入口，支持账号、验证码、微信和短信登录能力。',
  logoPosition: 'top' as LoginLogoPosition,
  labelPosition: 'top' as LoginLabelPosition,
  size: 'md' as LoginSize,
  accentColor: '#0b4a52',
  accentSoftColor: '#e1f5f7',
  backgroundColor: '#ffffff',
  borderColor: '#cfe0e6',
  borderWidth: '1px',
  radius: '18px',
  width: '100%',
  loading: false,
  enableImageCaptcha: true,
  enableLetterCaptcha: true,
  enableWechatLogin: true,
  enableSmsLogin: true,
  eventLog: '等待操作'
})

const previewCode = computed(() => {
  const attrs = [
    'v-model:username="username"',
    'v-model:password="password"',
    'v-model:remember="remember"',
    state.enableImageCaptcha ? 'enable-image-captcha' : '',
    state.enableLetterCaptcha ? 'enable-letter-captcha' : '',
    state.enableWechatLogin ? 'enable-wechat-login' : '',
    state.enableSmsLogin ? 'enable-sms-login' : '',
    state.logoPosition !== 'top' ? `logo-position="${state.logoPosition}"` : '',
    state.labelPosition !== 'top' ? `label-position="${state.labelPosition}"` : ''
  ].filter(Boolean)

  return `<XLogin ${attrs.join(' ')} @login="handleLogin" @register="handleRegister" />`
})

function writeLog(message: string) {
  state.eventLog = `${new Date().toLocaleTimeString()} ${message}`
}

function handleLogin(payload: LoginSubmitPayload) {
  writeLog(`登录：${payload.username || '未填写用户名'}，记住我：${payload.remember ? '是' : '否'}，短信：${payload.smsCode || '未填写'}`)
}
</script>

<template>
  <Story title="其它组件/登录 Login" group="components">
    <Variant title="外观接口">
      <div class="login-story">
        <div class="login-story__preview">
          <XLogin
            v-model:username="state.username"
            v-model:password="state.password"
            v-model:remember="state.remember"
            v-model:image-code="state.imageCode"
            v-model:letter-code="state.letterCode"
            v-model:phone="state.phone"
            v-model:sms-code="state.smsCode"
            :title="state.title"
            :description="state.description"
            :logo-position="state.logoPosition"
            :label-position="state.labelPosition"
            :size="state.size"
            :accent-color="state.accentColor"
            :accent-soft-color="state.accentSoftColor"
            :background-color="state.backgroundColor"
            :border-color="state.borderColor"
            :border-width="state.borderWidth"
            :radius="state.radius"
            :width="state.width"
            :loading="state.loading"
            :enable-image-captcha="state.enableImageCaptcha"
            :enable-letter-captcha="state.enableLetterCaptcha"
            :enable-wechat-login="state.enableWechatLogin"
            :enable-sms-login="state.enableSmsLogin"
            image-captcha-src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=680&q=80"
            letter-captcha-text="A7KQ"
            @login="handleLogin"
            @register="writeLog('点击注册')"
            @send-sms-code="writeLog(`发送短信验证码：${state.phone || '未填写手机号'}`)"
            @wechat-login="writeLog('触发微信登录')"
            @refresh-image-captcha="writeLog('刷新图像验证码')"
            @image-captcha-success="writeLog('滑块图像验证通过')"
            @image-captcha-help="writeLog('点击滑块验证帮助')"
            @image-captcha-close="writeLog('关闭滑块图像验证')"
            @refresh-letter-captcha="writeLog('刷新字母识别验证码')"
          />
        </div>

        <div class="login-story__controls">
          <label>
            <span>标题</span>
            <input v-model="state.title" />
          </label>
          <label>
            <span>介绍</span>
            <input v-model="state.description" />
          </label>
          <label>
            <span>Logo位置</span>
            <select v-model="state.logoPosition">
              <option value="top">顶部</option>
              <option value="left">左侧</option>
              <option value="right">右侧</option>
            </select>
          </label>
          <label>
            <span>标签位置</span>
            <select v-model="state.labelPosition">
              <option value="top">上方</option>
              <option value="left">左侧</option>
            </select>
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="state.size">
              <option value="sm">小</option>
              <option value="md">默认</option>
              <option value="lg">大</option>
            </select>
          </label>
          <label>
            <span>主色</span>
            <input v-model="state.accentColor" type="color" />
          </label>
          <label>
            <span>浅色</span>
            <input v-model="state.accentSoftColor" type="color" />
          </label>
          <label>
            <span>背景</span>
            <input v-model="state.backgroundColor" type="color" />
          </label>
          <label>
            <span>边框</span>
            <input v-model="state.borderColor" type="color" />
          </label>
          <label>
            <span>边框粗细</span>
            <input v-model="state.borderWidth" />
          </label>
          <label>
            <span>外边框圆角大小</span>
            <input v-model="state.radius" />
          </label>
          <label>
            <span>宽度</span>
            <input v-model="state.width" />
          </label>
          <label class="login-story__check">
            <input v-model="state.enableImageCaptcha" type="checkbox" />
            <span>图像验证</span>
          </label>
          <label class="login-story__check">
            <input v-model="state.enableLetterCaptcha" type="checkbox" />
            <span>字母识别</span>
          </label>
          <label class="login-story__check">
            <input v-model="state.enableWechatLogin" type="checkbox" />
            <span>微信登录</span>
          </label>
          <label class="login-story__check">
            <input v-model="state.enableSmsLogin" type="checkbox" />
            <span>短信验证</span>
          </label>
          <label class="login-story__check">
            <input v-model="state.remember" type="checkbox" />
            <span>记住我</span>
          </label>
          <label class="login-story__check">
            <input v-model="state.loading" type="checkbox" />
            <span>登录中</span>
          </label>
        </div>

        <div class="login-story__log">{{ state.eventLog }}</div>
        <pre><code>{{ previewCode }}</code></pre>
      </div>
    </Variant>

    

    

    

    
  </Story>
</template>

<style scoped>
.login-story {
  border: 1px solid #d8e2e8;
  border-radius: 14px;
  overflow: hidden;
}

.login-story__preview {
  background:
    linear-gradient(135deg, rgba(30, 107, 115, 0.12), rgba(252, 249, 243, 0.8)),
    #f8fafc;
  display: flex;
  justify-content: center;
  padding: 32px;
}

.login-story__preview :deep(.x-login),
.login-story__narrow :deep(.x-login) {
  max-width: 460px;
}

.login-story__controls {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  padding: 18px;
}

.login-story__controls label,
.login-story__check {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
}

.login-story__controls label:not(.login-story__check) {
  justify-content: space-between;
}

.login-story__controls input:not([type='checkbox']),
.login-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  min-width: 0;
  padding: 0 10px;
}

.login-story__log {
  background: #eef7f8;
  color: #0b4a52;
  font-size: 14px;
  padding: 12px 18px;
}

.login-story pre {
  background: #0f172a;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 16px;
}

.login-story__narrow {
  background: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 28px;
}

.login-story__grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 18px;
}
</style>
