<script setup lang="ts">
import { XRegister } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const username = ref('')
const phone = ref('')
const smsCode = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreementChecked = ref(false)
function handleRegister() {}
</script>

<template>
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
  />
</template>
