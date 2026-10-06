const ALLOWED_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:'])

export function safeLinkAttributes(href, { target, rel } = {}) {
  // Browsers discard ASCII controls in URLs before interpreting the scheme.
  // eslint-disable-next-line no-control-regex -- Normalize untrusted URL control characters.
  const cleaned = typeof href === 'string' ? href.replace(/[\u0000-\u001f\u007f]/g, '').trim() : ''
  const scheme = cleaned.match(/^[a-z][a-z0-9+.-]*:/i)?.[0].toLowerCase()
  const safeHref = cleaned && (!scheme || ALLOWED_SCHEMES.has(scheme)) ? cleaned : '#'
  const external = /^(https?:)?\/\//i.test(safeHref)
  const safeTarget = target ?? (external ? '_blank' : undefined)
  const tokens = new Set((rel || '').split(/\s+/).filter(Boolean))
  if (safeTarget?.toLowerCase() === '_blank') {
    tokens.add('noopener')
    tokens.add('noreferrer')
  }
  return {
    href: safeHref,
    ...(safeTarget && { target: safeTarget }),
    ...(tokens.size && { rel: [...tokens].join(' ') }),
  }
}
