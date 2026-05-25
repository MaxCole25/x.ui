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
    expect(styles).toContain('--x-color-disabled-bg: #f1f5f9;')
    expect(styles).toContain('--x-color-disabled-text: #94a3b8;')
    expect(styles).toContain('--x-color-disabled-border: #d4d7de;')
  })

  it('provides dark theme overrides for the same base color tokens', () => {
    const styles = css()

    expect(styles).toContain(":root[data-theme='dark'],\n[data-theme='dark'],")
    expect(styles).toContain('--x-color-primary: #3b82f6;')
    expect(styles).toContain('--x-color-primary-soft: rgba(59, 130, 246, 0.16);')
    expect(styles).toContain('--x-color-text: #eef4fb;')
    expect(styles).toContain('--x-color-text-muted: var(--x-color-muted);')
    expect(styles).toContain('--x-color-border: #203247;')
    expect(styles).toContain('--x-color-surface: #0b1726;')
    expect(styles).toContain('--x-color-disabled-bg: #111f31;')
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
