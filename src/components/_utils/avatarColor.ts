/** 根据稳定身份生成默认头像颜色，避免刷新或切换会话时变色。 */
export function messageAvatarColor(id: string | number | undefined, name = '') {
  let hash = 2166136261
  for (const character of String(id ?? name)) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
  return `hsl(${(hash >>> 0) % 360} 58% 40%)`
}
