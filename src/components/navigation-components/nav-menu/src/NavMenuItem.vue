<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { NavMenuItem, NavMenuMode } from './types'

const props = withDefaults(
  defineProps<{
    item: NavMenuItem
    activeKey: string
    mode: NavMenuMode
    collapsed: boolean
    openKeys: Set<string>
    depth?: number
  }>(),
  {
    depth: 0
  }
)

const emit = defineEmits<{
  (e: 'select', key: string): void
  (e: 'toggle-open', key: string): void
}>()

const submenuOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null
const hasChildren = computed(() => (props.item.children?.length ?? 0) > 0)
const isActive = computed(() => props.item.key === props.activeKey)
const isActiveAncestor = computed(() => hasChildren.value && containsActiveKey(props.item.children ?? [], props.activeKey))
const shouldHideLabel = computed(() => props.mode === 'vertical' && props.collapsed && props.depth === 0)
const isCollapsedVerticalPopup = computed(() => props.mode === 'vertical' && props.collapsed)
const usesPopupSubmenu = computed(() => props.mode === 'horizontal' || isCollapsedVerticalPopup.value)
const isSubmenuOpen = computed(() => (usesPopupSubmenu.value ? submenuOpen.value : props.openKeys.has(props.item.key)))
const isRemixIcon = computed(() => props.item.icon?.startsWith('ri-') ?? false)
const iconText = computed(() => props.item.icon?.slice(0, 1).toUpperCase() ?? props.item.label.slice(0, 1).toUpperCase())
const arrowIcon = computed(() => {
  if (isCollapsedVerticalPopup.value || (props.mode === 'horizontal' && props.depth > 0)) {
    return 'ri-arrow-right-s-line'
  }

  return isSubmenuOpen.value ? 'ri-arrow-drop-up-fill' : 'ri-arrow-drop-down-fill'
})

function containsActiveKey(items: NavMenuItem[], activeKey: string): boolean {
  if (!activeKey) {
    return false
  }

  return items.some((item) => item.key === activeKey || containsActiveKey(item.children ?? [], activeKey))
}

function handleSelect() {
  if (!hasChildren.value) {
    emit('select', props.item.key)
    return
  }

  if (props.mode === 'vertical') {
    if (props.collapsed) {
      submenuOpen.value = !submenuOpen.value
      return
    }

    emit('toggle-open', props.item.key)
  }
}

function openPopupSubmenu() {
  if (usesPopupSubmenu.value && hasChildren.value) {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
    submenuOpen.value = true
  }
}

function closePopupSubmenu() {
  if (usesPopupSubmenu.value && hasChildren.value) {
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
        'is-active-ancestor': isActiveAncestor,
        'has-children': hasChildren,
        'is-open': isSubmenuOpen,
        'is-popup-submenu': usesPopupSubmenu && hasChildren
      }
    ]"
    @mouseenter="openPopupSubmenu"
    @mouseleave="closePopupSubmenu"
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
        <i :class="arrowIcon"></i>
      </span>
    </button>

    <ul
      v-if="hasChildren && isSubmenuOpen"
      class="x-nav-menu-submenu"
      @mouseenter="openPopupSubmenu"
      @mouseleave="closePopupSubmenu"
    >
      <NavMenuItem
        v-for="child in props.item.children"
        :key="child.key"
        :item="child"
        :active-key="props.activeKey"
        :mode="props.mode"
        :collapsed="props.collapsed"
        :open-keys="props.openKeys"
        :depth="props.depth + 1"
        @select="emit('select', $event)"
        @toggle-open="emit('toggle-open', $event)"
      />
    </ul>
  </li>
</template>
