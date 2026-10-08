<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XBreadcrumb } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="导航组件/Breadcrumb 面包屑" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XBreadcrumb">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XBreadcrumb :items="[{ label: '首页', to: '#/' }, { label: '组件' }, { label: 'Breadcrumb' }]"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
