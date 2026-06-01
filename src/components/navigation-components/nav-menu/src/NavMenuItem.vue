<script setup lang="ts">
import { computed, inject, markRaw, nextTick, onBeforeUnmount, onMounted, provide, ref, toRaw, watch } from 'vue'
import type { CSSProperties, Component } from 'vue'
import { XIcon } from '../../../basic-components/icon'
import type { NavMenuItem, NavMenuMode } from './types'

type KeepPopupPathAlive = () => void
type PopupPathContext = {
  keepAlive: KeepPopupPathAlive
  closePath: () => void
  setDescendantPopupHovering: (hovering: boolean) => void
}

const popupPathKey = Symbol('x-nav-menu-popup-path')
const popupCloseDelay = 420

const props = withDefaults(
  defineProps<{
    item: NavMenuItem
    activeKey: string
    mode: NavMenuMode
    collapsed: boolean
    teleported: boolean
    teleportTo: string
    menuStyleVars: CSSProperties
    openKeys: Set<string>
    showSubmenuArrow: boolean
    submenuArrowIcon?: string | Component
    depth?: number
  }>(),
  {
    showSubmenuArrow: true,
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
let descendantPopupHoverCount = 0
const parentPopupPath = inject<PopupPathContext | null>(popupPathKey, null)
const hasChildren = computed(() => (props.item.children?.length ?? 0) > 0)
const isActive = computed(() => props.item.key === props.activeKey)
const isActiveAncestor = computed(() => hasChildren.value && containsActiveKey(props.item.children ?? [], props.activeKey))
const shouldHideLabel = computed(() => props.mode === 'vertical' && props.collapsed && props.depth === 0)
const isCollapsedVerticalPopup = computed(() => props.mode === 'vertical' && props.collapsed)
const usesPopupSubmenu = computed(() => props.mode === 'horizontal' || isCollapsedVerticalPopup.value)
const isSubmenuOpen = computed(() => (usesPopupSubmenu.value ? submenuOpen.value : props.openKeys.has(props.item.key)))
const shouldTeleportSubmenu = computed(() => props.teleported && usesPopupSubmenu.value && hasChildren.value)
const iconText = computed(() => props.item.label.slice(0, 1).toUpperCase())
const componentIcon = computed(() => {
  if (!props.item.icon || typeof props.item.icon === 'string') {
    return null
  }

  return markRaw(toRaw(props.item.icon))
})
const componentSubmenuArrowIcon = computed(() => {
  if (!props.submenuArrowIcon || typeof props.submenuArrowIcon === 'string') {
    return null
  }

  return markRaw(toRaw(props.submenuArrowIcon))
})
const arrowIcon = computed(() => {
  if (isCollapsedVerticalPopup.value || (props.mode === 'horizontal' && props.depth > 0)) {
    return 'ri-arrow-right-s-line'
  }

  return isSubmenuOpen.value ? 'ri-arrow-drop-up-fill' : 'ri-arrow-drop-down-fill'
})
const teleportedSubmenuStyle = computed(() => ({
  ...props.menuStyleVars,
  '--x-nav-menu-text-color': 'var(--x-color-text)',
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
    parentPopupPath?.closePath()
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

function handleChildSelect(key: string) {
  emit('select', key)

  if (usesPopupSubmenu.value) {
    closePopupPath()
  }
}

function keepPopupPathAlive() {
  clearCloseTimer()
  parentPopupPath?.keepAlive()
}

function closePopupPath() {
  clearCloseTimer()
  descendantPopupHoverCount = 0
  submenuOpen.value = false
  parentPopupPath?.closePath()
}

function setDescendantPopupHovering(hovering: boolean) {
  descendantPopupHoverCount = Math.max(0, descendantPopupHoverCount + (hovering ? 1 : -1))

  if (hovering) {
    clearCloseTimer()
  }

  parentPopupPath?.setDescendantPopupHovering(hovering)

  if (!hovering && descendantPopupHoverCount === 0) {
    closePopupSubmenu()
  }
}

function openPopupSubmenu() {
  parentPopupPath?.keepAlive()

  if (usesPopupSubmenu.value && hasChildren.value) {
    clearCloseTimer()
    submenuOpen.value = true
    void nextTick(updateSubmenuPosition)
  }
}

function isPointerStillInPopupPath(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    itemRef.value?.contains(target) ||
      submenuRef.value?.contains(target) ||
      target.closest('.x-nav-menu-submenu')
  )
}

function closePopupSubmenu(event?: MouseEvent) {
  if (usesPopupSubmenu.value && hasChildren.value) {
    if (event && isPointerStillInPopupPath(event.relatedTarget)) {
      return
    }

    clearCloseTimer()
    closeTimer = setTimeout(() => {
      if (descendantPopupHoverCount > 0) {
        closeTimer = null
        return
      }

      submenuOpen.value = false
      closeTimer = null
    }, popupCloseDelay)
  }
}

function handleSubmenuMouseEnter() {
  parentPopupPath?.setDescendantPopupHovering(true)
  openPopupSubmenu()
}

function handleSubmenuMouseLeave(event: MouseEvent) {
  parentPopupPath?.setDescendantPopupHovering(false)
  closePopupSubmenu(event)
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

provide(popupPathKey, {
  keepAlive: keepPopupPathAlive,
  closePath: closePopupPath,
  setDescendantPopupHovering
})
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
    @mouseleave="closePopupSubmenu($event)"
  >
    <button
      class="x-nav-menu-item__trigger"
      type="button"
      :title="shouldHideLabel ? props.item.label : ''"
      @click="handleSelect"
    >
      <span class="x-nav-menu-item__icon" aria-hidden="true">
        <XIcon v-if="typeof props.item.icon === 'string'" :name="props.item.icon" />
        <component :is="componentIcon" v-else-if="componentIcon" class="x-nav-menu-item__custom-icon" />
        <template v-else>{{ iconText }}</template>
      </span>
      <span v-if="!shouldHideLabel" class="x-nav-menu-item__label">{{ props.item.label }}</span>
      <span v-if="hasChildren && !shouldHideLabel && props.showSubmenuArrow" class="x-nav-menu-item__arrow" aria-hidden="true">
        <XIcon v-if="typeof props.submenuArrowIcon === 'string'" :name="props.submenuArrowIcon" />
        <component
          :is="componentSubmenuArrowIcon"
          v-else-if="componentSubmenuArrowIcon"
          class="x-nav-menu-item__custom-arrow"
        />
        <XIcon v-else :name="arrowIcon" />
      </span>
    </button>

    <Teleport :to="props.teleportTo" :disabled="!shouldTeleportSubmenu">
      <ul
        v-if="hasChildren && isSubmenuOpen"
        ref="submenuRef"
        class="x-nav-menu-submenu"
        :class="teleportedSubmenuClasses"
        :style="shouldTeleportSubmenu ? teleportedSubmenuStyle : undefined"
        @mouseenter="handleSubmenuMouseEnter"
        @mouseleave="handleSubmenuMouseLeave"
      >
        <NavMenuItem
          v-for="child in props.item.children"
          :key="child.key"
          :item="child"
          :active-key="props.activeKey"
          :mode="props.mode"
          :collapsed="props.collapsed"
          :teleported="props.teleported"
          :teleport-to="props.teleportTo"
          :menu-style-vars="props.menuStyleVars"
          :open-keys="props.openKeys"
          :show-submenu-arrow="props.showSubmenuArrow"
          :submenu-arrow-icon="props.submenuArrowIcon"
          :depth="props.depth + 1"
          @select="handleChildSelect"
          @toggle-open="emit('toggle-open', $event)"
        />
      </ul>
    </Teleport>
  </li>
</template>
