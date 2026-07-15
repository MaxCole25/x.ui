<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import { XIcon } from '../../../basic-components/icon'
import { remixIconNames } from '../../../basic-components/icon/src/iconNames'
import type { IconSelectCategoryName, IconSelectIconInfo, IconSelectProps } from './types'

defineOptions({
  name: 'XIconSelect'
})

const props = withDefaults(defineProps<IconSelectProps>(), {
  size: 'md',
  disabled: false,
  readonly: false,
  placeholder: '双击选择图标',
  emptyText: '暂无图标',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4',
  panelHeight: 320,
  iconSize: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, icon: IconSelectIconInfo]
  select: [icon: IconSelectIconInfo]
  dblclick: [icon: IconSelectIconInfo]
}>()

const iconCategoryNames: IconSelectCategoryName[] = [
  '全部',
  '系统',
  '箭头',
  '用户',
  '文件',
  '媒体',
  '编辑',
  '设备',
  '地图',
  '品牌',
  '其它'
]

const categoryKeywords: Record<Exclude<IconSelectCategoryName, '全部' | '其它'>, string[]> = {
  系统: [
    'settings',
    'menu',
    'search',
    'home',
    'close',
    'check',
    'checkbox',
    'alert',
    'error',
    'information',
    'notification',
    'loader',
    'refresh',
    'shield',
    'lock',
    'key',
    'eye',
    'filter',
    'more',
    'dashboard'
  ],
  箭头: ['arrow', 'corner', 'expand', 'collapse', 'skip', 'reply', 'share-forward', 'logout', 'login'],
  用户: ['user', 'account', 'team', 'group', 'admin', 'contacts', 'emotion', 'parent', 'gender'],
  文件: ['file', 'folder', 'book', 'article', 'draft', 'clipboard', 'todo', 'sticky-note', 'pages'],
  媒体: ['play', 'pause', 'stop', 'volume', 'video', 'movie', 'camera', 'image', 'gallery', 'music', 'mic', 'radio'],
  编辑: ['edit', 'delete', 'add', 'subtract', 'eraser', 'pencil', 'markup', 'scissors', 'font', 'align', 'list'],
  设备: ['computer', 'device', 'phone', 'tablet', 'tv', 'keyboard', 'mouse', 'printer', 'server', 'database', 'wifi'],
  地图: ['map', 'pin', 'navigation', 'compass', 'earth', 'globe', 'route', 'road', 'taxi', 'bus', 'plane'],
  品牌: [
    'github',
    'twitter',
    'facebook',
    'google',
    'apple',
    'windows',
    'vuejs',
    'reactjs',
    'wechat',
    'alipay',
    'qq',
    'taobao',
    'youtube',
    'instagram'
  ]
}

const activeCategory = ref<IconSelectCategoryName>('全部')
const previewName = ref('')

const inferIconVariant = (name: string): IconSelectIconInfo['variant'] => {
  if (name.endsWith('-line')) return 'line'
  if (name.endsWith('-fill')) return 'fill'
  return 'plain'
}

const classifyIconName = (name: string): IconSelectCategoryName => {
  const lowerName = name.toLowerCase()
  const matchedCategory = Object.entries(categoryKeywords).find(([, keywords]) =>
    keywords.some((keyword) => lowerName.includes(keyword))
  )

  return (matchedCategory?.[0] as IconSelectCategoryName | undefined) ?? '其它'
}

const createIconInfo = (name: string): IconSelectIconInfo => ({
  name,
  className: `ri-${name}`,
  category: classifyIconName(name),
  variant: inferIconVariant(name)
})

const iconInfos = computed(() => remixIconNames.map(createIconInfo))

const categoryCounts = computed<Record<IconSelectCategoryName, number>>(() => {
  const counts = Object.fromEntries(iconCategoryNames.map((category) => [category, 0])) as Record<IconSelectCategoryName, number>

  iconInfos.value.forEach((icon) => {
    counts[icon.category] += 1
  })
  counts['全部'] = iconInfos.value.length

  return counts
})

const visibleIcons = computed(() => {
  if (activeCategory.value === '全部') {
    return iconInfos.value
  }

  return iconInfos.value.filter((icon) => icon.category === activeCategory.value)
})

