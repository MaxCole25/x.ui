import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XTree } from '../src'

describe('XTree', () => {
  it('renders node labels', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A' }]
      }
    })
    expect(wrapper.text()).toContain('节点A')
  })

  it('renders custom remix icon from node data', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A', icon: 'ri-table-line' }]
      }
    })

    expect(wrapper.find('.x-tree-node__icon .ri-table-line').exists()).toBe(true)
  })

  it('resolves custom icon from nodeIcon prop', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A', icon: 'ri-table-line' }],
        nodeIcon: () => 'ri-file-list-3-line'
      }
    })

    expect(wrapper.find('.x-tree-node__icon .ri-file-list-3-line').exists()).toBe(true)
    expect(wrapper.find('.x-tree-node__icon .ri-table-line').exists()).toBe(false)
  })

  it('exposes color props as css variables', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A' }],
        currentTreeKey: '1',
        textColor: '#f8fafc',
        mutedColor: '#94a3b8',
        hoverBgColor: '#1e293b',
        activeBgColor: '#0f172a',
        activeTextColor: '#ffffff',
        activeIconColor: '#38bdf8',
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--x-tree-text-color: #f8fafc')
    expect(style).toContain('--x-tree-muted-color: #94a3b8')
    expect(style).toContain('--x-tree-hover-bg-color: #1e293b')
    expect(style).toContain('--x-tree-active-bg-color: #0f172a')
    expect(style).toContain('--x-tree-active-text-color: #ffffff')
    expect(style).toContain('--x-tree-active-icon-color: #38bdf8')
  })

  it('maps size prop to tree css variables', () => {
    const wrapper = mount(XTree, {
      props: {
        size: 'lg',
        treeData: [{ id: '1', label: '节点A' }],
      }
    })

    const style = wrapper.attributes('style')
    expect(wrapper.classes()).toContain('x-tree--lg')
    expect(style).toContain('--x-tree-row-height: 42px')
    expect(style).toContain('--x-tree-font-size: 14px')
    expect(style).toContain('--x-tree-icon-size: 16px')
  })
})
