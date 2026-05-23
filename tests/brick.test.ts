import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XBrick, XBrickItem } from '../src'

describe('XBrick', () => {
  it('uses horizontal direction by default', () => {
    const wrapper = mount(XBrick)

    expect(wrapper.classes()).toContain('x-brick--horizontal')
    expect(wrapper.attributes('style')).toContain('--x-brick-gap: 0px')
  })

  it('applies vertical direction class', () => {
    const wrapper = mount(XBrick, {
      props: {
        direction: 'vertical'
      }
    })

    expect(wrapper.classes()).toContain('x-brick--vertical')
  })

  it('maps container width, height, gap and wrap state', () => {
    const wrapper = mount(XBrick, {
      props: {
        width: 480,
        height: '320px',
        gap: 12,
        wrap: true
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-brick-width: 480px')
    expect(style).toContain('--x-brick-height: 320px')
    expect(style).toContain('--x-brick-gap: 12px')
    expect(wrapper.classes()).toContain('is-wrap')
  })

  it('uses a transparent brick background by default and allows overriding it', () => {
    const defaultWrapper = mount(XBrick)
    const customWrapper = mount(XBrick, {
      props: {
        backgroundColor: '#f0fdf4'
      }
    })

    expect(defaultWrapper.attributes('style')).toContain('--x-element-bg: transparent')
    expect(customWrapper.attributes('style')).toContain('--x-element-bg: #f0fdf4')
  })

  it('renders count placeholders when default slot is empty', () => {
    const wrapper = mount(XBrick, {
      props: {
        count: 3
      }
    })

    expect(wrapper.findAll('.x-brick-item')).toHaveLength(3)
    expect(wrapper.findAll('.x-brick-item--placeholder')).toHaveLength(3)
  })

  it('renders slotted brick items instead of count placeholders', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick :count="5">
          <XBrickItem>一</XBrickItem>
          <XBrickItem>二</XBrickItem>
        </XBrick>
      `
    })

    expect(wrapper.findAll('.x-brick-item')).toHaveLength(2)
    expect(wrapper.findAll('.x-brick-item--placeholder')).toHaveLength(0)
    expect(wrapper.text()).toContain('一')
    expect(wrapper.text()).toContain('二')
  })

  it('uses width as horizontal main-axis size', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick direction="horizontal">
          <XBrickItem width="240px">固定</XBrickItem>
          <XBrickItem>自适应</XBrickItem>
        </XBrick>
      `
    })

    const items = wrapper.findAll('.x-brick-item')

    expect(items[0].attributes('style')).toContain('flex: 0 0 240px')
    expect(items[1].attributes('style')).toContain('flex: 1 1 0')
  })

  it('uses height as vertical main-axis size', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick direction="vertical">
          <XBrickItem height="80px">顶部</XBrickItem>
          <XBrickItem>内容</XBrickItem>
        </XBrick>
      `
    })

    const items = wrapper.findAll('.x-brick-item')

    expect(items[0].attributes('style')).toContain('flex: 0 0 80px')
    expect(items[1].attributes('style')).toContain('flex: 1 1 0')
  })

  it('lets size override width or height on the main axis', () => {
    const wrapper = mount(XBrickItem, {
      props: {
        size: '160px',
        width: '240px',
        height: '80px'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('flex: 0 0 160px')
    expect(style).toContain('width: 240px')
    expect(style).toContain('height: 80px')
  })

  it('maps minSize and maxSize to the current main axis', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick direction="vertical">
          <XBrickItem min-size="64px" max-size="180px">内容</XBrickItem>
        </XBrick>
      `
    })

    const style = wrapper.find('.x-brick-item').attributes('style')

    expect(style).toContain('min-height: 64px')
    expect(style).toContain('max-height: 180px')
  })

  it('allows item overflow to be configured', () => {
    const defaultWrapper = mount(XBrickItem)
    const hiddenWrapper = mount(XBrickItem, {
      props: {
        overflow: 'hidden'
      }
    })

    expect(defaultWrapper.attributes('style')).toContain('overflow: auto')
    expect(hiddenWrapper.attributes('style')).toContain('overflow: hidden')
  })

  it('uses a transparent item background by default and allows overriding it', () => {
    const defaultWrapper = mount(XBrickItem)
    const customWrapper = mount(XBrickItem, {
      props: {
        backgroundColor: '#f0fdf4'
      }
    })

    expect(defaultWrapper.attributes('style')).toContain('background-color: transparent')
    expect(customWrapper.attributes('style')).toContain('background-color: rgb(240, 253, 244)')
  })

  it('lets brick provide default content alignment and padding to items', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick vertical-center horizontal-center padding="12px">
          <XBrickItem>内容</XBrickItem>
        </XBrick>
      `
    })

    const style = wrapper.find('.x-brick-item').attributes('style')

    expect(style).toContain('display: flex')
    expect(style).toContain('flex-direction: column')
    expect(style).toContain('justify-content: center')
    expect(style).toContain('align-items: center')
    expect(style).toContain('padding: 12px')
  })

  it('right-aligns direct brick items as a group', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick right-align padding="12px">
          <XBrickItem>内容</XBrickItem>
        </XBrick>
      `
    })

    const brickStyle = wrapper.find('.x-brick').attributes('style')
    const style = wrapper.find('.x-brick-item').attributes('style')

    expect(brickStyle).toContain('justify-content: flex-end')
    expect(wrapper.find('.x-brick').classes()).toContain('is-right-align')
    expect(style).toContain('flex: 0 1 auto')
    expect(style).not.toContain('align-items: flex-end')
    expect(style).toContain('padding: 12px')
  })

  it('right-aligns vertical brick items on the cross axis', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick direction="vertical" right-align>
          <XBrickItem height="80px">内容</XBrickItem>
        </XBrick>
      `
    })

    expect(wrapper.find('.x-brick').attributes('style')).toContain('align-items: flex-end')
  })

  it('lets item right and bottom alignment override item center alignment', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick vertical-center horizontal-center bottom-align>
          <XBrickItem right-align>内容</XBrickItem>
        </XBrick>
      `
    })

    const style = wrapper.find('.x-brick-item').attributes('style')

    expect(style).toContain('justify-content: flex-end')
    expect(style).toContain('align-items: flex-end')
  })

  it('passes brick text color style variables to items', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick text-color="#123456">
          <XBrickItem>内容</XBrickItem>
        </XBrick>
      `
    })

    expect(wrapper.find('.x-brick').attributes('style')).toContain('--x-element-text: #123456')
  })

  it('keeps item background transparent when brick background is configured', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick background-color="#123456">
          <XBrickItem>内容</XBrickItem>
        </XBrick>
      `
    })

    expect(wrapper.find('.x-brick').attributes('style')).toContain('--x-element-bg: #123456')
    expect(wrapper.find('.x-brick-item').attributes('style')).toContain('background-color: transparent')
  })

  it('lets brick item alignment and padding override brick defaults', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick vertical-center horizontal-center bottom-align padding="16px">
          <XBrickItem :vertical-center="false" :horizontal-center="false" :bottom-align="false" :right-align="false" padding="4px">内容</XBrickItem>
        </XBrick>
      `
    })

    const style = wrapper.find('.x-brick-item').attributes('style')

    expect(style).not.toContain('display: flex')
    expect(style).not.toContain('justify-content: center')
    expect(style).not.toContain('align-items: center')
    expect(style).not.toContain('justify-content: flex-end')
    expect(style).not.toContain('align-items: flex-end')
    expect(style).toContain('padding: 4px')
  })

  it('keeps item content layout when a nested brick is rendered inside it', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick>
          <XBrickItem min-size="320px" overflow="hidden" vertical-center padding="6px">
            <XBrick direction="horizontal" width="100%" height="100%" :gap="12">
              <XBrickItem>内层内容</XBrickItem>
            </XBrick>
          </XBrickItem>
        </XBrick>
      `
    })

    const items = wrapper.findAll('.x-brick-item')
    const nestedItemStyle = items[1].attributes('style')

    expect(nestedItemStyle).toContain('display: flex')
    expect(nestedItemStyle).toContain('flex-direction: column')
    expect(nestedItemStyle).toContain('justify-content: center')
    expect(nestedItemStyle).toContain('padding: 6px')
  })

  it('lets nested brick props override inherited item content layout', () => {
    const wrapper = mount({
      components: {
        XBrick,
        XBrickItem
      },
      template: `
        <XBrick>
          <XBrickItem vertical-center horizontal-center padding="10px">
            <XBrick :vertical-center="false" :horizontal-center="false" padding="2px">
              <XBrickItem>内层内容</XBrickItem>
            </XBrick>
          </XBrickItem>
        </XBrick>
      `
    })

    const items = wrapper.findAll('.x-brick-item')
    const nestedItemStyle = items[1].attributes('style')

    expect(nestedItemStyle).not.toContain('display: flex')
    expect(nestedItemStyle).not.toContain('justify-content: center')
    expect(nestedItemStyle).not.toContain('align-items: center')
    expect(nestedItemStyle).toContain('padding: 2px')
  })

  it('applies brick content layout to generated placeholders', () => {
    const wrapper = mount(XBrick, {
      props: {
        count: 1,
        verticalCenter: true,
        horizontalCenter: true,
        bottomAlign: true,
        rightAlign: true,
        padding: 10
      }
    })

    const brickStyle = wrapper.find('.x-brick').attributes('style')
    const style = wrapper.find('.x-brick-item--placeholder').attributes('style')

    expect(brickStyle).toContain('justify-content: flex-end')
    expect(style).toContain('display: flex')
    expect(style).toContain('justify-content: flex-end')
    expect(style).toContain('align-items: center')
    expect(style).toContain('padding: 10px')
  })
})
