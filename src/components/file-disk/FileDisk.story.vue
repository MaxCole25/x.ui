<script setup lang="ts">
import { computed, ref } from 'vue'
import { XFileDisk } from './index'
import type { FileDiskAdapter, FileDiskColors, FileDiskItem, FileDiskViewMode } from './src/types'
import '../../styles/index.css'

type Store = Record<string, FileDiskItem[]>

const currentPath = ref('/合同附件')
const viewMode = ref<FileDiskViewMode>('list')
const latestEvent = ref('暂无操作')
const selectedCount = ref(0)
const canRead = ref(true)
const canWrite = ref(true)
const canDelete = ref(true)
const canView = ref(true)
const showHeader = ref(true)
const showTitle = ref(true)
const showToolbar = ref(true)
const showPath = ref(true)
const primaryColor = ref('#155e75')
const selectedBackground = ref('#eff6ff')
const toolbarBackground = ref('#f8fafc')
let idSeed = 100

const store = ref<Store>({
  '/': [
    folder('合同附件', '2026-05-01T09:00:00Z'),
    folder('发票资料', '2026-05-02T11:30:00Z')
  ],
  '/合同附件': [
    folder('用印扫描件', '2026-05-03T10:20:00Z'),
    file('销售合同.pdf', 2_420_000, 'pdf', '2026-05-04T08:15:00Z'),
    file('报价单.xlsx', 187_000, 'xlsx', '2026-05-05T13:42:00Z'),
    file('补充协议-特别长文件名用于检查列表省略显示.docx', 440_000, 'docx', '2026-05-06T14:10:00Z')
  ],
  '/合同附件/用印扫描件': [
    file('盖章页-001.png', 820_000, 'png', '2026-05-07T16:08:00Z', imageDataUrl('盖章页 001', '#155e75', '#bae6fd')),
    file('盖章页-002.jpg', 790_000, 'jpg', '2026-05-07T16:09:00Z', imageDataUrl('盖章页 002', '#7c2d12', '#fed7aa')),
    file('签收回执.webp', 680_000, 'webp', '2026-05-07T16:12:00Z', imageDataUrl('签收回执', '#166534', '#bbf7d0'))
  ],
  '/发票资料': [
    file('增值税发票.pdf', 510_000, 'pdf', '2026-05-02T12:00:00Z')
  ]
})

const permissions = computed(() => ({
  read: canRead.value,
  write: canWrite.value,
  delete: canDelete.value,
  view: canView.value
}))
const colors = computed<FileDiskColors>(() => ({
  primary: primaryColor.value,
  selectedBackground: selectedBackground.value,
  hoverBackground: selectedBackground.value,
  toolbarBackground: toolbarBackground.value,
  primarySoft: `${primaryColor.value}1f`,
  primaryWeak: `${primaryColor.value}12`,
  selectedBorder: `${primaryColor.value}66`
}))

const adapter: FileDiskAdapter = {
  async list(path) {
    latestEvent.value = `读取目录：${path}`
    return cloneItems(store.value[path] ?? [])
  },
  async createFolder(path, name) {
    ensurePath(path)
    if (store.value[path].some((item) => item.name === name)) {
      latestEvent.value = `目录已存在：${name}`
      return
    }
    store.value[path].push(folder(name))
    store.value[joinPath(path, name)] = []
    latestEvent.value = `新建目录：${joinPath(path, name)}`
  },
  async upload(path, files, context) {
    ensurePath(path)
    for (let percent = 12; percent <= 92; percent += 20) {
      await sleep(120)
      files.forEach((file) => context.onProgress({ file, percent }))
    }
    files.forEach((item) => {
      store.value[path].push(file(item.name, item.size, getExtension(item.name)))
    })
    latestEvent.value = `上传 ${files.length} 个文件到 ${path}`
  },
  async download(path, items, options) {
    latestEvent.value = options.archive
      ? `以压缩包下载 ${items.length} 项：${path}`
      : `直接下载：${items[0]?.name ?? ''}`
  },
  async remove(path, items) {
    const ids = new Set(items.map((item) => String(item.id)))
    store.value[path] = (store.value[path] ?? []).filter((item) => !ids.has(String(item.id)))
    items.filter((item) => item.type === 'folder').forEach((item) => removePath(joinPath(path, item.name)))
    latestEvent.value = `删除 ${items.length} 项`
  },
  async rename(path, item, name) {
    const target = (store.value[path] ?? []).find((entry) => String(entry.id) === String(item.id))
    if (!target) {
      return
    }
    const oldPath = target.type === 'folder' ? joinPath(path, target.name) : ''
    target.name = name
    target.extension = target.type === 'file' ? getExtension(name) : target.extension
    target.updatedAt = new Date().toISOString()
    if (target.type === 'folder' && oldPath) {
      renamePath(oldPath, joinPath(path, name))
    }
    latestEvent.value = `重命名为：${name}`
  },
  async copy({ sourcePath, targetPath, items }) {
    ensurePath(targetPath)
    items.forEach((item) => copyItem(sourcePath, targetPath, item))
    latestEvent.value = `从 ${sourcePath} 复制 ${items.length} 项到 ${targetPath}`
  },
  async move({ sourcePath, targetPath, items }) {
    await adapter.copy?.({ sourcePath, targetPath, items })
    const ids = new Set(items.map((item) => String(item.id)))
    store.value[sourcePath] = (store.value[sourcePath] ?? []).filter((item) => !ids.has(String(item.id)))
    items.filter((item) => item.type === 'folder').forEach((item) => removePath(joinPath(sourcePath, item.name)))
    latestEvent.value = `从 ${sourcePath} 剪切 ${items.length} 项到 ${targetPath}`
  }
}

