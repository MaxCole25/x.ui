import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { XTree } from '../src'
import type { TreeNodeData } from '../src'

afterEach(() => {
  document.body.innerHTML = ''
})

function findMenuItem(label: string) {
  return Array.from(document.body.querySelectorAll('.x-tree-menu__item')).find((item) => item.textContent?.includes(label)) as HTMLElement | undefined
}

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
        hoverBackgroundColor: '#1e293b',
        activeBackgroundColor: '#0f172a',
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

  it('uses full background color prop names', () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', label: '节点A' }],
        hoverBackgroundColor: '#dbeafe',
        activeBackgroundColor: '#bfdbfe',
      }
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('--x-tree-hover-bg-color: #dbeafe')
    expect(style).toContain('--x-tree-active-bg-color: #bfdbfe')
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

  it('clears drag drop indicators after drag leave and drag end', async () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [
          { id: '1', label: '节点A' },
          { id: '2', label: '节点B' },
          { id: '3', label: '节点C' }
        ]
      },
      attachTo: document.body
    })

    const rows = wrapper.findAll('.x-tree-node__row')
    await rows[0].trigger('dragstart')

    await rows[1].trigger('dragover', { clientY: 0 })
    expect(rows[1].classes()).toContain('is-drop-before')

    await rows[1].trigger('dragleave', { relatedTarget: document.body })
    expect(rows[1].classes()).not.toContain('is-drop-before')
    expect(rows[1].classes()).not.toContain('is-drop-after')
    expect(rows[1].classes()).not.toContain('is-drop-inner')

    await rows[1].trigger('dragover', { clientY: 1 })
    expect(rows[1].classes()).toContain('is-drop-after')

    await rows[0].trigger('dragend')
    wrapper.findAll('.x-tree-node__row').forEach((row) => {
      expect(row.classes()).not.toContain('is-drop-before')
      expect(row.classes()).not.toContain('is-drop-after')
      expect(row.classes()).not.toContain('is-drop-inner')
    })
  })

  it('shows only root create, node create and delete in the default context menu', async () => {
    const wrapper = mount(XTree, {
      props: {
        treeData: [{ id: '1', rawId: 1, label: '节点A' }]
      },
      attachTo: document.body
    })

    await wrapper.find('.x-tree-node__row').trigger('contextmenu', { clientX: 12, clientY: 24 })

    const menuText = document.body.querySelector('.x-tree-menu')?.textContent ?? ''
    expect(menuText).toContain('增加根节点')
    expect(menuText).toContain('新建节点')
    expect(menuText).toContain('删除节点')
    expect(menuText).not.toContain('打开')
    expect(menuText).not.toContain('节点迁移')
    expect(menuText).not.toContain('管理成员')
  })

  it('creates root and child nodes with default context menu methods', async () => {
    const treeData: TreeNodeData[] = [{ id: '1', rawId: 1, label: '节点A' }]
    const wrapper = mount(XTree, {
      props: { treeData },
      attachTo: document.body
    })

    await wrapper.find('.x-tree-node__row').trigger('contextmenu')
    findMenuItem('增加根节点')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(treeData).toHaveLength(2)
    expect(treeData[1].label).toBe('新建节点')
    expect(treeData[1].isEditing).toBe(true)

    await wrapper.find('.x-tree-node__row').trigger('contextmenu')
    findMenuItem('新建节点')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(treeData[0].children).toHaveLength(1)
    expect(treeData[0].children?.[0].label).toBe('新建节点')
    expect(treeData[0].children?.[0].isEditing).toBe(true)
  })

  it('deletes nodes with the default context menu method', async () => {
    const treeData: TreeNodeData[] = [
      {
        id: '1',
        rawId: 1,
        label: '节点A',
        children: [{ id: '1-1', rawId: 11, label: '节点A-1' }]
      }
    ]
    const wrapper = mount(XTree, {
      props: { treeData },
      attachTo: document.body
    })

    await wrapper.findAll('.x-tree-node__row')[1].trigger('contextmenu')
    findMenuItem('删除节点')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(treeData[0].children).toHaveLength(0)
  })

  it('lets callers customize context menu items and the three default action methods', async () => {
    const treeData: TreeNodeData[] = [{ id: '1', rawId: 1, label: '节点A' }]
    const rootNode: TreeNodeData = { id: 'root-custom', label: '业务根节点' }
    const childNode: TreeNodeData = { id: 'child-custom', label: '业务节点' }
    const createRootNode = vi.fn((nodes: TreeNodeData[]) => {
      nodes.push(rootNode)
      return rootNode
    })
    const createNode = vi.fn((node: TreeNodeData) => {
      node.children = [childNode]
      return childNode
    })
    const deleteNode = vi.fn()
    const wrapper = mount(XTree, {
      props: {
        treeData,
        contextMenuItems: [
          { action: 'new-root', label: '添加根' },
          { action: 'new-child', label: '添加子节点' },
          { action: 'delete-node', label: '移除', tone: 'danger' }
        ],
        createRootNode,
        createNode,
        deleteNode
      },
      attachTo: document.body
    })

    await wrapper.find('.x-tree-node__row').trigger('contextmenu')
    expect(document.body.querySelector('.x-tree-menu')?.textContent).toContain('添加根')
    findMenuItem('添加根')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(createRootNode).toHaveBeenCalledWith(treeData)
    expect(treeData[1]).toBe(rootNode)

    await wrapper.find('.x-tree-node__row').trigger('contextmenu')
    findMenuItem('添加子节点')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(createNode).toHaveBeenCalledWith(treeData[0])
    expect(treeData[0].children?.[0]).toBe(childNode)

    await wrapper.find('.x-tree-node__row').trigger('contextmenu')
    findMenuItem('移除')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(deleteNode).toHaveBeenCalledWith(treeData[0], treeData)
    expect(treeData[0].label).toBe('节点A')
  })
})
