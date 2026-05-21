<script setup lang="ts">
import BaseXSwitch from './BaseXSwitch.vue'
import type { BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXCellSwitch',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    size?: BaseXSize
  }>(),
  {
    modelValue: false,
    disabled: false,
    size: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()
</script>

<template>
  <span
    class="base-x-cell-switch"
    @mousedown.stop
    @click.stop
    @dblclick.stop
    @keydown.stop
  >
    <BaseXSwitch
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :size="props.size"
      v-bind="$attrs"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />
  </span>
</template>

<style scoped>
.base-x-cell-switch {
  display: inline-flex;
  justify-content: center;
  width: 100%;
}
</style>
