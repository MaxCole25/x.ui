<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { overlayZIndex } from '../../_utils/zIndex'
import XSelect from './src/Select.vue'
import type { SelectProps } from './src/types'
import '../../../styles/index.css'
const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vite', value: 'vite' },
  { label: 'Vitest（禁用）', value: 'vitest', disabled: true }
]
const querySampleOptions = async () => selectOptions
const initialProps = {
  modelValue: 'vue',
  fieldNames: {
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  },
  placeholder: '请选择技术栈',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  multiple: false,
  remote: false,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无数据',
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  popperMaxWidth: 360,
  autoWidth: false,
  showActiveBorder: true,
  displayField: 'label',
  status: 'default',
  prefix: '技术',
  suffix: '必选',
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
  name: 'tech',
  id: 'select-tech',
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  popperBackgroundColor: '#ffffff',
  textColor: '#0f172a',
  accentColor: '#1264f4',
  options: selectOptions,
  remoteMethod: querySampleOptions
} satisfies SelectProps
</script>

<template>
  <Story title="Form 组件/Select 选择器" group="components">
    <Variant title="外观接口">
      <p>浮层验收：打开后切换 teleported、滚动或调整窗口；快速关闭、重开及恢复默认，检查浮层位置和事件日志。</p>
      <ApiPlayground component="XSelect" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XSelect v-bind="apiProps" class="story-select--wide" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-select--wide {
  width: 360px;
}
</style>
