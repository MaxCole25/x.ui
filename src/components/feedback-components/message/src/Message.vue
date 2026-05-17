<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type { MessageProps } from './types'

defineOptions({
  name: 'XMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  message: '',
  type: 'info',
  size: undefined,
  duration: 3000,
  showClose: false,
  plain: false,
  round: false,
  center: false,
  offset: 20,
  placement: 'top',
  zIndex: 2100
})

const emit = defineEmits<{
  close: []
}>()

let timer: number | undefined

const defaultIcon = computed(() => {
  const iconMap = {
    success: 'ri-checkbox-circle-fill',
    warning: 'ri-error-warning-fill',
    info: 'ri-information-fill',
    error: 'ri-close-circle-fill'
  }
  return props.icon || iconMap[props.type]
})
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const usesExplicitSize = computed(() => props.size != null)

const messageStyle = computed(() => ({
  '--x-message-offset': `${props.offset}px`,
  '--x-message-z-index': props.zIndex,
  '--x-message-bg': props.backgroundColor,
  '--x-message-text': props.textColor,
  '--x-message-border-color': props.borderColor,
  '--x-message-close-color': props.closeColor,
  '--x-message-icon-color': props.iconColor,
  '--x-message-width': typeof props.width === 'number' ? `${props.width}px` : props.width,
  '--x-message-min-width': typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth,
  '--x-message-max-width': typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
  '--x-message-padding': usesExplicitSize.value ? sizePreset.value.padding : props.padding,
  '--x-message-radius': usesExplicitSize.value ? sizePreset.value.radius : typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--x-message-font-size': `${sizePreset.value.fontSize}px`,
  '--x-message-min-height': `${sizePreset.value.height}px`,
  '--x-message-shadow': props.shadow
}))

function close() {
  emit('close')
}

function stopTimer() {
  window.clearTimeout(timer)
}

function startTimer() {
  stopTimer()
  if (props.duration > 0) {
    timer = window.setTimeout(close, props.duration)
  }
}

onMounted(startTimer)

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <div
    class="x-message"
    :class="[`x-message--${props.type}`, `x-message--${props.placement}`, `x-message--${mergedSize}`, { 'is-plain': props.plain, 'is-round': props.round, 'is-center': props.center }]"
    :style="messageStyle"
    role="alert"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
  >
    <i class="x-message__icon" :class="defaultIcon" aria-hidden="true"></i>
    <div class="x-message__content">
      <slot>{{ props.message }}</slot>
    </div>
    <button v-if="props.showClose" class="x-message__close" type="button" aria-label="关闭消息" @click="close">×</button>
  </div>
</template>
