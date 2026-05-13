<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { ColorPickerPanelProps } from './types'

defineOptions({
  name: 'XColorPickerPanel'
})

const props = withDefaults(defineProps<ColorPickerPanelProps>(), {
  modelValue: '#1264f4',
  colors: () => ['#1264f4', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#0891b2']
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const panelStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-color-picker-value': props.modelValue
}))

const commit = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="x-color-panel" :style="panelStyle">
    <div class="x-color-panel__preview" />
    <div class="x-color-panel__swatches">
      <button
        v-for="color in props.colors"
        :key="color"
        class="x-color-panel__swatch"
        :class="{ 'is-active': color.toLowerCase() === props.modelValue.toLowerCase() }"
        type="button"
        :style="{ backgroundColor: color }"
        :aria-label="`选择颜色 ${color}`"
        @click="commit(color)"
      />
    </div>
    <input :value="props.modelValue" class="x-color-panel__input" type="text" @input="commit(($event.target as HTMLInputElement).value)" />
  </div>
</template>
