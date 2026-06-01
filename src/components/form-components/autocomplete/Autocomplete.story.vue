<script setup lang="ts">
import { computed, reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import { XAutocomplete } from './index'
import type { AutocompleteDisplayField, AutocompleteOption } from './src/types'
import type { InputSize, InputStatus, InputTextAlign } from '../input'
import '../../../styles/index.css'

const cityOptions: AutocompleteOption[] = [
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '北京', value: 'beijing' },
  { label: '广州', value: 'guangzhou', disabled: true }
]

const sample = reactive({
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
  size: 'md' as InputSize,
  status: 'default' as InputStatus,
  prefix: '城市',
  suffix: 'CN',
  activeBorderColor: '#1264f4',
  accentColor: '#1264f4',
  clearIconColor: '#64748b',
  clearIconSize: 16,
  disabledBackgroundColor: '#f5f7fa',
  disabledTextColor: '#94a3b8',
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: 12,
  height: 30,
  autoHeight: false,
  padding: '0 8px',
  radius: '6px',
  textAlign: 'left' as InputTextAlign,
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
  displayField: 'label' as AutocompleteDisplayField,
  remote: false,
  remoteDebounce: 200,
  remoteMinLength: 0,
  dropdownMaxHeight: 260,
  dropdownMaxWidth: 360,
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.popper,
  dropdownBackgroundColor: '#ffffff',
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无匹配数据',
  parentWidth: 420,
  parentHeight: 96,
  parentFullWidth: false,
  parentFullHeight: false
})

const sizeOptions: InputSize[] = ['sm', 'md', 'lg']
const statusOptions: InputStatus[] = ['default', 'success', 'warning', 'error']
const alignOptions: InputTextAlign[] = ['left', 'center', 'right']
const displayFieldOptions: AutocompleteDisplayField[] = ['label', 'value']

const componentSample = computed(() => {
  const props = { ...sample } as Record<string, unknown>
  delete props.parentWidth
  delete props.parentHeight
  delete props.parentFullWidth
  delete props.parentFullHeight

  return props
})

const updateRadius = (event: Event) => {
  sample.radius = `${(event.target as HTMLInputElement).value}px`
}
</script>

