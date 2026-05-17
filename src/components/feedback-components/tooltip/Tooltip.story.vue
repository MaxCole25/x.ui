<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XTooltip } from './index'
import type { TooltipPlacement, TooltipTrigger } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  content: '提示内容',
  placement: 'top' as TooltipPlacement,
  trigger: 'hover' as TooltipTrigger,
  disabled: false,
  showArrow: true,
  teleported: true,
  teleportTo: 'body'
})
</script>

<template>
  <Story title="反馈组件/Tooltip 文字提示" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XTooltip
            v-bind="styleProps"
            :content="appearance.content"
            :placement="appearance.placement"
            :trigger="appearance.trigger"
            :disabled="appearance.disabled"
            :show-arrow="appearance.showArrow"
            :teleported="appearance.teleported"
            :teleport-to="appearance.teleportTo"
          >
            <XButton width="120px">触发提示</XButton>
          </XTooltip>
        </template>
        <template #column-1>
          <label><span>提示内容</span><input v-model="appearance.content" /></label>
          <label><span>方向</span><select v-model="appearance.placement"><option value="top">top</option><option value="bottom">bottom</option><option value="left">left</option><option value="right">right</option></select></label>
          <label><span>触发</span><select v-model="appearance.trigger"><option value="hover">hover</option><option value="click">click</option><option value="focus">focus</option></select></label>
          <label><span>挂载目标</span><input v-model="appearance.teleportTo" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.showArrow" type="checkbox" /><span>显示箭头</span></label>
          <label class="story-check"><input v-model="appearance.teleported" type="checkbox" /><span>挂载到外部</span></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 48px;
}
</style>
