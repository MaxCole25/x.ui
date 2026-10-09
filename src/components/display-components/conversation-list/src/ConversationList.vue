<script setup lang="ts">
import { computed } from 'vue'
import { XAvatar } from '../../avatar'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle } from '../../../_utils/size'
import type { ConversationListEmits, ConversationListProps, ConversationListSlots } from './types'
import type { MessengerConversation } from '../../../_utils/messenger'
defineOptions({ name: 'XConversationList' })
const props = withDefaults(defineProps<ConversationListProps>(), { conversations: () => [], width: '100%', height: '100%', fontSize: 14, disabled: false })
const emit = defineEmits<ConversationListEmits>()
defineSlots<ConversationListSlots>()
const style = computed(() => ({ ...createElementStyleVars(props), ...createFontStyle(props.fontSize), width: toCssSize(props.width), height: toCssSize(props.height) }))
function select(conversation: MessengerConversation) { if (props.disabled) return; emit('update:modelValue', conversation.id); emit('select', conversation) }
</script>
<template>
  <section class="x-conversation-list" :style="style" aria-label="最近会话">
    <button v-for="conversation in conversations" :key="conversation.id" type="button" class="x-conversation-list__item" :class="{ 'is-active': modelValue === conversation.id }" :disabled="disabled" @click="select(conversation)">
      <slot name="conversation" :conversation="conversation"><XAvatar :src="conversation.avatar" :name="conversation.title" :avatar-size="36" /><span class="x-conversation-list__info"><strong>{{ conversation.title }}<small v-if="conversation.kind === 'group'">群</small></strong><span>{{ conversation.lastMessage || '暂无消息' }}</span></span><span class="x-conversation-list__meta"><time>{{ conversation.lastMessageTime }}</time><b v-if="conversation.unreadCount">{{ conversation.unreadCount }}</b></span></slot>
    </button>
    <div v-if="!conversations.length" class="x-conversation-list__empty"><slot name="empty">暂无会话，双击同事开始聊天</slot></div>
  </section>
</template>
<style scoped>
.x-conversation-list { overflow: auto; box-sizing: border-box; background: var(--x-element-bg, var(--x-color-surface, white)); color: var(--x-element-text, var(--x-color-text, #303846)); border: var(--x-element-border-width, 1px) solid var(--x-element-border-color, var(--x-color-border, #dde2ea)); border-radius: var(--x-element-radius, 8px); }
.x-conversation-list__item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 10px; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }.x-conversation-list__item:hover { background: var(--x-color-surface-soft, #f6f8fb); }.x-conversation-list__item.is-active { background: var(--x-color-primary-soft, #eaf3ff); }
.x-conversation-list__info { display: grid; flex: 1; gap: 5px; min-width: 0; }.x-conversation-list__info strong,.x-conversation-list__info>span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.x-conversation-list__info strong { font-weight: var(--x-font-weight-medium, 500); }.x-conversation-list__info small { font-size: 11px; margin-left: 5px; color: var(--x-color-primary, #409eff); }.x-conversation-list__info>span,.x-conversation-list__meta time { color: var(--x-color-text-muted, #7a8493); font-size: 12px; }
.x-conversation-list__meta { display: grid; justify-items: end; gap: 5px; }.x-conversation-list__meta b { border-radius: 12px; padding: 1px 6px; background: var(--x-color-danger, #e95353); color: white; font-size: 12px; }.x-conversation-list__empty { padding: 28px 10px; text-align: center; color: var(--x-color-text-muted, #7a8493); }button:disabled { cursor: default; opacity: .6; }
</style>
