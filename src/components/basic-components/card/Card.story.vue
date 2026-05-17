<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XCard } from './index'
import type { CardShadow } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  header: '卡片标题',
  footer: '底部内容',
  shadow: 'always' as CardShadow,
  width: 220,
  height: 150,
  content: '用于承载 PageBuilder 中的成组内容。'
})
</script>

<template>
  <Story title="基础组件/Card 卡片" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XCard
            v-bind="styleProps"
            :header="appearance.header"
            :footer="appearance.footer"
            :shadow="appearance.shadow"
            :width="appearance.width"
            :height="appearance.height"
          >
            {{ appearance.content }}
          </XCard>
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.header" /></label>
          <label><span>底部</span><input v-model="appearance.footer" /></label>
          <label><span>内容</span><input v-model="appearance.content" /></label>
          <label>
            <span>阴影</span>
            <select v-model="appearance.shadow">
              <option value="always">always</option>
              <option value="hover">hover</option>
              <option value="never">never</option>
            </select>
          </label>
        </template>
        <template #column-2>
          <label><span>宽度</span><input v-model.number="appearance.width" type="number" min="0" /></label>
          <label><span>高度</span><input v-model.number="appearance.height" type="number" min="0" /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}
</style>
