<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { DrawerProps } from './types'

defineOptions({
  name: 'XDrawer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  title: '',
  direction: 'rtl',
  size: undefined,
  panelSize: '30%',
  withHeader: true,
  showClose: true,
  closeOnMaskClick: true,
  destroyOnClose: false,
  zIndex: overlayZIndex.drawer
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const visible = computed(() => props.modelValue)
const isHorizontal = computed(() => props.direction === 'rtl' || props.direction === 'ltr')
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const maskStyle = computed(() => ({
  '--x-drawer-mask': props.maskColor,
  '--x-drawer-z-index': props.zIndex
}))
const drawerStyle = computed(() => ({
  ...createElementStyleVars(props),
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
  emit('update:modelValue', false)
  emit('close')
}

function onMaskClick() {
  if (props.closeOnMaskClick) close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="x-drawer-fade" @after-enter="emit('open')">
      <div v-if="visible || !props.destroyOnClose" v-show="visible" class="x-drawer__mask" :style="maskStyle" @click.self="onMaskClick">
        <aside v-bind="$attrs" class="x-drawer" :class="[`x-drawer--${props.direction}`, `x-drawer--${mergedSize}`]" :style="drawerStyle" role="dialog" aria-modal="true">
          <header v-if="props.withHeader" class="x-drawer__header">
            <slot name="header">
              <h2 class="x-drawer__title">{{ props.title }}</h2>
            </slot>
            <button v-if="props.showClose" type="button" class="x-drawer__close" aria-label="关闭抽屉" @click="close">×</button>
          </header>
          <section class="x-drawer__body">
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
