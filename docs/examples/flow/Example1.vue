<script setup lang="ts">
import { computed, ref } from 'vue'
import { XBrick, XBrickItem, XFlow, XFlowItem, XGrid, XIcon, XInputNumber, XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const containerWidth = ref<number | undefined>(480)
const containerHeight = ref<number | undefined>(260)
const itemWidth = ref<number | undefined>(96)
const gap = ref<number | undefined>(8)
const itemCount = ref<number | undefined>(48)
const iconNames = ['home', 'user', 'search', 'setting', 'edit', 'save', 'copy', 'download', 'upload', 'calendar', 'check', 'refresh']
const items = computed(() => Array.from({ length: itemCount.value ?? 48 }, (_, index) => ({
  id: index,
  name: iconNames[index % iconNames.length],
  label: `入口 ${index + 1}`
})))
</script>

<template>
  <XGrid :columns="1" :gap="16">
    <XGrid columns="repeat(auto-fit, minmax(130px, 1fr))" :gap="12">
      <XGrid :columns="1" :gap="4" role="group" aria-label="容器宽度（px）">
        容器宽度（px）
        <XInputNumber v-model="containerWidth" :min="160" :max="1000" :step="20" full-width />
      </XGrid>
      <XGrid :columns="1" :gap="4" role="group" aria-label="容器高度（px）">
        容器高度（px）
        <XInputNumber v-model="containerHeight" :min="100" :max="600" :step="20" full-width />
      </XGrid>
      <XGrid :columns="1" :gap="4" role="group" aria-label="子项最小宽度（px）">
        子项最小宽度（px）
        <XInputNumber v-model="itemWidth" :min="64" :max="200" :step="8" full-width />
      </XGrid>
      <XGrid :columns="1" :gap="4" role="group" aria-label="间距（px）">
        间距（px）
        <XInputNumber v-model="gap" :min="0" :max="32" :step="2" full-width />
      </XGrid>
      <XGrid :columns="1" :gap="4" role="group" aria-label="元素数量">
        元素数量
        <XInputNumber v-model="itemCount" :min="12" :max="120" :step="12" full-width />
      </XGrid>
    </XGrid>

    <XText variant="muted">
      共 {{ items.length }} 个元素。缩小宽度观察列数减少；缩小高度后在内容区滚动查看剩余元素。
    </XText>

    <XBrick width="100%">
      <XBrickItem overflow="auto">
        <XFlow
          :width="containerWidth ?? 480"
          :height="containerHeight ?? 260"
          :item-width="itemWidth ?? 96"
          :gap="gap ?? 8"
          :padding="12"
          justify-items="stretch"
          align-items="start"
          background-color="var(--x-color-surface)"
          border-color="var(--x-color-border)"
          :border-width="1"
          :radius="8"
          item-background-color="var(--x-color-surface-raised)"
          item-border-color="var(--x-color-border)"
          :item-border-width="1"
          :item-radius="6"
          :item-padding="8"
        >
          <XFlowItem v-for="item in items" :key="item.id" width="100%" :height="84" :min-height="84">
            <XGrid :columns="1" :gap="6" :height="64" justify-items="center" align-items="center">
              <XIcon :name="item.name" :icon-size="24" />
              <XText :font-size="12">{{ item.label }}</XText>
            </XGrid>
          </XFlowItem>
        </XFlow>
      </XBrickItem>
    </XBrick>
  </XGrid>
</template>
