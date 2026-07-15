<template>
  <NodeViewWrapper as="div" class="xl-code-node" :data-language="language" :data-collapsed="String(isCollapsed)">
    <div class="xl-code-node__header">
      <div class="xl-code-node__meta">
        <button
          type="button"
          class="xl-code-node__fold"
          :title="isCollapsed ? '展开代码块' : '折叠代码块'"
          @click="toggleCollapsed"
        >
          <i class="xl-code-node__fold-icon ri-play-fill" :class="{ 'is-expanded': !isCollapsed }"></i>
        </button>

        <div ref="languageMenuRef" class="xl-code-node__language-menu">
          <button
            ref="languageButtonRef"
            type="button"
            class="xl-code-node__language"
            :class="{ 'is-open': isLanguageMenuOpen }"
            title="选择语言"
            @click.stop="toggleLanguageMenu"
          >
            <span>{{ languageLabel }}</span>
            <i class="ri-arrow-down-s-line"></i>
          </button>
        </div>

        <span v-if="lineCount > 1" class="xl-code-node__lines">{{ lineCount }} 行</span>
      </div>

      <div class="xl-code-node__actions">
        <button
          type="button"
          class="xl-code-node__action"
          :title="copied ? '已复制' : '复制代码'"
          @click="copyCode"
        >
          <i :class="copied ? 'ri-check-line' : 'ri-file-copy-line'"></i>
        </button>
      </div>
    </div>

    <div v-if="isCollapsed" class="xl-code-node__summary" @click="toggleCollapsed">
      <span class="xl-code-node__summary-label">{{ languageLabel }}</span>
      <span class="xl-code-node__summary-text">{{ summary }}</span>
      <button type="button" class="xl-code-node__summary-toggle" :title="'展开代码块'" @click.stop="toggleCollapsed">
        <i class="ri-arrow-down-s-line"></i>
      </button>
    </div>

    <div v-show="!isCollapsed" class="xl-code-node__body">
      <div class="xl-code-node__gutter" aria-hidden="true">
        <span v-for="line in lineNumbers" :key="line">{{ line }}</span>
      </div>
      <pre class="xl-code-node__pre x-scrollbar--native"><NodeViewContent as="code" class="xl-code-node__content" spellcheck="false" /></pre>
    </div>
  </NodeViewWrapper>

  <Teleport to="body">
    <div
      v-if="isLanguageMenuOpen"
      ref="languageDropdownRef"
      class="xl-code-node__language-dropdown x-scrollbar--native"
      :style="languageDropdownStyle"
      @click.stop
    >
      <button
        v-for="item in languageOptions"
        :key="item.value"
        type="button"
        class="xl-code-node__language-option"
        :class="{ active: item.value === normalizedLanguage }"
        @click="selectLanguage(item.value)"
      >
        {{ item.label }}
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/vue-3'
import { detectCodeLanguage } from '../extensions/codeBlock'

const props = defineProps<NodeViewProps>()

const copied = ref(false)
const isLanguageMenuOpen = ref(false)
const languageMenuRef = ref<HTMLElement | null>(null)
const languageButtonRef = ref<HTMLElement | null>(null)
const languageDropdownRef = ref<HTMLElement | null>(null)
const languageDropdownStyle = ref<Record<string, string>>({})
let copiedTimer: number | undefined

const language = computed(() => props.node.attrs.language ?? '')
const normalizedLanguage = computed(() => language.value || 'plaintext')
const isCollapsed = computed(() => props.node.attrs.collapsed === true)
const codeText = computed(() => props.node.textContent ?? '')
const normalizedLines = computed(() => {
  const text = codeText.value.replace(/\r\n/g, '\n')
  return text.length > 0 ? text.split('\n') : ['']
})
const lineCount = computed(() => normalizedLines.value.length)
const lineNumbers = computed(() => Array.from({ length: lineCount.value }, (_, index) => index + 1))

