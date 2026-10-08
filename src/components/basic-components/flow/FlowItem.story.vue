<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XFlowItem, XFlow } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/FlowItem 流式子项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XFlowItem">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XFlow :width="600">
            <XFlowItem  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">流式子项内容</XFlowItem>
          </XFlow>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
