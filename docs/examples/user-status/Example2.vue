<script setup lang="ts">
import { ref } from 'vue'
const guestAction = ref('')
import { XText, XUserStatus } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XUserStatus :logged-in="false" @login-click="guestAction = '登录'" @register-click="guestAction = '注册'" />
  <XText tag="p" variant="muted">当前操作：{{ guestAction || '暂无' }}</XText>
</template>
