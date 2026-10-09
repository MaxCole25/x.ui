<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const inputAmount = ref('12345')
const offsets = reactive({ input: 0, prefix: 0, suffix: 0 })
const controls = [
  { key: 'input', label: '输入内容垂直偏移' },
  { key: 'prefix', label: '前缀垂直偏移' },
  { key: 'suffix', label: '后缀垂直偏移' }
] as const
</script>

<template>
  <div class="affix-demo">
    <div class="affix-demo__preview">
      <XInput
        v-model="inputAmount"
        prefix="￥"
        suffix="元"
        :width="240"
        :input-offset-y="offsets.input"
        :prefix-offset-y="offsets.prefix"
        :suffix-offset-y="offsets.suffix"
      />
    </div>
    <div class="affix-demo__controls">
      <label v-for="control in controls" :key="control.key">
        <span>{{ control.label }}（px）</span>
        <input v-model.number="offsets[control.key]" type="number" step="0.5" />
      </label>
    </div>
    <p>正值向下、负值向上，支持小数；可先将前缀偏移设为 1，观察符号和数字的对齐效果。</p>
    <button type="button" @click="Object.assign(offsets, { input: 0, prefix: 0, suffix: 0 })">恢复默认</button>
  </div>
</template>

<style scoped>
.affix-demo { display: grid; gap: 12px; width: 100%; }
.affix-demo__preview { display: flex; align-items: center; justify-content: center; padding: 10px; }
.affix-demo__controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.affix-demo__controls label { display: grid; gap: 6px; min-width: 0; font-size: 14px; }
.affix-demo__controls input { box-sizing: border-box; width: 100%; min-width: 0; height: 32px; padding: 0 8px; border: 1px solid var(--x-color-border); border-radius: 4px; background: var(--x-color-surface); color: var(--x-color-text); font: inherit; }
.affix-demo p { margin: 0; font-size: 14px; color: var(--x-color-muted); }
.affix-demo button { justify-self: start; padding: 4px 10px; border: 1px solid var(--x-color-border); border-radius: 4px; background: var(--x-color-surface); color: var(--x-color-text); font: inherit; cursor: pointer; }
</style>
