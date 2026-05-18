import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { h } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import {
  overlayZIndex,
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
    expect(css).toContain('--x-z-index-tooltip: var(--x-z-index-popper)')
    expect(css).toContain('z-index: var(--x-tooltip-z-index, var(--x-z-index-tooltip, 2000))')
    expect(css).toContain('background: var(--x-element-bg, var(--x-tooltip-bg, #1f2937))')
    expect(css).toContain('color: var(--x-element-text, var(--x-tooltip-text, #fff))')
    expect(css).toContain('border: var(--x-element-border-width, var(--x-tooltip-border-width, 0)) solid var(--x-element-border-color, var(--x-tooltip-border-color, transparent))')
    expect(css).toContain('--x-tooltip-bg: #12243a')
    expect(css).toContain('--x-tooltip-border-color: #203247')
  })

  it('keeps size from owning card, tooltip and drawer shell spacing or radius', async () => {
    vi.useFakeTimers()
    const card = mount(XCard, {
      props: {
        size: 'sm'
      },
      slots: {
        default: '卡片内容'
      }
    })
    const tooltip = mount(XTooltip, {
      props: {
        content: '提示',
        size: 'lg',
        trigger: 'click',
        teleported: false
      },
      slots: {
        default: '<button>触发</button>'
      }
    })
    const drawer = mount(XDrawer, {
      props: {
        modelValue: true,
        size: 'sm'
      },
      attachTo: document.body
    })

    await tooltip.trigger('click')
    vi.runAllTimers()
    await tooltip.vm.$nextTick()

    const cardStyle = card.find('.x-card').attributes('style')
    const tooltipStyle = tooltip.find('.x-tooltip__popper').attributes('style')
    const drawerStyle = (document.body.querySelector('.x-drawer') as HTMLElement).getAttribute('style')

    expect(cardStyle).toContain('--x-card-font-size: 10px')
    expect(cardStyle).not.toContain('--x-card-padding')
    expect(cardStyle).not.toContain('--x-card-radius')
    expect(tooltipStyle).toContain('--x-tooltip-font-size: 14px')
    expect(tooltipStyle).not.toContain('--x-tooltip-padding')
    expect(tooltipStyle).not.toContain('--x-tooltip-radius')
    expect(drawerStyle).toContain('--x-drawer-font-size: 10px')
    expect(drawerStyle).toContain('--x-drawer-control-height: 22px')
    expect(drawerStyle).not.toContain('--x-drawer-padding')
    expect(drawerStyle).not.toContain('--x-drawer-radius')

    card.unmount()
    tooltip.unmount()
    drawer.unmount()
    vi.useRealTimers()
  })

  it('keeps overlay layer tokens ordered and used by shared poppers', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(overlayZIndex).toEqual({
      drawer: 1800,
      dialog: 1900,
      popper: 2000,
      tooltip: 2000,
      loading: 2100,
      message: 2200,
      messageBox: 2300
    })
    expect(css).toContain('--x-z-index-drawer: 1800')
    expect(css).toContain('--x-z-index-dialog: 1900')
    expect(css).toContain('--x-z-index-popper: 2000')
    expect(css).toContain('z-index: var(--x-dropdown-z-index, var(--x-z-index-popper, 2000))')
    expect(css).toContain('z-index: var(--x-message-z-index, var(--x-z-index-message, 2200))')
    expect(css).not.toContain('z-index: 9999')
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

  it('applies XDrawer theme color variables from props', () => {
    const wrapper = mount(XDrawer, {
      props: {
        modelValue: true,
        title: '主题抽屉',
        zIndex: 2100,
        backgroundColor: '#0b1726',
        textColor: '#eef4fb',
        borderColor: '#203247',
        borderWidth: 1,
        maskColor: 'rgba(0, 0, 0, 0.52)',
        titleColor: '#f8fafc',
        headerBackgroundColor: '#101d2e',
        bodyBackgroundColor: '#0b1726',
        footerBackgroundColor: '#101d2e',
        headerBorderColor: '#203247',
        footerBorderColor: '#203247',
        closeIconColor: '#8da0b8',
        closeIconHoverColor: '#eef4fb',
        closeIconHoverBackgroundColor: 'rgba(148, 163, 184, 0.14)',
        shadow: '0 18px 56px rgba(0, 0, 0, 0.42)'
      },
      attachTo: document.body
    })

    const maskStyle = (document.body.querySelector('.x-drawer__mask') as HTMLElement).getAttribute('style')
    const drawerStyle = (document.body.querySelector('.x-drawer') as HTMLElement).getAttribute('style')

    expect(maskStyle).toContain('--x-drawer-mask: rgba(0, 0, 0, 0.52)')
    expect(maskStyle).toContain('--x-drawer-z-index: 2100')
    expect(drawerStyle).toContain('--x-drawer-bg: #0b1726')
    expect(drawerStyle).toContain('--x-drawer-text: #eef4fb')
    expect(drawerStyle).toContain('--x-drawer-border-color: #203247')
    expect(drawerStyle).toContain('--x-drawer-border-width: 1px')
    expect(drawerStyle).toContain('--x-drawer-title: #f8fafc')
    expect(drawerStyle).toContain('--x-drawer-header-bg: #101d2e')
    expect(drawerStyle).toContain('--x-drawer-body-bg: #0b1726')
    expect(drawerStyle).toContain('--x-drawer-footer-bg: #101d2e')
    expect(drawerStyle).toContain('--x-drawer-header-border: #203247')
    expect(drawerStyle).toContain('--x-drawer-footer-border: #203247')
    expect(drawerStyle).toContain('--x-drawer-close-icon: #8da0b8')
    expect(drawerStyle).toContain('--x-drawer-close-icon-hover: #eef4fb')
    expect(drawerStyle).toContain('--x-drawer-close-hover-bg: rgba(148, 163, 184, 0.14)')
    expect(drawerStyle).toContain('--x-drawer-shadow: 0 18px 56px rgba(0, 0, 0, 0.42)')
    wrapper.unmount()
  })

  it('keeps XDrawer theme variable fallback chains in CSS', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(css).toContain('--x-drawer-mask: rgba(18, 28, 45, 0.42)')
    expect(css).toContain('--x-drawer-bg: var(--x-color-surface, #ffffff)')
    expect(css).toContain('--x-drawer-close-hover-bg: var(--x-color-primary-soft, #e0ecff)')
    expect(css).toContain('background: var(--x-drawer-mask, rgba(18, 28, 45, 0.42))')
    expect(css).toContain('background: var(--x-element-bg, var(--x-drawer-bg, var(--x-color-surface, #fff)))')
    expect(css).toContain('color: var(--x-drawer-close-icon, var(--x-color-muted, var(--x-color-text-muted, #606b7d)))')
    expect(css).toContain('--x-drawer-mask: rgba(0, 0, 0, 0.52)')
    expect(css).toContain('--x-drawer-close-hover-bg: rgba(148, 163, 184, 0.14)')
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
