<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { SliderProps } from './types'

defineOptions({
  name: 'XSlider'
})

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const percent = computed(() => `${((props.modelValue - props.min) / (props.max - props.min)) * 100}%`)
const sliderStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-slider-percent': percent.value
}))

const update = (value: number) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="x-slider" :class="{ 'is-disabled': props.disabled }" :style="sliderStyle">
    <input
      :value="props.modelValue"
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="props.disabled"
      @input="update(Number(($event.target as HTMLInputElement).value))"
    />
    <span v-if="props.showValue" class="x-slider__value">{{ props.modelValue }}</span>
  </div>
</template>
