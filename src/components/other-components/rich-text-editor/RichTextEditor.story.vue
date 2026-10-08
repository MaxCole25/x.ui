<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS, XRichTextEditor } from './index'
import '../../../styles/index.css'
const initialDoc = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { textAlign: 'left', level: 1 },
      content: [{ type: 'text', text: '欢迎使用 XRichTextEditor' }]
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [{ type: 'text', text: '这是从 NexMod XlEdit 迁移来的完整富文本编辑器，可测试工具栏、代码块、表格、大纲、附件和 Markdown 导入。' }]
    }
  ]
}
const content = ref(JSON.stringify(initialDoc))
const latestHtml = ref('')
const saveCount = ref(0)
const state = reactive({
  readonly: false,
  showToolbar: true,
  showOutline: true,
  canSave: true,
  pasteImages: true,
  fullHeight: false,
  minHeight: 420,
  contentFontSize: 14
})
const visibleTools = ref([...RICH_TEXT_EDITOR_TOOLBAR_BUTTONS])
function handleSave() {
  saveCount.value += 1
}
</script>

<template>
  <Story title="其它组件/富文本 RichTextEditor" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XRichTextEditor">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XRichTextEditor 
            v-model="content"

            :can-save="state.canSave"
            :paste-images="state.pasteImages"

            :toolbar-buttons="visibleTools"
            @save-doc="handleSave"
            @html-change="latestHtml = $event"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
