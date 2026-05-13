<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { NavMenuItem, NavMenuMode } from './types'

const props = withDefaults(
  defineProps<{
    item: NavMenuItem
    activeKey: string
    mode: NavMenuMode
    collapsed: boolean
    depth?: number
  }>(),
  {
    depth: 0
  }
)

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const submenuOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null
const hasChildren = computed(() => (props.item.children?.length ?? 0) > 0)
const isActive = computed(() => props.item.key === props.activeKey)
const shouldHideLabel = computed(() => props.mode === 'vertical' && props.collapsed && props.depth === 0)
const isRemixIcon = computed(() => props.item.icon?.startsWith('ri-') ?? false)
const iconText = computed(() => props.item.icon?.slice(0, 1).toUpperCase() ?? props.item.label.slice(0, 1).toUpperCase())

function handleSelect() {
  if (!hasChildren.value) {
    emit('select', props.item.key)
    return
  }

  if (props.mode === 'vertical') {
    submenuOpen.value = !submenuOpen.value
  }
}

function openHorizontalSubmenu() {
  if (props.mode === 'horizontal' && hasChildren.value) {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
    submenuOpen.value = true
  }
}

function closeHorizontalSubmenu() {
  if (props.mode === 'horizontal' && hasChildren.value) {
    if (closeTimer) {
      clearTimeout(closeTimer)
    }
    closeTimer = setTimeout(() => {
      submenuOpen.value = false
      closeTimer = null
    }, 180)
  }
}

onBeforeUnmount(() => {
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
})
</script>

<template>
  <li
    class="x-nav-menu-item"
    :class="[
      `x-nav-menu-item--${props.mode}`,
      {
        'is-active': isActive,
        'has-children': hasChildren,
        'is-open': submenuOpen
      }
    ]"
    @mouseenter="openHorizontalSubmenu"
    @mouseleave="closeHorizontalSubmenu"
  >
    <button
      class="x-nav-menu-item__trigger"
      type="button"
      :title="shouldHideLabel ? props.item.label : ''"
      @click="handleSelect"
    >
      <span class="x-nav-menu-item__icon" aria-hidden="true">
        <i v-if="isRemixIcon" :class="props.item.icon"></i>
        <template v-else>{{ iconText }}</template>
      </span>
      <span v-if="!shouldHideLabel" class="x-nav-menu-item__label">{{ props.item.label }}</span>
      <span v-if="hasChildren && !shouldHideLabel" class="x-nav-menu-item__arrow" aria-hidden="true">
        <i :class="submenuOpen ? 'ri-arrow-drop-up-fill' : 'ri-arrow-drop-down-fill'"></i>
      </span>
    </button>

    <ul
      v-if="hasChildren && (props.mode === 'vertical' ? submenuOpen : submenuOpen)"
      class="x-nav-menu-submenu"
      @mouseenter="openHorizontalSubmenu"
      @mouseleave="closeHorizontalSubmenu"
    >
      <NavMenuItem
        v-for="child in props.item.children"
        :key="child.key"
        :item="child"
        :active-key="props.activeKey"
        :mode="props.mode"
        :collapsed="props.collapsed"
        :depth="props.depth + 1"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
