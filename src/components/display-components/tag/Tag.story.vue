<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XTag } from './index'
import type { TagEffect, TagSize, TagType } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  label: '标签',
  variant: 'primary' as TagType,
  effect: 'light' as TagEffect,
  size: 'md' as TagSize,
  closable: true,
  round: false,
  hit: false,
  disabled: false,
  accentColor: '#1264f4',
  closeCount: 0
})
</script>

<template>
  <Story title="展示组件/Tag 标签" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XTag
            v-bind="styleProps"
            :variant="appearance.variant"
            :effect="appearance.effect"
            :size="appearance.size"
            :closable="appearance.closable"
            :round="appearance.round"
            :hit="appearance.hit"
            :disabled="appearance.disabled"
            :accent-color="appearance.accentColor"
            @close="appearance.closeCount += 1"
          >
            {{ appearance.label }} {{ appearance.closeCount ? `关闭 ${appearance.closeCount}` : '' }}
          </XTag>
        </template>
        <template #column-1>
          <label><span>标签文案</span><input v-model="appearance.label" /></label>
          <label><span>视觉形态</span><select v-model="appearance.variant"><option value="primary">primary</option><option value="success">success</option><option value="warning">warning</option><option value="danger">danger</option><option value="info">info</option></select></label>
          <label><span>效果</span><select v-model="appearance.effect"><option value="light">light</option><option value="dark">dark</option><option value="plain">plain</option></select></label>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
        </template>
        <template #column-3>
          <label><span>主题色</span><input v-model="appearance.accentColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.closable" type="checkbox" /><span>可关闭</span></label>
          <label class="story-check"><input v-model="appearance.round" type="checkbox" /><span>圆形</span></label>
          <label class="story-check"><input v-model="appearance.hit" type="checkbox" /><span>描边命中</span></label>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px;
}
</style>
