import Link from '@tiptap/extension-link'

export function createLinkExtension() {
  return Link.configure({
    autolink: true,
    defaultProtocol: 'https',
    openOnClick: false,
    linkOnPaste: true
  })
}
