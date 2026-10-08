<script setup lang="ts">
import { XLoginPage } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
function handleLogin() {}
</script>

<template>
  <XLoginPage
    preset="finance"
    :login-props="{
 username,
 password,
 title: '个人中心登录',
 description: '统一账号，安全访问业务中心'
 }"
    @login="handleLogin"
  />
</template>
