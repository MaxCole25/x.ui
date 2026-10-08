<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XTag } from './index'
import type { TagEffect, TagFontSize, TagType } from './src/types'
import '../../../styles/index.css'
const appearance = reactive({
  label: '标签',
  variant: 'primary' as TagType,
  effect: 'light' as TagEffect,
  fontSize: 14 as TagFontSize,
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
      <ApiPlayground component="XTag">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTag

            :effect="appearance.effect"

            :closable="appearance.closable"
            :round="appearance.round"
            :hit="appearance.hit"

            @close="appearance.closeCount += 1"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            {{ appearance.label }} {{ appearance.closeCount ? `关闭 ${appearance.closeCount}` : '' }}
          </XTag>
        </template>
      </ApiPlayground>
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
