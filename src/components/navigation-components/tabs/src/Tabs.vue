<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Component, CSSProperties } from 'vue'
import type { TabItem, TabName, TabsCloseAllPayload, TabsCloseOthersPayload, TabsExpose, TabsPaneContext, TabsProps, TabsReorderPosition } from './types'

defineOptions({ name: 'XTabs' })

const props = withDefaults(defineProps<TabsProps>(), {
  items: () => [],
  variant: 'card',
  size: 'md',
  tabPosition: 'top',
  labelDirection: 'horizontal',
  tabStretch: false,
  closable: false,
  addable: false,
  editable: false,
  lazy: false,
  showAvatar: true,
  showCloseIcon: true,
  showRefreshIcon: false,
  showContextMenu: true,
  draggable: false,
  activeTabTextColor: 'var(--x-color-primary)',
  tabBackgroundColor: 'transparent',
  tabTextColor: 'var(--x-color-text-muted)',
  tabFontSize: undefined,
  tabMinWidth: undefined,
  tabGap: 4,
  verticalWidth: undefined,
  verticalLabelMinHeight: undefined,
  radius: 4,
  border: '1px solid var(--x-color-border)',
  contentBackgroundColor: 'var(--x-color-surface)',
  contextMenuBackgroundColor: 'var(--x-color-surface)',
  contextMenuTextColor: 'var(--x-color-text)',
  fullHeight: false,
  beforeLeave: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: TabName): void
  (e: 'change', value: TabName): void
  (e: 'tab-click', pane: TabsPaneContext, event: Event): void
  (e: 'tab-remove', name: TabName): void
  (e: 'tab-add'): void
  (e: 'edit', targetName: TabName | undefined, action: 'remove' | 'add'): void
  (e: 'tab-refresh', name: TabName): void
  (e: 'tab-refresh-all'): void
  (e: 'tab-close-all', payload: TabsCloseAllPayload): void
  (e: 'tab-close-others', payload: TabsCloseOthersPayload): void
  (e: 'reorder', payload: { source: TabName; target: TabName; position: TabsReorderPosition }): void
}>()

const trackRef = ref<HTMLElement | null>(null)
const draggingTabName = ref<TabName | null>(null)
const dragOverTargetName = ref<TabName | null>(null)
const dragOverPosition = ref<TabsReorderPosition | null>(null)
const internalVisited = ref<Record<string, true>>({})
const lockedTabs = ref<Record<string, true>>({})
const showScrollButtons = ref(false)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
let trackResizeObserver: ResizeObserver | null = null

const contextMenu = ref<{
  visible: boolean
  x: number
  y: number
  targetName: TabName | null
}>({
  visible: false,
  x: 0,
  y: 0,
  targetName: null
})

const activeName = computed<TabName | undefined>(() => {
  const current = props.modelValue
  if (current !== undefined && props.items.some((item) => item.name === current)) {
    return current
  }

  return props.items[0]?.name
})

const isVertical = computed(() => props.tabPosition === 'left' || props.tabPosition === 'right')
const hasItems = computed(() => props.items.length > 0)
const mergedVariant = computed(() => props.variant || 'line')
const isContextTargetLocked = computed(() => {
  const targetName = contextMenu.value.targetName
  return targetName !== null && isTabLocked(targetName)
})
const isContextTargetInternalLocked = computed(() => {
  const targetName = contextMenu.value.targetName
  return targetName !== null && isTabInternallyLocked(targetName)
})

