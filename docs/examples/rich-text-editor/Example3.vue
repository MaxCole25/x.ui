<script setup lang="ts">
import { XGrid, XRichTextEditor } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const content = ref('')
</script>

<template>
  <XGrid :columns="1" height="520px" min-height="0">
    <XRichTextEditor v-model="content" full-height :show-outline="false" />
  </XGrid>
</template>
