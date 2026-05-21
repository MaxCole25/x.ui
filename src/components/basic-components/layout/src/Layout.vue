<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutProps } from './types'

defineOptions({
  name: 'XLayout'
})

const props = withDefaults(defineProps<LayoutProps>(), {
  mode: 'top-sidebar',
  fillHeight: true,
  sidebarWidth: 288,
  sidebarCollapsed: false,
  sidebarCollapsedWidth: 88,
  gap: 0,
  topbarHeight: 55,
  footerHeight: 30,
  topbarBackgroundColor: '#1E6B73',
  topbarColor: '#F9F9F9',
  topbarBorderRadius: 0,
  topbarBorder: 'none',
  sidebarBackgroundColor: '#185A61',
  sidebarColor: '#F9F9F9',
  sidebarBorderRadius: 0,
  sidebarBorder: 'none',
  contentBackgroundColor: 'transparent',
  contentColor: '#F9F9F9',
  contentBorderRadius: 0,
  footerBackgroundColor: '#124A50',
  footerColor: '#F9F9F9',
  footerBorderRadius: 0,
  footerBorder: 'none'
})

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const shellStyle = computed(() => {
  return {
    '--x-layout-sidebar-width': props.sidebarCollapsed ? toCssLength(props.sidebarCollapsedWidth) : toCssLength(props.sidebarWidth),
    '--x-layout-gap': toCssLength(props.gap),
    '--x-layout-topbar-height': toCssLength(props.topbarHeight),
    '--x-layout-footer-height': toCssLength(props.footerHeight),
    '--x-layout-topbar-bg': props.topbarBackgroundColor,
    '--x-layout-topbar-color': props.topbarColor,
    '--x-layout-topbar-radius': toCssLength(props.topbarBorderRadius),
    '--x-layout-topbar-border': props.topbarBorder,
    '--x-layout-sidebar-bg': props.sidebarBackgroundColor,
    '--x-layout-sidebar-color': props.sidebarColor,
    '--x-layout-sidebar-radius': toCssLength(props.sidebarBorderRadius),
    '--x-layout-sidebar-border': props.sidebarBorder,
    '--x-layout-content-bg': props.contentBackgroundColor,
    '--x-layout-content-color': props.contentColor,
    '--x-layout-content-radius': toCssLength(props.contentBorderRadius),
    '--x-layout-footer-bg': props.footerBackgroundColor,
    '--x-layout-footer-color': props.footerColor,
    '--x-layout-footer-radius': toCssLength(props.footerBorderRadius),
    '--x-layout-footer-border': props.footerBorder
  }
})
</script>

<template>
  <div
    class="x-layout"
    :class="[`x-layout--${props.mode}`, { 'is-fill-height': props.fillHeight, 'is-sidebar-collapsed': props.sidebarCollapsed }]"
    :style="shellStyle"
  >
    <header class="x-layout__topbar">
      <slot name="topbar" />
    </header>

    <aside v-if="props.mode !== 'top-only'" class="x-layout__sidebar">
      <slot name="sidebar" />
    </aside>

    <main class="x-layout__content">
      <slot />
    </main>

    <footer class="x-layout__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
