<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XLayout } from './index'
import type { LayoutMode } from './src/types'
import '../../../styles/index.css'
const state = reactive({
  mode: 'top-sidebar' as LayoutMode,
  fullHeight: true,
  sidebarWidth: 280,
  sidebarPadding: '12px',
  contentPadding: '0px',
  sidebarCollapsed: false,
  gap: 0,
  topbarRadius: 0,
  sidebarRadius: 0,
  contentRadius: 0,
  footerRadius: 0,
  showBorders: true
})
</script>

<template>
  <Story title="基础组件/布局 Layout" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XLayout">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XLayout
          :mode="state.mode"

          :sidebar-collapsed="state.sidebarCollapsed"

          :topbar-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
          :sidebar-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
          :footer-border="state.showBorders ? '1px solid rgba(255, 255, 255, 0.42)' : 'none'"
         v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
          <template #topbar>
            <div class="layout-block layout-topbar">
              <span>Topbar</span>
              <small>topbarBorderColor 只显示下边框</small>
            </div>
          </template>

          <template #sidebar>
            <div class="layout-block layout-sidebar">
              <span>Sidebar</span>
              <small>sidebarBorderColor 只显示右边框</small>
            </div>
          </template>

          <div class="layout-block layout-content">
            <span>Content</span>
            <span>主内容区域</span>
          </div>

          <template #footer>
            <div class="layout-block layout-footer">
              <span>Footer</span>
              <small>footerBorderColor 只显示上边框</small>
            </div>
          </template>
        </XLayout>
        </template>
      </ApiPlayground>
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
