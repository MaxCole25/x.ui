<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XAlert } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="反馈组件/Alert 提示" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XAlert">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XAlert title="保存成功" description="数据已写入草稿。"    v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
