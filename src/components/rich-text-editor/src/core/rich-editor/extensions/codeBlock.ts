import { mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import CodeBlockView from '../nodes/CodeBlockView.vue'

const lowlight = createLowlight(common)

lowlight.registerAlias({
  plaintext: ['text'],
  javascript: ['js'],
  typescript: ['ts'],
  shell: ['bash'],
  csharp: ['cs']
})

export function detectCodeLanguage(code: string) {
  const text = code.trim()
  if (!text) {
    return ''
  }

  const result = lowlight.highlightAuto(text)
  const detected = result.data?.language
  return typeof detected === 'string' && detected ? detected : ''
}

export const RichCodeBlock = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight,
      defaultLanguage: null,
      languageClassPrefix: 'language-'
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      collapsed: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-collapsed') === 'true',
        renderHTML: (attributes) => ({
          'data-collapsed': String(Boolean(attributes.collapsed))
        })
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { collapsed, class: className, language, ...rest } = HTMLAttributes as Record<string, unknown>
    const classes = ['xl-code-block', typeof className === 'string' ? className : '']
      .filter(Boolean)
      .join(' ')

    return [
      'pre',
      mergeAttributes(rest, {
        class: classes,
        'data-collapsed': collapsed ? 'true' : 'false'
      }),
      ['code', { class: typeof language === 'string' && language ? `language-${language}` : '' }, 0]
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeBlockView)
  }
})
