<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { inputSizePreset } from '../../../_utils/inputSize'
import { overlayZIndex } from '../../../_utils/zIndex'
import { XBaseInput } from '../../../basic-components/base-input'
import { formContextKey, formItemContextKey } from '../../form/src/context'
import { selectContextKey, type SelectOptionRecord } from './context'
import type { SelectOptionSource, SelectOptionValue, SelectProps } from './types'

defineOptions({
  name: 'XSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  fieldNames: () => ({}),
  displayField: 'label',
  remote: false,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无数据',
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  multiple: false,
  status: 'default',
  size: undefined,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  dropdownMaxWidth: 360,
  dropdownBackgroundColor: '#ffffff',
  textAlign: 'left',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: SelectOptionValue | SelectOptionValue[] | undefined]
  change: [value: SelectOptionValue | SelectOptionValue[] | undefined]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  query: []
}>()

const attrs = useAttrs()
const form = inject(formContextKey, null)
const formItem = inject(formItemContextKey, null)
const selectRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isFocused = ref(false)
const activeOptionIndex = ref(-1)
const slotOptions = ref<SelectOptionRecord[]>([])
const remoteOptions = ref<SelectOptionRecord[]>([])
const remoteLoading = ref(false)
const dropdownPlacement = ref<'top' | 'bottom'>('bottom')
const teleportedDropdownStyle = ref<Record<string, string>>({})
let remoteRequestId = 0
let isListeningForPositionChanges = false
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const canInteract = computed(() => !mergedDisabled.value && !props.readonly)
const resolvedDropdownZIndex = computed(() => props.zIndex ?? overlayZIndex.popper)
const selectedValues = computed<SelectOptionValue[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue == null || props.modelValue === '' ? [] : [props.modelValue]
})

const normalizeOption = (option: SelectOptionSource): SelectOptionRecord => {
  const optionSource = option as Record<string, unknown>
  const labelKey = props.fieldNames.label ?? 'label'
  const valueKey = props.fieldNames.value ?? 'value'
  const disabledKey = props.fieldNames.disabled ?? 'disabled'
  const rawLabel = optionSource[labelKey]
  const rawValue = optionSource[valueKey]
  const label = rawLabel == null ? String(rawValue ?? '') : String(rawLabel)
  const value = rawValue == null ? label : rawValue
  const normalized: SelectOptionRecord = {
    label,
    value: value as SelectOptionValue
  }

  if (Object.prototype.hasOwnProperty.call(optionSource, disabledKey)) {
    normalized.disabled = Boolean(optionSource[disabledKey])
  }

  return normalized
}

const propOptions = computed<SelectOptionRecord[]>(() => props.options.map(normalizeOption))
const displayOptions = computed<SelectOptionRecord[]>(() => {
  if (props.remote) {
    return remoteOptions.value.length ? remoteOptions.value : propOptions.value
  }

  return propOptions.value
})
const allOptions = computed<SelectOptionRecord[]>(() => {
  const map = new Map<SelectOptionValue, SelectOptionRecord>()
  displayOptions.value.forEach((option) => map.set(option.value, option))
  slotOptions.value.forEach((option) => map.set(option.value, option))
  return Array.from(map.values())
})
const getOptionDisplayText = (option: SelectOptionRecord) => String(option[props.displayField])

const selectedLabels = computed(() =>
  selectedValues.value
    .map((value) => {
      const option = allOptions.value.find((item) => item.value === value)
      return option ? getOptionDisplayText(option) : undefined
    })
    .filter(Boolean)
)

const selectedText = computed(() => selectedLabels.value.join('、'))
const baseInputValue = computed(() => {
  if (!selectedValues.value.length) return ''
  return selectedText.value || selectedValues.value.map(String).join('、')
})
const showClear = computed(() =>
  props.clearable &&
  !props.hideClearButton &&
  selectedValues.value.length > 0 &&
  canInteract.value
)
const isLoading = computed(() => props.loading || remoteLoading.value)
const selectedSizePreset = computed(() => (props.size ? inputSizePreset[props.size] : undefined))
const resolvedInputFontSize = computed(() => selectedSizePreset.value?.fontSize ?? props.fontSize ?? inputSizePreset[mergedSize.value].fontSize)
const resolvedInputHeight = computed(() => selectedSizePreset.value?.height ?? props.height ?? inputSizePreset[mergedSize.value].height)
const resolvedInputPadding = computed(() => selectedSizePreset.value?.padding ?? props.padding ?? inputSizePreset[mergedSize.value].padding)
const resolvedInputRadius = computed(() => selectedSizePreset.value?.radius ?? props.radius ?? inputSizePreset[mergedSize.value].radius)

const selectStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-select-color': props.accentColor ?? props.activeBorderColor,
  '--x-select-active-border-color': props.activeBorderColor ?? props.accentColor,
  '--x-select-border-color': props.borderColor,
  '--x-select-hover-border-color': props.borderColor,
  '--x-select-border-width': toCssSize(props.borderWidth),
  '--x-select-radius': resolvedInputRadius.value,
  '--x-select-bg': props.inputBackgroundColor ?? props.backgroundColor,
  '--x-select-dropdown-bg': props.dropdownBackgroundColor,
  '--x-select-text-color': props.textColor,
  '--x-select-disabled-bg': props.disabledBackgroundColor,
  '--x-select-disabled-text-color': props.disabledTextColor,
  '--x-select-font-family': props.fontFamily,
  '--x-select-font-size': toCssSize(resolvedInputFontSize.value),
  '--x-select-height': props.autoHeight ? 'auto' : toCssSize(resolvedInputHeight.value),
  '--x-select-padding': toCssSize(resolvedInputPadding.value),
  '--x-select-text-align': props.textAlign,
  '--x-select-dropdown-z-index': resolvedDropdownZIndex.value,
  '--x-select-clear-icon-color': props.clearIconColor,
  '--x-select-clear-icon-size': toCssSize(props.clearIconSize)
}))

const baseInputProps = computed(() => ({
  modelValue: baseInputValue.value,
  placeholder: props.placeholder,
  disabled: mergedDisabled.value,
  readonly: props.readonly,
  clearable: false,
  hideClearButton: true,
  size: mergedSize.value,
  status: props.status,
  prefix: props.prefix,
  suffix: undefined,
  accentColor: props.accentColor,
  activeBorderColor: props.activeBorderColor ?? props.accentColor,
  clearIconColor: props.clearIconColor,
  clearIconSize: props.clearIconSize,
  disabledBackgroundColor: props.disabledBackgroundColor,
  disabledTextColor: props.disabledTextColor,
  fontFamily: props.fontFamily,
  fontSize: resolvedInputFontSize.value,
  height: resolvedInputHeight.value,
  autoHeight: props.autoHeight,
  padding: resolvedInputPadding.value,
  radius: resolvedInputRadius.value,
  textAlign: props.textAlign,
  inputBackgroundColor: props.inputBackgroundColor,
  backgroundColor: props.backgroundColor,
  textColor: props.textColor,
  borderWidth: props.borderWidth,
  borderColor: props.borderColor,
  showActiveBorder: props.showActiveBorder
}))

const dropdownStyle = computed(() => ({
  ...selectStyle.value,
  ...(props.teleported
    ? teleportedDropdownStyle.value
    : {
        maxWidth: toCssSize(props.dropdownMaxWidth),
        zIndex: String(resolvedDropdownZIndex.value)
      })
}))

const dropdownClasses = computed(() => [
  'x-select__dropdown',
  'x-scrollbar--native',
  `x-select__dropdown--${dropdownPlacement.value}`,
  {
    'is-teleported': props.teleported
  }
])
const enabledDisplayOptions = computed(() => displayOptions.value.filter((option) => !option.disabled))

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
  if (option.disabled || !canInteract.value) return

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

const getFirstEnabledOptionIndex = () => displayOptions.value.findIndex((option) => !option.disabled)

const getSelectedOptionIndex = () => displayOptions.value.findIndex((option) => selectedValues.value.includes(option.value) && !option.disabled)

const setInitialActiveOption = () => {
  activeOptionIndex.value = getSelectedOptionIndex()
  if (activeOptionIndex.value < 0) {
    activeOptionIndex.value = getFirstEnabledOptionIndex()
  }
}

const openDropdown = async () => {
  if (!canInteract.value) return

  if (!isOpen.value) {
    isOpen.value = true
    void runRemoteQuery()
  }

  if (activeOptionIndex.value < 0) {
    setInitialActiveOption()
  }

  await nextTick()
  scrollActiveOptionIntoView()
}

const moveActiveOption = async (step: 1 | -1) => {
  if (!enabledDisplayOptions.value.length) {
    activeOptionIndex.value = -1
    return
  }

  if (activeOptionIndex.value < 0 || displayOptions.value[activeOptionIndex.value]?.disabled) {
    activeOptionIndex.value = step > 0 ? -1 : displayOptions.value.length
  }

  for (let index = activeOptionIndex.value + step; index >= 0 && index < displayOptions.value.length; index += step) {
    if (!displayOptions.value[index]?.disabled) {
      activeOptionIndex.value = index
      await nextTick()
      scrollActiveOptionIntoView()
      return
    }
  }

  activeOptionIndex.value = step > 0 ? getFirstEnabledOptionIndex() : displayOptions.value.map((option) => !option.disabled).lastIndexOf(true)
  await nextTick()
  scrollActiveOptionIntoView()
}

