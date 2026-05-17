<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XButton } from '../../basic-components/button'
import { XDialog } from './index'
import '../../../styles/index.css'

const visible = ref(false)
const state = reactive({
  title: '新建任务',
  width: 760,
  height: 520,
  minWidth: 520,
  minHeight: 320,
  draggable: true,
  resizable: true,
  closeOnMaskClick: true
})
const logs = ref<string[]>([])

function openDialog() {
  visible.value = true
}

function onClose() {
  logs.value = [`${new Date().toLocaleTimeString()} 已关闭`, ...logs.value].slice(0, 6)
}
</script>

<template>
  <Story title="反馈组件/弹窗 Dialog" group="components">
    <Variant title="外观接口">
      <div style="display: grid; gap: 12px">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
          <XButton @click="openDialog">打开弹窗</XButton>
          <label>宽度 <input v-model.number="state.width" type="number" min="420" max="1200" style="width: 90px" /></label>
          <label>高度 <input v-model.number="state.height" type="number" min="260" max="900" style="width: 90px" /></label>
          <label><input v-model="state.draggable" type="checkbox" />可拖拽</label>
          <label><input v-model="state.resizable" type="checkbox" />可缩放</label>
          <label><input v-model="state.closeOnMaskClick" type="checkbox" />遮罩关闭</label>
        </div>

        <div style="font-size: 12px; color: #6b7c93">
          <div v-for="item in logs" :key="item">{{ item }}</div>
        </div>
      </div>

      <XDialog
        v-model="visible"
        :title="state.title"
        :width="state.width"
        :height="state.height"
        :min-width="state.minWidth"
        :min-height="state.minHeight"
        :draggable="state.draggable"
        :resizable="state.resizable"
        :close-on-mask-click="state.closeOnMaskClick"
        @close="onClose"
      >
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
    </Variant>
  </Story>
</template>
