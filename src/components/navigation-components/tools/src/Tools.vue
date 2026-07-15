<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import { XIcon } from '../../../basic-components/icon'
import { XBadge } from '../../../display-components/badge'
import { XDropdown } from '../../dropdown'
import { XDropdownItem } from '../../dropdown-item'
import { XDropdownMenu } from '../../dropdown-menu'
import type { ToolsActionItem, ToolsItem, ToolsMenuItem, ToolsProps } from './types'

defineOptions({
  name: 'XTools'
})

const props = withDefaults(defineProps<ToolsProps>(), {
  items: () => [],
  size: 'md',
  itemLayout: 'vertical',
  disabled: false,
  teleported: false,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  placement: 'bottom-start',
  popperWidth: 148
})

const emit = defineEmits<{
  click: [item: ToolsActionItem, event: MouseEvent]
  command: [command: unknown, item: ToolsActionItem, menuItem: ToolsMenuItem]
  'visible-change': [item: ToolsActionItem, visible: boolean]
}>()

const slots = useSlots()

const toolsStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-tools-z-index': props.zIndex
}))

function isSeparator(item: ToolsItem): item is Extract<ToolsItem, { type: 'separator' }> {
  return item.type === 'separator'
}

function getItemType(item: ToolsActionItem) {
  return item.type ?? 'button'
}

function isItemDisabled(item: ToolsActionItem) {
  return props.disabled || item.disabled
}

function shouldShowName(item: ToolsActionItem) {
  return item.showName !== false && Boolean(item.name)
}

function getToolLabel(item: ToolsActionItem) {
  return item.name || String(item.key)
}

function getDropdownAriaLabel(item: ToolsActionItem) {
  return `打开${getToolLabel(item)}菜单`
}

function hasBadge(item: ToolsActionItem) {
  return (
    item.badgeDot ||
    item.badgeShowZero ||
    item.badgeValue !== undefined ||
    item.badgeHidden !== undefined ||
    item.badgeMax !== undefined ||
    item.badgeStatus !== undefined ||
    item.badgeAccentColor !== undefined ||
    item.badgeBackgroundColor !== undefined ||
    item.badgeTextColor !== undefined ||
    item.badgeBorderColor !== undefined
  )
}

function shouldRenderIconWrap(item: ToolsActionItem) {
  return Boolean(item.icon || hasBadge(item) || slots.icon)
}

function getMenuCommand(menuItem: ToolsMenuItem) {
  return menuItem.command ?? menuItem.key ?? menuItem.name
}

function handleClick(item: ToolsActionItem, event: MouseEvent) {
  if (isItemDisabled(item)) return
  item.onClick?.(item, event)
  emit('click', item, event)
}

function handleCommand(command: unknown, item: ToolsActionItem) {
  const menuItem = item.children?.find((child) => getMenuCommand(child) === command)
  if (!menuItem || menuItem.disabled) return

  menuItem.onClick?.(menuItem, item)
  item.onCommand?.(command, item, menuItem)
  emit('command', command, item, menuItem)
}

function handleVisibleChange(item: ToolsActionItem, visible: boolean) {
  emit('visible-change', item, visible)
}
</script>

