import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { XFileDisk } from '../src'
import type { FileDiskAdapter, FileDiskItem } from '../src'

const entries: FileDiskItem[] = [
  { id: 'folder-1', name: '合同', type: 'folder', updatedAt: '2026-05-01T00:00:00Z' },
  { id: 'file-1', name: '报价.pdf', type: 'file', size: 1024, extension: 'pdf', updatedAt: '2026-05-02T00:00:00Z' }
]

const imageEntries: FileDiskItem[] = [
  { id: 'image-1', name: '盖章页-001.png', type: 'file', size: 2048, extension: 'png', url: 'data:image/png;base64,a', thumbnailUrl: 'data:image/png;base64,a' },
  { id: 'image-2', name: '盖章页-002.jpg', type: 'file', size: 3072, extension: 'jpg', url: 'data:image/jpeg;base64,b', thumbnailUrl: 'data:image/jpeg;base64,b' },
  { id: 'file-2', name: '说明.txt', type: 'file', size: 128, extension: 'txt' }
]

describe('XFileDisk', () => {
  it('renders entries and fills with list view by default', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })

    expect(wrapper.classes()).toContain('x-file-disk')
    expect(wrapper.text()).toContain('合同')
    expect(wrapper.text()).toContain('报价.pdf')
    expect(wrapper.find('.x-file-disk__table thead').exists()).toBe(true)
  })

  it('opens a folder on double click and emits path changes', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        modelValue: '/',
        entries
      }
    })

    await wrapper.findAll('tbody tr')[0].trigger('dblclick')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['/合同'])
    expect(wrapper.emitted('path-change')?.[0]).toEqual(['/合同'])
  })

  it('downloads a single selected file directly', async () => {
    const download = vi.fn()
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        adapter: { download }
      }
    })

    await wrapper.findAll('tbody tr')[1].trigger('click')
    await wrapper.find('[title="下载"]').trigger('click')

    expect(download).toHaveBeenCalledWith('/', [entries[1]], { archive: false })
    expect(wrapper.emitted('download')?.[0]?.[0]).toMatchObject({ path: '/', archive: false })
  })

  it('uses archive download for multiple selected items', async () => {
    const download = vi.fn()
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        adapter: { download }
      }
    })

    const rows = wrapper.findAll('tbody tr')
    await rows[0].trigger('click', { ctrlKey: true })
    await rows[1].trigger('click', { ctrlKey: true })
    await wrapper.find('[title="下载"]').trigger('click')

    expect(download).toHaveBeenCalledWith('/', entries, { archive: true })
  })

  it('loads data from adapter and creates folder through adapter', async () => {
    const adapter: FileDiskAdapter = {
      list: vi.fn().mockResolvedValue(entries),
      createFolder: vi.fn()
    }
    const wrapper = mount(XFileDisk, {
      props: {
        adapter
      }
    })

    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await wrapper.find('[title="新建目录"]').trigger('click')
    const input = wrapper.find('input[aria-label="新建目录名称"]')
    await input.setValue('归档')
    await input.trigger('keydown', { key: 'Enter' })
    await new Promise((resolve) => window.setTimeout(resolve, 0))

    expect(adapter.list).toHaveBeenCalledWith('/')
    expect(adapter.createFolder).toHaveBeenCalledWith('/', '归档')
  })

  it('disables write actions when write permission is false', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        permissions: { read: true, write: false, delete: true, view: true }
      }
    })

    expect(wrapper.find('[title="新建目录"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[title="上传文件"]').attributes('disabled')).toBeDefined()
  })

  it('opens file picker from the context menu upload action', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    const click = vi.spyOn(input, 'click').mockImplementation(() => undefined)

    await wrapper.find('.x-file-disk__body').trigger('contextmenu')
    const uploadButton = wrapper.findAll('.x-file-disk__context-menu button').find((button) => button.text().includes('上传'))
    expect(uploadButton?.attributes('disabled')).toBeUndefined()

    await uploadButton?.trigger('click')

    expect(click).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.x-file-disk__context-menu').exists()).toBe(false)
  })

  it('refreshes after upload and exposes upload progress', async () => {
    const file = new File(['hello'], '合同附件.pdf', { type: 'application/pdf' })
    const adapter: FileDiskAdapter = {
      list: vi.fn().mockResolvedValue(entries),
      upload: vi.fn(async (_path, _files, context) => {
        context.onProgress({ file, percent: 58 })
      })
    }
    const wrapper = mount(XFileDisk, {
      props: {
        adapter
      }
    })

    await new Promise((resolve) => window.setTimeout(resolve, 0))
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true
    })
    await wrapper.find('input[type="file"]').trigger('change')
    await new Promise((resolve) => window.setTimeout(resolve, 0))

    expect(adapter.upload).toHaveBeenCalled()
    expect(adapter.list).toHaveBeenCalledTimes(2)
    expect(wrapper.find('.x-file-disk__upload-panel').exists()).toBe(true)
  })

  it('refreshes after paste', async () => {
    const adapter: FileDiskAdapter = {
      list: vi.fn().mockResolvedValue(entries),
      copy: vi.fn()
    }
    const wrapper = mount(XFileDisk, {
      props: {
        adapter
      }
    })

    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await wrapper.findAll('tbody tr')[0].trigger('click')
    await wrapper.find('[title="复制"]').trigger('click')
    await wrapper.find('[title="粘贴"]').trigger('click')
    await new Promise((resolve) => window.setTimeout(resolve, 0))

    expect(adapter.copy).toHaveBeenCalled()
    expect(adapter.list).toHaveBeenCalledTimes(2)
  })

  it('can hide title and toolbar areas independently', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        showTitle: false,
        showToolbar: false
      }
    })

    expect(wrapper.find('.x-file-disk__title-wrap').exists()).toBe(false)
    expect(wrapper.find('.x-file-disk__actions').exists()).toBe(false)
  })

  it('exposes common color tokens through the colors prop', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        mutedTextColor: '#94a3b8',
        borderColor: '#334155',
        headerBackgroundColor: '#111827',
        toolbarBackgroundColor: '#1e293b',
        itemBackgroundColor: '#111827',
        itemHoverBackgroundColor: '#1e3a5f',
        itemActiveBackgroundColor: '#155e75',
        itemActiveTextColor: '#f8fafc',
        iconColor: '#cbd5e1',
        activeIconColor: '#67e8f9',
        emptyBackgroundColor: '#111827',
        dragOverBackgroundColor: 'rgba(103, 232, 249, 0.14)',
        colors: {
          primary: '#2563eb',
          selectedBackground: '#eff6ff',
          toolbarBackground: '#f8fafc',
          danger: '#ef4444'
        }
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--x-file-disk-bg: #0f172a')
    expect(style).toContain('--x-file-disk-text: #e2e8f0')
    expect(style).toContain('--x-file-disk-muted-text: #94a3b8')
    expect(style).toContain('--x-file-disk-border-color: #334155')
    expect(style).toContain('--x-file-disk-header-bg: #111827')
    expect(style).toContain('--x-file-disk-toolbar-bg: #1e293b')
    expect(style).toContain('--x-file-disk-item-bg: #111827')
    expect(style).toContain('--x-file-disk-item-hover-bg: #1e3a5f')
    expect(style).toContain('--x-file-disk-item-active-bg: #155e75')
    expect(style).toContain('--x-file-disk-item-active-text: #f8fafc')
    expect(style).toContain('--x-file-disk-icon-color: #cbd5e1')
    expect(style).toContain('--x-file-disk-active-icon-color: #67e8f9')
    expect(style).toContain('--x-file-disk-empty-bg: #111827')
    expect(style).toContain('--x-file-disk-drag-over-bg: rgba(103, 232, 249, 0.14)')
    expect(style).toContain('--x-file-disk-primary: #2563eb')
    expect(style).toContain('--x-file-disk-selected-bg: #155e75')
    expect(style).toContain('--x-file-disk-toolbar-bg: #1e293b')
    expect(style).toContain('--x-file-disk-danger: #ef4444')
  })

  it('keeps legacy color aliases available for existing consumers', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        colors: {
          background: '#111827',
          text: '#f8fafc',
          border: '#475569',
          toolbarBackground: '#1f2937',
          panelBackground: '#0f172a',
          hoverBackground: '#1e293b',
          selectedBackground: '#155e75',
          dropBackground: 'rgba(21, 94, 117, 0.2)'
        }
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--x-file-disk-bg: #111827')
    expect(style).toContain('--x-file-disk-text: #f8fafc')
    expect(style).toContain('--x-file-disk-border-color: #475569')
    expect(style).toContain('--x-file-disk-header-bg: #1f2937')
    expect(style).toContain('--x-file-disk-item-bg: #0f172a')
    expect(style).toContain('--x-file-disk-item-hover-bg: #1e293b')
    expect(style).toContain('--x-file-disk-item-active-bg: #155e75')
    expect(style).toContain('--x-file-disk-drag-over-bg: rgba(21, 94, 117, 0.2)')
  })

  it('shows disabled and enabled context menu actions based on selection', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })

    await wrapper.find('.x-file-disk__body').trigger('contextmenu')
    expect(wrapper.find('.x-file-disk__context-menu').text()).toContain('复制')
    const disabledCopy = wrapper.findAll('.x-file-disk__context-menu button').find((button) => button.text().includes('复制'))
    expect(disabledCopy?.attributes('disabled')).toBeDefined()

    await wrapper.findAll('tbody tr')[1].trigger('contextmenu')
    const enabledCopy = wrapper.findAll('.x-file-disk__context-menu button').find((button) => button.text().includes('复制'))
    expect(enabledCopy?.attributes('disabled')).toBeUndefined()
  })

  it('keeps the context menu inside the viewport near screen edges', async () => {
    const offsetWidth = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function getOffsetWidth(this: HTMLElement) {
      return this.classList.contains('x-file-disk__context-menu') ? 150 : 0
    })
    const offsetHeight = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function getOffsetHeight(this: HTMLElement) {
      return this.classList.contains('x-file-disk__context-menu') ? 260 : 0
    })
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 800 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 600 })

    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })

    await wrapper.find('.x-file-disk__body').trigger('contextmenu', { clientX: 790, clientY: 590 })
    await nextTick()

    const style = wrapper.find('.x-file-disk__context-menu').attributes('style')
    expect(style).toContain('left: 642px')
    expect(style).toContain('top: 332px')

    offsetWidth.mockRestore()
    offsetHeight.mockRestore()
  })

  it('renames a single selected item from context menu inline editor', async () => {
    const rename = vi.fn()
    const wrapper = mount(XFileDisk, {
      props: {
        entries,
        adapter: { rename }
      }
    })

    await wrapper.findAll('tbody tr')[1].trigger('contextmenu')
    const renameButton = wrapper.findAll('.x-file-disk__context-menu button').find((button) => button.text().includes('重命名'))
    await renameButton?.trigger('click')
    const input = wrapper.find('input[aria-label="重命名 报价.pdf"]')
    await input.setValue('报价-归档.pdf')
    await input.trigger('keydown', { key: 'Enter' })

    expect(rename).toHaveBeenCalledWith('/', entries[1], '报价-归档.pdf')
    expect(wrapper.emitted('rename')?.[0]?.[0]).toMatchObject({ path: '/', name: '报价-归档.pdf' })
  })

  it('adds native tooltips for long file names and uses file icons', () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })

    expect(wrapper.find('[title="报价.pdf"]').exists()).toBe(true)
    expect(wrapper.find('use[href="#icon-PDF"]').exists()).toBe(true)
    expect(wrapper.find('use[href="#icon-wenjianjia"]').exists()).toBe(true)
  })

  it('renders image files as thumbnails in grid and list views', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries: imageEntries,
        viewMode: 'grid'
      }
    })

    expect(wrapper.find('.x-file-disk__thumb[alt="盖章页-001.png"]').exists()).toBe(true)
    await wrapper.setProps({ viewMode: 'list' })
    expect(wrapper.find('.x-file-disk__row-thumb[alt="盖章页-002.jpg"]').exists()).toBe(true)
  })

  it('opens fullscreen image preview and supports wheel zoom and image dragging', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries: imageEntries
      }
    })

    await wrapper.findAll('tbody tr')[0].trigger('dblclick')
    expect(wrapper.find('.x-file-disk__preview').exists()).toBe(true)
    expect(wrapper.find('.x-file-disk__preview-title').text()).toBe('盖章页-001.png')

    await wrapper.find('.x-file-disk__preview').trigger('wheel', { deltaY: 120 })
    expect(wrapper.find('.x-file-disk__preview-title').text()).toBe('盖章页-001.png')
    expect(wrapper.find('.x-file-disk__preview-image').attributes('style')).toContain('scale(0.893)')

    await wrapper.find('.x-file-disk__preview-image').trigger('mousedown', { button: 0, clientX: 20, clientY: 30 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 45, clientY: 10 }))
    await nextTick()
    expect(wrapper.find('.x-file-disk__preview-image').attributes('style')).toContain('translate3d(25px, -20px, 0)')
    document.dispatchEvent(new MouseEvent('mouseup'))

    await wrapper.find('[title="关闭预览"]').trigger('click')
    expect(wrapper.find('.x-file-disk__preview').exists()).toBe(false)
  })

  it('selects entries by dragging a selection box in the file area', async () => {
    const wrapper = mount(XFileDisk, {
      props: {
        entries
      }
    })
    const body = wrapper.find('.x-file-disk__body').element as HTMLElement
    const rows = wrapper.findAll('tbody tr')
    body.getBoundingClientRect = () => ({ left: 0, top: 0, right: 400, bottom: 300, width: 400, height: 300, x: 0, y: 0, toJSON: () => ({}) })
    rows[0].element.getBoundingClientRect = () => ({ left: 10, top: 10, right: 390, bottom: 48, width: 380, height: 38, x: 10, y: 10, toJSON: () => ({}) })
    rows[1].element.getBoundingClientRect = () => ({ left: 10, top: 52, right: 390, bottom: 90, width: 380, height: 38, x: 10, y: 52, toJSON: () => ({}) })

    await wrapper.find('.x-file-disk__body').trigger('mousedown', { button: 0, clientX: 0, clientY: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 100 }))
    document.dispatchEvent(new MouseEvent('mouseup'))

    const selectionEvents = wrapper.emitted('selection-change') ?? []
    expect(selectionEvents[selectionEvents.length - 1][0]).toHaveLength(2)
  })
})
