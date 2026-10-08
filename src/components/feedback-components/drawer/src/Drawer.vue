<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import { useModal } from '../../../_utils/useModal'
import type { DrawerProps } from './types'

defineOptions({
  name: 'XDrawer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<DrawerProps>(), {
  title: '',
  direction: 'rtl',
  fontSize: undefined,
  panelSize: '30%',
  withHeader: true,
  showClose: true,
  closeOnMaskClick: true,
  closeOnEsc: true,
  destroyOnClose: false,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.drawer
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const uncontrolledVisible = ref(false)
const titleId = useId()
const visible = computed(() => props.modelValue ?? uncontrolledVisible.value)
const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')
const mergedSize = computed(() => props.fontSize ?? 14)
const sizePreset = computed(() => getComponentMetrics(mergedSize.value))
const maskStyle = computed(() => ({
  '--x-drawer-mask': props.maskColor,
  '--x-drawer-z-index': props.zIndex
}))
const drawerStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-drawer-radius': toCssSize(props.radius),
  '--x-drawer-bg': props.backgroundColor,
  '--x-drawer-text': props.textColor,
  '--x-drawer-border-color': props.borderColor,
  '--x-drawer-border-width': toCssSize(props.borderWidth),
  '--x-drawer-title': props.titleColor,
  '--x-drawer-header-bg': props.headerBackgroundColor,
  '--x-drawer-body-bg': props.bodyBackgroundColor,
  '--x-drawer-footer-bg': props.footerBackgroundColor,
  '--x-drawer-header-border': props.headerBorderColor,
  '--x-drawer-footer-border': props.footerBorderColor,
  '--x-drawer-close-icon': props.closeIconColor,
  '--x-drawer-close-icon-hover': props.closeIconHoverColor,
  '--x-drawer-close-hover-bg': props.closeIconHoverBackgroundColor,
  '--x-drawer-font-size': `${sizePreset.value.fontSize}px`,
  '--x-drawer-control-height': `${sizePreset.value.height}px`,
  '--x-drawer-shadow': props.shadow,
  [isHorizontal.value ? 'width' : 'height']: toCssSize(props.panelSize)
}))

function close() {
  if (props.modelValue === undefined) uncontrolledVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}

function onMaskClick() {
  if (props.closeOnMaskClick) close()
}
const modalRef = ref<HTMLElement | null>(null)
useModal({ visible, element: modalRef, zIndex: () => props.zIndex, closeOnEsc: () => props.closeOnEsc, close: close })
</script>

<template>
  <Teleport :to="props.teleportTo" :disabled="!props.teleported">
    <Transition name="x-drawer-fade" @after-enter="emit('open')">
      <div v-if="visible || !props.destroyOnClose" v-show="visible" class="x-drawer__mask" :style="maskStyle" @click.self="onMaskClick">
        <aside ref="modalRef" tabindex="-1" :aria-labelledby="props.withHeader && (props.title || $slots.header) ? titleId : undefined" :aria-label="props.title || '抽屉'" v-bind="$attrs" class="x-drawer" :class="[`x-drawer--${props.direction}`, 'x-drawer']" :style="[drawerStyle, createFontStyle(mergedSize)]" role="dialog" aria-modal="true">
          <header v-if="props.withHeader" class="x-drawer__header">
            <div :id="titleId"><slot name="header">
              <h2 class="x-drawer__title">{{ props.title }}</h2>
            </slot></div>
            <button v-if="props.showClose" type="button" class="x-drawer__close" aria-label="关闭抽屉" @click="close">×</button>
          </header>
          <section class="x-drawer__body x-scrollbar--native">
            <slot />
          </section>
          <footer v-if="$slots.footer" class="x-drawer__footer">
            <slot name="footer" />
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>
