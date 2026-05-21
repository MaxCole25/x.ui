<script setup lang="ts">
import BaseXInputNumber from './BaseXInputNumber.vue'
import type { BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXCellInputNumber',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    disabled?: boolean
    readonly?: boolean
    size?: BaseXSize
  }>(),
  {
    modelValue: null,
    disabled: false,
    readonly: false,
    size: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  change: [value: number | null]
}>()
</script>

<template>
  <span
    class="base-x-cell-control base-x-cell-input-number"
    @mousedown.stop
    @click.stop
    @dblclick.stop
    @keydown.stop
  >
    <BaseXInputNumber
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :size="props.size"
      :show-active-border="false"
      height="100%"
      border-radius="0"
      border-color="transparent"
      active-border-color="transparent"
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />
  </span>
</template>

<style scoped>
.base-x-cell-control {
  display: inline-flex;
  width: 100%;
}

.base-x-cell-input-number {
  min-height: 22px;
}

.base-x-cell-input-number :deep(.x-input-number) {
  border-radius: 0;
}
</style>
