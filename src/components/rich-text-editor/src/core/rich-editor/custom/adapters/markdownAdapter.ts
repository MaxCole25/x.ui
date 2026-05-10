function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseInline(value: string): string {
  let text = escapeHtml(value)

  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  return text
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return trimmed.split('|').map((cell) => cell.trim())
}

function isTableSeparatorLine(line: string): boolean {
  const cells = splitTableRow(line)
  if (!cells.length) {
    return false
  }

  return cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

function isLikelyTableHeader(line: string): boolean {
  return line.includes('|') && splitTableRow(line).length > 1
}

export function fromMarkdown(markdown: string | undefined | null): string {
  if (!markdown) {
    return '<p></p>'
  }

  const normalized = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\t/g, '  ')
  const lines = normalized.split('\n')
  const html: string[] = []

  let inCodeBlock = false
  let codeLines: string[] = []
  let listType: 'ul' | 'ol' | null = null

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`)
      listType = null
    }
  }

  function flushCode() {
    if (!inCodeBlock) {
      return
    }
    const code = escapeHtml(codeLines.join('\n'))
    html.push(`<pre><code>${code}</code></pre>`)
    inCodeBlock = false
    codeLines = []
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? ''
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCode()
      } else {
        closeList()
        inCodeBlock = true
        codeLines = []
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (isLikelyTableHeader(trimmed)) {
      const separatorLine = lines[i + 1]?.trim() ?? ''
      if (isTableSeparatorLine(separatorLine)) {
        closeList()

        const headers = splitTableRow(trimmed)
        const rows: string[][] = []
        let rowIndex = i + 2

        while (rowIndex < lines.length) {
          const rowLine = (lines[rowIndex] ?? '').trim()
          if (!rowLine || !rowLine.includes('|')) {
            break
          }

          rows.push(splitTableRow(rowLine))
          rowIndex += 1
        }

        const maxCols = Math.max(headers.length, ...rows.map((row) => row.length))
        const normalizedHeaders = Array.from({ length: maxCols }).map((_, i) => headers[i] ?? '')
        const normalizedRows = rows.map((row) =>
          Array.from({ length: maxCols }).map((_, i) => row[i] ?? ''),
        )

        html.push('<table>')
        html.push('<thead>')
        html.push('<tr>')
        for (const head of normalizedHeaders) {
          html.push(`<th>${parseInline(head)}</th>`)
        }
        html.push('</tr>')
        html.push('</thead>')
        html.push('<tbody>')
        for (const row of normalizedRows) {
          html.push('<tr>')
          for (const cell of row) {
            html.push(`<td>${parseInline(cell)}</td>`)
          }
          html.push('</tr>')
        }
        html.push('</tbody>')
        html.push('</table>')

        // Skip consumed table lines: header + separator + body
        i = rowIndex - 1
        continue
      }
    }

    if (!trimmed) {
      closeList()
      continue
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      closeList()
      const level = headingMatch[1].length
      html.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`)
      continue
    }

    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      closeList()
      html.push('<hr>')
      continue
    }

    const quoteMatch = trimmed.match(/^>\s?(.*)$/)
    if (quoteMatch) {
      closeList()
      html.push(`<blockquote><p>${parseInline(quoteMatch[1])}</p></blockquote>`)
      continue
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      if (listType !== 'ol') {
        closeList()
        listType = 'ol'
        html.push('<ol>')
      }
      html.push(`<li>${parseInline(orderedMatch[1])}</li>`)
      continue
    }

    const bulletMatch = trimmed.match(/^[-*+]\s+(.+)$/)
    if (bulletMatch) {
      if (listType !== 'ul') {
        closeList()
        listType = 'ul'
        html.push('<ul>')
      }
      html.push(`<li>${parseInline(bulletMatch[1])}</li>`)
      continue
    }

    closeList()
    html.push(`<p>${parseInline(trimmed)}</p>`)
  }

  flushCode()
  closeList()

  const result = html.join('\n').trim()
  return result || '<p></p>'
}

export function toMarkdown(html: string | undefined | null): string {
  if (!html) {
    return ''
  }

  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
