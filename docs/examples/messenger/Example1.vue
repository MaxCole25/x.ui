<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { XMessenger, type MessengerExpose } from '../../../src/components/other-components/messenger'
import { createMessengerDemoState, createMessengerDemoHandlers } from '../../../src/components/other-components/messenger/demo'
const state = reactive(createMessengerDemoState())
const apiProps = computed(() => { const { allMessages: _allMessages, demoSequence: _demoSequence, ...props } = state; return props })
const messenger = ref<MessengerExpose>()
const notice = ref('好友列表默认显示最近联系人，图标切换分组或群聊，管理员通过设置管理分组；聊天窗口单独打开。演示使用内存数据，刷新后重置。')
const previewUrl = ref('')
const handlers = createMessengerDemoHandlers(state, () => messenger.value, text => { notice.value = text })
</script>
<template>
  <div class="messenger-example">
    <button type="button" @click="state.modelValue = true">打开聊天窗口</button>
    <button type="button" @click="state.showContactList = !(state.showContactList ?? true)">{{ state.showContactList === false ? '显示好友列表' : '隐藏好友列表' }}</button>
    <button type="button" @click="handlers.receive()">模拟收到消息</button>
    <p>{{ notice }}</p>
    <XMessenger ref="messenger" v-bind="apiProps" v-model="state.modelValue" v-model:active-conversation-id="state.activeConversationId" v-model:contact-list-height="state.contactListHeight"
      @open-conversation="handlers.open" @send="handlers.send" @load-history="handlers.loadHistory"
      @history-query="handlers.historyQuery" @locate-message="handlers.locate" @read-request="handlers.read"
      @contact-group-action="handlers.contactGroupAction" @group-action="handlers.groupAction"
      @business-select="handlers.businessSelect" @business-click="handlers.businessClick"
      @file-click="handlers.fileClick" @image-click="previewUrl = $event.detail.message.imageUrl ?? ''" @retry="handlers.retry" />
    <div v-if="previewUrl" class="messenger-example__preview"><button type="button" @click="previewUrl = ''">关闭图片预览</button><img :src="previewUrl" alt="聊天图片预览" /></div>
  </div>
</template>
<style scoped>
.messenger-example>button,.messenger-example__preview>button { padding: 7px 12px; border: 1px solid #dce3ec; border-radius: 4px; background: #fff; margin: 0 8px 8px 0; cursor: pointer; }
.messenger-example p { color: #788397; font-size: 13px; }
.messenger-example__preview { padding: 10px; }.messenger-example__preview img { display: block; max-width: 100%; max-height: 400px; object-fit: contain; }
</style>
