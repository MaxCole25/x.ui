<script setup lang="ts">
import { computed } from 'vue'
import type { NavMenuProps } from './types'
import NavMenuItem from './NavMenuItem.vue'
import 'remixicon/fonts/remixicon.css'

defineOptions({
  name: 'XNavMenu'
})

const props = withDefaults(defineProps<NavMenuProps>(), {
  activeKey: '',
  mode: 'vertical',
  collapsed: false,
  allowCollapse: false,
  textColor: 'var(--x-color-text)',
  activeTextColor: '#fff',
  activeBgColor: 'var(--x-color-primary)',
  fontSize: 14,
  fontWeight: 400,
  activeFontWeight: 600,
  fontFamily: 'var(--x-font-family)'
})

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

function handleSelect(key: string) {
  emit('select', key)
}

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const navMenuStyleVars = computed<Record<string, string>>(() => ({
  '--x-nav-menu-text-color': props.textColor,
  '--x-nav-menu-active-text-color': props.activeTextColor,
  '--x-nav-menu-active-bg-color': props.activeBgColor,
  '--x-nav-menu-font-size': toCssLength(props.fontSize),
  '--x-nav-menu-font-weight': String(props.fontWeight),
  '--x-nav-menu-active-font-weight': String(props.activeFontWeight),
  '--x-nav-menu-font-family': props.fontFamily
}))
</script>

<template>
  <nav
    class="x-nav-menu"
    :class="[
      `x-nav-menu--${props.mode}`,
      {
        'is-collapsed': props.allowCollapse && props.collapsed
      }
    ]"
    :style="navMenuStyleVars"
  >
    <ul class="x-nav-menu__list">
      <NavMenuItem
        v-for="item in props.items"
        :key="item.key"
        :item="item"
        :active-key="props.activeKey"
        :mode="props.mode"
        :collapsed="props.allowCollapse ? props.collapsed : false"
        @select="handleSelect"
      />
    </ul>
  </nav>
</template>
