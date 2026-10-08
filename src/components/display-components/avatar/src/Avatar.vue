<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
import { XIcon } from '../../../basic-components/icon'
import type { AvatarProps } from './types'

defineOptions({
  name: 'XAvatar'
})

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  name: '',
  icon: '',
  iconVariant: 'line',
  iconFull: false,
  iconColor: undefined,
  iconTitle: undefined,
  iconSpin: false,
  fontSize: undefined,
  avatarSize: undefined,
  shape: 'circle'
})

const slots = useSlots()
const failed = ref(false)
watch(() => props.src, () => {
  failed.value = false
})
const initials = computed(() => props.name.trim().slice(0, 2).toUpperCase())
const hasDefaultSlot = computed(() => Boolean(slots.default))
const normalizedBorderWidth = computed(() => {
  if (props.borderWidth === undefined || props.borderWidth === null) {
    return undefined
  }

  return typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth
})
const mergedSize = computed(() => props.fontSize ?? 14)
const presetAvatarSize = computed(() => `${getComponentMetrics(mergedSize.value).height}px`)
const avatarSize = computed(() => (toCssSize(props.avatarSize)))
const resolvedAvatarSize = computed(() => avatarSize.value ?? presetAvatarSize.value)
const avatarIconSize = computed(() => {
  if (props.iconFull) return resolvedAvatarSize.value
  if (typeof props.avatarSize === 'number') return `${Math.round(props.avatarSize * 0.56)}px`
  if (typeof props.avatarSize === 'string') return `calc(${props.avatarSize} * 0.56)`
  return `${Math.round(getComponentMetrics(mergedSize.value).height * 0.56)}px`
})
const avatarStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-avatar-bg': props.avatarBackgroundColor,
  '--x-avatar-border-width': normalizedBorderWidth.value,
  '--x-avatar-border-color': props.borderColor,
  '--x-avatar-text-color': props.textColor,
  '--x-avatar-custom-size': resolvedAvatarSize.value,
  '--x-icon-size': avatarIconSize.value
}))
</script>

<template>
  <span class="x-avatar" :class="['x-avatar', `x-avatar--${props.shape}`]" :style="[avatarStyle, createFontStyle(mergedSize)]">
    <img v-if="props.src && !failed" :src="props.src" :alt="props.alt || props.name" @error="failed = true" />
    <slot v-else-if="hasDefaultSlot" />
    <XIcon
      v-else-if="props.icon"
      :name="props.icon"
      :variant="props.iconVariant"
      :color="props.iconColor"
      :title="props.iconTitle"
      :spin="props.iconSpin"
    />
    <template v-else>{{ initials || 'U' }}</template>
  </span>
</template>
