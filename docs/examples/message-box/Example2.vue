<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
import { XButton, XMessageBoxComponent } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <div>
    <XButton type="button" @click="visible = true">打开弹框</XButton>
    <XMessageBoxComponent v-model="visible" title="提示" message="确认继续吗？" show-cancel-button />
  </div>
</template>
