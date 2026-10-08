<script setup lang="ts">
import { XLogin } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const remember = ref(false)
function handleLogin() {}
</script>

<template>
  <XLogin v-model:remember="remember" @login="handleLogin" />
</template>
