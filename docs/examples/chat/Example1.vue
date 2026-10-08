<script setup lang="ts">
import { ref } from 'vue'
import { XBrick, XText, XChat, XButton, type ChatExpose, type ChatMessage, type ChatMessageClickPayload, type ChatSendPayload } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
function createChatMessages(): ChatMessage[] {
  return [
    { id: 'notice', kind: 'system', content: '今天 10:20 · 你们已成为好友，开始聊天吧' },
    { id: 1, senderId: 'friend', senderName: '小林', time: '10:20', content: '你好！新的聊天消息框做好了吗？🙂' },
    { id: 2, senderId: 'me', senderName: '我', time: '10:21', content: '做好了，支持左右气泡、头像和消息状态。\n长消息会自动换行，换行符也会保留。', status: 'read' },
    { id: 3, senderId: 'friend', senderName: '小林', time: '10:22', kind: 'image', content: '周末去看山吧', imageUrl: '/chat-landscape.svg' },
    { id: 4, senderId: 'me', senderName: '我', time: '10:23', content: '看起来不错，我们周末出发！', quote: { senderName: '小林', content: '周末去看山吧' }, status: 'sent' },
    { id: 5, senderId: 'me', senderName: '我', time: '10:24', content: '这条消息可以点击重试。', status: 'failed' }
  ]
}


const chat = ref<ChatExpose>()
const messages = ref(createChatMessages())
const feedback = ref('可选择本地图片、文件，或在输入框粘贴图片；点击笑脸选择表情。')
let nextId = 6
function send(payload: ChatSendPayload) {
  const base = { senderId: 'me', senderName: '我', time: '刚刚', status: 'sent' as const }
  if (payload.content) messages.value.push({ ...base, id: nextId++, content: payload.content })
  for (const attachment of payload.attachments) {
    messages.value.push({ ...base, id: nextId++, kind: attachment.kind, content: attachment.name,
      imageUrl: attachment.kind === 'image' ? attachment.url : undefined,
      fileUrl: attachment.kind === 'file' ? attachment.url : undefined,
      fileName: attachment.name, fileSize: attachment.size })
  }
  feedback.value = payload.attachments.length ? '已发送本地附件，当前示例使用本地预览地址。' : '消息已发送'
  void chat.value?.scrollToBottom()
}
function clickFile(payload: ChatMessageClickPayload) {
  const message = payload.message
  if (!message.fileUrl) return
  const link = document.createElement('a')
  link.href = message.fileUrl
  link.download = message.fileName || message.content
  link.click()
  feedback.value = '下载文件：' + (message.fileName || message.content)
}
function retry(message: ChatMessage) {
  messages.value = messages.value.map(item => item.id === message.id ? { ...item, status: 'sent' } : item)
  feedback.value = `消息 ${message.id} 已模拟重发`
}
function clickMessage(payload: ChatMessageClickPayload) {
  feedback.value = `点击消息 ${payload.message.id}：${payload.message.content}`
}
function clickImage(payload: ChatMessageClickPayload) {
  feedback.value = `点击图片：${payload.message.content}`
}
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XChat
      ref="chat"
      :messages="messages"
      current-user-id="me"
      title="小林"
      :height="560"
      @send="send"
      @retry="retry"
      @message-click="clickMessage"
      @image-click="clickImage"
      @file-click="clickFile"
    />
    <XBrick wrap :gap="8">
      <XButton :width="120" @click="chat?.scrollToBottom('smooth')">滚动到底部</XButton>
      <XButton :width="120" @click="messages = []">清空消息</XButton>
      <XButton :width="120" @click="messages = createChatMessages()">恢复示例</XButton>
    </XBrick>
    <XText tag="p" variant="muted" :font-size="12" role="status">{{ feedback }}</XText>
  </XBrick>
</template>
