<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { componentSizePreset } from '../../../_utils/size'
import type {
  FileDiskAdapter,
  FileDiskClipboardAction,
  FileDiskClipboardPayload,
  FileDiskColors,
  FileDiskFileUrlUsage,
  FileDiskDownloadPayload,
  FileDiskItem,
  FileDiskProps,
  FileDiskRenamePayload,
  FileDiskUploadProgress,
  FileDiskUploadStatus,
  FileDiskUploadPayload,
  FileDiskViewMode
} from './types'

defineOptions({
  name: 'XFileDisk'
})

const props = withDefaults(defineProps<FileDiskProps>(), {
  modelValue: '/',
  entries: () => [],
  permissions: () => ({ read: true, write: true, delete: true, view: true }),
  viewMode: 'list',
  title: '附件管理',
  loading: false,
  emptyText: '暂无文件',
  multiple: true,
  accept: '',
  disabled: false,
  showHeader: true,
  showTitle: true,
  showToolbar: true,
  showPath: true,
  size: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:viewMode': [value: FileDiskViewMode]
  'selection-change': [items: FileDiskItem[]]
  'path-change': [path: string]
  'create-folder': [payload: { path: string; name: string }]
  upload: [payload: FileDiskUploadPayload]
  download: [payload: FileDiskDownloadPayload]
  delete: [payload: { path: string; items: FileDiskItem[] }]
  rename: [payload: FileDiskRenamePayload]
  copy: [payload: FileDiskClipboardPayload]
  cut: [payload: FileDiskClipboardPayload]
  paste: [payload: FileDiskClipboardPayload]
  refresh: [path: string]
  open: [item: FileDiskItem]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const bodyRoot = ref<HTMLElement | null>(null)
const previewRoot = ref<HTMLElement | null>(null)
const folderNameInput = ref<HTMLInputElement | null>(null)
const renameInput = ref<HTMLInputElement | HTMLInputElement[] | null>(null)
const innerPath = ref(normalizePath(props.modelValue))
const innerEntries = ref<FileDiskItem[]>([])
const selectedIds = ref<Array<FileDiskItem['id']>>([])
const busy = ref(false)
const dragging = ref(false)
const selecting = ref(false)
const creatingFolder = ref(false)
const draftFolderName = ref('新建目录')
const renamingId = ref<FileDiskItem['id'] | null>(null)
const renamingName = ref('')
const itemElements = new Map<string, HTMLElement>()
const selectionBox = ref({
  visible: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
})
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0
})
const uploadTasks = ref<Array<{
  id: string
  name: string
  size: number
  percent: number
  status: FileDiskUploadStatus
}>>([])
const clipboard = ref<{
  action: FileDiskClipboardAction
  sourcePath: string
  items: FileDiskItem[]
} | null>(null)
const previewVisible = ref(false)
const previewIndex = ref(0)
const imageUrlCache = ref<Record<string, string>>({})
const imageUrlLoading = ref<Record<string, boolean>>({})

