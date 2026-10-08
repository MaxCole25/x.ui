<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XProgress } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="展示组件/Progress 进度条" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XProgress">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XProgress  :percentage="64"   v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
