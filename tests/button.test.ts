import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XButton } from '../src'

describe('XButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(XButton, {
      slots: {
        default: 'Create'
      }
    })

    expect(wrapper.text()).toContain('Create')
  })

  it('applies variant and size classes', () => {
    const wrapper = mount(XButton, {
      props: {
        variant: 'outline',
        size: 'lg'
      }
    })

    expect(wrapper.classes()).toContain('x-button--outline')
    expect(wrapper.classes()).toContain('x-button--lg')
  })

  it('disables the native button while loading', () => {
    const wrapper = mount(XButton, {
      props: {
        loading: true
      }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.x-button__spinner').exists()).toBe(true)
  })
})
