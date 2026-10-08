<script setup lang="ts">
import { ref } from 'vue'
const iconName = ref('home-line')
import { XIconSelect } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XIconSelect v-model="iconName" />
</template>
