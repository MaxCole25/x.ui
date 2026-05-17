<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import XCheckbox from './src/Checkbox.vue'
import type { CheckboxSize } from './src/types'
const appearance = reactive({
  label: '多选项',
  value: 'checked',
  name: 'appearance-checkbox',
  size: 'md' as CheckboxSize,
  color: '#1264f4',
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XCheckbox
            v-bind="styleProps"
            v-model="sample.checked"
            :label="appearance.label"
            :value="appearance.value"
            :name="appearance.name"
            :size="appearance.size"
            :color="appearance.color"
            :radius="appearance.radius"
            :disabled="appearance.disabled"
            :indeterminate="appearance.indeterminate"
          />
        </template>
        <template #column-1>
          <label>
            <span>绑定值</span>
            <input v-model="sample.checked" type="checkbox" />
          </label>
          <label>
            <span>标签</span>
            <input v-model="appearance.label" />
          </label>
          <label>
            <span>值</span>
            <input v-model="appearance.value" />
          </label>
          <label>
            <span>name</span>
            <input v-model="appearance.name" />
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="appearance.size">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label>
            <span>圆角</span>
            <input v-model="appearance.radius" />
          </label>
        </template>
        <template #column-3>
          <label>
            <span>主题色</span>
            <input v-model="appearance.color" type="color" />
          </label>
        </template>
        <template #column-4>
          <label class="story-check">
            <input v-model="appearance.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
          <label class="story-check">
            <input v-model="appearance.indeterminate" type="checkbox" />
            <span>半选</span>
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
