<script setup lang="ts">
import { computed } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type { MessageBoxAction, MessageBoxProps } from './types'

defineOptions({
  name: 'XMessageBox'
})

const props = withDefaults(defineProps<MessageBoxProps>(), {
  modelValue: false,
  title: '提示',
  message: '',
  type: 'info',
  size: undefined,
  showCancelButton: false,
  showConfirmButton: true,
  showClose: true,
  closeOnMaskClick: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  distinguishCancelAndClose: false,
  width: 420,
  minWidth: 280,
  maxWidth: 'calc(100vw - 32px)',
  zIndex: 2200
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  action: [action: MessageBoxAction]
  confirm: []
  cancel: []
  close: []
}>()

const iconClass = computed(() => {
  const iconMap = {
    success: 'ri-checkbox-circle-fill',
    warning: 'ri-error-warning-fill',
    info: 'ri-information-fill',
    error: 'ri-close-circle-fill'
  }
  return iconMap[props.type]
})
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const usesExplicitSize = computed(() => props.size != null)

const boxStyle = computed(() => ({
  '--x-message-box-width': typeof props.width === 'number' ? `${props.width}px` : props.width,
  '--x-message-box-min-width': typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth,
  '--x-message-box-max-width': typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
  '--x-message-box-z-index': props.zIndex,
  '--x-message-box-bg': props.backgroundColor,
  '--x-message-box-text': props.textColor,
  '--x-message-box-title': props.titleColor,
  '--x-message-box-border': props.borderColor,
  '--x-message-box-icon': props.iconColor,
  '--x-message-box-mask': props.maskColor,
  '--x-message-box-confirm-bg': props.confirmBackgroundColor,
  '--x-message-box-confirm-text': props.confirmTextColor,
  '--x-message-box-confirm-border': props.confirmBorderColor,
  '--x-message-box-cancel-bg': props.cancelBackgroundColor,
  '--x-message-box-cancel-text': props.cancelTextColor,
  '--x-message-box-cancel-border': props.cancelBorderColor,
  '--x-message-box-radius': usesExplicitSize.value ? sizePreset.value.radius : typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--x-message-box-padding': usesExplicitSize.value ? sizePreset.value.padding : props.padding,
  '--x-message-box-font-size': `${sizePreset.value.fontSize}px`,
  '--x-message-box-control-height': `${sizePreset.value.height}px`,
  '--x-message-box-shadow': props.shadow
}))

function finish(action: MessageBoxAction) {
  emit('update:modelValue', false)
  emit('action', action)
  if (action === 'confirm') emit('confirm')
  if (action === 'cancel') emit('cancel')
  if (action === 'close') emit('close')
}

function onMaskClick() {
  if (props.closeOnMaskClick) finish(props.distinguishCancelAndClose ? 'close' : 'cancel')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.modelValue" class="x-message-box__mask" :style="boxStyle" @click.self="onMaskClick">
      <section class="x-message-box" :class="`x-message-box--${mergedSize}`" role="dialog" aria-modal="true" :aria-label="props.title">
        <header class="x-message-box__header">
          <div class="x-message-box__title">
            <i class="x-message-box__icon" :class="[iconClass, `x-message-box__icon--${props.type}`]" aria-hidden="true"></i>
            <slot name="title">{{ props.title }}</slot>
          </div>
          <button v-if="props.showClose" class="x-message-box__close" type="button" aria-label="关闭弹窗" @click="finish('close')">×</button>
        </header>
        <div class="x-message-box__body">
          <slot>{{ props.message }}</slot>
        </div>
        <footer class="x-message-box__footer">
          <button v-if="props.showCancelButton" class="x-message-box__button x-message-box__button--cancel" type="button" @click="finish('cancel')">
            {{ props.cancelButtonText }}
          </button>
          <button v-if="props.showConfirmButton" class="x-message-box__button x-message-box__button--confirm" type="button" @click="finish('confirm')">
            {{ props.confirmButtonText }}
          </button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>