const selectedName = computed(() => props.modelValue ?? '')
const selectedIcon = computed(() => iconInfos.value.find((icon) => icon.name === selectedName.value))
const previewIcon = computed(() => iconInfos.value.find((icon) => icon.name === previewName.value) ?? selectedIcon.value)
const mergedIconSize = computed(() => toCssSize(props.iconSize) ?? `${componentSizePreset[props.size].fontSize + 8}px`)

const panelStyle = computed(() => ({
  '--x-icon-select-height': toCssSize(props.panelHeight),
  '--x-icon-select-font-size': `${componentSizePreset[props.size].fontSize}px`,
  '--x-icon-select-radius': componentSizePreset[props.size].radius,
  '--x-icon-select-padding': componentSizePreset[props.size].padding,
  '--x-icon-select-accent-color': props.accentColor,
  '--x-icon-select-icon-size': mergedIconSize.value,
  '--x-icon-select-icon-color': props.iconColor,
  '--x-icon-select-selected-icon-color': props.selectedIconColor
}))

const setActiveCategory = (category: IconSelectCategoryName) => {
  if (props.disabled) return
  activeCategory.value = category
}

const previewIconInfo = (icon: IconSelectIconInfo) => {
  if (props.disabled) return
  previewName.value = icon.name
  emit('select', icon)
}

