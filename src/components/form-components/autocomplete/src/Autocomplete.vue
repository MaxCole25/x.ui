<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { inputSizePreset } from '../../../_utils/inputSize'
import { XBaseInput } from '../../../basic-components/base-input'
import { formContextKey } from '../../form/src/context'
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
  valueOnInput: true,
  clearModelValueOnInput: false,
  autoWidth: false,
  textAlign: 'center',
  options: () => [],
  fieldNames: () => ({}),
  displayField: 'label',
  remote: false,
  remoteTrigger: 'input',
  remoteDebounce: 200,
  remoteMinLength: 0,
  dropdownMaxHeight: 260,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无匹配数据',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'update:inputValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  query: [keyword: string]
  select: [option: AutocompleteOption]
}>()

const attrs = useAttrs()
const form = inject(formContextKey, null)

const open = ref(false)
const currentInputValue = ref('')
const remoteOptions = ref<AutocompleteOption[]>([])
const remoteLoading = ref(false)
const queryTimer = ref<number>()
const activeOptionIndex = ref(-1)
let queryRequestId = 0
const maxVisibleOptionCount = 50
const displayInputValue = computed(() => props.inputValue ?? props.modelValue ?? '')
const keyword = computed(() => currentInputValue.value)
const mergedSize = computed<AutocompleteSize>(() => props.size ?? form?.size.value ?? 'md')
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))

const optionFontSize = computed(() => {
  if (props.size) return inputSizePreset[props.size].fontSize

  return props.fontSize ?? inputSizePreset[mergedSize.value].fontSize
})

const optionPadding = computed(() => {
  if (props.size) return inputSizePreset[props.size].padding
  if (props.padding) return props.padding

  return inputSizePreset[mergedSize.value].padding
})

const autocompleteStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-autocomplete-color': props.color ?? props.activeBorderColor,
  '--x-autocomplete-active-border-color': props.activeBorderColor ?? props.color,
  '--x-autocomplete-option-font-size': toCssSize(optionFontSize.value),
  '--x-autocomplete-option-padding': toCssSize(optionPadding.value),
  '--x-autocomplete-dropdown-max-height': toCssSize(props.dropdownMaxHeight)
}))
const inputAttrs = computed(() => {
  const {
    type,
    ...rest
  } = attrs as Record<string, unknown>

  return rest
})

const inputProps = computed(() => {
  const preset = inputSizePreset[mergedSize.value]
  const usesExplicitSize = props.size != null
  const next: Record<string, unknown> = {
    ...props,
    modelValue: displayInputValue.value,
    type: 'text',
    disabled: mergedDisabled.value,
    size: mergedSize.value,
    fontSize: usesExplicitSize ? preset.fontSize : props.fontSize ?? preset.fontSize,
    height: usesExplicitSize ? preset.height : props.height ?? preset.height,
    padding: usesExplicitSize ? preset.padding : props.padding ?? preset.padding,
    radius: usesExplicitSize ? preset.radius : props.radius ?? preset.radius
  }

  delete next.inputValue
  delete next.valueOnInput
  delete next.clearModelValueOnInput
  delete next.autoWidth
  delete next.options
  delete next.fieldNames
  delete next.displayField
  delete next.remote
  delete next.remoteMethod
  delete next.remoteTrigger
  delete next.remoteDebounce
  delete next.remoteMinLength
  delete next.dropdownMaxHeight
  delete next.loading
  delete next.loadingText
  delete next.emptyText

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
const getOptionDisplayText = (option: AutocompleteOption) => String(option[props.displayField])
const allOptions = computed(() => {
  if (props.remote) {
    return remoteOptions.value.length ? remoteOptions.value : propOptions.value
  }

  return propOptions.value.length ? propOptions.value : defaultSuggestions
})

const filteredOptions = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return allOptions.value

  return allOptions.value.filter((suggestion) => getOptionDisplayText(suggestion).toLowerCase().includes(value))
})

const visibleOptions = computed(() => filteredOptions.value.slice(0, maxVisibleOptionCount))

const canOpen = computed(() => !mergedDisabled.value && !props.readonly)
const isLoading = computed(() => props.loading || remoteLoading.value)
const activeSuggestion = computed(() => visibleOptions.value[activeOptionIndex.value])

const readOptions = (options: AutocompleteOption[]) =>
  options.map((option) => ({
    ...option
  }))

const runRemoteQuery = async (value: string) => {
  if (!props.remote) return
  if (value.length < props.remoteMinLength) {
    remoteOptions.value = []
    activeOptionIndex.value = -1
    return
  }

  emit('query', value)
  open.value = canOpen.value
  if (!props.remoteMethod) return

  const requestId = ++queryRequestId
  remoteLoading.value = true

  try {
    const result = await props.remoteMethod(value)
    if (requestId !== queryRequestId || !Array.isArray(result)) return
    remoteOptions.value = result.map(normalizeOption)
    activeOptionIndex.value = getFirstEnabledOptionIndex()
  } finally {
    if (requestId === queryRequestId) {
      remoteLoading.value = false
    }
  }
}

