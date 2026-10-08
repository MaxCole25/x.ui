import { spawnSync } from 'node:child_process'

// 每项都执行；任一失败时最后返回非零，避免前一项失败掩盖后续构建结果。
const checks = [
  ['格式与语法', ['scripts/lint.mjs']],
  ['公开 API 命名', ['scripts/audit-api-naming.mjs', '--check', '--max-legacy=0', '--max-review=0']],
  ['API 清单', ['scripts/component-api.mjs', '--check']],
  ...['build', 'docs', 'story'].map(target => [`${target} 类型`, ['node_modules/vue-tsc/bin/vue-tsc.js', '--noEmit', '-p', `tsconfig.${target}.json`]]),
  ['已有测试', ['node_modules/vitest/vitest.mjs', 'run']],
  ['组件库构建', ['node_modules/vite/bin/vite.js', 'build']],
  ['文档构建', ['node_modules/vitepress/bin/vitepress.js', 'build', 'docs']],
  ['Story 构建', ['scripts/histoire.mjs', 'build']]
]
const results = checks.map(([name, args]) => {
  console.log(`\n开始：${name}`)
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env })
  return { name, passed: result.status === 0 }
})
console.table(results)
process.exitCode = results.every(result => result.passed) ? 0 : 1
