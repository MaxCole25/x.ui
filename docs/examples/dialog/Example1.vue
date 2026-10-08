<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
import { XButton, XDialog } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <div>
    <XButton type="button" @click="visible = true">打开弹窗</XButton>
    <XDialog v-model="visible" title="编辑信息" :width="520" :height="320" :min-width="360" :min-height="240">
      <div>这里放置表单内容。</div>
    </XDialog>
  </div>
</template>
