<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { CSSProperties } from 'vue'
import type { ListItem, ListItemAlign, ListItemClickPayload, ListItemSlotProps, ListItemValue, ListProps } from './types'

defineOptions({
  name: 'XList'
})

const props = withDefaults(defineProps<ListProps>(), {
  items: () => [],
  disabled: false,
  size: 'md',
  bordered: true,
  hoverable: true,
  enableEqualItemHeight: false,
  itemAlign: 'stretch',
  itemContentWidthMode: 'auto',
  loading: false,
  loadingText: '加载中',
  finished: false,
  finishedText: '没有更多了',
  loadOffset: 80
})

defineSlots<{
  item?: (props: ListItemSlotProps) => any
  icon?: (props: ListItemSlotProps) => any
  title?: (props: ListItemSlotProps) => any
  description?: (props: ListItemSlotProps) => any
  extra?: (props: ListItemSlotProps) => any
  action?: (props: ListItemSlotProps) => any
  loading?: () => any
  finished?: () => any
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ListItemValue]
  change: [value: ListItemValue, item: ListItem]
  'item-click': [payload: ListItemClickPayload]
  'load-more': []
}>()

const rootRef = ref<HTMLElement>()
let scrollFrame = 0

const listStyle = computed<CSSProperties>(() => ({
  '--x-list-height': toCssSize(props.height),
  '--x-list-max-height': toCssSize(props.maxHeight),
  '--x-list-item-radius': toCssSize(props.itemRadius),
  '--x-list-item-content-width': toCssSize(props.itemContentWidth),
  '--x-list-item-content-max-width': toCssSize(props.itemContentMaxWidth),
  '--x-list-active-bg': props.activeBackgroundColor,
  '--x-list-active-border': props.activeBorderColor,
  '--x-list-active-text': props.activeTextColor
}) as CSSProperties)

const hasScrollableLimit = computed(() => props.height !== undefined || props.maxHeight !== undefined)
const shouldShowFooter = computed(() => props.loading || props.finished)

function isActive(item: ListItem) {
  return item.value === props.modelValue
}

function isDisabled(item: ListItem) {
  return Boolean(props.disabled || item.disabled)
}

function getItemAlign(item: ListItem): ListItemAlign {
  return item.align ?? props.itemAlign ?? 'stretch'
}

function getSlotProps(item: ListItem, index: number): ListItemSlotProps {
  return {
    item,
    index,
    active: isActive(item),
    disabled: isDisabled(item)
  }
}

function handleItemClick(item: ListItem, index: number, event: MouseEvent) {
  const slotProps = getSlotProps(item, index)
  if (slotProps.disabled) return

  emit('item-click', { ...slotProps, event })
  emit('update:modelValue', item.value)
  emit('change', item.value, item)
}

function syncLoadMore() {
  scrollFrame = 0
  const root = rootRef.value
  if (!root || props.loading || props.finished) return

  const distanceToBottom = root.scrollHeight - root.scrollTop - root.clientHeight
  if (distanceToBottom <= Math.max(0, props.loadOffset)) {
    emit('load-more')
  }
}

function handleScroll() {
  if (scrollFrame || props.loading || props.finished) return

  scrollFrame = window.requestAnimationFrame(syncLoadMore)
}

onBeforeUnmount(() => {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
    scrollFrame = 0
  }
})
</script>

<template>
  <div
    ref="rootRef"
    class="x-list"
    :class="[
      `x-list--${props.size}`,
      {
        'is-bordered': props.bordered,
        'is-hoverable': props.hoverable,
        'is-equal-item-height': props.enableEqualItemHeight,
        'is-disabled': props.disabled,
        'is-scrollable': hasScrollableLimit
      }
    ]"
    :style="listStyle"
    @scroll="handleScroll"
  >
    <button
      v-for="(item, index) in props.items"
      :key="item.value"
      class="x-list__item"
      :class="{ 'is-active': isActive(item), 'is-disabled': isDisabled(item) }"
      type="button"
      :disabled="isDisabled(item)"
      :aria-pressed="isActive(item)"
      @click="handleItemClick(item, index, $event)"
    >
      <span
        class="x-list__item-content"
        :class="[
          `x-list__item-content--${getItemAlign(item)}`,
          `x-list__item-content--width-${props.itemContentWidthMode}`,
          { 'has-custom-item-slot': Boolean($slots.item) }
        ]"
      >
        <slot name="item" v-bind="getSlotProps(item, index)">
          <span v-if="$slots.icon || item.avatar || item.icon" class="x-list__media">
            <slot name="icon" v-bind="getSlotProps(item, index)">
              <img v-if="item.avatar" class="x-list__avatar" :src="item.avatar" alt="" />
              <span v-else class="x-list__icon" aria-hidden="true">{{ item.icon }}</span>
            </slot>
          </span>
          <span class="x-list__content">
            <span v-if="$slots.title || item.title" class="x-list__title">
              <slot name="title" v-bind="getSlotProps(item, index)">{{ item.title }}</slot>
            </span>
            <span v-if="$slots.description || item.description" class="x-list__description">
              <slot name="description" v-bind="getSlotProps(item, index)">{{ item.description }}</slot>
            </span>
          </span>
          <span v-if="$slots.extra || item.extra !== undefined || $slots.action" class="x-list__side">
            <span v-if="$slots.extra || item.extra !== undefined" class="x-list__extra">
              <slot name="extra" v-bind="getSlotProps(item, index)">{{ item.extra }}</slot>
            </span>
            <span v-if="$slots.action" class="x-list__action">
              <slot name="action" v-bind="getSlotProps(item, index)" />
            </span>
          </span>
        </slot>
      </span>
    </button>

    <div v-if="shouldShowFooter" class="x-list__footer" :class="{ 'is-loading': props.loading, 'is-finished': props.finished }">
      <slot v-if="props.loading" name="loading">{{ props.loadingText }}</slot>
      <slot v-else name="finished">{{ props.finishedText }}</slot>
    </div>
  </div>
