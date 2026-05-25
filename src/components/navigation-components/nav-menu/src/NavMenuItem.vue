<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import type { NavMenuItem, NavMenuMode } from './types'
import type { CSSProperties } from 'vue'

type KeepPopupPathAlive = () => void

const keepPopupPathAliveKey = Symbol('x-nav-menu-keep-popup-path-alive')

const props = withDefaults(
  defineProps<{
    item: NavMenuItem
    activeKey: string
    mode: NavMenuMode
    collapsed: boolean
    appendToBody: boolean
    menuStyleVars: CSSProperties
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
const itemRef = ref<HTMLElement>()
const submenuRef = ref<HTMLElement>()
const submenuLeft = ref(0)
const submenuTop = ref(0)
let closeTimer: ReturnType<typeof setTimeout> | null = null
const keepParentPopupPathAlive = inject<KeepPopupPathAlive | null>(keepPopupPathAliveKey, null)
const hasChildren = computed(() => (props.item.children?.length ?? 0) > 0)
const isActive = computed(() => props.item.key === props.activeKey)
const isActiveAncestor = computed(() => hasChildren.value && containsActiveKey(props.item.children ?? [], props.activeKey))
const shouldHideLabel = computed(() => props.mode === 'vertical' && props.collapsed && props.depth === 0)
const isCollapsedVerticalPopup = computed(() => props.mode === 'vertical' && props.collapsed)
const usesPopupSubmenu = computed(() => props.mode === 'horizontal' || isCollapsedVerticalPopup.value)
const isSubmenuOpen = computed(() => (usesPopupSubmenu.value ? submenuOpen.value : props.openKeys.has(props.item.key)))
const shouldTeleportSubmenu = computed(() => props.appendToBody && usesPopupSubmenu.value && hasChildren.value)
const isRemixIcon = computed(() => props.item.icon?.startsWith('ri-') ?? false)
const iconText = computed(() => props.item.icon?.slice(0, 1).toUpperCase() ?? props.item.label.slice(0, 1).toUpperCase())
const arrowIcon = computed(() => {
  if (isCollapsedVerticalPopup.value || (props.mode === 'horizontal' && props.depth > 0)) {
    return 'ri-arrow-right-s-line'
  }

  return isSubmenuOpen.value ? 'ri-arrow-drop-up-fill' : 'ri-arrow-drop-down-fill'
})
const teleportedSubmenuStyle = computed(() => ({
  ...props.menuStyleVars,
  '--x-nav-menu-text-color': 'var(--x-color-text)',
  '--x-nav-menu-active-text-color': '#fff',
  '--x-nav-menu-active-bg-color': 'var(--x-color-primary)',
  '--x-nav-menu-arrow-size': '18px',
  left: `${submenuLeft.value}px`,
  top: `${submenuTop.value}px`,
  right: 'auto',
  bottom: 'auto'
}))
const teleportedSubmenuClasses = computed(() => ({
  'is-teleported': shouldTeleportSubmenu.value,
  'is-teleported-below': shouldTeleportSubmenu.value && props.mode === 'horizontal' && props.depth === 0,
  'is-teleported-right': shouldTeleportSubmenu.value && !(props.mode === 'horizontal' && props.depth === 0)
}))

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

function clearCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function keepPopupPathAlive() {
  clearCloseTimer()
  keepParentPopupPathAlive?.()
}

function openPopupSubmenu() {
  keepParentPopupPathAlive?.()

  if (usesPopupSubmenu.value && hasChildren.value) {
    clearCloseTimer()
    submenuOpen.value = true
    void nextTick(updateSubmenuPosition)
  }
}

function closePopupSubmenu() {
  if (usesPopupSubmenu.value && hasChildren.value) {
    clearCloseTimer()
    closeTimer = setTimeout(() => {
      submenuOpen.value = false
      closeTimer = null
    }, 180)
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function updateSubmenuPosition() {
  if (!shouldTeleportSubmenu.value || !isSubmenuOpen.value || !itemRef.value || !submenuRef.value) {
    return
  }

  const viewportGap = 8
  const popupGap = 8
  const triggerRect = itemRef.value.getBoundingClientRect()
  const submenuRect = submenuRef.value.getBoundingClientRect()
  const width = submenuRect.width || 180
  const height = submenuRect.height
  const opensBelow = props.mode === 'horizontal' && props.depth === 0
  const preferredLeft = opensBelow ? triggerRect.left : triggerRect.right + popupGap
  const preferredTop = opensBelow ? triggerRect.bottom + popupGap : triggerRect.top

  submenuLeft.value = clamp(preferredLeft, viewportGap, Math.max(viewportGap, window.innerWidth - width - viewportGap))
  submenuTop.value = clamp(preferredTop, viewportGap, Math.max(viewportGap, window.innerHeight - height - viewportGap))
}

watch(isSubmenuOpen, (open) => {
  if (open) {
    void nextTick(updateSubmenuPosition)
  }
})

onMounted(() => {
  window.addEventListener('resize', updateSubmenuPosition)
  window.addEventListener('scroll', updateSubmenuPosition, true)
})

onBeforeUnmount(() => {
  clearCloseTimer()
  window.removeEventListener('resize', updateSubmenuPosition)
  window.removeEventListener('scroll', updateSubmenuPosition, true)
})

provide(keepPopupPathAliveKey, keepPopupPathAlive)
</script>

<template>
  <li
    ref="itemRef"
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

    <Teleport to="body" :disabled="!shouldTeleportSubmenu">
      <ul
        v-if="hasChildren && isSubmenuOpen"
        ref="submenuRef"
        class="x-nav-menu-submenu"
        :class="teleportedSubmenuClasses"
        :style="shouldTeleportSubmenu ? teleportedSubmenuStyle : undefined"
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
          :append-to-body="props.appendToBody"
          :menu-style-vars="props.menuStyleVars"
          :open-keys="props.openKeys"
          :depth="props.depth + 1"
          @select="emit('select', $event)"
          @toggle-open="emit('toggle-open', $event)"
        />
      </ul>
    </Teleport>
  </li>
</template>
