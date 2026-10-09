<script setup lang="ts">
import { ref, watch } from 'vue'
import { XIcon } from '../../../basic-components/icon'
import { XPopover } from '../../../feedback-components/popover'
import { overlayZIndex } from '../../../_utils/zIndex'
import { useChatComposer, formatChatFileSize } from '../../../display-components/chat/src/useChatComposer'
import type { ChatProps, ChatEmits } from '../../../display-components/chat'
const props = withDefaults(defineProps<ChatProps & { showBusinessPicker?: boolean; showGroupManagement?: boolean; historyVisible?: boolean; sendShortcut?: 'enter' | 'ctrl-enter'; zIndex?: number }>(), {
  disabled: false, enablePaste: true, placeholder: '输入消息，支持粘贴图片或文件', showBusinessPicker: true,
  sendShortcut: 'enter', zIndex: overlayZIndex.popper,
  emojis: () => ['😀', '😊', '😂', '👍', '❤️', '🎉', '🙏', '🤔']
})
const emit = defineEmits<ChatEmits & {
  'history-request': []; 'group-manage': []; 'business-select': []; 'update:sendShortcut': [value: 'enter' | 'ctrl-enter']
}>()
const { textarea, imageInput, fileInput, draft, attachments, showEmojis, canSend, focus, clearDraft, sendMessage, handleFiles, handlePaste, insertEmoji, removeAttachment } = useChatComposer(props, emit)
const showSendOptions = ref(false)
function selectShortcut(value: 'enter' | 'ctrl-enter') {
  emit('update:sendShortcut', value)
  showSendOptions.value = false
  focus()
}
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') { showEmojis.value = false; showSendOptions.value = false }
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return
  if (props.sendShortcut === 'ctrl-enter' ? event.ctrlKey : !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault()
    sendMessage()
  }
}
watch(() => props.disabled, value => { if (value) { showEmojis.value = false; showSendOptions.value = false } })
defineExpose({ focus, clearDraft, sendMessage })
</script>
<template>
  <form class="x-chat__composer x-messenger-composer" @submit.prevent="sendMessage">
    <div class="x-chat__tools" role="toolbar" aria-label="消息工具">
      <button type="button" class="x-chat__tool" title="表情" aria-label="选择表情" :aria-expanded="showEmojis" :disabled="disabled" @click="showEmojis = !showEmojis"><XIcon name="emotion-happy" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool" title="图片" aria-label="选择本地图片" :disabled="disabled" @click="imageInput?.click()"><XIcon name="image-2" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool" title="文件" aria-label="选择本地文件" :disabled="disabled" @click="fileInput?.click()"><XIcon name="attachment-2" :icon-size="20" /></button>
      <button v-if="showBusinessPicker" type="button" class="x-chat__tool x-messenger-composer__business" title="业务单据" aria-label="选择业务单据" :disabled="disabled" @click="emit('business-select')"><XIcon name="briefcase-2" :icon-size="20" /></button>
      <button v-if="showGroupManagement" type="button" class="x-chat__tool x-messenger-composer__group" title="群管理" aria-label="群管理" :disabled="disabled" @click="emit('group-manage')"><XIcon name="group" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool x-messenger-composer__history" :class="{ 'is-active': historyVisible }" title="历史记录" aria-label="历史记录" :aria-expanded="historyVisible" @click="emit('history-request')"><XIcon name="history" :icon-size="20" /></button>
      <input ref="imageInput" hidden type="file" accept="image/*" multiple :disabled="disabled" aria-label="本地图片" @change="handleFiles" />
      <input ref="fileInput" hidden type="file" :accept="fileAccept" multiple :disabled="disabled" aria-label="本地文件" @change="handleFiles" />
    </div>
    <div v-if="showEmojis" class="x-chat__emojis" role="group" aria-label="常用表情" @keydown.esc="showEmojis = false">
      <button v-for="(emoji, index) in emojis" :key="index" type="button" :aria-label="'插入表情 ' + emoji" :disabled="disabled" @mousedown.prevent @click="insertEmoji(emoji)">{{ emoji }}</button>
    </div>
    <div v-if="attachments.length" class="x-chat__attachments" aria-label="待发送附件">
      <div v-for="attachment in attachments" :key="attachment.id" class="x-chat__attachment">
        <img v-if="attachment.kind === 'image'" :src="attachment.url" :alt="attachment.name" />
        <XIcon v-else name="file-2" :icon-size="26" />
        <span class="x-chat__attachment-info"><strong :title="attachment.name">{{ attachment.name }}</strong><small>{{ formatChatFileSize(attachment.size) }}</small></span>
        <button type="button" class="x-chat__tool" :aria-label="'移除 ' + attachment.name" :disabled="disabled" @click="removeAttachment(attachment)"><XIcon name="close" :icon-size="16" /></button>
      </div>
    </div>
    <textarea ref="textarea" v-model="draft" class="x-chat__input" aria-label="消息内容" :placeholder="placeholder" :disabled="disabled" rows="2" @paste="handlePaste" @keydown="handleKeydown" />
    <div class="x-messenger-composer__send-row">
      <div class="x-messenger-composer__send">
        <button type="submit" class="x-messenger-composer__submit" :disabled="!canSend" :title="sendShortcut === 'enter' ? '按 Enter 键发送消息' : '按 Ctrl + Enter 键发送消息'">发送</button>
        <XPopover v-model="showSendOptions" placement="top" :show-arrow="false" :width="244" :z-index="zIndex" :disabled="disabled">
          <button type="button" class="x-messenger-composer__options" aria-label="发送快捷键设置" :aria-expanded="showSendOptions" :disabled="disabled" @keydown.esc.stop.prevent="showSendOptions = false"><XIcon :name="showSendOptions ? 'arrow-up-s' : 'arrow-down-s'" :icon-size="16" /></button>
          <template #content>
            <div class="x-messenger-composer__menu" role="menu" aria-label="发送快捷键" @keydown.esc.stop.prevent="showSendOptions = false; focus()" @click.stop>
              <button v-for="option in [{ value: 'enter' as const, text: '按 Enter 键发送消息' }, { value: 'ctrl-enter' as const, text: '按 Ctrl + Enter 键发送消息' }]" :key="option.value" type="button" role="menuitemradio" :aria-checked="sendShortcut === option.value" @click="selectShortcut(option.value)"><XIcon name="check" :icon-size="16" :style="{ visibility: sendShortcut === option.value ? 'visible' : 'hidden' }" /><span>{{ option.text }}</span></button>
            </div>
          </template>
        </XPopover>
      </div>
    </div>
  </form>
