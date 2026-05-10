<template>
  <TiptapBubbleMenu v-if="editor" :editor="editor" class="xl-bubble-menu">
    <slot />
  </TiptapBubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'

defineProps<{
  editor?: Editor
}>()
</script>
