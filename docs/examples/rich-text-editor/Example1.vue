<script setup lang="ts">
import { XRichTextEditor } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const content = ref('')
</script>

<template>
  <XRichTextEditor v-model="content" />
</template>
