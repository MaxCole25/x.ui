<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XUpload } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="Form 组件/Upload 上传" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XUpload">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XUpload   button-text="选择附件" tip="支持拖拽或点击选择"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