const canRead = computed(() => props.permissions.read !== false)
const canWrite = computed(() => props.permissions.write !== false && !props.disabled)
const canDelete = computed(() => props.permissions.delete !== false && !props.disabled)
const canView = computed(() => props.permissions.view !== false)
const isBusy = computed(() => props.loading || busy.value)
const currentView = computed({
  get: () => props.viewMode,
  set: (value: FileDiskViewMode) => emit('update:viewMode', value)
})
const sourceEntries = computed(() => (props.adapter?.list ? innerEntries.value : props.entries))
const sortedEntries = computed(() => {
  return [...sourceEntries.value].sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === 'folder' ? -1 : 1
    }
    return left.name.localeCompare(right.name, 'zh-CN')
  })
})
const imageEntries = computed(() => sortedEntries.value.filter((item) => isImageItem(item)))
const previewItem = computed(() => imageEntries.value[previewIndex.value])
const previewSource = computed(() => (previewItem.value ? imageSource(previewItem.value, 'preview') : ''))
const selectedItems = computed(() =>
  sortedEntries.value.filter((item) => selectedIds.value.some((id) => String(id) === String(item.id)))
)
const breadcrumbItems = computed(() => {
  const segments = innerPath.value.split('/').filter(Boolean)
  const items = [{ label: '根目录', path: '/' }]
  segments.reduce((base, segment) => {
    const next = `${base === '/' ? '' : base}/${segment}`
    items.push({ label: segment, path: next })
    return next
  }, '/')
  return items
})
const canPaste = computed(() => canWrite.value && Boolean(clipboard.value?.items.length))
const hasSelection = computed(() => selectedItems.value.length > 0)
const canRename = computed(() => canWrite.value && selectedItems.value.length === 1)
const hasUploadTasks = computed(() => uploadTasks.value.length > 0)
const allSelected = computed(
  () => sortedEntries.value.length > 0 && sortedEntries.value.every((item) => selectedIds.value.includes(item.id))
)
const hasContent = computed(() => sortedEntries.value.length > 0 || creatingFolder.value)
const selectionStyle = computed(() => {
  const left = Math.min(selectionBox.value.startX, selectionBox.value.currentX)
  const top = Math.min(selectionBox.value.startY, selectionBox.value.currentY)
  const width = Math.abs(selectionBox.value.currentX - selectionBox.value.startX)
  const height = Math.abs(selectionBox.value.currentY - selectionBox.value.startY)
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`
  }
})
const contextMenuStyle = computed(() => ({
  left: `${contextMenu.value.x}px`,
  top: `${contextMenu.value.y}px`
}))
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const colorStyle = computed<CSSProperties>(() => createColorStyle(props))
const rootStyle = computed<CSSProperties>(() => ({
  ...colorStyle.value,
  '--x-file-disk-font-size': `${sizePreset.value.fontSize}px`,
  '--x-file-disk-control-height': `${sizePreset.value.height}px`,
  '--x-file-disk-control-padding': sizePreset.value.padding,
  '--x-file-disk-radius': sizePreset.value.radius
}))

watch(
  () => props.modelValue,
  (value) => {
    const nextPath = normalizePath(value)
    if (nextPath !== innerPath.value) {
      innerPath.value = nextPath
      clearSelection()
      refresh()
    }
  }
)

watch(
  () => props.entries,
  () => {
    selectedIds.value = selectedIds.value.filter((id) =>
      props.entries.some((item) => String(item.id) === String(id))
    )
    emitSelection()
  }
)

watch(
  () => [innerPath.value, sortedEntries.value.map((item) => `${item.id}:${item.name}:${item.updatedAt ?? ''}`).join('|')],
  () => {
    resolveCurrentImageThumbnails()
  },
  { immediate: true }
)

onMounted(() => {
  ensureFileIconSprite()
  refresh()
})

onBeforeUnmount(() => {
  stopBoxSelection()
})

function normalizePath(path?: string) {
  const raw = String(path || '/').trim().replace(/\\/g, '/')
  const segments = raw.split('/').filter(Boolean)
  return segments.length ? `/${segments.join('/')}` : '/'
}

function createColorStyle(theme: FileDiskProps) {
  const style: Record<string, string> = {}
  const colors = theme.colors
  const themeVars: Array<[string | undefined, string, string[]?]> = [
    [theme.backgroundColor ?? colors?.backgroundColor ?? colors?.background, '--x-file-disk-bg'],
    [theme.textColor ?? colors?.textColor ?? colors?.text, '--x-file-disk-text'],
    [theme.mutedTextColor ?? colors?.mutedTextColor ?? colors?.mutedText, '--x-file-disk-muted-text'],
    [theme.borderColor ?? colors?.borderColor ?? colors?.border, '--x-file-disk-border-color', ['--x-file-disk-border']],
    [theme.headerBackgroundColor ?? colors?.headerBackgroundColor ?? colors?.toolbarBackground, '--x-file-disk-header-bg'],
    [theme.toolbarBackgroundColor ?? colors?.toolbarBackgroundColor ?? colors?.toolbarBackground, '--x-file-disk-toolbar-bg'],
    [theme.itemBackgroundColor ?? colors?.itemBackgroundColor ?? colors?.panelBackground, '--x-file-disk-item-bg', ['--x-file-disk-panel-bg']],
    [theme.itemHoverBackgroundColor ?? colors?.itemHoverBackgroundColor ?? colors?.hoverBackground, '--x-file-disk-item-hover-bg', ['--x-file-disk-hover-bg']],
    [theme.itemActiveBackgroundColor ?? colors?.itemActiveBackgroundColor ?? colors?.selectedBackground, '--x-file-disk-item-active-bg', ['--x-file-disk-selected-bg']],
    [theme.itemActiveTextColor ?? colors?.itemActiveTextColor, '--x-file-disk-item-active-text'],
    [theme.iconColor ?? colors?.iconColor ?? colors?.subtleText, '--x-file-disk-icon-color'],
    [theme.activeIconColor ?? colors?.activeIconColor ?? colors?.primary, '--x-file-disk-active-icon-color'],
    [theme.emptyBackgroundColor ?? colors?.emptyBackgroundColor ?? colors?.panelBackground, '--x-file-disk-empty-bg'],
    [theme.dragOverBackgroundColor ?? colors?.dragOverBackgroundColor ?? colors?.dropBackground, '--x-file-disk-drag-over-bg', ['--x-file-disk-drop-bg']]
  ]
  const colorVars: Array<[keyof FileDiskColors, string]> = [
    ['primary', '--x-file-disk-primary'],
    ['primarySoft', '--x-file-disk-primary-soft'],
    ['primaryWeak', '--x-file-disk-primary-weak'],
    ['background', '--x-file-disk-bg'],
    ['toolbarBackground', '--x-file-disk-toolbar-bg'],
    ['pathBackground', '--x-file-disk-path-bg'],
    ['panelBackground', '--x-file-disk-panel-bg'],
    ['text', '--x-file-disk-text'],
    ['mutedText', '--x-file-disk-muted-text'],
    ['subtleText', '--x-file-disk-subtle-text'],
    ['border', '--x-file-disk-border'],
    ['softBorder', '--x-file-disk-soft-border'],
    ['hoverBackground', '--x-file-disk-hover-bg'],
    ['selectedBackground', '--x-file-disk-selected-bg'],
    ['selectedBorder', '--x-file-disk-selected-border'],
    ['disabledText', '--x-file-disk-disabled-text'],
    ['thumbBackground', '--x-file-disk-thumb-bg'],
    ['selectionBackground', '--x-file-disk-selection-bg'],
    ['selectionBorder', '--x-file-disk-selection-border'],
    ['dropBackground', '--x-file-disk-drop-bg'],
    ['success', '--x-file-disk-success'],
    ['danger', '--x-file-disk-danger'],
    ['previewBackground', '--x-file-disk-preview-bg'],
    ['previewText', '--x-file-disk-preview-text'],
    ['previewControlBackground', '--x-file-disk-preview-control-bg'],
    ['previewControlBorder', '--x-file-disk-preview-control-border'],
    ['previewControlHoverBackground', '--x-file-disk-preview-control-hover-bg'],
    ['shadow', '--x-file-disk-shadow']
  ]

  colorVars.forEach(([key, variable]) => {
    const value = colors?.[key]
    if (value) {
      style[variable] = value
    }
  })

  themeVars.forEach(([value, variable, aliases]) => {
    if (value) {
      style[variable] = value
      aliases?.forEach((alias) => {
        style[alias] = value
      })
    }
  })

  return style
}

function ensureFileIconSprite() {
  if (typeof document === 'undefined' || document.getElementById('x-file-disk-iconfont-script')) {
    return
  }
  const script = document.createElement('script')
  script.id = 'x-file-disk-iconfont-script'
  script.src = new URL('./fileico/iconfont.js', import.meta.url).href
  script.async = true
  document.body.appendChild(script)
}

function joinPath(base: string, name: string) {
  return normalizePath(`${base === '/' ? '' : base}/${name}`)
}

function parentPath(path: string) {
  const segments = normalizePath(path).split('/').filter(Boolean)
  segments.pop()
  return segments.length ? `/${segments.join('/')}` : '/'
}

function isSelected(item: FileDiskItem) {
  return selectedIds.value.some((id) => String(id) === String(item.id))
}

function emitSelection() {
  emit('selection-change', selectedItems.value)
}

function clearSelection() {
  selectedIds.value = []
  emitSelection()
}

function closeContextMenu() {
  contextMenu.value.visible = false
}

function toggleAll() {
  cancelEditing()
  selectedIds.value = allSelected.value ? [] : sortedEntries.value.map((item) => item.id)
  emitSelection()
}

function selectItem(item: FileDiskItem, event?: MouseEvent) {
  if (item.disabled) {
    return
  }
  cancelEditing()

  if (props.multiple && (event?.ctrlKey || event?.metaKey)) {
    selectedIds.value = isSelected(item)
      ? selectedIds.value.filter((id) => String(id) !== String(item.id))
      : [...selectedIds.value, item.id]
  } else {
    selectedIds.value = [item.id]
  }
  emitSelection()
}

function toggleItem(item: FileDiskItem) {
  cancelEditing()
  selectedIds.value = isSelected(item)
    ? selectedIds.value.filter((id) => String(id) !== String(item.id))
    : [...selectedIds.value, item.id]
  emitSelection()
}

function openPath(path: string) {
  const nextPath = normalizePath(path)
  innerPath.value = nextPath
  emit('update:modelValue', nextPath)
  emit('path-change', nextPath)
  clearSelection()
  refresh()
  closeContextMenu()
}

function openItem(item: FileDiskItem) {
  if (item.disabled || !canView.value) {
    return
  }
  if (item.type === 'folder') {
    openPath(joinPath(innerPath.value, item.name))
    return
  }
  if (isImageItem(item)) {
    void openImagePreview(item)
    return
  }
  emit('open', item)
}

async function withBusy(task: () => void | Promise<void>) {
  if (isBusy.value) {
    return
  }
  busy.value = true
  try {
    await task()
  } finally {
    busy.value = false
  }
}

async function refresh() {
  closeContextMenu()
  emit('refresh', innerPath.value)
  if (!props.adapter?.list || !canRead.value) {
    return
  }
  const shouldSetBusy = !busy.value && !props.loading
  if (shouldSetBusy) {
    busy.value = true
  }
  try {
    innerEntries.value = await props.adapter!.list!(innerPath.value)
    clearSelection()
  } finally {
    if (shouldSetBusy) {
      busy.value = false
    }
  }
}

async function createFolder() {
  if (!canWrite.value) {
    return
  }
  closeContextMenu()
  renamingId.value = null
  draftFolderName.value = makeUniqueName('新建目录')
  creatingFolder.value = true
  clearSelection()
  await nextTick()
  focusAndSelectInput(folderNameInput.value)
}

async function submitCreateFolder() {
  if (!creatingFolder.value || isBusy.value) {
    return
  }
  const name = draftFolderName.value.trim()
  if (!name) {
    cancelCreateFolder()
    return
  }

  await withBusy(async () => {
    emit('create-folder', { path: innerPath.value, name })
    await props.adapter?.createFolder?.(innerPath.value, name)
    creatingFolder.value = false
    await refresh()
  })
}

function cancelCreateFolder() {
  creatingFolder.value = false
  draftFolderName.value = '新建目录'
}

function handleCreateFolderKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitCreateFolder()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancelCreateFolder()
  }
}

function chooseFiles() {
  if (canWrite.value) {
    fileInput.value?.click()
  }
}

function chooseFilesFromContextMenu() {
  chooseFiles()
  closeContextMenu()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  await uploadFiles(Array.from(input.files ?? []))
  input.value = ''
}

async function uploadFiles(files: File[]) {
  if (!files.length || !canWrite.value) {
    return
  }
  startUploadTasks(files)
  await withBusy(async () => {
    closeContextMenu()
    emit('upload', { path: innerPath.value, files })
    try {
      await props.adapter?.upload?.(innerPath.value, files, { onProgress: updateUploadProgress })
      finishUploadTasks(files, 'success')
    } catch (error) {
      finishUploadTasks(files, 'error')
      throw error
    }

    await refresh()
  })
}

function handleDragOver(event: DragEvent) {
  if (!canWrite.value) {
    return
  }
  event.preventDefault()
  dragging.value = true
}

function handleDragLeave(event: DragEvent) {
  if (event.currentTarget === event.target) {
    dragging.value = false
  }
}

async function handleDrop(event: DragEvent) {
  if (!canWrite.value) {
    return
  }
  event.preventDefault()
  dragging.value = false
  await uploadFiles(Array.from(event.dataTransfer?.files ?? []))
}

async function downloadSelected() {
  if (!selectedItems.value.length || !canRead.value) {
    return
  }
  const items = selectedItems.value
  const archive = items.length > 1 || items[0].type === 'folder'
  closeContextMenu()
  emit('download', { path: innerPath.value, items, archive })
  await withBusy(() => props.adapter?.download?.(innerPath.value, items, { archive }))
}

async function deleteSelected() {
  if (!selectedItems.value.length || !canDelete.value) {
    return
  }
  await withBusy(async () => {
    closeContextMenu()
    emit('delete', { path: innerPath.value, items: selectedItems.value })
    await props.adapter?.remove?.(innerPath.value, selectedItems.value)
    await refresh()
  })
}

async function beginRename() {
  if (!canRename.value) {
    return
  }
  closeContextMenu()
  creatingFolder.value = false
  const target = selectedItems.value[0]
  renamingId.value = target.id
  renamingName.value = target.name
  await nextTick()
  focusAndSelectInput(renameInput.value)
}

async function submitRename(item: FileDiskItem) {
  if (!canWrite.value || String(renamingId.value) !== String(item.id) || isBusy.value) {
    return
  }
  const name = renamingName.value.trim()
  if (!name || name === item.name) {
    cancelRename()
    return
  }

  await withBusy(async () => {
    emit('rename', { path: innerPath.value, item, name })
    await props.adapter?.rename?.(innerPath.value, item, name)
    renamingId.value = null
    renamingName.value = ''
    await refresh()
  })
}

function cancelRename() {
  renamingId.value = null
  renamingName.value = ''
}

function handleRenameKeydown(event: KeyboardEvent, item: FileDiskItem) {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitRename(item)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancelRename()
  }
}

function focusAndSelectInput(input: HTMLInputElement | HTMLInputElement[] | null) {
  const element = Array.isArray(input) ? input[0] : input
  element?.focus()
  element?.select()
}

function cancelEditing() {
  cancelCreateFolder()
  cancelRename()
}

function copySelected(action: FileDiskClipboardAction) {
  if (!selectedItems.value.length) {
    return
  }
  clipboard.value = {
    action,
    sourcePath: innerPath.value,
    items: [...selectedItems.value]
  }
  const payload = {
    action,
    sourcePath: innerPath.value,
    items: selectedItems.value
  }
  if (action === 'copy') {
    emit('copy', payload)
  } else {
    emit('cut', payload)
  }
  closeContextMenu()
}

async function pasteItems() {
  if (!clipboard.value || !canWrite.value) {
    return
  }
  const payload = {
    action: clipboard.value.action,
    sourcePath: clipboard.value.sourcePath,
    targetPath: innerPath.value,
    items: clipboard.value.items
  }
  await withBusy(async () => {
    closeContextMenu()
    emit('paste', payload)
    const adapter: FileDiskAdapter | undefined = props.adapter
    if (clipboard.value?.action === 'copy') {
      await adapter?.copy?.(payload)
    } else {
      await adapter?.move?.(payload)
      clipboard.value = null
    }
    await refresh()
  })
}

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
  window.setTimeout(() => {
    uploadTasks.value = uploadTasks.value.filter((task) => !fileKeys.has(`${task.name}:${task.size}`))
  }, status === 'success' ? 1400 : 4200)
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) {
    return 0
  }
  return Math.max(0, Math.min(100, Math.round(value)))
}

function setItemElement(id: FileDiskItem['id'], element: unknown) {
  const key = String(id)
  if (element instanceof HTMLElement) {
    itemElements.set(key, element)
  } else {
    itemElements.delete(key)
  }
}

function startBoxSelection(event: MouseEvent) {
  if (event.button !== 0 || isInteractiveTarget(event.target)) {
    return
  }

  const root = bodyRoot.value
  if (!root) {
    return
  }

  closeContextMenu()
  const rect = root.getBoundingClientRect()
  selecting.value = true
  selectionBox.value = {
    visible: true,
    startX: event.clientX - rect.left + root.scrollLeft,
    startY: event.clientY - rect.top + root.scrollTop,
    currentX: event.clientX - rect.left + root.scrollLeft,
    currentY: event.clientY - rect.top + root.scrollTop
  }
  selectedIds.value = []
  emitSelection()
  document.addEventListener('mousemove', moveBoxSelection)
  document.addEventListener('mouseup', stopBoxSelection)
}

function moveBoxSelection(event: MouseEvent) {
  if (!selecting.value || !bodyRoot.value) {
    return
  }

  const root = bodyRoot.value
  const rootRect = root.getBoundingClientRect()
  selectionBox.value.currentX = event.clientX - rootRect.left + root.scrollLeft
  selectionBox.value.currentY = event.clientY - rootRect.top + root.scrollTop

  const left = Math.min(selectionBox.value.startX, selectionBox.value.currentX)
  const top = Math.min(selectionBox.value.startY, selectionBox.value.currentY)
  const right = Math.max(selectionBox.value.startX, selectionBox.value.currentX)
  const bottom = Math.max(selectionBox.value.startY, selectionBox.value.currentY)

  selectedIds.value = sortedEntries.value
    .filter((item) => {
      if (item.disabled) {
        return false
      }
      const element = itemElements.get(String(item.id))
      if (!element) {
        return false
      }
      const itemRect = element.getBoundingClientRect()
      const itemLeft = itemRect.left - rootRect.left + root.scrollLeft
      const itemTop = itemRect.top - rootRect.top + root.scrollTop
      const itemRight = itemLeft + itemRect.width
      const itemBottom = itemTop + itemRect.height
      return itemLeft < right && itemRight > left && itemTop < bottom && itemBottom > top
    })
    .map((item) => item.id)
  emitSelection()
}

function stopBoxSelection() {
  selecting.value = false
  selectionBox.value.visible = false
  document.removeEventListener('mousemove', moveBoxSelection)
  document.removeEventListener('mouseup', stopBoxSelection)
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest('button, input, select, textarea, a, [data-file-disk-item]'))
}

function openContextMenu(event: MouseEvent, item?: FileDiskItem) {
  event.preventDefault()
  if (item && !isSelected(item)) {
    selectItem(item)
  }
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY
  }
}

function switchViewMode(mode: FileDiskViewMode) {
  currentView.value = mode
  closeContextMenu()
}

function makeUniqueName(baseName: string) {
  const names = new Set(sortedEntries.value.map((item) => item.name))
  if (!names.has(baseName)) {
    return baseName
  }
  let index = 2
  let next = `${baseName} (${index})`
  while (names.has(next)) {
    index += 1
    next = `${baseName} (${index})`
  }
  return next
}

function formatSize(size?: number) {
  if (size === undefined || size === null) {
    return '-'
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = size
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`
}

function displayType(item: FileDiskItem) {
  if (item.type === 'folder') {
    return '文件夹'
  }
  return item.extension ? item.extension.toUpperCase() : '文件'
}

function itemExtension(item: FileDiskItem) {
  return (item.extension || item.name.split('.').pop() || '').toLowerCase()
}

function metaString(item: FileDiskItem, keys: string[]) {
  for (const key of keys) {
    const value = item.meta?.[key]
    if (typeof value === 'string' && value) {
      return value
    }
  }
  return ''
}

function isBrowserImageUrl(value?: string) {
  return Boolean(value && /^(https?:|data:|blob:|\/)/i.test(value))
}

function isImageItem(item: FileDiskItem) {
  if (item.type !== 'file') {
    return false
  }
  const extension = itemExtension(item)
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'avif'].includes(extension) || Boolean(item.mimeType?.startsWith('image/'))
}

