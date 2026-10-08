<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import { XJsonEditor } from './index'
import '../../../styles/index.css'
const json = ref('{\n  "name": "@x-soft88/x-ui",\n  "version": "0.1.0"\n}')
const state = reactive({
  title: 'JSON 数据对象',
  resizable: true
})
</script>

<template>
  <Story title="其它组件/JSON编辑器 JsonEditor" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XJsonEditor">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XJsonEditor  v-model="json" :title="state.title" :resizable="state.resizable"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
