<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XUserStatus } from './index'
import type { DropdownPlacement, DropdownTrigger } from '../dropdown'
import type { UserStatusMenuItem } from './src/types'
import '../../../styles/index.css'
const appearance = reactive({
  loggedIn: true,
  name: '测试管理员',
  description: '2026-07-02 08:08:47',
  avatarSrc: '',
  avatarAlt: '测试管理员头像',
  avatarIcon: 'user',
  avatarIconColor: '#94a3b8',
  avatarBackgroundColor: '#f1f5f9',
  fontSize: 14 as number,
  trigger: 'click' as DropdownTrigger,
  placement: 'bottom-end' as DropdownPlacement,
  disabled: false,
  hideOnClick: true,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  command: '',
  visible: 'false',
  loginClicks: 0,
  registerClicks: 0
})
const menuItems: UserStatusMenuItem[] = [
  { text: '消息管理', command: 'message', icon: 'notification-3' },
  { text: '个人中心', command: 'profile', icon: 'user' },
  { text: '基础设置', command: 'setting', icon: 'settings-3' },
  { text: '安全退出', command: 'logout', icon: 'logout-box-r' }
]
</script>

<template>
  <Story title="导航组件/UserStatus 用户状态" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XUserStatus">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XUserStatus
            :logged-in="appearance.loggedIn"
            :name="appearance.name"
            :description="appearance.description"
            :avatar-src="appearance.avatarSrc || undefined"
            :avatar-alt="appearance.avatarAlt"
            :avatar-icon="appearance.avatarIcon"

            :items="menuItems"

            @command="appearance.command = String($event)"
            @visible-change="appearance.visible = String($event)"
            @login-click="appearance.loginClicks += 1"
            @register-click="appearance.registerClicks += 1"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
