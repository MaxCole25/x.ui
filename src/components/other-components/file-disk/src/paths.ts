
export function normalizePath(path?: string) {
  const raw = String(path || '/').trim().replace(/\\/g, '/')
  const segments = raw.split('/').filter(Boolean)
  return segments.length ? `/${segments.join('/')}` : '/'
}

export function joinPath(base: string, name: string) {
  return normalizePath(`${base === '/' ? '' : base}/${name}`)
}

export function parentPath(path: string) {
  const segments = normalizePath(path).split('/').filter(Boolean)
  segments.pop()
  return segments.length ? `/${segments.join('/')}` : '/'
}
