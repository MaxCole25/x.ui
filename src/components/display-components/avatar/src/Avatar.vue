<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
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
  size: undefined,
  avatarSize: undefined,
  shape: 'circle'
})

const slots = useSlots()
const failed = ref(false)
const initials = computed(() => props.name.trim().slice(0, 2).toUpperCase())
const hasDefaultSlot = computed(() => Boolean(slots.default))
const normalizedBorderWidth = computed(() => {
  if (props.borderWidth === undefined || props.borderWidth === null) {
    return undefined
  }

  return typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth
})
const mergedSize = computed(() => props.size ?? 'md')
const usesExplicitSize = computed(() => props.size != null)
const presetAvatarSize = computed(() => `${componentSizePreset[mergedSize.value].height}px`)
const avatarSize = computed(() => (usesExplicitSize.value ? presetAvatarSize.value : toCssSize(props.avatarSize)))
const resolvedAvatarSize = computed(() => avatarSize.value ?? presetAvatarSize.value)
const avatarIconSize = computed(() => {
  if (props.iconFull) return resolvedAvatarSize.value
  if (!usesExplicitSize.value && typeof props.avatarSize === 'number') return `${Math.round(props.avatarSize * 0.56)}px`
  if (!usesExplicitSize.value && typeof props.avatarSize === 'string') return `calc(${props.avatarSize} * 0.56)`
  return `${Math.round(componentSizePreset[mergedSize.value].height * 0.56)}px`
})
const avatarStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-avatar-bg': props.color,
  '--x-avatar-border-width': normalizedBorderWidth.value,
  '--x-avatar-border-color': props.borderColor,
  '--x-avatar-text-color': props.textColor,
  '--x-avatar-custom-size': avatarSize.value,
  '--x-icon-size': avatarIconSize.value
}))
</script>

<template>
  <span class="x-avatar" :class="[`x-avatar--${mergedSize}`, `x-avatar--${props.shape}`]" :style="avatarStyle">
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
