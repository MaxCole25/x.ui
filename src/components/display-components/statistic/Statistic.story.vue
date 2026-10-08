<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XStatistic } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="展示组件/Statistic 统计数值" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XStatistic">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XStatistic title="转化率" :model-value="18.236" :precision="2" suffix="%"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
