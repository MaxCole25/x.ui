<script setup lang="ts">
import ElementStylePlayground from '../_story/ElementStylePlayground.vue'
import { computed, reactive } from 'vue'
import { XButton } from './index'
import type { ButtonSize, ButtonVariant } from './src/types'
import '../../styles/index.css'

const state = reactive({
  label: '操作按钮',
  variant: 'solid' as ButtonVariant,
  size: 'md' as ButtonSize,
  loading: false,
  disabled: false,
  clickCount: 0
})

const previewCode = computed(() => {
  const attrs = [
    state.variant !== 'solid' ? `variant="${state.variant}"` : '',
    state.size !== 'md' ? `size="${state.size}"` : '',
    state.loading ? 'loading' : '',
    state.disabled ? 'disabled' : ''
  ].filter(Boolean)

  return `<XButton${attrs.length ? ` ${attrs.join(' ')}` : ''}>${state.label}</XButton>`
})

function handleClick() {
  state.clickCount += 1
}

const sample = reactive({
  input: '外观接口预览',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36
})

const selectOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' }
]

const autocompleteOptions = [
  { label: '上海', value: '上海' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]
</script>

<template>
  <Story title="元素/Button 按钮" group="components">
    <Variant title="交互式验收">
      <div class="story-playground">
        <div class="story-preview">
          <XButton
            :variant="state.variant"
            :size="state.size"
            :loading="state.loading"
            :disabled="state.disabled"
            @click="handleClick"
          >
            {{ state.label }}
          </XButton>
          <span class="story-muted">点击次数：{{ state.clickCount }}</span>
        </div>

        <div class="story-controls">
          <label>
            <span>按钮文案</span>
            <input v-model="state.label" />
          </label>

          <label>
            <span>类型</span>
            <select v-model="state.variant">
              <option value="solid">主要按钮</option>
              <option value="outline">描边按钮</option>
              <option value="ghost">文本按钮</option>
            </select>
          </label>

          <label>
            <span>尺寸</span>
            <select v-model="state.size">
              <option value="sm">小</option>
              <option value="md">默认</option>
              <option value="lg">大</option>
            </select>
          </label>

          <label class="story-check">
            <input v-model="state.loading" type="checkbox" />
            <span>加载中</span>
          </label>

          <label class="story-check">
            <input v-model="state.disabled" type="checkbox" />
            <span>禁用</span>
          </label>
        </div>

        <pre><code>{{ previewCode }}</code></pre>
      </div>
    </Variant>

    <Variant title="类型">
      <div class="story-row">
        <XButton>主要按钮</XButton>
        <XButton variant="outline">描边按钮</XButton>
        <XButton variant="ghost">文本按钮</XButton>
      </div>
    </Variant>

    <Variant title="尺寸">
      <div class="story-row">
        <XButton size="sm">小按钮</XButton>
        <XButton>默认按钮</XButton>
        <XButton size="lg">大按钮</XButton>
      </div>
    </Variant>

    <Variant title="状态">
      <div class="story-row">
        <XButton loading>加载中</XButton>
        <XButton disabled>禁用状态</XButton>
      </div>
    </Variant>

    <Variant title="边界文本">
      <div class="story-row story-column">
        <XButton>确认</XButton>
        <XButton variant="outline">这是一段较长的按钮文案</XButton>
        <XButton variant="ghost" size="lg">提交并继续下一步操作</XButton>
      </div>
    </Variant>

    <Variant title="外观接口">
      <ElementStylePlayground v-slot="styleProps">
        <XButton v-bind="styleProps">外观按钮</XButton>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.story-preview {
  align-items: center;
  background:
    linear-gradient(135deg, rgba(21, 94, 117, 0.08), rgba(8, 145, 178, 0.04)),
    #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 132px;
  padding: 28px;
}

.story-muted {
  color: #64748b;
  font-size: 14px;
}

.story-controls {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 18px;
}

.story-controls label,
.story-check {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
}

.story-controls label:not(.story-check) {
  justify-content: space-between;
}

.story-controls input:not([type="checkbox"]),
.story-controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  padding: 0 10px;
}

.story-playground pre {
  background: #0f172a;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 16px;
}

.story-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
}

.story-column {
  align-items: flex-start;
  flex-direction: column;
}
</style>
