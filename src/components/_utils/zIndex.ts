export const overlayZIndex = {
  drawer: 1800,
  dialog: 1900,
  popper: 2000,
  tooltip: 2000,
  loading: 2100,
  message: 2200,
  messageBox: 2300
} as const

export type OverlayZIndexName = keyof typeof overlayZIndex
