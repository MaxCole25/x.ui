<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ enabled: true, hasDrawing: false, reviewed: false, archived: false, username: '', password: '', status: 'enabled', remark: '' })
const hasDrawing = ref(false)
const reviewed = ref(false)
const archived = ref(false)
import { XBrick, XFormItem, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const username = ref('')
const password = ref('')
const status = ref('enabled')
const enabled = ref(true)
const remark = ref('')
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XFormItem label="含图纸" label-position="left" label-width="58px" :font-size="10" align="center">
      <XSwitch
        v-model="form.hasDrawing"
        :font-size="12"
        label-position="inside"
        active-text="是"
        inactive-text="否"
      />
    </XFormItem>
    <XFormItem label="已复核" label-position="left" label-width="58px" :font-size="10" align="center">
      <XSwitch
        v-model="form.reviewed"
        :font-size="12"
        label-position="inside"
        active-text="是"
        inactive-text="否"
      />
    </XFormItem>
    <XFormItem label="已归档" label-position="left" label-width="58px" :font-size="10" align="center">
      <XSwitch
        v-model="form.archived"
        :font-size="12"
        label-position="inside"
        active-text="是"
        inactive-text="否"
      />
    </XFormItem>
  </XBrick>
</template>
