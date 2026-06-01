import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { XRichTextEditor } from '../src'
import OutlinePanel from '../src/components/other-components/rich-text-editor/src/core/rich-editor/OutlinePanel.vue'

const outlinePanelSource = readFileSync(
  'src/components/other-components/rich-text-editor/src/core/rich-editor/OutlinePanel.vue',
  'utf8'
).replace(/\r\n/g, '\n')

function createOutlineEditor(options: {
  nodeDom?: Node | null
  viewport?: HTMLElement | null
  scrollIntoView?: ReturnType<typeof vi.fn>
}) {
  const scrollIntoView = options.scrollIntoView ?? vi.fn()
  const run = vi.fn(() => true)
  const chain = {
    focus: vi.fn(() => chain),
    setTextSelection: vi.fn(() => chain),
    scrollIntoView: vi.fn(() => {
      scrollIntoView()
      return chain
    }),
    run
  }

  return {
    state: {
      selection: {
        from: 1,
        to: 1
      },
      doc: {
        descendants: (callback: (node: { type: { name: string }; attrs: { level: number }; nodeSize: number; textContent: string }, pos: number) => void) => {
          callback(
            {
              type: { name: 'heading' },
              attrs: { level: 1 },
              nodeSize: 8,
              textContent: '欢迎使用 AiDoc'
            },
            1
          )
        }
      }
    },
    view: {
      dom: options.viewport ?? document.createElement('div'),
      nodeDOM: vi.fn(() => options.nodeDom ?? null)
    },
    chain: vi.fn(() => chain),
    on: vi.fn(),
    off: vi.fn()
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('XRichTextEditor', () => {
  it('renders the copied XlEdit rich editor shell', async () => {
    const wrapper = mount(XRichTextEditor, {
      props: { modelValue: '<p>a</p>' }
    })

    expect(wrapper.find('.x-rich-text-editor').exists()).toBe(true)
    expect(wrapper.find('.xl-rich-editor').exists()).toBe(true)
    expect(wrapper.find('.xl-toolbar').exists()).toBe(true)
  })

  it('keeps fill height classes disabled by default', () => {
    const wrapper = mount(XRichTextEditor, {
      props: { modelValue: '<p>a</p>' }
    })

    expect(wrapper.find('.x-rich-text-editor').classes()).not.toContain('x-rich-text-editor--fill-height')
    expect(wrapper.find('.xl-rich-editor').classes()).not.toContain('xl-rich-editor--fill-height')
  })

  it('adds fill height classes when fullHeight is enabled', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        fullHeight: true
      }
    })

    expect(wrapper.find('.x-rich-text-editor').classes()).toContain('x-rich-text-editor--fill-height')
    expect(wrapper.find('.xl-rich-editor').classes()).toContain('xl-rich-editor--fill-height')
  })

  it('keeps fullHeight false from applying fill height classes', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        fullHeight: false
      }
    })

    expect(wrapper.find('.x-rich-text-editor').classes()).not.toContain('x-rich-text-editor--fill-height')
    expect(wrapper.find('.xl-rich-editor').classes()).not.toContain('xl-rich-editor--fill-height')
  })

  it('keeps minHeight available as the editor CSS variable', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        minHeight: 360,
        fullHeight: true
      }
    })

    const root = wrapper.find('.x-rich-text-editor').element as HTMLElement
    const editor = wrapper.find('.xl-rich-editor').element as HTMLElement

    expect(root.style.getPropertyValue('--xl-editor-min-height')).toBe('360px')
    expect(editor.style.getPropertyValue('--xl-editor-min-height')).toBe('360px')
  })

  it('keeps content text color available as the editor CSS variable', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        contentTextColor: '#f8fafc'
      }
    })

    const editor = wrapper.find('.xl-rich-editor').element as HTMLElement

    expect(editor.style.getPropertyValue('--xl-editor-content-text')).toBe('#f8fafc')
  })

  it('uses a readable default content font size and exposes overrides', () => {
    const defaultWrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>'
      }
    })
    const customWrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        contentFontSize: 18
      }
    })

    expect((defaultWrapper.find('.xl-rich-editor').element as HTMLElement).style.getPropertyValue('--xl-editor-content-font-size')).toBe('14px')
    expect((customWrapper.find('.xl-rich-editor').element as HTMLElement).style.getPropertyValue('--xl-editor-content-font-size')).toBe('18px')
  })

  it('anchors color inputs on toolbar color buttons', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>'
      }
    })

    expect(wrapper.findAll('.xl-toolbar__color-picker')).toHaveLength(2)
    expect(wrapper.find('input[aria-label="文字颜色"]').classes()).toContain('xl-toolbar__color-input')
    expect(wrapper.find('input[aria-label="高亮颜色"]').classes()).toContain('xl-toolbar__color-input')
  })

  it('renders font, size and heading dropdown options as styled previews', async () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>'
      }
    })

    expect(wrapper.find('button[title="字体"]').text()).not.toContain('默认字体')
    expect(wrapper.find('button[title="字号"]').text()).not.toContain('默认字号')
    expect(wrapper.find('button[title="标题"]').text()).not.toContain('正文')

    await wrapper.find('button[title="字体"]').trigger('click')
    const fontButtons = wrapper.findAll('.xl-toolbar__menu-dropdown button')
    expect(fontButtons.find((button) => button.text() === 'Georgia')?.attributes('style')).toContain('font-family: Georgia')

    await wrapper.find('button[title="字号"]').trigger('click')
    const sizeButtons = wrapper.findAll('.xl-toolbar__menu-dropdown button')
    expect(sizeButtons.find((button) => button.text() === '24')?.attributes('style')).toContain('font-size: 24px')

    await wrapper.find('button[title="标题"]').trigger('click')
    const headingButtons = wrapper.findAll('.xl-toolbar__menu-dropdown button')
    expect(headingButtons.find((button) => button.text() === '一级标题')?.attributes('style')).toContain('font-weight: 700')
  })

  it('closes open font menus when clicking outside the toolbar', async () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>'
      }
    })

    await wrapper.find('button[title="字体"]').trigger('click')
    expect(wrapper.find('.xl-toolbar__menu-dropdown').exists()).toBe(true)

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.xl-toolbar__menu-dropdown').exists()).toBe(false)
  })

  it('keeps toolbar and scroll viewport present in full height mode', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        fullHeight: true,
        showToolbar: true
      }
    })

    expect(wrapper.find('.xl-toolbar').exists()).toBe(true)
    expect(wrapper.find('.xl-rich-editor__surface').exists()).toBe(true)
    expect(wrapper.find('.xl-editor__viewport').exists()).toBe(true)
    expect(wrapper.find('.xl-editor__content').exists()).toBe(true)
  })

  it('renders outline headings when showOutline is enabled', async () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<h1>欢迎使用 AiDoc</h1><h1>左侧目录</h1><h2>生成示例</h2>',
        showOutline: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.xl-outline-panel').exists()).toBe(true)
    expect(wrapper.findAll('.xl-outline-panel__item').map((item) => item.text())).toEqual([
      '欢迎使用 AiDoc',
      '左侧目录',
      '生成示例'
    ])
  })

  it('keeps the active outline marker out of the item text layout', () => {
    const editor = createOutlineEditor({})
    const wrapper = mount(OutlinePanel, {
      props: {
        editor: editor as never
      }
    })

    const row = wrapper.find('.xl-outline-panel__row')
    const item = wrapper.find('.xl-outline-panel__item')
    const activeBar = wrapper.find('.xl-outline-panel__active-bar')

    expect(activeBar.exists()).toBe(true)
    expect(row.element).toBe(activeBar.element.parentElement)
    expect(item.find('.xl-outline-panel__active-bar').exists()).toBe(false)
    expect(outlinePanelSource).toContain('.xl-outline-panel__row {\n  position: relative;')
    expect(outlinePanelSource).toContain('.xl-outline-panel__active-bar {\n  position: absolute;')
  })

  it('scrolls the editor viewport to the clicked outline heading', async () => {
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0)
        return 1
      })
    const viewport = document.createElement('div')
    const heading = document.createElement('h1')
    const scrollTo = vi.fn()

    viewport.className = 'xl-editor__viewport'
    viewport.appendChild(heading)
    viewport.scrollTop = 50
    viewport.scrollLeft = 7
    viewport.scrollTo = scrollTo
    viewport.getBoundingClientRect = vi.fn(() => ({
      x: 0,
      y: 0,
      top: 100,
      right: 300,
      bottom: 400,
      left: 0,
      width: 300,
      height: 300,
      toJSON: () => ({})
    }))
    heading.getBoundingClientRect = vi.fn(() => ({
      x: 0,
      y: 0,
      top: 180,
      right: 260,
      bottom: 204,
      left: 0,
      width: 260,
      height: 24,
      toJSON: () => ({})
    }))

    const editor = createOutlineEditor({ nodeDom: heading, viewport })
    const wrapper = mount(OutlinePanel, {
      attachTo: document.body,
      props: {
        editor: editor as never
      }
    })

    await wrapper.find('.xl-outline-panel__item').trigger('click')

    expect(requestAnimationFrame).toHaveBeenCalled()
    expect(scrollTo).toHaveBeenCalledWith({
      top: 118,
      left: 7,
      behavior: 'auto'
    })
  })

  it('falls back to TipTap scrollIntoView when outline heading DOM cannot be resolved', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })
    const scrollIntoView = vi.fn()
    const editor = createOutlineEditor({ nodeDom: null, scrollIntoView })
    const wrapper = mount(OutlinePanel, {
      props: {
        editor: editor as never
      }
    })

    await wrapper.find('.xl-outline-panel__item').trigger('click')

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })
})
