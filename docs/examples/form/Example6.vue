<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' })
const remark = ref('')
import { XGrid, XFormItem, XRichTextEditor } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const username = ref('')
const password = ref('')
const status = ref('enabled')
const enabled = ref(true)
const hasDrawing = ref(false)
const reviewed = ref(false)
const archived = ref(false)
</script>

<template>
  <XGrid :columns="1" height="320px" min-height="0" width="min(100%, 640px)">
    <XFormItem label="备注" label-position="top" content-full-height>
      <XRichTextEditor v-model="form.remark" full-height :show-outline="false" />
    </XFormItem>
  </XGrid>
</template>
