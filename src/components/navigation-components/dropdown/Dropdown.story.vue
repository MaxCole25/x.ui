<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XDropdown } from './index'
import { XDropdownItem } from '../dropdown-item'
import { XDropdownMenu } from '../dropdown-menu'
import type { DropdownPlacement, DropdownTrigger } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  trigger: 'hover' as DropdownTrigger,
  placement: 'bottom-start' as DropdownPlacement,
  size: 'md' as 'sm' | 'md' | 'lg',
  disabled: false,
  hideOnClick: true,
  showArrow: true,
  offset: 6,
  popperWidth: 160,
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XDropdown
            v-bind="styleProps"
            :trigger="appearance.trigger"
            :placement="appearance.placement"
            :size="appearance.size"
            :disabled="appearance.disabled"
            :hide-on-click="appearance.hideOnClick"
            :show-arrow="appearance.showArrow"
            :offset="appearance.offset"
            :popper-width="appearance.popperWidth"
            :radius="appearance.radius"
            :background-color="appearance.backgroundColor"
            :border-color="appearance.borderColor"
            :text-color="appearance.textColor"
            :hover-background-color="appearance.hoverBackgroundColor"
            :hover-text-color="appearance.hoverTextColor"
            :active-background-color="appearance.activeBackgroundColor"
            :active-text-color="appearance.activeTextColor"
            @command="appearance.command = String($event)"
          >
            <XButton width="120px">下拉菜单</XButton>
            <template #dropdown>
              <XDropdownMenu :min-width="appearance.popperWidth" :radius="appearance.radius">
                <XDropdownItem command="create" :size="appearance.size" active>新建</XDropdownItem>
                <XDropdownItem command="rename" :size="appearance.size">重命名</XDropdownItem>
                <XDropdownItem command="remove" :size="appearance.size" divided>删除</XDropdownItem>
              </XDropdownMenu>
            </template>
          </XDropdown>
        </template>
        <template #column-1>
          <label><span>触发</span><select v-model="appearance.trigger"><option value="hover">hover</option><option value="click">click</option></select></label>
          <label><span>位置</span><select v-model="appearance.placement"><option value="bottom-start">bottom-start</option><option value="bottom">bottom</option><option value="bottom-end">bottom-end</option><option value="top-start">top-start</option><option value="top">top</option><option value="top-end">top-end</option><option value="left-start">left-start</option><option value="left">left</option><option value="left-end">left-end</option><option value="right-start">right-start</option><option value="right">right</option><option value="right-end">right-end</option></select></label>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
        </template>
        <template #column-2>
          <label><span>偏移长度</span><input v-model.number="appearance.offset" type="number" /></label>
          <label><span>弹层宽度</span><input v-model.number="appearance.popperWidth" type="number" /></label>
          <label><span>圆角</span><input v-model.number="appearance.radius" type="number" /></label>
        </template>
        <template #column-3>
          <label><span>背景色</span><input v-model="appearance.backgroundColor" type="color" /></label>
          <label><span>边框色</span><input v-model="appearance.borderColor" type="color" /></label>
          <label><span>文字色</span><input v-model="appearance.textColor" type="color" /></label>
          <label><span>悬浮背景色</span><input v-model="appearance.hoverBackgroundColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.hideOnClick" type="checkbox" /><span>点击后隐藏</span></label>
          <label class="story-check"><input v-model="appearance.showArrow" type="checkbox" /><span>显示箭头</span></label>
        </template>
        <template #events>
          <label><span>command 事件</span><input :value="appearance.command" type="text" readonly /></label>
        </template>
      </ElementStylePlayground>
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
