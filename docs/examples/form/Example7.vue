<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' })
const username = ref('')
import { XGrid, XForm, XFormItem, XInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const password = ref('')
const status = ref('enabled')
const enabled = ref(true)
const hasDrawing = ref(false)
const reviewed = ref(false)
const archived = ref(false)
const remark = ref('')
</script>

<template>
  <XGrid
    :columns="1"
    background-color="#020617"
    radius="6px"
    padding="16px"
    border-width="1px"
    border-style="solid"
    border-color="#1e293b"
  >
    <XGrid :columns="1" width="min(100%, 520px)">
      <XForm label-position="left" label-width="86px">
        <XFormItem
          label="审批人"
          required
          help="通过 props 覆盖当前表单项配色。"
          label-text-color="#dbeafe"
          content-text-color="#f8fafc"
          background-color="#111827"
          border-color="#334155"
          required-mark-color="#fb7185"
          hint-text-color="#94a3b8"
        >
          <XInput
            v-model="form.username"
            background-color="#0f172a"
            border-color="#475569"
            text-color="#f8fafc"
            placeholder="请输入审批人"
          />
        </XFormItem>
      </XForm>
    </XGrid>
  </XGrid>
</template>
