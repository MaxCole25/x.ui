import type { FileDiskAdapter, FileDiskItem, FileDiskProps } from '../other-components/file-disk/src/types'

type Store = Record<string, FileDiskItem[]>

export function createFileDiskScene() {
  let idSeed = 100
  const store: Store = {
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
  }
  const adapter: FileDiskAdapter = {
    async list(path) {
      return cloneItems(store[path] ?? [])
    },
    async createFolder(path, name) {
      ensurePath(path)
      if (store[path].some((item) => item.name === name)) {
        return
      }
      store[path].push(folder(name))
      store[joinPath(path, name)] = []
    },
    async upload(path, files, context) {
      ensurePath(path)
      for (let percent = 12; percent <= 92; percent += 20) {
        await sleep(120)
        files.forEach((file) => context.onProgress({ file, percent }))
      }
      files.forEach((item) => {
        store[path].push(file(item.name, item.size, getExtension(item.name)))
      })
    },
    async download() {
      // 内存场景只验证 download 事件参数，不执行真实文件下载。
    },
    async remove(path, items) {
      const ids = new Set(items.map((item) => String(item.id)))
      store[path] = (store[path] ?? []).filter((item) => !ids.has(String(item.id)))
      items.filter((item) => item.type === 'folder').forEach((item) => removePath(joinPath(path, item.name)))
    },
    async rename(path, item, name) {
      const target = (store[path] ?? []).find((entry) => String(entry.id) === String(item.id))
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
    },
    async copy({ sourcePath, targetPath, items }) {
      ensurePath(targetPath)
      items.forEach((item) => copyItem(sourcePath, targetPath, item))
    },
    async move({ sourcePath, targetPath, items }) {
      await adapter.copy?.({ sourcePath, targetPath, items })
      const ids = new Set(items.map((item) => String(item.id)))
      store[sourcePath] = (store[sourcePath] ?? []).filter((item) => !ids.has(String(item.id)))
      items.filter((item) => item.type === 'folder').forEach((item) => removePath(joinPath(sourcePath, item.name)))
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
    if (!store[path]) {
      store[path] = []
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
    store[targetPath].push(copied)

    if (item.type === 'folder') {
      const sourceChildPath = joinPath(sourcePath, item.name)
      const targetChildPath = joinPath(targetPath, nextName)
      store[targetChildPath] = []
      ;(store[sourceChildPath] ?? []).forEach((child) => copyItem(sourceChildPath, targetChildPath, child))
    }
  }
  function uniqueName(path: string, name: string) {
    const names = new Set((store[path] ?? []).map((item) => item.name))
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
    Object.keys(store)
      .filter((key) => key === path || key.startsWith(`${path}/`))
      .forEach((key) => {
        delete store[key]
      })
  }
  function renamePath(oldPath: string, newPath: string) {
    const entries = Object.entries(store).filter(([key]) => key === oldPath || key.startsWith(`${oldPath}/`))
    entries.forEach(([key, value]) => {
      const nextKey = key === oldPath ? newPath : key.replace(`${oldPath}/`, `${newPath}/`)
      store[nextKey] = value
      delete store[key]
    })
  }
  function sleep(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms))
  }
  function imageDataUrl(label: string, color: string, background: string) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640"><rect width="960" height="640" fill="${background}"/><rect x="96" y="80" width="768" height="480" rx="18" fill="#fff" stroke="${color}" stroke-width="14"/><path d="M180 430 320 290 430 400 540 270 780 500H180Z" fill="${color}" opacity=".82"/><circle cx="690" cy="190" r="54" fill="${color}" opacity=".72"/><text x="480" y="585" text-anchor="middle" font-family="Arial, sans-serif" font-size="46" font-weight="700" fill="${color}">${label}</text></svg>`
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
  }

  return {
    modelValue: '/合同附件',
    viewMode: 'grid',
    title: '销售单附件',
    adapter,
    permissions: { read: true, write: true, delete: true, view: true }
  } satisfies FileDiskProps
}
