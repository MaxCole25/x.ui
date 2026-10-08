<script setup lang="ts">
import { XRegister } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
function handleRegister() {}
function sendSmsCode() {}
</script>

<template>
  <XRegister
    enable-image-captcha
    enable-letter-captcha
    letter-captcha-text="A7KQ"
    @send-sms-code="sendSmsCode"
    @register="handleRegister"
  />
</template>
