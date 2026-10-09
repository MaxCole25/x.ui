<script setup lang="ts">
import { XFloatButtonGroup } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const directModeItems = [
  { key: 'service', label: '联系客服', icon: 'customer-service-2', backgroundColor: '#f97316' },
  { key: 'help', label: '查看帮助', icon: 'question', backgroundColor: '#16a34a' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up', backgroundColor: '#f97316' }
]
</script>

<template>
  <div class="float-button-group-demo">
    <p>按钮组直接显示在容器左下角，悬停按钮可查看说明。</p>
    <XFloatButtonGroup
      :items="directModeItems"
      mode="direct"
      direction="horizontal"
      placement="bottom-left"
      position="absolute"
      :left="32"
      :bottom="32"
    />
  </div>
</template>

<style scoped>
.float-button-group-demo {
  position: relative;
  width: 100%;
  height: 180px;
}
</style>
