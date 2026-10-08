<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import '../../../styles/index.css'
import XSwitch from './src/Switch.vue'
</script>

<template>
  <Story title="Form 组件/Switch 开关" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSwitch">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XSwitch v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
