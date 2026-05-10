<template>
  <TiptapFloatingMenu v-if="editor" :editor="editor" class="xl-floating-menu">
    <slot />
  </TiptapFloatingMenu>
</template>

<script setup lang="ts">
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'

defineProps<{
  editor?: Editor
}>()
</script>
