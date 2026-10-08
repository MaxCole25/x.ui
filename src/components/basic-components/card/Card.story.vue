<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XCard } from './index'
import type { CardShadow } from './src/types'
import type { FontSize } from '../../_utils/size'
import '../../../styles/index.css'
const appearance = reactive({
  header: '卡片标题',
  footer: '底部内容',
  fontSize: 14 as FontSize,
  shadow: 'always' as CardShadow,
  width: 220,
  height: 150,
  content: '用于承载页面中的成组内容。'
})
</script>

<template>
  <Story title="基础组件/Card 卡片" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XCard">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XCard

            :header="appearance.header"
            :footer="appearance.footer"

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            {{ appearance.content }}
          </XCard>
        </template>
      </ApiPlayground>
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
