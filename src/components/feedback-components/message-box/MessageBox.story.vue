<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XMessageBox, XMessageBoxComponent } from './index'
import type { MessageBoxType } from './src/types'
import type { FontSize } from '../../_utils/size'
import '../../../styles/index.css'
const appearance = reactive({
  visible: false,
  title: '删除确认',
  message: '操作后数据不可恢复，请确认是否继续。',
  status: 'warning' as MessageBoxType,
  fontSize: 14 as FontSize,
  width: 420,
  minWidth: 280,
  zIndex: overlayZIndex.messageBox,
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
</script>

<template>
<Story title="反馈组件/MessageBox 消息弹框" group="components"><Variant title="外观接口"><ApiPlayground component="XMessageBox"><template #default="{ apiProps = {}, apiEvents = {}, captureInstance }"><XMessageBoxComponent
            v-model="appearance.visible"
            :title="appearance.title"
            :message="appearance.message"

            @action="appearance.action = $event"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" /></template></ApiPlayground></Variant></Story>
</template>