const rootClasses = computed(() => ({
  [`x-tabs--${mergedVariant.value}`]: true,
  [`x-tabs--${props.size}`]: true,
  [`x-tabs--${props.tabPosition}`]: true,
  [`x-tabs--label-${props.labelDirection}`]: true,
  'is-fill-height': props.fullHeight,
  'is-vertical': isVertical.value,
  'is-horizontal': !isVertical.value
}))

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const tabsStyleVars = computed<Record<string, string>>(() => ({
  '--x-tabs-tab-bg': props.tabBackgroundColor,
  '--x-tabs-tab-text': props.tabTextColor,
  '--x-tabs-item-gap': toCssLength(props.tabGap),
  '--x-tabs-tab-active-text': props.activeTabTextColor,
  '--x-tabs-radius': toCssLength(props.radius),
  '--x-tabs-border': props.border,
  '--x-tabs-content-bg': props.contentBackgroundColor,
  '--x-tabs-context-menu-bg': props.contextMenuBackgroundColor,
  '--x-tabs-context-menu-text': props.contextMenuTextColor,
  ...getTabsSizeVars(props.size),
  ...(props.tabFontSize === undefined ? {} : { '--x-tabs-label-font-size': toCssLength(props.tabFontSize) }),
  ...(props.tabMinWidth === undefined ? {} : { '--x-tabs-item-min-width': toCssLength(props.tabMinWidth) }),
  ...(props.verticalWidth === undefined ? {} : { '--x-tabs-vertical-width': toCssLength(props.verticalWidth) }),
  ...(props.verticalLabelMinHeight === undefined
    ? {}
    : { '--x-tabs-vertical-label-min-height': toCssLength(props.verticalLabelMinHeight) })
}))

const contextMenuStyle = computed<CSSProperties>(() => ({
  left: `${contextMenu.value.x}px`,
  top: `${contextMenu.value.y}px`,
  '--x-tabs-context-menu-bg': props.contextMenuBackgroundColor,
  '--x-tabs-context-menu-text': props.contextMenuTextColor
}))

function getTabsSizeVars(size: NonNullable<TabsProps['size']>) {
  const vars = {
    lg: {
      '--x-tabs-item-height': '38px',
      '--x-tabs-item-frame-height': '30px',
      '--x-tabs-item-min-height': '38px',
      '--x-tabs-item-min-width': '140px',
      '--x-tabs-item-padding-x': '8px',
      '--x-tabs-item-padding-y': '0',
      '--x-tabs-label-font-size': '14px',
      '--x-tabs-icon-size': '22px',
      '--x-tabs-icon-svg-size': '17px',
      '--x-tabs-close-size': '20px',
      '--x-tabs-action-size': '38px',
      '--x-tabs-scroll-size': '38px',
      '--x-tabs-vertical-width': '52px'
    },
    md: {
      '--x-tabs-item-height': '30px',
      '--x-tabs-item-frame-height': '30px',
      '--x-tabs-item-min-height': '30px',
      '--x-tabs-item-min-width': '140px',
      '--x-tabs-item-padding-x': '8px',
      '--x-tabs-item-padding-y': '0',
      '--x-tabs-label-font-size': '12px',
      '--x-tabs-icon-size': '20px',
      '--x-tabs-icon-svg-size': '16px',
      '--x-tabs-close-size': '18px',
      '--x-tabs-action-size': '30px',
      '--x-tabs-scroll-size': '30px',
      '--x-tabs-vertical-width': '48px'
    },
    sm: {
      '--x-tabs-item-height': '22px',
      '--x-tabs-item-frame-height': '30px',
      '--x-tabs-item-min-height': '22px',
      '--x-tabs-item-min-width': '140px',
      '--x-tabs-item-padding-x': '8px',
      '--x-tabs-item-padding-y': '0',
      '--x-tabs-label-font-size': '10px',
      '--x-tabs-icon-size': '18px',
      '--x-tabs-icon-svg-size': '14px',
      '--x-tabs-close-size': '16px',
      '--x-tabs-action-size': '22px',
      '--x-tabs-scroll-size': '22px',
      '--x-tabs-vertical-width': '44px'
    }
  } satisfies Record<NonNullable<TabsProps['size']>, Record<string, string>>

  return vars[size]
}

watch(
  () => props.items,
  (items) => {
    if (!items.length) {
      return
    }

    const current = props.modelValue
    const exists = current !== undefined && items.some((item) => item.name === current)
    if (!exists) {
      emit('update:modelValue', items[0].name)
      emit('change', items[0].name)
    }
  },
  { deep: true, immediate: true }
)

