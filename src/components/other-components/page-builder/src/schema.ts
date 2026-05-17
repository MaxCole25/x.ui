import { getPageBuilderWidget } from './registry'
import type { PageBuilderNodeSchema, PageBuilderSchema, PageBuilderWidgetDefinition } from './types'

function createId(prefix = 'node') {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export function clonePageBuilderSchema<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function createPageBuilderNode(
  type: string,
  partial: Partial<PageBuilderNodeSchema> = {},
  widgets: readonly PageBuilderWidgetDefinition[] = []
): PageBuilderNodeSchema {
  const widget = widgets.find((item) => item.type === type) ?? getPageBuilderWidget(type) ?? getPageBuilderWidget('container')

  if (!widget) {
    throw new Error(`Unknown page builder widget: ${type}`)
  }

  return {
    id: partial.id ?? createId(widget.type === 'container' ? 'container' : 'node'),
    type: widget.type,
    component: widget.component,
    label: partial.label ?? widget.label,
    layout: {
      ...widget.defaultLayout,
      ...partial.layout
    },
    props: clonePageBuilderSchema(partial.props ?? widget.defaultProps),
    slots: clonePageBuilderSchema(partial.slots ?? widget.defaultSlots ?? {}),
    children: widget.acceptsChildren ? clonePageBuilderSchema(partial.children ?? []) : undefined
  }
}

export function createDefaultPageBuilderSchema(): PageBuilderSchema {
  return {
    version: '1.0',
    canvas: {
      columns: 12,
      rowHeight: 58,
      gap: 12,
      padding: 16,
      background: '#f6f8fb'
    },
    nodes: [
      createPageBuilderNode('container', {
        layout: { x: 0, y: 0, w: 7, h: 5 },
        props: {
          title: '页面内容',
          columns: 2,
          gap: 0,
          padding: 0,
          background: '#ffffff',
          borderColor: '#d8e2ec'
        },
        children: [
          createPageBuilderNode('x-button', {
            layout: { x: 0, y: 0, w: 1, h: 1 },
            slots: { default: '保存' }
          }),
          createPageBuilderNode('x-input', {
            layout: { x: 1, y: 0, w: 1, h: 1 },
            props: { modelValue: '', placeholder: '请输入标题', clearable: true, size: 'md' }
          })
        ]
      }),
      createPageBuilderNode('x-table', {
        layout: { x: 7, y: 0, w: 5, h: 5 }
      })
    ]
  }
}
