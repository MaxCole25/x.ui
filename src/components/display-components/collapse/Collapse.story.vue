<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { ref } from 'vue'
import { XCollapse } from './index'
import '../../../styles/index.css'
const activeNames = ref<string[]>(['base'])
const collapseItems = [{ name: 'base', title: '基础信息', content: '这里展示基础设置。' }, { name: 'advanced', title: '高级设置', content: '这里展示高级参数。' }]
function setActiveNames(value: string | number | Array<string | number>) {
  activeNames.value = Array.isArray(value) ? value.map(String) : value === '' ? [] : [String(value)]
}
</script>

<template>
  <Story title="展示组件/Collapse 折叠面板" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XCollapse">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XCollapse :model-value="activeNames" @update:model-value="setActiveNames" :items="collapseItems"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
