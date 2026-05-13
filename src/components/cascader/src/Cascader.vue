<script setup lang="ts">
import { computed, ref } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { CascaderOption, CascaderProps } from './types'

defineOptions({
  name: 'XCascader'
})

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: CascaderProps['modelValue']]
  change: [value: CascaderProps['modelValue']]
  focus: [event: FocusEvent]
}>()

const open = ref(false)
const activePath = ref<CascaderOption[]>([])
const cascaderStyle = computed(() => createElementStyleVars(props))

const columns = computed(() => {
  const result: CascaderOption[][] = [props.options]
  activePath.value.forEach((option) => {
    if (option.children?.length) result.push(option.children)
  })
  return result
})

const label = computed(() => {
  const labels: string[] = []
  let current = props.options
  props.modelValue.forEach((value) => {
    const option = current.find((item) => item.value === value)
    if (option) {
      labels.push(option.label)
      current = option.children ?? []
    }
  })
  return labels.join(' / ')
})

const choose = (option: CascaderOption, columnIndex: number) => {
  if (option.disabled) return
  activePath.value = [...activePath.value.slice(0, columnIndex), option]
  if (!option.children?.length) {
    const value = activePath.value.map((item) => item.value)
    emit('update:modelValue', value)
    emit('change', value)
    open.value = false
  }
}

const toggle = () => {
  if (!props.disabled) open.value = !open.value
}
</script>

<template>
  <div class="x-cascader" :class="{ 'is-open': open, 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }" :style="cascaderStyle">
    <button type="button" class="x-cascader__control" :disabled="props.disabled" @focus="emit('focus', $event)" @click="toggle">
      <span :class="{ 'is-placeholder': !label }">{{ label || props.placeholder }}</span>
      <span aria-hidden="true">⌄</span>
    </button>
    <div v-show="open" class="x-cascader__panel">
      <div v-if="!props.options.length" class="x-cascader__empty">暂无数据</div>
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="x-cascader__column">
        <button
          v-for="option in column"
          :key="String(option.value)"
          type="button"
          class="x-cascader__option"
          :class="{ 'is-active': activePath[columnIndex]?.value === option.value, 'is-disabled': option.disabled }"
          :disabled="option.disabled"
          @click="choose(option, columnIndex)"
        >
          <span>{{ option.label }}</span>
          <span v-if="option.children?.length" aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  </div>
</template>
