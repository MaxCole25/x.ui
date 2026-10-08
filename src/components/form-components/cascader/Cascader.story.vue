<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XCascader } from './index'
import type { CascaderProps, CascaderOption } from './src/types'
import '../../../styles/index.css'
const options: CascaderOption[] = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      { label: '杭州', value: 'hangzhou' },
      { label: '宁波', value: 'ningbo' },
      { label: '绍兴（禁用）', value: 'shaoxing', disabled: true }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      { label: '南京', value: 'nanjing' },
      { label: '苏州', value: 'suzhou' }
    ]
  },
  {
    label: '广东',
    value: 'guangdong',
    children: [
      { label: '深圳', value: 'shenzhen' },
      { label: '广州', value: 'guangzhou' }
    ]
  }
]
const initialProps = {
  modelValue: ['zhejiang', 'hangzhou'],
  placeholder: '请选择省市',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  autoWidth: false,
  displayField: 'label',
  status: 'default',
  prefix: '地区',
  suffix: '必选',
  separator: ' / ',
  changeOnSelect: false,
  popperMaxHeight: 260,
  teleportTo: 'body',
  activeBorderColor: '#1264f4',
  clearIconColor: '#64748b',
  clearIconSize: 16,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#94a3b8',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 14,
  height: 32,
  autoHeight: false,
  padding: '0 8px',
  radius: 6,
  textAlign: 'left',
  inputBackgroundColor: '#ffffff',
  name: 'area',
  id: 'cascader-area',
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  showActiveBorder: true,
  options,
  remoteMethod: async (option?: CascaderOption) => option ? options.find(root => root.value === option.value)?.children ?? [] : options
} satisfies CascaderProps
</script>

<template>
  <Story title="Form 组件/Cascader 级联选择器" group="components">
    <Variant title="外观接口">
      <p>浮层验收：打开后切换 teleported、滚动或调整窗口；快速关闭、重开及恢复默认，检查浮层位置和事件日志。</p>
      <ApiPlayground component="XCascader" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XCascader v-bind="apiProps" class="story-cascader--wide" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-cascader--wide { width: 360px; }
</style>
