import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { GridItem, GridLayout } from 'vue-grid-layout-v3'

vi.mock('vue-grid-layout-v3', async () => {
  const { defineComponent, h } = await import('vue')

  const GridLayout = defineComponent({
    name: 'GridLayout',
    props: ['layout', 'colNum', 'rowHeight', 'margin', 'isDraggable', 'isResizable', 'autoSize', 'verticalCompact', 'preventCollision'],
    emits: ['layout-updated'],
    setup(_, { slots }) {
      return () => h('div', { class: 'vue-grid-layout' }, slots.default?.())
    }
  })

  const GridItem = defineComponent({
    name: 'GridItem',
    props: ['i', 'x', 'y', 'w', 'h', 'isResizable', 'isDraggable', 'dragAllowFrom'],
    setup(_, { slots }) {
      return () => h('div', { class: 'vue-grid-item' }, slots.default?.())
    }
  })

  return { GridLayout, GridItem, default: { install: vi.fn() } }
})

import {
  XInput,
  XPageBuilder,
  createDefaultPageBuilderSchema,
  pageBuilderWidgets,
  type PageBuilderWidgetDefinition,
  type PageBuilderSchema
} from '../src'

class ResizeObserverMock {
  observe = vi.fn()
  disconnect = vi.fn()
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

function countNodes(nodes: PageBuilderSchema['nodes']): number {
  return nodes.reduce((total, node) => total + 1 + countNodes(node.children ?? []), 0)
}

describe('XPageBuilder', () => {
  it('集成容器与 x.ui 组件注册表', () => {
    const containerWidget = pageBuilderWidgets.find((widget) => widget.type === 'container')

    expect(containerWidget?.acceptsChildren).toBe(true)
    expect(containerWidget?.defaultProps.gap).toBe(0)
    expect(pageBuilderWidgets.some((widget) => widget.type === 'x-button' && widget.component === 'XButton')).toBe(true)
    expect(pageBuilderWidgets.some((widget) => widget.type === 'stat-card')).toBe(false)
    expect(pageBuilderWidgets.some((widget) => widget.type === 'quick-links')).toBe(false)
  })

  it('左侧组件库使用左侧竖排 XTabs 分组', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const tabs = wrapper.get('.x-page-builder__palette-tabs')

    expect(tabs.classes()).toContain('x-tabs--left')
    expect(tabs.classes()).toContain('x-tabs--label-vertical')
    expect(tabs.attributes('style')).toContain('--x-tabs-vertical-width: 38px')
    expect(wrapper.find('[data-test="page-builder-palette-layout"]').exists()).toBe(true)
  })

  it('可以隐藏左右面板扩大编辑区', async () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })
    const root = wrapper.get('.x-page-builder')

    await wrapper.get('[data-test="page-builder-toggle-palette"]').trigger('click')
    expect(root.classes()).toContain('is-palette-hidden')
    expect(wrapper.get('[data-test="page-builder-palette-panel"]').attributes('style')).toContain('display: none')

    await wrapper.get('[data-test="page-builder-toggle-inspector"]').trigger('click')
    expect(root.classes()).toContain('is-inspector-hidden')
    expect(wrapper.get('[data-test="page-builder-inspector-panel"]').attributes('style')).toContain('display: none')

