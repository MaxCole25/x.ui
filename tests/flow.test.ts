import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { XFlow, XFlowItem } from '../src'

const items = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `icon-${index + 1}`
}))

describe('XFlow', () => {
  it('renders default slot content in static mode', () => {
    const wrapper = mount({
      components: {
        XFlow,
        XFlowItem
      },
      template: `
        <XFlow>
          <XFlowItem>图标</XFlowItem>
        </XFlow>
      `
    })

    expect(wrapper.find('.x-flow').exists()).toBe(true)
    expect(wrapper.find('.x-flow-item').exists()).toBe(true)
    expect(wrapper.text()).toContain('图标')
  })

  it('renders data items with slot props', () => {
    const wrapper = mount(XFlow, {
      props: {
        items,
        itemKey: 'id'
      },
      slots: {
        default: '<template #default="{ item, index }"><span>{{ index }}-{{ item.name }}</span></template>'
      }
    })

    expect(wrapper.findAll('.x-flow-item')).toHaveLength(12)
    expect(wrapper.text()).toContain('0-icon-1')
    expect(wrapper.text()).toContain('11-icon-12')
  })

  it('supports itemKey as a function', () => {
    const keyGetter = vi.fn((item: unknown, index: number) => `${(item as { name: string }).name}-${index}`)

    mount(XFlow, {
      props: {
        items: items.slice(0, 2),
        itemKey: keyGetter
      },
      slots: {
        default: '<template #default="{ item }"><span>{{ item.name }}</span></template>'
      }
    })

    expect(keyGetter).toHaveBeenCalledWith(items[0], 0)
    expect(keyGetter).toHaveBeenCalledWith(items[1], 1)
  })

  it('maps container layout and theme props to variables', () => {
    const wrapper = mount(XFlow, {
      props: {
        items: [],
        itemWidth: 88,
        gap: 8,
        rowGap: 12,
        columnGap: '2rem',
        width: 480,
        height: '320px',
        minWidth: 240,
        minHeight: '160px',
        padding: 10,
        justifyItems: 'stretch',
        alignItems: 'end',
        backgroundColor: '#f8fafc',
        textColor: '#123456',
        borderColor: '#94a3b8',
        borderWidth: 1,
        borderStyle: 'dashed',
        radius: 8
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-flow-item-track-width: 88px')
    expect(style).toContain('--x-flow-gap: 8px')
    expect(style).toContain('--x-flow-row-gap: 12px')
    expect(style).toContain('--x-flow-column-gap: 2rem')
    expect(style).toContain('--x-flow-width: 480px')
    expect(style).toContain('--x-flow-height: 320px')
    expect(style).toContain('--x-flow-min-width: 240px')
    expect(style).toContain('--x-flow-min-height: 160px')
    expect(style).toContain('--x-flow-padding: 10px')
    expect(style).toContain('--x-flow-justify-items: stretch')
    expect(style).toContain('--x-flow-align-items: end')
    expect(style).toContain('--x-flow-bg: #f8fafc')
    expect(style).toContain('--x-flow-text-color: #123456')
    expect(style).toContain('--x-flow-border-color: #94a3b8')
    expect(style).toContain('--x-flow-border-width: 1px')
    expect(style).toContain('--x-flow-border-style: dashed')
    expect(style).toContain('--x-flow-radius: 8px')
  })

  it('maps default item theme props to variables', () => {
    const wrapper = mount(XFlow, {
      props: {
        items: [],
        itemBackgroundColor: '#ffffff',
        itemTextColor: '#0f172a',
        itemBorderColor: '#cbd5e1',
        itemBorderWidth: 1,
        itemBorderStyle: 'solid',
        itemRadius: 6,
        itemPadding: 12,
        itemOverflow: 'hidden'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-flow-default-item-bg: #ffffff')
    expect(style).toContain('--x-flow-default-item-text-color: #0f172a')
    expect(style).toContain('--x-flow-default-item-border-color: #cbd5e1')
    expect(style).toContain('--x-flow-default-item-border-width: 1px')
    expect(style).toContain('--x-flow-default-item-border-style: solid')
    expect(style).toContain('--x-flow-default-item-radius: 6px')
    expect(style).toContain('--x-flow-default-item-padding: 12px')
    expect(style).toContain('--x-flow-default-item-overflow: hidden')
  })

  it('maps XFlowItem appearance props to variables', () => {
    const wrapper = mount(XFlowItem, {
      props: {
        width: 120,
        height: '80px',
        minWidth: 64,
        minHeight: '40px',
        padding: 12,
        justifySelf: 'center',
        alignSelf: 'end',
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        borderColor: '#cbd5e1',
        borderWidth: 1,
        borderStyle: 'solid',
        radius: 6,
        overflow: 'hidden'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-flow-item-width: 120px')
    expect(style).toContain('--x-flow-item-height: 80px')
    expect(style).toContain('--x-flow-item-min-width: 64px')
    expect(style).toContain('--x-flow-item-min-height: 40px')
    expect(style).toContain('--x-flow-item-padding: 12px')
    expect(style).toContain('--x-flow-item-justify-self: center')
    expect(style).toContain('--x-flow-item-align-self: end')
    expect(style).toContain('--x-flow-item-bg: #ffffff')
    expect(style).toContain('--x-flow-item-text-color: #0f172a')
    expect(style).toContain('--x-flow-item-border-color: #cbd5e1')
    expect(style).toContain('--x-flow-item-border-width: 1px')
    expect(style).toContain('--x-flow-item-border-style: solid')
    expect(style).toContain('--x-flow-item-radius: 6px')
    expect(style).toContain('--x-flow-item-overflow: hidden')
  })

  it('renders only initial items when lazy is enabled', () => {
    const wrapper = mount(XFlow, {
      props: {
        items,
        lazy: true,
        initialCount: 5,
        loadCount: 3
      },
      slots: {
        default: '<template #default="{ item }"><span>{{ item.name }}</span></template>'
      }
    })

    expect(wrapper.findAll('.x-flow-item')).toHaveLength(5)
    expect(wrapper.find('.x-flow__sentinel').exists()).toBe(true)
  })

  it('appends items after scrolling near the bottom', async () => {
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0)
        return 1
      })
    const cancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
    const wrapper = mount(XFlow, {
      props: {
        items,
        lazy: true,
        initialCount: 4,
        loadCount: 3,
        height: 120
      },
      slots: {
        default: '<template #default="{ item }"><span>{{ item.name }}</span></template>'
      }
    })

    const root = wrapper.find('.x-flow').element as HTMLElement
    Object.defineProperty(root, 'scrollHeight', { configurable: true, value: 400 })
    Object.defineProperty(root, 'clientHeight', { configurable: true, value: 120 })
    root.scrollTop = 320

    await wrapper.trigger('scroll')
    await nextTick()

    expect(wrapper.findAll('.x-flow-item')).toHaveLength(7)

    requestAnimationFrame.mockRestore()
    cancelAnimationFrame.mockRestore()
  })

  it('renders all items when lazy is disabled', () => {
    const wrapper = mount(XFlow, {
      props: {
        items,
        lazy: false,
        initialCount: 3
      },
      slots: {
        default: '<template #default="{ item }"><span>{{ item.name }}</span></template>'
      }
    })

    expect(wrapper.findAll('.x-flow-item')).toHaveLength(12)
    expect(wrapper.find('.x-flow__sentinel').exists()).toBe(false)
  })

  it('registers flow and flow item through the flow installer', () => {
    const app = {
      component: vi.fn()
    }

    ;(XFlow as typeof XFlow & { install: (target: typeof app) => void }).install(app)

    expect(app.component).toHaveBeenCalledWith('XFlow', XFlow)
    expect(app.component).toHaveBeenCalledWith('XFlowItem', XFlowItem)
  })
})
