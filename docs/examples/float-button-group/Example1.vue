<script setup lang="ts">
import { ref } from 'vue'
const expanded = ref(false)
const action = ref('')
const menuModeItems = [
  { key: 'help', label: '查看帮助', icon: 'question' },
  { key: 'feedback', label: '提交反馈', icon: 'feedback' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up' }
]
import { XFloatButtonGroup } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XFloatButtonGroup
    v-model="expanded"
    :items="menuModeItems"
    mode="menu"
    position="absolute"
    :right="32"
    :bottom="32"
    @item-click="(item) => { action = item.label }"
  />
</template>
