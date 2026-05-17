<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XLoading, XLoadingService, vLoading } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  loading: true,
  text: '加载中',
  fullscreen: false,
  backgroundColor: '#ffffff',
  textColor: '#1264f4',
  spinnerColor: '#1264f4',
  spinnerSize: 32,
  zIndex: 2000,
  directiveLoading: true
})

function openService() {
  const instance = XLoadingService({
    text: appearance.text,
    backgroundColor: appearance.backgroundColor,
    textColor: appearance.textColor,
    spinnerColor: appearance.spinnerColor,
    spinnerSize: appearance.spinnerSize
  })
  window.setTimeout(() => instance.close(), 1200)
}
</script>

<template>
  <Story title="反馈组件/Loading 加载" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <div class="story-loading-card">
            <p>局部加载区域</p>
            <XLoading
              :model-value="appearance.loading"
              :text="appearance.text"
              :fullscreen="appearance.fullscreen"
              :background-color="appearance.backgroundColor"
              :text-color="appearance.textColor"
              :spinner-color="appearance.spinnerColor"
              :spinner-size="appearance.spinnerSize"
              :z-index="appearance.zIndex"
            />
          </div>
          <div v-loading="appearance.directiveLoading" class="story-loading-card">
            <p>v-loading 指令区域</p>
          </div>
        </template>
        <template #column-1>
          <label><span>文字</span><input v-model="appearance.text" type="text" /></label>
          <label><span>图标长度</span><input v-model.number="appearance.spinnerSize" type="number" /></label>
        </template>
        <template #column-2>
          <label><span>层级</span><input v-model.number="appearance.zIndex" type="number" /></label>
        </template>
        <template #column-3>
          <label><span>背景色</span><input v-model="appearance.backgroundColor" type="color" /></label>
          <label><span>文字色</span><input v-model="appearance.textColor" type="color" /></label>
          <label><span>图标色</span><input v-model="appearance.spinnerColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.loading" type="checkbox" /><span>组件加载</span></label>
          <label class="story-check"><input v-model="appearance.directiveLoading" type="checkbox" /><span>指令加载</span></label>
          <label class="story-check"><input v-model="appearance.fullscreen" type="checkbox" /><span>全屏</span></label>
        </template>
        <template #interfaces>
          <XButton width="120px" @click="openService">服务加载</XButton>
        </template>
        <template #types>
          <label><span>vLoading</span><input value="Directive" type="text" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-loading-card {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  display: flex;
  height: 120px;
  justify-content: center;
  margin: 8px;
  position: relative;
  width: 220px;
}
</style>
