<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { createFontStyle, getComponentMetrics } from '../../../_utils/size'
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
  modelValue: undefined,
  name: '',
  description: '',
  avatarSrc: '',
  avatarAlt: '',
  avatarIcon: 'user',
  avatarIconColor: '#cdded7',
  avatarBackgroundColor: '#dff7ee',
  avatarIconFull: false,
  hoverBackgroundColor: undefined,
  openBackgroundColor: undefined,
  items: () => [],
  fontSize: 14,
  trigger: 'click',
  placement: 'bottom-end',
  disabled: false,
  hideOnClick: true,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper
})

const emit = defineEmits<{
  'update:modelValue': [visible: boolean]
  command: [command: unknown, item: UserStatusMenuItem]
  'visible-change': [visible: boolean]
  show: []
  hide: []
  'login-click': [event: MouseEvent]
  'register-click': [event: MouseEvent]
}>()

const statusStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-user-status-font-size': `${getComponentMetrics(props.fontSize).fontSize}px`,
  '--x-user-status-radius': getComponentMetrics(props.fontSize).radius,
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
    :class="['x-user-status', { 'is-disabled': props.disabled }]"
    :style="[statusStyle, createFontStyle(props.fontSize ?? 14)]"
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
    :class="['x-user-status', { 'is-disabled': props.disabled }]"
    :style="[statusStyle, createFontStyle(props.fontSize ?? 14)]"
    :trigger="props.trigger"
    :model-value="props.modelValue"
    :placement="props.placement"
    :font-size="props.fontSize"
    :disabled="props.disabled"
    :hide-on-click="props.hideOnClick"
    :show-arrow="false"
    :teleported="props.teleported"
    :teleport-to="props.teleportTo"
    :z-index="props.zIndex"
    popper-width="136px"
    @command="handleCommand"
    @update:model-value="emit('update:modelValue', $event)"
    @visible-change="emit('visible-change', $event)"
    @show="emit('show')"
    @hide="emit('hide')"
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
          :font-size="props.fontSize"
        />
      </slot>

      <span class="x-user-status__meta">
        <span class="x-user-status__name-row">
          <span class="x-user-status__name">
            <slot name="name">{{ props.name }}</slot>
          </span>
          <XIcon class="x-user-status__arrow" name="arrow-down-s" :font-size="props.fontSize" />
        </span>
        <span v-if="props.description || $slots.description" class="x-user-status__description">
          <slot name="description">{{ props.description }}</slot>
        </span>
      </span>
    </button>

    <template #dropdown>
      <slot name="menu" :items="props.items" :font-size="props.fontSize">
        <XDropdownMenu class="x-user-status__menu" width="136px" padding="6px 0" radius="4px">
          <XDropdownItem
            v-for="(item, index) in props.items"
            :key="`${item.text}-${index}`"
            :command="index"
            :disabled="item.disabled"
            :divided="item.divided"
            :active="item.active"
            :font-size="props.fontSize"
            padding="0 14px"
            height="32px"
            radius="0"
          >
            <span class="x-user-status__menu-item">
              <XIcon v-if="item.icon" class="x-user-status__menu-icon" :name="item.icon" :font-size="props.fontSize" />
              <span class="x-user-status__menu-text">{{ item.text }}</span>
            </span>
          </XDropdownItem>
        </XDropdownMenu>
      </slot>
    </template>
  </XDropdown>
</template>
