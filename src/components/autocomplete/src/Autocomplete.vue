<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import { XInput } from '../../input'
import type {
  AutocompleteOption,
  AutocompleteOptionSource,
  AutocompleteProps,
  AutocompleteSize
} from './types'

defineOptions({
  name: 'XAutocomplete',
  inheritAttrs: false
})

const props = withDefaults(defineProps<AutocompleteProps>(), {
  autoWidth: false,
  textAlign: 'center',
  options: () => [],
  fieldNames: () => ({}),
  remote: false,
  remoteDebounce: 200,
  remoteMinLength: 0,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无匹配数据'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  query: [keyword: string]
}>()

const attrs = useAttrs()

const open = ref(false)
const remoteOptions = ref<AutocompleteOption[]>([])
const remoteLoading = ref(false)
const queryTimer = ref<number>()
let queryRequestId = 0
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
  delete next.options
  delete next.fieldNames
  delete next.remote
  delete next.remoteMethod
  delete next.remoteDebounce
  delete next.remoteMinLength
  delete next.loading
  delete next.loadingText
  delete next.emptyText

  if (props.size) {
    delete next.height
    delete next.fontSize
  }

  return next
})

const defaultSuggestions: AutocompleteOption[] = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' },
  { label: '北京', value: '北京' },
  { label: '广州', value: '广州' },
  { label: '苏州', value: '苏州' },
  { label: '南京', value: '南京' },
  { label: '成都', value: '成都' },
  { label: '武汉', value: '武汉' },
  { label: '长沙', value: '长沙' }
]

const readOptionValue = (option: Record<string, unknown>, key: string) => option[key]

const normalizeOption = (option: AutocompleteOptionSource): AutocompleteOption => {
  if (typeof option === 'string') {
    return {
      label: option,
      value: option
    }
  }

  const optionSource = option as Record<string, unknown>
  const labelKey = props.fieldNames.label ?? 'label'
  const valueKey = props.fieldNames.value ?? 'value'
  const disabledKey = props.fieldNames.disabled ?? 'disabled'
  const rawLabel = readOptionValue(optionSource, labelKey)
  const rawValue = readOptionValue(optionSource, valueKey)
  const label = rawLabel == null ? String(rawValue ?? '') : String(rawLabel)
  const value = rawValue == null ? label : rawValue
  const normalized: AutocompleteOption = {
    label,
    value: typeof value === 'number' ? value : String(value)
  }

  if (Object.prototype.hasOwnProperty.call(optionSource, disabledKey)) {
    normalized.disabled = Boolean(readOptionValue(optionSource, disabledKey))
  }

  return normalized
}

const propOptions = computed(() => props.options.map(normalizeOption))
const allOptions = computed(() => {
  if (props.remote) {
    return remoteOptions.value.length ? remoteOptions.value : propOptions.value
  }

  return propOptions.value.length ? propOptions.value : defaultSuggestions
})

const visibleOptions = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (props.remote || !value) return allOptions.value

  return allOptions.value.filter((suggestion) => suggestion.label.toLowerCase().includes(value))
})

const canOpen = computed(() => !props.disabled && !props.readonly)
const isLoading = computed(() => props.loading || remoteLoading.value)

const readOptions = (options: AutocompleteOption[]) =>
  options.map((option) => ({
    ...option
  }))

const runRemoteQuery = async (value: string) => {
  if (!props.remote) return
  if (value.length < props.remoteMinLength) {
    remoteOptions.value = []
    return
  }

  emit('query', value)
  if (!props.remoteMethod) return

  const requestId = ++queryRequestId
  remoteLoading.value = true

  try {
    const result = await props.remoteMethod(value)
    if (requestId !== queryRequestId || !Array.isArray(result)) return
    remoteOptions.value = result.map(normalizeOption)
  } finally {
    if (requestId === queryRequestId) {
      remoteLoading.value = false
    }
  }
}

const scheduleRemoteQuery = (value: string) => {
  if (!props.remote) return

  if (queryTimer.value) {
    window.clearTimeout(queryTimer.value)
  }

  queryTimer.value = window.setTimeout(() => {
    queryTimer.value = undefined
    void runRemoteQuery(value)
  }, props.remoteDebounce)
}

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', value)
  open.value = canOpen.value
}

const handleInput = (value: string | number) => {
  emit('input', value)
  scheduleRemoteQuery(String(value))
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

const selectSuggestion = (suggestion: AutocompleteOption) => {
  if (!canOpen.value || suggestion.disabled) return

  emit('update:modelValue', suggestion.value)
  emit('input', suggestion.value)
  emit('change', suggestion.value)
  open.value = false
}

defineExpose({
  getOptions: () => readOptions(allOptions.value),
  getVisibleOptions: () => readOptions(visibleOptions.value)
})

onBeforeUnmount(() => {
  if (queryTimer.value) {
    window.clearTimeout(queryTimer.value)
  }
})
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
      <div v-if="isLoading" class="x-autocomplete__empty">{{ props.loadingText }}</div>
      <template v-else>
        <button
          v-for="suggestion in visibleOptions"
          :key="String(suggestion.value)"
          class="x-autocomplete__option"
          :class="{ 'is-disabled': suggestion.disabled }"
          type="button"
          role="option"
          :disabled="suggestion.disabled"
          @mousedown.prevent
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.label }}
        </button>
      </template>
      <div v-if="!isLoading && !visibleOptions.length" class="x-autocomplete__empty">{{ props.emptyText }}</div>
    </div>
  </div>
</template>
