<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XSlider } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: true
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XSlider
            v-bind="styleProps"
            v-model="sample.number"
            :min="appearance.min"
            :max="appearance.max"
            :step="appearance.step"
            :disabled="appearance.disabled"
            :show-value="appearance.showValue"
          />
        </template>
        <template #column-2>
          <label>
            <span>最小值</span>
            <input v-model.number="appearance.min" type="number" />
          </label>
          <label>
            <span>最大值</span>
            <input v-model.number="appearance.max" type="number" />
          </label>
          <label>
            <span>步进</span>
            <input v-model.number="appearance.step" type="number" min="1" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
          <label>
            <input v-model="appearance.showValue" type="checkbox" />
            <span>显示值</span>
          </label>
        </template>
      </ElementStylePlayground>
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
