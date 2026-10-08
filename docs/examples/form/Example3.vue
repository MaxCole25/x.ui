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
  <XGrid :columns="1" width="min(100%, 420px)">
    <XForm label-position="top">
      <XFormItem prop="username" error="用户名称需要保持唯一。">
        <template #label>用户名称</template>
        <XInput v-model="form.username" placeholder="请输入用户名称" status="error" />
        <template #error>用户名称需要保持唯一。</template>
      </XFormItem>
      <XFormItem label="备注">
        <XInput placeholder="请输入备注" />
        <template #help>帮助文本可用来解释字段填写规则。</template>
      </XFormItem>
    </XForm>
  </XGrid>
</template>
