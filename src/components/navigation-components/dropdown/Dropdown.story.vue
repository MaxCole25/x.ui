<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XButton } from '../../basic-components/button'
import { XDropdown } from './index'
import { XDropdownItem } from '../dropdown-item'
import { XDropdownMenu } from '../dropdown-menu'
import type { DropdownPlacement, DropdownTrigger } from './src/types'
import '../../../styles/index.css'
const appearance = reactive({
  trigger: 'hover' as DropdownTrigger,
  placement: 'bottom-start' as DropdownPlacement,
  fontSize: 14 as number,
  disabled: false,
  hideOnClick: true,
  showArrow: true,
  teleported: false,
  teleportTo: 'body',
  offset: 6,
  popperWidth: 160,
  zIndex: overlayZIndex.popper,
  radius: 8,
  backgroundColor: '#ffffff',
  borderColor: '#e4e7ed',
  textColor: '#606266',
  hoverBackgroundColor: '#e0ecff',
  hoverTextColor: '#1264f4',
  activeBackgroundColor: '#1264f4',
  activeTextColor: '#ffffff',
  command: ''
})
</script>

<template>
  <Story title="导航组件/Dropdown 下拉菜单" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDropdown">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDropdown

            @command="appearance.command = String($event)"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <XButton width="120px">下拉菜单</XButton>
            <template #dropdown>
              <XDropdownMenu :min-width="appearance.popperWidth" :radius="appearance.radius">
                <XDropdownItem command="create" :font-size="appearance.fontSize" active>新建</XDropdownItem>
                <XDropdownItem command="rename" :font-size="appearance.fontSize">重命名</XDropdownItem>
                <XDropdownItem command="remove" :font-size="appearance.fontSize" divided>删除</XDropdownItem>
              </XDropdownMenu>
            </template>
          </XDropdown>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: center;
  display: flex;
  gap: 16px;
  padding: 48px 16px;
}
</style>
