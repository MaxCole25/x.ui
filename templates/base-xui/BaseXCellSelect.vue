<script setup lang="ts">
import BaseXSelect from './BaseXSelect.vue'
import type { BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXCellSelect',
  inheritAttrs: false,
})

type CellSelectValue = string | number | boolean | Array<string | number | boolean> | undefined

const props = withDefaults(
  defineProps<{
    modelValue?: CellSelectValue
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
    size?: BaseXSize
    textAlign?: 'left' | 'center' | 'right'
  }>(),
  {
    modelValue: undefined,
    placeholder: '请选择',
    disabled: false,
    readonly: false,
    clearable: false,
    multiple: false,
    size: undefined,
    textAlign: 'left',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: CellSelectValue]
  change: [value: CellSelectValue]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <span
    class="base-x-cell-control base-x-cell-select"
    @mousedown.stop
    @click.stop
    @dblclick.stop
    @keydown.stop
  >
    <BaseXSelect
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :clearable="props.clearable"
      :multiple="props.multiple"
      :size="props.size"
      :text-align="props.textAlign"
      :show-active-border="false"
      height="100%"
      padding="0 4px"
      radius="0"
      background-color="transparent"
      border-color="transparent"
      active-border-color="transparent"
      disabled-background-color="transparent"
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event as CellSelectValue)"
      @change="emit('change', $event as CellSelectValue)"
      @clear="emit('clear')"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <slot></slot>
    </BaseXSelect>
  </span>
</template>

<style scoped>
.base-x-cell-control {
  display: inline-flex;
  width: 100%;
}

.base-x-cell-select {
  min-height: 22px;
}

.base-x-cell-select :deep(.x-base-input) {
  border-radius: 0;
}
</style>
