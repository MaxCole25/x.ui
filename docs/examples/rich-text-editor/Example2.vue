<script setup lang="ts">
import { XRichTextEditor } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const content = ref('')
</script>

<template>
  <XRichTextEditor
    v-model="content"
    :min-height="420"
    :can-save="true"
    :show-outline="true"
    @save-doc="() => console.log('save')"
    @html-change="(html) => console.log(html)"
  />
</template>
