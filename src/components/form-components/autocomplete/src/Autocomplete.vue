<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { inputSizePreset } from '../../../_utils/inputSize'
import { overlayZIndex } from '../../../_utils/zIndex'
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
  dropdownMaxWidth: 360,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  dropdownBackgroundColor: '#ffffff',
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
const autocompleteRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const currentInputValue = ref('')
const remoteOptions = ref<AutocompleteOption[]>([])
const remoteLoading = ref(false)
const queryTimer = ref<number>()
const activeOptionIndex = ref(-1)
const dropdownPlacement = ref<'top' | 'bottom'>('bottom')
const teleportedDropdownStyle = ref<Record<string, string>>({})
let queryRequestId = 0
let skipNextEnterKeyup = false
let isListeningForPositionChanges = false
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
const resolvedDropdownZIndex = computed(() => props.zIndex ?? overlayZIndex.popper)

const autocompleteHeight = computed(() => {
  if (props.size) return inputSizePreset[props.size].height

  return props.height ?? inputSizePreset[mergedSize.value].height
})

const autocompleteStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-autocomplete-color': props.accentColor ?? props.activeBorderColor,
  '--x-autocomplete-active-border-color': props.activeBorderColor ?? props.accentColor,
  '--x-autocomplete-height': toCssSize(autocompleteHeight.value),
  '--x-autocomplete-option-font-size': toCssSize(optionFontSize.value),
  '--x-autocomplete-option-padding': toCssSize(optionPadding.value),
  '--x-autocomplete-dropdown-max-height': toCssSize(props.dropdownMaxHeight),
  '--x-autocomplete-dropdown-max-width': toCssSize(props.dropdownMaxWidth),
  '--x-autocomplete-dropdown-z-index': resolvedDropdownZIndex.value,
  '--x-autocomplete-dropdown-bg': props.dropdownBackgroundColor
}))
const rootClass = computed(() => attrs.class)
const rootStyle = computed(() => attrs.style)
const dropdownStyle = computed(() => ({
  ...autocompleteStyle.value,
  ...(props.teleported
    ? teleportedDropdownStyle.value
    : {
        zIndex: String(resolvedDropdownZIndex.value)
      })
}))
const dropdownClasses = computed(() => [
  'x-autocomplete__dropdown',
  'x-scrollbar--native',
  `x-autocomplete__dropdown--${dropdownPlacement.value}`,
  {
    'is-teleported': props.teleported
  }
])
const inputAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
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
    modelValue: currentInputValue.value,
    type: 'text',
    clearable: false,
    hideClearButton: true,
    disabled: mergedDisabled.value,
    size: mergedSize.value,
    fontSize: usesExplicitSize ? preset.fontSize : props.fontSize ?? preset.fontSize,
    height: usesExplicitSize ? preset.height : props.height ?? preset.height,
    padding: usesExplicitSize ? preset.padding : props.padding ?? preset.padding,
    radius: usesExplicitSize ? preset.radius : props.radius ?? preset.radius,
    suffix: undefined
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
  delete next.dropdownMaxWidth
  delete next.teleported
  delete next.teleportTo
  delete next.zIndex
  delete next.dropdownBackgroundColor
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
const showClear = computed(
  () =>
    Boolean(currentInputValue.value) &&
    Boolean(props.clearable) &&
    !props.hideClearButton &&
    !mergedDisabled.value &&
    !props.readonly
)
const inputSuffix = computed(() => {
  if (props.suffix === undefined || props.suffix === '') return undefined
  if (props.loading && String(props.suffix) === props.loadingText) return undefined

  return props.suffix
})

const readOptions = (options: AutocompleteOption[]) =>
  options.map((option) => ({
    ...option
  }))

const getCssPixelValue = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    if (Number.isFinite(parsed) && parsed > 0 && value.trim().endsWith('px')) {
      return parsed
    }
  }

  return fallback
}

const getDropdownMaxWidth = (viewportWidth: number, gap: number) => {
  const configuredMaxWidth = getCssPixelValue(props.dropdownMaxWidth, 360)
  return Math.min(configuredMaxWidth, viewportWidth - gap * 2)
}