const selectActiveOption = () => {
  const option = displayOptions.value[activeOptionIndex.value]
  if (!option) return
  selectOption(option)
}

const scrollActiveOptionIntoView = () => {
  const optionEl = dropdownRef.value?.querySelectorAll<HTMLElement>('.x-option')[activeOptionIndex.value]
  optionEl?.scrollIntoView({ block: 'nearest' })
}

const runRemoteQuery = async () => {
  if (!props.remote || !props.remoteMethod) return

  emit('query')
  const requestId = ++remoteRequestId
  remoteLoading.value = true

  try {
    const result = await props.remoteMethod()
    if (requestId !== remoteRequestId || !Array.isArray(result)) return
    remoteOptions.value = result.map(normalizeOption)
  } finally {
    if (requestId === remoteRequestId) {
      remoteLoading.value = false
    }
  }
}

const clear = () => {
  if (!showClear.value) return
  commit(props.multiple ? [] : undefined)
  activeOptionIndex.value = getFirstEnabledOptionIndex()
  emit('clear')
}

const toggle = () => {
  if (!canInteract.value) return

  isOpen.value = !isOpen.value
  if (isOpen.value) {
    setInitialActiveOption()
    void runRemoteQuery()
  }
}

const getDropdownMaxWidth = (viewportWidth: number, gap: number) => {
  const fallbackMaxWidth = 360
  const rawMaxWidth = props.dropdownMaxWidth

  if (typeof rawMaxWidth === 'number' && Number.isFinite(rawMaxWidth) && rawMaxWidth > 0) {
    return Math.min(rawMaxWidth, viewportWidth - gap * 2)
  }

  if (typeof rawMaxWidth === 'string') {
    const parsed = Number.parseFloat(rawMaxWidth)
    if (Number.isFinite(parsed) && parsed > 0 && rawMaxWidth.trim().endsWith('px')) {
      return Math.min(parsed, viewportWidth - gap * 2)
    }
  }

  return Math.min(fallbackMaxWidth, viewportWidth - gap * 2)
}

const updateDropdownPosition = () => {
  if (!props.teleported || !isOpen.value || !selectRef.value) return

  const gap = 8
  const rect = selectRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth
  const dropdownHeight = dropdownRef.value?.offsetHeight || 260
  const spaceBelow = viewportHeight - rect.bottom - gap
  const spaceAbove = rect.top - gap
  const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
  const availableHeight = Math.max(gap, Math.floor(shouldOpenUp ? spaceAbove : spaceBelow))
  const maxHeight = Math.min(260, availableHeight)
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
    maxWidth: toCssSize(props.dropdownMaxWidth) ?? '360px',
    maxHeight: `${maxHeight}px`,
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

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  window.setTimeout(() => {
    isOpen.value = false
  }, 120)
  emit('blur', event)
}

const close = () => {
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!canInteract.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) {
      void openDropdown()
      return
    }

    void moveActiveOption(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      void openDropdown()
      return
    }

    void moveActiveOption(-1)
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    if (!isOpen.value) {
      void openDropdown()
      return
    }

    selectActiveOption()
    return
  }

  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    close()
  }
}

const handleDocumentPointerdown = (event: PointerEvent) => {
  if (!isOpen.value) return

  const target = event.target
  if (!(target instanceof Node)) return
  if (selectRef.value?.contains(target)) return
  if (dropdownRef.value?.contains(target)) return

  close()
}

watch(
  () => isOpen.value,
  async (open) => {
    if (!open) {
      removePositionListeners()
      activeOptionIndex.value = -1
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
    if (isOpen.value) {
      updateDropdownPosition()
      addPositionListeners()
    }
  }
)

watch(
  () => [props.dropdownMaxWidth, resolvedDropdownZIndex.value],
  async () => {
    if (!isOpen.value) return
    await nextTick()
    updateDropdownPosition()
  }
)

watch(
  () => allOptions.value.map((option) => getOptionDisplayText(option)).join('\u0000'),
  async () => {
    if (!isOpen.value) return
    setInitialActiveOption()
    await nextTick()
    updateDropdownPosition()
  }
)

provide(selectContextKey, {
  multiple: props.multiple,
  selectedValues: () => selectedValues.value,
  getOptionDisplayText,
  registerOption,
  unregisterOption,
  selectOption
})

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerdown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerdown, true)
  removePositionListeners()
  close()
})
</script>

