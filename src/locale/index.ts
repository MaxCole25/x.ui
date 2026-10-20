import { computed, shallowRef } from 'vue'
import defaultMessages from './default-messages.json'

export type LocaleMessageKey = keyof typeof defaultMessages
export type LocaleMessages = Record<LocaleMessageKey, string>
export interface XUiLocale {
  name: string
  messages: Partial<LocaleMessages>
}
export interface XUiOptions {
  locale?: XUiLocale
}
export type LocaleParams = Record<string, string | number>

export const zhCN: XUiLocale = { name: 'zh-CN', messages: defaultMessages }
export { enUS } from './en-US'

const currentLocale = shallowRef<XUiLocale>(zhCN)
const locale = computed(() => currentLocale.value.name)

/** 整体替换当前语言包；省略参数恢复默认中文。 */
export function setLocale(next: XUiLocale = zhCN) {
  currentLocale.value = next
}

export function getLocale(): XUiLocale {
  return currentLocale.value
}

/** 缺少的翻译使用默认中文；参数使用 {name} 占位符。 */
export function translate(key: LocaleMessageKey, params: LocaleParams = {}): string {
  const message = currentLocale.value.messages[key] ?? defaultMessages[key]
  return message.replace(/\{(\w+)\}/g, (placeholder, name: string) => String(params[name] ?? placeholder))
}

/** 在 computed 或模板中调用 t 时，会随 setLocale 自动更新。 */
export function useLocale() {
  return { locale, t: translate }
}
