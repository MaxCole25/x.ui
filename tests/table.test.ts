import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { XTable } from '../src'
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
    return readFileSync(resolve(__dirname, '../src/components/display-components/table/src/Table.vue'), 'utf8')
  }

  function readGlobalStyles() {
    return readFileSync(resolve(__dirname, '../src/styles/index.css'), 'utf8')
  }

  function getCssRule(source: string, selector: string) {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const match = source.match(new RegExp(`${escapedSelector}\\s*\\{[\\s\\S]*?\\n\\}`))
    return match?.[0] ?? ''
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

    const source = readFileSync(resolve(__dirname, '../src/components/display-components/table/src/Table.vue'), 'utf8')
    expect(source).toContain('background: var(--x-table-top-background, var(--x-table-panel-background, #f8fafc));')
    expect(source).toContain('background: var(--x-table-bottom-background, var(--x-table-panel-background, #f8fafc));')
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
    expect(selectedCellRule).toContain('color: var(--x-table-cell-selected-text-color, var(--x-table-body-text-color, var(--x-table-text-color, #1f2937)));')
    expect(selectedCellRule).not.toContain('color: var(--x-table-cell-selected-text-color, #0f172a);')
    expect(selectedCellAfterRule).toContain('border: 2px solid var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75));')
    expect(selectedCellAdjacentTopRule).toContain('border-top-color: var(--x-table-cell-selected-inner-border-color, var(--x-table-cell-selected-border-color, var(--x-color-primary, #155e75)));')
    expect(globalStyles).toContain('--x-table-cell-selected-background: rgb(59 130 246 / 12%);')
    expect(globalStyles).toContain('--x-table-cell-selected-text-color: var(--x-color-text, #1f2937);')
    expect(globalStyles).toContain('--x-table-cell-selected-background: rgba(59, 130, 246, 0.18);')
    expect(globalStyles).toContain('--x-table-cell-selected-text-color: var(--x-color-text, #eef4fb);')
  })

  it('routes viewport header row and column borders through layered CSS variables', () => {
    const source = readTableSource()

    expect(source).toContain('background: var(--x-table-panel-background, transparent);')
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
      getCssRule(source, '.x-table__column-settings-button'),
      getCssRule(source, '.x-table__column-settings-button:hover'),
      getCssRule(source, '.x-table__pagination'),
      getCssRule(source, '.x-table__page-size-select,\n.x-table__page-button'),
      getCssRule(source, '.x-table__page-size-select option'),
      getCssRule(source, '.x-table__page-size-select:hover,\n.x-table__page-button:hover:not(:disabled)'),
      getCssRule(source, '.x-table__page-button:disabled'),
      getCssRule(source, '.x-table__page-current')
    ].join('\n')

    expect(controlRules).toContain('background: var(--x-table-control-bg, #fff);')
    expect(controlRules).toContain('border: 1px solid var(--x-table-control-border-color, #cbd5e1);')
    expect(controlRules).toContain('color: var(--x-table-control-text-color, #334155);')
    expect(controlRules).toContain('background: var(--x-table-control-hover-bg, #f8fafc);')
    expect(controlRules).toContain('border-color: var(--x-table-control-hover-border-color, #94a3b8);')
    expect(controlRules).toContain('color: var(--x-table-control-hover-text-color, var(--x-color-primary, #155e75));')
    expect(controlRules).toContain('background: var(--x-table-control-disabled-bg, #f1f5f9);')
    expect(controlRules).toContain('color: var(--x-table-control-disabled-text-color, #94a3b8);')
    expect(controlRules).toContain('color: var(--x-table-pagination-text-color, #475569);')
    expect(controlRules).toContain('color: var(--x-table-pagination-current-text-color, #334155);')
    expect(controlRules).not.toMatch(/(?:background|border|border-color|color):\s*(#fff|#cbd5e1|#334155|#475569|#f1f5f9|#94a3b8)\b/)

    expect(globalStyles).toContain('--x-table-control-bg: var(--x-color-surface, #ffffff);')
    expect(globalStyles).toContain('--x-table-control-hover-bg: var(--x-color-primary-soft, #e0ecff);')
    expect(globalStyles).toContain('--x-table-pagination-current-text-color: var(--x-color-text, #334155);')
    expect(globalStyles).toContain('--x-table-control-bg: var(--x-color-surface, #0b1726);')
    expect(globalStyles).toContain('--x-table-control-hover-bg: var(--x-color-primary-soft, rgba(59, 130, 246, 0.16));')
    expect(globalStyles).toContain('--x-table-pagination-text-color: var(--x-color-text-muted, #8da0b8);')
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

  it('adds fill height class when fillHeight is enabled', () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        fillHeight: true
      }
    })

    expect(wrapper.classes()).toContain('is-fill-height')
  })

  it('renders built-in column settings as an icon button', async () => {
    const wrapper = mount(XTable, {
      props: {
        columns,
        data,
        showColumnSettings: true
      }
    })

    const button = wrapper.find('.x-table__column-settings-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('')
    expect(button.attributes('aria-label')).toBe('列设置')
    expect(button.find('.ri-settings-3-line').exists()).toBe(true)

    await button.trigger('click')

    expect(wrapper.emitted('column-settings-click')?.[0]?.[0]).toHaveLength(3)
  })

  it('pins fill height regions to stable grid rows', () => {
    const source = readFileSync(resolve(__dirname, '../src/components/display-components/table/src/Table.vue'), 'utf8')

    expect(source).toContain('.x-table.is-fill-height {\n  align-content: stretch;')
    expect(source).toContain('.x-table.is-fill-height > .x-table__top {\n  grid-row: 1;')
    expect(source).toContain('.x-table.is-fill-height > .x-table__viewport {\n  grid-row: 2;')
    expect(source).toContain('.x-table.is-fill-height > .x-table__bottom {\n  grid-row: 3;')
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
