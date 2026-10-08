<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XRegister } from './index'
import type { RegisterLabelPosition, RegisterLogoPosition, RegisterFontSize, RegisterSubmitPayload } from './src/types'
import '../../../styles/index.css'
const state = reactive({
  username: 'new-user',
  phone: '13800000000',
  smsCode: '123456',
  password: '123456',
  confirmPassword: '123456',
  agreementChecked: true,
  imageCode: '',
  letterCode: '',
  title: '创建 NexMod 账号',
  description: '填写注册信息，开启你的工作台体验。',
  logoPosition: 'top' as RegisterLogoPosition,
  labelPosition: 'top' as RegisterLabelPosition,
  fontSize: 14 as RegisterFontSize,
  accentColor: '#0b4a52',
  accentSoftColor: '#e1f5f7',
  backgroundColor: '#ffffff',
  borderColor: '#cfe0e6',
  borderWidth: '1px',
  radius: '18px',
  width: '100%',
  loading: false,
  disabled: false,
  enableImageCaptcha: false,
  enableLetterCaptcha: true,
  showAgreement: true,
  showLogin: true,
  parentWidth: 520,
  parentHeight: 760,
  parentFullWidth: false,
  parentFullHeight: false,
  eventLog: '等待操作'
})
function writeLog(message: string) {
  state.eventLog = `${new Date().toLocaleTimeString()} ${message}`
}
function handleRegister(payload: RegisterSubmitPayload) {
  writeLog(`注册：${payload.username || '未填写用户名'}，手机号：${payload.phone || '未填写'}，协议：${payload.agreementChecked ? '已同意' : '未同意'}`)
}
</script>

<template>
  <Story title="其它组件/Register 注册" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XRegister">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XRegister
              v-model:username="state.username"
              v-model:phone="state.phone"
              v-model:sms-code="state.smsCode"
              v-model:password="state.password"
              v-model:confirm-password="state.confirmPassword"
              v-model:agreement-checked="state.agreementChecked"
              v-model:image-code="state.imageCode"
              v-model:letter-code="state.letterCode"
              :title="state.title"
              :description="state.description"
              :logo-position="state.logoPosition"
              :label-position="state.labelPosition"

              :enable-image-captcha="state.enableImageCaptcha"
              :enable-letter-captcha="state.enableLetterCaptcha"

              image-captcha-src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=680&q=80"
              letter-captcha-text="A7KQ"
              @register="handleRegister"
              @login="writeLog('点击登录入口')"
              @send-sms-code="writeLog(`发送短信验证码：${state.phone || '未填写手机号'}`)"
              @refresh-image-captcha="writeLog('刷新图像验证码')"
              @image-captcha-success="writeLog('滑块图像验证通过')"
              @refresh-letter-captcha="writeLog('刷新字母识别验证码')"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.register-story {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.register-story__preview {
  background:
    linear-gradient(135deg, rgba(30, 107, 115, 0.12), rgba(252, 249, 243, 0.8)),
    #f8fafc;
  display: flex;
  justify-content: center;
  padding: 32px;
}

.register-story__stage {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  max-width: 100%;
  overflow: auto;
  padding: 10px;
}

.register-story__stage :deep(.x-register) {
  max-width: 460px;
}

.register-story__controls {
  display: grid;
  gap: 18px;
  padding: 18px;
}

.register-story__controls section {
  display: grid;
  gap: 12px;
}

.register-story__controls h3 {
  color: #102a43;
  font-size: 15px;
  margin: 0;
}

.register-story__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, 180px);
}

.register-story__grid label,
.register-story__check {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 13px;
  gap: 8px;
  min-width: 0;
}

.register-story__grid label:not(.register-story__check) {
  justify-content: space-between;
}

.register-story__grid label span {
  flex: 0 0 auto;
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.register-story__grid input:not([type='checkbox']),
.register-story__grid select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  height: 32px;
  min-width: 0;
  padding: 0 8px;
  width: 92px;
}

.register-story__grid code {
  background: #eef7f8;
  border-radius: 6px;
  color: #0b4a52;
  font-size: 12px;
  padding: 8px;
}

.register-story__log {
  background: #eef7f8;
  color: #0b4a52;
  font-size: 14px;
  padding: 12px 18px;
}

.register-story pre {
  background: #0f172a;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 16px;
}
</style>
