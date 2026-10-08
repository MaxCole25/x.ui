<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XSteps } from './index'
import '../../../styles/index.css'
const steps = [{ title: '填写信息', description: '录入基础资料' }, { title: '确认内容', description: '核对字段' }, { title: '提交完成', description: '等待处理' }]
</script>

<template>
  <Story title="导航组件/Steps 步骤条" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSteps">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XSteps :items="steps" :model-value="1"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
