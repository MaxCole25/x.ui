<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XRichTextEditor } from './index'
import '../../../styles/index.css'
const initialProps = { modelValue: '<p>在当前编辑器中按 Ctrl/Cmd+S</p>', canSave: true, minHeight: 220, showOutline: false }
</script>

<template>
  <Story title="其它组件/富文本 RichTextEditor" group="components">
    <Variant title="外观接口">
      <p>两个实例共享控件配置；保存快捷键应只产生一次 save-doc 日志。聚焦下方输入框时不触发编辑器保存。</p>
      <input placeholder="其它控件焦点" />
      <ApiPlayground component="XRichTextEditor" :initial-props="initialProps" :sample-count="2">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XRichTextEditor style="width: 48%" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
