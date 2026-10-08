<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
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
      <ApiPlayground component="XGroupContainer" :sample-count="3">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XGroupContainer
            :title="appearance.title"
            :title-position="appearance.titlePosition"

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <div class="group-container-story__content">用于承载同一分类下的表单或页面内容。</div>
          </XGroupContainer>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.group-container-story__content {
  line-height: 1.6;
}
</style>
