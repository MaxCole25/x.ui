<script setup lang="ts">
import { computed, reactive } from 'vue'
import { XIcon } from './index'
import { remixIconNames } from './src/iconNames'
import type { IconSize, IconVariant } from './src/types'
import '../../../styles/index.css'

const state = reactive({
  name: 'home',
  variant: 'line' as IconVariant,
  size: 'lg' as IconSize,
  offsetY: '',
  color: '#1264f4',
  title: '首页',
  spin: false
})

const previewCode = computed(() => {
  const attrs = [
    `name="${state.name}"`,
    state.variant !== 'line' ? `variant="${state.variant}"` : '',
    state.size !== 'md' ? `size="${state.size}"` : '',
    state.offsetY ? `offset-y="${state.offsetY}"` : '',
    state.color ? `color="${state.color}"` : '',
    state.title ? `title="${state.title}"` : '',
    state.spin ? 'spin' : ''
  ].filter(Boolean)

  return `<XIcon ${attrs.join(' ')} />`
})
</script>

<template>
  <Story title="基础组件/Icon 图标" group="components">
    <Variant title="外观接口">
      <div class="story-playground">
        <div class="story-preview">
          <XIcon
            :name="state.name"
            :variant="state.variant"
            :size="state.size"
            :offset-y="state.offsetY"
            :color="state.color"
            :title="state.title"
            :spin="state.spin"
          />
          <span class="story-muted">当前图标：{{ state.name }}</span>
        </div>

        <div class="story-controls">
          <label>
            <span>图标名</span>
            <input v-model="state.name" list="x-icon-story-names" />
            <datalist id="x-icon-story-names">
              <option v-for="iconName in remixIconNames" :key="iconName" :value="iconName" />
            </datalist>
          </label>

          <label>
            <span>风格</span>
            <select v-model="state.variant">
              <option value="line">line</option>
              <option value="fill">fill</option>
            </select>
          </label>

          <label>
            <span>尺寸</span>
            <select v-model="state.size">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>

          <label>
            <span>颜色</span>
            <input v-model="state.color" type="color" />
          </label>

          <label>
            <span>垂直偏移</span>
            <input v-model="state.offsetY" placeholder="-1px / 1px" />
          </label>

          <label>
            <span>标题</span>
            <input v-model="state.title" />
          </label>

          <label class="story-check">
            <input v-model="state.spin" type="checkbox" />
            <span>旋转</span>
          </label>
        </div>

        <pre><code>{{ previewCode }}</code></pre>
      </div>
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
  background: #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 132px;
  padding: 28px;
}

.story-preview .x-icon {
  font-size: 36px;
}

.story-muted {
  color: #64748b;
  font-size: 14px;
}

.story-controls {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  gap: 16px;
  padding: 16px;
}

.story-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  padding: 16px;
}

.story-icon-card {
  align-items: center;
  background: #fff;
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  color: #102a43;
  cursor: pointer;
  display: grid;
  gap: 8px;
  justify-items: center;
  min-height: 88px;
  padding: 12px;
}

.story-icon-card span {
  font-size: 12px;
  overflow-wrap: anywhere;
  text-align: center;
}
</style>
