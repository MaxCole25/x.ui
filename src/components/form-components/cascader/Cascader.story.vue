<script setup lang="ts">
import { reactive } from 'vue'
import { XCascader } from './index'
import type { CascaderDisplayField, CascaderSize, CascaderStatus, CascaderTextAlign } from './index'
import '../../../styles/index.css'

const options = [
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

const sample = reactive({
  modelValue: ['zhejiang', 'hangzhou'] as Array<string | number | boolean>,
  placeholder: '请选择省市',
  disabled: false,
  readonly: false,
  clearable: true,
  hideClearButton: false,
  autoWidth: false,
  displayField: 'label' as CascaderDisplayField,
  size: 'md' as CascaderSize,
  status: 'default' as CascaderStatus,
  prefix: '地区',
  suffix: '必选',
  separator: ' / ',
  changeOnSelect: false,
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
  textAlign: 'left' as CascaderTextAlign,
  inputBackgroundColor: '#ffffff',
  name: 'area',
  id: 'cascader-area',
  borderWidth: 1,
  borderColor: '#cbd5e1',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
  showActiveBorder: true
})

const sizeOptions: CascaderSize[] = ['sm', 'md', 'lg']
const statusOptions: CascaderStatus[] = ['default', 'success', 'warning', 'error']
const alignOptions: CascaderTextAlign[] = ['left', 'center', 'right']
const displayFieldOptions: CascaderDisplayField[] = ['label', 'value']

const updateRadius = (event: Event) => {
  sample.radius = `${(event.target as HTMLInputElement).value}px`
}
</script>

<template>
  <Story title="Form 组件/Cascader 级联选择器" group="components">
    

    

    <Variant title="外观接口">
      <div class="cascader-appearance">
        <div class="cascader-appearance__preview">
          <XCascader v-bind="sample" v-model="sample.modelValue" :options="options" class="story-cascader story-cascader--wide" />
        </div>

        <div class="cascader-appearance__controls">
          <div class="cascader-appearance__column">
            <label>
              <span>绑定值</span>
              <input :value="sample.modelValue.join(',')" readonly />
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
              <span>分隔符</span>
              <input v-model="sample.separator" />
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

          <div class="cascader-appearance__column">
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

          <div class="cascader-appearance__column">
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
          </div>

          <div class="cascader-appearance__column">
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
              <input v-model="sample.changeOnSelect" type="checkbox" />
              <span>父级可选</span>
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
  min-height: 220px;
  padding: 16px;
}

.story-cascader--medium {
  width: 260px;
}

.story-cascader--wide {
  width: 360px;
}

.cascader-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.cascader-appearance__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  min-height: 132px;
  padding: 24px;
}

.cascader-appearance__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 180px);
  overflow-x: auto;
  padding: 16px;
}

.cascader-appearance__column {
  display: grid;
  gap: 10px;
  width: 180px;
}

.cascader-appearance__column label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
}

.cascader-appearance__column input,
.cascader-appearance__column select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.cascader-appearance__column input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}
</style>
