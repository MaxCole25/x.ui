export function resolveFileUrl(fileKey: string): string {
  if (!fileKey) {
    return ''
  }

  if (/^https?:\/\//i.test(fileKey) || fileKey.startsWith('blob:') || fileKey.startsWith('data:')) {
    return fileKey
  }

  return fileKey
}
