<script setup lang="ts">
import { ref } from 'vue'
import { XConversationList } from '../../../src/components/display-components/conversation-list'
import { createMessengerDemoState } from '../../../src/components/other-components/messenger/demo'
import type { MessengerId } from '../../../src/components/other-components/messenger'
const selected = ref<MessengerId>('direct-lin')
const state = createMessengerDemoState()
</script>
<template><XConversationList v-model="selected" :conversations="state.conversations" :width="360" :height="260" /></template>
