import type {
  BaseXConfig,
  BaseXPermissionContext,
  BaseXTableThemeProps,
  BaseXThemeTokens,
} from './types'

export const defaultBaseXTheme: BaseXThemeTokens = {
  formControl: {
    backgroundColor: 'var(--color-input-bg, var(--x-color-surface, #ffffff))',
    textColor: 'var(--color-text, var(--x-color-text, #111827))',
    borderColor: 'var(--color-border, var(--x-color-border, #d1d5db))',
    activeBorderColor: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
    disabledBackgroundColor: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
    disabledTextColor: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
    clearIconColor: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
  },
  switchControl: {
    color: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
    inactiveColor: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
    thumbColor: '#ffffff',
    borderColor: 'var(--color-border, var(--x-color-border, #d1d5db))',
    borderWidth: '1px',
    backgroundColor: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
    textColor: 'var(--color-text, var(--x-color-text, #111827))',
  },
  textControl: {
    backgroundColor: 'transparent',
    textColor: 'var(--color-text, var(--x-color-text, #111827))',
    borderColor: 'transparent',
  },
  tabs: {
    activeTabBgColor: 'var(--color-tab-active-bg, var(--x-color-surface, #ffffff))',
    activeTabTextColor: 'var(--color-tab-active-text, var(--x-color-primary, #2563eb))',
    tabBgColor: 'var(--color-tab-bg, var(--x-color-surface-soft, #f3f4f6))',
    tabTextColor: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
    tabBorder: '1px solid var(--color-table-border, var(--x-color-border, #d1d5db))',
    contentBackgroundColor: 'var(--color-tab-active-bg, var(--x-color-surface, #ffffff))',
    contentBorder: '1px solid var(--color-table-border, var(--x-color-border, #d1d5db))',
  },
  fileDisk: {
    backgroundColor: 'var(--color-surface, var(--x-color-surface, #ffffff))',
    textColor: 'var(--color-text, var(--x-color-text, #111827))',
    mutedTextColor: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
    borderColor: 'var(--color-border, var(--x-color-border, #d1d5db))',
    headerBackgroundColor: 'var(--color-surface-2, var(--x-color-surface, #ffffff))',
    toolbarBackgroundColor: 'var(--color-surface-2, var(--x-color-surface, #ffffff))',
    itemBackgroundColor: 'var(--color-surface, var(--x-color-surface, #ffffff))',
    itemHoverBackgroundColor: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
    itemActiveBackgroundColor: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
    itemActiveTextColor: 'var(--color-text, var(--x-color-text, #111827))',
    iconColor: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
    activeIconColor: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
    emptyBackgroundColor: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
    dragOverBackgroundColor: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
    colors: {
      primary: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
      primarySoft: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
      primaryWeak: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
      background: 'var(--color-surface, var(--x-color-surface, #ffffff))',
      toolbarBackground: 'var(--color-surface-2, var(--x-color-surface, #ffffff))',
      pathBackground: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
      panelBackground: 'var(--color-surface, var(--x-color-surface, #ffffff))',
      text: 'var(--color-text, var(--x-color-text, #111827))',
      mutedText: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
      subtleText: 'var(--color-text-2, var(--x-color-text-muted, #6b7280))',
      border: 'var(--color-border, var(--x-color-border, #d1d5db))',
      softBorder: 'var(--color-table-border, var(--x-color-border, #d1d5db))',
      hoverBackground: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
      selectedBackground: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
      selectedBorder: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
      disabledText: 'var(--color-text-muted, var(--x-color-text-muted, #6b7280))',
      thumbBackground: 'var(--color-surface-soft, var(--x-color-surface-soft, #f3f4f6))',
      selectionBackground: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
      selectionBorder: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
      dropBackground: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
      success: 'var(--color-success, #16a34a)',
      danger: 'var(--color-danger, #dc2626)',
      previewBackground: 'rgba(2, 6, 23, 0.92)',
      previewText: '#f8fafc',
      previewControlBackground: 'rgba(15, 23, 42, 0.72)',
      previewControlBorder: 'rgba(226, 232, 240, 0.24)',
      previewControlHoverBackground: 'rgba(30, 41, 59, 0.92)',
      shadow: 'var(--shadow-1, 0 12px 32px rgba(15, 23, 42, 0.16))',
    },
  },
}

export const defaultBaseXTableTheme: BaseXTableThemeProps = {
  borderColor: 'var(--color-table-border, var(--x-color-border, #d1d5db))',
  panelBackgroundColor: 'var(--color-table-body-bg, var(--x-color-surface, #ffffff))',
  topBackgroundColor: 'var(--color-table-top-bg, var(--x-color-surface, #ffffff))',
  bottomBackgroundColor: 'var(--color-table-bottom-bg, var(--x-color-surface, #ffffff))',
  headerBackgroundColor: 'var(--color-table-header-bg, #f9fafb)',
  headerTextColor: 'var(--color-table-header-text, var(--x-color-text, #111827))',
  bodyBackgroundColor: 'var(--color-table-body-bg, var(--x-color-surface, #ffffff))',
  bodyStripeBackgroundColor: 'var(--color-table-row-stripe, #f9fafb)',
  bodyTextColor: 'var(--color-table-body-text, var(--x-color-text, #111827))',
  viewportBorderColor: 'var(--color-table-viewport-border, var(--x-color-border, #d1d5db))',
  headerDividerColor: 'var(--color-table-header-divider, var(--x-color-border, #d1d5db))',
  rowBorderColor: 'var(--color-table-row-border, var(--x-color-border, #d1d5db))',
  columnBorderColor: 'var(--color-table-column-border, var(--x-color-border, #d1d5db))',
  horizontalBorderColor: 'var(--color-table-horizontal-border, var(--x-color-border, #d1d5db))',
  verticalBorderColor: 'var(--color-table-vertical-border, var(--x-color-border, #d1d5db))',
  rowHoverBackgroundColor: 'var(--color-table-row-hover, #f3f4f6)',
  zebraStripeColor: 'var(--color-table-row-stripe, #f9fafb)',
  activeCellBorderColor: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
  selectedCellBackgroundColor: 'var(--color-primary-soft, var(--x-color-primary-soft, #dbeafe))',
  selectedCellTextColor: 'var(--color-table-body-text, var(--x-color-text, #111827))',
  selectedCellBorderColor: 'var(--color-primary-600, var(--x-color-primary, #2563eb))',
  selectedCellInnerBorderColor: 'var(--color-table-border, var(--x-color-border, #d1d5db))',
  showHeaderVerticalDivider: false,
  showBodyVerticalDivider: false,
  headerHeight: 44,
  rowHeight: 46,
}

export function defaultCanUseAction(context: BaseXPermissionContext) {
  if (context.permission === false) {
    return false
  }
  return true
}

export function openBlobPreview(blob: Blob) {
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener,noreferrer')
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export const defaultBaseXConfig: BaseXConfig = {
  currentSize: 'md',
  theme: defaultBaseXTheme,
  tableTheme: defaultBaseXTableTheme,
  canUseAction: defaultCanUseAction,
  openPreview: openBlobPreview,
  downloadBlob,
}
