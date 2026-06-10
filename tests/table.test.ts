import { flushPromises, mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { h, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import * as XLSX from 'xlsx'
import { XAutocomplete, XSelect, XTable } from '../src'
import type { TableColumn } from '../src'

describe('XTable', () => {
  const columns: TableColumn[] = [
    { key: 'name', label: '名称', minWidth: 160 },
    { key: 'status', label: '状态', width: 120 },
    { key: 'count', label: '数量', width: 96, align: 'right', formatter: (value) => `${value} 个` }
  ]

  const data = [
    { id: 1, name: '工作台', status: '启用', count: 12 },
    { id: 2, name: '成员管理', status: '停用', count: 5 }
  ]

  function readTableSource() {
    return readFileSync(resolve(__dirname, '../src/components/display-components/table/src/Table.vue'), 'utf8').replace(/\r\n/g, '\n')
  }

  function readGlobalStyles() {
    return readFileSync(resolve(__dirname, '../src/styles/index.css'), 'utf8').replace(/\r\n/g, '\n')
  }

  function getCssRule(source: string, selector: string) {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const match = source.match(new RegExp(`${escapedSelector}\\s*\\{[\\s\\S]*?\\n\\}`))
    return match?.[0] ?? ''
  }

  function mountWithHost(options: Parameters<typeof mount<typeof XTable>>[1]) {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mount(XTable, {
      ...options,
      attachTo: host
    })

    return {
      host,
      wrapper,
      cleanup: () => {
        wrapper.unmount()
        host.remove()
      }
    }
  }

  function mockClipboard(text = '') {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
    const clipboard = {
      readText: vi.fn().mockResolvedValue(text),
      writeText: vi.fn().mockResolvedValue(undefined)
    }

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: clipboard
    })

    return {
      clipboard,
      restore: () => {
        if (original) {
          Object.defineProperty(navigator, 'clipboard', original)
        } else {
          delete (navigator as unknown as { clipboard?: Clipboard }).clipboard
        }
      }
    }
  }

  async function waitForPositionedDropdown(selector: string) {
    await nextTick()
    await new Promise((resolve) => window.requestAnimationFrame(resolve))
    await nextTick()

    const dropdown = Array.from(document.body.querySelectorAll<HTMLElement>(selector))
      .find((item) => item.style.display !== 'none')

    expect(dropdown).toBeDefined()
    return dropdown as HTMLElement
  }

  it('renders headers and rows', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    expect(wrapper.findAll('.x-table__cell--header').map((cell) => cell.text())).toEqual(['名称', '状态', '数量'])
    expect(wrapper.text()).toContain('工作台')
    expect(wrapper.text()).toContain('成员管理')
  })

  it('renders empty text when data is empty', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data: [],
        emptyText: '没有数据'
      }
    })

    expect(wrapper.find('.x-table__empty').text()).toBe('没有数据')
  })

  it('formats cell values with column formatter', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    expect(wrapper.text()).toContain('12 个')
    expect(wrapper.text()).toContain('5 个')
  })

  it('renders valueGetter columns and passes computed values to formatters and cell slots', () => {
    const formatter = vi.fn((value: unknown) => `合计 ${value}`)
    const computedColumns: TableColumn[] = [
      ...columns,
      {
        key: 'total',
        label: '合计',
        valueGetter: (row) => Number(row.count) * 2,
        formatter
      }
    ]
    const wrapper = mount(XTable, {
      props: {
        columns: computedColumns,
        data
      }
    })

    expect(wrapper.text()).toContain('合计 24')
    expect(formatter).toHaveBeenCalledWith(24, data[0])

    const slotWrapper = mount(XTable, {
      props: {
        columns: computedColumns,
        data
      },
      slots: {
        'cell-total': '<template #default="{ value }"><span class="computed-total">{{ value }}</span></template>'
      }
    })

    expect(slotWrapper.find('.computed-total').text()).toBe('24')
  })

  it('renders summary rows with sum avg custom aggregators and summary slots', () => {
    const summaryColumns: TableColumn[] = [
      ...columns,
      {
        key: 'total',
        label: '合计',
        valueGetter: (row) => Number(row.count) * 2,
        formatter: (value) => `￥${value}`
      }
    ]
    const wrapper = mount(XTable, {
      props: {
        columns: summaryColumns,
        data,
        summaryRow: {
          label: '汇总',
          cells: {
            status: (rows) => `${rows.length} 项`,
            count: 'sum',
            total: 'avg'
          }
        }
      },
      slots: {
        'summary-total': '<template #default="{ value, rows, context }"><span class="summary-total">平均 {{ value }} / {{ rows.length }} / {{ context.scope }}</span></template>'
      }
    })

    const cells = wrapper.find('.x-table__row--summary').findAll('.x-table__cell')
    const bodyRows = wrapper.findAll('.x-table__row--body')

    expect(cells.map((cell) => cell.text())).toEqual(['汇总', '2 项', '17 个', '平均 17 / 2 / visible'])
    expect(bodyRows[bodyRows.length - 1].classes()).toContain('is-before-summary')
  })

  it('maps align width and minWidth to resolved grid and cell styles', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    const firstRow = wrapper.find('.x-table__row--body')
    expect(firstRow.attributes('style')).toContain('160px 120px 96px')

    const countCell = firstRow.findAll('.x-table__cell')[2]
    expect(countCell.attributes('style')).toContain('justify-content: flex-end')
    expect(countCell.attributes('style')).toContain('text-align: right')
  })

  it('normalizes numeric string column widths before writing grid tracks', () => {
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'name', label: '名称', minWidth: '120' },
          { key: 'status', label: '状态', width: '120' },
          { key: 'count', label: '数量', width: '96px' }
        ],
        data
      }
    })

    const gridStyle = wrapper.find('.x-table__row--body').attributes('style')

    expect(gridStyle).toContain('grid-template-columns: 120px 120px 96px')
    expect(gridStyle).not.toContain(' 120 120 ')
  })

  it('normalizes numeric string actionsWidth before writing grid tracks', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showActions: true,
        actionsWidth: '170'
      }
    })

    const gridStyle = wrapper.find('.x-table__row--body').attributes('style')

    expect(gridStyle).toContain('grid-template-columns: 160px 120px 96px 170px')
    expect(gridStyle).not.toContain(' 170;')
  })

  it('keeps numeric and unit-bearing actionsWidth values valid in grid tracks', () => {
    const numericWrapper = mount(XTable, {
      props: {
        columns,
        data,
        showActions: true,
        actionsWidth: 170
      }
    })
    const unitWrapper = mount(XTable, {
      props: {
        columns,
        data,
        showActions: true,
        actionsWidth: '170px'
      }
    })

    expect(numericWrapper.find('.x-table__row--body').attributes('style')).toContain('160px 120px 96px 170px')
    expect(unitWrapper.find('.x-table__row--body').attributes('style')).toContain('160px 120px 96px 170px')
  })

  it('renders top and bottom slots with columns and data scope', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      },
      slots: {
        top: '<template #default="{ columns, data }"><div class="custom-top">列 {{ columns.length }} / 行 {{ data.length }}</div></template>',
        bottom: '<template #default="{ data }"><div class="custom-bottom">共 {{ data.length }} 条</div></template>'
      }
    })

    expect(wrapper.find('.custom-top').text()).toBe('列 3 / 行 2')
    expect(wrapper.find('.custom-bottom').text()).toBe('共 2 条')
  })

  it('applies public background colors to top and bottom slot panels', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        topBackgroundColor: '#f0f9ff',
        bottomBackgroundColor: 'rgb(240, 253, 244)'
      },
      slots: {
        top: '<div class="custom-top">表顶</div>',
        bottom: '<div class="custom-bottom">表底</div>'
      }
    })

    const style = wrapper.find('.x-table').attributes('style')
    expect(style).toContain('--x-table-top-background: #f0f9ff')
    expect(style).toContain('--x-table-bottom-background: rgb(240, 253, 244)')
    expect(wrapper.find('.x-table__top').exists()).toBe(true)
    expect(wrapper.find('.x-table__bottom').exists()).toBe(true)

    const source = readTableSource()
    expect(source).toContain('background: var(--x-table-top-background, transparent);')
    expect(source).toContain('background: var(--x-table-bottom-background, transparent);')
  })

  it('keeps top and bottom slot backgrounds transparent by default', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      },
      slots: {
        top: '<div class="custom-top">表顶</div>',
        bottom: '<div class="custom-bottom">表底</div>'
      }
    })
    const style = wrapper.find('.x-table').attributes('style') ?? ''
    const source = readTableSource()
    const globalStyles = readGlobalStyles()

    expect(style).not.toContain('--x-table-top-background')
    expect(style).not.toContain('--x-table-bottom-background')
    expect(source).toContain('background: var(--x-table-top-background, transparent);')
    expect(source).toContain('background: var(--x-table-bottom-background, transparent);')
    expect(globalStyles).toContain('--x-table-top-background: transparent;')
    expect(globalStyles).toContain('--x-table-bottom-background: transparent;')
  })

  it('uses panel background as explicit top and bottom background fallback', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        panelBackgroundColor: '#0f172a'
      },
      slots: {
        top: '<div class="custom-top">表顶</div>',
        bottom: '<div class="custom-bottom">表底</div>'
      }
    })
    const style = wrapper.find('.x-table').attributes('style') ?? ''

    expect(style).toContain('--x-table-panel-background: #0f172a')
    expect(style).toContain('--x-table-top-background: #0f172a')
    expect(style).toContain('--x-table-bottom-background: #0f172a')
  })

  it('uses theme table tokens when appearance props are omitted', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })
    const style = wrapper.find('.x-table').attributes('style') ?? ''
    const source = readTableSource()

    expect(style).not.toContain('--x-table-body-stripe-background')
    expect(source).toContain('--x-table-border-color: var(--x-color-border, rgb(216 224 234));')
    expect(source).toContain('background: var(--x-table-body-background, var(--x-color-surface, #fff));')
    expect(source).toContain('color: var(--x-table-text-color, var(--x-color-text, #1f2937));')
    expect(source).toContain('color: var(--x-table-body-text-color, var(--x-table-text-color, var(--x-color-text, #1f2937)));')
  })

  it('exposes table area colors and border styles through public props', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        panelBackgroundColor: '#0f172a',
        headerBackgroundColor: '#e0f2fe',
        headerTextColor: '#0f172a',
        bodyBackgroundColor: '#ffffff',
        bodyStripeBackgroundColor: '#f8fafc',
        bodyTextColor: '#1f2937',
        selectedCellBackgroundColor: 'rgba(59, 130, 246, 0.22)',
        selectedCellTextColor: '#f8fafc',
        selectedCellBorderColor: '#60a5fa',
        selectedCellInnerBorderColor: 'rgba(96, 165, 250, 0.56)',
        borderColor: '#334155',
        viewportBorderColor: '#64748b',
        headerDividerColor: '#38bdf8',
        rowBorderColor: '#1d4ed8',
        columnBorderColor: '#7c3aed',
        horizontalBorderColor: '#bfdbfe',
        horizontalBorderWidth: 2,
        verticalBorderColor: '#cbd5e1',
        verticalBorderWidth: '3px'
      }
    })

    const style = wrapper.find('.x-table').attributes('style')
    expect(style).toContain('--x-table-panel-background: #0f172a')
    expect(style).toContain('--x-table-header-background: #e0f2fe')
    expect(style).toContain('--x-table-header-text-color: #0f172a')
    expect(style).toContain('--x-table-body-background: #ffffff')
    expect(style).toContain('--x-table-body-stripe-background: #f8fafc')
    expect(style).toContain('--x-table-body-text-color: #1f2937')
    expect(style).toContain('--x-table-cell-selected-background: rgba(59, 130, 246, 0.22)')
    expect(style).toContain('--x-table-cell-selected-text-color: #f8fafc')
    expect(style).toContain('--x-table-cell-selected-border-color: #60a5fa')
    expect(style).toContain('--x-table-cell-selected-inner-border-color: rgba(96, 165, 250, 0.56)')
    expect(style).toContain('--x-table-border-color: #334155')
    expect(style).toContain('--x-table-viewport-border-color: #64748b')
    expect(style).toContain('--x-table-header-divider-color: #38bdf8')
    expect(style).toContain('--x-table-row-border-color: #1d4ed8')
    expect(style).toContain('--x-table-column-border-color: #7c3aed')
    expect(style).toContain('--x-table-horizontal-border-color: #bfdbfe')
    expect(style).toContain('--x-table-horizontal-border-width: 2px')
    expect(style).toContain('--x-table-vertical-border-color: #cbd5e1')
    expect(style).toContain('--x-table-vertical-border-width: 3px')
  })

  it('lets rowHeight override size row height without resizing controls', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        size: 'sm',
        rowHeight: 40,
        showActions: true,
        showPagination: true
      }
    })

    const style = wrapper.find('.x-table').attributes('style')
    expect(style).toContain('--x-table-row-height: 40px')
    expect(style).toContain('--x-table-control-height: 22px')
    expect(style).toContain('--x-table-font-size: 10px')
    expect(style).toContain('--x-table-cell-padding: 0 4px')
  })

  it('keeps custom rowHeight css length strings intact', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        rowHeight: '2.5rem'
      }
    })

    expect(wrapper.find('.x-table').attributes('style')).toContain('--x-table-row-height: 2.5rem')
  })

  it('treats empty rowHeight strings as omitted values', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        size: 'lg',
        rowHeight: ''
      }
    })

    expect(wrapper.find('.x-table').attributes('style')).toContain('--x-table-row-height: 38px')
  })

  it('preserves transparent viewport and custom header divider colors on the root variables', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        viewportBorderColor: 'transparent',
        headerDividerColor: 'rgba(148, 163, 184, 0.1)',
        rowBorderColor: 'rgba(148, 163, 184, 0.14)',
        columnBorderColor: 'rgba(148, 163, 184, 0.08)',
        horizontalBorderColor: '#ffffff',
        verticalBorderColor: '#ffffff'
      }
    })

    const style = wrapper.find('.x-table').attributes('style')
    expect(style).toContain('--x-table-viewport-border-color: transparent')
    expect(style).toContain('--x-table-header-divider-color: rgba(148, 163, 184, 0.1)')
    expect(style).toContain('--x-table-row-border-color: rgba(148, 163, 184, 0.14)')
    expect(style).toContain('--x-table-column-border-color: rgba(148, 163, 184, 0.08)')
  })

  it('merges external style variables with table style variables', () => {
    const wrapper = mount(XTable, {
      attrs: {
        style: {
          '--x-table-horizontal-border-color': '#111827',
          '--x-table-vertical-border-color': '#1f2937',
          '--x-table-custom-token': '#020617'
        }
      },
      props: {
        columns,
        data,
        borderColor: '#334155'
      }
    })

    const style = wrapper.find('.x-table').attributes('style')
    expect(style).toContain('--x-table-horizontal-border-color: #111827')
    expect(style).toContain('--x-table-vertical-border-color: #1f2937')
    expect(style).toContain('--x-table-custom-token: #020617')
    expect(style).toContain('--x-table-border-color: #334155')
  })

  it('keeps selected cell colors configurable through props and external CSS variables', () => {
    const wrapper = mount(XTable, {
      attrs: {
        style: {
          '--x-table-cell-selected-background': 'rgba(34, 197, 94, 0.18)',
          '--x-table-cell-selected-text-color': '#dcfce7',
          '--x-table-cell-selected-border-color': '#22c55e',
          '--x-table-cell-selected-inner-border-color': 'rgba(34, 197, 94, 0.5)'
        }
      },
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })
    const source = readTableSource()
    const globalStyles = readGlobalStyles()
    const selectedCellRule = getCssRule(source, '.x-table__cell.is-selected-cell')
    const selectedCellAfterRule = getCssRule(source, '.x-table__cell.is-selected-cell::after')
    const selectedCellAdjacentTopRule = getCssRule(source, '.x-table__cell.is-selected-cell.is-selected-cell-adjacent-top::after')
    const style = wrapper.find('.x-table').attributes('style')

    expect(style).toContain('--x-table-cell-selected-background: rgba(34, 197, 94, 0.18)')
    expect(style).toContain('--x-table-cell-selected-text-color: #dcfce7')
    expect(style).toContain('--x-table-cell-selected-border-color: #22c55e')
    expect(style).toContain('--x-table-cell-selected-inner-border-color: rgba(34, 197, 94, 0.5)')
    expect(selectedCellRule).toContain('color: var(--x-table-cell-selected-text-color, var(--x-table-body-text-color, var(--x-table-text-color, var(--x-color-text, #1f2937))));')
    expect(selectedCellRule).not.toContain('color: var(--x-table-cell-selected-text-color, #0f172a);')
    expect(selectedCellAfterRule).toContain('border: 2px solid var(--x-table-cell-selected-border-color, var(--x-color-primary, #1264f4));')
    expect(selectedCellAdjacentTopRule).toContain('border-top-color: var(--x-table-cell-selected-inner-border-color, var(--x-table-cell-selected-border-color, var(--x-color-primary, #1264f4)));')
    expect(globalStyles).toContain('--x-table-cell-selected-background: rgb(59 130 246 / 12%);')
    expect(globalStyles).toContain('--x-table-cell-selected-text-color: var(--x-color-text, #1f2937);')
    expect(globalStyles).toContain('--x-table-cell-selected-background: rgba(59, 130, 246, 0.18);')
    expect(globalStyles).toContain('--x-table-cell-selected-text-color: var(--x-color-text, #eef4fb);')
  })

  it('routes viewport header row and column borders through layered CSS variables', () => {
    const source = readTableSource()

    expect(source).toContain('background: var(--x-table-panel-background, var(--x-color-surface, transparent));')
    expect(source).toContain('border-bottom-color: var(--x-table-viewport-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));')
    expect(source).toContain('border-left-color: var(--x-table-viewport-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)));')
    expect(source).toContain('border-right-color: var(--x-table-viewport-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)));')
    expect(source).toContain('border-top-color: var(--x-table-viewport-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));')
    expect(source).toContain('border-bottom-color: var(--x-table-header-divider-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)));')
    expect(source).toContain('var(--x-table-row-border-color, var(--x-table-horizontal-border-color, var(--x-table-border-color)))')
    expect(source).toContain('var(--x-table-column-border-color, var(--x-table-vertical-border-color, var(--x-table-border-color)))')
    expect(source).not.toContain('background: #fff;\n  --x-table-border-color')
    expect(source).not.toContain('border-bottom: var(--x-table-horizontal-border-width, 1px) solid var(--x-table-viewport-border-color')
    expect(source).not.toContain('border-top: var(--x-table-horizontal-border-width, 1px) solid var(--x-table-viewport-border-color')
    expect(source).not.toContain('var(--x-table-border-color, #d8e0ea)')
    expect(source).not.toContain('var(--x-table-border-color, #e5eaf1)')
  })

  it('keeps row backgrounds under a translucent hover overlay', () => {
    const source = readTableSource()

    expect(source).toContain('linear-gradient(var(--x-table-row-hover-overlay-current, transparent), var(--x-table-row-hover-overlay-current, transparent))')
    expect(source).toContain('.x-table__row--body:hover {\n  --x-table-row-hover-overlay-current: var(--x-table-row-hover-overlay, rgb(14 116 144 / 6%));')
  })

  it('routes column settings and pagination controls through theme CSS variables', () => {
    const source = readTableSource()
    const globalStyles = readGlobalStyles()
    const controlRules = [
      getCssRule(source, '.x-table__column-settings-button,\n.x-table__toolbar-icon-button'),
      getCssRule(source, '.x-table__column-settings-button'),
      getCssRule(source, '.x-table__column-settings-footer-button'),
      getCssRule(source, '.x-table__column-settings-button:hover'),
      getCssRule(source, '.x-table__pagination'),
      getCssRule(source, '.x-table__page-size-select,\n.x-table__page-button'),
      getCssRule(source, '.x-table__page-size-select option'),
      getCssRule(source, '.x-table__page-number'),
      getCssRule(source, '.x-table__page-size-select:hover,\n.x-table__page-button:hover:not(:disabled)'),
      getCssRule(source, '.x-table__page-button:disabled'),
      getCssRule(source, '.x-table__page-current')
    ].join('\n')

    expect(controlRules).toContain('background: var(--x-table-control-bg, var(--x-color-surface, #fff));')
    expect(controlRules).toContain('border: 1px solid var(--x-table-control-border-color, var(--x-color-border, #cbd5e1));')
    expect(controlRules).toContain('color: var(--x-table-control-text-color, var(--x-color-text, #334155));')
    expect(controlRules).toContain('background: var(--x-table-control-hover-bg, var(--x-color-primary-soft));')
    expect(controlRules).toContain('border-color: var(--x-table-control-hover-border-color, var(--x-color-primary));')
    expect(controlRules).toContain('color: var(--x-table-control-hover-text-color, var(--x-color-primary));')
    expect(controlRules).toContain('background: var(--x-table-control-disabled-bg, var(--x-color-disabled-bg));')
    expect(controlRules).toContain('color: var(--x-table-control-disabled-text-color, var(--x-color-disabled-text));')
    expect(controlRules).toContain('color: var(--x-table-pagination-text-color, var(--x-color-text-muted, #475569));')
    expect(controlRules).toContain('color: var(--x-table-pagination-current-text-color, var(--x-color-text, #334155));')
    expect(controlRules).toContain('height: var(--x-table-control-height, 30px);')
    expect(controlRules).toContain('min-height: var(--x-table-control-height, 30px);')
    expect(controlRules).toContain('min-width: var(--x-table-control-height, 30px);')
    expect(controlRules).not.toMatch(/(?:background|border|border-color|color):\s*(#fff|#cbd5e1|#334155|#475569|#f1f5f9|#94a3b8)\b/)

    expect(globalStyles).toContain('--x-table-control-bg: var(--x-color-surface, #ffffff);')
    expect(globalStyles).toContain('--x-table-control-hover-bg: var(--x-color-primary-soft, #e0ecff);')
    expect(globalStyles).toContain('--x-table-control-disabled-bg: var(--x-color-disabled-bg);')
    expect(globalStyles).toContain('--x-table-pagination-current-text-color: var(--x-color-text, #334155);')
    expect(globalStyles).toContain('--x-table-control-bg: var(--x-color-surface, #0b1726);')
    expect(globalStyles).toContain('--x-table-control-hover-bg: var(--x-color-primary-soft, rgba(59, 130, 246, 0.16));')
    expect(globalStyles).toContain('--x-table-pagination-text-color: var(--x-color-text-muted, #8da0b8);')
  })

  it('keeps the column settings header above scrolling and drag-highlighted rows', () => {
    const source = readTableSource()
    const headerRule = getCssRule(source, '.x-table__column-settings-header')
    const dragIndicatorRule = getCssRule(source, '.x-table__column-settings-row.is-drag-over-before::before,\n.x-table__column-settings-row.is-drag-over-after::after')
    const rowRule = source.match(/\.x-table__column-settings-row\s*\{[\s\S]*?z-index: 0;[\s\S]*?\n\}/)?.[0] ?? ''

    expect(headerRule).toContain('background: var(--x-color-surface-soft, #f8fafc);')
    expect(headerRule).toContain('position: sticky;')
    expect(headerRule).toContain('z-index: 5;')
    expect(rowRule).toContain('z-index: 0;')
    expect(dragIndicatorRule).toContain('z-index: 1;')
  })

  it('keeps pagination hidden by default', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    expect(wrapper.find('.x-table__pagination').exists()).toBe(false)
    expect(wrapper.findAll('.x-table__row--body')).toHaveLength(2)
  })

  it('renders client-side paginated rows and exposes pagination controls', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data: [
          ...data,
          { id: 3, name: '权限中心', status: '启用', count: 9 }
        ],
        showPagination: true,
        pageSize: 2,
        pageSizes: [2, 5]
      },
      slots: {
        bottom: '<template #default="{ pagination, visibleData }"><span class="page-scope">{{ pagination.currentPage }}-{{ visibleData.length }}</span></template>'
      }
    })

    expect(wrapper.findAll('.x-table__row--body')).toHaveLength(2)
    expect(wrapper.text()).toContain('工作台')
    expect(wrapper.text()).not.toContain('权限中心')
    expect(wrapper.find('.page-scope').text()).toBe('1-2')
    expect(wrapper.find('[aria-label="第 1 页"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('[aria-label="第 2 页"]').exists()).toBe(true)

    await wrapper.find('[aria-label="下一页"]').trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:currentPage')?.[0]?.[0]).toBe(2)
    expect(wrapper.emitted('pagination-change')?.[0]?.[0]).toMatchObject({
      currentPage: 2,
      pageSize: 2,
      total: 3,
      pageCount: 2,
      mode: 'client'
    })
    expect(wrapper.findAll('.x-table__row--body')).toHaveLength(1)
    expect(wrapper.text()).toContain('权限中心')
  })

  it('renders numeric pagination items with ellipsis and supports direct page jumps', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showPagination: true,
        paginationMode: 'server',
        currentPage: 5,
        pageSize: 10,
        total: 200
      }
    })

    expect(wrapper.find('[aria-label="第 1 页"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="第 5 页"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('[aria-label="第 20 页"]').exists()).toBe(true)
    expect(wrapper.find('.x-table__page-ellipsis').exists()).toBe(true)

    await wrapper.find('[aria-label="第 6 页"]').trigger('click')

    expect(wrapper.emitted('update:currentPage')?.[0]?.[0]).toBe(6)
    expect(wrapper.emitted('pagination-change')?.[0]?.[0]).toMatchObject({
      currentPage: 6,
      pageSize: 10,
      total: 200,
      pageCount: 20,
      mode: 'server'
    })
  })

  it('supports server pagination without slicing the provided page data', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showPagination: true,
        paginationMode: 'server',
        currentPage: 2,
        pageSize: 2,
        total: 5
      }
    })

    expect(wrapper.findAll('.x-table__row--body')).toHaveLength(2)
    expect(wrapper.find('.x-table__page-current').text()).toBe('2 / 3')

    await wrapper.find('[aria-label="下一页"]').trigger('click')

    expect(wrapper.emitted('update:currentPage')?.[0]?.[0]).toBe(3)
    expect(wrapper.emitted('page-change')?.[0]?.[0]).toMatchObject({
      currentPage: 3,
      pageSize: 2,
      total: 5,
      pageCount: 3,
      mode: 'server'
    })
  })

  it('hides pagination when showPagination is disabled even with pagination props', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showPagination: false,
        pageSize: 1
      }
    })

    expect(wrapper.find('.x-table__pagination').exists()).toBe(false)
    expect(wrapper.findAll('.x-table__row--body')).toHaveLength(2)
  })

  it('renders custom cell and row actions slots', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showActions: true,
        actionsWidth: 180
      },
      slots: {
        'cell-name': '<template #default="{ value, rowIndex }"><strong class="custom-name">{{ rowIndex }}-{{ value }}</strong></template>',
        'row-actions': '<template #default="{ row }"><button class="row-action">查看 {{ row.id }}</button></template>'
      }
    })

    expect(wrapper.find('.custom-name').text()).toBe('0-工作台')
    expect(wrapper.findAll('.row-action')).toHaveLength(2)
    expect(wrapper.find('.row-action').text()).toBe('查看 1')
    expect(wrapper.find('.x-table__row--body').attributes('style')).toContain('180px')
  })

  it('freezes the actions column on the right without adding it to column settings', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showActions: true,
        actionsFixed: true,
        actionsWidth: 180,
        showColumnSettings: true
      },
      slots: {
        'row-actions': '<button class="row-action">查看</button>'
      }
    })

    const headerActions = wrapper.find('.x-table__cell--header.x-table__cell--actions')
    const bodyActionCells = wrapper.findAll('.x-table__row--body .x-table__cell--actions')
    const bodyActions = bodyActionCells[0]

    expect(headerActions.attributes('style')).toContain('position: sticky')
    expect(headerActions.attributes('style')).toContain('right: 0px')
    expect(bodyActions.attributes('style')).toContain('position: sticky')
    expect(bodyActions.attributes('style')).toContain('right: 0px')
    expect(bodyActionCells[0].attributes('style')).toContain('var(--x-table-body-background, var(--x-color-surface, #fff))')
    expect(bodyActionCells[1].attributes('style')).toContain('var(--x-table-body-stripe-background, transparent)')
    expect(bodyActionCells[1].attributes('style')).toContain('var(--x-table-body-background, var(--x-color-surface, #fff))')
    expect(wrapper.vm.getColumnSettings().map((setting) => setting.key)).toEqual(columns.map((column) => column.key))
  })

  it('keeps XSelect dropdown teleported when rendered in a cell slot', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data
      },
      slots: {
        'cell-status': ({ row }: { row: Record<string, unknown> }) => h(XSelect, {
          modelValue: row.status as string,
          options: [
            { label: '启用', value: '启用' },
            { label: '停用', value: '停用' }
          ]
        })
      }
    })

    try {
      await wrapper.findComponent(XSelect).find('.x-select__control').trigger('click')
      const dropdown = await waitForPositionedDropdown('.x-select__dropdown.is-teleported')

      expect(dropdown.classList.contains('is-teleported')).toBe(true)
      expect(wrapper.element.contains(dropdown)).toBe(false)
      expect(dropdown.textContent).toContain('启用')
    } finally {
      cleanup()
    }
  })

  it('keeps XAutocomplete dropdown teleported when rendered in a cell slot', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data
      },
      slots: {
        'cell-name': ({ row }: { row: Record<string, unknown> }) => h(XAutocomplete, {
          modelValue: row.name as string,
          options: [
            { label: '工作台', value: '工作台' },
            { label: '成员管理', value: '成员管理' }
          ]
        })
      }
    })

    try {
      await wrapper.findComponent(XAutocomplete).find('input').trigger('focus')
      const dropdown = await waitForPositionedDropdown('.x-autocomplete__dropdown.is-teleported')

      expect(dropdown.classList.contains('is-teleported')).toBe(true)
      expect(wrapper.element.contains(dropdown)).toBe(false)
      expect(dropdown.textContent).toContain('工作台')
    } finally {
      cleanup()
    }
  })

  it('adds fill height class when fullHeight is enabled', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        fullHeight: true
      }
    })

    expect(wrapper.classes()).toContain('is-fill-height')
  })

  it('keeps fullHeight false from applying fill height class', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        fullHeight: false
      }
    })

    expect(wrapper.classes()).not.toContain('is-fill-height')
  })

  it('renders built-in column settings as an icon button and opens the default dialog', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true
      }
    })

    try {
      const button = wrapper.find('.x-table__column-settings-button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('')
      expect(button.attributes('aria-label')).toBe('列设置')
      expect(button.find('.ri-settings-3-line').exists()).toBe(true)

      await button.trigger('click')
      await nextTick()

      expect(wrapper.emitted('column-settings-click')?.[0]?.[0]).toHaveLength(3)
      expect(document.body.querySelector('.x-table__column-settings-dialog')).not.toBeNull()
      expect(document.body.textContent).toContain('列设置')
      expect(document.body.textContent).toContain('恢复默认')
    } finally {
      cleanup()
    }
  })

  it('keeps column-settings-click compatible when the built-in dialog is disabled', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true,
        columnSettingsDialog: false
      }
    })

    try {
      await wrapper.find('.x-table__column-settings-button').trigger('click')
      await nextTick()

      expect(wrapper.emitted('column-settings-click')?.[0]?.[0]).toHaveLength(3)
      expect(document.body.querySelector('.x-table__column-settings-dialog')).toBeNull()
    } finally {
      cleanup()
    }
  })

  it('opens the built-in column settings dialog through the exposed method', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: false
      }
    })

    try {
      expect(wrapper.find('.x-table__column-settings-button').exists()).toBe(false)

      const opened = wrapper.vm.openColumnSettings()
      await nextTick()

      expect(opened).toBe(true)
      expect(wrapper.emitted('column-settings-click')).toBeUndefined()
      expect(document.body.querySelector('.x-table__column-settings-dialog')).not.toBeNull()
    } finally {
      cleanup()
    }
  })

  it('does not open column settings through the exposed method when the built-in dialog is disabled', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        columnSettingsDialog: false
      }
    })

    try {
      const opened = wrapper.vm.openColumnSettings()
      await nextTick()

      expect(opened).toBe(false)
      expect(wrapper.emitted('column-settings-click')).toBeUndefined()
      expect(document.body.querySelector('.x-table__column-settings-dialog')).toBeNull()
    } finally {
      cleanup()
    }
  })

  it('does not open the auto dialog when a custom column-settings-click listener is registered', async () => {
    const onColumnSettingsClick = vi.fn()
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true,
        onColumnSettingsClick
      }
    })

    try {
      await wrapper.find('.x-table__column-settings-button').trigger('click')
      await nextTick()

      expect(onColumnSettingsClick).toHaveBeenCalledTimes(1)
      expect(document.body.querySelector('.x-table__column-settings-dialog')).toBeNull()
    } finally {
      cleanup()
    }
  })

  it('updates column settings from the built-in dialog controls', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true,
        columnSettingsDialog: true
      }
    })

    const dataTransfer = {
      dropEffect: '',
      effectAllowed: '',
      setData: vi.fn()
    }

    function dispatchDrag(element: Element, type: string, clientY = 0) {
      const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent
      Object.defineProperty(event, 'dataTransfer', { value: dataTransfer })
      Object.defineProperty(event, 'clientY', { value: clientY })
      element.dispatchEvent(event)
    }

    type TestColumnSetting = {
      key: string
      hidden?: boolean
      fixed?: string
      align?: string
      widthRatio?: number
      width?: number
      order?: number
    }

    function getLastColumnSettingsUpdate() {
      const events = wrapper.emitted('update:columnSettings') ?? []
      return events[events.length - 1]?.[0] as TestColumnSetting[]
    }

    try {
      await wrapper.find('.x-table__column-settings-button').trigger('click')
      await nextTick()

      const rows = () => Array.from(document.body.querySelectorAll('.x-table__column-settings-row'))
      const findSettingRow = (label: string) => rows().find((row) => row.textContent?.includes(label)) as Element
      const statusVisibleInput = rows()[1].querySelector('.x-table__column-settings-visible .x-checkbox__native') as HTMLInputElement
      statusVisibleInput.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      let settings = getLastColumnSettingsUpdate()
      expect(settings.find((setting) => setting.key === 'status')?.hidden).toBe(true)

      const fixedRightButton = rows()[0].querySelector('.x-table__column-settings-radio-group--button .x-radio-button[data-value="right"]') as HTMLElement
      fixedRightButton.click()
      await nextTick()

      settings = getLastColumnSettingsUpdate()
      expect(settings.find((setting) => setting.key === 'name')?.fixed).toBe('right')

      const alignCenterButton = document.body.querySelector('.x-table__column-settings-radio-group--button .x-radio-button[data-name="x-table-align-name"][data-value="center"]') as HTMLElement
      alignCenterButton.click()
      await nextTick()

      settings = getLastColumnSettingsUpdate()
      expect(settings.find((setting) => setting.key === 'name')?.align).toBe('center')

      const nameRow = rows().find((row) => row.textContent?.includes('名称')) as Element
      const nameNumberInputs = nameRow.querySelectorAll('.x-table__column-settings-number input')
      ;(nameNumberInputs[0] as HTMLInputElement).value = '35'
      nameNumberInputs[0].dispatchEvent(new Event('input', { bubbles: true }))
      ;(nameNumberInputs[1] as HTMLInputElement).value = '240'
      nameNumberInputs[1].dispatchEvent(new Event('input', { bubbles: true }))
      await nextTick()

      settings = getLastColumnSettingsUpdate()
      expect(settings.find((setting) => setting.key === 'name')).toMatchObject({ widthRatio: 35, width: 240 })

      const fixedNoneButton = document.body.querySelector('.x-table__column-settings-radio-group--button .x-radio-button[data-name="x-table-fixed-name"][data-value="none"]') as HTMLElement
      fixedNoneButton.click()
      await nextTick()

      dispatchDrag(findSettingRow('数量'), 'dragstart')
      dispatchDrag(findSettingRow('名称'), 'dragover', -1)
      dispatchDrag(findSettingRow('名称'), 'drop')
      await nextTick()

      settings = getLastColumnSettingsUpdate()
      const orderedKeys = [...settings].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((setting) => setting.key)
      expect(orderedKeys).toEqual(['count', 'name', 'status'])
    } finally {
      cleanup()
    }
  })

  it('moves column settings to the first or last position from the built-in dialog', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true,
        columnSettingsDialog: true
      }
    })

    type TestColumnSetting = {
      key: string
      order?: number
    }

    function getLastColumnSettingsUpdate() {
      const events = wrapper.emitted('update:columnSettings') ?? []
      return events[events.length - 1]?.[0] as TestColumnSetting[]
    }

    function getUpdateCount() {
      return wrapper.emitted('update:columnSettings')?.length ?? 0
    }

    function orderedKeys(settings: TestColumnSetting[]) {
      return [...settings].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((setting) => setting.key)
    }

    function findSettingRow(label: string) {
      return Array.from(document.body.querySelectorAll('.x-table__column-settings-row'))
        .find((row) => row.textContent?.includes(label)) as Element
    }

    function clickEdgeButton(row: Element, label: '置顶' | '置底') {
      const button = Array.from(row.querySelectorAll('.x-table__column-settings-edge-button'))
        .find((item) => item.textContent?.includes(label)) as HTMLButtonElement
      button.click()
    }

    try {
      await wrapper.find('.x-table__column-settings-button').trigger('click')
      await nextTick()

      clickEdgeButton(findSettingRow('状态'), '置顶')
      await nextTick()
      expect(orderedKeys(getLastColumnSettingsUpdate())).toEqual(['status', 'name', 'count'])

      const updateCountAfterMoveFirst = getUpdateCount()
      clickEdgeButton(findSettingRow('状态'), '置顶')
      await nextTick()
      expect(getUpdateCount()).toBe(updateCountAfterMoveFirst)

      clickEdgeButton(findSettingRow('状态'), '置底')
      await nextTick()
      expect(orderedKeys(getLastColumnSettingsUpdate())).toEqual(['name', 'count', 'status'])

      const updateCountAfterMoveLast = getUpdateCount()
      clickEdgeButton(findSettingRow('状态'), '置底')
      await nextTick()
      expect(getUpdateCount()).toBe(updateCountAfterMoveLast)
    } finally {
      cleanup()
    }
  })

  it('resets column settings from the built-in dialog footer', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        showColumnSettings: true,
        columnSettingsDialog: true,
        columnSettings: [
          { key: 'status', order: 0, hidden: true, fixed: 'left', align: 'center', width: 200 },
          { key: 'name', order: 1, fixed: 'none', align: 'right', widthRatio: 40 },
          { key: 'count', order: 2, fixed: 'right', align: 'left', width: 160 }
        ]
      }
    })

    try {
      await wrapper.find('.x-table__column-settings-button').trigger('click')
      await nextTick()

      const resetButton = Array.from(document.body.querySelectorAll('.x-table__column-settings-footer-button'))
        .find((button) => button.textContent?.includes('恢复默认')) as HTMLButtonElement
      resetButton.click()
      await nextTick()

      const events = wrapper.emitted('update:columnSettings') ?? []
      const settings = events[events.length - 1]?.[0] as Array<{
        key: string
        order?: number
        hidden?: boolean
        fixed?: string
        align?: string
        width?: number
        widthRatio?: number
      }>
      expect(settings).toEqual([
        { key: 'name', order: 0, hidden: false, fixed: 'none', align: 'left', width: undefined, widthRatio: undefined },
        { key: 'status', order: 1, hidden: false, fixed: 'none', align: 'left', width: 120, widthRatio: undefined },
        { key: 'count', order: 2, hidden: false, fixed: 'none', align: 'right', width: 96, widthRatio: undefined }
      ])
    } finally {
      cleanup()
    }
  })

  it('pins full height regions to stable grid rows', () => {
    const source = readTableSource()
    const fullHeightBodyRule = getCssRule(source, '.x-table.is-fill-height .x-table__body')
    const fullHeightSummaryRule = getCssRule(source, '.x-table.is-fill-height .x-table__row--summary')

    expect(source).toContain('.x-table.is-fill-height {\n  align-content: stretch;')
    expect(source).toContain('  min-height: 0;\n}\n\n.x-table.is-fill-height > .x-table__top {')
    expect(source).toContain('.x-table.is-fill-height > .x-table__top {\n  grid-row: 1;')
    expect(source).toContain('.x-table.is-fill-height > .x-table__viewport {\n  grid-row: 2;')
    expect(source).toContain('.x-table.is-fill-height > .x-table__bottom {\n  grid-row: 3;')
    expect(fullHeightBodyRule).toContain('display: flex;')
    expect(fullHeightBodyRule).toContain('flex-direction: column;')
    expect(fullHeightBodyRule).toContain('min-height: 100%;')
    expect(fullHeightSummaryRule).toContain('margin-top: auto;')
  })

  it('keeps table section spacing independent from component size', () => {
    const source = readTableSource()
    const rootRule = getCssRule(source, '.x-table')
    const sectionRule = getCssRule(source, '.x-table__top,\n.x-table__bottom')

    expect(rootRule).toContain('--x-table-section-gap: 8px;')
    expect(rootRule).toContain('--x-table-section-padding-y: 8px;')
    expect(rootRule).toContain('row-gap: var(--x-table-section-gap);')
    expect(sectionRule).toContain('padding: var(--x-table-cell-padding, 0 8px);')
    expect(sectionRule).toContain('padding-block: var(--x-table-section-padding-y);')
    expect(sectionRule.indexOf('padding-block')).toBeGreaterThan(sectionRule.indexOf('padding: var(--x-table-cell-padding'))
  })

  it('keeps row height scoped to table cells instead of controls', () => {
    const source = readTableSource()
    const cellRule = getCssRule(source, '.x-table__cell')
    const headerCellRule = getCssRule(source, '.x-table__cell--header')

    expect(cellRule).toContain('min-height: var(--x-table-row-height, 30px);')
    expect(headerCellRule).toContain('min-height: var(--x-table-row-height, 30px);')
    expect(cellRule).not.toContain('--x-table-control-height')
    expect(headerCellRule).not.toContain('--x-table-control-height')
  })

  it('applies column settings for order fixed align ratio and pixel width', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        columnSettings: [
          { key: 'status', order: 0, fixed: 'left', align: 'center', widthRatio: 25 },
          { key: 'name', order: 1, fixed: 'none', align: 'left', width: 220 },
          { key: 'count', order: 2, fixed: 'right', align: 'right', width: 96 }
        ]
      }
    })

    expect(wrapper.findAll('.x-table__cell--header').map((cell) => cell.text())).toEqual(['状态', '名称', '数量'])
    expect(wrapper.find('.x-table__row--body').attributes('style')).toContain('40px 220px 96px')

    const cells = wrapper.find('.x-table__row--body').findAll('.x-table__cell')
    expect(cells[0].attributes('style')).toContain('justify-content: center')
    expect(cells[0].attributes('style')).toContain('position: sticky')
    expect(cells[0].attributes('style')).toContain('left: 0px')
    expect(cells[0].attributes('style')).toContain('box-shadow: inset -1px 0 0')
    expect(cells[2].attributes('style')).toContain('right: 0px')
    expect(cells[2].attributes('style')).toContain('box-shadow: inset 1px 0 0')
  })

  it('keeps header and body rows on one resolved grid when long text is mixed with short text', () => {
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'code', label: '合同编号', width: 110 },
          { key: 'fileName', label: '文件名', minWidth: 180 },
          { key: 'amount', label: '金额', width: 130 }
        ],
        data: [
          { id: 1, code: 'HT-001', fileName: '短文件名.pdf', amount: '1000' },
          {
            id: 2,
            code: 'HT-002',
            fileName: '这是一个很长很长的合同附件文件名-用于验证单行内容不会撑开独立 grid 列宽.pdf',
            amount: '2000'
          },
          { id: 3, code: 'HT-003', fileName: '中等长度合同.pdf', amount: '3000' }
        ]
      }
    })

    const headerGrid = wrapper.find('.x-table__row--header').attributes('style')
    const rowGrids = wrapper.findAll('.x-table__row--body').map((row) => row.attributes('style'))

    expect(new Set([headerGrid, ...rowGrids]).size).toBe(1)
    expect(headerGrid).toContain('110px 180px 130px')
  })

  it('distributes remaining container width to minWidth columns', async () => {
    const clientWidthSpy = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600)
    try {
      const wrapper = mount(XTable, {
        props: {
          columns,
          data
        }
      })

      await nextTick()
      await nextTick()

      expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('384px 120px 96px')
    } finally {
      clientWidthSpy.mockRestore()
    }
  })

  it('uses minimum total width when the container is narrower than minWidth columns', async () => {
    const clientWidthSpy = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(260)
    try {
      const wrapper = mount(XTable, {
        props: {
          columns,
          data
        }
      })

      await nextTick()
      await nextTick()

      expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('160px 120px 96px')
    } finally {
      clientWidthSpy.mockRestore()
    }
  })

  it('resolves mixed width minWidth and widthRatio columns before calculating fixed offsets', async () => {
    const clientWidthSpy = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800)
    try {
      const wrapper = mount(XTable, {
        props: {
          columns: [
            { key: 'status', label: '状态', minWidth: 96 },
            { key: 'name', label: '名称', minWidth: 160 },
            { key: 'count', label: '数量', width: 96, align: 'right' },
            { key: 'owner', label: '负责人', minWidth: 120 }
          ],
          data: [{ id: 1, status: '启用', name: '长名称', count: 12, owner: '小明' }],
          columnSettings: [
            { key: 'status', order: 0, fixed: 'left', align: 'center', widthRatio: 25 },
            { key: 'name', order: 1, fixed: 'left', align: 'left' },
            { key: 'count', order: 2, fixed: 'right', align: 'right', width: 96 },
            { key: 'owner', order: 3, fixed: 'right', align: 'left' }
          ]
        }
      })

      await nextTick()
      await nextTick()

      expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('200px 272px 96px 232px')

      const cells = wrapper.find('.x-table__row--body').findAll('.x-table__cell')
      expect(cells[0].attributes('style')).toContain('left: 0px')
      expect(cells[1].attributes('style')).toContain('left: 200px')
      expect(cells[2].attributes('style')).toContain('right: 232px')
      expect(cells[3].attributes('style')).toContain('right: 0px')
    } finally {
      clientWidthSpy.mockRestore()
    }
  })

  it('resizes columns from header handles and writes pixel width to column settings', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    expect(wrapper.findAll('.x-table__column-resize-handle')).toHaveLength(columns.length)

    await wrapper.findAll('.x-table__column-resize-handle')[0].trigger('pointerdown', { clientX: 100 })
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 160 }))
    await nextTick()

    const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
    expect(settings.find((setting) => setting.key === 'name')?.width).toBe(220)
    expect(wrapper.emitted('column-resize')?.[0]?.[0]).toMatchObject({
      key: 'name',
      width: 220,
      oldWidth: 160
    })
    expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('220px 120px 96px')

    window.dispatchEvent(new MouseEvent('pointerup'))
  })

  it('auto fits a column to visible body text when double clicking the resize handle', async () => {
    const measureText = vi.fn((text: string) => ({ width: text.includes('很长') ? 236 : text.length * 10 }))
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ measureText } as unknown as CanvasRenderingContext2D)
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'status', label: '这个列头很长但不应该参与自适应', width: 120 },
          { key: 'count', label: '数量', width: 96 }
        ],
        data: [
          { id: 1, status: '短', count: 1 },
          { id: 2, status: '很长的可见单元格文本', count: 2 }
        ]
      }
    })

    try {
      await wrapper.findAll('.x-table__column-resize-handle')[0].trigger('dblclick')
      await nextTick()

      const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
      expect(settings.find((setting) => setting.key === 'status')?.width).toBe(248)
      expect(wrapper.emitted('column-resize')?.[0]?.[0]).toMatchObject({
        key: 'status',
        width: 248,
        oldWidth: 120
      })
      expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('248px 96px')
      expect(measureText).not.toHaveBeenCalledWith('这个列头很长但不应该参与自适应')
      expect(measureText).toHaveBeenCalledWith('很长的可见单元格文本')
    } finally {
      getContextSpy.mockRestore()
    }
  })

  it('opens a body cell context menu and auto fits all visible columns', async () => {
    const measureText = vi.fn((text: string) => {
      if (text.includes('很长')) {
        return { width: 236 }
      }
      if (text === '22') {
        return { width: 80 }
      }
      return { width: text.length * 10 }
    })
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ measureText } as unknown as CanvasRenderingContext2D)
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'status', label: '状态', width: 120 },
          { key: 'count', label: '数量', width: 96 }
        ],
        data: [
          { id: 1, status: '短', count: 1 },
          { id: 2, status: '很长的可见单元格文本', count: 22 }
        ]
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 240, clientY: 160 })
      await nextTick()

      const menu = wrapper.find('.x-table__context-menu')
      expect(menu.exists()).toBe(true)
      expect(menu.attributes('style')).toContain('left: 240px')
      expect(menu.attributes('style')).toContain('top: 160px')
      expect(wrapper.findAll('.x-table__context-menu-item').map((item) => item.text())).toEqual([
        '复制Ctrl+C',
        '粘贴Ctrl+V',
        '增加行Ctrl+I',
        '向上插入行Ctrl+U',
        '向下插入行Ctrl+D',
        '适合宽度Ctrl+W',
        '适应宽度',
        '导出Excel（默认表格数据）',
        '导出Excel（格式化文字）',
        '导入Excel'
      ])

      await wrapper.findAll('.x-table__context-menu-item')[5].trigger('click')
      await nextTick()

      const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
      expect(settings.find((setting) => setting.key === 'status')?.width).toBe(248)
      expect(settings.find((setting) => setting.key === 'count')?.width).toBe(92)
      expect(wrapper.find('.x-table__context-menu').exists()).toBe(false)
    } finally {
      getContextSpy.mockRestore()
    }
  })

  it('keeps the context menu inside the viewport near browser edges', async () => {
    const widthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
    const heightDescriptor = Object.getOwnPropertyDescriptor(window, 'innerHeight')
    const getRectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      if (this.classList.contains('x-table__context-menu')) {
        return {
          width: 220,
          height: 180,
          x: 450,
          y: 260,
          top: 260,
          left: 450,
          right: 670,
          bottom: 440,
          toJSON: () => ({})
        } as DOMRect
      }

      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        toJSON: () => ({})
      } as DOMRect
    })
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 500 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 300 })
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 450, clientY: 260 })
      await nextTick()
      await nextTick()

      const style = wrapper.find('.x-table__context-menu').attributes('style')
      expect(style).toContain('left: 272px')
      expect(style).toContain('top: 80px')
    } finally {
      getRectSpy.mockRestore()
      if (widthDescriptor) {
        Object.defineProperty(window, 'innerWidth', widthDescriptor)
      }
      if (heightDescriptor) {
        Object.defineProperty(window, 'innerHeight', heightDescriptor)
      }
    }
  })

  it('auto fits all visible columns with the keyboard shortcut', async () => {
    const measureText = vi.fn((text: string) => ({ width: text.includes('很长') ? 236 : text.length * 10 }))
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ measureText } as unknown as CanvasRenderingContext2D)
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'status', label: '状态', width: 120 },
          { key: 'count', label: '数量', width: 96 }
        ],
        data: [
          { id: 1, status: '短', count: 1 },
          { id: 2, status: '很长的可见单元格文本', count: 22 }
        ]
      }
    })

    try {
      await wrapper.find('.x-table').trigger('keydown', { key: 'w', ctrlKey: true })
      await nextTick()

      const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
      expect(settings.find((setting) => setting.key === 'status')?.width).toBe(248)
      expect(settings.find((setting) => setting.key === 'count')?.width).toBe(40)
    } finally {
      getContextSpy.mockRestore()
    }
  })

  it('auto fits all visible columns with header text from the context menu', async () => {
    const measureText = vi.fn((text: string) => {
      if (text === '很长的表头文字') {
        return { width: 220 }
      }
      if (text === '22') {
        return { width: 80 }
      }
      return { width: text.length * 10 }
    })
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ measureText } as unknown as CanvasRenderingContext2D)
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'status', label: '很长的表头文字', width: 120 },
          { key: 'count', label: '数量', width: 96 }
        ],
        data: [
          { id: 1, status: '短', count: 1 },
          { id: 2, status: '中', count: 22 }
        ]
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
      await wrapper.findAll('.x-table__context-menu-item')[6].trigger('click')
      await nextTick()

      const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
      expect(settings.find((setting) => setting.key === 'status')?.width).toBe(232)
      expect(settings.find((setting) => setting.key === 'count')?.width).toBe(92)
      expect(measureText).toHaveBeenCalledWith('很长的表头文字')
      expect(wrapper.find('.x-table__context-menu').exists()).toBe(false)
    } finally {
      getContextSpy.mockRestore()
    }
  })

  it('enables copy and paste menu items only for cell selection and editable cell selection', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })

    let menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[0].text()).toBe('复制Ctrl+C')
    expect(menuItems[1].text()).toBe('粘贴Ctrl+V')
    expect(menuItems[0].attributes('disabled')).toBeDefined()
    expect(menuItems[1].attributes('disabled')).toBeDefined()

    await wrapper.setProps({ showSelection: true, selectionMode: 'cell' })
    menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[0].attributes('disabled')).toBeUndefined()
    expect(menuItems[1].attributes('disabled')).toBeDefined()

    await wrapper.setProps({ editable: true })
    menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[0].attributes('disabled')).toBeUndefined()
    expect(menuItems[1].attributes('disabled')).toBeUndefined()
  })

  it('enables row context actions only while editable and pagination is disabled', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })

    let menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[2].text()).toBe('增加行Ctrl+I')
    expect(menuItems[3].text()).toBe('向上插入行Ctrl+U')
    expect(menuItems[4].text()).toBe('向下插入行Ctrl+D')
    expect(menuItems[2].attributes('disabled')).toBeDefined()
    expect(menuItems[3].attributes('disabled')).toBeDefined()
    expect(menuItems[4].attributes('disabled')).toBeDefined()

    await wrapper.setProps({ editable: true })
    menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[2].attributes('disabled')).toBeUndefined()
    expect(menuItems[3].attributes('disabled')).toBeUndefined()
    expect(menuItems[4].attributes('disabled')).toBeUndefined()

    await wrapper.setProps({ showPagination: true })
    menuItems = wrapper.findAll('.x-table__context-menu-item')
    expect(menuItems[2].attributes('disabled')).toBeDefined()
    expect(menuItems[3].attributes('disabled')).toBeDefined()
    expect(menuItems[4].attributes('disabled')).toBeDefined()
  })

  it('adds and inserts empty rows from the context menu', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true
      }
    })

    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
    await wrapper.findAll('.x-table__context-menu-item')[2].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      ...data,
      { id: 3, name: '', status: '', count: '' }
    ])

    await wrapper.setProps({
      data: [
        ...data,
        { id: 3, name: '', status: '', count: '' }
      ]
    })
    await wrapper.findAll('.x-table__row--body')[1].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
    await wrapper.findAll('.x-table__context-menu-item')[3].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[1]?.[0]).toEqual([
      data[0],
      { id: 4, name: '', status: '', count: '' },
      data[1],
      { id: 3, name: '', status: '', count: '' }
    ])

    await wrapper.setProps({
      data: [
        data[0],
        { id: 4, name: '', status: '', count: '' },
        data[1],
        { id: 3, name: '', status: '', count: '' }
      ]
    })
    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
    await wrapper.findAll('.x-table__context-menu-item')[4].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[2]?.[0]).toEqual([
      data[0],
      { id: 5, name: '', status: '', count: '' },
      { id: 4, name: '', status: '', count: '' },
      data[1],
      { id: 3, name: '', status: '', count: '' }
    ])
  })

  it('adds and inserts empty rows with keyboard shortcuts', async () => {
    const appendWrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true
      }
    })

    await appendWrapper.find('.x-table').trigger('keydown', { key: 'i', ctrlKey: true })
    await nextTick()

    expect(appendWrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      ...data,
      { id: 3, name: '', status: '', count: '' }
    ])

    const insertAboveWrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['2::name']
      }
    })

    await insertAboveWrapper.find('.x-table').trigger('keydown', { key: 'u', ctrlKey: true })
    await nextTick()

    expect(insertAboveWrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      data[0],
      { id: 3, name: '', status: '', count: '' },
      data[1]
    ])

    const insertBelowWrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    await insertBelowWrapper.find('.x-table').trigger('keydown', { key: 'd', ctrlKey: true })
    await nextTick()

    expect(insertBelowWrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      data[0],
      { id: 3, name: '', status: '', count: '' },
      data[1]
    ])
  })

  it('shows editable row toolbar buttons for appending and deleting selected rows', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        showAppendRowButton: true,
        showDeleteSelectedRowsButton: true,
        selectedRowKeys: ['2']
      }
    })

    const buttons = wrapper.findAll('.x-table__toolbar-icon-button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].attributes('title')).toBe('新建行数据')
    expect(buttons[1].attributes('title')).toBe('删除选择行')

    await buttons[0].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      ...data,
      { id: 3, name: '', status: '', count: '' }
    ])
    expect(wrapper.emitted('append-row')?.[0]?.[0]).toEqual({
      row: { id: 3, name: '', status: '', count: '' },
      rows: [
        ...data,
        { id: 3, name: '', status: '', count: '' }
      ]
    })

    await buttons[1].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[1]?.[0]).toEqual([data[0]])
    expect(wrapper.emitted('delete-selected-rows')?.[0]?.[0]).toEqual({
      keys: ['2'],
      rows: [data[0]],
      deletedRows: [data[1]]
    })
    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual([])
  })

  it('marks dirty cells and emits save only from dirty actions', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showDirtyActions: true
      }
    })

    const buttons = wrapper.findAll('.x-table__toolbar-icon-button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].attributes('title')).toBe('保存修改')
    expect(buttons[0].attributes('disabled')).toBeDefined()

    await wrapper.find('.x-table__row--body').findAll('.x-table__cell')[0].trigger('dblclick')
    const input = wrapper.find('.x-base-input__inner')
    await input.setValue('控制台')
    await input.trigger('keydown.enter')
    await nextTick()

    expect(wrapper.find('.x-table__cell.is-dirty').exists()).toBe(true)
    expect(wrapper.emitted('cell-change')?.[0]?.[0]).toMatchObject({
      key: '1',
      value: '控制台',
      oldValue: '工作台'
    })
    expect(wrapper.emitted('dirty-change')?.[0]?.[0]).toMatchObject({
      changes: [
        {
          rowKey: '1',
          columnKey: 'name',
          value: '控制台',
          oldValue: '工作台'
        }
      ]
    })
    expect(wrapper.emitted('save')).toBeUndefined()

    await buttons[0].trigger('click')
    expect(wrapper.emitted('save')?.[0]?.[0]).toMatchObject({
      changes: [
        {
          rowKey: '1',
          columnKey: 'name',
          value: '控制台'
        }
      ],
      dirtyRows: [{ id: 1, name: '控制台', status: '启用', count: 12 }]
    })

    ;(wrapper.vm as unknown as { clearDirtyChanges: (rowKeys?: string[]) => void }).clearDirtyChanges(['1'])
    await nextTick()
    expect(wrapper.find('.x-table__cell.is-dirty').exists()).toBe(false)
  })

  it('resets dirty changes to original cell values', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showDirtyActions: true
      }
    })

    await wrapper.find('.x-table__row--body').findAll('.x-table__cell')[0].trigger('dblclick')
    const input = wrapper.find('.x-base-input__inner')
    await input.setValue('控制台')
    await input.trigger('keydown.enter')
    await nextTick()

    const draftRows = wrapper.emitted('update:data')?.[0]?.[0] as typeof data
    await wrapper.setProps({ data: draftRows })
    ;(wrapper.vm as unknown as { resetDirtyChanges: () => void }).resetDirtyChanges()
    await nextTick()

    const dataEvents = wrapper.emitted('update:data') ?? []
    const dirtyEvents = wrapper.emitted('dirty-change') ?? []
    const resetRows = dataEvents[dataEvents.length - 1]?.[0] as typeof data
    expect(resetRows[0].name).toBe('工作台')
    expect(dirtyEvents[dirtyEvents.length - 1]?.[0]).toMatchObject({ changes: [] })
  })

  it('copies selected cell text from the context menu and keyboard shortcut', async () => {
    const { clipboard, restore } = mockClipboard()
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name', '1::status', '2::name', '2::status']
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[1].trigger('contextmenu', { clientX: 20, clientY: 20 })
      await wrapper.findAll('.x-table__context-menu-item')[0].trigger('click')
      await flushPromises()

      expect(clipboard.writeText).toHaveBeenLastCalledWith('工作台\t启用\n成员管理\t停用')

      await wrapper.find('.x-table').trigger('keydown', { key: 'c', ctrlKey: true })
      await flushPromises()

      expect(clipboard.writeText).toHaveBeenLastCalledWith('工作台\t启用\n成员管理\t停用')
    } finally {
      restore()
    }
  })

  it('pastes clipboard text into selected cells from the context menu and keyboard shortcut', async () => {
    const { clipboard, restore } = mockClipboard('控制台\t启用\n报表中心\t停用')
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        editable: true,
        selectedCellKeys: ['1::name']
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[1].trigger('contextmenu', { clientX: 20, clientY: 20 })
      await wrapper.findAll('.x-table__context-menu-item')[1].trigger('click')
      await flushPromises()

      expect(clipboard.readText).toHaveBeenCalled()
      expect(wrapper.emitted('update:data')?.[0]?.[0]).toEqual([
        { id: 1, name: '控制台', status: '启用', count: 12 },
        { id: 2, name: '报表中心', status: '停用', count: 5 }
      ])
      expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::name', '1::status', '2::name', '2::status'])

      const keyboardWrapper = mount(XTable, {
        props: {
          columns,
          data: [
            { id: 1, name: '控制台', status: '启用', count: 12 },
            { id: 2, name: '报表中心', status: '停用', count: 5 }
          ],
          showSelection: true,
          selectionMode: 'cell',
          editable: true,
          selectedCellKeys: ['1::count']
        }
      })
      clipboard.readText.mockResolvedValue('42')
      await keyboardWrapper.find('.x-table').trigger('keydown', { key: 'v', ctrlKey: true })
      await flushPromises()

      expect(keyboardWrapper.emitted('update:data')?.[0]?.[0]).toEqual([
        { id: 1, name: '控制台', status: '启用', count: 42 },
        { id: 2, name: '报表中心', status: '停用', count: 5 }
      ])
      const keyboardCellChangeEvents = keyboardWrapper.emitted('cell-change') ?? []
      expect(keyboardCellChangeEvents[keyboardCellChangeEvents.length - 1]?.[0]).toMatchObject({
        rowIndex: 0,
        column: expect.objectContaining({ key: 'count' }),
        value: 42,
        oldValue: 12
      })
    } finally {
      restore()
    }
  })

  it('exports raw and formatted Excel data from the context menu', async () => {
    const aoaSpy = vi.spyOn(XLSX.utils, 'aoa_to_sheet')
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    try {
      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
      await wrapper.findAll('.x-table__context-menu-item')[7].trigger('click')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量'],
        ['工作台', '启用', 12],
        ['成员管理', '停用', 5]
      ])
      expect(wrapper.emitted('excel-export')?.[0]?.[0]).toMatchObject({ mode: 'raw', fileName: 'table-data.xlsx' })

      await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
      await wrapper.findAll('.x-table__context-menu-item')[8].trigger('click')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量'],
        ['工作台', '启用', '12 个'],
        ['成员管理', '停用', '5 个']
      ])
      expect(wrapper.emitted('excel-export')?.[1]?.[0]).toMatchObject({ mode: 'formatted', fileName: 'table-formatted.xlsx' })
    } finally {
      aoaSpy.mockRestore()
    }
  })

  it('exports computed valueGetter values in raw and formatted Excel modes', async () => {
    const aoaSpy = vi.spyOn(XLSX.utils, 'aoa_to_sheet')
    const computedColumns: TableColumn[] = [
      ...columns,
      {
        key: 'total',
        label: '合计',
        valueGetter: (row) => Number(row.count) * 2,
        formatter: (value) => `￥${value}`
      }
    ]
    const wrapper = mount(XTable, {
      props: {
        columns: computedColumns,
        data
      }
    })

    try {
      await (wrapper.vm as unknown as { exportExcel: (mode: 'raw' | 'formatted') => Promise<void> }).exportExcel('raw')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量', '合计'],
        ['工作台', '启用', 12, 24],
        ['成员管理', '停用', 5, 10]
      ])

      await (wrapper.vm as unknown as { exportExcel: (mode: 'raw' | 'formatted') => Promise<void> }).exportExcel('formatted')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量', '合计'],
        ['工作台', '启用', '12 个', '￥24'],
        ['成员管理', '停用', '5 个', '￥10']
      ])
    } finally {
      aoaSpy.mockRestore()
    }
  })

  it('exports summary rows in raw and formatted Excel modes', async () => {
    const aoaSpy = vi.spyOn(XLSX.utils, 'aoa_to_sheet')
    const summaryColumns: TableColumn[] = [
      ...columns,
      {
        key: 'total',
        label: '合计',
        valueGetter: (row) => Number(row.count) * 2,
        formatter: (value) => `￥${value}`
      }
    ]
    const wrapper = mount(XTable, {
      props: {
        columns: summaryColumns,
        data,
        summaryRow: {
          label: '汇总',
          cells: {
            count: 'sum',
            total: 'sum'
          }
        }
      }
    })

    try {
      await (wrapper.vm as unknown as { exportExcel: (mode: 'raw' | 'formatted') => Promise<void> }).exportExcel('raw')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量', '合计'],
        ['工作台', '启用', 12, 24],
        ['成员管理', '停用', 5, 10],
        ['汇总', '', 17, 34]
      ])

      await (wrapper.vm as unknown as { exportExcel: (mode: 'raw' | 'formatted') => Promise<void> }).exportExcel('formatted')
      await flushPromises()

      expect(aoaSpy).toHaveBeenLastCalledWith([
        ['名称', '状态', '数量', '合计'],
        ['工作台', '启用', '12 个', '￥24'],
        ['成员管理', '停用', '5 个', '￥10'],
        ['汇总', '', '17 个', '￥34']
      ])
    } finally {
      aoaSpy.mockRestore()
    }
  })

  it('enables Excel import only while editable and imports rows by column label', async () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['名称', '状态', '数量'],
      ['控制台', '启用', 42],
      ['报表中心', '停用', 8]
    ])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer
    const file = new File([buffer], 'rows.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('contextmenu', { clientX: 20, clientY: 20 })
    expect(wrapper.findAll('.x-table__context-menu-item')[9].attributes('disabled')).toBeDefined()

    await wrapper.setProps({ editable: true })
    expect(wrapper.findAll('.x-table__context-menu-item')[9].attributes('disabled')).toBeUndefined()

    await (wrapper.vm as unknown as { importExcelFile: (file: File) => Promise<void> }).importExcelFile(file)
    await flushPromises()

    expect(wrapper.emitted('update:data')?.[0]?.[0]).toEqual([
      { id: 1, name: '控制台', status: '启用', count: 42 },
      { id: 2, name: '报表中心', status: '停用', count: 8 }
    ])
    expect(wrapper.emitted('excel-import')?.[0]?.[0]).toMatchObject({
      file,
      rows: [
        { id: 1, name: '控制台', status: '启用', count: 42 },
        { id: 2, name: '报表中心', status: '停用', count: 8 }
      ]
    })
  })

  it('keeps valueGetter columns readonly during edit paste append and import flows', async () => {
    const { clipboard, restore } = mockClipboard('999')
    const computedColumns: TableColumn[] = [
      ...columns,
      {
        key: 'total',
        label: '合计',
        valueGetter: (row) => Number(row.count) * 2
      }
    ]
    const wrapper = mount(XTable, {
      props: {
        columns: computedColumns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::total'],
        showAppendRowButton: true
      }
    })

    try {
      const computedCell = wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[4]
      await computedCell.trigger('dblclick')
      await nextTick()

      expect(wrapper.find('.x-base-input__inner').exists()).toBe(false)

      await wrapper.find('.x-table').trigger('keydown', { key: 'v', ctrlKey: true })
      await flushPromises()

      expect(clipboard.readText).toHaveBeenCalled()
      expect(wrapper.emitted('update:data')).toBeUndefined()

      await wrapper.find('.x-table__toolbar-icon-button').trigger('click')
      await nextTick()

      expect(wrapper.emitted('append-row')?.[0]?.[0]).toEqual({
        row: { id: 3, name: '', status: '', count: '' },
        rows: [
          ...data,
          { id: 3, name: '', status: '', count: '' }
        ]
      })

      const worksheet = XLSX.utils.aoa_to_sheet([
        ['名称', '状态', '数量', '合计'],
        ['控制台', '启用', 42, 999]
      ])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer
      const file = new File([buffer], 'computed.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      await (wrapper.vm as unknown as { importExcelFile: (file: File) => Promise<void> }).importExcelFile(file)
      await flushPromises()

      const importRows = wrapper.emitted('update:data')?.[1]?.[0]
      expect(importRows).toEqual([
        { id: 1, name: '控制台', status: '启用', count: 42 }
      ])
    } finally {
      restore()
    }
  })

  it('uses 40px as the default minimum column width while resizing', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns: [
          { key: 'title', label: '标题' },
          { key: 'status', label: '状态', width: 80 }
        ],
        data: [{ id: 1, title: '长标题', status: '启用' }]
      }
    })

    expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('40px 80px')

    await wrapper.findAll('.x-table__column-resize-handle')[0].trigger('pointerdown', { clientX: 100 })
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: -100 }))
    await nextTick()

    const settings = wrapper.emitted('update:columnSettings')?.[0]?.[0] as Array<{ key: string; width?: number }>
    expect(settings.find((setting) => setting.key === 'title')?.width).toBe(40)
    expect(wrapper.find('.x-table__row--header').attributes('style')).toContain('40px 80px')

    window.dispatchEvent(new MouseEvent('pointerup'))
  })

  it('exposes column setting controls through top slot', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      },
      slots: {
        top: `
          <template #default="{ columnSettings, updateColumnSetting }">
            <span class="settings-count">{{ columnSettings.length }}</span>
            <button class="set-align" @click="updateColumnSetting('name', { align: 'center' })">设置</button>
          </template>
        `
      }
    })

    expect(wrapper.find('.settings-count').text()).toBe('3')
    await wrapper.find('.set-align').trigger('click')

    const events = wrapper.emitted('column-settings-change')
    expect(events).toBeTruthy()
    expect(events?.[events.length - 1]?.[0]).toContainEqual(expect.objectContaining({ key: 'name', align: 'center' }))
  })

  it('reorders column settings from the top slot', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      },
      slots: {
        top: `
          <template #default="{ columnSettings, reorderColumnSetting }">
            <span class="settings-order">{{ columnSettings.map((setting) => setting.key).join(',') }}</span>
            <button class="reorder-column" @click="reorderColumnSetting('name', 'count', 'after')">排序</button>
          </template>
        `
      }
    })

    expect(wrapper.find('.settings-order').text()).toBe('name,status,count')
    await wrapper.find('.reorder-column').trigger('click')
    await nextTick()

    expect(wrapper.find('.settings-order').text()).toBe('status,count,name')
    expect(wrapper.findAll('.x-table__cell--header').map((cell) => cell.text())).toEqual(['状态', '数量', '名称'])
    const emittedSettings = wrapper.emitted('column-settings-change')?.[0]?.[0] as Array<{ key: string; order: number }>
    expect(emittedSettings.find((setting) => setting.key === 'status')?.order).toBe(0)
    expect(emittedSettings.find((setting) => setting.key === 'count')?.order).toBe(1)
    expect(emittedSettings.find((setting) => setting.key === 'name')?.order).toBe(2)
  })

  it('renders selection column and emits selected row keys', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectedRowKeys: ['1']
      }
    })

    expect(wrapper.findAll('.x-table__cell--selection')).toHaveLength(3)
    expect((wrapper.findAll('.x-table__checkbox')[1].element as HTMLInputElement).checked).toBe(true)

    await wrapper.findAll('.x-table__checkbox')[2].setValue(true)

    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual(['1', '2'])
    expect(wrapper.emitted('selection-change')?.[0]?.[0]).toMatchObject({
      keys: ['1', '2'],
      rows: data
    })
  })

  it('selects all visible rows from the header checkbox without external row key binding', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true
      }
    })

    const checkboxes = wrapper.findAll('.x-table__checkbox')
    await checkboxes[0].setValue(true)
    await nextTick()

    const nextCheckboxes = wrapper.findAll('.x-table__checkbox')
    expect((nextCheckboxes[0].element as HTMLInputElement).checked).toBe(true)
    expect((nextCheckboxes[1].element as HTMLInputElement).checked).toBe(true)
    expect((nextCheckboxes[2].element as HTMLInputElement).checked).toBe(true)
    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual(['1', '2'])
    expect(wrapper.emitted('selection-change')?.[0]?.[0]).toMatchObject({
      keys: ['1', '2'],
      rows: data
    })
  })

  it('selects rows by clicking anywhere in row selection mode', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        showSelectionColumn: false,
        selectionMode: 'row'
      }
    })

    expect(wrapper.find('.x-table__cell--selection').exists()).toBe(false)

    await wrapper.find('.x-table__row--body').trigger('click')

    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual(['1'])
  })

  it('emits row click payload when a body row is clicked', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    await wrapper.findAll('.x-table__row--body')[1].trigger('click')

    expect(wrapper.emitted('row-click')?.[0]?.[0]).toMatchObject({
      row: data[1],
      rowIndex: 1,
      rowKey: '2'
    })
    expect(wrapper.emitted('row-click')?.[0]?.[0]).toHaveProperty('event')
  })

  it('emits row double click payload from non-editable and editable rows', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data
      }
    })

    await wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')[0].trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')?.[0]?.[0]).toMatchObject({
      row: data[0],
      rowIndex: 0,
      rowKey: '1'
    })

    await wrapper.setProps({ editable: true })
    await wrapper.findAll('.x-table__row--body')[1].findAll('.x-table__cell')[0].trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')?.[1]?.[0]).toMatchObject({
      row: data[1],
      rowIndex: 1,
      rowKey: '2'
    })
    expect(wrapper.find('.x-table__cell-editor').exists()).toBe(true)
  })

  it('keeps row click selection disabled while editable but still allows selection column', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        showSelectionColumn: true,
        selectionMode: 'row'
      }
    })

    await wrapper.find('.x-table__row--body').findAll('.x-table__cell')[1].trigger('click')
    expect(wrapper.emitted('update:selectedRowKeys')).toBeUndefined()

    await wrapper.findAll('.x-table__checkbox')[1].setValue(true)
    expect(wrapper.emitted('update:selectedRowKeys')?.[0]?.[0]).toEqual(['1'])
  })

  it('edits cell content with XBaseInput after double click when editable', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true
      }
    })

    const firstCell = wrapper.find('.x-table__row--body').findAll('.x-table__cell')[0]
    await firstCell.trigger('dblclick')

    const input = wrapper.find('.x-base-input__inner')
    expect(input.exists()).toBe(true)
    expect(wrapper.find('.x-table__row--body').classes()).toContain('is-editing')

    await input.setValue('控制台')
    await input.trigger('keydown.enter')
    await nextTick()

    const updatedRows = wrapper.emitted('update:data')?.[0]?.[0] as typeof data
    expect(updatedRows).toHaveLength(2)
    expect(updatedRows[0]).toMatchObject({ id: 1, name: '控制台' })
    expect(wrapper.emitted('cell-change')?.[0]?.[0]).toMatchObject({
      rowIndex: 0,
      value: '控制台',
      oldValue: '工作台'
    })
  })

  it('supports custom column editor slots while committing edited values', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true
      },
      slots: {
        'editor-count': `
          <template #default="{ modelValue, commitValue }">
            <button class="custom-count-editor" @click="commitValue(30)">当前 {{ modelValue }}</button>
          </template>
        `
      }
    })

    const countCell = wrapper.find('.x-table__row--body').findAll('.x-table__cell')[2]
    await countCell.trigger('dblclick')

    expect(wrapper.find('.custom-count-editor').text()).toBe('当前 12')

    await wrapper.find('.custom-count-editor').trigger('click')
    await nextTick()

    const updatedRows = wrapper.emitted('update:data')?.[0]?.[0] as typeof data
    expect(updatedRows[0]).toMatchObject({ id: 1, count: 30 })
    expect(wrapper.emitted('cell-change')?.[0]?.[0]).toMatchObject({
      column: expect.objectContaining({ key: 'count' }),
      value: 30,
      oldValue: 12
    })
  })

  it('keeps teleported XSelect editor open until an option commits the edited value', async () => {
    const { wrapper, cleanup } = mountWithHost({
      props: {
        columns,
        data,
        editable: true
      },
      slots: {
        'editor-status': ({
          modelValue,
          updateModelValue,
          commitValue
        }: {
          modelValue: unknown
          updateModelValue: (value: string | number | undefined) => void
          commitValue: (value: string | number | undefined) => void
        }) => h(XSelect, {
          modelValue: modelValue as string,
          options: [
            { label: '启用', value: '启用' },
            { label: '停用', value: '停用' }
          ],
          'onUpdate:modelValue': (value) => updateModelValue(value as string),
          onChange: (value) => commitValue(value as string)
        })
      }
    })

    try {
      const statusCell = wrapper.find('.x-table__row--body').findAll('.x-table__cell')[1]
      await statusCell.trigger('dblclick')
      await wrapper.findComponent(XSelect).find('.x-select__control').trigger('click')

      const dropdown = await waitForPositionedDropdown('.x-select__dropdown.is-teleported')
      expect(wrapper.element.contains(dropdown)).toBe(false)

      const disabledOption = Array.from(dropdown.querySelectorAll<HTMLButtonElement>('.x-option'))
        .find((option) => option.textContent?.includes('停用'))
      expect(disabledOption).toBeDefined()

      disabledOption?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
      await nextTick()

      expect(wrapper.find('.x-table__cell-editor').exists()).toBe(true)

      disabledOption?.click()
      await nextTick()

      const updatedRows = wrapper.emitted('update:data')?.[0]?.[0] as typeof data
      expect(updatedRows[0]).toMatchObject({ id: 1, status: '停用' })
      expect(wrapper.emitted('cell-change')?.[0]?.[0]).toMatchObject({
        column: expect.objectContaining({ key: 'status' }),
        value: '停用',
        oldValue: '启用'
      })
    } finally {
      cleanup()
    }
  })

  it('returns focus to table after committing cell editing with enter', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mount(XTable, {
      attachTo: host,
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'A' })
    await wrapper.find('.x-base-input__inner').trigger('keydown.enter')
    await nextTick()

    expect(document.activeElement).toBe(wrapper.find('.x-table').element)

    wrapper.unmount()
    host.remove()
  })

  it('commits editing and moves selected cell with tab from the editor', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'A' })
    await wrapper.find('.x-base-input__inner').trigger('keydown', { key: 'Tab' })

    expect(wrapper.emitted('update:data')?.[0]?.[0]).toBeTruthy()
    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::status'])
  })

  it('commits cell editing when pointer goes outside the editor', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true
      }
    })

    const firstCell = wrapper.find('.x-table__row--body').findAll('.x-table__cell')[0]
    await firstCell.trigger('dblclick')
    await wrapper.find('.x-base-input__inner').setValue('控制台')

    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await nextTick()

    const updatedRows = wrapper.emitted('update:data')?.[0]?.[0] as typeof data
    expect(updatedRows[0]).toMatchObject({ id: 1, name: '控制台' })
    expect(wrapper.find('.x-table__cell-editor').exists()).toBe(false)
  })

  it('does not flash cell selection when another cell ends editing', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell'
      }
    })

    const cells = wrapper.find('.x-table__row--body').findAll('.x-table__cell')
    await cells[1].trigger('dblclick')
    await wrapper.find('.x-base-input__inner').setValue('控制台')

    cells[2].element.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    await cells[2].trigger('mousedown', { button: 0 })
    await cells[2].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:data')?.[0]?.[0]).toBeTruthy()
    expect(wrapper.emitted('update:selectedCellKeys')).toBeUndefined()
  })

  it('starts editing selected cell with typed character when editable', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        editable: true,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'A' })

    const input = wrapper.find('.x-base-input__inner')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).value).toBe('A')
  })

  it('moves selected cell to the next column with tab', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Tab' })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::status'])
  })

  it('moves selected cell to the next row first column with tab at row end', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::count']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Tab' })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['2::name'])
  })

  it('moves selected cell to the previous column with shift tab', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::status']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Tab', shiftKey: true })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::name'])
  })

  it('moves selected cell to the previous row last column with shift tab at row start', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['2::name']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Tab', shiftKey: true })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::count'])
  })

  it('moves selected cell to the next row in the same column with enter', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::status']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['2::status'])
  })

  it('moves selected cell to the next column first row with enter at column bottom', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['2::status']
      }
    })

    await wrapper.find('.x-table').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::count'])
  })

  it('uses the latest internal cell selection when tab is pressed rapidly', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const table = wrapper.find('.x-table')
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events.map((event) => event[0])).toEqual([
      ['1::status'],
      ['1::count'],
      ['2::name'],
      ['2::status'],
      ['2::count']
    ])
  })

  it('ignores stale controlled cell selection echoes while tab navigation is ahead', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const table = wrapper.find('.x-table')
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await wrapper.setProps({ selectedCellKeys: ['1::status'] })
    await table.trigger('keydown', { key: 'Tab' })

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events.map((event) => event[0])).toEqual([
      ['1::status'],
      ['1::count'],
      ['2::name']
    ])
  })

  it('ignores older controlled cell selection values during rapid tab navigation', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const table = wrapper.find('.x-table')
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await wrapper.setProps({ selectedCellKeys: ['1::name'] })
    await table.trigger('keydown', { key: 'Tab' })

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events.map((event) => event[0])).toEqual([
      ['1::status'],
      ['1::count'],
      ['2::name']
    ])
  })

  it('keeps ignoring stale controlled cell selection after the latest echo arrives', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const table = wrapper.find('.x-table')
    await table.trigger('keydown', { key: 'Tab' })
    await table.trigger('keydown', { key: 'Tab' })
    await wrapper.setProps({ selectedCellKeys: ['1::count'] })
    await wrapper.setProps({ selectedCellKeys: ['1::status'] })
    await table.trigger('keydown', { key: 'Tab' })

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events.map((event) => event[0])).toEqual([
      ['1::status'],
      ['1::count'],
      ['2::name']
    ])
  })

  it('uses the latest internal cell selection when enter is pressed rapidly', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const table = wrapper.find('.x-table')
    await table.trigger('keydown', { key: 'Enter' })
    await table.trigger('keydown', { key: 'Enter' })
    await table.trigger('keydown', { key: 'Enter' })
    await table.trigger('keydown', { key: 'Enter' })
    await table.trigger('keydown', { key: 'Enter' })

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events.map((event) => event[0])).toEqual([
      ['2::name'],
      ['1::status'],
      ['2::status'],
      ['1::count'],
      ['2::count']
    ])
  })

  it('supports cell selection mode while keeping row selection column available', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        showSelectionColumn: true,
        selectionMode: 'cell'
      }
    })

    expect(wrapper.findAll('.x-table__cell--selection')).toHaveLength(3)

    const firstCell = wrapper.find('.x-table__row--body').findAll('.x-table__cell')[1]
    await firstCell.trigger('click')

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::name'])
    expect(wrapper.emitted('cell-selection-change')?.[0]?.[0]).toMatchObject({
      keys: ['1::name'],
      cells: [
        {
          value: '工作台',
          rowIndex: 0
        }
      ]
    })
  })

  it('keeps the selection utility column sticky when data columns are fixed left', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        showSelectionColumn: true,
        selectionMode: 'cell',
        columnSettings: [
          { key: 'name', order: 0, fixed: 'left' },
          { key: 'status', order: 1, fixed: 'left' },
          { key: 'count', order: 2, fixed: 'none' }
        ]
      }
    })

    const headerCells = wrapper.find('.x-table__row--header').findAll('.x-table__cell')
    const bodyCells = wrapper.find('.x-table__row--body').findAll('.x-table__cell')

    expect(headerCells[0].classes()).toContain('x-table__cell--selection')
    expect(headerCells[0].attributes('style')).toContain('position: sticky')
    expect(headerCells[0].attributes('style')).toContain('left: 0px')
    expect(bodyCells[0].classes()).toContain('x-table__cell--selection')
    expect(bodyCells[0].attributes('style')).toContain('position: sticky')
    expect(bodyCells[0].attributes('style')).toContain('left: 0px')
    expect(bodyCells[1].attributes('style')).toContain('left: 44px')
  })

  it('replaces active cell on plain click and preserves multiple cells with modifier click', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name']
      }
    })

    const cells = wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')
    await cells[2].trigger('click')

    expect(wrapper.emitted('update:selectedCellKeys')?.[0]?.[0]).toEqual(['1::status'])

    await wrapper.setProps({ selectedCellKeys: ['1::status'] })
    await cells[3].trigger('click', { ctrlKey: true })

    expect(wrapper.emitted('update:selectedCellKeys')?.[1]?.[0]).toEqual(['1::status', '1::count'])
  })

  it('marks adjacent selected cells so inner active borders stay thin', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name', '1::status', '2::name', '2::status']
      }
    })

    const selectedCells = wrapper.findAll('.is-selected-cell')

    expect(selectedCells[0].classes()).toEqual(
      expect.arrayContaining(['is-selected-cell-adjacent-right', 'is-selected-cell-adjacent-bottom'])
    )
    expect(selectedCells[1].classes()).toEqual(
      expect.arrayContaining(['is-selected-cell-adjacent-left', 'is-selected-cell-adjacent-bottom'])
    )
    expect(selectedCells[2].classes()).toEqual(
      expect.arrayContaining(['is-selected-cell-adjacent-top', 'is-selected-cell-adjacent-right'])
    )
    expect(selectedCells[3].classes()).toEqual(
      expect.arrayContaining(['is-selected-cell-adjacent-top', 'is-selected-cell-adjacent-left'])
    )
  })

  it('selects a rectangular cell range by dragging across cells', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell'
      }
    })

    const firstRowCells = wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')
    const secondRowCells = wrapper.findAll('.x-table__row--body')[1].findAll('.x-table__cell')
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: vi.fn(() => secondRowCells[2].element)
    })
    await firstRowCells[1].trigger('mousedown', { button: 0 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 1, clientY: 1 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events[events.length - 1][0]).toEqual(['1::name', '1::status', '2::name', '2::status'])
  })

  it('resizes the selected cell range from the bottom right handle', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell',
        selectedCellKeys: ['1::name', '1::status', '2::name', '2::status']
      }
    })

    const targetCell = wrapper.findAll('.x-table__row--body')[1].findAll('.x-table__cell')[3]
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: vi.fn(() => targetCell.element)
    })
    await wrapper.find('.x-table__cell-selection-handle').trigger('mousedown', { button: 0 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 1, clientY: 1 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    const events = wrapper.emitted('update:selectedCellKeys') ?? []
    expect(events[events.length - 1][0]).toEqual(['1::name', '1::status', '1::count', '2::name', '2::status', '2::count'])
  })

  it('moves the selection handle to bottom left when dragging left from the anchor cell', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showSelection: true,
        selectionMode: 'cell'
      }
    })

    const firstRowCells = wrapper.findAll('.x-table__row--body')[0].findAll('.x-table__cell')
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: vi.fn(() => firstRowCells[1].element)
    })

    await firstRowCells[3].trigger('mousedown', { button: 0 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 1, clientY: 1 }))
    await nextTick()
    await new Promise((resolve) => window.requestAnimationFrame(resolve))
    await nextTick()

    expect(wrapper.find('.x-table__cell-selection-handle').classes()).toContain('is-bottom-left')

    window.dispatchEvent(new MouseEvent('mouseup'))
  })

  it('emits reordered rows when a row is dragged after another row', async () => {
    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: vi.fn()
    }
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        rowDraggable: true
      }
    })

    const rows = wrapper.findAll('.x-table__row--body')
    await rows[0].find('.x-table__cell--drag').trigger('dragstart', { dataTransfer })
    await rows[1].trigger('dragover', { clientY: 1, dataTransfer })
    await rows[1].trigger('drop', { dataTransfer })

    const payload = wrapper.emitted('row-reorder')?.[0]?.[0] as {
      fromIndex: number
      toIndex: number
      position: string
      rows: typeof data
    }
    expect(payload).toMatchObject({
      fromIndex: 0,
      toIndex: 1,
      position: 'after'
    })
    expect(payload?.rows.map((row) => row.id)).toEqual([2, 1])
  })

  it('starts row dragging only from the drag column', async () => {
    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: vi.fn()
    }
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        rowDraggable: true
      }
    })

    const rows = wrapper.findAll('.x-table__row--body')
    await rows[0].findAll('.x-table__cell')[1].trigger('dragstart', { dataTransfer })
    await rows[1].trigger('dragover', { clientY: 1, dataTransfer })
    await rows[1].trigger('drop', { dataTransfer })

    expect(wrapper.emitted('row-reorder')).toBeUndefined()

    await rows[0].find('.x-table__cell--drag').trigger('dragstart', { dataTransfer })
    await rows[1].trigger('dragover', { clientY: 1, dataTransfer })
    await rows[1].trigger('drop', { dataTransfer })

    expect(wrapper.emitted('row-reorder')).toHaveLength(1)
  })
})
