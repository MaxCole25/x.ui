<script setup lang="ts">
import { computed } from 'vue'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { LoadingProps } from './types'

defineOptions({
  name: 'XLoading'
})

const props = withDefaults(defineProps<LoadingProps>(), {
  modelValue: false,
  text: '',
  fullscreen: false,
  lock: false,
  backgroundColor: 'rgba(255, 255, 255, 0.76)',
  textColor: '#1264f4',
  spinnerColor: '#1264f4',
  spinnerSize: 32,
  zIndex: overlayZIndex.loading
})

const loadingStyle = computed(() => ({
  '--x-loading-bg': props.backgroundColor,
  '--x-loading-text': props.textColor,
  '--x-loading-spinner': props.spinnerColor,
  '--x-loading-spinner-size': typeof props.spinnerSize === 'number' ? `${props.spinnerSize}px` : props.spinnerSize,
  '--x-loading-z-index': props.zIndex
}))
</script>

<template>
  <Teleport :disabled="!props.fullscreen" to="body">
    <div v-if="props.modelValue" class="x-loading" :class="{ 'is-fullscreen': props.fullscreen }" :style="loadingStyle" aria-live="polite" aria-busy="true">
      <div class="x-loading__spinner" aria-hidden="true"></div>
      <div v-if="props.text" class="x-loading__text">{{ props.text }}</div>
    </div>
  </Teleport>
</template>
