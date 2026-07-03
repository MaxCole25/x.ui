<script setup lang="ts">
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
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
  size: 'md' as 'sm' | 'md' | 'lg',
  trigger: 'click' as DropdownTrigger,
  placement: 'bottom-end' as DropdownPlacement,
  disabled: false,
  hideOnClick: true,
  teleported: false,
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XUserStatus
            v-bind="styleProps"
            :logged-in="appearance.loggedIn"
            :name="appearance.name"
            :description="appearance.description"
            :avatar-src="appearance.avatarSrc || undefined"
            :avatar-alt="appearance.avatarAlt"
            :avatar-icon="appearance.avatarIcon"
            :avatar-icon-color="appearance.avatarIconColor"
            :avatar-background-color="appearance.avatarBackgroundColor"
            :items="menuItems"
            :size="appearance.size"
            :trigger="appearance.trigger"
            :placement="appearance.placement"
            :disabled="appearance.disabled"
            :hide-on-click="appearance.hideOnClick"
            :teleported="appearance.teleported"
            :teleport-to="appearance.teleportTo"
            :z-index="appearance.zIndex"
            @command="appearance.command = String($event)"
            @visible-change="appearance.visible = String($event)"
            @login-click="appearance.loginClicks += 1"
            @register-click="appearance.registerClicks += 1"
          />
        </template>

        <template #column-1>
          <label class="story-check"><input v-model="appearance.loggedIn" type="checkbox" /><span>已登录</span></label>
          <label><span>name</span><input v-model="appearance.name" /></label>
          <label><span>description</span><input v-model="appearance.description" /></label>
          <label><span>头像地址</span><input v-model="appearance.avatarSrc" /></label>
          <label><span>头像 alt</span><input v-model="appearance.avatarAlt" /></label>
          <label><span>头像图标</span><input v-model="appearance.avatarIcon" /></label>
        </template>

        <template #column-2>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>触发</span><select v-model="appearance.trigger"><option value="hover">hover</option><option value="click">click</option></select></label>
          <label><span>位置</span><select v-model="appearance.placement"><option value="bottom-start">bottom-start</option><option value="bottom">bottom</option><option value="bottom-end">bottom-end</option><option value="top-start">top-start</option><option value="top">top</option><option value="top-end">top-end</option></select></label>
          <label><span>挂载目标</span><input v-model="appearance.teleportTo" /></label>
          <label><span>弹层层级</span><input v-model.number="appearance.zIndex" type="number" /></label>
        </template>

        <template #column-3>
          <label><span>头像图标色</span><input v-model="appearance.avatarIconColor" type="color" /></label>
          <label><span>头像背景色</span><input v-model="appearance.avatarBackgroundColor" type="color" /></label>
        </template>

        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.hideOnClick" type="checkbox" /><span>点击后隐藏</span></label>
          <label class="story-check"><input v-model="appearance.teleported" type="checkbox" /><span>挂载到外部</span></label>
        </template>

        <template #interfaces>
          <label><span>avatar 插槽</span><input value="替换头像区域" readonly /></label>
          <label><span>name 插槽</span><input value="替换名称行" readonly /></label>
          <label><span>description 插槽</span><input value="替换副标题" readonly /></label>
          <label><span>menu 插槽</span><input value="替换菜单内容" readonly /></label>
        </template>

        <template #types>
          <label><span>菜单项类型</span><input value="UserStatusMenuItem" readonly /></label>
          <label><span>尺寸类型</span><input value="sm | md | lg" readonly /></label>
          <label><span>触发类型</span><input value="hover | click" readonly /></label>
          <label><span>位置类型</span><input value="DropdownPlacement" readonly /></label>
        </template>

        <template #events>
          <label><span>command 事件</span><input :value="appearance.command" readonly /></label>
          <label><span>visible-change</span><input :value="appearance.visible" readonly /></label>
          <label><span>login-click</span><input :value="appearance.loginClicks" readonly /></label>
          <label><span>register-click</span><input :value="appearance.registerClicks" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
