import { computed, inject, isRef, type App, type InjectionKey } from 'vue'
import {
  defaultBaseXConfig,
  defaultBaseXTableTheme,
  defaultBaseXTheme,
} from './defaults'
import type {
  BaseXConfig,
  BaseXConfigOptions,
  BaseXMaybeSource,
  BaseXSizeName,
  BaseXTableThemeProps,
  BaseXThemeTokens,
} from './types'

export const baseXConfigKey: InjectionKey<BaseXConfig> = Symbol('baseXConfig')

let activeBaseXConfig: BaseXConfig = createBaseXConfig()

export function resolveBaseXSource<T>(source: BaseXMaybeSource<T>): T {
  if (typeof source === 'function') {
    return (source as () => T)()
  }
  if (isRef(source)) {
    return source.value
  }
  return source
}

export function createBaseXConfig(options: BaseXConfigOptions = {}): BaseXConfig {
  return {
    ...defaultBaseXConfig,
    ...options,
    theme: () => mergeBaseXTheme(resolveBaseXSource(options.theme ?? defaultBaseXTheme)),
    tableTheme: () => ({
      ...defaultBaseXTableTheme,
      ...resolveBaseXSource(options.tableTheme ?? defaultBaseXTableTheme),
    }),
  }
}

export function setBaseXConfig(options: BaseXConfigOptions = {}) {
  activeBaseXConfig = createBaseXConfig(options)
  return activeBaseXConfig
}

export function provideBaseXConfig(app: App, options: BaseXConfigOptions = {}) {
  const config = setBaseXConfig(options)
  app.provide(baseXConfigKey, config)
  return config
}

export function useBaseXConfig() {
  return inject(baseXConfigKey, activeBaseXConfig)
}

export function getBaseXConfig() {
  return activeBaseXConfig
}

export function getBaseXCurrentSize(): BaseXSizeName {
  return resolveBaseXSource(activeBaseXConfig.currentSize)
}

export function getBaseXTheme(): BaseXThemeTokens {
  return mergeBaseXTheme(resolveBaseXSource(activeBaseXConfig.theme))
}

export function getBaseXTableTheme(): BaseXTableThemeProps {
  return {
    ...defaultBaseXTableTheme,
    ...resolveBaseXSource(activeBaseXConfig.tableTheme),
  }
}

export function useBaseXTheme() {
  const config = useBaseXConfig()
  return computed(() => mergeBaseXTheme(resolveBaseXSource(config.theme)))
}

function mergeBaseXTheme(theme: BaseXThemeTokens): BaseXThemeTokens {
  return {
    formControl: {
      ...defaultBaseXTheme.formControl,
      ...theme.formControl,
    },
    switchControl: {
      ...defaultBaseXTheme.switchControl,
      ...theme.switchControl,
    },
    textControl: {
      ...defaultBaseXTheme.textControl,
      ...theme.textControl,
    },
    tabs: {
      ...defaultBaseXTheme.tabs,
      ...theme.tabs,
    },
    fileDisk: {
      ...defaultBaseXTheme.fileDisk,
      ...theme.fileDisk,
      colors: {
        ...defaultBaseXTheme.fileDisk.colors,
        ...theme.fileDisk?.colors,
      },
    },
  }
}
