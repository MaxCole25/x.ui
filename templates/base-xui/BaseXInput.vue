<script setup lang="ts">
import { computed } from 'vue'
import { XInput } from 'x.ui'
import { useBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize, type BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXInput',
  inheritAttrs: false,
})

type BaseXInputValue = string | number | null
type BaseXInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'textarea'
const props = withDefaults(
  defineProps<{
    modelValue?: BaseXInputValue
    type?: BaseXInputType
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    size?: BaseXSize
    height?: number | string
    autoHeight?: boolean
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    clearable: true,
    size: undefined,
    height: undefined,
    autoHeight: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const normalizedModelValue = computed(() => props.modelValue ?? '')
const xInputType = computed(() => (props.type === 'textarea' ? 'text' : props.type))
const normalizedSize = computed(() => normalizeBaseXSize(props.size))
const themeTokens = useBaseXTheme()
</script>

<template>
  <XInput
    :model-value="normalizedModelValue"
    :type="xInputType"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :clearable="props.clearable"
    :height="props.height"
    :auto-height="props.autoHeight"
    :size="normalizedSize"
    :background-color="themeTokens.formControl.backgroundColor"
    :text-color="themeTokens.formControl.textColor"
    :border-color="themeTokens.formControl.borderColor"
    :active-border-color="themeTokens.formControl.activeBorderColor"
    :disabled-background-color="themeTokens.formControl.disabledBackgroundColor"
    :disabled-text-color="themeTokens.formControl.disabledTextColor"
    :clear-icon-color="themeTokens.formControl.clearIconColor"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
    @input="emit('input', $event)"
    @change="emit('change', $event)"
    @clear="emit('clear')"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </XInput>
</template>
