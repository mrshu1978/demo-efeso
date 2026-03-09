import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { getPartners, getRecentSearches, addRecentSearch, removeRecentSearch } from '../utils/storage'
import { BarChart3, BrainCircuit, Workflow, Users, UserCog, Cloud } from 'lucide-react'

const SECTORS = [
  { name: 'ERP & Finance',            Icon: BarChart3,    color: 'text-blue-600',   bg: 'bg-blue-50' },
  { name: 'Data & AI',                Icon: BrainCircuit, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Process Automation & RPA', Icon: Workflow,      color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'CRM & Sales',              Icon: Users,         color: 'text-pink-600',   bg: 'bg-pink-50' },
  { name: 'HR & Workforce',           Icon: UserCog,       color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Cloud & Infrastructure',   Icon: Cloud,         color: 'text-sky-600',    bg: 'bg-sky-50' },
]

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [recent, setRecent] = useState(getRecentSearches)

  const partners = getPartners().filter(p => p.is_active && p.is_visible)

  const sectorCounts = SECTORS.map(s => ({
    ...s,
    count: partners.filter(p => p.sectors.includes(s.name)).length
  }))

  const doSearch = (q) => {
    if (!q.trim()) {
      navigate('/results')
      return
    }
    addRecentSearch(q.trim())
    setRecent(getRecentSearches())
    navigate(`/results?q=${encodeURIComponent(q.trim())}`)
  }

  const handleRemoveRecent = (e, q) => {
    e.stopPropagation()
    removeRecentSearch(q)
    setRecent(getRecentSearches())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doSearch(query)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-navy mb-2">Find the Right Technology Partner</h1>
          <p className="text-gray-400 text-sm">
            Search by technology, solution or business function — discover the partners EFESO works with to deliver client projects
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. process mining, S/4HANA migration, demand planning, RPA, CRM..."
            autoFocus
            className="flex-1 border border-gray-200 rounded-xl px-5 py-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy bg-white"
          />
          <button
            type="submit"
            className="bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-light transition-colors shadow-sm whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Show all link */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => navigate('/results')}
            className="text-sm text-gray-400 hover:text-navy transition-colors"
          >
            See all {partners.length} technology partners →
          </button>
        </div>

        {/* Recent searches */}
        {recent.length > 0 && (
          <div className="mb-8">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-2.5">Recent searches</p>
            <div className="flex flex-wrap gap-2">
              {recent.map(q => (
                <div key={q} className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:border-navy group transition-colors">
                  <button
                    onClick={() => doSearch(q)}
                    className="text-sm text-gray-600 pl-3 pr-1 py-1.5 group-hover:text-navy transition-colors"
                  >
                    🕐 {q}
                  </button>
                  <button
                    onClick={(e) => handleRemoveRecent(e, q)}
                    className="text-gray-300 hover:text-gray-500 pr-2.5 py-1.5 text-xs leading-none transition-colors"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sector browse */}
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-3">Browse by technology domain</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {sectorCounts.map(s => (
              <button
                key={s.name}
                onClick={() => navigate(`/results?sector=${encodeURIComponent(s.name)}`)}
                className="bg-white border border-gray-100 rounded-xl p-4 text-left hover:border-navy hover:shadow-md transition-all shadow-sm group"
              >
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <s.Icon size={18} className={s.color} strokeWidth={1.75} />
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-navy leading-snug">
                  {s.name}
                </div>
                <div className="text-xs text-gray-400 mt-1.5">
                  {s.count} partners
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