function itemImageUrl(item: FileDiskItem, usage: FileDiskFileUrlUsage) {
  const metaKeys = usage === 'thumbnail'
    ? ['thumbnailUrl', 'thumbUrl', 'previewUrl', 'url', 'fileUrl', 'src']
    : ['previewUrl', 'url', 'fileUrl', 'src', 'thumbnailUrl', 'thumbUrl']
  const direct = usage === 'thumbnail'
    ? item.thumbnailUrl || item.url || item.previewUrl
    : item.previewUrl || item.url || item.thumbnailUrl
  const pathUrl = isBrowserImageUrl(item.path) ? item.path : ''
  return direct || metaString(item, metaKeys) || pathUrl
}

function imageCacheKey(item: FileDiskItem, usage: FileDiskFileUrlUsage) {
  return `${innerPath.value}::${usage}::${String(item.id)}`
}

function imageSource(item: FileDiskItem, usage: FileDiskFileUrlUsage = 'thumbnail') {
  return itemImageUrl(item, usage) || imageUrlCache.value[imageCacheKey(item, usage)] || ''
}

async function resolveImageSource(item: FileDiskItem, usage: FileDiskFileUrlUsage) {
  const inlineUrl = itemImageUrl(item, usage)
  if (inlineUrl) {
    return inlineUrl
  }
  const cacheKey = imageCacheKey(item, usage)
  if (imageUrlCache.value[cacheKey]) {
    return imageUrlCache.value[cacheKey]
  }
  if (!props.adapter?.getFileUrl || imageUrlLoading.value[cacheKey]) {
    return ''
  }
  imageUrlLoading.value = { ...imageUrlLoading.value, [cacheKey]: true }
  try {
    const url = await props.adapter.getFileUrl(innerPath.value, item, usage)
    if (url) {
      imageUrlCache.value = { ...imageUrlCache.value, [cacheKey]: url }
    }
    return url
  } finally {
    const next = { ...imageUrlLoading.value }
    delete next[cacheKey]
    imageUrlLoading.value = next
  }
}