function folder(name: string, updatedAt = new Date().toISOString()): FileDiskItem {
  return {
    id: `folder-${idSeed++}`,
    name,
    type: 'folder',
    updatedAt
  }
}

function file(name: string, size: number, extension = getExtension(name), updatedAt = new Date().toISOString(), url = ''): FileDiskItem {
  return {
    id: `file-${idSeed++}`,
    name,
    type: 'file',
    size,
    extension,
    updatedAt,
    url,
    thumbnailUrl: url,
    previewUrl: url
  }
}

function cloneItems(items: FileDiskItem[]) {
  return items.map((item) => ({ ...item }))
}

function ensurePath(path: string) {
  if (!store.value[path]) {
    store.value[path] = []
  }
}

function joinPath(base: string, name: string) {
  return `${base === '/' ? '' : base}/${name}` || '/'
}

function getExtension(name: string) {
  const segments = name.split('.')
  return segments.length > 1 ? segments.pop() || '' : ''
}

function copyItem(sourcePath: string, targetPath: string, item: FileDiskItem) {
  const nextName = uniqueName(targetPath, item.name)
  const copied = { ...item, id: `${item.type}-${idSeed++}`, name: nextName, updatedAt: new Date().toISOString() }
  store.value[targetPath].push(copied)

  if (item.type === 'folder') {
    const sourceChildPath = joinPath(sourcePath, item.name)
    const targetChildPath = joinPath(targetPath, nextName)
    store.value[targetChildPath] = []
    ;(store.value[sourceChildPath] ?? []).forEach((child) => copyItem(sourceChildPath, targetChildPath, child))
  }
}

function uniqueName(path: string, name: string) {
  const names = new Set((store.value[path] ?? []).map((item) => item.name))
  if (!names.has(name)) {
    return name
  }
  const extension = name.includes('.') ? `.${getExtension(name)}` : ''
  const base = extension ? name.slice(0, -extension.length) : name
  let index = 1
  let next = `${base} 副本${extension}`
  while (names.has(next)) {
    index += 1
    next = `${base} 副本 ${index}${extension}`
  }
  return next
}

function removePath(path: string) {
  Object.keys(store.value)
    .filter((key) => key === path || key.startsWith(`${path}/`))
    .forEach((key) => {
      delete store.value[key]
    })
}

function renamePath(oldPath: string, newPath: string) {
  const entries = Object.entries(store.value).filter(([key]) => key === oldPath || key.startsWith(`${oldPath}/`))
  entries.forEach(([key, value]) => {
    const nextKey = key === oldPath ? newPath : key.replace(`${oldPath}/`, `${newPath}/`)
    store.value[nextKey] = value
    delete store.value[key]
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function imageDataUrl(label: string, color: string, background: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640"><rect width="960" height="640" fill="${background}"/><rect x="96" y="80" width="768" height="480" rx="18" fill="#fff" stroke="${color}" stroke-width="14"/><path d="M180 430 320 290 430 400 540 270 780 500H180Z" fill="${color}" opacity=".82"/><circle cx="690" cy="190" r="54" fill="${color}" opacity=".72"/><text x="480" y="585" text-anchor="middle" font-family="Arial, sans-serif" font-size="46" font-weight="700" fill="${color}">${label}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

</script>

<template>
  <Story title="组件/文件磁盘 FileDisk" group="components">
    <Variant title="完整接口测试">
      <div class="file-disk-story">
        <div class="file-disk-story__controls">
          <label><input v-model="canRead" type="checkbox" /> 读</label>
          <label><input v-model="canWrite" type="checkbox" /> 写</label>
          <label><input v-model="canDelete" type="checkbox" /> 删</label>
          <label><input v-model="canView" type="checkbox" /> 看</label>
          <label><input v-model="showHeader" type="checkbox" /> 顶部</label>
          <label><input v-model="showTitle" type="checkbox" /> 标题</label>
          <label><input v-model="showToolbar" type="checkbox" /> 工具栏</label>
          <label><input v-model="showPath" type="checkbox" /> 路径</label>
          <label>主题色 <input v-model="primaryColor" type="color" /></label>
          <label>选中底色 <input v-model="selectedBackground" type="color" /></label>
          <label>顶部底色 <input v-model="toolbarBackground" type="color" /></label>
          <label>
            视图
            <select v-model="viewMode">
              <option value="list">列表</option>
              <option value="grid">图标</option>
            </select>
          </label>
          <span>当前路径：{{ currentPath }}</span>
          <span>已选：{{ selectedCount }}</span>
          <span>{{ latestEvent }}</span>
        </div>

        <div class="file-disk-story__stage">
          <XFileDisk
            v-model="currentPath"
            v-model:view-mode="viewMode"
            title="销售单附件"
            :adapter="adapter"
            :permissions="permissions"
            :colors="colors"
            :show-header="showHeader"
            :show-title="showTitle"
            :show-toolbar="showToolbar"
            :show-path="showPath"
            @selection-change="selectedCount = $event.length"
          />
        </div>
      </div>
    </Variant>

    <Variant title="外部受控数据">
      <div class="file-disk-story__stage file-disk-story__stage--compact">
        <XFileDisk
          title="只读附件"
          :entries="store['/合同附件']"
          :permissions="{ read: true, write: false, delete: false, view: true }"
          :colors="{ primary: '#7c3aed', primarySoft: '#f3e8ff', primaryWeak: '#f5f3ff', selectedBackground: '#f5f3ff', selectedBorder: '#c4b5fd' }"
          view-mode="grid"
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.file-disk-story {
  display: grid;
  gap: 14px;
}

.file-disk-story__controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
}

.file-disk-story__stage {
  height: 560px;
}

.file-disk-story__stage--compact {
  height: 360px;
}
</style>
