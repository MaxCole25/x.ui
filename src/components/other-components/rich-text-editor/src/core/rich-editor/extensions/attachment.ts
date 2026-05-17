import { mergeAttributes, Node } from '@tiptap/core'
import { resolveFileUrl } from '../custom/utils/fileResolver'

export const Attachment = Node.create({
  name: 'attachment',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      fileKey: {
        default: ''
      },
      fileName: {
        default: ''
      },
      size: {
        default: 0
      },
      mimeType: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="attachment"]'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const fileKey = String(HTMLAttributes.fileKey ?? '')
    const fileName = String(HTMLAttributes.fileName ?? '未命名附件')
    const size = Number(HTMLAttributes.size ?? 0)
    const href = resolveFileUrl(fileKey)

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'attachment',
        'data-file-key': fileKey,
        class: 'xl-attachment'
      }),
      [
        'a',
        {
          class: 'xl-attachment__link',
          href,
          download: fileName,
          target: '_blank',
          rel: 'noreferrer'
        },
        [
          'span',
          { class: 'xl-attachment__name' },
          fileName
        ]
      ],
      [
        'span',
        { class: 'xl-attachment__meta' },
        `${(size / 1024).toFixed(1)} KB`
      ]
    ]
  }
})
