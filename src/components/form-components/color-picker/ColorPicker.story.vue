<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XColorPicker } from './index'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  disabled: false,
  panelMode: 'popover' as 'inline' | 'popover',
  hideInlinePanel: false,
  showValue: true,
  width: 180,
  padding: '0 12px'
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
  <Story title="Form 组件/ColorPicker 颜色选择器" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XColorPicker">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XColorPicker
            v-model="sample.color"
            :panel-mode="appearance.panelMode"

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
}
</style>
