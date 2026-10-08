<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { ref } from 'vue'
import { XPagination } from './index'
import '../../../styles/index.css'
const page = ref(1)
</script>

<template>
  <Story title="导航组件/Pagination 分页" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XPagination">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XPagination   :model-value="page" @update:model-value="page = $event" :total="86"   v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
