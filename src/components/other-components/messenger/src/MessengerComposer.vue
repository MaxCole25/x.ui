<script setup lang="ts">import { translate as t } from '../../../../locale'

import { useLocaleProps, localePropDefault } from '../../../../locale/props'

import { ref, watch } from 'vue'
import { XIcon } from '../../../basic-components/icon'
import { XPopover } from '../../../feedback-components/popover'
import { overlayZIndex } from '../../../_utils/zIndex'
import { useChatComposer, formatChatFileSize } from '../../../display-components/chat/src/useChatComposer'
import type { ChatProps, ChatEmits, ChatMessageQuote } from '../../../display-components/chat'
const rawProps = withDefaults(defineProps<ChatProps & { quote?: ChatMessageQuote; showBusinessPicker?: boolean; showGroupManagement?: boolean; historyVisible?: boolean; sendShortcut?: 'enter' | 'ctrl-enter'; zIndex?: number }>(), {
  disabled: false, enablePaste: true, placeholder: localePropDefault('messenger.placeholder'), showBusinessPicker: true,
  sendShortcut: 'enter', zIndex: overlayZIndex.popper,
  emojis: () => ['😀', '😊', '😂', '👍', '❤️', '🎉', '🙏', '🤔']
})
const props = useLocaleProps(rawProps, {
  placeholder: 'messenger.placeholder'
})
const emit = defineEmits<ChatEmits & {
  'cancel-reply': []; 'history-request': []; 'group-manage': []; 'business-select': []; 'update:sendShortcut': [value: 'enter' | 'ctrl-enter']
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
    <div class="x-chat__tools" role="toolbar" :aria-label="t('extension.708c3d2627a8')">
      <button type="button" class="x-chat__tool" :title="t('extension.fecd664062e1')" :aria-label="t('extension.0dce177405dc')" :aria-expanded="showEmojis" :disabled="disabled" @click="showEmojis = !showEmojis"><XIcon name="emotion-happy" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool" :title="t('extension.be8da62ea113')" :aria-label="t('extension.f40986d1eae2')" :disabled="disabled" @click="imageInput?.click()"><XIcon name="image-2" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool" :title="t('extension.49deaf7da20d')" :aria-label="t('extension.95462abb0daf')" :disabled="disabled" @click="fileInput?.click()"><XIcon name="attachment-2" :icon-size="20" /></button>
      <button v-if="showBusinessPicker" type="button" class="x-chat__tool x-messenger-composer__business" :title="t('extension.be145dccd413')" :aria-label="t('extension.1cfa13b99289')" :disabled="disabled" @click="emit('business-select')"><XIcon name="briefcase-2" :icon-size="20" /></button>
      <button v-if="showGroupManagement" type="button" class="x-chat__tool x-messenger-composer__group" :title="t('extension.652b2fbb7b45')" :aria-label="t('extension.652b2fbb7b45')" :disabled="disabled" @click="emit('group-manage')"><XIcon name="group" :icon-size="20" /></button>
      <button type="button" class="x-chat__tool x-messenger-composer__history" :class="{ 'is-active': historyVisible }" :title="t('extension.19e0e3f3df89')" :aria-label="t('extension.19e0e3f3df89')" :aria-expanded="historyVisible" @click="emit('history-request')"><XIcon name="history" :icon-size="20" /></button>
      <input ref="imageInput" hidden type="file" accept="image/*" multiple :disabled="disabled" :aria-label="t('extension.4d15cea2fde2')" @change="handleFiles" />
      <input ref="fileInput" hidden type="file" :accept="fileAccept" multiple :disabled="disabled" :aria-label="t('extension.c8a69b6fd5f7')" @change="handleFiles" />
    </div>
    <div v-if="showEmojis" class="x-chat__emojis" role="group" :aria-label="t('extension.e298d65346cf')" @keydown.esc="showEmojis = false">
      <button v-for="(emoji, index) in emojis" :key="index" type="button" :aria-label="t('extension.a3df965b681e') + emoji" :disabled="disabled" @mousedown.prevent @click="insertEmoji(emoji)">{{ emoji }}</button>
    </div>
    <div v-if="attachments.length" class="x-chat__attachments" :aria-label="t('extension.fd8f8ccc9b7f')">
      <div v-for="attachment in attachments" :key="attachment.id" class="x-chat__attachment">
        <img v-if="attachment.kind === 'image'" :src="attachment.url" :alt="attachment.name" />
        <XIcon v-else name="file-2" :icon-size="26" />
        <span class="x-chat__attachment-info"><strong :title="attachment.name">{{ attachment.name }}</strong><small>{{ formatChatFileSize(attachment.size) }}</small></span>
        <button type="button" class="x-chat__tool" :aria-label="t('extension.0c209cd06895') + attachment.name" :disabled="disabled" @click="removeAttachment(attachment)"><XIcon name="close" :icon-size="16" /></button>
      </div>
    </div>
    <div v-if="quote" class="x-messenger-composer__reply">
      <blockquote class="x-chat__quote"><strong>{{ t("extension.ffc7850925e7") }}{{ quote.senderName }}</strong><span>{{ quote.content }}</span></blockquote>
      <button type="button" class="x-chat__tool" :aria-label="t('extension.6ff997b2c2f9')" :disabled="disabled" @click="emit('cancel-reply'); focus()"><XIcon name="close" :icon-size="16" /></button>
    </div>
    <textarea ref="textarea" v-model="draft" class="x-chat__input" :aria-label="t('extension.acbc5a5d362a')" :placeholder="props.placeholder" :disabled="disabled" rows="2" @paste="handlePaste" @keydown="handleKeydown" />
    <div class="x-messenger-composer__send-row">
      <div class="x-messenger-composer__send">
        <button type="submit" class="x-messenger-composer__submit" :disabled="!canSend" :title="sendShortcut === 'enter' ? t('extension.6d3de8958915') : t('extension.565a7700e4fc')">{{ t("extension.1214d633a448") }}</button>
        <XPopover v-model="showSendOptions" placement="top" :show-arrow="false" :width="244" :z-index="zIndex" :disabled="disabled">
          <button type="button" class="x-messenger-composer__options" :aria-label="t('extension.b177bb2dc763')" :aria-expanded="showSendOptions" :disabled="disabled" @keydown.esc.stop.prevent="showSendOptions = false"><XIcon :name="showSendOptions ? 'arrow-up-s' : 'arrow-down-s'" :icon-size="16" /></button>
          <template #content>
            <div class="x-messenger-composer__menu" role="menu" :aria-label="t('extension.b86bff83c747')" @keydown.esc.stop.prevent="showSendOptions = false; focus()" @click.stop>
              <button v-for="option in [{ value: 'enter' as const, text: '按 Enter 键发送消息' }, { value: 'ctrl-enter' as const, text: '按 Ctrl + Enter 键发送消息' }]" :key="option.value" type="button" role="menuitemradio" :aria-checked="sendShortcut === option.value" @click="selectShortcut(option.value)"><XIcon name="check" :icon-size="16" :style="{ visibility: sendShortcut === option.value ? 'visible' : 'hidden' }" /><span>{{ option.text }}</span></button>
            </div>
          </template>
        </XPopover>
      </div>
    </div>
  </form>
</template>
<style scoped>
.x-messenger-composer__reply { display: flex; align-items: flex-start; gap: 8px; min-width: 0; }
.x-messenger-composer__reply blockquote { display: block; flex: 1; min-width: 0; margin: 0; }
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