watch(
  activeName,
  (value) => {
    if (value !== undefined) {
      internalVisited.value[String(value)] = true
    }

    scheduleTabsScrollSync()
  },
  { immediate: true }
)

watch(
  () => [props.items, props.tabPosition],
  () => {
    scheduleTabsScrollSync()
  },
  { deep: true }
)

function emitTabClick(item: TabItem, event: Event) {
  emit('tab-click', { paneName: item.name, item }, event)
}

async function activateTab(item: TabItem, event: Event) {
  if (item.disabled || activeName.value === item.name) {
    emitTabClick(item, event)
    return
  }

  const previous = activeName.value
  if (props.beforeLeave && previous !== undefined) {
    const allowed = await props.beforeLeave(item.name, previous)
    if (!allowed) {
      emitTabClick(item, event)
      return
    }
  }

  emit('update:modelValue', item.name)
  emit('change', item.name)
  emitTabClick(item, event)
}

function handleTabAdd() {
  emit('tab-add')
  emit('edit', undefined, 'add')
}

function handleCloseClick(item: TabItem) {
  if (isTabLocked(item.name)) {
    return
  }

  emit('tab-remove', item.name)
  emit('edit', item.name, 'remove')
}

function handleLabelDragStart(item: TabItem, event: DragEvent) {
  if (!canDrag(item)) {
    return
  }

  draggingTabName.value = item.name
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(item.name))
  }
}

function handleLabelDragOver(item: TabItem, event: DragEvent) {
  if (!props.draggable || isTabLocked(item.name) || draggingTabName.value === null || draggingTabName.value === item.name) {
    dragOverTargetName.value = null
    dragOverPosition.value = null
    return
  }

  event.preventDefault()
  const current = event.currentTarget as HTMLElement | null
  if (!current) {
    return
  }

  const rect = current.getBoundingClientRect()
  const isAfter = isVertical.value
    ? event.clientY - rect.top > rect.height / 2
    : event.clientX - rect.left > rect.width / 2

  dragOverTargetName.value = item.name
  dragOverPosition.value = isAfter ? 'after' : 'before'
}

function handleLabelDrop(item: TabItem, event: DragEvent) {
  if (!props.draggable || isTabLocked(item.name)) {
    return
  }

  event.preventDefault()
  const sourceName = draggingTabName.value
  const position = dragOverPosition.value ?? 'before'
  draggingTabName.value = null
  dragOverTargetName.value = null
  dragOverPosition.value = null

  if (sourceName === null || sourceName === item.name) {
    return
  }

  emit('reorder', {
    source: sourceName,
    target: item.name,
    position
  })
}

function handleLabelDragEnd() {
  draggingTabName.value = null
  dragOverTargetName.value = null
  dragOverPosition.value = null
}

function shouldRenderPane(item: TabItem): boolean {
  if (item.name === activeName.value) {
    return true
  }

  if (!(item.lazy ?? props.lazy)) {
    return true
  }

  return Boolean(internalVisited.value[String(item.name)])
}

function syncScrollState() {
  const track = trackRef.value
  if (!track) {
    showScrollButtons.value = false
    canScrollPrev.value = false
    canScrollNext.value = false
    return
  }

  if (isVertical.value) {
    const maxScrollTop = Math.max(0, track.scrollHeight - track.clientHeight)
    showScrollButtons.value = maxScrollTop > 1
    canScrollPrev.value = track.scrollTop > 1
    canScrollNext.value = track.scrollTop < maxScrollTop - 1
    return
  }

  const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth)
  showScrollButtons.value = maxScrollLeft > 1
  canScrollPrev.value = track.scrollLeft > 1
  canScrollNext.value = track.scrollLeft < maxScrollLeft - 1
}

function scheduleTabsScrollSync() {
  window.setTimeout(scrollActiveTabIntoView, 0)
}

function scrollActiveTabIntoView() {
  void nextTick(() => {
    syncActiveTabIntoView()
    syncScrollState()
  })
}

