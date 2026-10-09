<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XLoading } from './index'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  loading: true,
  text: '加载中',
  fullscreen: false,
  backgroundColor: '#ffffff',
  textColor: '#1264f4',
  spinnerColor: '#1264f4',
  spinnerSize: 32,
  zIndex: overlayZIndex.loading,
  directiveLoading: true
})
</script>

<template>
  <Story title="反馈组件/Loading 加载" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XLoading">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XLoading
              :model-value="appearance.loading"
              :text="appearance.text"

             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
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
