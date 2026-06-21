<script setup lang="ts">
import { computed, ref } from 'vue'
import { overlayZIndex } from '../../../_utils/zIndex'
import XPopover from '../../popover/src/Popover.vue'
import type { PopconfirmProps } from './types'

defineOptions({ name: 'XPopconfirm' })

const props = withDefaults(defineProps<PopconfirmProps>(), { modelValue: undefined, title: '确认执行该操作？', content: '', confirmText: '确认', cancelText: '取消', placement: 'top', trigger: 'click', disabled: false, teleported: true, teleportTo: 'body', zIndex: overlayZIndex.popper })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; confirm: []; cancel: [] }>()
const uncontrolledVisible = ref(false)
const visible = computed({ get: () => props.modelValue ?? uncontrolledVisible.value, set: (value) => { if (props.modelValue === undefined) uncontrolledVisible.value = value; emit('update:modelValue', value) } })
function confirm() { emit('confirm'); visible.value = false }
function cancel() { emit('cancel'); visible.value = false }
</script>

<template>
  <XPopover v-model="visible" class="x-popconfirm" :title="props.title" :placement="props.placement" :trigger="props.trigger" :disabled="props.disabled" :teleported="props.teleported" :teleport-to="props.teleportTo" :z-index="props.zIndex">
    <slot />
    <template #content>
      <div class="x-popconfirm__content"><slot name="content">{{ props.content }}</slot></div>
      <div class="x-popconfirm__actions"><button class="x-popconfirm__cancel" type="button" @click="cancel">{{ props.cancelText }}</button><button class="x-popconfirm__confirm" type="button" @click="confirm">{{ props.confirmText }}</button></div>
    </template>
  </XPopover>
</template>

<style scoped>
.x-popconfirm__content { color: var(--x-color-muted); min-width: 0; }
.x-popconfirm__actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 10px; }
.x-popconfirm__cancel, .x-popconfirm__confirm { border-radius: 6px; cursor: pointer; font: 700 12px/1 var(--x-font-family); height: 28px; padding: 0 10px; }
.x-popconfirm__cancel { background: var(--x-color-surface); border: 1px solid var(--x-color-border); color: var(--x-color-text); }
.x-popconfirm__confirm { background: var(--x-color-primary); border: 1px solid var(--x-color-primary); color: #fff; }
</style>