function syncActiveTabIntoView() {
  const track = trackRef.value
  const activeTab = track?.querySelector<HTMLElement>('.x-tabs__item-frame.is-active')
  if (!track || !activeTab) {
    return
  }

  const trackRect = track.getBoundingClientRect()
  const activeRect = activeTab.getBoundingClientRect()

  if (isVertical.value) {
    const delta = activeRect.top < trackRect.top
      ? activeRect.top - trackRect.top
      : activeRect.bottom > trackRect.bottom
        ? activeRect.bottom - trackRect.bottom
        : 0

    if (delta !== 0) {
      track.scrollTo({ top: Math.max(0, track.scrollTop + delta), behavior: 'smooth' })
    }
    return
  }

  const delta = activeRect.left < trackRect.left
    ? activeRect.left - trackRect.left
    : activeRect.right > trackRect.right
      ? activeRect.right - trackRect.right
      : 0

  if (delta !== 0) {
    track.scrollTo({ left: Math.max(0, track.scrollLeft + delta), behavior: 'smooth' })
  }
}

function scrollTabs(direction: 'prev' | 'next') {
  const track = trackRef.value
  if (!track) {
    return
  }

  if (isVertical.value) {
    const delta = Math.max(120, Math.floor(track.clientHeight * 0.5))
    track.scrollTo({ top: track.scrollTop + (direction === 'next' ? delta : -delta), behavior: 'smooth' })
    return
  }

  const delta = Math.max(120, Math.floor(track.clientWidth * 0.5))
  track.scrollTo({ left: track.scrollLeft + (direction === 'next' ? delta : -delta), behavior: 'smooth' })
}

function hideContextMenu() {
  contextMenu.value.visible = false
}

function getTabItem(name: TabName): TabItem | undefined {
  return props.items.find((item) => item.name === name)
}

function isTabInternallyLocked(name: TabName): boolean {
  return Boolean(lockedTabs.value[String(name)])
}

function isTabLocked(name: TabName): boolean {
  return Boolean(getTabItem(name)?.locked) || isTabInternallyLocked(name)
}

function canClose(item: TabItem): boolean {
  return !isTabLocked(item.name) && props.showCloseIcon && Boolean(item.closable ?? props.closable)
}

function canDrag(item: TabItem): boolean {
  return !isTabLocked(item.name) && Boolean(item.draggable ?? props.draggable)
}

function isVueComponent(icon: TabItem['icon']): icon is Component {
  return typeof icon === 'object' || typeof icon === 'function'
}

function isRemixIcon(icon: TabItem['icon']): icon is string {
  return typeof icon === 'string' && icon.startsWith('ri-')
}

function getAvatarText(item: TabItem) {
  return item.avatarText || item.label.slice(0, 1)
}

function openContextMenu(item: TabItem, event: MouseEvent) {
  if (!props.showContextMenu) {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    targetName: item.name
  }
}

function lockCurrentTab() {
  const targetName = contextMenu.value.targetName
  if (targetName === null || isTabLocked(targetName)) {
    return
  }

  lockedTabs.value[String(targetName)] = true
  hideContextMenu()
}

function unlockCurrentTab() {
  const targetName = contextMenu.value.targetName
  if (targetName === null || !isTabInternallyLocked(targetName)) {
    return
  }

  delete lockedTabs.value[String(targetName)]
  hideContextMenu()
}

function refreshCurrentTab() {
  const targetName = contextMenu.value.targetName
  if (targetName === null || isTabLocked(targetName)) {
    return
  }

  emit('tab-refresh', targetName)
  hideContextMenu()
}

function refreshAllTabs() {
  props.items.forEach((item) => {
    if (!isTabLocked(item.name) && (item.refreshable ?? props.showRefreshIcon)) {
      emit('tab-refresh', item.name)
    }
  })
  emit('tab-refresh-all')
  hideContextMenu()
}

