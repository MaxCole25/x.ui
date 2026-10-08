<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XMessage, XMessageComponent } from './index'
import type { MessagePlacement, MessageType } from './src/types'
import type { FontSize } from '../../_utils/size'
import '../../../styles/index.css'
const appearance = reactive({
  message: '这是一条可配置的消息提示',
  status: 'info' as MessageType,
  fontSize: 14 as FontSize,
  placement: 'top' as MessagePlacement,
  duration: 0,
  offset: 20,
  zIndex: overlayZIndex.message,
  width: '',
  minWidth: 280,
  maxWidth: 520,
  padding: '10px 14px',
  radius: 8,
  backgroundColor: '#f4f4f5',
  textColor: '#73767a',
  borderColor: '#d4d7de',
  iconColor: '#73767a',
  closeColor: '#73767a',
  showClose: true,
  plain: false,
  round: false,
  center: false,
  closeCount: 0
})
</script>

<template>
<Story title="反馈组件/Message 消息提示" group="components"><Variant title="外观接口"><ApiPlayground component="XMessage"><template #default="{ apiProps = {}, apiEvents = {}, captureInstance }"><XMessageComponent
              :message="appearance.message"

              :duration="appearance.duration"

              :plain="appearance.plain"
              :round="appearance.round"
              :center="appearance.center"
              @close="appearance.closeCount += 1"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" /></template></ApiPlayground></Variant></Story>
</template>

<style scoped>
.story-message-preview {
  min-height: 96px;
  position: relative;
  width: 100%;
}

.story-message-preview :deep(.x-message) {
  position: absolute;
}
</style>
