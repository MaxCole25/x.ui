<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type { UploadFile, UploadProps } from './types'

defineOptions({ name: 'XUpload' })

const props = withDefaults(defineProps<UploadProps>(), { modelValue: () => [], multiple: false, disabled: false, drag: false, autoUpload: true, limit: 0, maxSize: 0, buttonText: '选择文件', tip: '', listType: 'text', size: 'md' })
const emit = defineEmits<{ 'update:modelValue': [files: UploadFile[]]; change: [files: UploadFile[]]; exceed: [files: File[]]; remove: [file: UploadFile, files: UploadFile[]]; progress: [file: UploadFile]; success: [file: UploadFile]; error: [file: UploadFile] }>()
const inputRef = ref<HTMLInputElement | null>(null)
const files = ref<UploadFile[]>([...props.modelValue])
watch(() => props.modelValue, (value) => { files.value = [...(value ?? [])] })
const preset = computed(() => componentSizePreset[props.size])
const styleVars = computed(() => ({ '--x-upload-height': preset.value.height + 'px', '--x-upload-font-size': preset.value.fontSize + 'px', '--x-upload-radius': preset.value.radius }))
function sync(next: UploadFile[]) { files.value = next; emit('update:modelValue', next); emit('change', next) }
function openPicker() { if (!props.disabled) inputRef.value?.click() }
function toUploadFile(file: File): UploadFile { return { uid: Date.now() + '-' + Math.random().toString(36).slice(2), name: file.name, size: file.size, status: 'ready', percentage: 0, raw: file } }
function addFiles(list: File[]) {
  if (props.disabled) return
  const valid = props.maxSize ? list.filter((file) => file.size <= props.maxSize!) : list
  if (props.limit && files.value.length + valid.length > props.limit) { emit('exceed', list); return }
  const next = [...files.value, ...valid.map(toUploadFile)]
  sync(next)
  if (props.autoUpload) next.filter((file) => file.status === 'ready').forEach(uploadFile)
}
function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  addFiles(Array.from(target.files ?? []))
  target.value = ''
}
async function uploadFile(file: UploadFile) {
  if (!file.raw || file.status === 'uploading') return
  file.status = 'uploading'; file.percentage = 0; sync([...files.value])
  try {
    const response = props.requestMethod ? await props.requestMethod(file.raw, (percentage) => { file.percentage = Math.min(100, Math.max(0, percentage)); emit('progress', file); sync([...files.value]) }) : await Promise.resolve(undefined)
    file.status = 'success'; file.percentage = 100; file.response = response; sync([...files.value]); emit('success', file)
  } catch (error) {
    file.status = 'error'; file.error = error; sync([...files.value]); emit('error', file)
  }
}
function removeFile(file: UploadFile) { const next = files.value.filter((item) => item.uid !== file.uid); sync(next); emit('remove', file, next) }
function onDrop(event: DragEvent) { event.preventDefault(); addFiles(Array.from(event.dataTransfer?.files ?? [])) }
function submit() { files.value.filter((file) => file.status === 'ready' || file.status === 'error').forEach(uploadFile) }
function clearFiles() { sync([]) }
defineExpose({ submit, clearFiles, openPicker })
</script>

<template>
  <div class="x-upload" :class="['x-upload--' + props.listType, { 'is-disabled': props.disabled, 'is-drag': props.drag }]" :style="styleVars">
    <div class="x-upload__trigger" @drop="onDrop" @dragover.prevent>
      <slot>
        <button class="x-upload__button" type="button" :disabled="props.disabled" @click="openPicker">{{ props.buttonText }}</button>
      </slot>
      <p v-if="props.tip" class="x-upload__tip">{{ props.tip }}</p>
    </div>
    <input ref="inputRef" class="x-upload__input" type="file" :accept="props.accept" :multiple="props.multiple" :disabled="props.disabled" @change="onFileChange" />
    <ul v-if="files.length" class="x-upload__list">
      <li v-for="file in files" :key="file.uid" class="x-upload__file" :class="'is-' + file.status">
        <span class="x-upload__name">{{ file.name }}</span><span class="x-upload__status">{{ file.percentage }}%</span>
        <button class="x-upload__remove" type="button" :disabled="props.disabled" aria-label="移除文件" @click="removeFile(file)">×</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.x-upload { color: var(--x-color-text); display: grid; font-family: var(--x-font-family); font-size: var(--x-upload-font-size); gap: 8px; min-width: 0; }
.x-upload__trigger { align-items: center; display: grid; gap: 6px; justify-items: start; }
.x-upload.is-drag .x-upload__trigger { border: 1px dashed var(--x-color-border); border-radius: var(--x-upload-radius); justify-items: center; min-height: 96px; padding: 16px; }
.x-upload__button { background: var(--x-color-primary); border: 0; border-radius: var(--x-upload-radius); color: #fff; cursor: pointer; font: 700 var(--x-upload-font-size)/1 var(--x-font-family); height: var(--x-upload-height); padding: 0 12px; }
.x-upload__button:disabled { cursor: not-allowed; opacity: 0.56; }
.x-upload__tip { color: var(--x-color-muted); font-size: 12px; margin: 0; }
.x-upload__input { display: none; }
.x-upload__list { display: grid; gap: 6px; list-style: none; margin: 0; padding: 0; }
.x-upload__file { align-items: center; background: var(--x-color-surface-soft); border-radius: var(--x-upload-radius); display: grid; gap: 8px; grid-template-columns: minmax(0, 1fr) auto auto; min-height: 30px; padding: 0 8px; }
.x-upload__file.is-success { color: var(--x-color-success); }
.x-upload__file.is-error { color: var(--x-color-danger); }
.x-upload__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x-upload__status { color: var(--x-color-muted); font-size: 12px; }
.x-upload__remove { background: transparent; border: 0; color: inherit; cursor: pointer; font: inherit; }
.x-upload.is-disabled { opacity: 0.68; }
</style>
