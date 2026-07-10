<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XGroupContainer } from './index'
import type { GroupContainerBorderStyle, GroupContainerTitlePosition } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  title: '基础设置',
  titlePosition: 'top-left' as GroupContainerTitlePosition,
  width: '100%',
  height: '',
  padding: 16,
  radius: 6,
  borderStyle: 'solid' as GroupContainerBorderStyle,
  titleTextColor: '#303133',
  titleBackgroundColor: '#ffffff',
  titlePadding: '0 8px',
  titleFontSize: 14
})
</script>

<template>
  <Story title="基础组件/GroupContainer 分组容器" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XGroupContainer
            v-bind="styleProps"
            :title="appearance.title"
            :title-position="appearance.titlePosition"
            :width="appearance.width"
            :height="appearance.height || undefined"
            :padding="appearance.padding"
            :radius="appearance.radius"
            :border-style="appearance.borderStyle"
            :title-text-color="appearance.titleTextColor"
            :title-background-color="appearance.titleBackgroundColor"
            :title-padding="appearance.titlePadding"
            :title-font-size="appearance.titleFontSize"
          >
            <div class="group-container-story__content">用于承载同一分类下的表单或页面内容。</div>
          </XGroupContainer>
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" /></label>
          <label><span>标题位置</span><select v-model="appearance.titlePosition"><option value="top-left">top-left</option><option value="top-center">top-center</option><option value="top-right">top-right</option><option value="bottom-left">bottom-left</option><option value="bottom-center">bottom-center</option><option value="bottom-right">bottom-right</option></select></label>
          <label><span>内边距</span><input v-model.number="appearance.padding" type="number" min="0" /></label>
          <label><span>圆角</span><input v-model.number="appearance.radius" type="number" min="0" /></label>
        </template>
        <template #column-2>
          <label><span>宽度</span><input v-model="appearance.width" /></label>
          <label><span>高度</span><input v-model="appearance.height" type="number" min="0" /></label>
          <label><span>边框样式</span><select v-model="appearance.borderStyle"><option value="solid">solid</option><option value="dashed">dashed</option><option value="dotted">dotted</option><option value="double">double</option></select></label>
          <label><span>标题内边距</span><input v-model="appearance.titlePadding" /></label>
        </template>
        <template #column-3>
          <label><span>标题文字色</span><input v-model="appearance.titleTextColor" type="color" /></label>
          <label><span>标题背景色</span><input v-model="appearance.titleBackgroundColor" type="color" /></label>
          <label><span>标题字号</span><input v-model.number="appearance.titleFontSize" type="number" min="0" /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.group-container-story__content {
  line-height: 1.6;
}
</style>