const commitIcon = (icon: IconSelectIconInfo) => {
  if (props.disabled || props.readonly) return

  previewName.value = icon.name
  emit('update:modelValue', icon.name)
  emit('change', icon.name, icon)
  emit('dblclick', icon)
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      previewName.value = value
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="x-icon-select"
    :class="[
      `x-icon-select--${props.size}`,
      {
        'is-disabled': props.disabled,
        'is-readonly': props.readonly
      }
    ]"
    :style="panelStyle"
  >
    <div class="x-icon-select__summary">
      <div class="x-icon-select__summary-icon" aria-hidden="true">
        <XIcon
          v-if="previewIcon"
          :name="previewIcon.name"
          :icon-size="mergedIconSize"
          :color="props.selectedIconColor"
        />
      </div>
      <div class="x-icon-select__summary-text">
        <span v-if="previewIcon" class="x-icon-select__summary-name">{{ previewIcon.name }}</span>
        <span v-else class="x-icon-select__placeholder">{{ props.placeholder }}</span>
      </div>
    </div>

    <div class="x-icon-select__body">
      <div class="x-icon-select__categories" role="tablist" aria-label="图标分类">
        <button
          v-for="category in iconCategoryNames"
          :key="category"
          class="x-icon-select__category"
          :class="{ 'is-active': category === activeCategory }"
          type="button"
          role="tab"
          :aria-selected="category === activeCategory"
          :disabled="props.disabled"
          @click="setActiveCategory(category)"
        >
          <span>{{ category }}</span>
          <span class="x-icon-select__category-count">{{ categoryCounts[category] }}</span>
        </button>
      </div>

      <div class="x-icon-select__icons x-scrollbar--native" role="listbox" aria-label="图标选择显示区">
        <button
          v-for="icon in visibleIcons"
          :key="icon.name"
          class="x-icon-select__icon"
          :class="{
            'is-selected': icon.name === selectedName,
            'is-preview': icon.name === previewName && icon.name !== selectedName
          }"
          type="button"
          role="option"
          :aria-selected="icon.name === selectedName"
          :title="icon.name"
          :disabled="props.disabled"
          @click="previewIconInfo(icon)"
          @dblclick="commitIcon(icon)"
        >
          <XIcon
            :name="icon.name"
            :icon-size="mergedIconSize"
            :color="icon.name === selectedName ? props.selectedIconColor : props.iconColor"
          />
          <span class="x-icon-select__icon-name">{{ icon.name }}</span>
        </button>

        <div v-if="!visibleIcons.length" class="x-icon-select__empty">{{ props.emptyText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.x-icon-select {
  --x-icon-select-height: 320px;
  --x-icon-select-font-size: 12px;
  --x-icon-select-radius: 6px;
  --x-icon-select-padding: 0 8px;
  --x-icon-select-accent-color: #1264f4;
  --x-icon-select-icon-size: 20px;
  --x-icon-select-icon-color: #334155;
  --x-icon-select-selected-icon-color: #1264f4;

  background: #ffffff;
  border: 1px solid #d8e2e8;
  border-radius: var(--x-icon-select-radius);
  box-sizing: border-box;
  color: #0f172a;
  display: grid;
  font-size: var(--x-icon-select-font-size);
  gap: 0;
  min-width: 0;
  overflow: hidden;
  width: 100%;
}

.x-icon-select__summary {
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  min-width: 0;
  padding: 10px 12px;
}

.x-icon-select__summary-icon {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--x-icon-select-radius);
  box-sizing: border-box;
  color: var(--x-icon-select-selected-icon-color);
  display: inline-flex;
  flex: 0 0 36px;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.x-icon-select__summary-text {
  min-width: 0;
}

.x-icon-select__summary-name,
.x-icon-select__placeholder {
  display: block;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-icon-select__placeholder {
  color: #94a3b8;
}

.x-icon-select__body {
  display: grid;
  grid-template-columns: 148px minmax(0, 1fr);
  height: var(--x-icon-select-height);
  min-height: 0;
  min-width: 0;
  overflow: hidden;
}

.x-icon-select__categories {
  align-content: start;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: grid;
  gap: 4px;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: 8px;
}

.x-icon-select__category {
  align-items: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--x-icon-select-radius);
  box-sizing: border-box;
  color: #334155;
  cursor: pointer;
  display: flex;
  font: inherit;
  gap: 8px;
  justify-content: space-between;
  min-height: 30px;
  min-width: 0;
  padding: var(--x-icon-select-padding);
  text-align: left;
}

.x-icon-select__category span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-icon-select__category-count {
  color: #64748b;
  flex: 0 0 auto;
  font-size: 11px;
}

.x-icon-select__category:hover,
.x-icon-select__category.is-active {
  background: #ffffff;
  border-color: var(--x-icon-select-accent-color);
  color: var(--x-icon-select-accent-color);
}

.x-icon-select__category.is-active .x-icon-select__category-count {
  color: var(--x-icon-select-accent-color);
}

.x-icon-select__icons {
  align-content: start;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
}

.x-icon-select__icon {
  align-content: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--x-icon-select-radius);
  box-sizing: border-box;
  color: var(--x-icon-select-icon-color);
  cursor: pointer;
  display: grid;
  font: inherit;
  gap: 6px;
  justify-items: center;
  min-height: 78px;
  min-width: 0;
  padding: 8px 6px;
}

.x-icon-select__icon:hover,
.x-icon-select__icon.is-preview {
  border-color: #94a3b8;
  box-shadow: 0 0 0 2px rgba(18, 100, 244, 0.08);
}

.x-icon-select__icon.is-selected {
  background: rgba(18, 100, 244, 0.08);
  border-color: var(--x-icon-select-accent-color);
  color: var(--x-icon-select-selected-icon-color);
}

.x-icon-select__icon-name {
  color: #475569;
  font-size: 11px;
  line-height: 1.25;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-align: center;
}

.x-icon-select__empty {
  align-items: center;
  color: #94a3b8;
  display: flex;
  grid-column: 1 / -1;
  justify-content: center;
  min-height: 120px;
}

.x-icon-select.is-disabled,
.x-icon-select.is-readonly {
  background: #f8fafc;
}

.x-icon-select.is-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.x-icon-select.is-disabled button,
.x-icon-select.is-readonly .x-icon-select__icon {
  cursor: not-allowed;
}

.x-icon-select button:disabled {
  cursor: not-allowed;
}

.x-icon-select--sm .x-icon-select__summary {
  padding: 8px 10px;
}

.x-icon-select--sm .x-icon-select__summary-icon {
  flex-basis: 30px;
  height: 30px;
  width: 30px;
}

.x-icon-select--lg .x-icon-select__summary {
  padding: 12px 14px;
}

.x-icon-select--lg .x-icon-select__summary-icon {
  flex-basis: 42px;
  height: 42px;
  width: 42px;
}

@media (max-width: 640px) {
  .x-icon-select__body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
  }

  .x-icon-select__categories {
    border-bottom: 1px solid #e2e8f0;
    border-right: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .x-icon-select__category {
    flex: 0 0 auto;
  }
}
</style>
