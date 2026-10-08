<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XPopconfirm } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="反馈组件/Popconfirm 气泡确认" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XPopconfirm">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XPopconfirm content="删除后不可恢复"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" ><XButton>删除</XButton></XPopconfirm>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
