<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XSplitPane, XSplitter } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/SplitPane 分栏面板" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSplitPane">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XSplitter :width="600" :height="240">
            <XSplitPane  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">分栏面板内容</XSplitPane>
          <XSplitPane>相邻面板</XSplitPane></XSplitter>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
