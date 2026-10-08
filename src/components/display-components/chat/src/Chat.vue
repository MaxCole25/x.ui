<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { XAvatar } from '../../avatar'
import { XIcon } from '../../../basic-components/icon'
import { formatChatFileSize, useChatComposer } from './useChatComposer'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle } from '../../../_utils/size'
import type { ChatEmits, ChatExpose, ChatMessage, ChatProps, ChatSlots } from './types'

defineOptions({ name: 'XChat' })
const props = withDefaults(defineProps<ChatProps>(), {
  messages: () => [], title: '', width: '100%', height: 420, fontSize: 14,
  showAvatar: true, showName: true, showTime: true, showStatus: true,
  enableAutoScroll: true, emptyText: '暂无消息，开始聊天吧', bubbleRadius: 8,
  showComposer: true, showImagePicker: true, showFilePicker: true, showEmojiPicker: true,
  enablePaste: true, disabled: false, placeholder: '输入消息，支持粘贴图片或文件', sendText: '发送', fileAccept: '',
  emojis: () => ['😀', '😊', '😂', '🤣', '😍', '🥰', '😘', '😎', '🤔', '😅', '😭', '😮', '😴', '🥳', '👍', '👎', '👏', '🙏', '💪', '❤️', '🎉', '🌹', '☕', '✅']
})
const emit = defineEmits<ChatEmits>()
defineSlots<ChatSlots>()
const { textarea, imageInput, fileInput, draft, attachments, showEmojis, canSend, focus, clearDraft, sendMessage, handleFiles, handlePaste, handleKeydown, insertEmoji, removeAttachment } = useChatComposer(props, emit)
const viewport = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const shouldFollow = ref(true)
let lastScrollTop = 0
let resizeObserver: ResizeObserver | undefined
const isSelf = (message: ChatMessage) => props.currentUserId !== undefined && message.senderId === props.currentUserId
const statusText = { sending: '发送中', sent: '已发送', read: '已读', failed: '发送失败' }
const chatStyle = computed(() => ({
  ...createFontStyle(props.fontSize), ...createElementStyleVars(props),
  width: toCssSize(props.width), height: toCssSize(props.height),
  '--x-chat-self-bg': props.selfBubbleBackgroundColor,
  '--x-chat-self-text': props.selfBubbleTextColor,
  '--x-chat-bubble-bg': props.bubbleBackgroundColor,
  '--x-chat-bubble-radius': `${props.bubbleRadius}px`
}))
async function scrollToBottom(behavior: ScrollBehavior = 'auto') {
  shouldFollow.value = true
  await nextTick()
  viewport.value?.scrollTo({ top: viewport.value.scrollHeight, behavior })
}
function handleScroll() {
  const element = viewport.value!
  const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 48
  // 内容增高和浏览器滚动锚定不应中断跟随；向上阅读时停止跟随。
  shouldFollow.value = isAtBottom || (shouldFollow.value && element.scrollTop >= lastScrollTop)
  lastScrollTop = element.scrollTop
  emit('scroll', { scrollTop: element.scrollTop, isAtBottom })
}
function followBottom() {
  if (props.enableAutoScroll && shouldFollow.value) void scrollToBottom()
}
watch(() => props.messages, followBottom, { deep: true, flush: 'post' })
watch(() => props.enableAutoScroll, enabled => { if (enabled) void scrollToBottom() })
onMounted(() => {
  if (props.enableAutoScroll) void scrollToBottom()
  resizeObserver = new ResizeObserver(followBottom)
  resizeObserver.observe(content.value!)
  resizeObserver.observe(viewport.value!)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
defineExpose<ChatExpose>({ scrollToBottom, focus, clearDraft, sendMessage })
</script>

<template>
  <section class="x-chat" :style="chatStyle" :aria-label="title || '聊天消息'">
    <header v-if="$slots.header || title" class="x-chat__header"><slot name="header">{{ title }}</slot></header>
    <div ref="viewport" class="x-chat__viewport" role="log" aria-label="消息列表" aria-live="polite" aria-relevant="additions text" tabindex="0" @scroll="handleScroll">
      <div ref="content" class="x-chat__messages">
        <div v-if="!messages.length" class="x-chat__empty"><slot name="empty">{{ emptyText }}</slot></div>
        <div v-for="(message, index) in messages" :key="message.id" class="x-chat__item" :class="{ 'is-self': isSelf(message), 'is-system': message.kind === 'system' }">
          <template v-if="message.kind === 'system'">
            <span class="x-chat__system"><slot name="message" :message="message" :index="index" :is-self="false">{{ message.content }}</slot></span>
          </template>
          <template v-else>
            <div v-if="showAvatar" class="x-chat__avatar">
              <slot name="avatar" :message="message" :index="index" :is-self="isSelf(message)">
                <XAvatar :src="message.avatar" :name="message.senderName || (isSelf(message) ? '我' : '访客')" :avatar-size="36" :font-size="14" shape="square" :radius="8" />
              </slot>
            </div>
            <div class="x-chat__body">
              <div v-if="(showName && message.senderName) || (showTime && message.time)" class="x-chat__meta">
                <span v-if="showName && message.senderName">{{ message.senderName }}</span>
                <span v-if="showTime && message.time">{{ message.time }}</span>
              </div>
              <div class="x-chat__bubble" @click="emit('message-click', { message, index, isSelf: isSelf(message), event: $event })">
                <slot name="message" :message="message" :index="index" :is-self="isSelf(message)">
                  <blockquote v-if="message.quote" class="x-chat__quote"><strong>{{ message.quote.senderName }}</strong><span>{{ message.quote.content }}</span></blockquote>
                  <button v-if="message.kind === 'image' && message.imageUrl" class="x-chat__image-button" type="button" :aria-label="message.content || '查看图片'" @click="emit('image-click', { message, index, isSelf: isSelf(message), event: $event })">
                    <img class="x-chat__image" :src="message.imageUrl" :alt="message.content || '聊天图片'" @load="followBottom" />
                  </button>
                  <button v-else-if="message.kind === 'file'" type="button" class="x-chat__file" @click="emit('file-click', { message, index, isSelf: isSelf(message), event: $event })">
                    <XIcon name="file-2" :icon-size="28" />
                    <span><strong>{{ message.fileName || message.content }}</strong><small>{{ message.fileSize === undefined ? '文件' : formatChatFileSize(message.fileSize) }} · 点击查看</small></span>
                  </button>
                  <span v-else class="x-chat__text">{{ message.content }}</span>
                </slot>
              </div>
              <div v-if="showStatus && isSelf(message) && message.status" class="x-chat__status" :class="{ 'is-failed': message.status === 'failed' }">
                <span>{{ statusText[message.status] }}</span>
                <button v-if="message.status === 'failed'" type="button" @click="emit('retry', message)">重试</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <footer v-if="$slots.footer || showComposer" class="x-chat__footer">
      <slot name="footer">
        <form class="x-chat__composer" @submit.prevent="sendMessage">
          <div class="x-chat__tools" role="toolbar" aria-label="消息工具">
            <button v-if="showEmojiPicker" type="button" class="x-chat__tool" title="表情" aria-label="选择表情" :aria-expanded="showEmojis" :disabled="disabled" @click="showEmojis = !showEmojis"><XIcon name="emotion-happy" :icon-size="20" /></button>
            <button v-if="showImagePicker" type="button" class="x-chat__tool" title="图片" aria-label="选择本地图片" :disabled="disabled" @click="imageInput?.click()"><XIcon name="image-2" :icon-size="20" /></button>
            <button v-if="showFilePicker" type="button" class="x-chat__tool" title="文件" aria-label="选择本地文件" :disabled="disabled" @click="fileInput?.click()"><XIcon name="attachment-2" :icon-size="20" /></button>
            <input ref="imageInput" hidden type="file" accept="image/*" multiple :disabled="disabled" aria-label="本地图片" @change="handleFiles" />
            <input ref="fileInput" hidden type="file" :accept="fileAccept" multiple :disabled="disabled" aria-label="本地文件" @change="handleFiles" />
          </div>
          <div v-if="showEmojis && showEmojiPicker" class="x-chat__emojis" role="group" aria-label="常用表情" @keydown.esc="showEmojis = false">
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
          <div class="x-chat__send-row"><span class="x-chat__input-tip">Enter 发送，Shift+Enter 换行</span><button type="submit" class="x-chat__send" :disabled="!canSend">{{ sendText }}</button></div>
        </form>
      </slot>
    </footer>
  </section>
</template>
