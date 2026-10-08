<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  iconName: 'settings-3-line',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4'
})
import { XIconSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const iconName = ref('home-line')
</script>

<template>
  <XIconSelect
    v-model="state.iconName"
    :font-size="14"
    :panel-height="360"
    :icon-size="24"
    :icon-color="state.iconColor"
    :selected-icon-color="state.selectedIconColor"
    :accent-color="state.accentColor"
  />
</template>
