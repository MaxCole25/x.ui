<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XScrollbar } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/Scrollbar 滚动条" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XScrollbar" :create-initial-props="() => ({ height: 180 })">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XScrollbar     style="width: 100%" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <div style="height: 360px; width: 900px; padding: 12px">主题滚动条预览<br />横向与纵向滚动<br />切换外观接口主题，轨道透明、滑块随主题变化</div>
          </XScrollbar>
        </template>
      </ApiPlayground>
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
