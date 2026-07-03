<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XFloatButtonGroup } from './index'
import type { FloatButtonGroupDirection, FloatButtonGroupMode, FloatButtonGroupPlacement, FloatButtonGroupPosition } from './src/types'
import '../../../styles/index.css'

const expanded = ref(false)
const eventState = reactive({
  itemClick: '',
  triggerClick: '',
  modelValue: ''
})

const appearance = reactive({
  mode: 'menu' as FloatButtonGroupMode,
  direction: 'vertical' as FloatButtonGroupDirection,
  placement: 'bottom-right' as FloatButtonGroupPlacement,
  position: 'absolute' as FloatButtonGroupPosition,
  size: 'md' as 'sm' | 'md' | 'lg',
  offsetX: 24,
  offsetY: 24,
  top: '',
  right: '',
  bottom: '',
  left: '',
  zIndex: 2000,
  triggerIcon: 'customer-service-2',
  closeIcon: 'close',
  triggerLabel: '快捷菜单',
  tooltipPlacement: '' as '' | 'top' | 'bottom' | 'left' | 'right',
  showTooltip: true,
  disableFirst: false,
  firstLabel: '查看帮助',
  secondLabel: '查看帮助',
  thirdLabel: '返回顶部',
  firstIcon: 'question',
  secondIcon: 'feedback',
  thirdIcon: 'arrow-up'
})

const items = computed(() => [
  {
    key: 'service',
    label: appearance.firstLabel,
    icon: appearance.firstIcon,
    disabled: appearance.disableFirst,
    backgroundColor: '#16a34a'
  },
  {
    key: 'help',
    label: appearance.secondLabel,
    icon: appearance.secondIcon,
    backgroundColor: '#2563eb'
  },
  {
    key: 'top',
    label: appearance.thirdLabel,
    icon: appearance.thirdIcon,
    backgroundColor: '#64748b'
  }
])

function handleUpdate(value: boolean) {
  expanded.value = value
  eventState.modelValue = String(value)
}
</script>

<template>
  <Story title="导航组件/FloatButtonGroup 悬浮按钮组" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <div class="float-button-group-story-stage">
            <XFloatButtonGroup
              :items="items"
              :mode="appearance.mode"
              :model-value="expanded"
              :direction="appearance.direction"
              :placement="appearance.placement"
              :position="appearance.position"
              :size="appearance.size"
              :offset-x="appearance.offsetX"
              :offset-y="appearance.offsetY"
              :top="appearance.top === '' ? undefined : Number(appearance.top)"
              :right="appearance.right === '' ? undefined : Number(appearance.right)"
              :bottom="appearance.bottom === '' ? undefined : Number(appearance.bottom)"
              :left="appearance.left === '' ? undefined : Number(appearance.left)"
              :z-index="appearance.zIndex"
              :trigger-icon="appearance.triggerIcon"
              :close-icon="appearance.closeIcon"
              :trigger-label="appearance.triggerLabel"
              :tooltip-placement="appearance.tooltipPlacement || undefined"
              :show-tooltip="appearance.showTooltip"
              @update:model-value="handleUpdate"
              @item-click="eventState.itemClick = String($event.key)"
              @trigger-click="eventState.triggerClick = String($event)"
            />
          </div>
        </template>

        <template #column-1>
          <label><span>显示状态</span><select v-model="appearance.mode"><option value="menu">menu</option><option value="direct">direct</option></select></label>
          <label><span>排列方向</span><select v-model="appearance.direction"><option value="vertical">vertical</option><option value="horizontal">horizontal</option></select></label>
          <label><span>固定位置</span><select v-model="appearance.placement"><option value="bottom-right">bottom-right</option><option value="bottom-left">bottom-left</option><option value="top-right">top-right</option><option value="top-left">top-left</option></select></label>
          <label><span>定位方式</span><select v-model="appearance.position"><option value="fixed">fixed</option><option value="absolute">absolute</option></select></label>
        </template>

        <template #column-2>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>横向偏移</span><input v-model.number="appearance.offsetX" type="number" /></label>
          <label><span>纵向偏移</span><input v-model.number="appearance.offsetY" type="number" /></label>
          <label><span>层级</span><input v-model.number="appearance.zIndex" type="number" /></label>
        </template>

        <template #column-3>
          <label><span>触发图标</span><input v-model="appearance.triggerIcon" /></label>
          <label><span>触发说明</span><input v-model="appearance.triggerLabel" /></label>
          <label><span>提示位置</span><select v-model="appearance.tooltipPlacement"><option value="">auto</option><option value="top">top</option><option value="bottom">bottom</option><option value="left">left</option><option value="right">right</option></select></label>
          <label><span>top</span><input v-model="appearance.top" type="number" placeholder="auto" /></label>
        </template>

        <template #column-4>
          <label><span>right</span><input v-model="appearance.right" type="number" placeholder="auto" /></label>
          <label><span>bottom</span><input v-model="appearance.bottom" type="number" placeholder="auto" /></label>
          <label><span>left</span><input v-model="appearance.left" type="number" placeholder="auto" /></label>
          <label class="story-check"><input v-model="appearance.showTooltip" type="checkbox" /><span>显示提示</span></label>
        </template>

        <template #interfaces>
          <label><span>items</span><input value="FloatButtonGroupItem[]" readonly /></label>
          <label><span>modelValue</span><input :value="String(expanded)" readonly /></label>
          <label><span>item 插槽</span><input value="自定义图标内容" readonly /></label>
          <label><span>trigger 插槽</span><input value="自定义主按钮内容" readonly /></label>
          <label><span>按钮一说明</span><input v-model="appearance.firstLabel" /></label>
          <label><span>按钮二说明</span><input v-model="appearance.secondLabel" /></label>
          <label><span>按钮三说明</span><input v-model="appearance.thirdLabel" /></label>
          <label class="story-check"><input v-model="appearance.disableFirst" type="checkbox" /><span>禁用按钮一</span></label>
        </template>

        <template #types>
          <label><span>mode</span><input value="menu | direct" readonly /></label>
          <label><span>direction</span><input value="horizontal | vertical" readonly /></label>
          <label><span>placement</span><input value="top-left | top-right | bottom-left | bottom-right" readonly /></label>
          <label><span>position</span><input value="fixed | absolute" readonly /></label>
          <label><span>tooltipPlacement</span><input value="top | bottom | left | right" readonly /></label>
        </template>

        <template #events>
          <label><span>item-click</span><input :value="eventState.itemClick" readonly /></label>
          <label><span>trigger-click</span><input :value="eventState.triggerClick" readonly /></label>
          <label><span>update:modelValue</span><input :value="eventState.modelValue" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.float-button-group-story-stage {
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  display: flex;
  height: 360px;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 100%;
}
</style>
