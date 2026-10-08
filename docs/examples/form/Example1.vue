<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' })
const rules = { username: [{ required: true, message: '请输入用户名称' }] }
const username = ref('')
const password = ref('')
const status = ref('enabled')
const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
const enabled = ref(true)
function validate() {
  result.value = '已触发表单校验'
}
function reset() {
  form.value = { enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' }
}
const result = ref('')
import { XGrid, XBrick, XForm, XFormItem, XInput, XSelect, XSwitch, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const hasDrawing = ref(false)
const reviewed = ref(false)
const archived = ref(false)
const remark = ref('')
</script>

<template>
  <XGrid :columns="1" width="min(100%, 560px)">
    <XForm ref="formRef" :model="form" :rules="rules" label-width="96px">
      <XFormItem label="用户名" prop="username" required>
        <XInput v-model="form.username" placeholder="请输入用户名" clearable />
      </XFormItem>
      <XFormItem label="密码" prop="password" required help="密码不少于 6 个字符。">
        <XInput v-model="form.password" type="password" placeholder="请输入密码" />
      </XFormItem>
      <XFormItem label="状态" prop="status">
        <XSelect v-model="form.status" :options="statusOptions" />
      </XFormItem>
      <XFormItem label="启用">
        <XSwitch v-model="form.enabled" active-text="启用" inactive-text="停用" />
      </XFormItem>
      <XFormItem label="操作">
        <XBrick wrap vertical-center :gap="12">
          <XButton @click="validate" width="auto">校验</XButton>
          <XButton variant="outline" @click="reset" width="auto">重置</XButton>
          <span>{{ result }}</span>
        </XBrick>
      </XFormItem>
    </XForm>
  </XGrid>
</template>
