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

  it('renders prefix and suffix slots around content', () => {
    const wrapper = mount(XButton, {
      slots: {
        prefix: '前',
        default: '保存',
        suffix: '后'
      }
    })

    expect(wrapper.find('.x-button__prefix').text()).toBe('前')
    expect(wrapper.find('.x-button__content').text()).toBe('保存')
    expect(wrapper.find('.x-button__suffix').text()).toBe('后')
  })

  it('applies variant class', () => {
    const wrapper = mount(XButton, {
      props: {
        variant: 'outline'
      }
    })

    expect(wrapper.classes()).toContain('x-button--outline')
  })

  it('maps width, height and active colors to style variables', () => {
    const wrapper = mount(XButton, {
      props: {
        width: 160,
        height: '42px',
        activeBackgroundColor: '#123456',
        activeBorderColor: '#234567',
        activeTextColor: '#ffffff'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-button-width: 160px')
    expect(style).toContain('--x-button-height: 42px')
    expect(style).toContain('--x-button-active-bg: #123456')
    expect(style).toContain('--x-button-active-border-color: #234567')
    expect(style).toContain('--x-button-active-text: #ffffff')
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

  it('emits click when clicked', async () => {
    const wrapper = mount(XButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('uses native button type to avoid submitting forms by default', () => {
    const wrapper = mount(XButton)

    expect(wrapper.attributes('type')).toBe('button')
  })
})
