<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XMessageBox, XMessageBoxComponent } from './index'
import type { MessageBoxType } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  visible: true,
  title: '删除确认',
  message: '操作后数据不可恢复，请确认是否继续。',
  type: 'warning' as MessageBoxType,
  width: 420,
  minWidth: 280,
  radius: 8,
  padding: '16px',
  backgroundColor: '#ffffff',
  textColor: '#606266',
  titleColor: '#303133',
  borderColor: '#e4e7ed',
  iconColor: '#e6a23c',
  maskColor: 'rgba(18, 28, 45, 0.42)',
  confirmBackgroundColor: '#1264f4',
  confirmTextColor: '#ffffff',
  confirmBorderColor: '#1264f4',
  cancelBackgroundColor: '#ffffff',
  cancelTextColor: '#606266',
  cancelBorderColor: '#dcdfe6',
  showCancelButton: true,
  showConfirmButton: true,
  showClose: true,
  closeOnMaskClick: true,
  action: ''
})

function openService() {
  XMessageBox.confirm(appearance.message, appearance.title, {
    type: appearance.type,
    confirmBackgroundColor: appearance.confirmBackgroundColor,
    confirmTextColor: appearance.confirmTextColor,
    cancelTextColor: appearance.cancelTextColor
  }).catch(() => undefined)
}
</script>

<template>
  <Story title="反馈组件/MessageBox 消息弹框" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <XButton width="140px" @click="appearance.visible = true">打开组件弹框</XButton>
          <XMessageBoxComponent
            v-model="appearance.visible"
            :title="appearance.title"
            :message="appearance.message"
            :type="appearance.type"
            :width="appearance.width"
            :min-width="appearance.minWidth"
            :radius="appearance.radius"
            :padding="appearance.padding"
            :background-color="appearance.backgroundColor"
            :text-color="appearance.textColor"
            :title-color="appearance.titleColor"
            :border-color="appearance.borderColor"
            :icon-color="appearance.iconColor"
            :mask-color="appearance.maskColor"
            :confirm-background-color="appearance.confirmBackgroundColor"
            :confirm-text-color="appearance.confirmTextColor"
            :confirm-border-color="appearance.confirmBorderColor"
            :cancel-background-color="appearance.cancelBackgroundColor"
            :cancel-text-color="appearance.cancelTextColor"
            :cancel-border-color="appearance.cancelBorderColor"
            :show-cancel-button="appearance.showCancelButton"
            :show-confirm-button="appearance.showConfirmButton"
            :show-close="appearance.showClose"
            :close-on-mask-click="appearance.closeOnMaskClick"
            @action="appearance.action = $event"
          />
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" type="text" /></label>
          <label><span>内容</span><input v-model="appearance.message" type="text" /></label>
          <label><span>宽度</span><input v-model.number="appearance.width" type="number" /></label>
        </template>
        <template #column-2>
          <label><span>最小宽度</span><input v-model.number="appearance.minWidth" type="number" /></label>
          <label><span>圆角</span><input v-model.number="appearance.radius" type="number" /></label>
          <label><span>内边距</span><input v-model="appearance.padding" type="text" /></label>
        </template>
        <template #column-3>
          <label><span>背景色</span><input v-model="appearance.backgroundColor" type="color" /></label>
          <label><span>标题色</span><input v-model="appearance.titleColor" type="color" /></label>
          <label><span>文字色</span><input v-model="appearance.textColor" type="color" /></label>
          <label><span>确认背景色</span><input v-model="appearance.confirmBackgroundColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.showCancelButton" type="checkbox" /><span>取消按钮</span></label>
          <label class="story-check"><input v-model="appearance.showConfirmButton" type="checkbox" /><span>确认按钮</span></label>
          <label class="story-check"><input v-model="appearance.showClose" type="checkbox" /><span>关闭按钮</span></label>
          <label class="story-check"><input v-model="appearance.closeOnMaskClick" type="checkbox" /><span>遮罩关闭</span></label>
        </template>
        <template #types>
          <label><span>MessageBoxType</span><select v-model="appearance.type"><option value="success">success</option><option value="warning">warning</option><option value="info">info</option><option value="error">error</option></select></label>
        </template>
        <template #interfaces>
          <XButton width="120px" @click="openService">服务确认框</XButton>
        </template>
        <template #events>
          <label><span>action 事件</span><input :value="appearance.action" type="text" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
