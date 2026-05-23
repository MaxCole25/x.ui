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
      {
        key: 'role',
        label: '角色管理',
        children: [{ key: 'role-list', label: '角色列表' }]
      }
    ]
  }
]

const businessItems: NavMenuItem[] = [
  {
    key: '/business',
    label: '商务部',
    children: [
      { key: '/business/contracts', label: '合同管理' },
      { key: '/business/orders', label: '订单管理' }
    ]
  },
  {
    key: '/settings',
    label: '系统设置',
    children: [
      {
        key: '/security',
        label: '权限管理',
        children: [
          { key: '/security/roles', label: '角色管理' },
          { key: '/security/users', label: '用户管理' }
        ]
      },
      { key: '/settings/profile', label: '资料设置' }
    ]
  }
]

function findTriggerByText(wrapper: ReturnType<typeof mount>, text: string) {
  const trigger = wrapper.findAll('.x-nav-menu-item__trigger').find((item) => item.text().includes(text))

  if (!trigger) {
    throw new Error(`找不到菜单触发器：${text}`)
  }

  return trigger
}

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

  it('applies hidden class for sidebar hiding', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        hidden: true
      }
    })

    expect(wrapper.classes()).toContain('is-hidden')
    expect(wrapper.text()).toContain('控制台')
  })

  it('uses arrow drop icons for submenu state', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items
      }
    })

    expect(wrapper.find('.x-nav-menu-item__arrow i').classes()).toContain('ri-arrow-drop-down-fill')

    await wrapper.findAll('.x-nav-menu-item__trigger')[1].trigger('click')

    expect(wrapper.find('.x-nav-menu-item__arrow i').classes()).toContain('ri-arrow-drop-up-fill')
  })

  it('uses cascading popup submenus when vertical menu is collapsed', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        mode: 'vertical',
        collapsed: true,
        allowCollapse: true
      }
    })

    expect(wrapper.findAll('.x-nav-menu-item__label').map((label) => label.text())).not.toContain('系统管理')

    await wrapper.findAll('.x-nav-menu-item__trigger')[1].trigger('click')

    const popupItems = wrapper.findAll('.x-nav-menu-item.is-popup-submenu')
    expect(popupItems).toHaveLength(2)
    expect(wrapper.find('.x-nav-menu-submenu').exists()).toBe(true)
    expect(wrapper.text()).toContain('用户管理')
    expect(wrapper.find('.x-nav-menu-item__arrow i').classes()).toContain('ri-arrow-right-s-line')

    await wrapper.findAll('.x-nav-menu-item__trigger')[3].trigger('click')

    expect(wrapper.text()).toContain('角色列表')
  })

  it('exposes text active color and font variables', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        textColor: '#334155',
        activeTextColor: '#f8fafc',
        activeBgColor: '#0f766e',
        fontSize: 16,
        fontWeight: 500,
        activeFontWeight: 700,
        fontFamily: 'Arial, sans-serif'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-text-color: #334155')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-active-text-color: #f8fafc')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-active-bg-color: #0f766e')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-font-size: 16px')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-font-weight: 500')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-active-font-weight: 700')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-font-family: Arial, sans-serif')
  })

  it('applies vertical scrollable class and max height variable', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        mode: 'vertical',
        scrollable: true,
        maxHeight: 300
      }
    })

    expect(wrapper.classes()).toContain('is-scrollable')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-max-height: 300px')
  })

  it('keeps horizontal scrollable menu visible for popups', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        mode: 'horizontal',
        scrollable: true,
        maxHeight: '20rem'
      }
    })

    expect(wrapper.classes()).toContain('x-nav-menu--horizontal')
    expect(wrapper.classes()).toContain('is-scrollable')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-max-height: 20rem')
  })

  it('collapses sibling submenus when accordion is enabled', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems,
        accordion: true
      }
    })

    await findTriggerByText(wrapper, '商务部').trigger('click')

    expect(wrapper.text()).toContain('合同管理')
    const firstOpenChangeEvents = wrapper.emitted('open-change') ?? []
    expect(firstOpenChangeEvents[firstOpenChangeEvents.length - 1]).toEqual([['/business']])

    await findTriggerByText(wrapper, '系统设置').trigger('click')

    expect(wrapper.text()).not.toContain('合同管理')
    expect(wrapper.text()).toContain('权限管理')
    const secondOpenChangeEvents = wrapper.emitted('open-change') ?? []
    expect(secondOpenChangeEvents[secondOpenChangeEvents.length - 1]).toEqual([['/settings']])
  })

  it('keeps multiple sibling submenus open when accordion is disabled', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems
      }
    })

    await findTriggerByText(wrapper, '商务部').trigger('click')
    await findTriggerByText(wrapper, '系统设置').trigger('click')

    expect(wrapper.text()).toContain('合同管理')
    expect(wrapper.text()).toContain('权限管理')
  })

  it('opens parent path for active key by default', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems,
        activeKey: '/security/roles',
        accordion: true
      }
    })

    expect(wrapper.text()).toContain('系统设置')
    expect(wrapper.text()).toContain('权限管理')
    expect(wrapper.text()).toContain('角色管理')
    expect(wrapper.findAll('.x-nav-menu-item.is-open')).toHaveLength(2)
  })

  it('marks parent menus when a child item is active', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems,
        activeKey: '/security/roles'
      }
    })

    const ancestorItems = wrapper.findAll('.x-nav-menu-item.is-active-ancestor')
    expect(ancestorItems).toHaveLength(2)
    expect(ancestorItems[0].text()).toContain('系统设置')
    expect(ancestorItems[1].text()).toContain('权限管理')
    expect(wrapper.findAll('.x-nav-menu-item.is-active')).toHaveLength(1)
  })

  it('opens parent path when active key changes', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems,
        accordion: true
      }
    })

    expect(wrapper.text()).not.toContain('角色管理')

    await wrapper.setProps({ activeKey: '/security/roles' })

    expect(wrapper.text()).toContain('权限管理')
    expect(wrapper.text()).toContain('角色管理')
    const openChangeEvents = wrapper.emitted('open-change') ?? []
    expect(openChangeEvents[openChangeEvents.length - 1]).toEqual([['/settings', '/security']])
  })

  it('supports controlled open keys updates', async () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: businessItems,
        openKeys: []
      }
    })

    await findTriggerByText(wrapper, '商务部').trigger('click')

    expect(wrapper.emitted('update:openKeys')?.[0]).toEqual([['/business']])
    expect(wrapper.text()).not.toContain('合同管理')

    await wrapper.setProps({ openKeys: ['/business'] })

    expect(wrapper.text()).toContain('合同管理')
  })
})
