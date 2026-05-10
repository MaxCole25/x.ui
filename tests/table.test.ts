import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { XTable } from '../src'
import type { TableColumn, TableExpose } from '../src'

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

describe('XTable', () => {
  const columns: TableColumn[] = [
    { key: 'name', label: '名称', searchable: true },
    { key: 'status', label: '状态', type: 'tag', options: [{ label: '启用', value: true, type: 'success' }] },
    { key: 'enabled', label: '启用', type: 'boolean' }
  ]

  const data = [
    { id: 1, name: '工作台', status: true, enabled: true },
    { id: 2, name: '成员管理', status: false, enabled: false }
  ]

  it('renders title and toolbar metrics', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        title: '模块表格',
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()

    expect(wrapper.find('.x-table__title').text()).toBe('模块表格')
    expect(wrapper.text()).toContain('共 2 条')
  })

  it('filters rows by keyword and updates metrics', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await wrapper.find('.x-table__search input').setValue('成员')
    await nextTick()

    expect(wrapper.text()).toContain('成员管理')
    expect(wrapper.text()).toContain('共 1 条')
  })

  it('emits refresh from toolbar button', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false
      }
    })

    const buttons = wrapper.findAll('button')
    const refreshButton = buttons.find((button) => button.attributes('aria-label') === '刷新')
    expect(refreshButton).toBeTruthy()

    await refreshButton!.trigger('click')

    expect(wrapper.emitted('refresh')).toHaveLength(1)
  })

  it('exposes custom cell and row actions slot outlets through table configuration', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showActions: true,
        showPagination: false
      },
      slots: {
        'cell-name': '<template #default="{ row }"><span class="custom-name">{{ row.name }}!</span></template>',
        'row-actions': '<template #default="{ row }"><button class="row-action">编辑 {{ row.id }}</button></template>'
      }
    })

    await nextTick()

    expect(wrapper.props('showActions')).toBe(true)
    expect(wrapper.vm.$slots['cell-name']).toBeTruthy()
    expect(wrapper.vm.$slots['row-actions']).toBeTruthy()
  })

  it('emits row double click only from non-editable cells', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'name', label: '名称' },
          { key: 'enabled', label: '启用', editorType: 'input', editable: true }
        ],
        data,
        editable: true,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    const cells = wrapper.findAll('.x-table__cell')
    await cells[0].trigger('dblclick')
    await cells[1].trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')).toHaveLength(1)
    expect(wrapper.find('.x-table__editor-input').exists()).toBe(true)
  })

  it('keeps editable cells readonly until double click', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [{ key: 'name', label: '名称', editorType: 'input', editable: true }],
        data,
        editable: true,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    const cell = wrapper.find('.x-table__cell')
    expect(wrapper.find('.x-table__editor-input').exists()).toBe(false)

    await cell.trigger('click')
    expect(wrapper.find('.x-table__editor-input').exists()).toBe(false)

    await cell.trigger('dblclick')
    expect(wrapper.find('.x-table__editor-input').exists()).toBe(true)
  })

  it('fills selected editable cells when pasting one value', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [{ key: 'name', label: '名称', editorType: 'input', editable: true }],
        data,
        editable: true,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false,
        'onUpdate:data': vi.fn()
      }
    })

    await nextTick()
    await nextTick()
    const cells = wrapper.findAll('.x-table__cell')
    await cells[0].trigger('mousedown', { button: 0 })
    await cells[1].trigger('mouseenter')
    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(wrapper.findAll('td.x-table__selected-td')).toHaveLength(2)
    expect(wrapper.findAll('td.x-table__selection-edge-top')).toHaveLength(1)
    expect(wrapper.findAll('td.x-table__selection-edge-bottom')).toHaveLength(1)
    expect(wrapper.findAll('td.x-table__selection-edge-left')).toHaveLength(2)
    expect(wrapper.findAll('td.x-table__selection-edge-right')).toHaveLength(2)

    await wrapper.find('.x-table__shell').trigger('paste', {
      clipboardData: {
        getData: () => '批量值'
      },
      preventDefault: vi.fn()
    })
    await nextTick()

    const updateEvents = wrapper.emitted('update:data')
    expect(updateEvents).toBeTruthy()
    const latestRows = updateEvents?.[updateEvents.length - 1]?.[0] as Array<Record<string, unknown>>
    expect(latestRows.map((row) => row.name)).toEqual(['批量值', '批量值'])
  })

  it('selects entire rows when selectionMode is row', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [
          { key: 'name', label: '名称' },
          { key: 'enabled', label: '启用' }
        ],
        data,
        selectionMode: 'row',
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    const cells = wrapper.findAll('.x-table__cell')
    await cells[0].trigger('mousedown', { button: 0 })
    await cells[2].trigger('mouseenter')
    document.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.findAll('td.x-table__selected-td')).toHaveLength(4)
    expect(wrapper.findAll('td.x-table__selection-edge-top')).toHaveLength(2)
    expect(wrapper.findAll('td.x-table__selection-edge-bottom')).toHaveLength(2)
    expect(wrapper.findAll('td.x-table__selection-edge-left')).toHaveLength(2)
    expect(wrapper.findAll('td.x-table__selection-edge-right')).toHaveLength(2)
  })

  it('selects cells from Element Plus table cell padding area', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [
          { key: 'name', label: '名称' },
          { key: 'enabled', label: '启用' }
        ],
        data,
        selectable: false,
        showIndex: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    await wrapper.find('td.el-table__cell').trigger('click')

    expect(wrapper.findAll('td.x-table__selected-td')).toHaveLength(1)
  })

  it('emits row double click from Element Plus table cell padding area', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [{ key: 'name', label: '名称' }],
        data,
        selectable: false,
        showIndex: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    await wrapper.find('td.el-table__cell').trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')).toHaveLength(1)
  })

  it('resizes selected cells from the selection handle', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [{ key: 'name', label: '名称' }],
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    const cells = wrapper.findAll('.x-table__cell')
    await cells[0].trigger('mousedown', { button: 0 })
    await cells[1].trigger('mouseenter')
    document.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.find('.x-table__selection-handle').exists()).toBe(true)
    expect(wrapper.findAll('td.x-table__selected-td')).toHaveLength(2)

    await wrapper.find('.x-table__selection-handle').trigger('mousedown', { button: 0 })
    await cells[0].trigger('mouseenter')
    document.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.findAll('td.x-table__selected-td')).toHaveLength(1)
  })

  it('applies column align to the inner cell content wrapper', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns: [
          { key: 'name', label: '名称', align: 'center' },
          { key: 'enabled', label: '启用', align: 'right' }
        ],
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    await nextTick()
    const cells = wrapper.findAll('.x-table__cell')

    expect(cells[0].classes()).toContain('x-table__cell--center')
    expect(cells[1].classes()).toContain('x-table__cell--right')
  })

  it('exposes density for loose standard and compact table sizes', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns,
        data,
        density: 'large',
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    await nextTick()
    expect(wrapper.find('.x-table__body').classes()).toContain('el-table--large')

    await wrapper.setProps({ density: 'small' })
    await nextTick()
    expect(wrapper.find('.x-table__body').classes()).toContain('el-table--small')
  })

  it('exposes runtime column settings for backend persistence', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })

    const table = wrapper.vm as unknown as TableExpose
    table.setColumnSettings([
      { key: 'status', visible: true, order: 0, fixed: 'left', widthRatio: 2, width: 220 },
      { key: 'name', visible: false, order: 1 },
      { key: 'enabled', visible: true, order: 2, fixed: 'right', widthRatio: 1 }
    ])
    await nextTick()

    expect(table.getColumnSettings()).toEqual([
      { key: 'status', visible: true, order: 0, fixed: 'left', widthRatio: 2, width: 220 },
      { key: 'name', visible: false, order: 1, fixed: undefined, widthRatio: undefined, width: undefined },
      { key: 'enabled', visible: true, order: 2, fixed: 'right', widthRatio: 1, width: undefined }
    ])
    expect(table.getStoredState().columnSettings?.[0]).toMatchObject({
      key: 'status',
      fixed: 'left',
      widthRatio: 2,
      width: 220
    })
  })

  it('updates column widths from the cell context menu', async () => {
    const wrapper = mount(XTable, {
      attachTo: document.body,
      props: {
        columns,
        data,
        selectable: false,
        draggableRows: false,
        draggableColumns: false,
        showPagination: false
      }
    })
    await nextTick()
    await nextTick()

    const table = wrapper.vm as unknown as TableExpose
    const firstCell = wrapper.find('.x-table__cell')
    await firstCell.trigger('contextmenu', { clientX: 20, clientY: 30 })
    const autoWidthButton = wrapper.findAll('.x-table__context-menu button').find((button) => button.text() === '自适应内容宽度')
    expect(autoWidthButton).toBeTruthy()
    await autoWidthButton!.trigger('click')

    expect(table.getColumnSettings().every((setting) => typeof setting.width === 'number')).toBe(true)

    await firstCell.trigger('contextmenu', { clientX: 20, clientY: 30 })
    const ratioButton = wrapper.findAll('.x-table__context-menu button').find((button) => button.text() === '比例适合表格总宽度')
    expect(ratioButton).toBeTruthy()
    await ratioButton!.trigger('click')

    const settings = table.getColumnSettings()
    expect(settings.every((setting) => setting.width === undefined)).toBe(true)
    expect(settings.every((setting) => typeof setting.widthRatio === 'number')).toBe(true)
  })
})
