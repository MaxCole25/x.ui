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
})
