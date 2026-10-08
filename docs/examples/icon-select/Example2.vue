<script setup lang="ts">
import { ref } from 'vue'
import type { IconSelectIconInfo } from '@x-soft88/x-ui'
const iconName = ref('')
const selectedIcon = ref<IconSelectIconInfo | null>(null)
const handleChange = (value: string, icon: IconSelectIconInfo) => {
  selectedIcon.value = icon
}
import { XIconSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XIconSelect v-model="iconName" @change="handleChange" />
</template>
