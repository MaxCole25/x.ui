<script setup lang="ts">
import { ref } from 'vue'
const autoValue = ref('自动高度适合备注、说明、审批意见等长度不固定的内容。')
import { XTextarea } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTextarea v-model="autoValue" auto-height :rows="2" />
</template>
