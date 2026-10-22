import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('docs/.vitepress/dist')
const site = 'https://maxcole25.github.io/x.ui/'
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
const files = walk(root)
const problems = new Set()
const read = file => fs.readFileSync(file, 'utf8')
const verificationFiles = ['googlec1cdf188cde86cff.html', 'indexnow-key.txt']
const isDocument = file => path.basename(file) !== '404.html' && !verificationFiles.includes(path.basename(file))
for (const name of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', 'logo.svg']) {
  if (!fs.existsSync(path.join(root, name))) problems.add(`缺少 ${name}`)
}
for (const name of verificationFiles) {
  const built = path.join(root, name)
  if (!fs.existsSync(built) || read(built).trim() !== read(path.join('docs/public', name)).trim()) problems.add(`验证文件缺失或不一致：${name}`)
}
const localFile = url => {
  const pathname = decodeURIComponent(new URL(url, site).pathname)
  if (!pathname.startsWith('/x.ui/')) { problems.add(`资源或链接未使用 /x.ui/：${url}`); return }
  const relative = pathname.slice('/x.ui/'.length)
  let file = path.join(root, relative || 'index.html')
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  if (!fs.existsSync(file) && !path.extname(file)) file += '.html'
  if (!fs.existsSync(file)) problems.add(`目标不存在：${url}`)
}
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = read(file)
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith('/') && !url.startsWith('//')) localFile(url.split('#')[0])
  }
  if (!isDocument(file)) continue
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
  if (!canonical?.startsWith(site)) problems.add(`canonical 缺失或错误：${file}`)
  else localFile(canonical)
  if (!/<meta name="description" content="[^"]+"/.test(html)) problems.add(`缺少描述：${file}`)
  if (file.includes(`${path.sep}components${path.sep}`) && !html.includes('属性')) problems.add(`组件 API 未静态渲染：${file}`)
}
const sitemap = read(path.join(root, 'sitemap.xml'))
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
if (new Set(locations).size !== locations.length) problems.add('sitemap 含重复页面')
for (const url of locations) {
  if (!url.startsWith(site)) problems.add(`sitemap 地址错误：${url}`)
  else localFile(url)
}
const expected = files.filter(file => file.endsWith('.html') && isDocument(file))
for (const file of expected) {
  const url = site + path.relative(root, file).replaceAll('\\', '/').replace(/(^|\/)index\.html$/, '$1')
  if (!locations.includes(url)) problems.add(`sitemap 未收录：${url}`)
}
if (!read(path.join(root, 'robots.txt')).includes(`Sitemap: ${site}sitemap.xml`)) problems.add('robots 的 sitemap 地址错误')
for (const name of ['llms.txt', 'llms-full.txt']) {
  const content = read(path.join(root, name))
  if (!content.includes(`${site}guide/ai-usage.html`)) problems.add(`${name} 缺少 AI 指南`)
  for (const [, url] of content.matchAll(/\]\((https:\/\/maxcole25\.github\.io\/x\.ui\/[^)#]*)(?:#[^)]*)?\)/g)) localFile(url)
}
for (const file of files.filter(file => /\.(css|js)$/.test(file))) {
  for (const [, url] of read(file).matchAll(/(?:url\(["']?|["'])(\/assets\/[^"')\s]+)/g)) problems.add(`未加 base 的资源：${url}`)
  if (file.endsWith('.css')) {
    const cssUrl = site + path.relative(root, file).replaceAll('\\', '/')
    for (const [, url] of read(file).matchAll(/url\(["']?([^"')\s]+)["']?\)/g)) {
      if (/^(?:data:|https?:|\/\/|#)/.test(url)) continue
      localFile(new URL(url, cssUrl).href)
    }
  }
}
for (const problem of problems) console.error(problem)
console.log(`静态文档验收：${expected.length} 页、${locations.length} 个 sitemap 地址、${problems.size} 个问题。`)
process.exitCode = problems.size ? 1 : 0
