import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { readFileSync } from 'node:fs'

const require = createRequire(import.meta.url)
const manifest = require.resolve('histoire/package.json')
const pkg = JSON.parse(readFileSync(manifest, 'utf8'))
const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.histoire
const child = spawn(process.execPath, [resolve(dirname(manifest), bin), ...process.argv.slice(2)], {
  stdio: 'inherit', env: { ...process.env, VITE_CJS_IGNORE_WARNING: 'true' }
})
child.on('exit', code => { process.exitCode = code ?? 1 })
child.on('error', error => { console.error(error); process.exitCode = 1 })
