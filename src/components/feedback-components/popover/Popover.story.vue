<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XButton } from '../../basic-components/button'
import { XPopover } from './index'
import type { PopoverProps } from './src/types'
import '../../../styles/index.css'
const initialProps = { content: '这里展示更多字段说明' } satisfies PopoverProps
</script>

<template>
  <Story title="反馈组件/Popover 气泡卡片" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XPopover" :initial-props="initialProps">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XPopover v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">
            <XButton width="120px">触发卡片</XButton>
          </XPopover>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
