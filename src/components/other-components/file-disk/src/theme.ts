import type { CSSProperties } from 'vue'
import type { FileDiskProps, FileDiskColors } from './types'
export function createColorStyle(theme: FileDiskProps) {
  const style: Record<string, string> = {}
  const colors = theme.colors
  const themeVars: Array<[string | undefined, string, string[]?]> = [
    [theme.backgroundColor ?? colors?.backgroundColor ?? colors?.background, '--x-file-disk-bg'],
    [theme.textColor ?? colors?.textColor ?? colors?.text, '--x-file-disk-text'],
    [theme.mutedTextColor ?? colors?.mutedTextColor ?? colors?.mutedText, '--x-file-disk-muted-text'],
    [theme.borderColor ?? colors?.borderColor ?? colors?.border, '--x-file-disk-border-color', ['--x-file-disk-border']],
    [theme.headerBackgroundColor ?? colors?.headerBackgroundColor ?? colors?.toolbarBackground, '--x-file-disk-header-bg'],
    [theme.toolbarBackgroundColor ?? colors?.toolbarBackgroundColor ?? colors?.toolbarBackground, '--x-file-disk-toolbar-bg'],
    [theme.itemBackgroundColor ?? colors?.itemBackgroundColor ?? colors?.panelBackground, '--x-file-disk-item-bg', ['--x-file-disk-panel-bg']],
    [theme.itemHoverBackgroundColor ?? colors?.itemHoverBackgroundColor ?? colors?.hoverBackground, '--x-file-disk-item-hover-bg', ['--x-file-disk-hover-bg']],
    [theme.itemActiveBackgroundColor ?? colors?.itemActiveBackgroundColor ?? colors?.selectedBackground, '--x-file-disk-item-active-bg', ['--x-file-disk-selected-bg']],
    [theme.itemActiveTextColor ?? colors?.itemActiveTextColor, '--x-file-disk-item-active-text'],
    [theme.iconColor ?? colors?.iconColor ?? colors?.subtleText, '--x-file-disk-icon-color'],
    [theme.activeIconColor ?? colors?.activeIconColor ?? colors?.primary, '--x-file-disk-active-icon-color'],
    [theme.emptyBackgroundColor ?? colors?.emptyBackgroundColor ?? colors?.panelBackground, '--x-file-disk-empty-bg'],
    [theme.dragOverBackgroundColor ?? colors?.dragOverBackgroundColor ?? colors?.dropBackground, '--x-file-disk-drag-over-bg', ['--x-file-disk-drop-bg']]
  ]
  const colorVars: Array<[keyof FileDiskColors, string]> = [
    ['primary', '--x-file-disk-primary'],
    ['primarySoft', '--x-file-disk-primary-soft'],
    ['primaryWeak', '--x-file-disk-primary-weak'],
    ['background', '--x-file-disk-bg'],
    ['toolbarBackground', '--x-file-disk-toolbar-bg'],
    ['pathBackground', '--x-file-disk-path-bg'],
    ['panelBackground', '--x-file-disk-panel-bg'],
    ['text', '--x-file-disk-text'],
    ['mutedText', '--x-file-disk-muted-text'],
    ['subtleText', '--x-file-disk-subtle-text'],
    ['border', '--x-file-disk-border'],
    ['softBorder', '--x-file-disk-soft-border'],
    ['hoverBackground', '--x-file-disk-hover-bg'],
    ['selectedBackground', '--x-file-disk-selected-bg'],
    ['selectedBorder', '--x-file-disk-selected-border'],
    ['disabledText', '--x-file-disk-disabled-text'],
    ['thumbBackground', '--x-file-disk-thumb-bg'],
    ['selectionBackground', '--x-file-disk-selection-bg'],
    ['selectionBorder', '--x-file-disk-selection-border'],
    ['dropBackground', '--x-file-disk-drop-bg'],
    ['success', '--x-file-disk-success'],
    ['danger', '--x-file-disk-danger'],
    ['previewBackground', '--x-file-disk-preview-bg'],
    ['previewText', '--x-file-disk-preview-text'],
    ['previewControlBackground', '--x-file-disk-preview-control-bg'],
    ['previewControlBorder', '--x-file-disk-preview-control-border'],
    ['previewControlHoverBackground', '--x-file-disk-preview-control-hover-bg'],
    ['shadow', '--x-file-disk-shadow']
  ]

  colorVars.forEach(([key, variable]) => {
    const value = colors?.[key]
    if (value) {
      style[variable] = value
    }
  })

  themeVars.forEach(([value, variable, aliases]) => {
    if (value) {
      style[variable] = value
      aliases?.forEach((alias) => {
        style[alias] = value
      })
    }
  })

  return style
}
