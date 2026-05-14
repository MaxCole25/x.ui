<script setup lang="ts">
import { computed, inject, onBeforeUnmount, provide, ref, useAttrs } from 'vue'
import { createElementStyleVars, toCssSize } from '../../_utils/elementStyle'
import { formContextKey, formItemContextKey } from '../../form/src/context'
import { selectContextKey, type SelectOptionRecord } from './context'
import type { SelectOptionSource, SelectOptionValue, SelectProps, SelectSize } from './types'

defineOptions({
  name: 'XSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  fieldNames: () => ({}),
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
const isOpen = ref(false)
const slotOptions = ref<SelectOptionRecord[]>([])
const remoteOptions = ref<SelectOptionRecord[]>([])
const remoteLoading = ref(false)
let remoteRequestId = 0
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const canInteract = computed(() => !mergedDisabled.value && !props.readonly)
const sizePreset: Record<SelectSize, Pick<SelectProps, 'fontSize' | 'height' | 'padding' | 'radius'>> = {
  sm: {
    fontSize: 10,
    height: 22,
    padding: '0 4px',
    radius: '4px'
  },
  md: {
    fontSize: 12,
    height: 30,
    padding: '0 8px',
    radius: '6px'
  },
  lg: {
    fontSize: 14,
    height: 38,
    padding: '0 10px',
    radius: '8px'
  }
}

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

const selectedLabels = computed(() =>
  selectedValues.value
    .map((value) => allOptions.value.find((option) => option.value === value)?.label)
    .filter(Boolean)
)

const selectedText = computed(() => selectedLabels.value.join('、'))
const showClear = computed(() =>
  props.clearable &&
  !props.hideClearButton &&
  selectedValues.value.length > 0 &&
  canInteract.value
)
const isLoading = computed(() => props.loading || remoteLoading.value)

const selectStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-select-color': props.color ?? props.activeBorderColor,
  '--x-select-active-border-color': props.activeBorderColor ?? props.color,
  '--x-select-border-color': props.borderColor,
  '--x-select-hover-border-color': props.borderColor,
  '--x-select-border-width': toCssSize(props.borderWidth),
  '--x-select-radius': props.radius ?? sizePreset[mergedSize.value].radius,
  '--x-select-bg': props.backgroundColor ?? props.background,
  '--x-select-text-color': props.textColor,
  '--x-select-disabled-bg': props.disabledBackgroundColor,
  '--x-select-disabled-text-color': props.disabledTextColor,
  '--x-select-font-family': props.fontFamily,
  '--x-select-font-size': toCssSize(props.fontSize ?? sizePreset[mergedSize.value].fontSize),
  '--x-select-height': props.autoHeight ? 'auto' : toCssSize(props.height ?? sizePreset[mergedSize.value].height),
  '--x-select-padding': toCssSize(props.padding ?? sizePreset[mergedSize.value].padding),
  '--x-select-text-align': props.textAlign,
  '--x-select-clear-icon-color': props.clearIconColor,
  '--x-select-clear-icon-size': toCssSize(props.clearIconSize)
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
  emit('clear')
}

const toggle = () => {
  if (!canInteract.value) return

  isOpen.value = !isOpen.value
  if (isOpen.value) {
    void runRemoteQuery()
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  window.setTimeout(() => {
    isOpen.value = false
  }, 120)
  emit('blur', event)
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
    v-bind="attrs"
    class="x-select"
    :class="[
      `x-select--${mergedSize}`,
      `x-select--${props.status}`,
      {
        'is-open': isOpen,
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
    >
      <span v-if="$slots.prefix || props.prefix" class="x-select__affix x-select__prefix">
        <slot name="prefix">{{ props.prefix }}</slot>
      </span>
      <span v-if="selectedLabels.length" class="x-select__value" :title="selectedText">
        {{ selectedText }}
      </span>
      <span v-else class="x-select__placeholder">{{ props.placeholder }}</span>
      <span
        v-if="showClear"
        class="x-select__clear"
        role="button"
        tabindex="-1"
        aria-label="清空"
        @mousedown.prevent
        @click.stop="clear"
      >
        <i class="ri-close-circle-line" aria-hidden="true"></i>
      </span>
      <span class="x-select__arrow" aria-hidden="true">
        <i class="ri-arrow-down-s-line"></i>
      </span>
      <span v-if="$slots.suffix || props.suffix" class="x-select__affix x-select__suffix">
        <slot name="suffix">{{ props.suffix }}</slot>
      </span>
    </button>
    <div v-show="isOpen" class="x-select__dropdown" role="listbox" :aria-multiselectable="props.multiple || undefined">
      <div v-if="isLoading" class="x-select__empty">{{ props.loadingText }}</div>
      <template v-else>
        <button
          v-for="option in displayOptions"
          :key="String(option.value)"
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
      <div v-if="!isLoading && !allOptions.length" class="x-select__empty">{{ props.emptyText }}</div>
    </div>
  </div>
</template>
