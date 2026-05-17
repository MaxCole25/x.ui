import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { h } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import {
  XCard,
  XDivider,
  XDrawer,
  XDropdown,
  XDropdownItem,
  XDropdownMenu,
  XEmpty,
  XTag,
  XTooltip
} from '../src'

describe('new element components', () => {
  it('renders XCard regions and style variables', () => {
    const wrapper = mount(XCard, {
      props: {
        header: '标题',
        footer: '底部',
        width: 240,
        height: '120px'
      },
      slots: {
        default: '正文'
      }
    })

    expect(wrapper.text()).toContain('标题')
    expect(wrapper.text()).toContain('正文')
    expect(wrapper.text()).toContain('底部')
    expect(wrapper.attributes('style')).toContain('--x-card-width: 240px')
    expect(wrapper.attributes('style')).toContain('--x-card-height: 120px')
  })

  it('emits close from XTag close button', async () => {
    const wrapper = mount(XTag, {
      props: {
        closable: true
      },
      slots: {
        default: '状态'
      }
    })

    await wrapper.find('.x-tag__close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('shows XTooltip by click trigger', async () => {
    vi.useFakeTimers()
    const wrapper = mount(XTooltip, {
      props: {
        content: '提示',
        trigger: 'click'
      },
      slots: {
        default: '<button>触发</button>'
      },
      attachTo: document.body
    })

    await wrapper.trigger('click')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    const popper = document.body.querySelector('.x-tooltip__popper')
    expect(popper?.textContent).toContain('提示')
    expect(popper?.classList.contains('is-teleported')).toBe(true)
    expect(wrapper.emitted('show')).toHaveLength(1)
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('can render XTooltip popper inside the trigger wrapper', async () => {
    vi.useFakeTimers()
    const wrapper = mount(XTooltip, {
      props: {
        content: '提示',
        trigger: 'click',
        teleported: false
      },
      slots: {
        default: '<button>触发</button>'
      }
    })

    await wrapper.trigger('click')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.x-tooltip__popper').text()).toContain('提示')
    expect(wrapper.find('.x-tooltip__popper').classes()).not.toContain('is-teleported')
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('applies XTooltip inline style variables from color props', async () => {
    vi.useFakeTimers()
    const wrapper = mount(XTooltip, {
      props: {
        content: '提示',
        trigger: 'click',
        teleported: false,
        backgroundColor: '#12243a',
        textColor: '#eef4fb',
        borderColor: '#203247',
        borderWidth: 1
      },
      slots: {
        default: '<button>触发</button>'
      }
    })

    await wrapper.trigger('click')
    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    const style = wrapper.find('.x-tooltip__popper').attributes('style')
    expect(style).toContain('--x-element-bg: #12243a')
    expect(style).toContain('--x-element-text: #eef4fb')
    expect(style).toContain('--x-element-border-color: #203247')
    expect(style).toContain('--x-element-border-width: 1px')
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('keeps XTooltip theme variable fallback chains in CSS', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(css).toContain('--x-tooltip-bg: #1f2937')
    expect(css).toContain('--x-tooltip-text: #ffffff')
    expect(css).toContain('--x-tooltip-border-color: transparent')
    expect(css).toContain('--x-tooltip-border-width: 0')
    expect(css).toContain('background: var(--x-element-bg, var(--x-tooltip-bg, #1f2937))')
    expect(css).toContain('color: var(--x-element-text, var(--x-tooltip-text, #fff))')
    expect(css).toContain('border: var(--x-element-border-width, var(--x-tooltip-border-width, 0)) solid var(--x-element-border-color, var(--x-tooltip-border-color, transparent))')
    expect(css).toContain('--x-tooltip-bg: #12243a')
    expect(css).toContain('--x-tooltip-border-color: #203247')
  })

  it('renders XDivider slot text and direction class', () => {
    const wrapper = mount(XDivider, {
      props: {
        direction: 'horizontal',
        contentPosition: 'left',
        borderStyle: 'dashed'
      },
      slots: {
        default: '分组'
      }
    })

    expect(wrapper.classes()).toContain('x-divider--left')
    expect(wrapper.find('.x-divider__text').text()).toBe('分组')
    expect(wrapper.attributes('style')).toContain('--x-divider-border-style: dashed')
  })

  it('emits XEmpty action from default action button', async () => {
    const wrapper = mount(XEmpty, {
      props: {
        actionText: '刷新'
      }
    })

    await wrapper.find('.x-empty__action').trigger('click')

    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('emits drawer model update when close button is clicked', async () => {
    const wrapper = mount(XDrawer, {
      props: {
        modelValue: true,
        title: '抽屉'
      },
      attachTo: document.body
    })

    const closeButton = document.body.querySelector('.x-drawer__close') as HTMLButtonElement
    closeButton.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('emits dropdown command from dropdown item', async () => {
    const wrapper = mount(XDropdown, {
      props: {
        trigger: 'click'
      },
      slots: {
        default: '<button>更多</button>',
        dropdown: () =>
          h(XDropdownMenu, null, {
            default: () => h(XDropdownItem, { command: 'edit' }, { default: () => '编辑' })
          })
      }
    })

    await wrapper.find('.x-dropdown__trigger').trigger('click')
    await wrapper.find('.x-dropdown-item').trigger('click')

    expect(wrapper.emitted('command')?.[0]).toEqual(['edit'])
  })
})
