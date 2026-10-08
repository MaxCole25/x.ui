<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XGridItem, XGrid } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/GridItem 宫格子项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XGridItem">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XGrid :columns="3" :width="600">
            <XGridItem  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">宫格子项内容</XGridItem>
          <XGridItem>普通区域</XGridItem></XGrid>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
