<script setup lang="ts">
import { computed, ref } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { AvatarProps } from './types'

defineOptions({
  name: 'XAvatar'
})

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: '',
  name: '',
  size: 'md',
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
const avatarStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-avatar-bg': props.color,
  '--x-avatar-border-width': normalizedBorderWidth.value,
  '--x-avatar-border-color': props.borderColor,
  '--x-avatar-text-color': props.textColor
}))
</script>

<template>
  <span class="x-avatar" :class="[`x-avatar--${props.size}`, `x-avatar--${props.shape}`]" :style="avatarStyle">
    <img v-if="props.src && !failed" :src="props.src" :alt="props.alt || props.name" @error="failed = true" />
    <slot v-else>{{ initials || 'U' }}</slot>
  </span>
</template>
