<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XDatePickerPanel } from './index'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  year: 2026,
  month: 5,
  showChinaFestivals: true
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
  <Story title="Form 组件/DatePickerPanel 日期选择器面板" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDatePickerPanel">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDatePickerPanel

              v-model="sample.date"
              :year="appearance.year"
              :month="appearance.month"

             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.date-panel-story-pair {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}
</style>