function closeOtherTabs() {
  const targetName = contextMenu.value.targetName
  if (targetName === null) {
    hideContextMenu()
    return
  }

  const closableItems = props.items.filter(
    (item) => item.name !== targetName && !isTabLocked(item.name) && (item.closable ?? props.closable)
  )
  closableItems.forEach((item) => {
    emit('tab-remove', item.name)
    emit('edit', item.name, 'remove')
  })
  emit('tab-close-others', { targetName, names: closableItems.map((item) => item.name) })
  hideContextMenu()
}

function closeAllTabs() {
  const closableItems = props.items.filter((item) => !isTabLocked(item.name) && (item.closable ?? props.closable))
  closableItems.forEach((item) => {
    emit('tab-remove', item.name)
    emit('edit', item.name, 'remove')
  })
  emit('tab-close-all', { names: closableItems.map((item) => item.name) })
  hideContextMenu()
}

onMounted(() => {
  window.addEventListener('click', hideContextMenu)
  window.addEventListener('contextmenu', hideContextMenu)
  window.addEventListener('scroll', hideContextMenu, true)
  window.addEventListener('resize', syncScrollState, { passive: true })

  const track = trackRef.value
  if (track) {
    track.addEventListener('scroll', syncScrollState, { passive: true })
    trackResizeObserver = new ResizeObserver(syncScrollState)
    trackResizeObserver.observe(track)
  }

  syncScrollState()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', hideContextMenu)
  window.removeEventListener('contextmenu', hideContextMenu)
  window.removeEventListener('scroll', hideContextMenu, true)
  window.removeEventListener('resize', syncScrollState)

  const track = trackRef.value
  if (track) {
    track.removeEventListener('scroll', syncScrollState)
  }
  trackResizeObserver?.disconnect()
  trackResizeObserver = null
})

defineExpose<TabsExpose>({
  scrollActiveTabIntoView
})
</script>