function isImageUrlLoading(item: FileDiskItem, usage: FileDiskFileUrlUsage = 'thumbnail') {
  return Boolean(imageUrlLoading.value[imageCacheKey(item, usage)])
}

function resolveCurrentImageThumbnails() {
  sortedEntries.value
    .filter((item) => isImageItem(item))
    .forEach((item) => {
      void resolveImageSource(item, 'thumbnail')
    })
}

async function openImagePreview(item: FileDiskItem) {
  const index = imageEntries.value.findIndex((entry) => String(entry.id) === String(item.id))
  if (index < 0) {
    return
  }
  const url = await resolveImageSource(item, 'preview')
  if (!url) {
    emit('open', item)
    return
  }
  previewIndex.value = index
  previewVisible.value = true
  closeContextMenu()
  nextTick(() => previewRoot.value?.focus())
}

function closeImagePreview() {
  previewVisible.value = false
}

function showPreviousImage() {
  if (!imageEntries.value.length) {
    return
  }
  previewIndex.value = (previewIndex.value - 1 + imageEntries.value.length) % imageEntries.value.length
  if (previewItem.value) {
    void resolveImageSource(previewItem.value, 'preview')
  }
}

function showNextImage() {
  if (!imageEntries.value.length) {
    return
  }
  previewIndex.value = (previewIndex.value + 1) % imageEntries.value.length
  if (previewItem.value) {
    void resolveImageSource(previewItem.value, 'preview')
  }
}

function handlePreviewWheel(event: WheelEvent) {
  if (Math.abs(event.deltaY) < 4) {
    return
  }
  if (event.deltaY > 0) {
    showNextImage()
  } else {
    showPreviousImage()
  }
}

function handlePreviewKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeImagePreview()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPreviousImage()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNextImage()
  }
}

function fileIconClass(item: FileDiskItem) {
  if (item.type === 'folder') {
    return 'icon-wenjianjia'
  }

  const extension = itemExtension(item)
  const iconMap: Record<string, string> = {
    doc: 'icon-WORD',
    docx: 'icon-WORD',
    gif: 'icon-GIF',
    pdf: 'icon-PDF',
    ppt: 'icon-PPT',
    pptx: 'icon-PPT',
    rtf: 'icon-rtf',
    txt: 'icon-txt',
    xls: 'icon-ECEL',
    xlsx: 'icon-ECEL',
    dwg: 'icon-dwg',
    zip: 'icon-zip',
    rar: 'icon-zip',
    '7z': 'icon-zip'
  }
  return iconMap[extension] ?? 'icon-bg-unknownfile'
}

