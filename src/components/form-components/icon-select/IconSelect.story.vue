<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import XIconSelect from './src/IconSelect.vue'
import type { IconSelectIconInfo, IconSelectProps } from './src/types'
import '../../../styles/index.css'

const sample = reactive<Required<IconSelectProps>>({
  modelValue: 'home-line',
  size: 'md',
  disabled: false,
  readonly: false,
  placeholder: '双击选择图标',
  emptyText: '暂无图标',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4',
  panelHeight: 320,
  iconSize: 22
})

const parentState = reactive({
  width: 720,
  height: 480,
  fillWidth: false,
  fullHeight: false
})

const eventState = reactive({
  selectCount: 0,
  dblclickCount: 0,
  changeCount: 0
})

const lastIcon = ref<IconSelectIconInfo | null>(null)
const sizeOptions: NonNullable<IconSelectProps['size']>[] = ['sm', 'md', 'lg']

const parentStyle = computed(() => ({
  width: parentState.fillWidth ? '100%' : `${parentState.width}px`,
  height: parentState.fullHeight ? '100%' : `${parentState.height}px`
}))

const lastIconText = computed(() => {
  if (!lastIcon.value) return '暂无返回'

  return `${lastIcon.value.name} / ${lastIcon.value.category} / ${lastIcon.value.variant}`
})

const handleSelect = (icon: IconSelectIconInfo) => {
  eventState.selectCount += 1
  lastIcon.value = icon
}

const handleDblclick = (icon: IconSelectIconInfo) => {
  eventState.dblclickCount += 1
  lastIcon.value = icon
}

const handleChange = (_value: string, icon: IconSelectIconInfo) => {
  eventState.changeCount += 1
  lastIcon.value = icon
}
</script>

<template>
  <Story title="Form 组件/IconSelect 图标选择面板" group="components">
    <Variant title="外观接口">
      <div class="icon-select-appearance">
        <div class="icon-select-appearance__preview">
          <div class="icon-select-appearance__parent" :style="parentStyle">
            <XIconSelect
              v-model="sample.modelValue"
              :size="sample.size"
              :disabled="sample.disabled"
              :readonly="sample.readonly"
              :placeholder="sample.placeholder"
              :empty-text="sample.emptyText"
              :icon-color="sample.iconColor"
              :selected-icon-color="sample.selectedIconColor"
              :accent-color="sample.accentColor"
              :panel-height="sample.panelHeight"
              :icon-size="sample.iconSize"
              @select="handleSelect"
              @dblclick="handleDblclick"
              @change="handleChange"
            />
          </div>
        </div>

        <div class="icon-select-appearance__controls">
          <section class="icon-select-appearance__section">
            <h3>属性</h3>
            <div class="icon-select-appearance__grid">
              <label>
                <span>绑定值</span>
                <input v-model="sample.modelValue" />
              </label>
              <label>
                <span>占位文本</span>
                <input v-model="sample.placeholder" />
              </label>
              <label>
                <span>空状态文本</span>
                <input v-model="sample.emptyText" />
              </label>
              <label>
                <span>尺寸</span>
                <select v-model="sample.size">
                  <option v-for="size in sizeOptions" :key="size" :value="size">{{ size }}</option>
                </select>
              </label>
              <label>
                <span>父元素宽度</span>
                <input v-model.number="parentState.width" type="number" min="240" />
              </label>
              <label>
                <span>父元素高度</span>
                <input v-model.number="parentState.height" type="number" min="220" />
              </label>
              <label>
                <span>面板高度</span>
                <input v-model.number="sample.panelHeight" type="number" min="160" />
              </label>
              <label>
                <span>图标字号</span>
                <input v-model.number="sample.iconSize" type="number" min="12" />
              </label>
              <label>
                <span>图标色</span>
                <input v-model="sample.iconColor" type="color" />
              </label>
              <label>
                <span>选中图标色</span>
                <input v-model="sample.selectedIconColor" type="color" />
              </label>
              <label>
                <span>主题色</span>
                <input v-model="sample.accentColor" type="color" />
              </label>
              <label class="icon-select-appearance__check">
                <input v-model="sample.disabled" type="checkbox" />
                <span>禁用</span>
              </label>
              <label class="icon-select-appearance__check">
                <input v-model="sample.readonly" type="checkbox" />
                <span>只读</span>
              </label>
              <label class="icon-select-appearance__check">
                <input v-model="parentState.fillWidth" type="checkbox" />
                <span>父元素撑满宽度</span>
              </label>
              <label class="icon-select-appearance__check">
                <input v-model="parentState.fullHeight" type="checkbox" />
                <span>父元素撑满高度</span>
              </label>
            </div>
          </section>

          <section class="icon-select-appearance__section">
            <h3>接口</h3>
            <div class="icon-select-appearance__grid">
              <label>
                <span>当前图标</span>
                <input :value="sample.modelValue" readonly />
              </label>
              <label>
                <span>返回信息</span>
                <input :value="lastIconText" readonly />
              </label>
              <label>
                <span>类名</span>
                <input :value="lastIcon?.className ?? '暂无返回'" readonly />
              </label>
              <label>
                <span>分类</span>
                <input :value="lastIcon?.category ?? '暂无返回'" readonly />
              </label>
            </div>
          </section>

          <section class="icon-select-appearance__section">
            <h3>类型</h3>
            <div class="icon-select-appearance__grid">
              <label>
                <span>分类类型</span>
                <input value="IconSelectCategoryName" readonly />
              </label>
              <label>
                <span>返回类型</span>
                <input value="IconSelectIconInfo" readonly />
              </label>
              <label>
                <span>属性类型</span>
                <input value="IconSelectProps" readonly />
              </label>
              <label>
                <span>风格字段</span>
                <input value="line | fill | plain" readonly />
              </label>
            </div>
          </section>

          <section class="icon-select-appearance__section">
            <h3>事件</h3>
            <div class="icon-select-appearance__grid">
              <label>
                <span>select 次数</span>
                <input :value="eventState.selectCount" readonly />
              </label>
              <label>
                <span>dblclick 次数</span>
                <input :value="eventState.dblclickCount" readonly />
              </label>
              <label>
                <span>change 次数</span>
                <input :value="eventState.changeCount" readonly />
              </label>
              <label>
                <span>最近图标</span>
                <input :value="lastIcon?.name ?? '暂无返回'" readonly />
              </label>
            </div>
          </section>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.icon-select-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.icon-select-appearance__preview {
  background: #f8fafc;
  min-height: 520px;
  padding: 24px;
}

.icon-select-appearance__parent {
  align-items: center;
  background: #ecfdf5;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  padding: 10px;
}

.icon-select-appearance__controls {
  display: grid;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
}

.icon-select-appearance__section {
  display: grid;
  gap: 10px;
}

.icon-select-appearance__section h3 {
  color: #102a43;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

.icon-select-appearance__grid {
  display: grid;
  gap: 10px 12px;
  grid-template-columns: repeat(4, 180px);
}

.icon-select-appearance__grid label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
  width: 180px;
}

.icon-select-appearance__grid label > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-select-appearance__grid input,
.icon-select-appearance__grid select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.icon-select-appearance__grid input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}

.icon-select-appearance__check {
  grid-template-columns: auto 1fr;
}
</style>
