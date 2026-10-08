<script setup lang="ts">
import { ref } from 'vue'
const command = ref('')
const userItems = [
  { text: '消息管理', command: 'message', icon: 'notification-3' },
  { text: '个人中心', command: 'profile', icon: 'user' },
  { text: '基础设置', command: 'setting', icon: 'settings-3' },
  { text: '安全退出', command: 'logout', icon: 'logout-box-r' }
]
import { XText, XUserStatus } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XUserStatus
    name="测试管理员"
    description="2026-07-02 08:08:47"
    :items="userItems"
    @command="(value) => { command = String(value) }"
  />
  <XText tag="p" variant="muted">当前命令：{{ command || '暂无' }}</XText>
</template>
