<script setup lang="ts">
import { XButton } from '../../../src/components/basic-components/button'
import { XInput } from '../../../src/components/form-components/input'
import { XTag } from '../../../src/components/display-components/tag'

const themes = [
  { id: 'regular', name: '常规', description: '蓝白素雅' },
  { id: 'dark', name: '深色', description: '深蓝灰工作台' },
  { id: 'light', name: '浅色', description: '纯白线条点缀' }
] as const
</script>

<template>
  <div class="x-theme-preview" aria-label="x.ui 内置主题预览">
    <section v-for="theme in themes" :key="theme.id" class="x-theme-preview__card" :data-theme="theme.id">
      <div class="x-theme-preview__header">
        <div>
          <strong>{{ theme.name }}</strong>
          <span>{{ theme.description }}</span>
        </div>
        <XTag size="sm">{{ theme.id }}</XTag>
      </div>
      <XInput model-value="主题输入框" readonly />
      <div class="x-theme-preview__actions">
        <XButton size="sm">主要操作</XButton>
        <XButton size="sm" variant="outline">次要操作</XButton>
      </div>
      <div class="x-theme-preview__soft-panel">次级面板 / 表格表头</div>
      <div class="x-theme-preview__tooltip">Tooltip / 浮层视觉</div>
    </section>
  </div>
</template>

<style scoped>
.x-theme-preview {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0 28px;
}

.x-theme-preview__card {
  background: var(--x-color-page-background);
  border: 1px solid var(--x-color-border);
  border-radius: 8px;
  color: var(--x-color-text);
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 14px;
}

.x-theme-preview__header,
.x-theme-preview__actions {
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.x-theme-preview__header strong,
.x-theme-preview__header span {
  display: block;
}

.x-theme-preview__header span {
  color: var(--x-color-text-muted);
  font-size: 12px;
  margin-top: 3px;
}

.x-theme-preview__actions {
  justify-content: flex-start;
}

.x-theme-preview__tooltip {
  background: var(--x-tooltip-bg);
  border: var(--x-tooltip-border-width) solid var(--x-tooltip-border-color);
  border-radius: 4px;
  color: var(--x-tooltip-text);
  font-size: 12px;
  padding: 7px 9px;
}

.x-theme-preview__soft-panel {
  background: var(--x-color-surface-soft);
  border: 1px solid var(--x-color-border);
  border-radius: 4px;
  color: var(--x-color-text-muted);
  font-size: 12px;
  padding: 8px 9px;
}

@media (max-width: 860px) {
  .x-theme-preview {
    grid-template-columns: 1fr;
  }
}
</style>
