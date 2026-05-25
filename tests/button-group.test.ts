import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XButton, XButtonGroup } from '../src'

describe('XButtonGroup', () => {
  it('renders button slot content', () => {
    const wrapper = mount(XButtonGroup, {
      slots: {
        default: '<button>保存</button><button>取消</button>'
      }
    })

    expect(wrapper.text()).toContain('保存')
    expect(wrapper.text()).toContain('取消')
  })

  it('uses horizontal direction by default', () => {
    const wrapper = mount(XButtonGroup)

    expect(wrapper.classes()).toContain('x-button-group--horizontal')
  })

  it('applies vertical direction class', () => {
    const wrapper = mount(XButtonGroup, {
      props: {
        direction: 'vertical'
      }
    })

    expect(wrapper.classes()).toContain('x-button-group--vertical')
  })

  it('maps width, height, radius and button styles to style variables', () => {
    const wrapper = mount(XButtonGroup, {
      props: {
        width: 320,
        height: '96px',
        radius: 10,
        borderColor: '#123456',
        backgroundColor: '#ffffff',
        textColor: '#1264f4'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-button-group-width: 320px')
    expect(style).toContain('--x-button-group-height: 96px')
    expect(style).toContain('--x-button-group-radius: 10px')
    expect(style).toContain('--x-button-border-color: #123456')
    expect(style).toContain('--x-button-bg: #ffffff')
    expect(style).toContain('--x-button-text: #1264f4')
    expect(style).not.toContain('--x-element-bg')
    expect(style).not.toContain('--x-element-text')
  })

  it('keeps slotted button click events working', async () => {
    const wrapper = mount({
      components: {
        XButton,
        XButtonGroup
      },
      template: `
        <XButtonGroup>
          <XButton @click="count += 1">保存</XButton>
        </XButtonGroup>
      `,
      data() {
        return {
          count: 0
        }
      }
    })

    await wrapper.find('.x-button').trigger('click')

    expect(wrapper.vm.count).toBe(1)
  })

  it('sets group role for assistive semantics', () => {
    const wrapper = mount(XButtonGroup)

    expect(wrapper.attributes('role')).toBe('group')
  })
})