function displayDate(value?: string) {
  if (!value) {
    return '-'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString('zh-CN', { hour12: false })
}

defineExpose({
  refresh,
  clearSelection,
  getSelection: () => selectedItems.value,
  openPath
})
</script>

<template>
  <section
    class="x-file-disk"
    :class="{ 'is-dragging': dragging, 'is-busy': isBusy, [`x-file-disk--${mergedSize}`]: true }"
    :style="rootStyle"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="closeContextMenu"
    @contextmenu="openContextMenu"
  >
    <header v-if="showHeader" class="x-file-disk__toolbar">
      <div v-if="showTitle" class="x-file-disk__title-wrap">
        <strong class="x-file-disk__title">{{ title }}</strong>
        <span class="x-file-disk__count">{{ sortedEntries.length }} 项</span>
      </div>

      <div v-if="showToolbar" class="x-file-disk__actions">
        <button type="button" class="x-file-disk__tool" :disabled="isBusy" title="刷新" @click="refresh">
          <i class="ri-refresh-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!canWrite || isBusy" title="新建目录" @click="createFolder">
          <i class="ri-folder-add-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool x-file-disk__tool--text" :disabled="!canWrite || isBusy" title="上传文件" @click="chooseFiles">
          <i class="ri-upload-2-line" aria-hidden="true" />
          <span>上传</span>
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!hasSelection || isBusy" title="下载" @click="downloadSelected">
          <i class="ri-download-2-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!hasSelection || isBusy" title="复制" @click="copySelected('copy')">
          <i class="ri-file-copy-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!hasSelection || isBusy" title="剪切" @click="copySelected('cut')">
          <i class="ri-scissors-cut-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!canPaste || isBusy" title="粘贴" @click="pasteItems">
          <i class="ri-clipboard-line" aria-hidden="true" />
        </button>
        <button type="button" class="x-file-disk__tool" :disabled="!hasSelection || !canDelete || isBusy" title="删除" @click="deleteSelected">
          <i class="ri-delete-bin-line" aria-hidden="true" />
        </button>
        <span class="x-file-disk__divider" />
        <button
          type="button"
          class="x-file-disk__tool"
          :class="{ 'is-active': currentView === 'list' }"
          title="列表视图"
          @click="switchViewMode('list')"
        >
          <i class="ri-list-unordered" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="x-file-disk__tool"
          :class="{ 'is-active': currentView === 'grid' }"
          title="图标视图"
          @click="switchViewMode('grid')"
        >
          <i class="ri-grid-line" aria-hidden="true" />
        </button>
      </div>
    </header>

    <input ref="fileInput" class="x-file-disk__file-input" type="file" :multiple="multiple" :accept="accept" @change="handleFileChange" />

    <nav v-if="showPath" class="x-file-disk__path" aria-label="当前路径">
      <button
        type="button"
        class="x-file-disk__path-back"
        :disabled="innerPath === '/' || isBusy"
        title="返回上级"
        @click="openPath(parentPath(innerPath))"
      >
        <i class="ri-arrow-go-back-line" aria-hidden="true" />
      </button>
      <button
        v-for="(item, index) in breadcrumbItems"
        :key="item.path"
        type="button"
        class="x-file-disk__crumb"
        :class="{ 'is-current': index === breadcrumbItems.length - 1 }"
        @click="openPath(item.path)"
      >
        <i v-if="index === 0" class="ri-home-4-line" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div v-if="!canRead" class="x-file-disk__empty">当前无读取权限</div>

    <div
      v-else
      ref="bodyRoot"
      class="x-file-disk__body"
      @mousedown="startBoxSelection"
      @contextmenu="openContextMenu"
    >
      <div v-if="!hasContent" class="x-file-disk__empty">{{ emptyText }}</div>

      <div v-else-if="currentView === 'grid'" class="x-file-disk__grid" role="listbox" aria-label="文件列表">
        <div v-if="creatingFolder" class="x-file-disk__tile is-editing" data-file-disk-item>
          <span class="x-file-disk__tile-icon is-folder">
            <svg class="x-file-disk__file-svg" aria-hidden="true">
              <use href="#icon-wenjianjia" />
            </svg>
          </span>
          <input
            ref="folderNameInput"
            v-model="draftFolderName"
            class="x-file-disk__name-input"
            aria-label="新建目录名称"
            @blur="submitCreateFolder"
            @keydown="handleCreateFolderKeydown"
          />
          <span class="x-file-disk__tile-meta">文件夹</span>
        </div>

        <button
          v-for="item in sortedEntries"
          :key="item.id"
          :ref="(element) => setItemElement(item.id, element)"
          data-file-disk-item
          type="button"
          class="x-file-disk__tile"
          :class="{ 'is-selected': isSelected(item), 'is-disabled': item.disabled }"
          @click="selectItem(item, $event)"
          @dblclick="openItem(item)"
          @contextmenu="openContextMenu($event, item)"
        >
          <span class="x-file-disk__tile-icon" :class="`is-${item.type}`">
            <img
              v-if="isImageItem(item) && imageSource(item)"
              class="x-file-disk__thumb"
              :src="imageSource(item)"
              :alt="item.name"
              loading="lazy"
            />
            <span v-else-if="isImageItem(item)" class="x-file-disk__thumb-placeholder" :class="{ 'is-loading': isImageUrlLoading(item) }">
              图片
            </span>
            <svg v-else class="x-file-disk__file-svg" aria-hidden="true">
              <use :href="`#${fileIconClass(item)}`" />
            </svg>
          </span>
          <input
            v-if="String(renamingId) === String(item.id)"
            ref="renameInput"
            v-model="renamingName"
            class="x-file-disk__name-input"
            :aria-label="`重命名 ${item.name}`"
            @click.stop
            @dblclick.stop
            @blur="submitRename(item)"
            @keydown="handleRenameKeydown($event, item)"
          />
          <span v-else class="x-file-disk__tile-name" :title="item.name">
            {{ item.name }}
          </span>
          <span class="x-file-disk__tile-meta">{{ displayType(item) }} · {{ formatSize(item.size) }}</span>
        </button>
      </div>

      <div v-else class="x-file-disk__table-wrap">
        <table class="x-file-disk__table">
          <thead>
            <tr>
              <th class="x-file-disk__check-cell">
                <input type="checkbox" :checked="allSelected" aria-label="全选" @change="toggleAll" />
              </th>
              <th>名称</th>
              <th>类型</th>
              <th>大小</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="creatingFolder" class="is-editing">
              <td class="x-file-disk__check-cell" />
              <td>
                <span class="x-file-disk__name">
                  <svg class="x-file-disk__row-file-svg" aria-hidden="true">
                    <use href="#icon-wenjianjia" />
                  </svg>
                  <input
                    ref="folderNameInput"
                    v-model="draftFolderName"
                    class="x-file-disk__name-input"
                    aria-label="新建目录名称"
                    @blur="submitCreateFolder"
                    @keydown="handleCreateFolderKeydown"
                  />
                </span>
              </td>
              <td>文件夹</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr
              v-for="item in sortedEntries"
              :key="item.id"
              :ref="(element) => setItemElement(item.id, element)"
              data-file-disk-item
              :class="{ 'is-selected': isSelected(item), 'is-disabled': item.disabled }"
              @click="selectItem(item, $event)"
              @dblclick="openItem(item)"
              @contextmenu="openContextMenu($event, item)"
            >
              <td class="x-file-disk__check-cell" @click.stop>
                <input type="checkbox" :checked="isSelected(item)" :disabled="item.disabled" :aria-label="`选择 ${item.name}`" @change="toggleItem(item)" />
              </td>
              <td>
                <span class="x-file-disk__name">
                  <img
                    v-if="isImageItem(item) && imageSource(item)"
                    class="x-file-disk__row-thumb"
                    :src="imageSource(item)"
                    :alt="item.name"
                    loading="lazy"
                  />
                  <span v-else-if="isImageItem(item)" class="x-file-disk__row-thumb-placeholder" :class="{ 'is-loading': isImageUrlLoading(item) }">
                    图
                  </span>
                  <svg v-else class="x-file-disk__row-file-svg" aria-hidden="true">
                    <use :href="`#${fileIconClass(item)}`" />
                  </svg>
                  <input
                    v-if="String(renamingId) === String(item.id)"
                    ref="renameInput"
                    v-model="renamingName"
                    class="x-file-disk__name-input"
                    :aria-label="`重命名 ${item.name}`"
                    @click.stop
                    @dblclick.stop
                    @blur="submitRename(item)"
                    @keydown="handleRenameKeydown($event, item)"
                  />
                  <span v-else :title="item.name">{{ item.name }}</span>
                </span>
              </td>
              <td>{{ displayType(item) }}</td>
              <td>{{ item.type === 'folder' ? '-' : formatSize(item.size) }}</td>
              <td>{{ displayDate(item.updatedAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <span v-if="selectionBox.visible" class="x-file-disk__selection-box" :style="selectionStyle" />
    </div>

    <div v-if="dragging" class="x-file-disk__drop-mask">
      <i class="ri-upload-2-line" aria-hidden="true" />
      <span>松开以上传到当前目录</span>
    </div>

    <div v-if="contextMenu.visible" class="x-file-disk__context-menu" :style="contextMenuStyle" @click.stop>
      <button type="button" :disabled="isBusy" @click="refresh">
        <i class="ri-refresh-line" aria-hidden="true" />
        <span>刷新</span>
      </button>
      <button type="button" :disabled="!canWrite || isBusy" @click="createFolder">
        <i class="ri-folder-add-line" aria-hidden="true" />
        <span>新建目录</span>
      </button>
      <button type="button" :disabled="!canWrite || isBusy" @click="chooseFilesFromContextMenu">
        <i class="ri-upload-2-line" aria-hidden="true" />
        <span>上传</span>
      </button>
      <span class="x-file-disk__context-divider" />
      <button type="button" :disabled="!canRename || isBusy" @click="beginRename">
        <i class="ri-edit-line" aria-hidden="true" />
        <span>重命名</span>
      </button>
      <button type="button" :disabled="!hasSelection || isBusy" @click="downloadSelected">
        <i class="ri-download-2-line" aria-hidden="true" />
        <span>下载</span>
      </button>
      <span class="x-file-disk__context-divider" />
      <button type="button" :disabled="!hasSelection || isBusy" @click="copySelected('copy')">
        <i class="ri-file-copy-line" aria-hidden="true" />
        <span>复制</span>
      </button>
      <button type="button" :disabled="!hasSelection || isBusy" @click="copySelected('cut')">
        <i class="ri-scissors-cut-line" aria-hidden="true" />
        <span>剪切</span>
      </button>
      <button type="button" :disabled="!canPaste || isBusy" @click="pasteItems">
        <i class="ri-clipboard-line" aria-hidden="true" />
        <span>粘贴</span>
      </button>
      <span class="x-file-disk__context-divider" />
      <button type="button" :disabled="!hasSelection || !canDelete || isBusy" @click="deleteSelected">
        <i class="ri-delete-bin-line" aria-hidden="true" />
        <span>删除</span>
      </button>
      <span class="x-file-disk__context-divider" />
      <button type="button" :disabled="currentView === 'list'" @click="switchViewMode('list')">
        <i class="ri-list-unordered" aria-hidden="true" />
        <span>列表视图</span>
      </button>
      <button type="button" :disabled="currentView === 'grid'" @click="switchViewMode('grid')">
        <i class="ri-grid-line" aria-hidden="true" />
        <span>图标视图</span>
      </button>
    </div>

    <div v-if="hasUploadTasks" class="x-file-disk__upload-panel">
      <div v-for="task in uploadTasks" :key="task.id" class="x-file-disk__upload-item" :class="`is-${task.status}`">
        <div class="x-file-disk__upload-head">
          <span>{{ task.name }}</span>
          <span>{{ task.status === 'error' ? '失败' : `${task.percent}%` }}</span>
        </div>
        <div class="x-file-disk__upload-track">
          <span class="x-file-disk__upload-bar" :style="{ width: `${task.percent}%` }" />
        </div>
      </div>
    </div>

    <div
      v-if="previewVisible && previewItem"
      ref="previewRoot"
      class="x-file-disk__preview"
      tabindex="0"
      @click.stop
      @wheel.prevent="handlePreviewWheel"
      @keydown="handlePreviewKeydown"
    >
      <div class="x-file-disk__preview-top">
        <span class="x-file-disk__preview-title" :title="previewItem.name">{{ previewItem.name }}</span>
        <span class="x-file-disk__preview-count">{{ previewIndex + 1 }} / {{ imageEntries.length }}</span>
        <button type="button" class="x-file-disk__preview-close" title="关闭预览" @click="closeImagePreview">
          <i class="ri-close-line" aria-hidden="true" />
        </button>
      </div>
      <button type="button" class="x-file-disk__preview-nav is-prev" title="上一张" @click="showPreviousImage">
        <i class="ri-arrow-left-s-line" aria-hidden="true" />
      </button>
      <img v-if="previewSource" class="x-file-disk__preview-image" :src="previewSource" :alt="previewItem.name" />
      <div v-else class="x-file-disk__preview-empty">图片加载中...</div>
      <button type="button" class="x-file-disk__preview-nav is-next" title="下一张" @click="showNextImage">
        <i class="ri-arrow-right-s-line" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.x-file-disk {
  background: var(--x-file-disk-bg, #fff);
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-border, var(--x-color-border, #cbd5e1)));
  border-radius: var(--x-file-disk-radius, 6px);
  box-sizing: border-box;
  color: var(--x-file-disk-text, var(--x-color-text, #102a43));
  display: flex;
  flex-direction: column;
  font-size: var(--x-file-disk-font-size, 12px);
  font-family: var(--x-font-family);
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.x-file-disk__toolbar {
  align-items: center;
  background: var(--x-file-disk-header-bg, var(--x-file-disk-toolbar-bg, #f8fafc));
  border-bottom: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #dbe4ee));
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;
  padding: var(--x-file-disk-control-padding, 0 8px);
}

.x-file-disk__toolbar:has(.x-file-disk__actions):not(:has(.x-file-disk__title-wrap)) {
  justify-content: flex-end;
}

.x-file-disk__title-wrap,
.x-file-disk__actions,
.x-file-disk__path,
.x-file-disk__name {
  align-items: center;
  display: flex;
  min-width: 0;
}

.x-file-disk__title-wrap {
  gap: 8px;
}

.x-file-disk__title {
  font-size: calc(var(--x-file-disk-font-size, 12px) + 3px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-file-disk__count {
  color: var(--x-file-disk-muted-text, #64748b);
  font-size: var(--x-file-disk-font-size, 12px);
  white-space: nowrap;
}

.x-file-disk__actions {
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.x-file-disk__tool {
  align-items: center;
  background: var(--x-file-disk-toolbar-bg, var(--x-file-disk-panel-bg, #fff));
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-border, #cbd5e1));
  border-radius: var(--x-file-disk-radius, 6px);
  color: var(--x-file-disk-icon-color, var(--x-file-disk-subtle-text, #334155));
  cursor: pointer;
  display: inline-flex;
  font-size: var(--x-file-disk-font-size, 12px);
  gap: 5px;
  height: var(--x-file-disk-control-height, 30px);
  justify-content: center;
  line-height: 1;
  min-width: var(--x-file-disk-control-height, 30px);
  padding: var(--x-file-disk-control-padding, 0 8px);
}

.x-file-disk__tool svg,
.x-file-disk__tool i {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: calc(var(--x-file-disk-font-size, 12px) + 3px);
  height: calc(var(--x-file-disk-font-size, 12px) + 3px);
  justify-content: center;
  line-height: 1;
  width: calc(var(--x-file-disk-font-size, 12px) + 3px);
}

.x-file-disk__tool svg {
  fill: currentColor;
}

.x-file-disk__tool:hover:not(:disabled),
.x-file-disk__tool.is-active {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-primary-soft, var(--x-color-primary-soft, #ecfeff)));
  border-color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
  color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
}

.x-file-disk__tool:disabled {
  color: var(--x-file-disk-disabled-text, #9aa6b2);
  cursor: not-allowed;
  opacity: 0.68;
}

.x-file-disk__divider {
  background: var(--x-file-disk-border-color, var(--x-file-disk-border, #cbd5e1));
  height: 20px;
  width: 1px;
}

.x-file-disk__file-input {
  display: none;
}

.x-file-disk__path {
  background: var(--x-file-disk-header-bg, var(--x-file-disk-path-bg, #fff));
  border-bottom: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #e2e8f0));
  flex: 0 0 auto;
  gap: 2px;
  overflow-x: auto;
  padding: 8px 12px;
}

.x-file-disk__path-back {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--x-file-disk-radius, 6px);
  color: var(--x-file-disk-icon-color, var(--x-file-disk-text, #1f2937));
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  height: var(--x-file-disk-control-height, 30px);
  justify-content: center;
  margin-right: 2px;
  width: var(--x-file-disk-control-height, 30px);
}

.x-file-disk__path-back svg,
.x-file-disk__path-back i {
  align-items: center;
  display: inline-flex;
  font-size: 18px;
  height: 18px;
  justify-content: center;
  line-height: 1;
  width: 18px;
}

.x-file-disk__path-back:hover:not(:disabled) {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-primary-weak, #eef6f8));
  color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
}

.x-file-disk__path-back:disabled {
  color: var(--x-file-disk-disabled-text, #a3afbd);
  cursor: not-allowed;
}

.x-file-disk__crumb {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: var(--x-file-disk-muted-text, #475569);
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: var(--x-file-disk-font-size, 12px);
  gap: 4px;
  min-height: var(--x-file-disk-control-height, 30px);
  padding: var(--x-file-disk-control-padding, 0 8px);
}

.x-file-disk__crumb:not(:last-child)::after {
  color: var(--x-file-disk-disabled-text, #94a3b8);
  content: "/";
  margin-left: 8px;
}

.x-file-disk__crumb svg,
.x-file-disk__crumb i {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: var(--x-file-disk-font-size, 12px);
  height: 14px;
  justify-content: center;
  line-height: 1;
  width: 14px;
}

.x-file-disk__crumb:hover,
.x-file-disk__crumb.is-current {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-primary-weak, #eef6f8));
  color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
}

.x-file-disk__body {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  user-select: none;
}

.x-file-disk__empty {
  align-items: center;
  background: var(--x-file-disk-empty-bg, transparent);
  color: var(--x-file-disk-muted-text, #64748b);
  display: flex;
  font-size: 14px;
  height: 100%;
  justify-content: center;
  min-height: 180px;
  padding: 24px;
}

.x-file-disk__grid {
  align-content: start;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  height: 100%;
  overflow: auto;
  padding: 12px;
}

.x-file-disk__tile {
  background: var(--x-file-disk-item-bg, var(--x-file-disk-panel-bg, #fff));
  border: 1px solid var(--x-file-disk-border-color, transparent);
  border-radius: var(--x-file-disk-radius, 6px);
  color: var(--x-file-disk-text, #102a43);
  cursor: pointer;
  display: grid;
  gap: 6px;
  min-height: 118px;
  min-width: 0;
  padding: var(--x-file-disk-control-padding, 0 8px);
  text-align: center;
}

.x-file-disk__tile:hover {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-hover-bg, #eff6ff));
  border-color: var(--x-file-disk-border-color, var(--x-file-disk-selected-border, #93c5fd));
}

.x-file-disk__tile.is-selected {
  background: var(--x-file-disk-item-active-bg, var(--x-file-disk-selected-bg, #eff6ff));
  border-color: var(--x-file-disk-active-icon-color, var(--x-file-disk-selected-border, #93c5fd));
  color: var(--x-file-disk-item-active-text, var(--x-file-disk-text, #102a43));
}

.x-file-disk__tile-icon {
  align-items: center;
  display: inline-flex;
  height: 48px;
  justify-content: center;
}

.x-file-disk__tile-icon svg {
  height: 38px;
  width: 38px;
}

.x-file-disk__file-svg {
  display: block;
  fill: var(--x-file-disk-icon-color, currentColor);
  height: 42px;
  width: 42px;
}

.x-file-disk__row-file-svg {
  display: block;
  flex: 0 0 auto;
  fill: var(--x-file-disk-icon-color, currentColor);
  height: 20px;
  width: 20px;
}

.x-file-disk__tile.is-selected .x-file-disk__file-svg,
.x-file-disk__table tbody tr.is-selected .x-file-disk__row-file-svg {
  fill: var(--x-file-disk-active-icon-color, var(--x-file-disk-icon-color, currentColor));
}

.x-file-disk__thumb {
  background: var(--x-file-disk-thumb-bg, #f1f5f9);
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #dbe4ee));
  border-radius: 5px;
  box-sizing: border-box;
  display: block;
  height: 48px;
  object-fit: cover;
  width: 64px;
}

.x-file-disk__row-thumb {
  background: var(--x-file-disk-thumb-bg, #f1f5f9);
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #dbe4ee));
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  height: 24px;
  object-fit: cover;
  width: 32px;
}

.x-file-disk__thumb-placeholder,
.x-file-disk__row-thumb-placeholder {
  align-items: center;
  background: var(--x-file-disk-empty-bg, var(--x-file-disk-thumb-bg, #f1f5f9));
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #dbe4ee));
  border-radius: 5px;
  box-sizing: border-box;
  color: var(--x-file-disk-muted-text, #64748b);
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 12px;
  justify-content: center;
}

.x-file-disk__thumb-placeholder {
  height: 48px;
  width: 64px;
}

.x-file-disk__row-thumb-placeholder {
  border-radius: var(--x-file-disk-radius, 6px);
  height: 24px;
  width: 32px;
}

.x-file-disk__tile-name,
.x-file-disk__tile-meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-file-disk__tile-name {
  font-size: var(--x-file-disk-font-size, 12px);
  font-weight: 600;
}

.x-file-disk__name-input {
  background: var(--x-file-disk-item-bg, var(--x-file-disk-panel-bg, #fff));
  border: 1px solid var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
  border-radius: var(--x-file-disk-radius, 6px);
  box-shadow: 0 0 0 2px var(--x-file-disk-primary-soft, rgba(14, 116, 144, 0.12));
  box-sizing: border-box;
  color: var(--x-file-disk-text, #102a43);
  font: inherit;
  font-size: var(--x-file-disk-font-size, 12px);
  min-height: var(--x-file-disk-control-height, 30px);
  min-width: 0;
  outline: none;
  padding: 0 8px;
  width: 100%;
}

.x-file-disk__tile-meta {
  color: var(--x-file-disk-muted-text, #64748b);
  font-size: var(--x-file-disk-font-size, 12px);
}

.x-file-disk__table-wrap {
  height: 100%;
  min-height: 0;
  overflow: auto;
}

.x-file-disk__table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 720px;
  table-layout: fixed;
  width: 100%;
}

.x-file-disk__table thead {
  position: sticky;
  top: 0;
  z-index: 2;
}

.x-file-disk__table th,
.x-file-disk__table td {
  background: var(--x-file-disk-item-bg, var(--x-file-disk-panel-bg, #fff));
  border-bottom: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #e2e8f0));
  box-sizing: border-box;
  font-size: var(--x-file-disk-font-size, 12px);
  height: var(--x-file-disk-control-height, 30px);
  padding: var(--x-file-disk-control-padding, 0 8px);
  text-align: left;
  vertical-align: middle;
}

.x-file-disk__table th {
  background: var(--x-file-disk-header-bg, var(--x-file-disk-toolbar-bg, #f8fafc));
  color: var(--x-file-disk-muted-text, #475569);
  font-weight: 600;
}

.x-file-disk__table tbody tr {
  cursor: pointer;
}

.x-file-disk__table tbody tr:hover td {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-hover-bg, #eff6ff));
}

.x-file-disk__table tbody tr.is-selected td {
  background: var(--x-file-disk-item-active-bg, var(--x-file-disk-selected-bg, #eff6ff));
  color: var(--x-file-disk-item-active-text, var(--x-file-disk-text, #102a43));
}

.x-file-disk__check-cell {
  text-align: center;
  width: 44px;
}

.x-file-disk__check-cell input {
  cursor: pointer;
  height: 14px;
  margin: 0;
  width: 14px;
}

.x-file-disk__name {
  gap: 8px;
}

.x-file-disk__name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-file-disk__tile.is-disabled,
.x-file-disk__table tr.is-disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.x-file-disk__drop-mask {
  align-items: center;
  background: var(--x-file-disk-drag-over-bg, var(--x-file-disk-drop-bg, rgba(14, 116, 144, 0.12)));
  border: 2px dashed var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
  color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  inset: 10px;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  z-index: 4;
}

.x-file-disk__drop-mask svg,
.x-file-disk__drop-mask i {
  align-items: center;
  display: inline-flex;
  font-size: 34px;
  height: 34px;
  justify-content: center;
  line-height: 1;
  width: 34px;
}

.x-file-disk__selection-box {
  background: var(--x-file-disk-selection-bg, rgba(37, 99, 235, 0.12));
  border: 1px solid var(--x-file-disk-selection-border, #2563eb);
  box-sizing: border-box;
  pointer-events: none;
  position: absolute;
  z-index: 5;
}

.x-file-disk__context-menu {
  background: var(--x-file-disk-item-bg, var(--x-file-disk-panel-bg, #fff));
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-border, #cbd5e1));
  border-radius: var(--x-file-disk-radius, 6px);
  box-shadow: var(--x-file-disk-shadow, 0 14px 34px rgba(15, 23, 42, 0.16));
  display: grid;
  min-width: 150px;
  padding: 5px;
  position: fixed;
  z-index: 30;
}

.x-file-disk__context-menu button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--x-file-disk-radius, 6px);
  color: var(--x-file-disk-text, var(--x-file-disk-subtle-text, #334155));
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: var(--x-file-disk-font-size, 12px);
  gap: 8px;
  min-height: var(--x-file-disk-control-height, 30px);
  padding: var(--x-file-disk-control-padding, 0 8px);
  text-align: left;
}

.x-file-disk__context-menu button:hover:not(:disabled) {
  background: var(--x-file-disk-item-hover-bg, var(--x-file-disk-primary-weak, #eef6f8));
  color: var(--x-file-disk-active-icon-color, var(--x-file-disk-primary, var(--x-color-primary, #155e75)));
}

.x-file-disk__context-menu button:disabled {
  color: var(--x-file-disk-disabled-text, #a3afbd);
  cursor: not-allowed;
}

.x-file-disk__context-menu svg,
.x-file-disk__context-menu i {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 14px;
  height: 14px;
  justify-content: center;
  line-height: 1;
  width: 14px;
}

.x-file-disk__context-divider {
  border-top: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #e2e8f0));
  margin: 5px 0;
}

.x-file-disk__upload-panel {
  background: var(--x-file-disk-item-bg, var(--x-file-disk-panel-bg, rgba(255, 255, 255, 0.96)));
  border: 1px solid var(--x-file-disk-border-color, var(--x-file-disk-border, #cbd5e1));
  border-radius: 8px;
  bottom: 12px;
  box-shadow: var(--x-file-disk-shadow, 0 16px 36px rgba(15, 23, 42, 0.18));
  display: grid;
  gap: 8px;
  max-width: min(420px, calc(100% - 24px));
  padding: 10px;
  position: absolute;
  right: 12px;
  width: 360px;
  z-index: 20;
}

.x-file-disk__upload-item {
  display: grid;
  gap: 5px;
}

.x-file-disk__upload-head {
  align-items: center;
  color: var(--x-file-disk-subtle-text, #334155);
  display: flex;
  font-size: 12px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.x-file-disk__upload-head span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-file-disk__upload-track {
  background: var(--x-file-disk-border-color, var(--x-file-disk-soft-border, #e2e8f0));
  border-radius: 999px;
  height: 6px;
  overflow: hidden;
}

.x-file-disk__upload-bar {
  background: var(--x-file-disk-primary, var(--x-color-primary, #155e75));
  display: block;
  height: 100%;
  transition: width 160ms ease;
}

.x-file-disk__upload-item.is-success .x-file-disk__upload-bar {
  background: var(--x-file-disk-success, #16a34a);
}

.x-file-disk__upload-item.is-error .x-file-disk__upload-bar {
  background: var(--x-file-disk-danger, #dc2626);
}

.x-file-disk__preview {
  align-items: center;
  background: var(--x-file-disk-preview-bg, rgba(2, 6, 23, 0.92));
  display: flex;
  inset: 0;
  justify-content: center;
  outline: none;
  padding: 64px 72px 48px;
  position: fixed;
  z-index: 80;
}

.x-file-disk__preview-top {
  align-items: center;
  color: var(--x-file-disk-preview-text, #f8fafc);
  display: flex;
  gap: 14px;
  left: 0;
  min-width: 0;
  padding: 14px 18px;
  position: absolute;
  right: 0;
  top: 0;
}

.x-file-disk__preview-title {
  flex: 1 1 auto;
  font-size: 14px;
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-file-disk__preview-count {
  color: var(--x-file-disk-soft-border, #cbd5e1);
  flex: 0 0 auto;
  font-size: 13px;
}

.x-file-disk__preview-close,
.x-file-disk__preview-nav {
  align-items: center;
  background: var(--x-file-disk-preview-control-bg, rgba(15, 23, 42, 0.72));
  border: 1px solid var(--x-file-disk-preview-control-border, rgba(226, 232, 240, 0.24));
  border-radius: 6px;
  color: var(--x-file-disk-preview-text, #f8fafc);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
}

.x-file-disk__preview-close:hover,
.x-file-disk__preview-nav:hover {
  background: var(--x-file-disk-preview-control-hover-bg, rgba(30, 41, 59, 0.92));
}

.x-file-disk__preview-close {
  flex: 0 0 auto;
  height: 34px;
  width: 34px;
}

.x-file-disk__preview-nav {
  height: 46px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
}

.x-file-disk__preview-nav.is-prev {
  left: 18px;
}

.x-file-disk__preview-nav.is-next {
  right: 18px;
}

.x-file-disk__preview-close svg,
.x-file-disk__preview-nav svg,
.x-file-disk__preview-close i,
.x-file-disk__preview-nav i {
  align-items: center;
  display: inline-flex;
  font-size: 20px;
  height: 20px;
  justify-content: center;
  line-height: 1;
  width: 20px;
}

.x-file-disk__preview-image {
  display: block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.x-file-disk.is-busy {
  cursor: progress;
}

@media (max-width: 760px) {
  .x-file-disk__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .x-file-disk__actions {
    justify-content: flex-start;
  }

  .x-file-disk__preview {
    padding: 58px 48px 36px;
  }

  .x-file-disk__preview-nav {
    height: 38px;
    width: 38px;
  }
}
</style>