<template>
  <section class="x-tabs" :class="rootClasses" :style="tabsStyleVars">
    <header class="x-tabs__head">
      <button
        v-if="showScrollButtons"
        type="button"
        class="x-tabs__scroll x-tabs__scroll--prev"
        :disabled="!canScrollPrev"
        :aria-label="isVertical ? '向上滚动标签' : '向左滚动标签'"
        @click="scrollTabs('prev')"
      >
        <i :class="isVertical ? 'ri-arrow-up-s-line' : 'ri-arrow-left-s-line'" aria-hidden="true"></i>
      </button>

      <div ref="trackRef" class="x-tabs__track">
        <div
          v-for="item in items"
          :key="item.name"
          class="x-tabs__item-frame"
          :class="{
            'is-active': item.name === activeName,
            'is-disabled': item.disabled,
            'is-stretch': props.tabStretch,
            'is-dragging': item.name === draggingTabName,
            'is-drag-over-before': item.name === dragOverTargetName && dragOverPosition === 'before',
            'is-drag-over-after': item.name === dragOverTargetName && dragOverPosition === 'after'
          }"
        >
          <button
            type="button"
            class="x-tabs__item"
            :class="{
              'is-active': item.name === activeName,
              'is-disabled': item.disabled,
              'is-stretch': props.tabStretch
            }"
            :disabled="item.disabled"
            @click="activateTab(item, $event)"
            @contextmenu="openContextMenu(item, $event)"
            @dragstart="handleLabelDragStart(item, $event)"
            @dragover="handleLabelDragOver(item, $event)"
            @drop="handleLabelDrop(item, $event)"
            @dragend="handleLabelDragEnd"
          >
            <slot name="label" :item="item" :active="item.name === activeName" :locked="isTabLocked(item.name)">
              <span
                class="x-tabs__label"
                :class="{
                  'is-active': item.name === activeName,
                  'is-closable': canClose(item),
                  'is-draggable': canDrag(item)
                }"
                :draggable="canDrag(item)"
              >
                <span class="x-tabs__main">
                  <span v-if="isVueComponent(item.icon)" class="x-tabs__icon" aria-hidden="true">
                    <component :is="item.icon" />
                  </span>
                  <span v-else-if="isRemixIcon(item.icon)" class="x-tabs__icon" aria-hidden="true">
                    <i :class="item.icon"></i>
                  </span>
                  <span v-else-if="item.icon" class="x-tabs__icon" aria-hidden="true">{{ item.icon }}</span>
                  <span
                    v-else-if="showAvatar && (item.avatarUrl || item.avatarText)"
                    class="x-tabs__avatar"
                    aria-hidden="true"
                  >
                    <img v-if="item.avatarUrl" :src="item.avatarUrl" alt="" />
                    <span v-else>{{ getAvatarText(item) }}</span>
                  </span>
                  <span class="x-tabs__label-text">{{ item.label }}</span>
                </span>
                <span class="x-tabs__actions">
                  <button
                    v-if="canClose(item)"
                    type="button"
                    class="x-tabs__close"
                    aria-label="关闭标签"
                    @click.stop.prevent="handleCloseClick(item)"
                  >
                    <i class="ri-close-line" aria-hidden="true"></i>
                  </button>
                  <span v-if="isTabLocked(item.name)" class="x-tabs__lock" aria-label="已锁定">
                    <i class="ri-lock-2-line" aria-hidden="true"></i>
                  </span>
                </span>
              </span>
            </slot>
          </button>
        </div>
      </div>

      <button
        v-if="showScrollButtons"
        type="button"
        class="x-tabs__scroll x-tabs__scroll--next"
        :disabled="!canScrollNext"
        :aria-label="isVertical ? '向下滚动标签' : '向右滚动标签'"
        @click="scrollTabs('next')"
      >
        <i :class="isVertical ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'" aria-hidden="true"></i>
      </button>

      <button
        v-if="addable || editable"
        type="button"
        class="x-tabs__add"
        aria-label="新增标签"
        @click="handleTabAdd"
      >
        <i class="ri-add-line" aria-hidden="true"></i>
      </button>
    </header>

    <section class="x-tabs__content x-scrollbar--native">
      <template v-if="hasItems">
        <template v-for="item in items" :key="`pane-${item.name}`">
          <div v-if="shouldRenderPane(item)" v-show="item.name === activeName" class="x-tabs__pane x-scrollbar--native">
            <slot name="pane" :item="item">
              <slot :name="`pane-${item.name}`" :item="item" />
            </slot>
          </div>
        </template>
      </template>
      <slot v-else />
    </section>

    <teleport to="body">
      <ul
        v-if="contextMenu.visible"
        class="x-tabs__menu"
        :style="contextMenuStyle"
      >
        <li class="x-tabs__menu-item" :class="{ 'is-disabled': isContextTargetLocked }" @click="lockCurrentTab">
          <i class="x-tabs__menu-icon ri-lock-2-line" aria-hidden="true"></i>
          <span>锁定标签</span>
        </li>
        <li class="x-tabs__menu-item" :class="{ 'is-disabled': !isContextTargetInternalLocked }" @click="unlockCurrentTab">
          <i class="x-tabs__menu-icon ri-lock-unlock-line" aria-hidden="true"></i>
          <span>解锁标签</span>
        </li>
        <li class="x-tabs__menu-divider" />
        <li class="x-tabs__menu-item" :class="{ 'is-disabled': isContextTargetLocked }" @click="refreshCurrentTab">
          <i class="x-tabs__menu-icon ri-refresh-line" aria-hidden="true"></i>
          <span>刷新当前标签</span>
        </li>
        <li class="x-tabs__menu-item" @click="refreshAllTabs">
          <i class="x-tabs__menu-icon ri-refresh-line" aria-hidden="true"></i>
          <span>刷新所有标签</span>
        </li>
        <li class="x-tabs__menu-item" @click="closeOtherTabs">
          <i class="x-tabs__menu-icon ri-close-line" aria-hidden="true"></i>
          <span>关闭其它标签</span>
        </li>
        <li class="x-tabs__menu-item" @click="closeAllTabs">
          <i class="x-tabs__menu-icon ri-close-circle-line" aria-hidden="true"></i>
          <span>关闭所有标签</span>
        </li>
      </ul>
    </teleport>
  </section>
</template>
