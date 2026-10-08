<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XEmpty } from './index'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  description: '暂无数据',
  actionText: '刷新',
  image: '',
  imageSize: 96,
  actionCount: 0
})
</script>

<template>
  <Story title="展示组件/Empty 空状态" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XEmpty">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XEmpty   :description="appearance.description" :action-text="appearance.actionText" :image="appearance.image || undefined"  @action="appearance.actionCount += 1"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
