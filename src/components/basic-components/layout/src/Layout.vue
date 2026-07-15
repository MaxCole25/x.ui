<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutProps } from './types'

defineOptions({
  name: 'XLayout'
})

const props = withDefaults(defineProps<LayoutProps>(), {
  mode: 'top-sidebar',
  fullHeight: true,
  sidebarWidth: 288,
  sidebarCollapsed: false,
  sidebarCollapsedWidth: 88,
  gap: 0,
  topbarHeight: 55,
  footerHeight: 30,
  topbarBackgroundColor: '#1E6B73',
  topbarTextColor: '#F9F9F9',
  topbarRadius: 0,
  topbarBorderColor: 'transparent',
  sidebarBackgroundColor: '#185A61',
  sidebarTextColor: '#F9F9F9',
  sidebarRadius: 0,
  sidebarBorderColor: 'transparent',
  sidebarPadding: 12,
  contentBackgroundColor: 'transparent',
  contentTextColor: '#F9F9F9',
  contentPadding: 0,
  contentRadius: 0,
  footerBackgroundColor: '#124A50',
  footerTextColor: '#F9F9F9',
  footerRadius: 0,
  footerBorderColor: 'transparent'
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
    '--x-layout-topbar-color': props.topbarTextColor,
    '--x-layout-topbar-radius': toCssLength(props.topbarRadius),
    '--x-layout-topbar-border': props.topbarBorderColor,
    '--x-layout-sidebar-bg': props.sidebarBackgroundColor,
    '--x-layout-sidebar-color': props.sidebarTextColor,
    '--x-layout-sidebar-radius': toCssLength(props.sidebarRadius),
    '--x-layout-sidebar-border': props.sidebarBorderColor,
    '--x-layout-sidebar-padding': toCssLength(props.sidebarPadding),
    '--x-layout-content-bg': props.contentBackgroundColor,
    '--x-layout-content-color': props.contentTextColor,
    '--x-layout-content-padding': toCssLength(props.contentPadding),
    '--x-layout-content-radius': toCssLength(props.contentRadius),
    '--x-layout-footer-bg': props.footerBackgroundColor,
    '--x-layout-footer-color': props.footerTextColor,
    '--x-layout-footer-radius': toCssLength(props.footerRadius),
    '--x-layout-footer-border': props.footerBorderColor
  }
})

</script>

<template>
  <div
    class="x-layout"
    :class="[`x-layout--${props.mode}`, { 'is-fill-height': props.fullHeight, 'is-sidebar-collapsed': props.sidebarCollapsed }]"
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
