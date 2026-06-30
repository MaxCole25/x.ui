<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
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

interface HsvColor {
  h: number
  s: number
  v: number
}

const colorFieldRef = ref<HTMLElement>()
const hueSliderRef = ref<HTMLElement>()
const activeHue = ref(216)
const shouldSkipNextHueSync = ref(false)

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const normalizeHex = (value: string) => {
  const color = value.trim()
  const shortMatch = /^#?([0-9a-f]{3})$/i.exec(color)
  if (shortMatch) {
    return `#${shortMatch[1]
      .split('')
      .map((item) => item + item)
      .join('')
      .toLowerCase()}`
  }

  const longMatch = /^#?([0-9a-f]{6})$/i.exec(color)
  return longMatch ? `#${longMatch[1].toLowerCase()}` : ''
}

const hexToRgb = (value: string) => {
  const hex = normalizeHex(value)
  if (!hex) return null

  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16)
  }
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((item) => Math.round(item).toString(16).padStart(2, '0'))
    .join('')}`

const rgbToHsv = (r: number, g: number, b: number): HsvColor => {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  let h = 0

  if (delta !== 0) {
    if (max === red) h = ((green - blue) / delta) % 6
    else if (max === green) h = (blue - red) / delta + 2
    else h = (red - green) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }

  return {
    h,
    s: max === 0 ? 0 : delta / max,
    v: max
  }
}

const hsvToRgb = ({ h, s, v }: HsvColor) => {
  const chroma = v * s
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1))
  const match = v - chroma
  let r = 0
  let g = 0
  let b = 0

  if (h < 60) [r, g, b] = [chroma, x, 0]
  else if (h < 120) [r, g, b] = [x, chroma, 0]
  else if (h < 180) [r, g, b] = [0, chroma, x]
  else if (h < 240) [r, g, b] = [0, x, chroma]
  else if (h < 300) [r, g, b] = [x, 0, chroma]
  else [r, g, b] = [chroma, 0, x]

  return {
    r: (r + match) * 255,
    g: (g + match) * 255,
    b: (b + match) * 255
  }
}

const hsvToHex = (value: HsvColor) => {
  const rgb = hsvToRgb(value)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

const parsedHsv = computed(() => {
  const rgb = hexToRgb(props.modelValue)
  if (!rgb) {
    return {
      ...rgbToHsv(18, 100, 244),
      h: activeHue.value
    }
  }

  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
  return {
    ...hsv,
    h: activeHue.value
  }
})

watch(
  () => props.modelValue,
  (value) => {
    if (shouldSkipNextHueSync.value) {
      shouldSkipNextHueSync.value = false
      return
    }

    const rgb = hexToRgb(value)
    if (!rgb) return

    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    if (hsv.s !== 0 && hsv.v !== 0) {
      activeHue.value = hsv.h
    }
  },
  { immediate: true }
)

const hueColor = computed(() => hsvToHex({ h: parsedHsv.value.h, s: 1, v: 1 }))

const panelStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-color-picker-value': normalizeHex(props.modelValue) || props.modelValue,
  '--x-color-picker-hue': hueColor.value,
  '--x-color-picker-field-x': `${parsedHsv.value.s * 100}%`,
  '--x-color-picker-field-y': `${(1 - parsedHsv.value.v) * 100}%`,
  '--x-color-picker-hue-x': `${(parsedHsv.value.h / 360) * 100}%`
}))

const commit = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const commitHsv = (value: HsvColor, options: { syncHueFromModelValue?: boolean } = {}) => {
  activeHue.value = ((value.h % 360) + 360) % 360
  shouldSkipNextHueSync.value = options.syncHueFromModelValue === false
  commit(hsvToHex({
    h: activeHue.value,
    s: clamp(value.s),
    v: clamp(value.v)
  }))
}

const updateFromColorField = (event: PointerEvent) => {
  const rect = colorFieldRef.value?.getBoundingClientRect()
  if (!rect) return

  commitHsv({
    h: activeHue.value,
    s: clamp((event.clientX - rect.left) / rect.width),
    v: 1 - clamp((event.clientY - rect.top) / rect.height)
  }, { syncHueFromModelValue: false })
}

const updateFromHueSlider = (event: PointerEvent) => {
  const rect = hueSliderRef.value?.getBoundingClientRect()
  if (!rect) return

  commitHsv({
    h: clamp((event.clientX - rect.left) / rect.width) * 360,
    s: parsedHsv.value.s,
    v: parsedHsv.value.v
  }, { syncHueFromModelValue: false })
}

const startDrag = (event: PointerEvent, update: (event: PointerEvent) => void) => {
  event.preventDefault()
  update(event)

  const handleMove = (moveEvent: PointerEvent) => update(moveEvent)
  const stopDrag = () => {
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', stopDrag)
  }

  window.addEventListener('pointermove', handleMove)
  window.addEventListener('pointerup', stopDrag)
}
</script>

<template>
  <div class="x-color-panel" :style="panelStyle">
    <div class="x-color-panel__preview" />
    <div
      ref="colorFieldRef"
      class="x-color-panel__field"
      role="slider"
      tabindex="0"
      aria-label="选择颜色深浅和明暗"
      :aria-valuetext="props.modelValue"
      @pointerdown="startDrag($event, updateFromColorField)"
    >
      <span class="x-color-panel__field-thumb" />
    </div>
    <div
      ref="hueSliderRef"
      class="x-color-panel__hue"
      role="slider"
      tabindex="0"
      aria-label="选择主色系"
      :aria-valuenow="Math.round(parsedHsv.h)"
      aria-valuemin="0"
      aria-valuemax="360"
      @pointerdown="startDrag($event, updateFromHueSlider)"
    >
      <span class="x-color-panel__hue-thumb" />
    </div>
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
