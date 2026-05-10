import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XJsonEditor } from '../src'

describe('XJsonEditor', () => {
  it('formats json by toolbar action', async () => {
    const wrapper = mount(XJsonEditor, {
      props: { modelValue: '{"a":1}' }
    })
    await wrapper.find('.x-json-editor__toolbar button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
