<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { ref, reactive } from 'vue'
import { XAutocomplete } from './index'
import '../../styles/index.css'

const value = ref('杭')
const emptyValue = ref('没有结果')
const options = [
  { label: '杭州', value: '杭州' },
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '一个很长很长很长的城市候选项用于检查下拉宽度', value: '超长城市选项' },
  { label: '已停用城市', value: 'disabled', disabled: true }
]

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

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' }
]

const autocompleteOptions = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]
</script>

<template>
  <Story title="元素/Autocomplete 自动补全输入框" group="components">
    <Variant title="基础用法">
      <div class="story-stack">
        <XAutocomplete v-model="value" :options="options" clearable />
        <span>当前值：{{ value }}</span>
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack">
        <XAutocomplete v-model="emptyValue" :options="options" clearable class="story-autocomplete story-autocomplete--narrow" />
        <XAutocomplete model-value="禁用状态" :options="options" disabled class="story-autocomplete story-autocomplete--medium" />
        <XAutocomplete model-value="" :options="[]" placeholder="空数据" class="story-autocomplete story-autocomplete--wide" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XAutocomplete v-bind="styleProps" v-model="sample.autocomplete" :options="autocompleteOptions" clearable />
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  min-height: 180px;
  padding: 16px;
}

.story-autocomplete--narrow {
  width: 180px;
}

.story-autocomplete--medium {
  width: 260px;
}

.story-autocomplete--wide {
  width: 360px;
}
</style>
