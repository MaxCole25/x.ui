<script setup lang="ts">
import { ref } from 'vue'
const serviceVisible = ref(false)
import { XButton, XMessageBoxComponent } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <div>
    <XButton type="button" @click="serviceVisible = true">模拟服务调用</XButton>
    <XMessageBoxComponent
      v-model="serviceVisible"
      title="删除确认"
      message="删除后不可恢复，是否继续？"
      status="warning"
      show-cancel-button
      confirm-button-text="删除"
      cancel-button-text="取消"
      :close-on-mask-click="false"
    />
  </div>
</template>
