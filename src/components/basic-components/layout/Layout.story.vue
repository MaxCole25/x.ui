<script setup lang="ts">
import { computed, reactive } from 'vue'
import { XLayout } from './index'
import type { LayoutMode } from './src/types'
import '../../../styles/index.css'

const state = reactive({
  mode: 'top-sidebar' as LayoutMode,
  fullHeight: true,
  sidebarWidth: 280,
  sidebarPadding: '12px',
  sidebarCollapsed: false,
  gap: 0,
  topbarRadius: 0,
  sidebarRadius: 0,
  contentRadius: 0,
  footerRadius: 0,
  showBorders: true
})

const previewCode = computed(() => {
  const edgeBorder = state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'
  const attrs = [
    state.mode !== 'top-sidebar' ? `mode="${state.mode}"` : '',
    !state.fullHeight ? ':full-height="false"' : '',
    state.sidebarWidth !== 280 ? `:sidebar-width="${state.sidebarWidth}"` : '',
    state.sidebarPadding !== '12px' ? `sidebar-padding="${state.sidebarPadding}"` : '',
    state.sidebarCollapsed ? 'sidebar-collapsed' : '',
    state.gap !== 0 ? `:gap="${state.gap}"` : '',
    state.topbarRadius !== 0 ? `:topbar-radius="${state.topbarRadius}"` : '',
    state.sidebarRadius !== 0 ? `:sidebar-radius="${state.sidebarRadius}"` : '',
    state.contentRadius !== 0 ? `:content-radius="${state.contentRadius}"` : '',
    state.footerRadius !== 0 ? `:footer-radius="${state.footerRadius}"` : '',
    state.showBorders ? `topbar-border="${edgeBorder}"` : '',
    state.showBorders ? `sidebar-border="${edgeBorder}"` : '',
    state.showBorders ? `footer-border="${edgeBorder}"` : ''
  ].filter(Boolean)

  return `<XLayout${attrs.length ? ` ${attrs.join(' ')}` : ''}>
  <template #topbar>...</template>
  <template #sidebar>...</template>
  页面内容
  <template #footer>...</template>
</XLayout>`
})
</script>

<template>
  <Story title="基础组件/布局 Layout" group="components">
    <Variant title="外观接口">
      <div class="layout-playground">
        <div class="layout-controls">
          <label>
            <span>布局模式</span>
            <select v-model="state.mode">
              <option value="top-sidebar">顶部 + 侧栏</option>
              <option value="sidebar-top">侧栏贯穿</option>
              <option value="top-only">仅顶部</option>
            </select>
          </label>

          <label>
            <span>侧栏宽度</span>
            <input v-model.number="state.sidebarWidth" type="number" min="88" max="420" step="4" />
          </label>

          <label>
            <span>区域间距</span>
            <input v-model.number="state.gap" type="number" min="0" max="24" step="1" />
          </label>

          <label>
            <span>侧栏内边距</span>
            <input v-model="state.sidebarPadding" type="text" />
          </label>

          <label>
            <span>顶部圆角</span>
            <input v-model.number="state.topbarRadius" type="number" min="0" max="32" step="1" />
          </label>

          <label>
            <span>侧栏圆角</span>
            <input v-model.number="state.sidebarRadius" type="number" min="0" max="32" step="1" />
          </label>

          <label>
            <span>内容圆角</span>
            <input v-model.number="state.contentRadius" type="number" min="0" max="32" step="1" />
          </label>

          <label>
            <span>底部圆角</span>
            <input v-model.number="state.footerRadius" type="number" min="0" max="32" step="1" />
          </label>

          <label class="layout-check">
            <input v-model="state.sidebarCollapsed" type="checkbox" />
            <span>收起侧栏</span>
          </label>

          <label class="layout-check">
            <input v-model="state.fullHeight" type="checkbox" />
            <span>占满余高</span>
          </label>

          <label class="layout-check">
            <input v-model="state.showBorders" type="checkbox" />
            <span>显示边框样例</span>
          </label>
        </div>

        <XLayout
          :mode="state.mode"
          :full-height="state.fullHeight"
          :sidebar-width="state.sidebarWidth"
          :sidebar-padding="state.sidebarPadding"
          :sidebar-collapsed="state.sidebarCollapsed"
          :gap="state.gap"
          :topbar-radius="state.topbarRadius"
          :sidebar-radius="state.sidebarRadius"
          :content-radius="state.contentRadius"
          :footer-radius="state.footerRadius"
          :topbar-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
          :sidebar-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
          :footer-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
        >
          <template #topbar>
            <div class="layout-block layout-topbar">
              <span>Topbar</span>
              <small>topbarBorder 只显示下边框</small>
            </div>
          </template>

          <template #sidebar>
            <div class="layout-block layout-sidebar">
              <span>Sidebar</span>
              <small>sidebarBorder 只显示右边框</small>
            </div>
          </template>

          <div class="layout-block layout-content">
            <span>Content</span>
            <span>主内容区域</span>
          </div>

          <template #footer>
            <div class="layout-block layout-footer">
              <span>Footer</span>
              <small>footerBorder 只显示上边框</small>
            </div>
          </template>
        </XLayout>

        <pre><code>{{ previewCode }}</code></pre>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.layout-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.layout-controls {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 18px;
}

.layout-controls label,
.layout-check {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
}

.layout-controls label:not(.layout-check) {
  justify-content: space-between;
}

.layout-controls input:not([type='checkbox']),
.layout-controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  padding: 0 10px;
}

.layout-playground :deep(.x-layout) {
  height: 360px;
}

.layout-block {
  align-items: center;
  color: inherit;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 6px;
  justify-content: center;
  min-height: 100%;
  padding: 10px 14px;
}

.layout-block small {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.78;
}

.layout-topbar {
  height: 100%;
}

.layout-sidebar {
  min-height: 100%;
}

.layout-content {
  flex-direction: column;
}

.layout-footer {
  height: 100%;
}

.layout-playground pre {
  background: #0f172a;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 16px;
}
</style>
