<script setup lang="ts">
import { computed, ref } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import type { AvatarProps } from './types'

defineOptions({
  name: 'XAvatar'
})

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  name: '',
  size: undefined,
  avatarSize: undefined,
  shape: 'circle'
})

const failed = ref(false)
const initials = computed(() => props.name.trim().slice(0, 2).toUpperCase())
const normalizedBorderWidth = computed(() => {
  if (props.borderWidth === undefined || props.borderWidth === null) {
    return undefined
  }

  return typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth
})
const mergedSize = computed(() => props.size ?? 'md')
const usesExplicitSize = computed(() => props.size != null)
const avatarSize = computed(() => (usesExplicitSize.value ? `${componentSizePreset[mergedSize.value].height}px` : toCssSize(props.avatarSize)))
const avatarStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-avatar-bg': props.color,
  '--x-avatar-border-width': normalizedBorderWidth.value,
  '--x-avatar-border-color': props.borderColor,
  '--x-avatar-text-color': props.textColor,
  '--x-avatar-custom-size': avatarSize.value
}))
</script>

<template>
  <span class="x-avatar" :class="[`x-avatar--${mergedSize}`, `x-avatar--${props.shape}`]" :style="avatarStyle">
    <img v-if="props.src && !failed" :src="props.src" :alt="props.alt || props.name" @error="failed = true" />
    <slot v-else>{{ initials || 'U' }}</slot>
  </span>
</template>
