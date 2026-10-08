<script setup lang="ts">
import { createFontStyle } from '../../../_utils/size'
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import type { TagProps } from './types'

defineOptions({
  name: 'XTag'
})

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'primary',
  effect: 'light',
  fontSize: 14,
  closable: false,
  round: false,
  hit: false,
  disabled: false
})

const emit = defineEmits<{
  close: [event: MouseEvent]
  click: [event: MouseEvent]
}>()

const mergedVariant = computed(() => props.variant ?? 'primary')
const tagStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-tag-color': props.accentColor
}))

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}

function handleClose(event: MouseEvent) {
  event.stopPropagation()
  if (!props.disabled) emit('close', event)
}
</script>

<template>
  <span
    class="x-tag"
    :class="[
      `x-tag--${mergedVariant}`,
      `x-tag--${props.effect}`,
      'x-tag',
      { 'is-round': props.round, 'is-hit': props.hit, 'is-disabled': props.disabled }
    ]"
    :style="[tagStyle, createFontStyle(props.fontSize ?? 14)]"
    @click="handleClick"
  >
    <span class="x-tag__content"><slot /></span>
    <button v-if="props.closable" class="x-tag__close" type="button" aria-label="关闭标签" @click="handleClose">×</button>
  </span>
</template>
