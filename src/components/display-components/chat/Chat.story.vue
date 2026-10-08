<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XChat, type ChatMessage, type ChatSendPayload } from './index'
import { createChatMessages } from './demo'
import '../../../styles/index.css'

const createInitialProps = () => ({ messages: createChatMessages(), currentUserId: 'me', title: '小林', height: 400 })
let nextId = 6
function send(payload: ChatSendPayload, values: Record<string, unknown>) {
  const messages = (values.messages ?? []) as ChatMessage[]
  const base = { senderId: values.currentUserId as string | number | undefined, senderName: '我', time: '刚刚', status: 'sent' as const }
  if (payload.content) messages.push({ ...base, id: nextId++, content: payload.content })
  for (const attachment of payload.attachments) {
    messages.push({ ...base, id: nextId++, kind: attachment.kind, content: attachment.name,
      imageUrl: attachment.kind === 'image' ? attachment.url : undefined,
      fileUrl: attachment.kind === 'file' ? attachment.url : undefined,
      fileName: attachment.name, fileSize: attachment.size })
  }
  values.messages = messages
}
</script>

<template>
  <Story title="展示组件/Chat 聊天消息" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XChat" :create-initial-props="createInitialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XChat v-bind="apiProps" v-on="apiEvents" @send="send($event, apiProps)" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
