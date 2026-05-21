<script setup lang="ts">
import BaseXDatePicker from './BaseXDatePicker.vue'
import type { BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXCellDatePicker',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string | Date | null
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    size?: BaseXSize
  }>(),
  {
    modelValue: null,
    placeholder: '请选择',
    disabled: false,
    readonly: false,
    clearable: true,
    size: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | null]
  change: [value: string | Date | null]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
</script>

<template>
  <span
    class="base-x-cell-control base-x-cell-date-picker"
    @mousedown.stop
    @click.stop
    @dblclick.stop
    @keydown.stop
  >
    <BaseXDatePicker
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :clearable="props.clearable"
      :size="props.size"
      :show-active-border="false"
      height="100%"
      padding="0 4px"
      radius="0"
      background-color="transparent"
      border-color="transparent"
      active-border-color="transparent"
      disabled-background-color="transparent"
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
      @clear="emit('clear')"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
  </span>
</template>

<style scoped>
.base-x-cell-control {
  display: inline-flex;
  width: 100%;
}

.base-x-cell-date-picker {
  min-height: 22px;
}

.base-x-cell-date-picker :deep(.x-base-input) {
  border-radius: 0;
}
</style>
