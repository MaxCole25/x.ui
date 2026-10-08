<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XDivider } from './index'
import type { DividerBorderStyle, DividerContentPosition, DividerDirection } from './src/types'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  text: '分割线',
  direction: 'horizontal' as DividerDirection,
  contentPosition: 'center' as DividerContentPosition,
  borderStyle: 'solid' as DividerBorderStyle,
  thickness: 1,
  margin: 16
})
</script>

<template>
  <Story title="基础组件/Divider 分割线" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDivider">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDivider    :content-position="appearance.contentPosition"  :thickness="appearance.thickness" :margin="appearance.margin" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
              {{ appearance.text }}
            </XDivider>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-block {
  padding: 16px;
}
.divider-demo {
  width: 100%;
}
</style>
