<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive, ref } from 'vue'
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
  fontSize: 14 as number,
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
      <ApiPlayground component="XFloatButtonGroup" :sample-count="3">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XFloatButtonGroup
              :items="items"
              :mode="appearance.mode"
              :model-value="expanded"

              :position="appearance.position"

              :top="appearance.top === '' ? undefined : Number(appearance.top)"
              :right="appearance.right === '' ? undefined : Number(appearance.right)"
              :bottom="appearance.bottom === '' ? undefined : Number(appearance.bottom)"
              :left="appearance.left === '' ? undefined : Number(appearance.left)"

              @update:model-value="handleUpdate"
              @item-click="eventState.itemClick = String($event.key)"
              @trigger-click="eventState.triggerClick = String($event)"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
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
