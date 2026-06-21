<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps } from './types'

defineOptions({ name: 'XAlert' })

const props = withDefaults(defineProps<AlertProps>(), { title: '', description: '', status: 'info', variant: 'light', closable: false, showIcon: true, center: false })
const emit = defineEmits<{ close: [] }>()
const visible = ref(true)
const icons = { success: '✓', warning: '!', info: 'i', error: '×' }
function close() { visible.value = false; emit('close') }
</script>

<template>
  <div v-if="visible" class="x-alert" :class="['x-alert--' + props.status, 'x-alert--' + props.variant, { 'is-center': props.center }]" role="alert">
    <span v-if="props.showIcon" class="x-alert__icon">{{ icons[props.status] }}</span>
    <div class="x-alert__content"><strong v-if="props.title" class="x-alert__title">{{ props.title }}</strong><p v-if="props.description || $slots.default" class="x-alert__description"><slot>{{ props.description }}</slot></p></div>
    <button v-if="props.closable" class="x-alert__close" type="button" aria-label="关闭提示" @click="close">×</button>
  </div>
</template>

<style scoped>
.x-alert { --x-alert-color: var(--x-color-info); --x-alert-soft: var(--x-color-info-soft); --x-alert-border: var(--x-color-info-border); align-items: flex-start; background: var(--x-alert-soft); border: 1px solid var(--x-alert-border); border-radius: 6px; box-sizing: border-box; color: var(--x-alert-color); display: flex; font-family: var(--x-font-family); gap: 10px; line-height: 1.5; padding: 10px 12px; width: 100%; }
.x-alert--success { --x-alert-color: var(--x-color-success-text); --x-alert-soft: var(--x-color-success-soft); --x-alert-border: var(--x-color-success-border); }
.x-alert--warning { --x-alert-color: var(--x-color-warning-text); --x-alert-soft: var(--x-color-warning-soft); --x-alert-border: var(--x-color-warning-border); }
.x-alert--error { --x-alert-color: var(--x-color-danger-text); --x-alert-soft: var(--x-color-danger-soft); --x-alert-border: var(--x-color-danger-border); }
.x-alert--plain { background: var(--x-color-surface); }
.x-alert.is-center { align-items: center; justify-content: center; text-align: center; }
.x-alert__icon { align-items: center; border: 1px solid currentColor; border-radius: 50%; display: inline-flex; flex: 0 0 18px; font-size: 12px; font-weight: 800; height: 18px; justify-content: center; margin-top: 1px; width: 18px; }
.x-alert__content { flex: 1 1 auto; min-width: 0; }
.x-alert__title { color: inherit; display: block; font-size: 14px; font-weight: 800; }
.x-alert__description { color: inherit; font-size: 13px; margin: 2px 0 0; }
.x-alert__close { background: transparent; border: 0; color: inherit; cursor: pointer; font: inherit; line-height: 1; padding: 0; }
</style>
