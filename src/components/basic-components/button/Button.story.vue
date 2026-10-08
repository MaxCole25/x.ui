<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XButton } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/Button 按钮" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XButton">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XButton v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">外观按钮</XButton>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
