import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { XGrid, XGridItem } from '../src'

describe('XGrid', () => {
  it('renders a three-column grid by default', () => {
    const wrapper = mount(XGrid)

    expect(wrapper.classes()).toContain('x-grid')
    expect(wrapper.attributes('style')).toContain('--x-grid-columns: repeat(3, minmax(0, 1fr))')
    expect(wrapper.attributes('style')).toContain('--x-grid-justify-items: stretch')
    expect(wrapper.attributes('style')).toContain('--x-grid-align-items: stretch')
  })

  it('renders sixteen placeholders with four columns', () => {
    const wrapper = mount(XGrid, {
      props: {
        columns: 4,
        count: 16
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-grid-columns: repeat(4, minmax(0, 1fr))')
    expect(wrapper.findAll('.x-grid-item')).toHaveLength(16)
    expect(wrapper.findAll('.x-grid-item--placeholder')).toHaveLength(16)
  })

  it('maps gap, rowGap and columnGap with explicit row and column gap precedence', () => {
    const wrapper = mount(XGrid, {
      props: {
        gap: 8,
        rowGap: 12,
        columnGap: '2rem'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-grid-gap: 8px')
    expect(style).toContain('--x-grid-row-gap: 12px')
    expect(style).toContain('--x-grid-column-gap: 2rem')
  })

  it('maps container dimensions, layout and color styles to variables', () => {
    const wrapper = mount(XGrid, {
      props: {
        columns: '120px minmax(0, 1fr)',
        rows: 2,
        width: 480,
        height: '320px',
        minWidth: 240,
        minHeight: '160px',
        padding: 10,
        autoRows: 'minmax(64px, auto)',
        autoColumns: 80,
        justifyItems: 'center',
        alignItems: 'end',
        backgroundColor: '#f8fafc',
        textColor: '#123456',
        borderColor: '#94a3b8',
        borderWidth: 1,
        borderStyle: 'dashed',
        radius: 8
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-grid-columns: 120px minmax(0, 1fr)')
    expect(style).toContain('--x-grid-rows: repeat(2, minmax(0, 1fr))')
    expect(style).toContain('--x-grid-width: 480px')
    expect(style).toContain('--x-grid-height: 320px')
    expect(style).toContain('--x-grid-min-width: 240px')
    expect(style).toContain('--x-grid-min-height: 160px')
    expect(style).toContain('--x-grid-padding: 10px')
    expect(style).toContain('--x-grid-auto-rows: minmax(64px, auto)')
    expect(style).toContain('--x-grid-auto-columns: 80px')
    expect(style).toContain('--x-grid-justify-items: center')
    expect(style).toContain('--x-grid-align-items: end')
    expect(style).toContain('--x-grid-bg: #f8fafc')
    expect(style).toContain('--x-grid-text-color: #123456')
    expect(style).toContain('--x-grid-border-color: #94a3b8')
    expect(style).toContain('--x-grid-border-width: 1px')
    expect(style).toContain('--x-grid-border-style: dashed')
    expect(style).toContain('--x-grid-radius: 8px')
  })

  it('renders slotted content instead of count placeholders', () => {
    const wrapper = mount({
      components: {
        XGrid,
        XGridItem
      },
      template: `
        <XGrid :count="9">
          <XGridItem>一</XGridItem>
          <XGridItem>二</XGridItem>
        </XGrid>
      `
    })

    expect(wrapper.findAll('.x-grid-item')).toHaveLength(2)
    expect(wrapper.findAll('.x-grid-item--placeholder')).toHaveLength(0)
    expect(wrapper.text()).toContain('一')
    expect(wrapper.text()).toContain('二')
  })

  it('maps grid item span, line and appearance props to variables', () => {
    const wrapper = mount(XGridItem, {
      props: {
        span: 2,
        rowSpan: 3,
        column: '1 / 4',
        row: '2 / 5',
        width: 120,
        height: '80px',
        minWidth: 64,
        minHeight: '40px',
        padding: 12,
        justifySelf: 'center',
        alignSelf: 'end',
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        borderColor: '#cbd5e1',
        borderWidth: 1,
        borderStyle: 'solid',
        radius: 6,
        overflow: 'hidden'
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-grid-item-column: 1 / 4')
    expect(style).toContain('--x-grid-item-row: 2 / 5')
    expect(style).toContain('--x-grid-item-width: 120px')
    expect(style).toContain('--x-grid-item-height: 80px')
    expect(style).toContain('--x-grid-item-min-width: 64px')
    expect(style).toContain('--x-grid-item-min-height: 40px')
    expect(style).toContain('--x-grid-item-padding: 12px')
    expect(style).toContain('--x-grid-item-justify-self: center')
    expect(style).toContain('--x-grid-item-align-self: end')
    expect(style).toContain('--x-grid-item-bg: #ffffff')
    expect(style).toContain('--x-grid-item-text-color: #0f172a')
    expect(style).toContain('--x-grid-item-border-color: #cbd5e1')
    expect(style).toContain('--x-grid-item-border-width: 1px')
    expect(style).toContain('--x-grid-item-border-style: solid')
    expect(style).toContain('--x-grid-item-radius: 6px')
    expect(style).toContain('--x-grid-item-overflow: hidden')
  })

  it('uses colSpan and rowSpan when explicit lines are not provided', () => {
    const wrapper = mount(XGridItem, {
      props: {
        colSpan: 4,
        rowSpan: 2
      }
    })

    const style = wrapper.attributes('style')

    expect(style).toContain('--x-grid-item-column: span 4')
    expect(style).toContain('--x-grid-item-row: span 2')
  })

  it('registers grid and grid item through the grid installer', () => {
    const app = {
      component: vi.fn()
    }

    ;(XGrid as typeof XGrid & { install: (target: typeof app) => void }).install(app)

    expect(app.component).toHaveBeenCalledWith('XGrid', XGrid)
    expect(app.component).toHaveBeenCalledWith('XGridItem', XGridItem)
  })
})
