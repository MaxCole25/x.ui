<script setup lang="ts">
import BaseXInput from './BaseXInput.vue'
import type { BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXCellInput',
  inheritAttrs: false,
})

type CellInputValue = string | number | null
type CellInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'textarea'

const props = withDefaults(
  defineProps<{
    modelValue?: CellInputValue
    type?: CellInputType
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    size?: BaseXSize
    textAlign?: 'left' | 'center' | 'right'
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    clearable: true,
    size: undefined,
    textAlign: 'left',
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
</script>

<template>
  <span
    class="base-x-cell-control base-x-cell-input"
    @mousedown.stop
    @click.stop
    @dblclick.stop
    @keydown.stop
  >
    <BaseXInput
      :model-value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :clearable="props.clearable"
      :size="props.size"
      :text-align="props.textAlign"
      :height="'100%'"
      :show-active-border="false"
      background-color="transparent"
      border-color="transparent"
      active-border-color="transparent"
      disabled-background-color="transparent"
      radius="0"
      padding="0 4px"
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
    </BaseXInput>
  </span>
</template>

<style scoped>
.base-x-cell-control {
  display: inline-flex;
  width: 100%;
}

.base-x-cell-input {
  min-height: 22px;
}

.base-x-cell-input :deep(.x-base-input) {
  border-radius: 0;
}
</style>
