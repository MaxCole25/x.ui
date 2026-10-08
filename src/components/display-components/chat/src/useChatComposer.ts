import { computed, nextTick, onBeforeUnmount, ref, type EmitFn } from 'vue'
import type { ChatAttachment, ChatAttachmentSource, ChatEmits, ChatProps } from './types'

export function formatChatFileSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function useChatComposer(props: Readonly<ChatProps>, emit: EmitFn<ChatEmits>) {
  const textarea = ref<HTMLTextAreaElement>()
  const imageInput = ref<HTMLInputElement>()
  const fileInput = ref<HTMLInputElement>()
  const internalDraft = ref('')
  const attachments = ref<ChatAttachment[]>([])
  const showEmojis = ref(false)
  const ownedUrls = new Set<string>()
  let nextId = 0
  const draft = computed({
    get: () => props.modelValue ?? internalDraft.value,
    set: value => {
      internalDraft.value = value
      emit('update:modelValue', value)
    }
  })
  const canSend = computed(() => !props.disabled && (draft.value.trim().length > 0 || attachments.value.length > 0))
  function focus() { textarea.value?.focus() }
  function release(attachment: ChatAttachment) {
    URL.revokeObjectURL(attachment.url)
    ownedUrls.delete(attachment.url)
  }
  function removeAttachment(attachment: ChatAttachment) {
    if (props.disabled) return
    attachments.value = attachments.value.filter(item => item.id !== attachment.id)
    emit('attachment-remove', attachment)
    release(attachment)
  }
  function clearDraft() {
    attachments.value.forEach(release)
    attachments.value = []
    draft.value = ''
    showEmojis.value = false
  }
  function addFiles(files: File[], source: ChatAttachmentSource) {
    if (props.disabled || !files.length) return
    const added = files.map(file => {
      const url = URL.createObjectURL(file)
      ownedUrls.add(url)
      return { id: `chat-attachment-${++nextId}`, kind: file.type.startsWith('image/') ? 'image' as const : 'file' as const, file, name: file.name, size: file.size, url }
    })
    attachments.value.push(...added)
    emit('attachment-add', { attachments: added, source })
  }
  function handleFiles(event: Event) {
    const input = event.target as HTMLInputElement
    addFiles(Array.from(input.files ?? []), 'picker')
    input.value = ''
    focus()
  }
  async function insertText(text: string) {
    const start = textarea.value?.selectionStart ?? draft.value.length
    const end = textarea.value?.selectionEnd ?? start
    draft.value = draft.value.slice(0, start) + text + draft.value.slice(end)
    await nextTick()
    focus()
    textarea.value?.setSelectionRange(start + text.length, start + text.length)
  }
  function insertEmoji(emoji: string) {
    if (props.disabled) return
    void insertText(emoji)
    showEmojis.value = false
    emit('emoji-select', emoji)
  }
  function handlePaste(event: ClipboardEvent) {
    if (!props.enablePaste || props.disabled || !event.clipboardData) return
    const files = Array.from(event.clipboardData.files)
    if (!files.length) return
    event.preventDefault()
    addFiles(files, 'paste')
    const text = event.clipboardData.getData('text/plain')
    if (text) void insertText(text)
  }
  function sendMessage() {
    if (!canSend.value) return
    emit('send', { content: draft.value.trim(), attachments: [...attachments.value] })
    // 已发送附件的预览地址由当前会话继续使用，在组件销毁时统一释放。
    attachments.value = []
    draft.value = ''
    showEmojis.value = false
    focus()
  }
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') showEmojis.value = false
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault()
      sendMessage()
    }
  }
  onBeforeUnmount(() => ownedUrls.forEach(url => URL.revokeObjectURL(url)))
  return { textarea, imageInput, fileInput, draft, attachments, showEmojis, canSend, focus, clearDraft, sendMessage, handleFiles, handlePaste, handleKeydown, insertEmoji, removeAttachment }
}
