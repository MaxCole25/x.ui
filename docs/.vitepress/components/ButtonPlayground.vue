<script setup lang="ts">
import { computed, ref } from 'vue'
import { XButton } from '../../../src'
import type { ButtonSize, ButtonVariant } from '../../../src'

const variant = ref<ButtonVariant>('solid')
const size = ref<ButtonSize>('md')
const loading = ref(false)
const disabled = ref(false)
const clickCount = ref(0)

const previewCode = computed(() => {
  const attrs = [
    variant.value !== 'solid' ? `variant="${variant.value}"` : '',
    size.value !== 'md' ? `size="${size.value}"` : '',
    loading.value ? 'loading' : '',
    disabled.value ? 'disabled' : ''
  ].filter(Boolean)

  return `<XButton${attrs.length ? ` ${attrs.join(' ')}` : ''}>操作按钮</XButton>`
})

function handleClick() {
  clickCount.value += 1
}
</script>

<template>
  <section class="x-playground">
    <div class="x-playground__preview">
      <XButton
        :variant="variant"
        :size="size"
        :loading="loading"
        :disabled="disabled"
        @click="handleClick"
      >
        操作按钮
      </XButton>
      <p class="x-playground__hint">点击次数：{{ clickCount }}</p>
    </div>

    <div class="x-playground__panel" aria-label="按钮配置">
      <label class="x-control">
        <span>类型</span>
        <select v-model="variant">
          <option value="solid">主要按钮</option>
          <option value="outline">描边按钮</option>
          <option value="ghost">文本按钮</option>
        </select>
      </label>

      <label class="x-control">
        <span>尺寸</span>
        <select v-model="size">
          <option value="sm">小</option>
          <option value="md">默认</option>
          <option value="lg">大</option>
        </select>
      </label>

      <label class="x-check">
        <input v-model="loading" type="checkbox" />
        <span>加载中</span>
      </label>

      <label class="x-check">
        <input v-model="disabled" type="checkbox" />
        <span>禁用</span>
      </label>
    </div>

    <pre class="x-playground__code"><code>{{ previewCode }}</code></pre>
  </section>
</template>
