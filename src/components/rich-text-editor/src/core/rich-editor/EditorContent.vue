<template>
  <div class="xl-editor__viewport" @mousedown="$emit('mousedown', $event)">
    <TiptapEditorContent v-if="editor" :editor="editor" class="xl-editor__content" />
  </div>
</template>

<script setup lang="ts">
import { EditorContent as TiptapEditorContent } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/vue-3'

defineProps<{
  editor?: Editor
}>()

defineEmits<{
  mousedown: [event: MouseEvent]
}>()
</script>
