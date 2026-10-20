import { translate, type LocaleMessageKey } from './index'
import { getCurrentInstance } from 'vue'

export function localePropDefault(key: LocaleMessageKey) {
  return () => translate(key)
}

/** 延迟读取默认文案，保留原始 props 的响应性和显式空字符串。 */
export function useLocaleProps<P extends object, K extends keyof P>(props: P, messages: Record<K, LocaleMessageKey>): P & { readonly [Key in K]-?: string } {
  const instance = getCurrentInstance()!
  return new Proxy(props, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      if (!Object.prototype.hasOwnProperty.call(messages, key)) return value
      const name = String(key)
      const kebabName = name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      const passedProps = instance.vnode.props
      if (passedProps && (passedProps[name] !== undefined || passedProps[kebabName] !== undefined)) return value
      return translate(messages[key as K])
    }
  }) as P & { readonly [Key in K]-?: string }
}
