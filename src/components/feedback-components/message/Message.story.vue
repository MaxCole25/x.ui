<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XMessage, XMessageComponent } from './index'
import type { MessagePlacement, MessageType } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  message: '这是一条可配置的消息提示',
  type: 'info' as MessageType,
  placement: 'top' as MessagePlacement,
  duration: 0,
  offset: 20,
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

function openService() {
  XMessage({
    message: appearance.message,
    type: appearance.type,
    placement: appearance.placement,
    showClose: appearance.showClose,
    plain: appearance.plain,
    round: appearance.round,
    center: appearance.center,
    backgroundColor: appearance.backgroundColor,
    textColor: appearance.textColor,
    borderColor: appearance.borderColor,
    iconColor: appearance.iconColor,
    closeColor: appearance.closeColor
  })
}
</script>

<template>
  <Story title="反馈组件/Message 消息提示" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <div class="story-message-preview">
            <XMessageComponent
              :message="appearance.message"
              :type="appearance.type"
              :placement="appearance.placement"
              :duration="appearance.duration"
              :offset="appearance.offset"
              :width="appearance.width"
              :min-width="appearance.minWidth"
              :max-width="appearance.maxWidth"
              :padding="appearance.padding"
              :radius="appearance.radius"
              :background-color="appearance.backgroundColor"
              :text-color="appearance.textColor"
              :border-color="appearance.borderColor"
              :icon-color="appearance.iconColor"
              :close-color="appearance.closeColor"
              :show-close="appearance.showClose"
              :plain="appearance.plain"
              :round="appearance.round"
              :center="appearance.center"
              @close="appearance.closeCount += 1"
            />
          </div>
        </template>
        <template #column-1>
          <label><span>内容</span><input v-model="appearance.message" type="text" /></label>
          <label><span>位置</span><select v-model="appearance.placement"><option value="top">top</option><option value="top-left">top-left</option><option value="top-right">top-right</option><option value="bottom">bottom</option><option value="bottom-left">bottom-left</option><option value="bottom-right">bottom-right</option></select></label>
          <label><span>偏移长度</span><input v-model.number="appearance.offset" type="number" /></label>
        </template>
        <template #column-2>
          <label><span>最小宽度</span><input v-model.number="appearance.minWidth" type="number" /></label>
          <label><span>最大宽度</span><input v-model.number="appearance.maxWidth" type="number" /></label>
          <label><span>圆角</span><input v-model.number="appearance.radius" type="number" /></label>
        </template>
        <template #column-3>
          <label><span>背景色</span><input v-model="appearance.backgroundColor" type="color" /></label>
          <label><span>文字色</span><input v-model="appearance.textColor" type="color" /></label>
          <label><span>边框色</span><input v-model="appearance.borderColor" type="color" /></label>
          <label><span>图标色</span><input v-model="appearance.iconColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.showClose" type="checkbox" /><span>显示关闭</span></label>
          <label class="story-check"><input v-model="appearance.plain" type="checkbox" /><span>朴素</span></label>
          <label class="story-check"><input v-model="appearance.round" type="checkbox" /><span>圆形</span></label>
          <label class="story-check"><input v-model="appearance.center" type="checkbox" /><span>居中</span></label>
        </template>
        <template #types>
          <label><span>MessageType</span><select v-model="appearance.type"><option value="success">success</option><option value="warning">warning</option><option value="info">info</option><option value="error">error</option></select></label>
          <label><span>内边距</span><input v-model="appearance.padding" type="text" /></label>
        </template>
        <template #interfaces>
          <XButton width="120px" @click="openService">服务调用</XButton>
        </template>
        <template #events>
          <label><span>close 事件</span><input :value="appearance.closeCount" type="number" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
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
