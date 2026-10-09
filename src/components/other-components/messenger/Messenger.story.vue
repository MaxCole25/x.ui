<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import MessengerPreview from './MessengerPreview.vue'
import { createMessengerDemoState } from './demo'
import '../../../styles/index.css'
const createInitialProps = () => createMessengerDemoState() as unknown as Record<string, unknown>
</script>
<template>
  <Story title="其它组件/Messenger 内部通讯" group="components"><Variant title="外观接口">
    <ApiPlayground component="XMessenger" :create-initial-props="createInitialProps">
      <template #default="{ apiProps, apiEvents, captureInstance }">
        <MessengerPreview :api-props="apiProps" :api-events="apiEvents" :capture-instance="captureInstance" />
      </template>
    </ApiPlayground>
  </Variant></Story>
</template>
