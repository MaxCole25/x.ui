import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'
import { resolveFileUrl } from '../custom/utils/fileResolver'

export const RichImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fileKey: {
        default: ''
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('data-width') || element.style.width || '100%',
        renderHTML: (attributes) => ({
          'data-width': attributes.width,
          style: `width:${attributes.width};max-width:100%;`
        })
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    const fileKey = String(HTMLAttributes.fileKey ?? '')
    const src = HTMLAttributes.src || (fileKey ? resolveFileUrl(fileKey) : '')

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        src,
        'data-file-key': fileKey,
        alt: HTMLAttributes.alt || ''
      })
    ]
  }
})
