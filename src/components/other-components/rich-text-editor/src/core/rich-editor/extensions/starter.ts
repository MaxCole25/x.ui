import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import Color from '@tiptap/extension-color'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { createTextStyleExtension } from './textStyle'
import { FontSize } from './fontSize'
import { RichCodeBlock } from './codeBlock'
import { RichImage } from './image'
import { createLinkExtension } from './link'
import { createTableExtensions } from './table'
import { Attachment } from './attachment'
import { createPlaceholderExtension } from './placeholder'

export function createRichEditorExtensions() {
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: {
        levels: [1, 2, 3]
      }
    }),
    createTextStyleExtension(),
    FontFamily,
    FontSize,
    Color,
    Underline,
    Highlight.configure({
      multicolor: true
    }),
    Subscript,
    Superscript,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    TaskList,
    TaskItem.configure({
      nested: true
    }),
    RichCodeBlock,
    createLinkExtension(),
    RichImage.configure({
      inline: false,
      allowBase64: false
    }),
    ...createTableExtensions(),
    Attachment,
    createPlaceholderExtension()
  ]
}
