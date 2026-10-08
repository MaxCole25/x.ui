<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XScrollbar } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="基础组件/Scrollbar 滚动条" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XScrollbar">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XScrollbar     style="width: 100%" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <div style="height: 220px; padding: 12px">可滚动内容<br />外观接口预览<br />继续滚动查看内容</div>
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
