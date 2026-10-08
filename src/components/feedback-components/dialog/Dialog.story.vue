<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XButton } from '../../basic-components/button'
import { XDialog, type DialogFooterDividerStyle } from './index'
import '../../../styles/index.css'
const visible = ref(false)
const state = reactive({
  title: '新建任务',
  width: 760,
  height: 520,
  minWidth: 520,
  minHeight: 320,
  zIndex: overlayZIndex.dialog,
  draggable: true,
  resizable: true,
  showFullscreen: true,
  closeOnMaskClick: true,
  showFooterDivider: true,
  footerDividerColor: '#dbe5f3',
  footerDividerWidth: 1,
  footerDividerStyle: 'solid' as DialogFooterDividerStyle
})
const logs = ref<string[]>([])
function onClose() {
  logs.value = [`${new Date().toLocaleTimeString()} 已关闭`, ...logs.value].slice(0, 6)
}
</script>

<template>
  <Story title="反馈组件/弹窗 Dialog" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDialog">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDialog 
        v-model="visible"
        :title="state.title"

        :draggable="state.draggable"
        :resizable="state.resizable"

        :footer-divider-style="state.footerDividerStyle"
        @close="onClose"
       v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
        <template #header>
          <div style="display: flex; align-items: center; gap: 10px">
            <strong>{{ state.title }}</strong>
            <span style="font-size: 12px; color: #6b7c93">支持自定义头部插槽</span>
          </div>
        </template>

        <div style="display: grid; gap: 10px; line-height: 1.7">
          <label>
            任务标题
            <input type="text" placeholder="请输入任务标题" style="width: 100%; min-height: 34px; padding: 0 10px; box-sizing: border-box" />
          </label>
          <label>
            任务描述
            <textarea rows="5" placeholder="请输入任务描述" style="width: 100%; padding: 8px 10px; box-sizing: border-box" />
          </label>
          <p style="margin: 0; color: #6b7c93">这里是默认插槽内容区域，可自由组合表单、表格和步骤流程。</p>
        </div>

        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 8px">
            <XButton variant="ghost" @click="visible = false">取消</XButton>
            <XButton @click="visible = false">提交</XButton>
          </div>
        </template>
      </XDialog>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
