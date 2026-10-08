<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XAutocomplete } from './index'
import type { AutocompleteProps, AutocompleteOption } from './src/types'
import '../../../styles/index.css'
const cityOptions: AutocompleteOption[] = [
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '北京', value: 'beijing' },
  { label: '广州', value: 'guangzhou', disabled: true }
]
const initialProps = {
  modelValue: '上海',
  inputValue: '上海',
  valueOnInput: true,
  clearModelValueOnInput: false,
  placeholder: '请输入关键词',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  autoWidth: false,
  status: 'default',
  prefix: '城市',
  suffix: 'CN',
  activeBorderColor: '#1264f4',
  accentColor: '#1264f4',
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
  name: 'city',
  id: 'autocomplete-city',
  maxlength: 20,
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  showActiveBorder: true,
  options: cityOptions,
  displayField: 'label',
  remote: false,
  remoteDebounce: 200,
  remoteMinLength: 0,
  popperMaxHeight: 260,
  popperMaxWidth: 360,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  popperBackgroundColor: '#ffffff',
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无匹配数据',
  remoteMethod: async (keyword: string) => cityOptions.filter(option => option.label.includes(keyword) || option.value.toString().includes(keyword))
} satisfies AutocompleteProps
</script>

<template>
  <Story title="Form 组件/Autocomplete 自动补全输入框" group="components">
    <Variant title="外观接口">
      <p>浮层验收：打开后切换 teleported、滚动或调整窗口；快速关闭、重开及恢复默认，检查浮层位置和事件日志。</p>
      <ApiPlayground component="XAutocomplete" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XAutocomplete v-bind="apiProps" class="story-autocomplete--wide" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-autocomplete--wide { width: 360px; }
</style>
