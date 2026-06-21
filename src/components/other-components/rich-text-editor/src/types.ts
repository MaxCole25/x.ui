import type { JSONContent } from '@tiptap/core'
import type { XSize } from '../../../_utils/size'
import type { RichEditorExpose, UploadResult } from './core/rich-editor/custom/types'

export const RICH_TEXT_EDITOR_TOOLBAR_BUTTONS = [
  'save',
  'import-markdown',
  'undo',
  'redo',
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'subscript',
  'superscript',
  'clear-formatting',
  'format-painter',
  'font-family',
  'font-size',
  'text-color',
  'highlight',
  'heading',
  'bullet-list',
  'ordered-list',
  'task-list',
  'blockquote',
  'code-block',
  'outline',
  'align',
  'horizontal-rule',
  'link',
  'image',
  'attachment',
  'table'
] as const

export type RichTextEditorToolbarButton = (typeof RICH_TEXT_EDITOR_TOOLBAR_BUTTONS)[number]

export interface RichTextEditorTheme {
  toolbarBackground?: string
  toolbarBorderColor?: string
  toolbarTextColor?: string
  toolbarHoverBackground?: string
  toolbarHoverTextColor?: string
  toolbarActiveBackground?: string
  toolbarActiveTextColor?: string
  toolbarDividerColor?: string
  contentBackground?: string
  contentTextColor?: string
  placeholderColor?: string
  overlayBackground?: string
  overlayBorderColor?: string
  overlayTextColor?: string
  outlineActiveColor?: string
}

export interface RichTextEditorProps {
  size?: XSize
  modelValue?: string
  fallbackHtml?: string
  readonly?: boolean
  minHeight?: number | string
  fullHeight?: boolean
  canSave?: boolean
  showToolbar?: boolean
  toolbarButtons?: RichTextEditorToolbarButton[]
  toolbarTooltipPlacement?: 'top' | 'bottom'
  showOutline?: boolean
  pasteImages?: boolean
  contentBackground?: string
  contentTextColor?: string
  contentFontSize?: number | string
  theme?: RichTextEditorTheme
  uploadImage?: (file: File) => Promise<UploadResult>
  uploadFile?: (file: File) => Promise<UploadResult>
}

export type RichTextEditorValue = JSONContent | string | null
export type RichTextEditorExpose = RichEditorExpose
export type { UploadResult }
