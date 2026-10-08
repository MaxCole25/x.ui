<script setup lang="ts">
import { XLogin } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const remember = ref(false)
function handleLogin() {}
function handleRegister() {}
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
