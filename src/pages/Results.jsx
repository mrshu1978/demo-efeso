import { useSearchParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import Header from '../components/Header'
import PartnerCard from '../components/PartnerCard'
import { getPartners } from '../utils/storage'
import { searchPartners } from '../utils/search'

export default function Results() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const sector = params.get('sector') || ''

  const results = useMemo(() => {
    const all = getPartners()
    if (sector) {
      return all
        .filter(p => p.is_active && p.is_visible && p.sectors.includes(sector))
        .map(p => ({ ...p, score: null }))
    }
    return searchPartners(all, query)
  }, [query, sector])

  const hasScores = results.some(r => r.score !== null)
  const title = sector || query

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back + title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="text-sm text-gray-400 hover:text-navy transition-colors flex items-center gap-1"
          >
            ← Home
          </button>
          <span className="text-gray-200">|</span>
          <div>
            <h2 className="font-semibold text-gray-900 text-base">
              {title
                ? <>Results for "<span className="text-navy">{title}</span>"</>
                : 'All partners'
              }
            </h2>
            <p className="text-xs text-gray-400">{results.length} technology {results.length === 1 ? 'partner' : 'partners'} found</p>
          </div>
        </div>

        {/* Search again */}
        <form
          onSubmit={e => {
            e.preventDefault()
            const q = e.target.q.value.trim()
            navigate(q ? `/results?q=${encodeURIComponent(q)}` : '/results')
          }}
          className="flex gap-2 mb-8"
        >
          <input
            name="q"
            defaultValue={query}
            placeholder="New search..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy bg-white shadow-sm"
          />
          <button
            type="submit"
            className="bg-navy text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-navy-light transition-colors shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-20 text-gray-300">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-medium text-gray-500">No partners found</p>
            <p className="text-sm mt-1 text-gray-400">Try different search terms</p>
            <button
              onClick={() => navigate('/results')}
              className="mt-4 text-sm text-navy hover:underline"
            >
              See all partners
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((partner, idx) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                isTop={hasScores && idx === 0 && partner.score > 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
