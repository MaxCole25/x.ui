import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { defineComponent, h, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
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

const ThirdPartyIcon = defineComponent({
  name: 'ThirdPartyIcon',
  setup() {
    return () =>
      h('svg', { class: 'third-party-nav-icon', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M4 12h16M12 4v16' })
      ])
  }
})

const CustomSubmenuArrowIcon = defineComponent({
  name: 'CustomSubmenuArrowIcon',
  setup() {
    return () =>
      h('svg', { class: 'custom-submenu-arrow-icon', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M8 5l8 7-8 7' })
      ])
  }
})

function findTriggerByText(wrapper: ReturnType<typeof mount>, text: string) {
  const trigger = wrapper.findAll('.x-nav-menu-item__trigger').find((item) => item.text().includes(text))

  if (!trigger) {
    throw new Error(`找不到菜单触发器：${text}`)
  }

  return trigger
}

function findMenuItemByTriggerText(wrapper: ReturnType<typeof mount>, text: string) {
  const item = wrapper.findAll('.x-nav-menu-item').find((menuItem) => {
    const trigger = menuItem.element.querySelector(':scope > .x-nav-menu-item__trigger')
    return trigger?.textContent?.includes(text) || trigger?.getAttribute('title')?.includes(text)
  })

  if (!item) {
    throw new Error(`找不到菜单项：${text}`)
  }

  return item
}

function findBodyMenuItemByTriggerText(text: string) {
  const item = Array.from(document.body.querySelectorAll<HTMLElement>('.x-nav-menu-item')).find((menuItem) => {
    const trigger = menuItem.querySelector(':scope > .x-nav-menu-item__trigger')
    return trigger?.textContent?.includes(text) || trigger?.getAttribute('title')?.includes(text)
  })

  if (!item) {
    throw new Error(`找不到 body 菜单项：${text}`)
  }

  return item
}

function findBodySubmenuByText(text: string) {
  const submenu = Array.from(document.body.querySelectorAll<HTMLElement>('.x-nav-menu-submenu')).find((item) =>
    item.textContent?.includes(text)
  )

  if (!submenu) {
    throw new Error(`找不到 body 子菜单：${text}`)
  }

  return submenu
}

function dispatchMouseEvent(element: HTMLElement, type: string, relatedTarget?: HTMLElement) {
  element.dispatchEvent(new MouseEvent(type, { cancelable: true, relatedTarget }))
}

function navMenuCss() {
  return readFileSync('src/styles/index.css', 'utf8').replace(/\r\n/g, '\n')
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

  it('renders string icons with XIcon and keeps label fallback without icon', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: [
          { key: 'dashboard', label: '控制台', icon: 'dashboard' },
          { key: 'settings', label: '系统设置', icon: 'ri-settings-3-line' },
          { key: 'plain', label: '无图标' }
        ]
      }
    })

    expect(wrapper.find('.x-nav-menu-item__icon .x-icon.ri-dashboard-line').exists()).toBe(true)
    expect(wrapper.find('.x-nav-menu-item__icon .x-icon.ri-settings-3-line').exists()).toBe(true)
    expect(wrapper.findAll('.x-nav-menu-item__icon')[2].text()).toBe('无')
  })

  it('renders Vue component icons for third-party icon libraries', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items: [{ key: 'external', label: '第三方图标', icon: ThirdPartyIcon }]
      }
    })

    expect(wrapper.find('.x-nav-menu-item__icon .third-party-nav-icon').exists()).toBe(true)
    expect(wrapper.find('.x-nav-menu-item__icon .x-icon').exists()).toBe(false)
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

  it('hides submenu arrows when showSubmenuArrow is false', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        showSubmenuArrow: false
      }
    })

    expect(wrapper.find('.x-nav-menu-item__arrow').exists()).toBe(false)
  })

  it('renders custom string submenu arrow icon', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        submenuArrowIcon: 'ri-arrow-right-s-line'
      }
    })

    expect(wrapper.find('.x-nav-menu-item__arrow .x-icon.ri-arrow-right-s-line').exists()).toBe(true)
  })

  it('renders Vue component submenu arrow icon', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        submenuArrowIcon: CustomSubmenuArrowIcon
      }
    })

    expect(wrapper.find('.x-nav-menu-item__arrow .custom-submenu-arrow-icon').exists()).toBe(true)
    expect(wrapper.find('.x-nav-menu-item__arrow .x-icon').exists()).toBe(false)
  })

  it('exposes item and submenu item radius variables', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        itemRadius: 12,
        submenuItemRadius: 5
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-item-radius: 12px')
    expect(wrapper.attributes('style')).toContain('--x-nav-menu-submenu-item-radius: 5px')
  })

  it('uses default vertical item gap variable', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-item-gap: 4px')
  })

  it('exposes numeric item gap variable as px length', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        itemGap: 10
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-item-gap: 10px')
  })

  it('exposes string item gap variable as provided CSS length', () => {
    const wrapper = mount(XNavMenu, {
      props: {
        items,
        itemGap: '0.75rem'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-nav-menu-item-gap: 0.75rem')
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

  it('falls back to activeTextColor for teleported submenu active text color', async () => {
    const wrapper = mount(XNavMenu, {
      attachTo: document.body,
      props: {
        items,
        activeKey: 'user',
        mode: 'horizontal',
        appendToBody: true,
        activeTextColor: '#ffffff',
        activeBgColor: '#2563eb'
      }
    })

    try {
      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()

      const submenu = findBodySubmenuByText('用户管理')
      const activeItem = findBodyMenuItemByTriggerText('用户管理')

      expect(activeItem.classList.contains('is-active')).toBe(true)
      expect(submenu.getAttribute('style')).toContain('--x-nav-menu-submenu-active-text-color: #ffffff')
      expect(submenu.getAttribute('style')).toContain('--x-nav-menu-active-bg-color: #2563eb')
      expect(navMenuCss()).toContain(
        '.x-nav-menu-submenu.is-teleported .x-nav-menu-item.is-active > .x-nav-menu-item__trigger {\n  color: var(--x-nav-menu-submenu-active-text-color, var(--x-nav-menu-active-text-color));\n}'
      )
    } finally {
      wrapper.unmount()
      document.body.innerHTML = ''
    }
  })

  it('prioritizes submenuActiveTextColor for teleported submenu active text color', async () => {
    const wrapper = mount(XNavMenu, {
      attachTo: document.body,
      props: {
        items,
        activeKey: 'user',
        mode: 'horizontal',
        appendToBody: true,
        activeTextColor: '#ffffff',
        submenuActiveTextColor: '#111827'
      }
    })

    try {
      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()

      const submenu = findBodySubmenuByText('用户管理')
      const activeItem = findBodyMenuItemByTriggerText('用户管理')

      expect(activeItem.classList.contains('is-active')).toBe(true)
      expect(submenu.getAttribute('style')).toContain('--x-nav-menu-active-text-color: #ffffff')
      expect(submenu.getAttribute('style')).toContain('--x-nav-menu-submenu-active-text-color: #111827')
    } finally {
      wrapper.unmount()
      document.body.innerHTML = ''
    }
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

  it('keeps horizontal nested popup submenu alive when pointer enters child submenu', async () => {
    vi.useFakeTimers()

    try {
      const wrapper = mount(XNavMenu, {
        props: {
          items,
          mode: 'horizontal'
        }
      })

      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()
      await findMenuItemByTriggerText(wrapper, '角色管理').trigger('mouseenter')
      await nextTick()

      const roleItem = findMenuItemByTriggerText(wrapper, '角色管理')
      const roleSubmenu = roleItem.find('.x-nav-menu-submenu')

      expect(wrapper.text()).toContain('角色列表')

      await roleItem.trigger('mouseleave')
      await roleSubmenu.trigger('mouseenter')
      await vi.advanceTimersByTimeAsync(200)
      await nextTick()

      expect(wrapper.text()).toContain('角色列表')
      expect(findMenuItemByTriggerText(wrapper, '角色管理').classes()).toContain('is-open')
    } finally {
      vi.useRealTimers()
    }
  })

  it('keeps collapsed vertical nested popup submenu alive when pointer enters child submenu', async () => {
    vi.useFakeTimers()

    try {
      const wrapper = mount(XNavMenu, {
        props: {
          items,
          mode: 'vertical',
          collapsed: true,
          allowCollapse: true
        }
      })

      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()
      await findMenuItemByTriggerText(wrapper, '角色管理').trigger('mouseenter')
      await nextTick()

      const roleItem = findMenuItemByTriggerText(wrapper, '角色管理')
      const roleSubmenu = roleItem.find('.x-nav-menu-submenu')

      expect(wrapper.text()).toContain('角色列表')

      await roleItem.trigger('mouseleave')
      await roleSubmenu.trigger('mouseenter')
      await vi.advanceTimersByTimeAsync(200)
      await nextTick()

      expect(wrapper.text()).toContain('角色列表')
      expect(findMenuItemByTriggerText(wrapper, '角色管理').classes()).toContain('is-open')
    } finally {
      vi.useRealTimers()
    }
  })

  it('keeps teleported collapsed vertical nested popup submenu alive while pointer crosses the gap', async () => {
    vi.useFakeTimers()

    const wrapper = mount(XNavMenu, {
      attachTo: document.body,
      props: {
        items,
        mode: 'vertical',
        collapsed: true,
        allowCollapse: true,
        appendToBody: true
      }
    })

    try {
      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()

      const roleItem = findBodyMenuItemByTriggerText('角色管理')
      dispatchMouseEvent(roleItem, 'mouseenter')
      await nextTick()

      const systemSubmenu = findBodySubmenuByText('角色管理')
      const roleSubmenu = findBodySubmenuByText('角色列表')

      expect(document.body.textContent).toContain('角色列表')

      dispatchMouseEvent(roleSubmenu, 'mouseenter')
      dispatchMouseEvent(systemSubmenu, 'mouseleave', roleSubmenu)
      await vi.advanceTimersByTimeAsync(500)
      await nextTick()

      expect(document.body.textContent).toContain('角色列表')

      dispatchMouseEvent(roleSubmenu, 'mouseleave')
      await vi.advanceTimersByTimeAsync(500)
      await nextTick()

      expect(document.body.textContent).not.toContain('角色列表')
    } finally {
      wrapper.unmount()
      document.body.innerHTML = ''
      vi.useRealTimers()
    }
  })

  it('closes teleported collapsed vertical popup path after selecting a leaf item', async () => {
    const wrapper = mount(XNavMenu, {
      attachTo: document.body,
      props: {
        items,
        mode: 'vertical',
        collapsed: true,
        allowCollapse: true,
        appendToBody: true
      }
    })

    try {
      await findMenuItemByTriggerText(wrapper, '系统管理').trigger('mouseenter')
      await nextTick()

      dispatchMouseEvent(findBodyMenuItemByTriggerText('角色管理'), 'mouseenter')
      await nextTick()

      expect(document.body.textContent).toContain('角色列表')

      findBodyMenuItemByTriggerText('角色列表')
        .querySelector<HTMLElement>(':scope > .x-nav-menu-item__trigger')
        ?.click()
      await nextTick()

      const selectEvents = wrapper.emitted('select') ?? []
      expect(selectEvents[selectEvents.length - 1]).toEqual(['role-list'])
      expect(document.body.textContent).not.toContain('角色列表')
      expect(document.body.textContent).not.toContain('角色管理')
    } finally {
      wrapper.unmount()
      document.body.innerHTML = ''
    }
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