<template>
  <div
    class="x-tools"
    :class="[`x-tools--${props.size}`, `x-tools--${props.itemLayout}`, { 'is-disabled': props.disabled }]"
    :style="toolsStyle"
    role="toolbar"
  >
    <template v-for="(item, index) in props.items" :key="item.key ?? `separator-${index}`">
      <span v-if="isSeparator(item)" class="x-tools__separator" aria-hidden="true"></span>

      <slot
        v-else
        name="item"
        :item="item"
        :disabled="isItemDisabled(item)"
        :click="(event: MouseEvent) => handleClick(item, event)"
      >
        <button
          v-if="getItemType(item) === 'button'"
          class="x-tools__item"
          type="button"
          :aria-label="getToolLabel(item)"
          :disabled="isItemDisabled(item)"
          :title="getToolLabel(item)"
          @click="handleClick(item, $event)"
        >
          <span v-if="shouldRenderIconWrap(item)" class="x-tools__icon-wrap">
            <XBadge
              v-if="hasBadge(item)"
              :model-value="item.badgeValue"
              :max="item.badgeMax"
              :dot="item.badgeDot"
              :hidden="item.badgeHidden"
              :status="item.badgeStatus"
              :show-zero="item.badgeShowZero"
              :size="props.size"
              :accent-color="item.badgeAccentColor"
              :background-color="item.badgeBackgroundColor"
              :text-color="item.badgeTextColor"
              :border-color="item.badgeBorderColor"
            >
              <slot name="icon" :item="item">
                <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
              </slot>
            </XBadge>
            <slot v-else name="icon" :item="item">
              <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
            </slot>
          </span>
          <span v-if="shouldShowName(item)" class="x-tools__name">{{ item.name }}</span>
        </button>

        <XDropdown
          v-else
          class="x-tools__dropdown"
          trigger="click"
          :placement="props.placement"
          :size="props.size"
          :disabled="isItemDisabled(item)"
          :show-arrow="false"
          :teleported="props.teleported"
          :teleport-to="props.teleportTo"
          :z-index="props.zIndex"
          :popper-width="props.popperWidth"
          @command="handleCommand($event, item)"
          @visible-change="handleVisibleChange(item, $event)"
        >
          <div class="x-tools__split" :class="{ 'is-dropdown-only': getItemType(item) === 'dropdown' }">
            <button
              v-if="getItemType(item) === 'dropdown'"
              class="x-tools__item x-tools__item--trigger"
              type="button"
              :aria-label="getToolLabel(item)"
              :disabled="isItemDisabled(item)"
              :title="getToolLabel(item)"
            >
              <span v-if="shouldRenderIconWrap(item)" class="x-tools__icon-wrap">
                <XBadge
                  v-if="hasBadge(item)"
                  :model-value="item.badgeValue"
                  :max="item.badgeMax"
                  :dot="item.badgeDot"
                  :hidden="item.badgeHidden"
                  :status="item.badgeStatus"
                  :show-zero="item.badgeShowZero"
                  :size="props.size"
                  :accent-color="item.badgeAccentColor"
                  :background-color="item.badgeBackgroundColor"
                  :text-color="item.badgeTextColor"
                  :border-color="item.badgeBorderColor"
                >
                  <slot name="icon" :item="item">
                    <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
                  </slot>
                </XBadge>
                <slot v-else name="icon" :item="item">
                  <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
                </slot>
              </span>
              <span v-if="shouldShowName(item)" class="x-tools__name">{{ item.name }}</span>
            </button>
            <button
              v-else-if="item.icon || item.name || item.onClick"
              class="x-tools__item x-tools__item--trigger"
              type="button"
              :aria-label="getToolLabel(item)"
              :disabled="isItemDisabled(item)"
              :title="getToolLabel(item)"
              @click.stop="handleClick(item, $event)"
            >
              <span v-if="shouldRenderIconWrap(item)" class="x-tools__icon-wrap">
                <XBadge
                  v-if="hasBadge(item)"
                  :model-value="item.badgeValue"
                  :max="item.badgeMax"
                  :dot="item.badgeDot"
                  :hidden="item.badgeHidden"
                  :status="item.badgeStatus"
                  :show-zero="item.badgeShowZero"
                  :size="props.size"
                  :accent-color="item.badgeAccentColor"
                  :background-color="item.badgeBackgroundColor"
                  :text-color="item.badgeTextColor"
                  :border-color="item.badgeBorderColor"
                >
                  <slot name="icon" :item="item">
                    <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
                  </slot>
                </XBadge>
                <slot v-else name="icon" :item="item">
                  <XIcon v-if="item.icon" class="x-tools__icon" :name="item.icon" :size="props.size" />
                </slot>
              </span>
              <span v-if="shouldShowName(item)" class="x-tools__name">{{ item.name }}</span>
            </button>
            <button
              class="x-tools__arrow"
              type="button"
              :disabled="isItemDisabled(item)"
              :aria-label="getDropdownAriaLabel(item)"
              :title="getDropdownAriaLabel(item)"
            >
              <XIcon name="arrow-down-s" :size="props.size" />
            </button>
          </div>

          <template #dropdown>
            <XDropdownMenu :min-width="props.popperWidth">
              <XDropdownItem
                v-for="menuItem in item.children ?? []"
                :key="menuItem.key ?? String(getMenuCommand(menuItem))"
                :command="getMenuCommand(menuItem)"
                :icon="menuItem.icon"
                :disabled="menuItem.disabled"
                :divided="menuItem.divided"
                :active="menuItem.active"
                :size="props.size"
              >
                <slot name="dropdown-item" :item="item" :menu-item="menuItem">
                  {{ menuItem.name }}
                </slot>
              </XDropdownItem>
            </XDropdownMenu>
          </template>
        </XDropdown>
      </slot>
    </template>
  </div>
</template>
