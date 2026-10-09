<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XConversationList } from './index'
import { createMessengerDemoState } from '../../other-components/messenger/demo'
import '../../../styles/index.css'
const createInitialProps = () => ({ conversations: createMessengerDemoState().conversations, modelValue: 'direct-lin', width: 360, height: 400 })
</script>
<template><Story title="展示组件/ConversationList 会话列表" group="components"><Variant title="外观接口"><ApiPlayground component="XConversationList" :create-initial-props="createInitialProps"><template #default="{ apiProps, apiEvents, captureInstance }"><XConversationList v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" /></template></ApiPlayground></Variant></Story></template>
