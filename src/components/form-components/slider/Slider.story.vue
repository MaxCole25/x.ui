<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XSlider } from './index'
import '../../../styles/index.css'
const appearance = reactive({
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: true,
  vertical: false
})
const sample = reactive({
  input: '外观接口预览',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36
})
</script>

<template>
  <Story title="Form 组件/Slider 滑块" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSlider">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XSlider 

            v-model="sample.number"
            :min="appearance.min"
            :max="appearance.max"
            :step="appearance.step"

            :vertical="appearance.vertical"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 16px;
  padding: 16px;
  width: 320px;
}
</style>
