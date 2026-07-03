<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import { XIcon } from '../../../basic-components/icon'
import { XAvatar } from '../../../display-components/avatar'
import { XDropdown } from '../../dropdown'
import { XDropdownItem } from '../../dropdown-item'
import { XDropdownMenu } from '../../dropdown-menu'
import type { UserStatusMenuItem, UserStatusProps } from './types'

defineOptions({
  name: 'XUserStatus'
})

const props = withDefaults(defineProps<UserStatusProps>(), {
  loggedIn: true,
  name: '',
  description: '',
  avatarSrc: '',
  avatarAlt: '',
  avatarIcon: 'user',
  avatarIconColor: '#94a3b8',
  avatarBackgroundColor: '#f1f5f9',
  avatarIconFull: false,
  hoverBackgroundColor: undefined,
  openBackgroundColor: undefined,
  items: () => [],
  size: 'md',
  trigger: 'click',
  placement: 'bottom-end',
  disabled: false,
  hideOnClick: true,
  teleported: false,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper
})

const emit = defineEmits<{
  command: [command: unknown, item: UserStatusMenuItem]
  'visible-change': [visible: boolean]
  'login-click': [event: MouseEvent]
  'register-click': [event: MouseEvent]
}>()

const statusStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-user-status-font-size': `${componentSizePreset[props.size].fontSize}px`,
  '--x-user-status-radius': componentSizePreset[props.size].radius,
  '--x-user-status-hover-bg': props.hoverBackgroundColor,
  '--x-user-status-open-bg': props.openBackgroundColor
}))

function getItemCommand(item: UserStatusMenuItem) {
  return item.command ?? item.text
}

function handleCommand(command: unknown) {
  if (typeof command !== 'number') return

  const item = props.items[command]
  if (!item || item.disabled) return

  emit('command', getItemCommand(item), item)
}
</script>

<template>
  <div
    v-if="!props.loggedIn"
    class="x-user-status x-user-status--guest"
    :class="[`x-user-status--${props.size}`, { 'is-disabled': props.disabled }]"
    :style="statusStyle"
  >
    <button class="x-user-status__guest-action" type="button" :disabled="props.disabled" @click="emit('login-click', $event)">
      登录
    </button>
    <button class="x-user-status__guest-action" type="button" :disabled="props.disabled" @click="emit('register-click', $event)">
      注册
    </button>
  </div>

  <XDropdown
    v-else
    class="x-user-status"
    :class="[`x-user-status--${props.size}`, { 'is-disabled': props.disabled }]"
    :style="statusStyle"
    :trigger="props.trigger"
    :placement="props.placement"
    :size="props.size"
    :disabled="props.disabled"
    :hide-on-click="props.hideOnClick"
    :show-arrow="false"
    :teleported="props.teleported"
    :teleport-to="props.teleportTo"
    :z-index="props.zIndex"
    popper-width="136px"
    @command="handleCommand"
    @visible-change="emit('visible-change', $event)"
  >
    <button class="x-user-status__trigger" type="button" :disabled="props.disabled">
      <slot name="avatar">
        <XAvatar
          :src="props.avatarSrc || undefined"
          :alt="props.avatarAlt || props.name"
          :name="props.name"
          :icon="props.avatarIcon"
          :icon-color="props.avatarIconColor"
          :avatar-background-color="props.avatarBackgroundColor"
          :icon-full="props.avatarIconFull"
          :size="props.size"
        />
      </slot>

      <span class="x-user-status__meta">
        <span class="x-user-status__name-row">
          <span class="x-user-status__name">
            <slot name="name">{{ props.name }}</slot>
          </span>
          <XIcon class="x-user-status__arrow" name="arrow-down-s" :size="props.size" />
        </span>
        <span v-if="props.description || $slots.description" class="x-user-status__description">
          <slot name="description">{{ props.description }}</slot>
        </span>
      </span>
    </button>

    <template #dropdown>
      <slot name="menu" :items="props.items" :size="props.size">
        <XDropdownMenu class="x-user-status__menu" width="136px" padding="6px 0" radius="4px">
          <XDropdownItem
            v-for="(item, index) in props.items"
            :key="`${item.text}-${index}`"
            :command="index"
            :disabled="item.disabled"
            :divided="item.divided"
            :active="item.active"
            :size="props.size"
            padding="0 14px"
            height="32px"
            radius="0"
          >
            <span class="x-user-status__menu-item">
              <XIcon v-if="item.icon" class="x-user-status__menu-icon" :name="item.icon" :size="props.size" />
              <span class="x-user-status__menu-text">{{ item.text }}</span>
            </span>
          </XDropdownItem>
        </XDropdownMenu>
      </slot>
    </template>
  </XDropdown>
</template>
