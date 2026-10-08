<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XBadge } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="展示组件/Badge 徽标" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XBadge">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XBadge  :model-value="12" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" ><XButton>消息</XButton></XBadge>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