const updateDropdownPosition = () => {
  if (!props.teleported || !open.value || !autocompleteRef.value) return

  const gap = 8
  const rect = autocompleteRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth
  const configuredMaxHeight = getCssPixelValue(props.dropdownMaxHeight, 260)
  const dropdownHeight = dropdownRef.value?.offsetHeight || configuredMaxHeight
  const spaceBelow = viewportHeight - rect.bottom - gap
  const spaceAbove = rect.top - gap
  const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
  const availableHeight = Math.max(gap, Math.floor(shouldOpenUp ? spaceAbove : spaceBelow))
  const maxHeight = Math.min(configuredMaxHeight, availableHeight)
  const contentWidth = dropdownRef.value?.scrollWidth ?? 0
  const dropdownMaxWidth = getDropdownMaxWidth(viewportWidth, gap)
  const width = Math.max(1, Math.min(Math.max(rect.width, contentWidth), dropdownMaxWidth))
  const left = Math.min(Math.max(rect.left, gap), Math.max(gap, viewportWidth - width - gap))
  const top = shouldOpenUp
    ? Math.max(gap, rect.top - gap - Math.min(dropdownHeight, maxHeight))
    : Math.min(Math.max(gap, rect.bottom + gap), Math.max(gap, viewportHeight - maxHeight - gap))

  dropdownPlacement.value = shouldOpenUp ? 'top' : 'bottom'
  teleportedDropdownStyle.value = {
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`,
    width: `${Math.round(width)}px`,
    maxWidth: `${Math.round(dropdownMaxWidth)}px`,
    maxHeight: `${Math.round(maxHeight)}px`,
    zIndex: String(resolvedDropdownZIndex.value)
  }
}

const addPositionListeners = () => {
  if (!props.teleported || isListeningForPositionChanges) return

  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, true)
  isListeningForPositionChanges = true
}

const removePositionListeners = () => {
  if (!isListeningForPositionChanges) return

  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
  isListeningForPositionChanges = false
}

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
    await nextTick()
    updateDropdownPosition()
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
  open.value = canOpen.value
  ensureActiveOption()
  void nextTick().then(updateDropdownPosition)
}

const handleInput = (value: string | number) => {
  currentInputValue.value = String(value)
  emit('input', value)
  scheduleRemoteQuery(String(value))
  open.value = canOpen.value
  ensureActiveOption()
  void nextTick().then(updateDropdownPosition)
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
  ensureActiveOption()
  void nextTick().then(updateDropdownPosition)
  emit('focus', event)
}

const openDropdown = () => {
  if (!canOpen.value) return
  open.value = true
  ensureActiveOption()
  void nextTick().then(updateDropdownPosition)
}

const handleBlur = (event: FocusEvent) => {
  window.setTimeout(() => {
    open.value = false
    activeOptionIndex.value = -1
  }, 120)
  emit('blur', event)
}

const getFirstEnabledOptionIndex = () => visibleOptions.value.findIndex((option) => !option.disabled)

const ensureActiveOption = () => {
  if (!open.value || isLoading.value) {
    activeOptionIndex.value = -1
    return
  }

  const currentOption = visibleOptions.value[activeOptionIndex.value]
  if (currentOption && !currentOption.disabled) {
    return
  }

  activeOptionIndex.value = getFirstEnabledOptionIndex()
}

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

const isEnterKey = (event: KeyboardEvent) => event.key === 'Enter' || event.code === 'Enter' || event.keyCode === 13

const handleEnter = (event: KeyboardEvent) => {
  if (open.value && activeSuggestion.value && !activeSuggestion.value.disabled) {
    event.preventDefault()
    selectSuggestion(activeSuggestion.value)
    return true
  }

  if (props.remote && props.remoteTrigger === 'enter') {
    event.preventDefault()
    const target = event.target as HTMLInputElement | null
    void runRemoteQuery(String(target?.value ?? keyword.value))
    return true
  }

  return false
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

  if (!isEnterKey(event)) return
  if (event.isComposing) return

  if (handleEnter(event)) {
    skipNextEnterKeyup = true
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (!canOpen.value || !isEnterKey(event)) return
  if (skipNextEnterKeyup) {
    skipNextEnterKeyup = false
    return
  }
  if (event.isComposing) return

  handleEnter(event)
}

const selectSuggestion = (suggestion: AutocompleteOption) => {
  if (!canOpen.value || suggestion.disabled) return

  const displayText = getOptionDisplayText(suggestion)
  currentInputValue.value = displayText
  emit('update:modelValue', suggestion.value)
  emit('update:inputValue', displayText)
  emit('input', displayText)
  emit('change', suggestion.value)
  emit('select', suggestion)
  activeOptionIndex.value = -1
  open.value = false
}

watch(visibleOptions, () => {
  ensureActiveOption()
})

watch(
  () => open.value,
  async (isOpen) => {
    if (!isOpen) {
      removePositionListeners()
      return
    }

    await nextTick()
    updateDropdownPosition()
    addPositionListeners()
  }
)

watch(
  () => props.teleported,
  async () => {
    removePositionListeners()
    await nextTick()
    if (open.value) {
      updateDropdownPosition()
      addPositionListeners()
    }
  }
)

watch(
  () => [
    visibleOptions.value.map((option) => getOptionDisplayText(option)).join('\u0000'),
    isLoading.value,
    props.dropdownMaxHeight,
    props.dropdownMaxWidth,
    resolvedDropdownZIndex.value
  ],
  async () => {
    if (!open.value) return
    await nextTick()
    updateDropdownPosition()
  }
)

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
  removePositionListeners()
  if (queryTimer.value) {
    window.clearTimeout(queryTimer.value)
  }
})
</script>

<template>
  <div
    ref="autocompleteRef"
    class="x-autocomplete"
    :class="[
      rootClass,
      {
        'is-open': open,
        'is-disabled': mergedDisabled,
        'is-auto-width': props.autoWidth,
        'is-active-border-hidden': !props.showActiveBorder
      }
    ]"
    :style="[autocompleteStyle, rootStyle]"
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
      @keyup="handleKeyup"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template #suffix>
        <span v-if="$slots.suffix || inputSuffix !== undefined" class="x-autocomplete__suffix">
          <slot name="suffix">{{ inputSuffix }}</slot>
        </span>
        <span class="x-autocomplete__indicator" @mousedown.prevent @click.stop="openDropdown">
          <button
            v-if="showClear"
            class="x-base-input__clear x-autocomplete__clear is-visible"
            type="button"
            aria-label="清空"
            @mousedown.prevent
            @click.stop="handleClear"
          >
            <i class="ri-close-circle-line" aria-hidden="true"></i>
          </button>
          <span class="x-autocomplete__arrow" aria-hidden="true">
            <i class="ri-arrow-down-s-line"></i>
          </span>
        </span>
      </template>
    </XBaseInput>

    <Teleport v-if="props.teleported" :to="props.teleportTo">
      <div v-show="open" ref="dropdownRef" :class="dropdownClasses" :style="dropdownStyle" role="listbox">
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
    </Teleport>

    <div v-else v-show="open" ref="dropdownRef" :class="dropdownClasses" :style="dropdownStyle" role="listbox">
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
