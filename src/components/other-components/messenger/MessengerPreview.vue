<script setup lang="ts">
import { computed, ref, type VNode } from 'vue'
import { XMessenger, type MessengerExpose } from './index'
import { createMessengerDemoHandlers, type MessengerDemoState } from './demo'
const props = defineProps<{ apiProps: Record<string, unknown>; apiEvents: Record<string, (...args: unknown[]) => void>; captureInstance: (vnode: VNode) => void }>()
const messenger = ref<MessengerExpose>()
const notice = ref('演示使用内存数据，刷新后重置。')
const publicProps = computed(() => { const { allMessages: _allMessages, demoSequence: _demoSequence, ...values } = props.apiProps; return values })
const handlers = computed(() => createMessengerDemoHandlers(props.apiProps as unknown as MessengerDemoState, () => messenger.value, text => { notice.value = text }))
const events = computed(() => {
  const actions = {
    'open-conversation': handlers.value.open, send: handlers.value.send,
    'load-history': handlers.value.loadHistory, 'history-query': handlers.value.historyQuery,
    'locate-message': handlers.value.locate, 'read-request': handlers.value.read,
    'contact-group-action': handlers.value.contactGroupAction, 'group-action': handlers.value.groupAction,
    'business-select': handlers.value.businessSelect, 'business-click': handlers.value.businessClick,
    'image-click': handlers.value.imageClick, 'file-click': handlers.value.fileClick, retry: handlers.value.retry
  } as unknown as Record<string, (...args: unknown[]) => void>
  return Object.fromEntries([...new Set([...Object.keys(props.apiEvents), ...Object.keys(actions)])].map(name => [name, (...args: unknown[]) => {
    props.apiEvents[name]?.(...args)
    actions[name]?.(...args)
  }]))
})
</script>
<template>
  <div>
    <button type="button" @click="apiProps.modelValue = true">打开聊天窗口</button>
    <button type="button" @click="apiProps.showContactList = !(apiProps.showContactList ?? true)">{{ apiProps.showContactList === false ? '显示好友列表' : '隐藏好友列表' }}</button>
    <button type="button" @click="handlers.receive()">模拟收到消息</button>
    <p>{{ notice }}</p>
    <XMessenger ref="messenger" v-bind="publicProps" v-on="events" @vue:mounted="captureInstance" />
  </div>
</template>
