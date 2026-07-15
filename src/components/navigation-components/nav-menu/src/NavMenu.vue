<script setup lang="ts">
import { computed, markRaw, ref, toRaw, watch } from 'vue'
import type { NavMenuItem as NavMenuItemType, NavMenuProps } from './types'
import NavMenuItem from './NavMenuItem.vue'

defineOptions({
  name: 'XNavMenu'
})

const props = withDefaults(defineProps<NavMenuProps>(), {
  activeKey: '',
  mode: 'vertical',
  collapsed: false,
  allowCollapse: false,
  hidden: false,
  teleported: false,
  teleportTo: 'body',
  scrollable: false,
  accordion: false,
  textColor: 'var(--x-color-text)',
  activeTextColor: '#dde0fe',
  activeBackgroundColor: '#1d305b',
  activeAncestorTextColor: undefined,
  activeAncestorBackgroundColor: undefined,
  fontSize: 14,
  fontWeight: 400,
  activeFontWeight: 600,
  fontFamily: 'var(--x-font-family)',
  itemGap: 4,
  submenuPopupGap: 8,
  showSubmenuArrow: true
})

const emit = defineEmits<{
  (e: 'select', key: string): void
  (e: 'open-change', openKeys: string[]): void
  (e: 'update:openKeys', openKeys: string[]): void
}>()

const internalOpenKeys = ref<Set<string>>(new Set())

const isCollapsed = computed(() => props.allowCollapse && props.collapsed)
const isControlledOpenKeys = computed(() => props.openKeys !== undefined)
const normalizedItems = computed(() => normalizeMenuItems(props.items))
const parentKeyMap = computed(() => createParentKeyMap(props.items))
const childrenKeyMap = computed(() => createChildrenKeyMap(props.items))
const activePathKeys = computed(() => findActivePathKeys(props.items, props.activeKey))
const currentOpenKeys = computed(() => new Set(isControlledOpenKeys.value ? props.openKeys : [...internalOpenKeys.value]))

watch(
  () => [props.items, props.defaultOpenKeys] as const,
  () => {
    if (isControlledOpenKeys.value) {
      syncActivePathForControlled()
      return
    }

    const nextKeys = normalizeOpenKeys([...(props.defaultOpenKeys ?? []), ...activePathKeys.value])
    internalOpenKeys.value = nextKeys
  },
  { immediate: true }
)

watch(
  () => props.activeKey,
  () => {
    if (isControlledOpenKeys.value) {
      syncActivePathForControlled()
      return
    }

    if (activePathKeys.value.length === 0) {
      return
    }

    setOpenKeys(normalizeOpenKeys([...currentOpenKeys.value, ...activePathKeys.value]))
  }
)

function handleSelect(key: string) {
  emit('select', key)
}

function normalizeMenuItems(items: NavMenuItemType[]): NavMenuItemType[] {
  return items.map((item) => ({
    ...item,
    icon: item.icon && typeof item.icon !== 'string' ? markRaw(toRaw(item.icon)) : item.icon,
    children: item.children ? normalizeMenuItems(item.children) : undefined
  }))
}

function createParentKeyMap(items: NavMenuItemType[], parentKey = '', map = new Map<string, string>()) {
  items.forEach((item) => {
    map.set(item.key, parentKey)

    if (item.children?.length) {
      createParentKeyMap(item.children, item.key, map)
    }
  })

  return map
}

function createChildrenKeyMap(items: NavMenuItemType[], map = new Map<string, string[]>()) {
  items.forEach((item) => {
    map.set(
      item.key,
      item.children?.map((child) => child.key) ?? []
    )

    if (item.children?.length) {
      createChildrenKeyMap(item.children, map)
    }
  })

  return map
}

function findActivePathKeys(items: NavMenuItemType[], activeKey: string, path: string[] = []): string[] {
  if (!activeKey) {
    return []
  }

  for (const item of items) {
    if (item.key === activeKey) {
      return item.children?.length ? [...path, item.key] : path
    }

    if (item.children?.length) {
      const foundPath = findActivePathKeys(item.children, activeKey, [...path, item.key])
      if (foundPath.length) {
        return foundPath
      }
    }
  }

  return []
}

function collectDescendantKeys(key: string, result = new Set<string>()) {
  const children = childrenKeyMap.value.get(key) ?? []

  children.forEach((childKey) => {
    result.add(childKey)
    collectDescendantKeys(childKey, result)
  })

  return result
}

function normalizeOpenKeys(keys: Iterable<string>) {
  const nextKeys = new Set(keys)

  if (props.mode !== 'vertical' || !props.accordion || isCollapsed.value) {
    return nextKeys
  }

  for (const key of [...nextKeys]) {
    const parentKey = parentKeyMap.value.get(key) ?? ''
    const siblingKeys = parentKey
      ? childrenKeyMap.value.get(parentKey) ?? []
      : props.items.map((item) => item.key)
    const openSiblings = siblingKeys.filter((siblingKey) => nextKeys.has(siblingKey))

    if (openSiblings.length <= 1) {
      continue
    }

    const keyToKeep = activePathKeys.value.includes(key) ? key : openSiblings[openSiblings.length - 1]
    openSiblings.forEach((siblingKey) => {
      if (siblingKey !== keyToKeep) {
        nextKeys.delete(siblingKey)
        collectDescendantKeys(siblingKey).forEach((descendantKey) => nextKeys.delete(descendantKey))
      }
    })
  }

  return nextKeys
}

