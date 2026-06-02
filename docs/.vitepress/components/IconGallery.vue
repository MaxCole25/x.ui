<script setup lang="ts">
import { computed, ref } from 'vue'
import { XIcon } from '../../../src/components/basic-components/icon'
import { remixIconNames } from '../../../src/components/basic-components/icon/src/iconNames'

const keyword = ref('')
const iconNames = remixIconNames

const filteredIcons = computed(() => {
  const value = keyword.value.trim().toLowerCase()

  if (!value) {
    return iconNames
  }

  return iconNames.filter((name) => name.includes(value))
})
</script>

<template>
  <div class="x-icon-gallery">
    <label class="x-icon-gallery__search">
      <span>搜索图标</span>
      <input v-model="keyword" placeholder="输入英文关键词，例如 home、file、arrow" />
    </label>

    <p class="x-icon-gallery__count">
      共 {{ iconNames.length }} 个图标，当前显示 {{ filteredIcons.length }} 个。
    </p>

    <div class="x-icon-gallery__grid">
      <div v-for="iconName in filteredIcons" :key="iconName" class="x-icon-gallery__item">
        <XIcon :name="iconName" size="lg" />
        <code>{{ iconName }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.x-icon-gallery {
  display: grid;
  gap: 16px;
  margin: 20px 0;
}

.x-icon-gallery__search {
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  gap: 12px;
  padding: 12px;
}

.x-icon-gallery__search span {
  color: var(--vp-c-text-2);
  flex: 0 0 auto;
  font-size: 14px;
}

.x-icon-gallery__search input {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  flex: 1 1 auto;
  font-size: 14px;
  min-height: 36px;
  min-width: 0;
  padding: 0 10px;
}

.x-icon-gallery__count {
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin: 0;
}

.x-icon-gallery__grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  max-height: 720px;
  overflow: auto;
  padding-right: 4px;
}

.x-icon-gallery__item {
  align-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  display: grid;
  gap: 8px;
  justify-items: center;
  min-height: 92px;
  padding: 12px 8px;
}

.x-icon-gallery__item .x-icon {
  color: var(--vp-c-brand-1);
  font-size: 28px;
}

.x-icon-gallery__item code {
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.3;
  overflow-wrap: anywhere;
  padding: 0;
  text-align: center;
}
</style>
