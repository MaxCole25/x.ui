<script setup lang="ts">
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { reactive } from 'vue'
import XForm from './src/Form.vue'
import XFormItem from './src/FormItem.vue'
import XInput from '../input/src/Input.vue'
import XRichTextEditor from '../../other-components/rich-text-editor/src/RichTextEditor.vue'
import XSwitch from '../switch/src/Switch.vue'

const sample = reactive({
  input: '外观接口预览',
  customerId: '',
  autocomplete: '上海',
  cascader: [],
  checked: true,
  radio: 'A',
  select: 'vue',
  color: '#1264f4',
  date: '2026-05-12',
  dateTime: '2026-05-12T09:30',
  time: '09:30',
  number: 36,
  hasDrawing: true,
  reviewed: false,
  archived: true,
  taxIncluded: true,
  remark: '<p>固定高度容器中的备注内容。</p>',
  centeredSwitch: true
})

const formControls = reactive({
  height: 'auto'
})
</script>

<template>
  <Story title="Form 组件/Form 表单" group="components">
    

    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <div class="x-form-story-shell">
            <XForm v-bind="styleProps" :height="formControls.height" style="max-width: 520px">
              <XFormItem label="姓名">
                <XInput v-model="sample.input" />
              </XFormItem>
            </XForm>
            <XForm label-position="left" label-width="86px" style="max-width: 520px">
              <XFormItem label="客户ID" size="sm" align="center" help="内容区保持满宽，提示文案仍在控件下方换行。">
                <XInput v-model="sample.customerId" placeholder="宽输入框占满 label 后的剩余宽度" style="width: 100%" />
              </XFormItem>
              <XFormItem label="启用状态" size="sm" align="center">
                <XSwitch v-model="sample.checked" size="md" label-position="inside" active-text="开" inactive-text="关" />
              </XFormItem>
              <XFormItem label="含税" size="sm" align="center" content-justify="end">
                <XSwitch v-model="sample.taxIncluded" size="md" label-position="inside" active-text="是" inactive-text="否" />
              </XFormItem>
              <XFormItem label="居中开关" size="sm" align="center" content-justify="center">
                <XSwitch v-model="sample.centeredSwitch" size="md" label-position="inside" active-text="开" inactive-text="关" />
              </XFormItem>
            </XForm>
            <XForm label-position="left" label-width="86px" style="max-width: 360px">
              <XFormItem label="含税" content-justify="end">
                <XSwitch v-model="sample.checked" />
              </XFormItem>
              <XFormItem label="付款方式" content-align="center" label-align="center">
                <XInput v-model="sample.select" text-align="center" />
              </XFormItem>
            </XForm>
            <div class="x-form-story-fill-panel">
              <XFormItem label="备注" label-position="top" content-full-height>
                <XRichTextEditor v-model="sample.remark" full-height :show-outline="false" />
              </XFormItem>
            </div>
            <div class="x-form-story-inline-controls">
              <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center" content-justify="end">
                <XSwitch v-model="sample.hasDrawing" size="md" label-position="inside" active-text="是" inactive-text="否" />
              </XFormItem>
              <XFormItem label="已复核" label-position="left" label-width="58px" size="sm" align="center" content-justify="end">
                <XSwitch v-model="sample.reviewed" size="md" label-position="inside" active-text="是" inactive-text="否" />
              </XFormItem>
              <XFormItem label="已归档" label-position="left" label-width="58px" size="sm" align="center" content-justify="end">
                <XSwitch v-model="sample.archived" size="md" label-position="inside" active-text="是" inactive-text="否" />
              </XFormItem>
            </div>
            <div class="x-form-story-dark-panel">
              <XForm label-position="left" label-width="86px">
                <XFormItem
                  label="审批人"
                  required
                  help="通过 props 覆盖 label、内容、背景、边框和提示色。"
                  label-text-color="#dbeafe"
                  content-text-color="#f8fafc"
                  background-color="#111827"
                  border-color="#334155"
                  required-mark-color="#fb7185"
                  error-text-color="#f87171"
                  hint-text-color="#94a3b8"
                  style="--x-form-item-border-width: 1px; border-radius: 6px; padding: 10px 12px;"
                >
                  <XInput v-model="sample.input" background-color="#0f172a" border-color="#475569" color="#f8fafc" placeholder="请输入审批人" />
                </XFormItem>
                <XFormItem
                  label="备注"
                  help="通过父级 CSS variables 统一暗色主题。"
                  class="x-form-story-dark-item"
                >
                  <XInput v-model="sample.customerId" background-color="#0f172a" border-color="#475569" color="#f8fafc" placeholder="请输入备注" />
                </XFormItem>
              </XForm>
            </div>
          </div>
        </template>
        <template #column-1>
          <label>
            <span>高度</span>
            <input v-model="formControls.height" type="text" />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.x-form-story-shell {
  display: grid;
  gap: 16px;
}

.x-form-story-inline-controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
}

.x-form-story-fill-panel {
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  box-sizing: border-box;
  height: 320px;
  min-height: 0;
  padding: 12px;
}

.x-form-story-dark-panel {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
}

.x-form-story-dark-item {
  --x-form-item-bg: #111827;
  --x-form-item-border-color: #334155;
  --x-form-item-border-width: 1px;
  --x-form-item-content-color: #f8fafc;
  --x-form-item-error-color: #f87171;
  --x-form-item-hint-color: #94a3b8;
  --x-form-item-label-color: #dbeafe;
  --x-form-item-required-color: #fb7185;
  border-radius: 6px;
  padding: 10px 12px;
}
</style>
