<script setup lang="ts">
import { computed, reactive } from 'vue'
import { overlayZIndex } from '../../_utils/zIndex'
import XSelect from './src/Select.vue'
import type { SelectDisplayField, SelectSize, SelectStatus, SelectTextAlign } from './src/types'
import '../../../styles/index.css'

const sample = reactive({
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
  dropdownZIndex: overlayZIndex.popper,
  dropdownMaxWidth: 360,
  autoWidth: false,
  showActiveBorder: true,
  displayField: 'label' as SelectDisplayField,
  size: 'md' as SelectSize,
  status: 'default' as SelectStatus,
  prefix: '技术',
  suffix: '必选',
  activeBorderColor: '#1264f4',
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
  textAlign: 'left' as SelectTextAlign,
  background: '#ffffff',
  name: 'tech',
  id: 'select-tech',
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  dropdownBackgroundColor: '#ffffff',
  textColor: '#0f172a',
  color: '#1264f4'
})

const parentState = reactive({
  width: 420,
  height: 160,
  fillWidth: false,
  fillHeight: false
})

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vite', value: 'vite' },
  { label: 'Vitest（禁用）', value: 'vitest', disabled: true }
]

const sizeOptions: SelectSize[] = ['sm', 'md', 'lg']
const statusOptions: SelectStatus[] = ['default', 'success', 'warning', 'error']
const alignOptions: SelectTextAlign[] = ['left', 'center', 'right']
const displayFieldOptions: SelectDisplayField[] = ['label', 'value']

const parentStyle = computed(() => ({
  width: parentState.fillWidth ? '100%' : `${parentState.width}px`,
  height: parentState.fillHeight ? '100%' : `${parentState.height}px`
}))

const updateRadius = (event: Event) => {
  sample.radius = `${(event.target as HTMLInputElement).value}px`
}

const querySampleOptions = async () => selectOptions
</script>

<template>
  <Story title="Form 组件/Select 选择器" group="components">
    

    

    <Variant title="外观接口">
      <div class="select-appearance">
        <div class="select-appearance__preview">
          <div class="select-appearance__parent" :style="parentStyle">
            <XSelect
              v-bind="sample"
              v-model="sample.modelValue"
              :options="selectOptions"
              :remote-method="querySampleOptions"
              class="story-select story-select--wide"
            />
          </div>
        </div>

        <div class="select-appearance__controls">
          <div class="select-appearance__column">
            <label>
              <span>绑定值</span>
              <input v-model="sample.modelValue" />
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
              <span>挂载目标</span>
              <input v-model="sample.teleportTo" />
            </label>
            <label>
              <span>加载文本</span>
              <input v-model="sample.loadingText" />
            </label>
            <label>
              <span>空状态文本</span>
              <input v-model="sample.emptyText" />
            </label>
            <label>
              <span>标签字段</span>
              <input v-model="sample.fieldNames.label" />
            </label>
            <label>
              <span>值字段</span>
              <input v-model="sample.fieldNames.value" />
            </label>
            <label>
              <span>禁用字段</span>
              <input v-model="sample.fieldNames.disabled" />
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

          <div class="select-appearance__column">
            <label>
              <span>父元素宽度</span>
              <input v-model.number="parentState.width" type="number" min="120" />
            </label>
            <label>
              <span>父元素高度</span>
              <input v-model.number="parentState.height" type="number" min="80" />
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
              <span>弹层层级</span>
              <input v-model.number="sample.dropdownZIndex" type="number" min="0" />
            </label>
            <label>
              <span>选项弹窗最大宽度</span>
              <input v-model.number="sample.dropdownMaxWidth" type="number" min="80" />
            </label>
          </div>

          <div class="select-appearance__column">
            <label>
              <span>主题色</span>
              <input v-model="sample.color" type="color" />
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
              <input v-model="sample.background" type="color" />
            </label>
            <label>
              <span>选项弹窗背景色</span>
              <input v-model="sample.dropdownBackgroundColor" type="color" />
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
          </div>

          <div class="select-appearance__column">
            <label>
              <input v-model="sample.autoHeight" type="checkbox" />
              <span>自动高度</span>
            </label>
            <label>
              <input v-model="sample.autoWidth" type="checkbox" />
              <span>自动宽度</span>
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
              <input v-model="sample.multiple" type="checkbox" />
              <span>多选</span>
            </label>
            <label>
              <input v-model="sample.remote" type="checkbox" />
              <span>远程加载</span>
            </label>
            <label>
              <input v-model="sample.loading" type="checkbox" />
              <span>加载中</span>
            </label>
            <label>
              <input v-model="sample.teleported" type="checkbox" />
              <span>弹层挂载</span>
            </label>
            <label>
              <input v-model="parentState.fillWidth" type="checkbox" />
              <span>父元素撑满宽度</span>
            </label>
            <label>
              <input v-model="parentState.fillHeight" type="checkbox" />
              <span>父元素撑满高度</span>
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

.story-stack--narrow {
  max-width: 360px;
}

.story-select--wide {
  width: 360px;
}

.select-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.select-appearance__preview {
  background: #f8fafc;
  min-height: 220px;
  padding: 24px;
}

.select-appearance__parent {
  align-items: center;
  background: #ecfdf5;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  padding: 10px;
}

.select-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 180px);
  overflow-x: auto;
  padding: 16px;
}

.select-appearance__column {
  display: grid;
  gap: 10px;
  width: 180px;
}

.select-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
}

.select-appearance__column input,
.select-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.select-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