    await wrapper.get('[data-test="page-builder-toggle-palette"]').trigger('click')
    expect(root.classes()).not.toContain('is-palette-hidden')
    expect(wrapper.get('[data-test="page-builder-palette-panel"]').attributes('style') ?? '').not.toContain('display: none')
  })

  it('右侧属性面板使用上部 XTabs 分类', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const tabs = wrapper.get('.x-page-builder__inspector-tabs')

    expect(tabs.classes()).toContain('x-tabs--top')
    expect(tabs.classes()).not.toContain('x-tabs--left')
    const tabItems = tabs.findAll('.x-tabs__item').map((item) => item.text())
    expect(tabItems).not.toContain('JSON')
    expect(wrapper.find('[data-test="page-builder-inspector-canvas"]').exists()).toBe(true)
    expect(tabItems).toContain('特性')
  })

  it('画布组件使用不占位的悬浮操作条', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    expect(wrapper.find('.x-page-builder-node__bar').exists()).toBe(false)
    expect(wrapper.find('.x-page-builder-node__float-tools').exists()).toBe(true)
    expect(wrapper.find('.x-page-builder-node__float-tools [title="复制"]').exists()).toBe(true)
    expect(wrapper.find('.x-page-builder-node__float-tools [title="删除"]').exists()).toBe(true)
  })

  it('容器组件与普通组件使用不同的悬浮条停靠方向', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const nodes = wrapper.findAll('.x-page-builder-node')

    expect(nodes.some((node) => node.classes().includes('is-container'))).toBe(true)
    expect(nodes.some((node) => !node.classes().includes('is-container'))).toBe(true)
  })

  it('容器组件默认内部间距为 0 并在属性面板显示', () => {
    const schema = createDefaultPageBuilderSchema()
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: schema
      }
    })

    expect(schema.nodes[0].props.gap).toBe(0)
    expect(wrapper.get('[data-test="page-builder-inspector-node"]').text()).toContain('内部间距')
  })

  it('容器内部网格不产生横向滚动条', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const containerGrid = wrapper.find('.x-page-builder-node__container-grid')

    expect(containerGrid.exists()).toBe(true)
  })

  it('普通组件 tab 显示四向预览内边距属性', async () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const normalNode = wrapper.findAll('.x-page-builder-node').find((node) => !node.classes().includes('is-container'))
    expect(normalNode).toBeTruthy()
    await normalNode!.trigger('click')

    const nodePanelText = wrapper.get('[data-test="page-builder-inspector-node"]').text()

    expect(nodePanelText).toContain('上内边距')
    expect(nodePanelText).toContain('右内边距')
    expect(nodePanelText).toContain('下内边距')
    expect(nodePanelText).toContain('左内边距')
  })

  it('特性 tab 使用逐项表单控件而不是整块 JSON 编辑器', async () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const normalNode = wrapper.findAll('.x-page-builder-node').find((node) => !node.classes().includes('is-container'))
    expect(normalNode).toBeTruthy()
    await normalNode!.trigger('click')

    const featurePanel = wrapper.get('[data-test="page-builder-inspector-features"]')

    expect(featurePanel.find('.x-json-editor').exists()).toBe(false)
    expect(featurePanel.text()).toContain('样式')
  })

  it('颜色特性使用颜色选择器', () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const featurePanel = wrapper.get('[data-test="page-builder-inspector-features"]')

    expect(featurePanel.find('input[type="color"]').exists()).toBe(true)
  })

  it('画布使用 vue-grid-layout-v3 自动同步让位后的布局', async () => {
    const schema = {
      ...createDefaultPageBuilderSchema(),
      nodes: [
        {
          ...createDefaultPageBuilderSchema().nodes[1],
          layout: { x: 0, y: 0, w: 2, h: 2 }
        }
      ]
    }
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: schema
      }
    })

    wrapper.findComponent(GridLayout).vm.$emit('layout-updated', [{ i: schema.nodes[0].id, x: 1, y: 2, w: 2, h: 2 }])
    await wrapper.vm.$nextTick()

    const updates = wrapper.emitted('update:modelValue')
    const latest = updates?.[updates.length - 1]?.[0] as PageBuilderSchema

    expect(latest.nodes[0].layout.x).toBe(1)
    expect(latest.nodes[0].layout.y).toBe(2)
    expect((wrapper.findComponent(GridItem).props() as Record<string, unknown>).dragAllowFrom).toBe('.x-page-builder-node__float-tools')
    expect((wrapper.findComponent(GridItem).props() as Record<string, unknown>).isResizable).toBe(true)
  })

  it('vue-grid-layout-v3 缩放后会同步组件大小', async () => {
    const schema = {
      ...createDefaultPageBuilderSchema(),
      nodes: [
        {
          ...createDefaultPageBuilderSchema().nodes[1],
          layout: { x: 0, y: 0, w: 2, h: 2 }
        }
      ]
    }
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: schema
      }
    })

    wrapper.findComponent(GridLayout).vm.$emit('layout-updated', [{ i: schema.nodes[0].id, x: 0, y: 0, w: 3, h: 4 }])
    await wrapper.vm.$nextTick()

    const updates = wrapper.emitted('update:modelValue')
    const latest = updates?.[updates.length - 1]?.[0] as PageBuilderSchema

    expect(latest.nodes[0].layout.w).toBe(3)
    expect(latest.nodes[0].layout.h).toBe(4)
  })

  it('点击组件库后输出布局 JSON', async () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: {
          ...createDefaultPageBuilderSchema(),
          nodes: []
        }
      }
    })

    await wrapper.get('[data-test="page-builder-add-x-button"]').trigger('click')

    const updates = wrapper.emitted('update:modelValue')
    const latest = updates?.[updates.length - 1]?.[0] as PageBuilderSchema

    expect(latest.nodes).toHaveLength(1)
    expect(latest.nodes[0].type).toBe('x-button')
    expect(latest.nodes[0].component).toBe('XButton')
  })

  it('支持业务方注入字段组件页签并保留字段绑定信息', async () => {
    const customWidgets: PageBuilderWidgetDefinition[] = [
      {
        type: 'field-input:customers:fullName',
        component: 'XInput',
        category: 'fields',
        label: '客户全称',
        description: 'fullName',
        previewIcon: 'ri-input-field',
        renderer: XInput,
        defaultLayout: { x: 0, y: 0, w: 4, h: 1 },
        defaultProps: {
          modelValue: '',
          placeholder: '客户全称',
          clearable: true,
          size: 'md',
          tableKey: 'customers',
          fieldKey: 'fullName',
          fieldLabel: '客户全称'
        }
      }
    ]
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: {
          ...createDefaultPageBuilderSchema(),
          nodes: []
        },
        customWidgets
      }
    })

    expect(wrapper.find('[data-test="page-builder-palette-fields"]').exists()).toBe(true)
    await wrapper.get('[data-test="page-builder-add-field-input:customers:fullName"]').trigger('click')

    const updates = wrapper.emitted('update:modelValue')
    const latest = updates?.[updates.length - 1]?.[0] as PageBuilderSchema

    expect(latest.nodes[0].type).toBe('field-input:customers:fullName')
    expect(latest.nodes[0].component).toBe('XInput')
    expect(latest.nodes[0].props.tableKey).toBe('customers')
    expect(latest.nodes[0].props.fieldKey).toBe('fullName')
  })

  it('选中容器后新增组件会写入容器 children', async () => {
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: createDefaultPageBuilderSchema()
      }
    })

    const before = countNodes((wrapper.props('modelValue') as PageBuilderSchema).nodes)

    await wrapper.get('[data-test="page-builder-add-x-switch"]').trigger('click')

    const updates = wrapper.emitted('update:modelValue')
    const latest = updates?.[updates.length - 1]?.[0] as PageBuilderSchema
    const container = latest.nodes[0]

    expect(countNodes(latest.nodes)).toBe(before + 1)
    expect(container.type).toBe('container')
    expect(container.children?.some((node) => node.type === 'x-switch')).toBe(true)
  })

  it('只读模式不会新增节点', async () => {
    const schema = {
      ...createDefaultPageBuilderSchema(),
      nodes: []
    }
    const wrapper = mount(XPageBuilder, {
      props: {
        modelValue: schema,
        readonly: true
      }
    })

    await wrapper.get('[data-test="page-builder-add-x-button"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
