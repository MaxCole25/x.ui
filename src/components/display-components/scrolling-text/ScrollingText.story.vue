<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XScrollingText } from './index'
import type { ScrollingTextProps } from './src/types'
import '../../../styles/index.css'

const initialProps = {
  displayDirection: 'horizontal',
  flowDirection: 'left',
  width: 260,
  height: 96,
  speed: 40,
  fontSize: 14
} satisfies ScrollingTextProps
</script>

<template>
  <Story title="展示组件/ScrollingText 滚动文字" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XScrollingText" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XScrollingText v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">
            系统公告：@x-soft88/x-ui 滚动文字组件支持横向、竖向和速度控制。
          </XScrollingText>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
