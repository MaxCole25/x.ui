<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XOption, XSelect } from './index'
import { ref } from 'vue'
const value = ref('one')
import '../../../styles/index.css'
</script>

<template>
  <Story title="Form 组件/Option 选项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XOption">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XSelect v-model="value">
            <XOption value="one" label="选项一" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance">选项一</XOption>
          </XSelect>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
