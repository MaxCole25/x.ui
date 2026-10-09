<script setup lang="ts">
import { ref } from 'vue'
import { XFloatButtonGroup } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const expanded = ref(false)
const action = ref('')
const menuModeItems = [
  { key: 'help', label: '查看帮助', icon: 'question' },
  { key: 'feedback', label: '提交反馈', icon: 'feedback' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up' }
]
</script>

<template>
  <div class="float-button-group-demo">
    <p>点击右下角按钮展开菜单。</p>
    <p v-if="action" role="status">最近操作：{{ action }}</p>
    <XFloatButtonGroup
      v-model="expanded"
      :items="menuModeItems"
      mode="menu"
      position="absolute"
      :right="32"
      :bottom="32"
      @item-click="(item) => { action = item.label }"
    />
  </div>
</template>

<style scoped>
.float-button-group-demo {
  position: relative;
  width: 100%;
  height: 320px;
}
</style>
