import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { XScrollingText } from '../src'

describe('XScrollingText', () => {
  it('renders duplicated default slot content for continuous scrolling', () => {
    const wrapper = mount(XScrollingText, {
      slots: {
        default: '滚动公告'
      }
    })

    const contents = wrapper.findAll('.x-scrolling-text__content')
    expect(contents).toHaveLength(2)
    expect(contents[0].text()).toBe('滚动公告')
    expect(contents[1].attributes('aria-hidden')).toBe('true')
  })

  it('uses horizontal display and width by default', () => {
    const wrapper = mount(XScrollingText, {
      props: {
        width: 240,
        flowDirection: 'right'
      },
      slots: {
        default: '横向滚动'
      }
    })

    expect(wrapper.classes()).toContain('x-scrolling-text--horizontal')
    expect(wrapper.classes()).toContain('x-scrolling-text--to-right')
    expect(wrapper.attributes('style')).toContain('--x-scrolling-text-width: 240px')
    expect(wrapper.attributes('style')).not.toContain('--x-scrolling-text-height')
  })

  it('uses vertical display and height', () => {
    const wrapper = mount(XScrollingText, {
      props: {
        displayDirection: 'vertical',
        flowDirection: 'down',
        height: 120
      },
      slots: {
        default: '竖向滚动'
      }
    })

    expect(wrapper.classes()).toContain('x-scrolling-text--vertical')
    expect(wrapper.classes()).toContain('x-scrolling-text--to-down')
    expect(wrapper.attributes('style')).toContain('--x-scrolling-text-height: 120px')
    expect(wrapper.attributes('style')).not.toContain('--x-scrolling-text-width')
  })

  it('normalizes flow direction by display direction', () => {
    const horizontal = mount(XScrollingText, {
      props: {
        displayDirection: 'horizontal',
        flowDirection: 'up'
      }
    })
    const vertical = mount(XScrollingText, {
      props: {
        displayDirection: 'vertical',
        flowDirection: 'left'
      }
    })

    expect(horizontal.classes()).toContain('x-scrolling-text--to-left')
    expect(vertical.classes()).toContain('x-scrolling-text--to-up')
  })

  it('exposes text appearance style variables without padding props', () => {
    const wrapper = mount(XScrollingText, {
      props: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        textColor: '#ffffff',
        backgroundColor: '#1264f4'
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--x-scrolling-text-font-family: Arial, sans-serif')
    expect(style).toContain('--x-scrolling-text-font-size: 16px')
    expect(style).toContain('--x-scrolling-text-color: #ffffff')
    expect(style).toContain('--x-scrolling-text-bg: #1264f4')
    expect(style).not.toContain('padding')
  })

  it('maps speed to animation duration from measured content size', async () => {
    const wrapper = mount(XScrollingText, {
      props: {
        speed: 60
      },
      slots: {
        default: '速度控制'
      }
    })

    const content = wrapper.find('.x-scrolling-text__content').element as HTMLElement
    content.getBoundingClientRect = () =>
      ({
        width: 180,
        height: 20,
        bottom: 20,
        left: 0,
        right: 180,
        top: 0,
        x: 0,
        y: 0,
        toJSON: () => ({})
      }) as DOMRect

    await wrapper.setProps({ speed: 90 })
    await nextTick()

    expect(wrapper.attributes('style')).toContain('--x-scrolling-text-duration: 2s')
  })
})
