import type { DataTableSettingsAdapter, DataTableSettingsColumnMeta, DataTableSettingsDataSourceOption, DataTableSettingsProps, DataTableSettingsRow, DataTableSettingsTable } from '../other-components/data-table-settings/src/types'

/** 每次恢复默认创建独立的模拟保存数据和适配器。 */
export function createDataTableSettingsScene() {
  const tables: DataTableSettingsTable[] = [
    {
      tableKey: 'contracts',
      label: '合同信息',
      physicalTableName: 'SjHeTongXinXiSet',
      modelName: 'ContractInfo',
      group: 'Business',
      businessKeys: [{ key: 'contractNumber', label: '合同编号' }]
    },
    {
      tableKey: 'customers',
      label: '客户信息',
      physicalTableName: 'SjKeHuXinXiSet',
      modelName: 'CustomerInfo',
      group: 'Business',
      businessKeys: [{ key: 'customerId', label: '客户ID' }]
    }
  ]
  const columnsByTable: Record<string, DataTableSettingsColumnMeta[]> = {
    contracts: [
      { key: 'contractNumber', label: '合同编号', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
      { key: 'contractDate', label: '合同日期', type: 'date', editType: 'date', align: 'center', sortOrder: 20 },
      { key: 'customerId', label: '客户ID', type: 'number', editType: 'autocomplete', dataSourceKey: 'customers', align: 'right', sortOrder: 30 },
      { key: 'contractAmount', label: '合同金额', type: 'number', editType: 'input', align: 'right', sortOrder: 40 }
    ],
    customers: [
      { key: 'customerId', label: '客户ID', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
      { key: 'name', label: '客户名称', type: 'text', editType: 'input', isSortable: true, align: 'left', sortOrder: 20 },
      { key: 'industry', label: '行业', type: 'tag', editType: 'select', dataSourceKey: 'industries', align: 'left', sortOrder: 30 }
    ]
  }
  const settingsByTable: Record<string, DataTableSettingsRow[]> = {
    contracts: [
      { columnKey: 'contractNumber', columnLabel: '合同编号', displayType: 'number', editType: 'input', dataSourceKey: '', isKey: true, keyType: 'primary', isHidden: false, isSortable: true, align: 'right', defaultFormatter: '', sortOrder: 10 },
      { columnKey: 'contractDate', columnLabel: '签订日期', displayType: 'date', editType: 'date', dataSourceKey: '', isKey: false, keyType: '', isHidden: false, isSortable: true, align: 'center', defaultFormatter: '', sortOrder: 20 },
      { columnKey: 'customerId', columnLabel: '客户', displayType: 'text', editType: 'autocomplete', dataSourceKey: 'customers', isKey: true, keyType: 'normal', isHidden: false, isSortable: false, align: 'left', defaultFormatter: '', sortOrder: 30 },
      { columnKey: 'contractAmount', columnLabel: '合同金额', displayType: 'number', editType: 'input', dataSourceKey: '', isKey: false, keyType: '', isHidden: false, isSortable: true, align: 'right', defaultFormatter: '(value) => `￥${value}`', sortOrder: 40 }
    ],
    customers: []
  }
  const dataSources: DataTableSettingsDataSourceOption[] = [
    { key: 'customers', label: '客户字典', name: '客户字典', valueCount: 128 },
    { key: 'industries', label: '行业分类', name: '行业分类', valueCount: 12 }
  ]
  const adapter: DataTableSettingsAdapter = {
    async loadTables() {
      return structuredClone(tables)
    },
    async loadColumns(table) {
      return structuredClone(columnsByTable[table.tableKey] ?? [])
    },
    async loadSettings(table) {
      return structuredClone(settingsByTable[table.tableKey] ?? [])
    },
    async loadDataSources() {
      return structuredClone(dataSources)
    },
    async saveSettings(table, rows) {
      settingsByTable[table.tableKey] = structuredClone(rows)
      return { ok: true }
    }
  }

  return { adapter, saveButtonText: '保存配置' } satisfies DataTableSettingsProps
}