const scheduleRemoteQuery = (value: string) => {
  if (!props.remote || props.remoteTrigger !== 'input') return

  if (queryTimer.value) {
    window.clearTimeout(queryTimer.value)
  }

  queryTimer.value = window.setTimeout(() => {
    queryTimer.value = undefined
    void runRemoteQuery(value)
  }, props.remoteDebounce)
}

const handleUpdate = (value: string | number) => {
  currentInputValue.value = String(value)
  emit('update:inputValue', value)
  if (props.clearModelValueOnInput && value !== props.inputValue) {
    emit('update:modelValue', '')
  } else if (props.valueOnInput) {
    emit('update:modelValue', value)
  }
  activeOptionIndex.value = -1
  open.value = canOpen.value
}

const handleInput = (value: string | number) => {
  currentInputValue.value = String(value)
  emit('input', value)
  scheduleRemoteQuery(String(value))
  open.value = canOpen.value
}

const handleChange = (value: string | number) => {
  emit('change', value)
}

const handleClear = () => {
  currentInputValue.value = ''
  open.value = false
  activeOptionIndex.value = -1
  emit('update:inputValue', '')
  if (!props.valueOnInput) {
    emit('update:modelValue', '')
    emit('input', '')
  }
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement | null
  currentInputValue.value = String(target?.value ?? displayInputValue.value)
  open.value = canOpen.value
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  window.setTimeout(() => {
    open.value = false
    activeOptionIndex.value = -1
  }, 120)
  emit('blur', event)
}

const getFirstEnabledOptionIndex = () => visibleOptions.value.findIndex((option) => !option.disabled)

const moveActiveOption = (direction: 1 | -1) => {
  const options = visibleOptions.value
  if (!options.length) {
    activeOptionIndex.value = -1
    return
  }

  const start = activeOptionIndex.value
  for (let offset = 1; offset <= options.length; offset += 1) {
    const nextIndex = (start + direction * offset + options.length) % options.length
    if (!options[nextIndex].disabled) {
      activeOptionIndex.value = nextIndex
      return
    }
  }

  activeOptionIndex.value = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!canOpen.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    open.value = true
    moveActiveOption(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    open.value = true
    moveActiveOption(-1)
    return
  }

  if (event.key !== 'Enter') return

  if (open.value && activeSuggestion.value && !activeSuggestion.value.disabled) {
    event.preventDefault()
    selectSuggestion(activeSuggestion.value)
    return
  }

  if (props.remote && props.remoteTrigger === 'enter') {
    event.preventDefault()
    const target = event.target as HTMLInputElement | null
    void runRemoteQuery(String(target?.value ?? keyword.value))
  }
}

const selectSuggestion = (suggestion: AutocompleteOption) => {
  if (!canOpen.value || suggestion.disabled) return

  const displayText = getOptionDisplayText(suggestion)
  emit('update:modelValue', suggestion.value)
  emit('update:inputValue', displayText)
  emit('input', displayText)
  emit('change', suggestion.value)
  emit('select', suggestion)
  activeOptionIndex.value = -1
  open.value = false
}

watch(visibleOptions, (options) => {
  if (activeOptionIndex.value >= options.length || options[activeOptionIndex.value]?.disabled) {
    activeOptionIndex.value = -1
  }
})

watch(
  displayInputValue,
  (value) => {
    currentInputValue.value = String(value)
  },
  { immediate: true }
)

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
      'is-disabled': mergedDisabled,
      'is-auto-width': props.autoWidth,
      'is-active-border-hidden': !props.showActiveBorder
    }"
    :style="autocompleteStyle"
  >
    <XBaseInput
      v-bind="{ ...inputAttrs, ...inputProps }"
      @update:model-value="handleUpdate"
      @input="handleInput"
      @change="handleChange"
      @clear="handleClear"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </XBaseInput>

    <div v-show="open" class="x-autocomplete__dropdown" role="listbox">
      <div v-if="isLoading" class="x-autocomplete__empty">{{ props.loadingText }}</div>
      <template v-else>
        <button
          v-for="(suggestion, index) in visibleOptions"
          :key="String(suggestion.value)"
          class="x-autocomplete__option"
          :class="{ 'is-disabled': suggestion.disabled, 'is-active': index === activeOptionIndex }"
          type="button"
          role="option"
          :aria-selected="index === activeOptionIndex"
          :disabled="suggestion.disabled"
          @mousedown.prevent
          @click="selectSuggestion(suggestion)"
        >
          {{ getOptionDisplayText(suggestion) }}
        </button>
      </template>
      <div v-if="!isLoading && !visibleOptions.length" class="x-autocomplete__empty">{{ props.emptyText }}</div>
    </div>
  </div>
</template>
