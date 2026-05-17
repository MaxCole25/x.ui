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
