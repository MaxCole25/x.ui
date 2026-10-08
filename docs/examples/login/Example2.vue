<script setup lang="ts">
import { XLogin } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const feedback = ref('等待操作')
function sendSmsCode() { feedback.value = '演示验证码已发送' }
function startWechatLogin() { feedback.value = '已触发微信登录，示例不连接外部服务' }
function submitLogin() { feedback.value = '已提交演示登录信息' }
</script>

<template>
  <XLogin
    enable-image-captcha
    enable-letter-captcha
    enable-wechat-login
    enable-sms-login
    letter-captcha-text="A7KQ"
    @send-sms-code="sendSmsCode"
    @wechat-login="startWechatLogin"
    @login="submitLogin"
  />
  <p role="status">{{ feedback }}</p>
</template>
