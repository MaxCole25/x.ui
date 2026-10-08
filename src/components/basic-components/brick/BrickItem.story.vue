<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XBrickItem, XBrick } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/BrickItem 砖格子项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XBrickItem">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XBrick :width="600" :height="240">
            <XBrickItem  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">砖格子项内容</XBrickItem>
          <XBrickItem :item-size="160">固定区域</XBrickItem></XBrick>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