</template>
<style scoped>
.x-messenger-composer { gap: 6px; }
.x-messenger-composer .x-chat__tool { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border: 0; padding: 0; background: transparent; }
.x-messenger-composer .x-chat__tool:hover:not(:disabled),.x-messenger-composer .x-chat__tool.is-active { background: var(--x-color-primary-soft, #eaf3ff); }
.x-messenger-composer__business { color: var(--x-color-success, #1aa58b); }
.x-messenger-composer__group { margin-left: auto; color: #8061d5; }
.x-messenger-composer .x-messenger-composer__group + .x-messenger-composer__history { margin-left: 0; }
.x-messenger-composer .x-messenger-composer__history { margin-left: auto; color: var(--x-color-primary, #4385ef); }
.x-messenger-composer__send-row { display: flex; justify-content: flex-end; }
.x-messenger-composer__send { display: inline-flex; overflow: visible; border-radius: 8px; background: var(--x-color-primary, #4385ef); }
.x-messenger-composer button.x-messenger-composer__submit,.x-messenger-composer button.x-messenger-composer__options { display: inline-flex; align-items: center; justify-content: center; height: 32px; border: 0; padding: 0; color: white; background: transparent; border-radius: 0; }
.x-messenger-composer button.x-messenger-composer__submit { min-width: 60px; border-radius: 8px 0 0 8px; }
.x-messenger-composer button.x-messenger-composer__options { width: 30px; border-radius: 0 8px 8px 0; position: relative; }
.x-messenger-composer__options::before { content: ''; position: absolute; left: 0; height: 16px; border-left: 1px solid rgb(255 255 255 / .4); }
.x-messenger-composer button.x-messenger-composer__submit:hover:not(:disabled),.x-messenger-composer button.x-messenger-composer__options:hover:not(:disabled) { background: rgb(255 255 255 / .16); }
.x-messenger-composer__menu { display: grid; gap: 2px; color: var(--x-color-text, #303846); }
.x-messenger-composer__menu button { display: flex; align-items: center; gap: 8px; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; padding: 5px 4px; border-radius: 4px; cursor: pointer; white-space: nowrap; }
.x-messenger-composer__menu button:hover,.x-messenger-composer__menu button:focus-visible { background: var(--x-color-primary-soft, #eaf3ff); outline: none; }
:global(.x-popover__popper.is-teleported:has(.x-messenger-composer__menu)) { bottom: auto; right: auto; padding: 8px; transform: translateX(calc(-50% + 15px)); }
</style>
