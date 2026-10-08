<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' })
const enabled = ref(true)
const status = ref('enabled')
import { XGrid, XForm, XFormItem, XSwitch, XInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const username = ref('')
const password = ref('')
const hasDrawing = ref(false)
const reviewed = ref(false)
const archived = ref(false)
const remark = ref('')
</script>

<template>
  <XGrid :columns="1" width="min(100%, 360px)">
    <XForm label-position="left" label-width="86px">
      <XFormItem label="含税" content-justify="end">
        <XSwitch v-model="form.enabled" />
      </XFormItem>
      <XFormItem label="付款方式" content-align="center">
        <XInput v-model="form.status" text-align="center" />
      </XFormItem>
    </XForm>
  </XGrid>
</template>
