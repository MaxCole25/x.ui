<script setup lang="ts">
import { useLocaleProps, localePropDefault } from '../../../../locale/props'

import { messageAvatarColor } from "../../../_utils/avatarColor"
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { XAvatar } from '../../avatar'
import { XIcon } from '../../../basic-components/icon'
import { formatChatFileSize, useChatComposer } from './useChatComposer'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle } from '../../../_utils/size'
import type { ChatEmits, ChatExpose, ChatMessage, ChatMessageId, ChatProps, ChatSlots } from './types'

defineOptions({ name: 'XChat' })
const rawProps = withDefaults(defineProps<ChatProps>(), {
  messages: () => [], title: '', width: '100%', height: 420, fontSize: 14,
  showAvatar: true, showName: true, showTime: true, showStatus: true, timePlacement: 'meta',
  enableAutoScroll: true, emptyText: localePropDefault('chat.emptyText'), bubbleRadius: 8,
  showComposer: true, showImagePicker: true, showFilePicker: true, showEmojiPicker: true,
  enablePaste: true, disabled: false, placeholder: localePropDefault('chat.placeholder'), sendText: localePropDefault('chat.sendText'), fileAccept: '',
  emojis: () => ['😀', '😊', '😂', '🤣', '😍', '🥰', '😘', '😎', '🤔', '😅', '😭', '😮', '😴', '🥳', '👍', '👎', '👏', '🙏', '💪', '❤️', '🎉', '🌹', '☕', '✅']
})
const props = useLocaleProps(rawProps, {
  emptyText: 'chat.emptyText',
  placeholder: 'chat.placeholder',
  sendText: 'chat.sendText'
})
const emit = defineEmits<ChatEmits>()
defineSlots<ChatSlots>()
const { textarea, imageInput, fileInput, draft, attachments, showEmojis, canSend, focus, clearDraft, sendMessage, handleFiles, handlePaste, handleKeydown, insertEmoji, removeAttachment } = useChatComposer(props, emit)
const viewport = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const shouldFollow = ref(true)
let lastScrollTop = 0
let resizeObserver: ResizeObserver | undefined
const messageGroups = computed(() => {
  const groups: { message: ChatMessage; index: number; parts: { message: ChatMessage; index: number }[] }[] = []
  props.messages.forEach((message, index) => {
    const previous = groups[groups.length - 1]
    const part = { message, index }
    if (message.groupId && message.kind !== 'system' && previous?.message.kind !== 'system'
      && previous?.message.groupId === message.groupId && previous.message.senderId === message.senderId) {
      previous.parts.push(part)
      previous.message = message
    } else {
      groups.push({ message, index, parts: [part] })
    }
  })
  return groups.map(group => ({ ...group, quote: group.parts.find(part => part.message.quote)?.message.quote, parts: [
    ...group.parts.filter(part => part.message.kind && part.message.kind !== 'text'),
    ...group.parts.filter(part => !part.message.kind || part.message.kind === 'text')
  ] }))
})
const highlightedId = ref<ChatMessageId>()
let highlightTimer: ReturnType<typeof setTimeout> | undefined
async function scrollToMessage(id: ChatMessageId) {
  await nextTick()
  const index = messageGroups.value.findIndex(group => group.parts.some(part => part.message.id === id))
  const item = content.value?.querySelectorAll<HTMLElement>('.x-chat__item')[index]
  if (!item || !viewport.value) return false
  shouldFollow.value = false
  highlightedId.value = id
  viewport.value.scrollTo({ top: viewport.value.scrollTop + item.getBoundingClientRect().top - viewport.value.getBoundingClientRect().top - viewport.value.clientHeight / 3 })
  clearTimeout(highlightTimer)
  highlightTimer = setTimeout(() => { highlightedId.value = undefined }, 2400)
  return true
}
async function locateQuote(messageId: ChatMessageId) {
  if (!await scrollToMessage(messageId)) emit('locate-message', messageId)
}
watch(() => props.messages[0]?.id, async (firstId, previousId) => {
  if (previousId === undefined || firstId === previousId || !props.messages.some(message => message.id === previousId)) return
  const element = viewport.value
  if (!element) return
  const previousHeight = element.scrollHeight
  const previousTop = element.scrollTop
  shouldFollow.value = false
  await nextTick()
  element.scrollTop = previousTop + element.scrollHeight - previousHeight
  lastScrollTop = element.scrollTop
}, { flush: 'pre' })
const isSelf = (message: ChatMessage) => props.currentUserId !== undefined && message.senderId === props.currentUserId
const now = ref(new Date())
let clockTimer: ReturnType<typeof setInterval> | undefined
const messageDate = (message: ChatMessage) => {
  const date = message.sentAt ? new Date(message.sentAt) : undefined
  return date && !Number.isNaN(date.getTime()) ? date : undefined
}
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
function separatorText(message: ChatMessage) {
  const date = messageDate(message)
  if (!date) return message.time ?? ''
  const pad = (value: number) => String(value).padStart(2, '0')
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  if (sameDay(date, now.value)) return time
  const yesterday = new Date(now.value); yesterday.setDate(yesterday.getDate() - 1)
  if (sameDay(date, yesterday)) return `昨天 ${time}`
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${time}`
}
function showSeparator(message: ChatMessage, index: number) {
  if (!props.showTime || props.timePlacement !== 'separator' || !separatorText(message)) return false
  if (index === 0) return true
  const previous = props.messages[index - 1]
  const date = messageDate(message), previousDate = messageDate(previous)
  if (date && previousDate) return !sameDay(date, previousDate) || Math.abs(date.getTime() - previousDate.getTime()) >= 5 * 60 * 1000
  return separatorText(message) !== separatorText(previous)
}
const isEmojiMessage = (message: ChatMessage) => (!message.kind || message.kind === 'text')
  && message.content.trim().length > 0
  && /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji_Modifier}|\uFE0F|\u200D|\s|[0-9#*]\uFE0F?\u20E3)+$/u.test(message.content)
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
  clockTimer = setInterval(() => { now.value = new Date() }, 60000)
  if (props.enableAutoScroll) void scrollToBottom()
  resizeObserver = new ResizeObserver(followBottom)
  resizeObserver.observe(content.value!)
  resizeObserver.observe(viewport.value!)
})
onBeforeUnmount(() => { clearInterval(clockTimer); resizeObserver?.disconnect(); clearTimeout(highlightTimer) })
defineExpose<ChatExpose>({ scrollToMessage, scrollToBottom, focus, clearDraft, sendMessage })
</script>

<template>
  <section class="x-chat" :style="chatStyle" :aria-label="title || '聊天消息'">
    <header v-if="$slots.header || title" class="x-chat__header"><slot name="header">{{ title }}</slot></header>
    <div ref="viewport" class="x-chat__viewport" role="log" aria-label="消息列表" aria-live="polite" aria-relevant="additions text" tabindex="0" @scroll="handleScroll">
      <div ref="content" class="x-chat__messages">
        <div v-if="!messages.length" class="x-chat__empty"><slot name="empty">{{ props.emptyText }}</slot></div>
        <template v-for="{ message, index, parts, quote } in messageGroups" :key="message.id">
          <div v-if="showSeparator(message, index)" class="x-chat__time-separator"><time :datetime="message.sentAt">{{ separatorText(message) }}</time></div>
        <div class="x-chat__item" :class="{ 'is-self': isSelf(message), 'is-system': message.kind === 'system', 'is-highlighted': parts.some(part => part.message.id === highlightedId) }">
          <template v-if="message.kind === 'system'">
            <span class="x-chat__system"><slot name="message" :message="message" :index="index" :is-self="false">{{ message.content }}</slot></span>
          </template>
          <template v-else>
            <div v-if="showAvatar" class="x-chat__avatar">
              <slot name="avatar" :message="message" :index="index" :is-self="isSelf(message)">
                <XAvatar :background-color="messageAvatarColor(message.senderId, message.senderName)" text-color="#ffffff" :src="message.avatar" :name="message.senderName || (isSelf(message) ? '我' : '访客')" :avatar-size="36" :font-size="14" shape="square" :radius="8" />
              </slot>
            </div>
            <div class="x-chat__body">
              <div v-if="(showName && message.senderName) || (showTime && timePlacement === 'meta' && message.time)" class="x-chat__meta">
                <span v-if="showName && message.senderName">{{ message.senderName }}</span>
                <span v-if="showTime && timePlacement === 'meta' && message.time">{{ message.time }}</span>
              </div>
              <div class="x-chat__bubble" @click="emit('message-click', { message, index, isSelf: isSelf(message), event: $event })">
                <blockquote v-if="quote" class="x-chat__quote">
                  <div class="x-chat__quote-content"><strong>{{ quote.senderName }}</strong><span>{{ quote.content }}</span></div>
                  <button v-if="quote.messageId !== undefined" type="button" class="x-chat__quote-jump" aria-label="跳转到原消息" title="跳转到原消息" @click.stop="locateQuote(quote.messageId)"><XIcon name="arrow-up" :icon-size="16" /></button>
                </blockquote>
                <div v-for="{ message: part, index: partIndex } in parts" :key="part.id" class="x-chat__part" @contextmenu="emit('message-contextmenu', { message: part, index: partIndex, isSelf: isSelf(part), event: $event })">
                <slot name="message" :message="part" :index="partIndex" :is-self="isSelf(part)">
                  <button v-if="part.kind === 'image' && part.imageUrl" class="x-chat__image-button" type="button" :aria-label="part.content || '查看图片'" @click="emit('image-click', { message: part, index: partIndex, isSelf: isSelf(part), event: $event })">
                    <img class="x-chat__image" :src="part.imageUrl" :alt="part.content || '聊天图片'" @load="followBottom" />
                  </button>
                  <button v-else-if="part.kind === 'file'" type="button" class="x-chat__file" @click="emit('file-click', { message: part, index: partIndex, isSelf: isSelf(part), event: $event })">
                    <XIcon name="file-2" :icon-size="28" />
                    <span><strong>{{ part.fileName || part.content }}</strong><small>{{ part.fileSize === undefined ? '文件' : formatChatFileSize(part.fileSize) }} · 点击查看</small></span>
                  </button>
                  <button v-else-if="part.kind === 'business' && part.business" type="button" class="x-chat__business" @click="emit('business-click', { message: part, index: partIndex, isSelf: isSelf(part), event: $event })">
                    <small>{{ part.business.businessType }} · {{ part.business.businessNumber }}</small>
                    <strong>{{ part.business.title }}</strong>
                    <span v-if="part.business.summary">{{ part.business.summary }}</span>
                    <small>{{ part.business.actionLabel || '查看单据' }} →</small>
                  </button>
                  <span v-else class="x-chat__text" :class="{ 'is-emoji': isEmojiMessage(part) }">{{ part.content }}</span>
                </slot>
                </div>
              </div>
              <div v-if="showStatus && isSelf(message) && message.status" class="x-chat__status" :class="{ 'is-failed': message.status === 'failed' }">
                <span>{{ statusText[message.status] }}</span>
                <button v-if="message.status === 'failed'" type="button" @click="emit('retry', message)">重试</button>
              </div>
            </div>
          </template>
        </div>
        </template>
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
          <textarea ref="textarea" v-model="draft" class="x-chat__input" aria-label="消息内容" :placeholder="props.placeholder" :disabled="disabled" rows="2" @paste="handlePaste" @keydown="handleKeydown" />
          <div class="x-chat__send-row"><span class="x-chat__input-tip">Enter 发送，Shift+Enter 换行</span><button type="submit" class="x-chat__send" :disabled="!canSend">{{ props.sendText }}</button></div>
        </form>
      </slot>
    </footer>
  </section>
</template>

<style scoped>
.x-chat__time-separator { display: flex; justify-content: center; margin: 8px 0 20px; color: var(--x-color-text-muted, #737b8c); font-size: var(--x-font-size-caption, 12px); }
.x-chat__time-separator time { padding: 3px 10px; border-radius: 10px; background: color-mix(in srgb, var(--x-color-surface, white) 60%, transparent); }

.x-chat__business { display: grid; gap: 6px; width: min(280px, 100%); border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; overflow-wrap: anywhere; }
.x-chat__business small { color: var(--x-color-text-muted, #737b8c); }
.x-chat__item.is-highlighted .x-chat__bubble { outline: 2px solid var(--x-color-primary, #409eff); outline-offset: 3px; }
</style>
