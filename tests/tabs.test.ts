import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
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
    expect(wrapper.attributes('style')).toContain('--x-tabs-content-bg: #fff')
    expect(wrapper.attributes('style')).toContain('--x-tabs-context-menu-bg: #fff')
    expect(wrapper.attributes('style')).toContain('--x-tabs-context-menu-text: var(--x-color-text)')
    expect(wrapper.attributes('style')).toContain('--x-tabs-item-height: 30px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-item-frame-height: 30px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-label-font-size: 12px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-vertical-width: 48px')
  })

  it('supports lg and sm tab sizes', () => {
    const large = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        size: 'lg'
      }
    })
    const small = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        size: 'sm'
      }
    })

    expect(large.classes()).toContain('x-tabs--lg')
    expect(large.attributes('style')).toContain('--x-tabs-item-height: 38px')
    expect(large.attributes('style')).toContain('--x-tabs-item-frame-height: 30px')
    expect(large.attributes('style')).toContain('--x-tabs-item-min-width: 140px')
    expect(large.attributes('style')).toContain('--x-tabs-item-padding-x: 8px')
    expect(small.classes()).toContain('x-tabs--sm')
    expect(small.attributes('style')).toContain('--x-tabs-item-height: 22px')
    expect(small.attributes('style')).toContain('--x-tabs-item-frame-height: 30px')
    expect(small.attributes('style')).toContain('--x-tabs-item-min-width: 140px')
    expect(small.attributes('style')).toContain('--x-tabs-item-padding-x: 8px')
  })

  it('keeps horizontal tab item frames at the md height for every size', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(css).toContain('--x-tabs-item-frame-height: 30px')
    expect(css).toContain('height: var(--x-tabs-item-frame-height, 30px)')
    expect(css).toContain('line-height: var(--x-tabs-item-frame-height, 30px)')
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

  it('exposes tab minimum width variable', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        tabMinWidth: 96
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-tabs-item-min-width: 96px')
  })

  it('supports vertical tab label direction', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        tabPosition: 'left',
        labelDirection: 'vertical',
        verticalWidth: 44,
        verticalLabelMinHeight: 112
      }
    })

    expect(wrapper.classes()).toContain('x-tabs--left')
    expect(wrapper.classes()).toContain('is-vertical')
    expect(wrapper.classes()).toContain('x-tabs--label-vertical')
    expect(wrapper.attributes('style')).toContain('--x-tabs-vertical-width: 44px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-vertical-label-min-height: 112px')
    expect(wrapper.find('.x-tabs__label-text').text()).toBe('A')
  })

  it('applies custom border radius and content region styles', () => {
    const wrapper = mount(XTabs, {
      props: {
        modelValue: 'a',
        items,
        borderRadius: '10px',
        tabBorder: '1px solid #7FD6F6',
        contentBorder: '1px dashed #0B4A52',
        contentBackgroundColor: '#f8fafc'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-tabs-radius: 10px')
    expect(wrapper.attributes('style')).toContain('--x-tabs-tab-border: 1px solid #7FD6F6')
    expect(wrapper.attributes('style')).toContain('--x-tabs-content-border: 1px dashed #0B4A52')
    expect(wrapper.attributes('style')).toContain('--x-tabs-content-bg: #f8fafc')
  })

  it('exposes context menu color variables', async () => {
    const wrapper = mount(XTabs, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        items,
        contextMenuBackgroundColor: '#111827',
        contextMenuTextColor: '#f8fafc'
      }
    })

    await wrapper.find('.x-tabs__item').trigger('contextmenu', { clientX: 12, clientY: 24 })

    const menu = document.body.querySelector('.x-tabs__menu') as HTMLElement | null
    expect(menu?.getAttribute('style')).toContain('--x-tabs-context-menu-bg: #111827')
    expect(menu?.getAttribute('style')).toContain('--x-tabs-context-menu-text: #f8fafc')

    wrapper.unmount()
  })

  it('hides context menu when showContextMenu is false', async () => {
    const wrapper = mount(XTabs, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        items,
        showContextMenu: false
      }
    })

    await wrapper.find('.x-tabs__item').trigger('contextmenu', { clientX: 12, clientY: 24 })

    expect(document.body.querySelector('.x-tabs__menu')).toBeNull()

    wrapper.unmount()
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

  it('uses TabItem locked to block close, refresh, drag and show lock icon', async () => {
    const wrapper = mount(XTabs, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        closable: true,
        draggable: true,
        showRefreshIcon: true,
        items: [
          { name: 'a', label: 'A', locked: true, refreshable: true },
          { name: 'b', label: 'B', closable: true, refreshable: true }
        ]
      }
    })
    const tabButtons = wrapper.findAll('.x-tabs__item')
    const rect = { left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40, x: 0, y: 0, toJSON: () => ({}) }
    vi.spyOn(tabButtons[0].element, 'getBoundingClientRect').mockReturnValue(rect)

    expect(wrapper.find('.x-tabs__lock').exists()).toBe(true)
    expect(wrapper.findAll('.x-tabs__close')).toHaveLength(1)

    await tabButtons[0].trigger('dragstart', { dataTransfer: { effectAllowed: '', setData: vi.fn() } })
    await tabButtons[1].trigger('dragover', { clientX: 80, clientY: 10 })
    await tabButtons[1].trigger('drop')
    await tabButtons[1].trigger('dragstart', { dataTransfer: { effectAllowed: '', setData: vi.fn() } })
    await tabButtons[0].trigger('dragover', { clientX: 20, clientY: 10 })
    await tabButtons[0].trigger('drop')

    await tabButtons[0].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[2].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await tabButtons[1].trigger('contextmenu')
    document.body.querySelectorAll('.x-tabs__menu-item')[5].dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.emitted('reorder')).toBeUndefined()
    expect(wrapper.emitted('tab-refresh')).toBeUndefined()
    expect(wrapper.emitted('tab-remove')?.map((event) => event[0])).toEqual(['b'])
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
