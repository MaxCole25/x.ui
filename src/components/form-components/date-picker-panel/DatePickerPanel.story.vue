<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import { XDatePickerPanel } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  year: 2026,
  month: 5,
  showChinaFestivals: true
})

const darkPanelTheme = {
  panelBackgroundColor: '#0f172a',
  panelTextColor: '#e5e7eb',
  panelMutedTextColor: '#94a3b8',
  panelBorderColor: '#334155',
  panelHeaderTextColor: '#f8fafc',
  panelWeekTextColor: '#93c5fd',
  panelDayTextColor: '#e2e8f0',
  panelDayHoverBackgroundColor: '#1e40af',
  panelDayHoverTextColor: '#ffffff',
  panelDayActiveBackgroundColor: '#2563eb',
  panelDayActiveTextColor: '#ffffff',
  festivalBackgroundColor: '#431407',
  festivalTextColor: '#fed7aa',
  festivalBadgeBackgroundColor: '#fb923c',
  festivalBadgeTextColor: '#111827',
  solarTermBackgroundColor: '#052e2b',
  solarTermTextColor: '#99f6e4',
  solarTermBadgeBackgroundColor: '#2dd4bf',
  solarTermBadgeTextColor: '#042f2e',
  customFestivalBackgroundColor: '#172554',
  customFestivalTextColor: '#bfdbfe',
  customFestivalBadgeBackgroundColor: '#60a5fa',
  customFestivalBadgeTextColor: '#0f172a',
  panelDayMarkedHoverBackgroundColor: '#1d4ed8',
  panelDayMarkedHoverTextColor: '#ffffff',
  panelDayMarkedActiveBackgroundColor: '#3b82f6',
  panelDayMarkedActiveTextColor: '#ffffff',
  panelDayMarkedBadgeHoverBackgroundColor: '#e0f2fe',
  panelDayMarkedBadgeHoverTextColor: '#1d4ed8'
}

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
      <ElementStylePlayground>
        <template #default="styleProps">
          <div class="date-panel-story-pair">
            <XDatePickerPanel
              v-bind="styleProps"
              v-model="sample.date"
              :year="appearance.year"
              :month="appearance.month"
              :show-china-festivals="appearance.showChinaFestivals"
            />
            <XDatePickerPanel
              v-bind="darkPanelTheme"
              v-model="sample.date"
              :year="appearance.year"
              :month="appearance.month"
              :show-china-festivals="appearance.showChinaFestivals"
              :festivals="{ '2026-05-14': { name: '评审', type: 'custom' } }"
            />
          </div>
        </template>
        <template #column-1>
          <label>
            <span>绑定值</span>
            <input v-model="sample.date" />
          </label>
        </template>
        <template #column-2>
          <label>
            <span>年份</span>
            <input v-model.number="appearance.year" type="number" min="1900" max="2100" />
          </label>
          <label>
            <span>月份</span>
            <input v-model.number="appearance.month" type="number" min="1" max="12" />
          </label>
        </template>
        <template #column-4>
          <label>
            <input v-model="appearance.showChinaFestivals" type="checkbox" />
            <span>显示农历节日</span>
          </label>
        </template>
      </ElementStylePlayground>
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
