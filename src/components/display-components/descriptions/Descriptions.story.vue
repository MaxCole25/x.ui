<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XDescriptions } from './index'
import '../../../styles/index.css'
const descriptionItems = [{ label: '客户', value: '杭州示例科技' }, { label: '状态', value: '进行中' }, { label: '负责人', value: '运营组' }]
</script>

<template>
  <Story title="展示组件/Descriptions 描述列表" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDescriptions">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDescriptions title="订单信息"  :items="descriptionItems"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
