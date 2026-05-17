import type { XSize } from '../../../_utils/size'
import type { Component } from 'vue'

export type PageBuilderNodeType = string
export type PageBuilderWidgetCategory = 'layout' | 'basic' | 'form' | 'data' | 'business' | 'feedback' | 'fields'

export interface PageBuilderCanvasSchema {
  columns: number
  rowHeight: number
  gap: number
  padding: number
  background: string
}

export interface PageBuilderLayoutSchema {
  x: number
  y: number
  w: number
  h: number
}

export interface PageBuilderNodeSchema {
  id: string
  type: PageBuilderNodeType
  component: string
  label: string
  layout: PageBuilderLayoutSchema
  props: Record<string, unknown>
  slots?: Record<string, string>
  children?: PageBuilderNodeSchema[]
}

export interface PageBuilderSchema {
  version: '1.0'
  canvas: PageBuilderCanvasSchema
  nodes: PageBuilderNodeSchema[]
}

export interface PageBuilderWidgetDefinition {
  type: PageBuilderNodeType
  component: string
  category: PageBuilderWidgetCategory
  label: string
  description: string
  previewIcon: string
  defaultLayout: PageBuilderLayoutSchema
  defaultProps: Record<string, unknown>
  defaultSlots?: Record<string, string>
  acceptsChildren?: boolean
  renderer?: Component
}

export interface PageBuilderProps {
  size?: XSize
  modelValue?: PageBuilderSchema
  readonly?: boolean
  customWidgets?: PageBuilderWidgetDefinition[]
}
