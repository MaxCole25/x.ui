import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XNavMenu } from '../src'
import type { NavMenuItem } from '../src'

const items: NavMenuItem[] = [
  { key: 'dashboard', label: '控制台' },
  {
    key: 'system',
    label: '系统管理',
    children: [
      { key: 'user', label: '用户管理' },
      { key: 'role', label: '角色管理' }
    ]
  }
]

describe('XNavMenu', () => {
  it('renders root items', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items
      }
    })

    expect(wrapper.text()).toContain('控制台')
    expect(wrapper.text()).toContain('系统管理')
  })

  it('emits select when clicking leaf item', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items
      }
    })

    await wrapper.findAll('.x-nav-menu-item__trigger')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual(['dashboard'])
  })

  it('applies mode and collapsed classes', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        mode: 'vertical',
        collapsed: true,
        allowCollapse: true
      }
    })

    expect(wrapper.classes()).toContain('x-nav-menu--vertical')
    expect(wrapper.classes()).toContain('is-collapsed')
  })

  it('exposes text and active color variables', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        textColor: '#334155',
        activeTextColor: '#f8fafc',
        activeBgColor: '#0f766e'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-text-color: #334155')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-active-text-color: #f8fafc')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-active-bg-color: #0f766e')
  })
})
