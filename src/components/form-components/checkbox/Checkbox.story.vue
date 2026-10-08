<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import XCheckbox from './src/Checkbox.vue'
import type { CheckboxFontSize } from './src/types'
const appearance = reactive({ height: 32,
  label: '多选项',
  value: 'checked',
  name: 'appearance-checkbox',
  fontSize: 14 as CheckboxFontSize,
  checkedColor: '#1264f4',
  radius: '6px',
  disabled: false,
  indeterminate: false
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
  <Story title="Form 组件/Checkbox 多选框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XCheckbox">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XCheckbox

            v-model="sample.checked"
            :label="appearance.label"
            :value="appearance.value"
            :name="appearance.name"

            :indeterminate="appearance.indeterminate"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
