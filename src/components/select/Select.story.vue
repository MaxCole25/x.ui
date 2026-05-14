<script setup lang="ts">
import { reactive, ref } from 'vue'
import XOption from './src/Option.vue'
import XSelect from './src/Select.vue'
import type { SelectSize, SelectStatus, SelectTextAlign } from './src/types'
import '../../styles/index.css'

const value = ref('todo')
const multiple = ref(['todo'])
const emptyValue = ref('')
const options = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' },
  { label: '已归档（禁用）', value: 'archived', disabled: true }
]

const sample = reactive({
  modelValue: 'vue',
  placeholder: '请选择技术栈',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  multiple: false,
  autoWidth: false,
  showActiveBorder: true,
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
  textColor: '#0f172a',
  color: '#1264f4'
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

const updateRadius = (event: Event) => {
  sample.radius = `${(event.target as HTMLInputElement).value}px`
}
</script>

<template>
  <Story title="元素/Select 选择器" group="components">
    <Variant title="基础用法">
      <div class="story-stack story-stack--narrow">
        <XSelect v-model="value" :options="options" clearable />
        <XSelect v-model="multiple" multiple placeholder="多选状态">
          <XOption label="待处理" value="todo" />
          <XOption label="处理中" value="doing" />
          <XOption label="已完成" value="done" />
        </XSelect>
        <XSelect placeholder="业务主题覆盖" color="#7c3aed" border-color="#c4b5fd" radius="12px" background="#faf5ff" :options="options" />
      </div>
    </Variant>

    <Variant title="状态与边界">
      <div class="story-stack story-stack--narrow">
        <XSelect v-model="emptyValue" placeholder="空选项列表" :options="[]" clearable />
        <XSelect model-value="todo" :options="options" disabled />
        <XSelect model-value="doing" readonly clearable :options="options" />
        <XSelect v-model="multiple" multiple clearable :options="options" />
      </div>
    </Variant>

    <Variant title="外观接口">
      <div class="select-appearance">
        <div class="select-appearance__preview">
          <XSelect v-bind="sample" v-model="sample.modelValue" :options="selectOptions" class="story-select story-select--wide" />
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
          </div>

          <div class="select-appearance__column">
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
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.select-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 200px);
  overflow-x: auto;
  padding: 16px;
}

.select-appearance__column {
  display: grid;
  gap: 10px;
  width: 200px;
}

.select-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 72px 1fr;
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
