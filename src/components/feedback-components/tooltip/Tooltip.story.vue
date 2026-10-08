<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XButton } from '../../basic-components/button'
import { XTooltip } from './index'
import type { TooltipProps } from './src/types'
import '../../../styles/index.css'
const initialProps = { content: '提示内容' } satisfies TooltipProps
</script>

<template>
  <Story title="反馈组件/Tooltip 文字提示" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTooltip" :initial-props="initialProps">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XTooltip v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">
            <XButton width="120px">触发提示</XButton>
          </XTooltip>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
