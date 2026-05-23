import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XRichTextEditor } from '../src'

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

  it('adds fill height classes when fillHeight is enabled', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        fillHeight: true
      }
    })

    expect(wrapper.find('.x-rich-text-editor').classes()).toContain('x-rich-text-editor--fill-height')
    expect(wrapper.find('.xl-rich-editor').classes()).toContain('xl-rich-editor--fill-height')
  })

  it('keeps minHeight available as the editor CSS variable', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        minHeight: 360,
        fillHeight: true
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

  it('keeps toolbar and scroll viewport present in fill height mode', () => {
    const wrapper = mount(XRichTextEditor, {
      props: {
        modelValue: '<p>a</p>',
        fillHeight: true,
        showToolbar: true
      }
    })

    expect(wrapper.find('.xl-toolbar').exists()).toBe(true)
    expect(wrapper.find('.xl-rich-editor__surface').exists()).toBe(true)
    expect(wrapper.find('.xl-editor__viewport').exists()).toBe(true)
    expect(wrapper.find('.xl-editor__content').exists()).toBe(true)
  })
})
