export function scorePartner(partner, query) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1)
  if (!words.length) return 0

  const haystack = [
    partner.full_name,
    partner.solution_description,
    ...partner.sectors,
    ...partner.solutions
  ].join(' ').toLowerCase()

  const hits = words.filter(w => haystack.includes(w)).length
  return Math.round((hits / words.length) * 100)
}

export function searchPartners(partners, query) {
  const visible = partners.filter(p => p.is_active && p.is_visible)

  if (!query || !query.trim()) {
    return visible.map(p => ({ ...p, score: null }))
  }

  return visible
    .map(p => ({ ...p, score: scorePartner(p, query) }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
}