const languageLabelMap: Record<string, string> = {
  plaintext: '纯文本',
  text: '纯文本',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  vue: 'Vue',
  json: 'JSON',
  css: 'CSS',
  html: 'HTML',
  bash: 'Bash',
  shell: 'Shell',
  sql: 'SQL',
  python: 'Python',
  csharp: 'C#',
  java: 'Java',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  markdown: 'Markdown'
}

const languageOptions = [
  { label: '纯文本', value: 'plaintext' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vue', value: 'vue' },
  { label: 'JSON', value: 'json' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML', value: 'html' },
  { label: 'Bash', value: 'bash' },
  { label: 'Shell', value: 'shell' },
  { label: 'SQL', value: 'sql' },
  { label: 'Python', value: 'python' },
  { label: 'C#', value: 'csharp' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
  { label: 'Markdown', value: 'markdown' }
]

const languageLabel = computed(() => {
  return languageLabelMap[normalizedLanguage.value] ?? normalizedLanguage.value.toUpperCase()
})

const summary = computed(() => {
  const lines = normalizedLines.value.map((line) => line.trim()).filter(Boolean)
  const firstLine = lines[0] ?? '空代码块'
  return firstLine.length > 96 ? `${firstLine.slice(0, 96)}...` : firstLine
})

function positionLanguageDropdown() {
  const button = languageButtonRef.value
  const dropdown = languageDropdownRef.value
  if (!button || !dropdown) {
    return
  }

  const buttonRect = button.getBoundingClientRect()
  const dropdownRect = dropdown.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const gap = 6

  let left = buttonRect.left
  let top = buttonRect.bottom + gap

  if (left + dropdownRect.width > viewportWidth - 8) {
    left = Math.max(8, viewportWidth - dropdownRect.width - 8)
  }

  if (top + dropdownRect.height > viewportHeight - 8) {
    top = Math.max(8, buttonRect.top - dropdownRect.height - gap)
  }

  languageDropdownStyle.value = {
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`
  }
}

function autoDetectLanguage() {
  if (language.value) {
    return
  }

  const detected = detectCodeLanguage(codeText.value)
  if (!detected) {
    return
  }

  props.updateAttributes({
    language: detected
  })
}

async function copyCode() {
  const text = codeText.value
  if (!text) {
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', 'true')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    copied.value = true
    window.clearTimeout(copiedTimer)
    copiedTimer = window.setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    copied.value = false
  }
}

function toggleCollapsed() {
  props.updateAttributes({
    collapsed: !isCollapsed.value
  })
}

function openLanguageMenu() {
  isLanguageMenuOpen.value = true
  void nextTick(() => {
    positionLanguageDropdown()
  })
}

function closeLanguageMenu() {
  isLanguageMenuOpen.value = false
}

function toggleLanguageMenu() {
  if (isLanguageMenuOpen.value) {
    closeLanguageMenu()
    return
  }

  openLanguageMenu()
}

function selectLanguage(nextLanguage: string) {
  props.updateAttributes({
    language: nextLanguage === 'plaintext' ? '' : nextLanguage
  })
  closeLanguageMenu()
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target) {
    closeLanguageMenu()
    return
  }

  if (languageMenuRef.value?.contains(target) || languageDropdownRef.value?.contains(target)) {
    return
  }

  closeLanguageMenu()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  window.addEventListener('scroll', positionLanguageDropdown, true)
  window.addEventListener('resize', positionLanguageDropdown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  window.removeEventListener('scroll', positionLanguageDropdown, true)
  window.removeEventListener('resize', positionLanguageDropdown)
})

watch(
  () => props.node.attrs.collapsed,
  (next) => {
    if (!next) {
      copied.value = false
    }
  }
)

watch(
  () => codeText.value,
  () => {
    autoDetectLanguage()
  },
  { immediate: true }
)

watch(
  () => language.value,
  () => {
    closeLanguageMenu()
  }
)

watch(
  () => isLanguageMenuOpen.value,
  (open) => {
    if (!open) {
      return
    }

    void nextTick(() => {
      positionLanguageDropdown()
    })
  }
)
</script>
