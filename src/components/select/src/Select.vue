<script setup lang="ts">
import { computed, inject, onBeforeUnmount, provide, ref } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import { formContextKey, formItemContextKey } from '../../form/src/context'
import { selectContextKey, type SelectOptionRecord } from './context'
import type { SelectOptionValue, SelectProps } from './types'

defineOptions({
  name: 'XSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  multiple: false,
  size: undefined,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: SelectOptionValue | SelectOptionValue[] | undefined]
  change: [value: SelectOptionValue | SelectOptionValue[] | undefined]
  clear: []
  focus: [event: FocusEvent]
}>()

const form = inject(formContextKey, null)
const formItem = inject(formItemContextKey, null)
const isOpen = ref(false)
const slotOptions = ref<SelectOptionRecord[]>([])
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')

const selectedValues = computed<SelectOptionValue[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue == null || props.modelValue === '' ? [] : [props.modelValue]
})

const allOptions = computed<SelectOptionRecord[]>(() => {
  const map = new Map<SelectOptionValue, SelectOptionRecord>()
  props.options.forEach((option) => map.set(option.value, option))
  slotOptions.value.forEach((option) => map.set(option.value, option))
  return Array.from(map.values())
})

const selectedLabels = computed(() =>
  selectedValues.value
    .map((value) => allOptions.value.find((option) => option.value === value)?.label)
    .filter(Boolean)
)

const selectStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-select-color': props.color,
  '--x-select-border-color': props.borderColor,
  '--x-select-border-width': toCssSize(props.borderWidth),
  '--x-select-radius': props.radius,
  '--x-select-bg': props.backgroundColor ?? props.background,
  '--x-select-text-color': props.textColor
}))

const registerOption = (option: SelectOptionRecord) => {
  slotOptions.value = [...slotOptions.value.filter((item) => item.value !== option.value), option]
}

const unregisterOption = (value: SelectOptionValue) => {
  slotOptions.value = slotOptions.value.filter((option) => option.value !== value)
}

const commit = (value: SelectOptionValue | SelectOptionValue[] | undefined) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const selectOption = (option: SelectOptionRecord) => {
  if (option.disabled || mergedDisabled.value) return

  if (props.multiple) {
    const exists = selectedValues.value.includes(option.value)
    const next = exists
      ? selectedValues.value.filter((value) => value !== option.value)
      : [...selectedValues.value, option.value]
    commit(next)
    return
  }

  commit(option.value)
  isOpen.value = false
}

const clear = () => {
  commit(props.multiple ? [] : undefined)
  emit('clear')
}

const toggle = () => {
  if (!mergedDisabled.value) isOpen.value = !isOpen.value
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const close = () => {
  isOpen.value = false
}

provide(selectContextKey, {
  multiple: props.multiple,
  selectedValues: () => selectedValues.value,
  registerOption,
  unregisterOption,
  selectOption
})

onBeforeUnmount(close)
</script>

<template>
  <div
    class="x-select"
    :class="[
      `x-select--${mergedSize}`,
      { 'is-open': isOpen, 'is-disabled': mergedDisabled, 'is-multiple': props.multiple, 'is-active-border-hidden': !props.showActiveBorder }
    ]"
    :style="selectStyle"
  >
    <button
      :id="formItem?.id"
      class="x-select__control"
      type="button"
      :disabled="mergedDisabled"
      :name="props.name"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @focus="handleFocus"
      @click="toggle"
      @blur="close"
    >
      <span v-if="selectedLabels.length" class="x-select__value">
        {{ selectedLabels.join('、') }}
      </span>
      <span v-else class="x-select__placeholder">{{ props.placeholder }}</span>
      <span
        v-if="props.clearable && selectedValues.length && !mergedDisabled"
        class="x-select__clear"
        role="button"
        tabindex="-1"
        aria-label="清空"
        @mousedown.prevent
        @click.stop="clear"
      >
        ×
      </span>
      <span class="x-select__arrow" aria-hidden="true">⌄</span>
    </button>
    <div v-show="isOpen" class="x-select__dropdown" role="listbox" :aria-multiselectable="props.multiple || undefined">
      <template v-for="option in props.options" :key="String(option.value)">
        <button
          class="x-option"
          :class="{ 'is-selected': selectedValues.includes(option.value), 'is-disabled': option.disabled }"
          type="button"
          role="option"
          :aria-selected="selectedValues.includes(option.value)"
          :disabled="option.disabled"
          @mousedown.prevent
          @click="selectOption(option)"
        >
          <span>{{ option.label }}</span>
          <span v-if="selectedValues.includes(option.value)" class="x-option__check">✓</span>
        </button>
      </template>
      <slot />
      <div v-if="!allOptions.length" class="x-select__empty">暂无数据</div>
    </div>
  </div>
</template>
