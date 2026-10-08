<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XButton } from '../button'
import { XButtonGroup } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/ButtonGroup 按钮组" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XButtonGroup" :sample-count="3">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XButtonGroup 

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <XButton variant="outline">左侧</XButton>
            <XButton variant="outline">中间</XButton>
            <XButton variant="outline">右侧</XButton>
          </XButtonGroup>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
