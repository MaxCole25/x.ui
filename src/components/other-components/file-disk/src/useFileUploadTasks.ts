import { ref, onBeforeUnmount } from 'vue'
import type { FileDiskUploadStatus, FileDiskUploadProgress } from './types'

export function useFileUploadTasks() {
const timers: number[] = []
onBeforeUnmount(() => timers.forEach(timer => window.clearTimeout(timer)))
const uploadTasks = ref<Array<{
  id: string
  name: string
  size: number
  percent: number
  status: FileDiskUploadStatus
}>>([])

function startUploadTasks(files: File[]) {
  const now = Date.now()
  uploadTasks.value = [
    ...uploadTasks.value,
    ...files.map((file, index) => ({
      id: `${now}-${index}-${file.name}`,
      name: file.name,
      size: file.size,
      percent: 0,
      status: 'uploading' as FileDiskUploadStatus
    }))
  ]
}

function updateUploadProgress(progress: FileDiskUploadProgress) {
  uploadTasks.value = uploadTasks.value.map((task) =>
    task.name === progress.file.name && task.size === progress.file.size
      ? { ...task, percent: clampPercent(progress.percent), status: 'uploading' }
      : task
  )
}

function finishUploadTasks(files: File[], status: FileDiskUploadStatus) {
  const fileKeys = new Set(files.map((file) => `${file.name}:${file.size}`))
  uploadTasks.value = uploadTasks.value.map((task) =>
    fileKeys.has(`${task.name}:${task.size}`)
      ? { ...task, percent: status === 'success' ? 100 : task.percent, status }
      : task
  )
  timers.push(window.setTimeout(() => {
    uploadTasks.value = uploadTasks.value.filter((task) => !fileKeys.has(`${task.name}:${task.size}`))
  }, status === 'success' ? 1400 : 4200))
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) {
    return 0
  }
  return Math.max(0, Math.min(100, Math.round(value)))
}
return { uploadTasks, startUploadTasks, updateUploadProgress, finishUploadTasks, clampPercent }
}
