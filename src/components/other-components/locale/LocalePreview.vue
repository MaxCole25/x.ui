<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { enUS, getLocale, setLocale, zhCN } from '../../../locale'
import { XSelect } from '../../form-components/select'
import { XDatePicker } from '../../form-components/date-picker'
import { XEmpty } from '../../display-components/empty'
import { XPagination } from '../../navigation-components/pagination'
import { XMessageBox } from '../../feedback-components/message-box'

const props = defineProps<{ language: string; placeholder: string; openRequest: number }>()
const emit = defineEmits<{ action: [value: string] }>()
const previousLocale = getLocale()
const page = ref(1)
watch(() => props.language, value => setLocale(value === 'en-US' ? enUS : zhCN), { immediate: true })
watch(() => props.openRequest, () => openMessageBox())
async function openMessageBox() {
  try { emit('action', await XMessageBox.confirm('Vue 3')) }
  catch (action) { emit('action', String(action)) }
}
onBeforeUnmount(() => setLocale(previousLocale))
</script>

<template>
  <div class="locale-preview-content">
    <XSelect :placeholder="props.placeholder || undefined" />
    <XDatePicker />
    <XEmpty />
    <XPagination v-model="page" :total="100" show-total show-page-size />
    <button type="button" @click="openMessageBox">XMessageBox.confirm</button>
  </div>
</template>

<style scoped>
.locale-preview-content { display: grid; gap: 12px; max-width: 100%; }
</style>
