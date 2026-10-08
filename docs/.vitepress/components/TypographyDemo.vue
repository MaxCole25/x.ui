<script setup lang="ts">
import { ref } from 'vue'
import { XButton } from '../../../src/components/basic-components/button'
import { XInput } from '../../../src/components/form-components/input'
import { XInputNumber } from '../../../src/components/form-components/input-number'
import { XSelect } from '../../../src/components/form-components/select'
import { XTextarea } from '../../../src/components/form-components/textarea'
import { XText } from '../../../src/components/basic-components/text'
import { XCard } from '../../../src/components/basic-components/card'

const fontSize = ref(14)
const height = ref(32)
const value = ref('字号与高度独立调整')
const amount = ref(1)
const selected = ref('enabled')
const options = [{ label: '启用', value: 'enabled' }, { label: '停用', value: 'disabled' }]
</script>

<template>
  <div class="typography-demo">
    <div class="typography-demo__controls">
      <label>字号（px）<input v-model.number="fontSize" aria-label="字号" type="number" min="1" /></label>
      <label>高度（px）<input v-model.number="height" aria-label="控件高度" type="number" min="1" /></label>
    </div>
    <div class="typography-demo__preview">
      <XButton :font-size="fontSize" :height="height">确认操作</XButton>
      <XInput v-model="value" :font-size="fontSize" :height="height" :width="240" />
      <XInputNumber v-model="amount" :font-size="fontSize" :height="height" />
      <XSelect v-model="selected" :options="options" :font-size="fontSize" :height="height" :width="160" />
    </div>
    <p>当前字号 {{ fontSize }}px，控件高度 {{ height }}px。</p>
    <div class="typography-demo__text-defaults">
      <XText>普通文本默认 14px</XText>
      <XTextarea model-value="多行文本区域默认 14px，高度由行数决定。" :rows="3" />
      <XCard>卡片正文默认 14px，高度由内容决定。</XCard>
    </div>
  </div>
</template>

<style scoped>
.typography-demo__controls,
.typography-demo__preview { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.typography-demo__controls { margin-bottom: 16px; }
.typography-demo__text-defaults { display: grid; gap: 16px; }
.typography-demo label { display: flex; align-items: center; gap: 8px; }
.typography-demo input[type='number'] { width: 64px; padding: 4px 8px; border: 1px solid var(--x-color-border); border-radius: 6px; }
.typography-demo p { color: var(--x-color-muted); font-size: 12px; }
</style>
