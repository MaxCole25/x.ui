<script lang="ts">
import { computed, defineComponent, h, type PropType } from 'vue'
import { XButton, XTable, XTooltip, type TableSorter } from 'x.ui'
import { getBaseXConfig, getBaseXTableTheme } from './baseXConfig'
import { createBaseXTableServerSortPayload } from './tableSort'
import { normalizeBaseXSize } from './xSize'
import type { BaseXCrudAction, BaseXCrudActionDisabled, BaseXCrudActionPermissions } from './types'

const actionItems: Array<{
  action: BaseXCrudAction
  label: string
  icon: string
  type?: 'danger'
}> = [
  { action: 'add', label: '新增', icon: 'ri-add-line' },
  { action: 'edit', label: '修改', icon: 'ri-edit-2-line' },
  { action: 'delete', label: '删除', icon: 'ri-delete-bin-6-line', type: 'danger' },
]

export default defineComponent({
  name: 'BaseXTable',
  inheritAttrs: false,
  props: {
    showCrudActions: {
      type: Boolean,
      default: false,
    },
    crudResource: {
      type: String,
      default: '',
    },
    actionPermissions: {
      type: Object as PropType<BaseXCrudActionPermissions>,
      default: () => ({}),
    },
    actionDisabled: {
      type: Object as PropType<BaseXCrudActionDisabled>,
      default: () => ({}),
    },
  },
  emits: ['add', 'edit', 'delete', 'sort-change', 'server-sort-change'],
  setup(props, { attrs, emit, slots }) {
    const resolvedCrudResource = computed(() => {
      if (props.crudResource.trim()) {
        return props.crudResource.trim()
      }

      return getBaseXConfig().getPermissionResource?.() ?? ''
    })

    const visibleActions = computed(() => {
      if (!props.showCrudActions) {
        return []
      }

      return actionItems.filter((item) => canUseAction(item.action))
    })

    function canUseAction(action: BaseXCrudAction) {
      const permission = props.actionPermissions[action]
      if (permission === false) {
        return false
      }
      if (permission === true) {
        return true
      }
      const resource = resolvedCrudResource.value
      const permissionAction = action === 'add' ? 'create' : action === 'edit' ? 'update' : 'delete'
      return getBaseXConfig().canUseAction({
        action,
        permission,
        resource,
        permissionAction,
      })
    }

    function renderCrudActions() {
      if (visibleActions.value.length === 0) {
        return null
      }

      return h(
        'div',
        { class: 'base-x-table__crud-actions' },
        visibleActions.value.map((item) =>
          h(
            XTooltip,
            { key: item.action, content: item.label, placement: 'top' },
            {
              default: () =>
                h(
                  XButton,
                  {
                    class: ['base-x-table__crud-button', { 'base-x-table__crud-button--danger': item.type === 'danger' }],
                    width: 32,
                    height: 32,
                    backgroundColor: item.type === 'danger' ? 'var(--color-danger)' : undefined,
                    activeBackgroundColor: item.type === 'danger' ? 'var(--color-danger)' : undefined,
                    activeBorderColor: item.type === 'danger' ? 'var(--color-danger)' : undefined,
                    disabled: Boolean(props.actionDisabled[item.action]),
                    onClick: () => emit(item.action),
                  },
                  () => h('i', { class: item.icon }),
                ),
            },
          ),
        ),
      )
    }

    function handleSortChange(sorter: TableSorter) {
      emit('sort-change', sorter)
      emit('server-sort-change', createBaseXTableServerSortPayload(sorter))
    }

    return () => {
      const { size, ...restAttrs } = attrs
      const crudActions = renderCrudActions()
      const mergedSlots =
        crudActions || slots.top
          ? {
              ...slots,
              top: (scope: unknown) =>
                slots.top
                  ? h('div', { class: 'base-x-table__top-content' }, slots.top({ ...(scope as Record<string, unknown>), crudActions } as never))
                  : h('div', { class: 'base-x-table__top' }, crudActions ? [crudActions] : []),
            }
          : slots

      return h(
        XTable as never,
        {
          density: 'small',
          cellSelectable: false,
          size: normalizeBaseXSize(size),
          ...getBaseXTableTheme(),
          showSelectionColumn: false,
          ...restAttrs,
          onSortChange: handleSortChange,
        },
        mergedSlots,
      )
    }
  },
})
</script>

<style>
.base-x-table__top {
  align-items: center;
  display: flex;
  flex: 1;
  gap: 12px;
  min-width: 0;
}

.base-x-table__crud-actions {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
}

.base-x-table__crud-button.x-button {
  border-radius: 999px;
  padding: 0;
  min-width: 32px;
}

.base-x-table__crud-actions i {
  font-size: 16px;
  line-height: 1;
}

.base-x-table__top-content {
  display: flex;
  flex: 1;
  min-width: 0;
}

.base-x-table__top-content .x-base-input:has(.table-search),
.base-x-table__top .x-base-input:has(.table-search) {
  flex: 0 0 var(--base-x-table-search-width, 320px);
  width: var(--base-x-table-search-width, 320px);
}

.x-table:focus,
.x-table:focus-visible {
  outline: none;
}

@media (max-width: 760px) {
  .base-x-table__top-content .x-base-input:has(.table-search),
  .base-x-table__top .x-base-input:has(.table-search) {
    flex-basis: 100%;
    width: 100%;
  }
}
</style>
