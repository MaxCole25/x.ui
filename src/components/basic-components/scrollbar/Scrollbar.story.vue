<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XScrollbar } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  height: '120px',
  maxHeight: '160px'
})
</script>

<template>
  <Story title="基础组件/Scrollbar 滚动条" group="components">
    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XScrollbar v-bind="styleProps" :height="appearance.height" :max-height="appearance.maxHeight" style="width: 100%">
            <div style="height: 220px; padding: 12px">可滚动内容<br />外观接口预览<br />继续滚动查看内容</div>
          </XScrollbar>
        </template>
        <template #column-2>
          <label>
            <span>高度</span>
            <input v-model="appearance.height" />
          </label>
          <label>
            <span>最大高度</span>
            <input v-model="appearance.maxHeight" />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-stack {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.story-scroll {
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  padding: 12px;
  width: 260px;
}

.story-scroll--wide {
  white-space: nowrap;
}

.story-scroll p {
  margin: 0 0 10px;
}

.story-empty {
  color: #606b7d;
}
</style>
