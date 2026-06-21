<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    code?: string
    language?: string
    defaultExpanded?: boolean
  }>(),
  {
    code: '',
    defaultExpanded: false,
    language: 'vue'
  }
)

const expanded = ref(props.defaultExpanded)
const copied = ref(false)

const normalizedCode = computed(() => props.code.trim())

async function copyCode() {
  if (!normalizedCode.value) return

  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(normalizedCode.value)
    } else {
      fallbackCopy(normalizedCode.value)
    }

    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    copied.value = false
  }
}

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}
</script>

<template>
  <section class="x-doc-demo">
    <div v-if="title || description" class="x-doc-demo__header">
      <h3 v-if="title" class="x-doc-demo__title">{{ title }}</h3>
      <p v-if="description" class="x-doc-demo__description">{{ description }}</p>
    </div>

    <div class="x-doc-demo__preview">
      <ClientOnly>
        <slot />
      </ClientOnly>
    </div>

    <div v-if="normalizedCode" class="x-doc-demo__toolbar">
      <span class="x-doc-demo__language">{{ language }}</span>
      <div class="x-doc-demo__actions">
        <button class="x-doc-demo__button" type="button" @click="copyCode">
          {{ copied ? '已复制' : '复制代码' }}
        </button>
        <button class="x-doc-demo__button" type="button" @click="expanded = !expanded">
          {{ expanded ? '隐藏源码' : '显示源码' }}
        </button>
      </div>
    </div>

    <div v-if="normalizedCode && expanded" class="x-doc-demo__code">
      <pre><code>{{ normalizedCode }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.x-doc-demo {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 18px 0 28px;
  overflow: hidden;
}

.x-doc-demo__header {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 14px 18px 0;
}

.x-doc-demo__title {
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 8px;
}

.x-doc-demo__description {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
  margin: 0 0 14px;
}

.x-doc-demo__preview {
  background: var(--vp-c-bg);
  padding: 24px;
}

.x-doc-demo__preview :deep(.x-demo-row) {
  margin: 0;
}

.x-doc-demo__toolbar {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-height: 44px;
  padding: 8px 12px 8px 18px;
}

.x-doc-demo__language {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
}

.x-doc-demo__actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.x-doc-demo__button {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  min-height: 30px;
  padding: 0 10px;
  transition:
    border-color 0.18s ease,
    color 0.18s ease;
}

.x-doc-demo__button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.x-doc-demo__code {
  border-top: 1px solid var(--vp-c-divider);
}

.x-doc-demo__code pre {
  background: var(--vp-code-block-bg);
  margin: 0;
  overflow-x: auto;
  padding: 16px 18px;
}

.x-doc-demo__code code {
  color: var(--vp-code-block-color);
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.7;
  min-width: max-content;
}

@media (max-width: 640px) {
  .x-doc-demo__preview {
    padding: 18px;
  }

  .x-doc-demo__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .x-doc-demo__actions {
    justify-content: flex-start;
  }
}
</style>
