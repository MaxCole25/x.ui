<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { NotificationProps } from './types'

defineOptions({ name: 'XNotification' })

const props = withDefaults(defineProps<NotificationProps>(), { title: '', message: '', status: 'info', placement: 'top-right', duration: 4500, showClose: true, size: 'md', zIndex: overlayZIndex.message })
const emit = defineEmits<{ close: [] }>()
let timer: number | undefined
const preset = computed(() => componentSizePreset[props.size])
const styleVars = computed(() => ({ '--x-notification-font-size': preset.value.fontSize + 'px', '--x-notification-z-index': props.zIndex }))
function close() { window.clearTimeout(timer); emit('close') }
onMounted(() => { if (props.duration > 0) timer = window.setTimeout(close, props.duration) })
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <section class="x-notification" :class="['x-notification--' + props.status, 'x-notification--' + props.placement]" :style="styleVars" role="status">
    <div class="x-notification__main"><strong v-if="props.title" class="x-notification__title">{{ props.title }}</strong><p v-if="props.message || $slots.default" class="x-notification__message"><slot>{{ props.message }}</slot></p></div>
    <button v-if="props.showClose" class="x-notification__close" type="button" aria-label="关闭通知" @click="close">×</button>
  </section>
</template>

<style scoped>
.x-notification { --x-notification-color: var(--x-color-info); background: var(--x-color-surface); border: 1px solid var(--x-color-border); border-left: 4px solid var(--x-notification-color); border-radius: 8px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16); box-sizing: border-box; color: var(--x-color-text); display: flex; font-family: var(--x-font-family); font-size: var(--x-notification-font-size); gap: 12px; justify-content: space-between; line-height: 1.5; max-width: calc(100vw - 32px); padding: 12px; width: 320px; z-index: var(--x-notification-z-index, var(--x-z-index-message)); }
.x-notification--success { --x-notification-color: var(--x-color-success); }
.x-notification--warning { --x-notification-color: var(--x-color-warning); }
.x-notification--error { --x-notification-color: var(--x-color-danger); }
.x-notification__main { display: grid; gap: 4px; min-width: 0; }
.x-notification__title { color: var(--x-color-text); font-size: 14px; font-weight: 800; }
.x-notification__message { color: var(--x-color-muted); margin: 0; min-width: 0; overflow-wrap: anywhere; }
.x-notification__close { align-self: flex-start; background: transparent; border: 0; color: var(--x-color-muted); cursor: pointer; font: inherit; padding: 0; }
</style>