</template>

<style scoped>
.x-list {
  --x-list-default-radius: 6px;
  box-sizing: border-box;
  color: var(--x-color-text);
  display: grid;
  font-family: var(--x-font-family);
  gap: 8px;
  height: var(--x-list-height);
  max-height: var(--x-list-max-height);
  min-width: 0;
  overflow: visible;
  width: 100%;
}

.x-list.is-scrollable {
  overflow: auto;
  padding-right: 2px;
}

.x-list.is-equal-item-height {
  grid-auto-rows: 1fr;
}

.x-list__item {
  align-items: center;
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  line-height: 1.5;
  min-width: 0;
  padding: 0;
  text-align: left;
  width: 100%;
}

.x-list__item-content {
  align-items: center;
  background: var(--x-color-surface);
  border: 1px solid transparent;
  border-radius: var(--x-list-item-radius, var(--x-list-default-radius));
  box-sizing: border-box;
  display: grid;
  gap: 10px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  max-width: min(var(--x-list-item-content-max-width, 100%), 100%);
  min-width: 0;
  padding: var(--x-list-item-padding);
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
}

.x-list__item-content--stretch {
  width: var(--x-list-item-content-width, 100%);
}

.x-list__item-content--start {
  margin-right: auto;
}

.x-list__item-content--end {
  margin-left: auto;
}

.x-list__item-content--start.x-list__item-content--width-auto,
.x-list__item-content--end.x-list__item-content--width-auto {
  width: var(--x-list-item-content-width, fit-content);
}

.x-list__item-content--start.x-list__item-content--width-equal,
.x-list__item-content--end.x-list__item-content--width-equal {
  width: var(--x-list-item-content-width, var(--x-list-item-content-max-width, 100%));
}

.x-list__item-content.has-custom-item-slot {
  grid-template-columns: minmax(0, 1fr);
}

.x-list__item-content.has-custom-item-slot > * {
  min-width: 0;
}

.x-list.is-bordered .x-list__item-content {
  border-color: var(--x-color-border);
}

.x-list.is-hoverable .x-list__item:not(.is-disabled):hover .x-list__item-content {
  background: var(--x-color-surface-soft);
}

.x-list__item.is-active {
  color: var(--x-list-active-text, var(--x-color-primary));
}

.x-list__item.is-active .x-list__item-content {
  background: var(--x-list-active-bg, rgba(18, 100, 244, 0.1));
  border-color: var(--x-list-active-border, var(--x-color-primary));
}

.x-list__item.is-disabled {
  cursor: not-allowed;
  opacity: 0.56;
}

.x-list__media {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
}

.x-list__avatar,
.x-list__icon {
  border-radius: 999px;
  flex: 0 0 auto;
  height: var(--x-list-media-size);
  width: var(--x-list-media-size);
}

.x-list__avatar {
  display: block;
  object-fit: cover;
}

.x-list__icon {
  align-items: center;
  background: var(--x-color-surface-soft);
  color: currentColor;
  display: inline-flex;
  font-size: var(--x-list-icon-font-size);
  justify-content: center;
}

.x-list__content {
  display: grid;
  min-width: 0;
}

.x-list__title,
.x-list__description {
  min-width: 0;
  overflow-wrap: anywhere;
}

.x-list__title {
  color: currentColor;
  font-size: var(--x-list-title-font-size);
  font-weight: 700;
}

.x-list__description {
  color: var(--x-color-muted);
  font-size: var(--x-list-description-font-size);
}

.x-list__item.is-active .x-list__description {
  color: color-mix(in srgb, currentColor 70%, white);
}

.x-list__side {
  align-items: center;
  color: var(--x-color-muted);
  display: inline-flex;
  gap: 4px;
  justify-content: flex-end;
  justify-self: end;
  min-width: max-content;
  text-align: right;
  white-space: nowrap;
}

.x-list__item.is-active .x-list__side {
  color: currentColor;
}

.x-list__extra {
  min-width: max-content;
  overflow: visible;
  overflow-wrap: normal;
  white-space: nowrap;
}

.x-list__action {
  display: inline-flex;
  max-width: 100%;
}

.x-list__footer {
  color: var(--x-color-muted);
  font-size: 12px;
  padding: 8px;
  text-align: center;
}

.x-list--sm {
  --x-list-default-radius: 4px;
  --x-list-description-font-size: 10px;
  --x-list-icon-font-size: 12px;
  --x-list-item-padding: 0 4px;
  --x-list-media-size: 22px;
  --x-list-title-font-size: 10px;
}

.x-list--md {
  --x-list-default-radius: 6px;
  --x-list-description-font-size: 12px;
  --x-list-icon-font-size: 14px;
  --x-list-item-padding: 0 8px;
  --x-list-media-size: 30px;
  --x-list-title-font-size: 12px;
}

.x-list--lg {
  --x-list-default-radius: 8px;
  --x-list-description-font-size: 13px;
  --x-list-icon-font-size: 16px;
  --x-list-item-padding: 0 10px;
  --x-list-media-size: 38px;
  --x-list-title-font-size: 14px;
}
</style>
