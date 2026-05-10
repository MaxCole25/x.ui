<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XJsonEditor } from './index'
import '../../styles/index.css'

const json = ref('{\n  "name": "x.ui",\n  "version": "0.1.0"\n}')
const state = reactive({
  title: 'JSON 数据对象',
  resizable: true
})
</script>

<template>
  <Story title="组件/JSON编辑器 JsonEditor" group="components">
    <Variant title="交互调试">
      <div style="display: grid; gap: 12px">
        <div style="display: flex; gap: 12px; font-size: 13px">
          <label>标题 <input v-model="state.title" /></label>
          <label><input v-model="state.resizable" type="checkbox" />可拖拽高度</label>
        </div>
        <XJsonEditor v-model="json" :title="state.title" :resizable="state.resizable" />
        <pre style="margin: 0; background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px">{{ json }}</pre>
      </div>
    </Variant>
  </Story>
</template>
