import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { XDataTableSettings } from '../src'
import type {
  DataTableSettingsAdapter,
  DataTableSettingsColumnMeta,
  DataTableSettingsProps,
  DataTableSettingsRow,
  DataTableSettingsTable
} from '../src'

describe('XDataTableSettings', () => {
  const tables: DataTableSettingsTable[] = [
    { tableKey: 'contracts', label: '合同信息', physicalTableName: 'SjHeTongXinXiSet', modelName: 'ContractInfo' },
    { tableKey: 'customers', label: '客户信息', physicalTableName: 'SjKeHuXinXiSet', modelName: 'CustomerInfo' }
  ]

  const columnsByTable: Record<string, DataTableSettingsColumnMeta[]> = {
    contracts: [
      { key: 'contractNumber', label: '合同编号', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
      { key: 'customerId', label: '客户ID', type: 'number', editType: 'autocomplete', dataSourceKey: 'customers', align: 'right', sortOrder: 20 }
    ],
    customers: [
      { key: 'customerId', label: '客户ID', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
      { key: 'name', label: '客户名称', type: 'text', editType: 'input', align: 'left', sortOrder: 20 }
    ]
  }

  const contractSettings: DataTableSettingsRow[] = [
    { columnKey: 'contractNumber', columnLabel: '合同编号', displayType: 'number', editType: 'input', dataSourceKey: 'should-clear', isKey: true, keyType: 'primary', isHidden: true, isSortable: true, align: 'right', defaultFormatter: '', sortOrder: 10 },
    { columnKey: 'customerId', columnLabel: '客户', displayType: 'text', editType: 'autocomplete', dataSourceKey: 'customers', isKey: true, keyType: 'normal', isHidden: false, isSortable: false, align: 'left', defaultFormatter: '', sortOrder: 20 }
  ]

  function createAdapter() {
    const adapter: DataTableSettingsAdapter = {
      loadTables: vi.fn(() => tables),
      loadColumns: vi.fn((table) => columnsByTable[table.tableKey] ?? []),
      loadSettings: vi.fn((table) => table.tableKey === 'contracts' ? contractSettings : []),
      loadDataSources: vi.fn(() => [{ key: 'customers', label: '客户字典', valueCount: 12 }]),
      saveSettings: vi.fn(() => ({ ok: true }))
    }
    return adapter
  }

  async function mountSettings(adapter = createAdapter(), props: Partial<DataTableSettingsProps> = {}) {
    const wrapper = mount(XDataTableSettings, {
      props: {
        adapter,
        height: 420,
        ...props
      }
    })
    await flushPromises()
    await nextTick()
    return wrapper
  }

  async function openSelectDropdown(select: ReturnType<ReturnType<typeof mount>['findComponent']>) {
    await select.find('.x-select__control').trigger('click')
    await nextTick()
    await new Promise((resolve) => window.requestAnimationFrame(resolve))
    await nextTick()

    const dropdown = Array.from(document.body.querySelectorAll<HTMLElement>('.x-select__dropdown.is-teleported'))
      .find((item) => item.style.display !== 'none')

    expect(dropdown).toBeDefined()
    return dropdown as HTMLElement
  }

  function findSelectByValue(wrapper: Awaited<ReturnType<typeof mountSettings>>, value: string) {
    const select = wrapper.findAllComponents({ name: 'XSelect' })
      .find((item) => item.props('modelValue') === value)

    expect(select).toBeDefined()
    return select!
  }

  it('loads tables then selects the first table and loads its settings', async () => {
    const adapter = createAdapter()
    const wrapper = await mountSettings(adapter)

    expect(adapter.loadTables).toHaveBeenCalledTimes(1)
    expect(adapter.loadDataSources).toHaveBeenCalledTimes(1)
    expect(adapter.loadColumns).toHaveBeenCalledWith(tables[0])
    expect(adapter.loadSettings).toHaveBeenCalledWith(tables[0])
    expect(wrapper.emitted('loaded')?.[0]?.[0]).toMatchObject({
      table: expect.objectContaining({ tableKey: 'contracts' }),
      rows: expect.arrayContaining([
        expect.objectContaining({ columnKey: 'contractNumber' }),
        expect.objectContaining({ columnKey: 'customerId' })
      ])
    })
  })

  it('keeps the toolbar save button content-sized on desktop layouts', async () => {
    const wrapper = await mountSettings()
    const saveButton = wrapper.findAllComponents({ name: 'XButton' }).find((item) => item.text() === '保存配置')

    expect(saveButton).toBeDefined()
    expect(saveButton?.classes()).toContain('x-data-table-settings__save-button')
    expect(saveButton?.attributes('style')).toContain('--x-button-width: auto')
  })

  it('exposes theme color props for the shell, table, controls and save button', async () => {
    const wrapper = await mountSettings(createAdapter(), {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      borderColor: '#d7e3f0',
      metaTextColor: '#64748b',
      headerBackgroundColor: '#f3f7fb',
      headerTextColor: '#1e293b',
      bodyBackgroundColor: '#fefefe',
      bodyStripeBackgroundColor: '#f8fafc',
      bodyTextColor: '#111827',
      controlBackgroundColor: '#f9fafb',
      controlTextColor: '#0f172a',
      controlBorderColor: '#cbd5e1',
      dropdownBackgroundColor: '#ffffff',
      saveButtonBackgroundColor: '#1264f4',
      saveButtonTextColor: '#ffffff',
      saveButtonBorderColor: '#1264f4',
      saveButtonActiveBackgroundColor: '#0f56d9',
      saveButtonActiveBorderColor: '#0f56d9',
      saveButtonActiveTextColor: '#ffffff'
    })

    const rootStyle = wrapper.attributes('style')
    expect(rootStyle).toContain('--x-data-table-settings-bg: #ffffff')
    expect(rootStyle).toContain('--x-data-table-settings-text: #0f172a')
    expect(rootStyle).toContain('--x-data-table-settings-border-color: #d7e3f0')
    expect(rootStyle).toContain('--x-data-table-settings-meta-text: #64748b')

    expect(wrapper.findComponent({ name: 'XTable' }).props()).toMatchObject({
      panelBackgroundColor: '#ffffff',
      headerBackgroundColor: '#f3f7fb',
      headerTextColor: '#1e293b',
      bodyBackgroundColor: '#fefefe',
      bodyStripeBackgroundColor: '#f8fafc',
      bodyTextColor: '#111827',
      borderColor: '#d7e3f0'
    })

    expect(wrapper.findComponent({ name: 'XSelect' }).props()).toMatchObject({
      backgroundColor: '#f9fafb',
      textColor: '#0f172a',
      borderColor: '#cbd5e1',
      dropdownBackgroundColor: '#ffffff'
    })

    const saveButton = wrapper.findAllComponents({ name: 'XButton' }).find((item) => item.text() === '保存配置')
    expect(saveButton?.props()).toMatchObject({
      backgroundColor: '#1264f4',
      textColor: '#ffffff',
      borderColor: '#1264f4',
      activeBackgroundColor: '#0f56d9',
      activeBorderColor: '#0f56d9',
      activeTextColor: '#ffffff'
    })
  })

  it('teleports table cell dropdowns so they are not clipped by the table viewport', async () => {
    const wrapper = await mountSettings()

    const editTypeDropdown = await openSelectDropdown(findSelectByValue(wrapper, 'input'))
    expect(editTypeDropdown.classList.contains('is-teleported')).toBe(true)
    expect(wrapper.element.contains(editTypeDropdown)).toBe(false)
    expect(editTypeDropdown.textContent).toContain('输入框')

    await findSelectByValue(wrapper, 'input').find('.x-select__control').trigger('click')
    await nextTick()

    const dataSourceDropdown = await openSelectDropdown(findSelectByValue(wrapper, 'customers'))
    expect(dataSourceDropdown.classList.contains('is-teleported')).toBe(true)
    expect(wrapper.element.contains(dataSourceDropdown)).toBe(false)
    expect(dataSourceDropdown.textContent).toContain('客户字典（12项）')

    wrapper.unmount()
  })

  it('loads another table when selected programmatically', async () => {
    const adapter = createAdapter()
    const wrapper = await mountSettings(adapter)

    await (wrapper.vm as unknown as { setSelectedTableKey: (key: string) => Promise<void> }).setSelectedTableKey('customers')
    await flushPromises()

    expect(adapter.loadColumns).toHaveBeenLastCalledWith(tables[1])
    expect(adapter.loadSettings).toHaveBeenLastCalledWith(tables[1])
    const tableChangeEvents = wrapper.emitted('table-change') ?? []
    expect(tableChangeEvents[tableChangeEvents.length - 1]?.[0]).toMatchObject({ tableKey: 'customers' })
  })

  it('saves normalized rows and keeps key columns visible', async () => {
    const adapter = createAdapter()
    const wrapper = await mountSettings(adapter)

    await (wrapper.vm as unknown as { save: () => Promise<void> }).save()

    const savedRows = vi.mocked(adapter.saveSettings).mock.calls[0][1]
    expect(savedRows[0]).toMatchObject({
      columnKey: 'contractNumber',
      isKey: true,
      keyType: 'primary',
      isHidden: false,
      dataSourceKey: ''
    })
    expect(savedRows[1]).toMatchObject({
      columnKey: 'customerId',
      dataSourceKey: 'customers'
    })
  })

  it('persists edited values through saveSettings', async () => {
    const adapter = createAdapter()
    const wrapper = await mountSettings(adapter)
    const firstInput = wrapper.findComponent({ name: 'XInput' })

    firstInput.vm.$emit('update:modelValue', '合同号')
    await nextTick()
    await (wrapper.vm as unknown as { save: () => Promise<void> }).save()

    const savedRows = vi.mocked(adapter.saveSettings).mock.calls[0][1]
    expect(savedRows[0].columnLabel).toBe('合同号')
  })

  it('recalculates sortOrder after row dragging', async () => {
    const adapter = createAdapter()
    const wrapper = await mountSettings(adapter)
    const rows = (wrapper.vm as unknown as { getRows: () => DataTableSettingsRow[] }).getRows()

    wrapper.findComponent({ name: 'XTable' }).vm.$emit('row-reorder', {
      row: rows[0],
      rows: [rows[1], rows[0]],
      fromIndex: 0,
      toIndex: 1,
      targetRow: rows[1],
      position: 'after'
    })
    await nextTick()
    await (wrapper.vm as unknown as { save: () => Promise<void> }).save()

    const savedRows = vi.mocked(adapter.saveSettings).mock.calls[0][1]
    expect(savedRows.map((row) => [row.columnKey, row.sortOrder])).toEqual([
      ['customerId', 10],
      ['contractNumber', 20]
    ])
  })
})
