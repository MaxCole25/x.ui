import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = () => readFileSync('src/styles/index.css', 'utf8').replace(/\r\n/g, '\n')

describe('主题基础色', () => {
  it('defines public base color tokens for business overrides', () => {
    const styles = css()

    expect(styles).toContain('--x-color-primary: #1264f4;')
    expect(styles).toContain('--x-color-primary-hover: #0f54d6;')
    expect(styles).toContain('--x-color-primary-soft: #e0ecff;')
    expect(styles).toContain('--x-color-success: #16a34a;')
    expect(styles).toContain('--x-color-warning: #d97706;')
    expect(styles).toContain('--x-color-danger: #dc2626;')
    expect(styles).toContain('--x-color-info: #64748b;')
    expect(styles).toContain('--x-color-text: #121826;')
    expect(styles).toContain('--x-color-text-muted: var(--x-color-muted);')
    expect(styles).toContain('--x-color-border: #d1d9e6;')
    expect(styles).toContain('--x-color-surface: #ffffff;')
    expect(styles).toContain('--x-color-surface-soft: #f8fafc;')
    expect(styles).toContain('--x-color-disabled-bg: #f1f5f9;')
    expect(styles).toContain('--x-color-disabled-text: #94a3b8;')
    expect(styles).toContain('--x-color-disabled-border: #d4d7de;')
  })

  it('provides dark theme overrides for the same base color tokens', () => {
    const styles = css()

    expect(styles).toContain(":root[data-theme='dark'],\n[data-theme='dark'],")
    expect(styles).toContain("[data-theme='dark'],\n.dark,")
    expect(styles).toContain('--x-color-primary: #3b82f6;')
    expect(styles).toContain('--x-color-primary-soft: rgba(59, 130, 246, 0.16);')
    expect(styles).toContain('--x-color-text: #eef4fb;')
    expect(styles).toContain('--x-color-text-muted: var(--x-color-muted);')
    expect(styles).toContain('--x-color-border: #203247;')
    expect(styles).toContain('--x-color-surface: #0b1726;')
    expect(styles).toContain('--x-color-surface-soft: #12243a;')
    expect(styles).toContain('--x-color-disabled-bg: #111f31;')
  })

  it('defines complete XTable theme tokens for light and dark themes', () => {
    const styles = css()
    const requiredTokens = [
      '--x-table-text-color',
      '--x-table-panel-background',
      '--x-table-top-background',
      '--x-table-bottom-background',
      '--x-table-header-background',
      '--x-table-header-text-color',
      '--x-table-body-background',
      '--x-table-body-stripe-background',
      '--x-table-body-text-color',
      '--x-table-summary-background',
      '--x-table-summary-text-color',
      '--x-table-row-hover-overlay',
      '--x-table-row-selected-background',
      '--x-table-row-drag-background',
      '--x-table-drag-indicator-color',
      '--x-table-sort-icon-color',
      '--x-table-border-color',
      '--x-table-viewport-border-color',
      '--x-table-header-divider-color',
      '--x-table-row-border-color',
      '--x-table-column-border-color',
      '--x-table-horizontal-border-color',
      '--x-table-vertical-border-color',
      '--x-table-control-bg',
      '--x-table-control-text-color',
      '--x-table-control-border-color',
      '--x-table-pagination-text-color',
      '--x-table-pagination-current-text-color',
      '--x-table-cell-selected-background',
      '--x-table-cell-selected-text-color',
      '--x-table-cell-selected-border-color',
      '--x-table-cell-selected-inner-border-color'
    ]

    const lightBlock = styles.slice(styles.indexOf(':root {'), styles.indexOf(':root.dark,'))
    const darkBlock = styles.slice(styles.indexOf(':root.dark,'))

    requiredTokens.forEach((token) => {
      expect(lightBlock).toContain(`${token}:`)
      expect(darkBlock).toContain(`${token}:`)
    })
    expect(lightBlock).toContain('--x-table-header-background: var(--x-color-surface-soft, #f8fafc);')
    expect(lightBlock).toContain('--x-table-body-background: var(--x-color-surface, #ffffff);')
    expect(lightBlock).toContain('--x-table-summary-background: var(--x-color-surface-soft, #f8fafc);')
    expect(lightBlock).toContain('--x-table-border-color: var(--x-color-border, #d1d9e6);')
    expect(darkBlock).toContain('--x-table-header-background: var(--x-color-surface-soft, #12243a);')
    expect(darkBlock).toContain('--x-table-body-background: var(--x-color-surface, #0b1726);')
    expect(darkBlock).toContain('--x-table-summary-background: #0f1e31;')
    expect(darkBlock).toContain('--x-table-border-color: var(--x-color-border, #203247);')
    expect(darkBlock).toContain('--x-table-row-hover-overlay: rgba(59, 130, 246, 0.16);')
    expect(darkBlock).toContain('--x-table-row-selected-background: rgba(59, 130, 246, 0.2);')
  })

  it('routes representative component defaults through base color tokens', () => {
    const styles = css()

    expect(styles).toContain('background: var(--x-button-bg, var(--x-color-primary));')
    expect(styles).toContain('--x-tag-primary: var(--x-color-primary);')
    expect(styles).toContain('--x-tag-success: var(--x-color-success);')
    expect(styles).toContain('background: var(--x-message-bg, var(--x-color-info-soft));')
    expect(styles).toContain('--x-message-bg: var(--x-color-success-soft);')
    expect(styles).toContain('--x-form-color: var(--x-color-primary);')
    expect(styles).toContain('--x-base-input-color: var(--x-form-color, var(--x-color-primary));')
    expect(styles).toContain('--x-select-color: var(--x-form-color, var(--x-color-primary));')
    expect(styles).toContain('--x-checkbox-color: var(--x-form-color, var(--x-color-primary));')
    expect(styles).toContain('--x-radio-color: var(--x-form-color, var(--x-color-primary));')
    expect(styles).toContain('--x-table-control-disabled-bg: var(--x-color-disabled-bg);')
    expect(styles).toContain('--x-tabs-tab-active-text: var(--x-color-primary);')
  })
})
