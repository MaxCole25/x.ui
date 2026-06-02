import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { XIcon } from '../src'
import { remixIconNames } from '../src/components/basic-components/icon/src/iconNames'

describe('XIcon', () => {
  it('renders semantic alias as remix icon class', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'add'
      }
    })

    expect(wrapper.classes()).toContain('x-icon')
    expect(wrapper.classes()).toContain('ri-add-line')
  })

  it('uses fill variant when the icon supports it', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'home',
        variant: 'fill'
      }
    })

    expect(wrapper.classes()).toContain('ri-home-fill')
  })

  it('keeps full remix icon names', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'settings-3-line'
      }
    })

    expect(wrapper.classes()).toContain('ri-settings-3-line')
  })

  it('maps icon size, color and spin state', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'loading',
        iconSize: 24,
        color: '#1264f4',
        spin: true
      }
    })

    const style = wrapper.attributes('style')

    expect(wrapper.classes()).toContain('is-spin')
    expect(style).toContain('--x-icon-size: 24px')
    expect(style).toContain('color: rgb(18, 100, 244)')
  })

  it('keeps default vertical position unless offsetY is provided', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'information-line'
      }
    })

    expect(wrapper.attributes('style') ?? '').not.toContain('--x-icon-offset-y')
  })

  it('maps kebab-case offset-y to the icon vertical offset variable', () => {
    const wrapper = mount({
      components: { XIcon },
      template: '<XIcon name="information-line" color="red" icon-size="14px" offset-y="-1px" />'
    })

    const icon = wrapper.find('.x-icon')
    const style = icon.attributes('style')

    expect(style).toContain('--x-icon-size: 14px')
    expect(style).toContain('--x-icon-offset-y: -1px')
    expect(style).toContain('color: red')
  })

  it('uses aria-hidden for decorative icons', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'search'
      }
    })

    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('uses title as accessible label', () => {
    const wrapper = mount(XIcon, {
      props: {
        name: 'notification-3',
        title: '通知'
      }
    })

    expect(wrapper.attributes('aria-label')).toBe('通知')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-hidden')).toBeUndefined()
  })

  it('exports the full icon name list', () => {
    expect(remixIconNames).toContain('home-line')
    expect(remixIconNames.length).toBeGreaterThan(3000)
  })

  it('includes remix icon font styles from the main stylesheet', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(css).toContain('@import "remixicon/fonts/remixicon.css"')
    expect(css).toContain('vertical-align: -0.125em')
    expect(css).toContain('top: var(--x-icon-offset-y, 0)')
  })
})
