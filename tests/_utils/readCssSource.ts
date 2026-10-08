import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

/** 保留入口声明并读取其本地 CSS 导入，覆盖实际参与构建的规则。 */
export function readCssSource(file = 'src/styles/index.css'): string {
  const source = readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  return source.replace(/@import\s+['"]([^'"]+)['"];?/g, (statement, name: string) => {
    const target = resolve(dirname(file), name)
    if (existsSync(target)) return statement + '\n' + readCssSource(target)
    if (name.startsWith('.') || !name.includes('/')) {
      throw new Error('CSS 本地导入不存在：' + target)
    }
    // 包依赖的导入声明保留；图标资源另由消费验证检查。
    return statement
  })
}
