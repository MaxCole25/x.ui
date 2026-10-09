<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XContactList, type MessengerContactGroupAction } from './index'
import { createMessengerDemoState, createMessengerDemoHandlers, type MessengerDemoState } from '../../other-components/messenger/demo'
import '../../../styles/index.css'
const createInitialProps = () => { const state = createMessengerDemoState(); return { contacts: state.contacts, contactGroups: state.contactGroups, groups: state.groups, demoSequence: 100, width: 360, height: 400 } }
function publicProps(values: Record<string, unknown>) { const { demoSequence: _demoSequence, ...props } = values; return props }
function updateGroup(payload: MessengerContactGroupAction, values: Record<string, unknown>) { createMessengerDemoHandlers(values as unknown as MessengerDemoState, () => undefined).contactGroupAction(payload) }
</script>
<template><Story title="展示组件/ContactList 通讯录" group="components"><Variant title="外观接口"><ApiPlayground component="XContactList" :create-initial-props="createInitialProps"><template #default="{ apiProps, apiEvents, captureInstance }"><XContactList v-bind="publicProps(apiProps)" v-on="apiEvents" @contact-group-action="updateGroup($event, apiProps)" @vue:mounted="captureInstance" /></template></ApiPlayground></Variant></Story></template>