<template>
  <div
    ref="selectRef"
    v-bind="attrs"
    class="x-select"
    :class="[
      `x-select--${mergedSize}`,
      `x-select--${props.status}`,
      {
        'is-open': isOpen,
        'is-focused': isFocused,
        'is-disabled': mergedDisabled,
        'is-readonly': props.readonly,
        'is-multiple': props.multiple,
        'is-auto-width': props.autoWidth,
        'is-auto-height': props.autoHeight,
        'is-active-border-hidden': !props.showActiveBorder
      }
    ]"
    :style="selectStyle"
  >
    <XBaseInput
      v-bind="baseInputProps"
      class="x-select__base"
      @clear="clear"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template #inner>
        <button
          :id="props.id ?? formItem?.id"
          class="x-select__control"
          type="button"
          :disabled="mergedDisabled"
          :name="props.name"
          :aria-expanded="isOpen"
          :aria-readonly="props.readonly || undefined"
          aria-haspopup="listbox"
          @focus="handleFocus"
          @click="toggle"
          @blur="handleBlur"
          @keydown="handleKeydown"
        >
          <span v-if="selectedLabels.length" class="x-select__value" :title="selectedText">
            {{ selectedText }}
          </span>
          <span v-else class="x-select__placeholder">{{ props.placeholder }}</span>
        </button>
      </template>
      <template #suffix>
        <span v-if="$slots.suffix || props.suffix !== undefined" class="x-select__suffix">
          <slot name="suffix">{{ props.suffix }}</slot>
        </span>
        <span class="x-select__indicator" @mousedown.prevent @click.stop="toggle">
          <button
            v-if="showClear"
            class="x-base-input__clear x-select__clear is-visible"
            type="button"
            aria-label="清空"
            @mousedown.prevent
            @click.stop="clear"
          >
            <i class="ri-close-circle-line" aria-hidden="true"></i>
          </button>
          <span class="x-select__arrow" aria-hidden="true">
            <i class="ri-arrow-down-s-line"></i>
          </span>
        </span>
      </template>
    </XBaseInput>
    <Teleport v-if="props.teleported" :to="props.teleportTo">
      <div
        v-show="isOpen"
        ref="dropdownRef"
        :class="dropdownClasses"
        :style="dropdownStyle"
        role="listbox"
        :aria-multiselectable="props.multiple || undefined"
      >
        <div v-if="isLoading" class="x-select__empty">{{ props.loadingText }}</div>
        <template v-else>
          <button
            v-for="(option, index) in displayOptions"
            :key="String(option.value)"
            class="x-option"
            :class="{ 'is-selected': selectedValues.includes(option.value), 'is-disabled': option.disabled, 'is-active': index === activeOptionIndex }"
            type="button"
            role="option"
            :aria-selected="selectedValues.includes(option.value)"
            :disabled="option.disabled"
            @mousedown.prevent
            @click="selectOption(option)"
          >
            <span class="x-option__label">{{ getOptionDisplayText(option) }}</span>
            <span v-if="selectedValues.includes(option.value)" class="x-option__check">✓</span>
          </button>
        </template>
        <slot />
        <div v-if="!isLoading && !allOptions.length" class="x-select__empty">{{ props.emptyText }}</div>
      </div>
    </Teleport>
    <div
      v-else
      v-show="isOpen"
      ref="dropdownRef"
      :class="dropdownClasses"
      :style="dropdownStyle"
      role="listbox"
      :aria-multiselectable="props.multiple || undefined"
    >
      <div v-if="isLoading" class="x-select__empty">{{ props.loadingText }}</div>
      <template v-else>
        <button
          v-for="(option, index) in displayOptions"
          :key="String(option.value)"
          class="x-option"
          :class="{ 'is-selected': selectedValues.includes(option.value), 'is-disabled': option.disabled, 'is-active': index === activeOptionIndex }"
          type="button"
          role="option"
          :aria-selected="selectedValues.includes(option.value)"
          :disabled="option.disabled"
          @mousedown.prevent
          @click="selectOption(option)"
        >
          <span class="x-option__label">{{ getOptionDisplayText(option) }}</span>
          <span v-if="selectedValues.includes(option.value)" class="x-option__check">✓</span>
        </button>
      </template>
      <slot />
      <div v-if="!isLoading && !allOptions.length" class="x-select__empty">{{ props.emptyText }}</div>
    </div>
  </div>
</template>