<template>
  <Story title="Form 组件/Autocomplete 自动补全输入框" group="components">
    

    

    

    

    <Variant title="外观接口">
      <div class="autocomplete-appearance">
        <div class="autocomplete-appearance__preview">
          <div
            class="autocomplete-appearance__preview-parent"
            :style="{
              width: sample.parentFullWidth ? '100%' : `${sample.parentWidth}px`,
              height: sample.parentFullHeight ? '100%' : `${sample.parentHeight}px`
            }"
          >
            <XAutocomplete
              v-bind="componentSample"
              v-model="sample.modelValue"
              v-model:input-value="sample.inputValue"
              class="story-autocomplete story-autocomplete--wide"
            />
          </div>
        </div>

        <div class="autocomplete-appearance__controls">
          <div class="autocomplete-appearance__column">
            <label>
              <span>绑定值</span>
              <input v-model="sample.modelValue" />
            </label>
            <label>
              <span>输入文本</span>
              <input v-model="sample.inputValue" />
            </label>
            <label>
              <span>占位文本</span>
              <input v-model="sample.placeholder" />
            </label>
            <label>
              <span>前缀</span>
              <input v-model="sample.prefix" />
            </label>
            <label>
              <span>后缀</span>
              <input v-model="sample.suffix" />
            </label>
            <label>
              <span>ID</span>
              <input v-model="sample.id" />
            </label>
            <label>
              <span>name</span>
              <input v-model="sample.name" />
            </label>
            <label>
              <span>内边距</span>
              <input v-model="sample.padding" />
            </label>
            <label>
              <span>加载文本</span>
              <input v-model="sample.loadingText" />
            </label>
            <label>
              <span>空态文本</span>
              <input v-model="sample.emptyText" />
            </label>
            <label>
              <span>字体</span>
              <select v-model="sample.fontFamily">
                <option value="Inter, Arial, sans-serif">Inter</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
              </select>
            </label>
            <label>
              <span>对齐</span>
              <select v-model="sample.textAlign">
                <option v-for="align in alignOptions" :key="align" :value="align">{{ align }}</option>
              </select>
            </label>
            <label>
              <span>尺寸</span>
              <select v-model="sample.size">
                <option v-for="size in sizeOptions" :key="size" :value="size">{{ size }}</option>
              </select>
            </label>
            <label>
              <span>状态</span>
              <select v-model="sample.status">
                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
              </select>
            </label>
            <label>
              <span>显示字段</span>
              <select v-model="sample.displayField">
                <option v-for="field in displayFieldOptions" :key="field" :value="field">{{ field }}</option>
              </select>
            </label>
          </div>

          <div class="autocomplete-appearance__column">
            <label>
              <span>最大长度</span>
              <input v-model.number="sample.maxlength" type="number" min="1" />
            </label>
            <label>
              <span>父元素宽度</span>
              <input v-model.number="sample.parentWidth" type="number" min="0" />
            </label>
            <label>
              <span>父元素高度</span>
              <input v-model.number="sample.parentHeight" type="number" min="0" />
            </label>
            <label>
              <span>高度</span>
              <input v-model.number="sample.height" type="number" min="20" />
            </label>
            <label>
              <span>字号</span>
              <input v-model.number="sample.fontSize" type="number" min="10" />
            </label>
            <label>
              <span>圆角</span>
              <input
                :value="Number.parseFloat(String(sample.radius))"
                type="number"
                min="0"
                @input="updateRadius"
              />
            </label>
            <label>
              <span>清除尺寸</span>
              <input v-model.number="sample.clearIconSize" type="number" min="10" />
            </label>
            <label>
              <span>边框粗细</span>
              <input v-model.number="sample.borderWidth" type="number" min="0" max="12" />
            </label>
            <label>
              <span>查询延迟</span>
              <input v-model.number="sample.remoteDebounce" type="number" min="0" />
            </label>
            <label>
              <span>最小长度</span>
              <input v-model.number="sample.remoteMinLength" type="number" min="0" />
            </label>
            <label>
              <span>选项框高度</span>
              <input v-model.number="sample.dropdownMaxHeight" type="number" min="80" />
            </label>
            <label>
              <span>选项框宽度</span>
              <input v-model.number="sample.dropdownMaxWidth" type="number" min="120" />
            </label>
            <label>
              <span>下拉层级</span>
              <input v-model.number="sample.zIndex" type="number" min="0" />
            </label>
          </div>

          <div class="autocomplete-appearance__column">
            <label>
              <span>主题色</span>
              <input v-model="sample.accentColor" type="color" />
            </label>
            <label>
              <span>激活边框色</span>
              <input v-model="sample.activeBorderColor" type="color" />
            </label>
            <label>
              <span>边框色</span>
              <input v-model="sample.borderColor" type="color" />
            </label>
            <label>
              <span>背景色</span>
              <input v-model="sample.backgroundColor" type="color" />
            </label>
            <label>
              <span>输入背景色</span>
              <input v-model="sample.inputBackgroundColor" type="color" />
            </label>
            <label>
              <span>文字色</span>
              <input v-model="sample.textColor" type="color" />
            </label>
            <label>
              <span>清除色</span>
              <input v-model="sample.clearIconColor" type="color" />
            </label>
            <label>
              <span>禁用背景色</span>
              <input v-model="sample.disabledBackgroundColor" type="color" />
            </label>
            <label>
              <span>禁用文字色</span>
              <input v-model="sample.disabledTextColor" type="color" />
            </label>
            <label>
              <span>下拉背景色</span>
              <input v-model="sample.dropdownBackgroundColor" type="color" />
            </label>
            <label>
              <span>挂载目标</span>
              <input v-model="sample.teleportTo" />
            </label>
          </div>

          <div class="autocomplete-appearance__column">
            <label>
              <input v-model="sample.parentFullWidth" type="checkbox" />
              <span>父元素撑满宽度</span>
            </label>
            <label>
              <input v-model="sample.parentFullHeight" type="checkbox" />
              <span>父元素撑满高度</span>
            </label>
            <label>
              <input v-model="sample.autoHeight" type="checkbox" />
              <span>自动高度</span>
            </label>
            <label>
              <input v-model="sample.autoWidth" type="checkbox" />
              <span>自动宽度</span>
            </label>
            <label>
              <input v-model="sample.teleported" type="checkbox" />
              <span>挂载到外部</span>
            </label>
            <label>
              <input v-model="sample.showActiveBorder" type="checkbox" />
              <span>显示激活边框</span>
            </label>
            <label>
              <input v-model="sample.disabled" type="checkbox" />
              <span>禁用</span>
            </label>
            <label>
              <input v-model="sample.readonly" type="checkbox" />
              <span>只读</span>
            </label>
            <label>
              <input v-model="sample.clearable" type="checkbox" />
              <span>可清空</span>
            </label>
            <label>
              <input v-model="sample.hideClearButton" type="checkbox" />
              <span>隐藏清除按钮</span>
            </label>
            <label>
              <input v-model="sample.remote" type="checkbox" />
              <span>远程查询</span>
            </label>
            <label>
              <input v-model="sample.valueOnInput" type="checkbox" />
              <span>输入更新值</span>
            </label>
            <label>
              <input v-model="sample.clearModelValueOnInput" type="checkbox" />
              <span>输入清空值</span>
            </label>
            <label>
              <input v-model="sample.loading" type="checkbox" />
              <span>加载中</span>
            </label>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  min-height: 180px;
  padding: 16px;
}

.story-autocomplete--narrow {
  width: 180px;
}

.story-autocomplete--medium {
  width: 260px;
}

.story-autocomplete--wide {
  width: 360px;
}

.autocomplete-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.autocomplete-appearance__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.autocomplete-appearance__preview-parent {
  background: #ecfdf5;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  place-items: center;
}

.autocomplete-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 180px);
  overflow-x: auto;
  padding: 16px;
}

.autocomplete-appearance__column {
  display: grid;
  gap: 10px;
  width: 180px;
}

.autocomplete-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
}

.autocomplete-appearance__column input,
.autocomplete-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.autocomplete-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
