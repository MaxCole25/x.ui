<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import { computed, inject, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey, formItemContextKey } from '../../../form-components/form/src/context'
import type { BaseInputProps } from './types'

defineOptions({
  name: 'XBaseInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  formatOnBlur: true,
  autoHeight: false,
  hideClearButton: false,
  size: undefined,
  status: 'default',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const form = inject(formContextKey, null)
const formItem = inject(formItemContextKey, null)

const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const nativeId = computed(() => props.id ?? formItem?.id)
const inputValue = computed(() => props.modelValue ?? '')
const hasValue = computed(() => inputValue.value !== '')
const isFocused = ref(false)
const hasFormatter = computed(() => typeof props.formatter === 'function')
const effectiveType = computed(() => (hasFormatter.value && props.type === 'number' ? 'text' : props.type))

const inputStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-base-input-color': props.color,
  '--x-base-input-active-border-color': props.activeBorderColor ?? props.color,
  '--x-base-input-border-color': props.borderColor,
  '--x-base-input-border-width': toCssSize(props.borderWidth),
  '--x-base-input-clear-icon-color': props.clearIconColor,
  '--x-base-input-clear-icon-size': toCssSize(props.clearIconSize),
  '--x-base-input-disabled-bg': props.disabledBackgroundColor,
  '--x-base-input-disabled-text-color': props.disabledTextColor,
  '--x-base-input-radius': props.radius,
  '--x-base-input-bg': props.backgroundColor ?? props.background,
  '--x-base-input-text-color': props.textColor,
  '--x-base-input-font-family': props.fontFamily,
  '--x-base-input-font-size': toCssSize(props.fontSize),
  '--x-base-input-height': props.autoHeight ? 'auto' : toCssSize(props.height),
  '--x-base-input-padding': toCssSize(props.padding),
  '--x-base-input-text-align': props.textAlign
}))

const formatValue = (value: string | number) => {
  return hasFormatter.value ? props.formatter!(value) : value
}

const displayValue = ref(formatValue(inputValue.value))

watch(
  () => [props.modelValue, props.formatter, props.formatOnBlur] as const,
  () => {
    if (!hasFormatter.value || !isFocused.value) {
      displayValue.value = formatValue(inputValue.value)
    }
  }
)

const readValue = (event: Event): string | number => {
  const target = event.target as HTMLInputElement
  if (props.parser) return props.parser(target.value)
  if (effectiveType.value !== 'number') return target.value

  return Number.isNaN(target.valueAsNumber) ? '' : target.valueAsNumber
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  displayValue.value = target.value
  const nextValue = readValue(event)
  emit('update:modelValue', nextValue)
  emit('input', nextValue)
}

const handleChange = (event: Event) => {
  emit('change', readValue(event))
}

const clear = () => {
  displayValue.value = ''
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  if (props.formatOnBlur) {
    displayValue.value = formatValue(readValue(event))
  }
  emit('blur', event)
}
</script>

<template>
  <div
    class="x-base-input"
    :class="[
      `x-base-input--${mergedSize}`,
      `x-base-input--${props.status}`,
      {
        'is-disabled': mergedDisabled,
        'is-readonly': props.readonly,
        'is-auto-height': props.autoHeight,
        'is-active-border-hidden': !props.showActiveBorder,
        'has-prefix': Boolean(props.prefix || $slots.prefix),
        'has-suffix': Boolean(props.suffix || $slots.suffix || (props.clearable && !props.hideClearButton && hasValue))
      }
    ]"
    :style="inputStyle"
  >
    <span v-if="props.prefix || $slots.prefix" class="x-base-input__affix x-base-input__prefix">
      <slot name="prefix">{{ props.prefix }}</slot>
    </span>
    <slot name="inner">
      <input
        v-bind="attrs"
        :id="nativeId"
        class="x-base-input__inner"
        :value="displayValue"
        :type="effectiveType"
        :name="props.name"
        :placeholder="props.placeholder"
        :disabled="mergedDisabled"
        :readonly="props.readonly"
        :maxlength="props.maxlength"
        :aria-invalid="props.status === 'error' ? 'true' : undefined"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </slot>
    <button
      v-if="props.clearable && !props.hideClearButton && hasValue && !mergedDisabled && !props.readonly"
      class="x-base-input__clear"
      type="button"
      aria-label="清空"
      @click="clear"
    >
      <i class="ri-close-circle-line" aria-hidden="true"></i>
    </button>
    <span v-if="props.suffix || $slots.suffix" class="x-base-input__affix x-base-input__suffix">
      <slot name="suffix">{{ props.suffix }}</slot>
    </span>
  </div>
</template>
