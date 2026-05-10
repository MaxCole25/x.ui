import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { XTabs } from '../src'

class ResizeObserverMock {
  observe = vi.fn()
  disconnect = vi.fn()
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

describe('XTabs', () => {
  const items = [
    { name: 'a', label: 'A' },
    { name: 'b', label: 'B', closable: true, refreshable: true },
    { name: 'c', label: 'C', disabled: true }
  ]

  it('uses documented default visual variables', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-bg: transparent')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-text: #6B7C93')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-active-bg: #0B4A52')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-active-text: #7FD6F6')
    expect(wrapper.attributes('style')).toContain('--x-tabs-radius: 4px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-border: 1px solid var(--x-color-border)')
    expect(wrapper.attributes('style')).toContain('--x-tabs-content-border: 1px solid var(--x-color-border)')
    expect(wrapper.attributes('style')).toContain('--x-tabs-item-height: 40px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-label-font-size: 14px')
  })

  it('supports large and small tab sizes', () => {
    const large = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        size: 'large'
      }
    })
    const small = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        size: 'small'
      }
    })

    expect(large.classes()).toContain('x-tabs--large')
    expect(large.attributes('style')).toContain('--x-tabs-item-height: 46px')
    expect(small.classes()).toContain('x-tabs--small')
    expect(small.attributes('style')).toContain('--x-tabs-item-height: 34px')
  })

  it('exposes tab label font size variable', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        tabFontSize: 16
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-tabs-label-font-size: 16px')
  })

  it('applies custom border radius and region borders', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        borderRadius: '10px',
        tabBorder: '1px solid #7FD6F6',
        contentBorder: '1px dashed #0B4A52'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-tabs-radius: 10px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-border: 1px solid #7FD6F6')
    expect(wrapper.attributes('style')).toContain('--x-tabs-content-border: 1px dashed #0B4A52')
  })

  it('switches active tab', async () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items
      }
    })

    await wrapper.findAll('.x-tabs__item')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('tab-click')?.[0]?.[0]).toMatchObject({ paneName: 'b' })
  })

  it('does not switch disabled tab', async () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items
      }
    })

    await wrapper.findAll('.x-tabs__item')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('respects beforeLeave guard', async () => {
    const beforeLeave = vi.fn().mockResolvedValue(false)
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        beforeLeave
      }
    })

    await wrapper.findAll('.x-tabs__item')[1].trigger('click')

    expect(beforeLeave).toHaveBeenCalledWith('b', 'a')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('emits add and remove edit events', async () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        addable: true,
        closable: true
      }
    })

    await wrapper.find('.x-tabs__add').trigger('click')
    await wrapper.findAll('.x-tabs__close')[1].trigger('click')

    expect(wrapper.emitted('tab-add')?.length).toBe(1)
    expect(wrapper.emitted('edit')?.[0]).toEqual([undefined, 'add'])
    expect(wrapper.emitted('tab-remove')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('edit')?.[1]).toEqual(['b', 'remove'])
  })

  it('renders lazy panes after visit', async () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        lazy: true,
        items: [
          { name: 'a', label: 'A' },
          { name: 'b', label: 'B' }
        ]
      },
      slots: {
        pane: '<div class="pane">{{ params.item.label }}</div>'
      }
    })

    expect(wrapper.findAll('.pane')).toHaveLength(1)

    await wrapper.setProps({ modelValue: 'b' })

    expect(wrapper.findAll('.pane')).toHaveLength(2)
  })

  it('emits reorder payload after drag and drop', async () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        draggable: true
      }
    })
    const tabButtons = wrapper.findAll('.x-tabs__item')
    const rect = { left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40, x: 0, y: 0, toJSON: () => ({}) }
    vi.spyOn(tabButtons[1].element, 'getBoundingClientRect').mockReturnValue(rect)

    await tabButtons[0].trigger('dragstart', { dataTransfer: { effectAllowed: '', setData: vi.fn() } })
    await tabButtons[1].trigger('dragover', { clientX: 80, clientY: 10 })
    await tabButtons[1].trigger('drop')

    expect(wrapper.emitted('reorder')?.[0]).toEqual([{ source: 'a', target: 'b', position: 'after' }])
  })

  it('keeps locked tabs when closing all from the context menu', async () => {
    const wrapper = mount(XTabs, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        closable: true,
        items: [
          { name: 'a', label: 'A' },
          { name: 'b', label: 'B' },
          { name: 'c', label: 'C' }
        ]
      }
    })

    await wrapper.findAll('.x-tabs__item')[1].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.findAll('.x-tabs__item')[0].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[5].dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.emitted('tab-remove')?.map((event) => event[0])).toEqual(['a', 'c'])
    expect(wrapper.emitted('edit')?.map((event) => event.slice(0, 2))).toEqual([
      ['a', 'remove'],
      ['c', 'remove']
    ])
    expect(wrapper.emitted('tab-close-all')?.[0]).toEqual([{ names: ['a', 'c'] }])
  })

  it('keeps target and locked tabs when closing others from the context menu', async () => {
    const wrapper = mount(XTabs, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        closable: true,
        items: [
          { name: 'a', label: 'A' },
          { name: 'b', label: 'B' },
          { name: 'c', label: 'C' },
          { name: 'd', label: 'D' }
        ]
      }
    })

    await wrapper.findAll('.x-tabs__item')[2].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.findAll('.x-tabs__item')[1].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[4].dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.emitted('tab-remove')?.map((event) => event[0])).toEqual(['a', 'd'])
    expect(wrapper.emitted('edit')?.map((event) => event.slice(0, 2))).toEqual([
      ['a', 'remove'],
      ['d', 'remove']
    ])
    expect(wrapper.emitted('tab-close-others')?.[0]).toEqual([{ targetName: 'b', names: ['a', 'd'] }])
  })
})
