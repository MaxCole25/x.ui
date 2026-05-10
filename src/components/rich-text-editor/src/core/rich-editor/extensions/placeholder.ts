import Placeholder from '@tiptap/extension-placeholder'

export function createPlaceholderExtension() {
  return Placeholder.configure({
    placeholder: '输入 / 唤起更多',
    showOnlyWhenEditable: true,
  })
}
