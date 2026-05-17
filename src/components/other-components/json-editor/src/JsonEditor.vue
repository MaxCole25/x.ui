<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import type { JsonEditorProps } from './types'

defineOptions({ name: 'XJsonEditor' })

const props = withDefaults(defineProps<JsonEditorProps>(), {
  title: 'JSON 数据对象',
  externalError: '',
  resizable: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const highlightRef = ref<HTMLDivElement | null>(null)
const gutterRef = ref<HTMLDivElement | null>(null)
const quickMenu = reactive({
  visible: false,
  x: 0,
  y: 0
})

const parsedState = computed(() => {
  try {
    JSON.parse(props.modelValue)
    return { valid: true, line: 0, message: '' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'JSON 格式不合法'
    const posMatch = message.match(/position\s+(\d+)/i)
    const pos = posMatch ? Number(posMatch[1]) : -1
    if (pos < 0) return { valid: false, line: 0, message }
    const lines = props.modelValue.slice(0, pos).split('\n')
    const line = lines.length
    return { valid: false, line, message: `第 ${line} 行附近 JSON 格式有误` }
  }
})

const jsonErrorLine = computed(() => parsedState.value.line)
const displayError = computed(() => (!parsedState.value.valid ? parsedState.value.message : props.externalError))
const lineNumbers = computed(() => props.modelValue.split('\n'))
const highlightedLines = computed(() => props.modelValue.split('\n').map((line) => highlightJsonLine(line)))

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function formatValue() {
  try {
    emit('update:modelValue', JSON.stringify(JSON.parse(props.modelValue), null, 2))
  } catch {
    // keep current value
  }
  quickMenu.visible = false
}

function syncScroll() {
  if (!textareaRef.value || !highlightRef.value || !gutterRef.value) return
  highlightRef.value.scrollTop = textareaRef.value.scrollTop
  highlightRef.value.scrollLeft = textareaRef.value.scrollLeft
  gutterRef.value.scrollTop = textareaRef.value.scrollTop
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightJsonLine(line: string) {
  const escaped = escapeHtml(line)
  return (
    escaped.replace(
      /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
      (
        match: string,
        key: string | undefined,
        stringValue: string | undefined,
        keyword: string | undefined,
        numberValue: string | undefined
      ) => {
        if (key) return `<span class="json-token--key">${key}</span>:`
        if (stringValue) return `<span class="json-token--string">${stringValue}</span>`
        if (keyword) return `<span class="json-token--keyword">${keyword}</span>`
        if (numberValue) return `<span class="json-token--number">${numberValue}</span>`
        return match
      }
    ) || '&nbsp;'
  )
}

function openQuickMenu(event: MouseEvent) {
  quickMenu.visible = true
  quickMenu.x = event.clientX
  quickMenu.y = event.clientY
}

function hideQuickMenu() {
  quickMenu.visible = false
}

onMounted(() => {
  window.addEventListener('click', hideQuickMenu)
  window.addEventListener('scroll', hideQuickMenu, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', hideQuickMenu)
  window.removeEventListener('scroll', hideQuickMenu, true)
})
</script>

<template>
  <section class="x-json-editor">
    <div class="x-json-editor__toolbar">
      <span>{{ props.title }}</span>
      <button type="button" @click="formatValue">格式化</button>
    </div>

    <div class="x-json-editor__shell">
      <div ref="gutterRef" class="x-json-editor__gutter">
        <div
          v-for="(_, i) in lineNumbers"
          :key="i"
          class="x-json-editor__gutter-line"
          :class="{ 'is-error': i + 1 === jsonErrorLine }"
        >
          {{ i + 1 }}
        </div>
      </div>
      <div ref="highlightRef" class="x-json-editor__highlight">
        <div
          v-for="(line, i) in highlightedLines"
          :key="i"
          class="x-json-editor__line"
          :class="{ 'is-error': i + 1 === jsonErrorLine }"
          v-html="line"
        />
      </div>
      <textarea
        ref="textareaRef"
        class="x-json-editor__textarea"
        :class="{ 'is-fixed-size': !props.resizable }"
        :value="props.modelValue"
        @input="handleInput"
        @blur="emit('blur')"
        @scroll="syncScroll"
        @contextmenu.prevent.stop="openQuickMenu"
      />
    </div>

    <teleport to="body">
      <ul v-if="quickMenu.visible" class="x-json-editor__menu" :style="{ left: `${quickMenu.x}px`, top: `${quickMenu.y}px` }" @click.stop>
        <li class="x-json-editor__menu-item" @click="formatValue">格式化 JSON</li>
      </ul>
    </teleport>

    <small v-if="displayError" class="x-json-editor__error">{{ displayError }}</small>
  </section>
</template>