function setOpenKeys(nextKeys: Set<string>) {
  const openKeys = [...nextKeys]

  if (!isControlledOpenKeys.value) {
    internalOpenKeys.value = nextKeys
  }

  emit('update:openKeys', openKeys)
  emit('open-change', openKeys)
}

function syncActivePathForControlled() {
  if (activePathKeys.value.length === 0) {
    return
  }

  const nextKeys = normalizeOpenKeys([...(props.openKeys ?? []), ...activePathKeys.value])
  const nextOpenKeys = [...nextKeys]
  const currentKeys = props.openKeys ?? []

  if (nextOpenKeys.length !== currentKeys.length || nextOpenKeys.some((key) => !currentKeys.includes(key))) {
    emit('update:openKeys', nextOpenKeys)
    emit('open-change', nextOpenKeys)
  }
}

function handleToggleOpen(key: string) {
  if (props.mode !== 'vertical' || isCollapsed.value) {
    return
  }

  const nextKeys = new Set(currentOpenKeys.value)

  if (nextKeys.has(key)) {
    nextKeys.delete(key)
    collectDescendantKeys(key).forEach((descendantKey) => nextKeys.delete(descendantKey))
    setOpenKeys(nextKeys)
    return
  }

  if (props.accordion) {
    const parentKey = parentKeyMap.value.get(key) ?? ''
    const siblingKeys = parentKey
      ? childrenKeyMap.value.get(parentKey) ?? []
      : props.items.map((item) => item.key)

    siblingKeys.forEach((siblingKey) => {
      if (siblingKey !== key) {
        nextKeys.delete(siblingKey)
        collectDescendantKeys(siblingKey).forEach((descendantKey) => nextKeys.delete(descendantKey))
      }
    })
  }

  nextKeys.add(key)
  setOpenKeys(nextKeys)
}

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const navMenuStyleVars = computed<Record<string, string>>(() => {
  const styleVars: Record<string, string> = {
    '--x-nav-menu-text-color': props.textColor,
    '--x-nav-menu-active-text-color': props.activeTextColor,
    '--x-nav-menu-submenu-active-text-color': props.submenuActiveTextColor ?? props.activeTextColor,
    '--x-nav-menu-active-bg-color': props.activeBackgroundColor,
    '--x-nav-menu-active-ancestor-text-color': props.activeAncestorTextColor ?? props.activeBackgroundColor,
    '--x-nav-menu-active-ancestor-bg-color': props.activeAncestorBackgroundColor ?? `color-mix(in srgb, ${props.activeBackgroundColor} 12%, transparent)`,
    '--x-nav-menu-font-size': toCssLength(props.fontSize),
    '--x-nav-menu-font-weight': String(props.fontWeight),
    '--x-nav-menu-active-font-weight': String(props.activeFontWeight),
    '--x-nav-menu-font-family': props.fontFamily,
    '--x-nav-menu-item-gap': toCssLength(props.itemGap),
    '--x-nav-menu-submenu-popup-gap': toCssLength(props.submenuPopupGap)
  }

  if (props.maxHeight !== undefined) {
    styleVars['--x-nav-menu-max-height'] = toCssLength(props.maxHeight)
  }

  if (props.itemRadius !== undefined) {
    styleVars['--x-nav-menu-item-radius'] = toCssLength(props.itemRadius)
  }

  if (props.submenuItemRadius !== undefined) {
    styleVars['--x-nav-menu-submenu-item-radius'] = toCssLength(props.submenuItemRadius)
  }

  return styleVars
})
</script>

<template>
  <nav
    class="x-nav-menu x-scrollbar--native"
    :class="[
      `x-nav-menu--${props.mode}`,
      {
        'is-collapsed': isCollapsed,
        'is-hidden': props.hidden,
        'is-scrollable': props.scrollable
      }
    ]"
    :style="navMenuStyleVars"
  >
    <ul class="x-nav-menu__list">
      <NavMenuItem
        v-for="item in normalizedItems"
        :key="item.key"
        :item="item"
        :active-key="props.activeKey"
        :mode="props.mode"
        :collapsed="isCollapsed"
        :teleported="props.teleported"
        :teleport-to="props.teleportTo"
        :menu-style-vars="navMenuStyleVars"
        :open-keys="currentOpenKeys"
        :show-submenu-arrow="props.showSubmenuArrow"
        :submenu-arrow-icon="props.submenuArrowIcon"
        :submenu-popup-gap="props.submenuPopupGap"
        @select="handleSelect"
        @toggle-open="handleToggleOpen"
      />
    </ul>
  </nav>
</template>
