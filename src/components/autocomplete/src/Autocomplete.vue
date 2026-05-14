<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import { XInput } from '../../input'
import type { AutocompleteProps, AutocompleteSize } from './types'

defineOptions({
  name: 'XAutocomplete',
  inheritAttrs: false
})

const props = defineProps<AutocompleteProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

const open = ref(false)
const keyword = computed(() => String(props.modelValue ?? ''))
const sizeFontSize: Record<AutocompleteSize, number> = {
  sm: 12,
  md: 14,
  lg: 16
}

const sizePadding: Record<AutocompleteSize, string> = {
  sm: '0 8px',
  md: '0 12px',
  lg: '0 14px'
}

const optionFontSize = computed(() => {
  if (props.size) return sizeFontSize[props.size]

  return props.fontSize ?? 14
})

const optionPadding = computed(() => {
  if (props.padding) return props.padding
  if (props.size) return sizePadding[props.size]

  return '5px 10px'
})

const autocompleteStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-autocomplete-option-font-size': toCssSize(optionFontSize.value),
  '--x-autocomplete-option-padding': toCssSize(optionPadding.value)
}))
const inputAttrs = computed(() => {
  const {
    type,
    color,
    ...rest
  } = attrs as Record<string, unknown>

  return rest
})

const inputProps = computed(() => {
  const next: Record<string, unknown> = {
    ...props,
    type: 'text'
  }

  delete next.autoWidth

  if (props.size) {
    delete next.height
    delete next.fontSize
  }

  return next
})

const suggestions = [
  '上海',
  '深圳',
  '杭州',
  '北京',
  '广州',
  '苏州',
  '南京',
  '成都',
  '武汉',
  '长沙'
]

const filteredSuggestions = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return suggestions

  return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value))
})

const canOpen = computed(() => !props.disabled && !props.readonly)

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', value)
  open.value = canOpen.value
}

const handleInput = (value: string | number) => {
  emit('input', value)
  open.value = canOpen.value
}

const handleChange = (value: string | number) => {
  emit('change', value)
}

const handleClear = () => {
  open.value = false
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  open.value = canOpen.value
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  window.setTimeout(() => {
    open.value = false
  }, 120)
  emit('blur', event)
}

const selectSuggestion = (suggestion: string) => {
  if (!canOpen.value) return

  emit('update:modelValue', suggestion)
  emit('input', suggestion)
  emit('change', suggestion)
  open.value = false
}
</script>

<template>
  <div
    class="x-autocomplete"
    :class="{
      'is-open': open,
      'is-disabled': props.disabled,
      'is-auto-width': props.autoWidth,
      'is-active-border-hidden': !props.showActiveBorder
    }"
    :style="autocompleteStyle"
  >
    <XInput
      v-bind="{ ...inputAttrs, ...inputProps }"
      @update:model-value="handleUpdate"
      @input="handleInput"
      @change="handleChange"
      @clear="handleClear"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </XInput>

    <div v-show="open" class="x-autocomplete__dropdown" role="listbox">
      <button
        v-for="suggestion in filteredSuggestions"
        :key="suggestion"
        class="x-autocomplete__option"
        type="button"
        role="option"
        @mousedown.prevent
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </button>
      <div v-if="!filteredSuggestions.length" class="x-autocomplete__empty">暂无匹配数据</div>
    </div>
  </div>
</template>
