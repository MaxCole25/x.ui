<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XContactList } from '../../../src/components/display-components/contact-list'
import { createMessengerDemoState, createMessengerDemoHandlers } from '../../../src/components/other-components/messenger/demo'
import type { MessengerId } from '../../../src/components/other-components/messenger'
const state = reactive(createMessengerDemoState())
const selected = ref<MessengerId>()
const kind = ref<'direct' | 'group'>('direct')
const notice = ref('双击同事或群聊，查看打开会话事件。')
const handlers = createMessengerDemoHandlers(state, () => undefined)
</script>
<template><div><XContactList v-model="selected" v-model:active-kind="kind" :contacts="state.contacts" :contact-groups="state.contactGroups" :groups="state.groups" :width="360" :height="420" @contact-group-action="handlers.contactGroupAction" @open="notice = '打开会话：' + $event.kind + ' / ' + $event.targetId" /><p>{{ notice }}</p></div></template>
