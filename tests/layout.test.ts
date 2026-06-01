import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { XLayout } from '../src'

describe('XLayout', () => {
  it('renders all regions by slots', () => {
    const wrapper = mount(XLayout, {
      slots: {
        topbar: 'Top',
        sidebar: 'Side',
        default: 'Content',
        footer: 'Foot'
      }
    })

    expect(wrapper.find('.x-layout__topbar').text()).toContain('Top')
    expect(wrapper.find('.x-layout__sidebar').text()).toContain('Side')
    expect(wrapper.find('.x-layout__content').text()).toContain('Content')
    expect(wrapper.find('.x-layout__footer').text()).toContain('Foot')
  })

  it('uses documented defaults when props are omitted', () => {
    const wrapper = mount(XLayout)
    const style = wrapper.attributes('style')

    expect(wrapper.classes()).toContain('x-layout--top-sidebar')
    expect(wrapper.classes()).toContain('is-fill-height')
    expect(style).toContain('--x-layout-sidebar-width: 288px')
    expect(style).toContain('--x-layout-gap: 0px')
    expect(style).toContain('--x-layout-topbar-height: 55px')
    expect(style).toContain('--x-layout-footer-height: 30px')
    expect(style).toContain('--x-layout-topbar-bg: #1E6B73')
    expect(style).toContain('--x-layout-sidebar-bg: #185A61')
    expect(style).toContain('--x-layout-content-bg: transparent')
    expect(style).toContain('--x-layout-footer-bg: #124A50')
    expect(style).toContain('--x-layout-topbar-color: #F9F9F9')
    expect(style).toContain('--x-layout-topbar-radius: 0px')
    expect(style).toContain('--x-layout-topbar-border: none')
    expect(style).toContain('--x-layout-footer-border: none')
    expect(style).toContain('--x-layout-sidebar-padding: 12px')
    expect(style).not.toContain('--x-layout-content-border')
  })

  it('applies mode class and style variables', () => {
    const wrapper = mount(XLayout, {
      props: {
        mode: 'sidebar-top',
        sidebarWidth: 320,
        gap: 12
      }
    })

    expect(wrapper.classes()).toContain('x-layout--sidebar-top')
    expect(wrapper.attributes('style')).toContain('--x-layout-sidebar-width: 320px')
    expect(wrapper.attributes('style')).toContain('--x-layout-gap: 12px')
  })

  it('can turn off full height class', () => {
    const wrapper = mount(XLayout, {
      props: {
        fullHeight: false
      }
    })

    expect(wrapper.classes()).not.toContain('is-fill-height')
  })

  it('keeps fullHeight false from applying fill height class', () => {
    const wrapper = mount(XLayout, {
      props: {
        fullHeight: false
      }
    })

    expect(wrapper.classes()).not.toContain('is-fill-height')
  })

  it('provides viewport min-height fallback for fill height layout', () => {
    const style = readFileSync('src/styles/index.css', 'utf-8')

    expect(style).toContain('.x-layout.is-fill-height')
    expect(style).toContain('min-height: 100vh')
    expect(style).toContain('--x-layout-content-bg: transparent')
  })

  it('sets documented region padding for shell slot regions', () => {
    const style = readFileSync('src/styles/index.css', 'utf-8').replace(/\r\n/g, '\n')

    for (const selector of ['topbar', 'footer']) {
      const rule = style.match(new RegExp(`\\.x-layout__${selector} \\{[\\s\\S]*?grid-area: ${selector};[\\s\\S]*?\\}`))?.[0] ?? ''

      expect(rule).toContain('padding-left: 12px')
      expect(rule).toContain('padding-right: 12px')
    }

    const sidebarRule = style.match(/\.x-layout__sidebar \{[\s\S]*?\}/)?.[0] ?? ''
    expect(sidebarRule).toContain('padding: var(--x-layout-sidebar-padding)')
  })

  it('renders footerBorder on the footer top edge', () => {
    const style = readFileSync('src/styles/index.css', 'utf-8').replace(/\r\n/g, '\n')
    const footerRule = [...style.matchAll(/\.x-layout__footer \{[\s\S]*?\}/g)]
      .map((match) => match[0])
      .find((rule) => rule.includes('grid-area: footer')) ?? ''

    expect(footerRule).toContain('border-top: var(--x-layout-footer-border)')
    expect(footerRule).not.toContain('border-bottom: var(--x-layout-footer-border)')
  })

  it('applies custom region colors, edge borders and heights', () => {
    const wrapper = mount(XLayout, {
      props: {
        topbarHeight: 64,
        footerHeight: '2.5rem',
        topbarBackgroundColor: '#123456',
        topbarColor: '#ffffff',
        topbarRadius: 6,
        topbarBorder: '1px solid #ffffff',
        sidebarBorder: '1px solid #0f172a',
        contentBackgroundColor: '#f8fafc',
        contentColor: '#102a43',
        contentRadius: '12px',
        footerBorder: '1px solid #94a3b8'
      }
    })
    const style = wrapper.attributes('style')

    expect(style).toContain('--x-layout-topbar-height: 64px')
    expect(style).toContain('--x-layout-footer-height: 2.5rem')
    expect(style).toContain('--x-layout-topbar-bg: #123456')
    expect(style).toContain('--x-layout-topbar-color: #ffffff')
    expect(style).toContain('--x-layout-topbar-radius: 6px')
    expect(style).toContain('--x-layout-topbar-border: 1px solid #ffffff')
    expect(style).toContain('--x-layout-sidebar-border: 1px solid #0f172a')
    expect(style).toContain('--x-layout-content-bg: #f8fafc')
    expect(style).toContain('--x-layout-content-color: #102a43')
    expect(style).toContain('--x-layout-content-radius: 12px')
    expect(style).toContain('--x-layout-footer-border: 1px solid #94a3b8')
    expect(style).not.toContain('--x-layout-content-border')
  })

  it('uses region radius props', () => {
    const wrapper = mount(XLayout, {
      props: {
        topbarRadius: 4,
        sidebarRadius: 5,
        contentRadius: 6,
        footerRadius: 7
      }
    })
    const style = wrapper.attributes('style')

    expect(style).toContain('--x-layout-topbar-radius: 4px')
    expect(style).toContain('--x-layout-sidebar-radius: 5px')
    expect(style).toContain('--x-layout-content-radius: 6px')
    expect(style).toContain('--x-layout-footer-radius: 7px')
  })

  it('hides sidebar region in top-only mode', () => {
    const wrapper = mount(XLayout, {
      props: {
        mode: 'top-only'
      },
      slots: {
        sidebar: 'Side'
      }
    })

    expect(wrapper.find('.x-layout__sidebar').exists()).toBe(false)
  })

  it('uses collapsed width while sidebarCollapsed is true', () => {
    const wrapper = mount(XLayout, {
      props: {
        sidebarWidth: 320,
        sidebarCollapsedWidth: 96,
        sidebarCollapsed: true
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-layout-sidebar-width: 96px')
  })

  it('supports custom sidebar padding', () => {
    const wrapper = mount(XLayout, {
      props: {
        sidebarPadding: '8px 12px 10px 6px'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-layout-sidebar-padding: 8px 12px 10px 6px')
  })
})
