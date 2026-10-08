<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XSkeleton } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="展示组件/Skeleton 骨架屏" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSkeleton">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XSkeleton avatar :rows="3"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
