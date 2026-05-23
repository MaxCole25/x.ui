<script setup lang="ts">
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
  fillHeight: false,
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
      <div style="display: grid; gap: 12px">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 13px">
          <label><input v-model="state.readonly" type="checkbox" />只读</label>
          <label><input v-model="state.showToolbar" type="checkbox" />显示工具栏</label>
          <label><input v-model="state.showOutline" type="checkbox" />显示大纲</label>
          <label><input v-model="state.canSave" type="checkbox" />允许保存</label>
          <label><input v-model="state.pasteImages" type="checkbox" />允许粘贴图片</label>
          <label><input v-model="state.fillHeight" type="checkbox" />填满父容器高度</label>
          <label>最小高度 <input v-model.number="state.minHeight" type="number" min="240" step="20" /></label>
          <label>正文字号 <input v-model.number="state.contentFontSize" type="number" min="12" max="32" /></label>
        </div>

        <details>
          <summary style="cursor: pointer; font-size: 13px">工具栏可见项</summary>
          <div style="display: flex; flex-wrap: wrap; gap: 8px 12px; margin-top: 8px; font-size: 12px">
            <label v-for="tool in RICH_TEXT_EDITOR_TOOLBAR_BUTTONS" :key="tool">
              <input v-model="visibleTools" type="checkbox" :value="tool" />{{ tool }}
            </label>
          </div>
        </details>

        <div :style="{ height: state.fillHeight ? '520px' : 'auto', minHeight: 0 }">
          <XRichTextEditor
            v-model="content"
            :min-height="state.minHeight"
            :fill-height="state.fillHeight"
            :readonly="state.readonly"
            :show-toolbar="state.showToolbar"
            :show-outline="state.showOutline"
            :can-save="state.canSave"
            :paste-images="state.pasteImages"
            :content-font-size="state.contentFontSize"
            :toolbar-buttons="visibleTools"
            @save-doc="handleSave"
            @html-change="latestHtml = $event"
          />
        </div>

        <div style="font-size: 12px; color: #64748b">
          可测试项：Ctrl/Cmd+S 保存、Markdown 导入、复制图片后粘贴、标题/列表/任务、字体/字号/颜色、醒目的引用块、代码块折叠与语言、表格增删改、图片/附件插入、大纲定位、只读状态。
          保存触发次数：{{ saveCount }}
        </div>

        <details>
          <summary style="cursor: pointer; font-size: 13px">查看当前 JSON 字符串</summary>
          <pre style="margin: 8px 0 0; max-height: 220px; overflow: auto; background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px">{{ content }}</pre>
        </details>

        <details>
          <summary style="cursor: pointer; font-size: 13px">查看最新 HTML</summary>
          <pre style="margin: 8px 0 0; max-height: 220px; overflow: auto; background: #102a43; color: #ecfeff; padding: 10px; border-radius: 6px">{{ latestHtml }}</pre>
        </details>
      </div>
    </Variant>
  </Story>
</template>
