import fs from 'node:fs'

const site = new URL('https://maxcole25.github.io/x.ui/')
const keyLocation = new URL('indexnow-key.txt', site).href
const key = fs.readFileSync('docs/public/indexnow-key.txt', 'utf8').trim()
if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('IndexNow 验证文件应包含 32 位十六进制标识。')

async function getText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`读取 ${url} 失败：HTTP ${response.status}`)
  return response.text()
}

const submit = process.argv.includes('--submit')
const sitemap = submit
  ? await getText(new URL('sitemap.xml', site))
  : fs.readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf8')
const urls = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]))]
if (!urls.length || urls.length > 10000) throw new Error('站点地图网址数量必须在 1～10000 之间。')
for (const value of urls) {
  const url = new URL(value)
  if (url.origin !== site.origin || !url.pathname.startsWith(site.pathname)) {
    throw new Error(`禁止提交站点范围外的网址：${value}`)
  }
}
if (!submit) {
  console.log(`IndexNow 预检通过：${urls.length} 个公开文档网址；未发出提交请求。`)
} else {
  // 子目录 keyLocation 只覆盖 /x.ui/，不申请整个 github.io 主机的控制权。
  if ((await getText(keyLocation)).trim() !== key) throw new Error('线上验证文件与本地不一致，请先完成文档部署。')
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: site.hostname, key, keyLocation, urlList: urls }),
    signal: AbortSignal.timeout(30000)
  })
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow 提交失败：HTTP ${response.status} ${(await response.text()).slice(0, 500)}`)
  const message = `IndexNow 已接收 ${urls.length} 个网址（HTTP ${response.status}${response.status === 202 ? '，验证待完成' : ''}）。接收不等于已索引或被 AI 收录。`
  console.log(message)
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, message + '\n', 'utf8')
}
