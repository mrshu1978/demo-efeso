import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { getPartners, getUser, getComments, addComment } from '../utils/storage'

const SECTOR_COLORS = {
  'ERP & Finance':              'bg-blue-100 text-blue-800',
  'Data & AI':                  'bg-indigo-100 text-indigo-800',
  'Process Automation & RPA':   'bg-purple-100 text-purple-800',
  'CRM & Sales':                'bg-pink-100 text-pink-800',
  'HR & Workforce':             'bg-orange-100 text-orange-800',
  'Cloud & Infrastructure':     'bg-sky-100 text-sky-800',
}

function Stars({ value, onChange, size = 'text-xl' }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s === value ? 0 : s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`${size} leading-none transition-transform ${onChange ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} focus:outline-none`}
        >
          <span className={s <= (hover || value) ? 'text-amber-400' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  )
}

export default function PartnerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const partner = getPartners().find(p => p.id === id)
  const currentUser = getUser()

  const [comments, setComments] = useState(() => getComments(id))
  const [newStars, setNewStars] = useState(0)
  const [newText, setNewText] = useState('')
  const [error, setError] = useState('')

  if (!partner) { navigate('/home'); return null }

  const { company_name, logo, website, headquarters, sectors, solutions, solution_description } = partner

  const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(company_name)}&background=1B2E5E&color=fff&size=150&bold=true&format=svg`

  const avgStars = comments.length
    ? Math.round(comments.reduce((sum, c) => sum + c.stars, 0) / comments.length * 10) / 10
    : null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newText.trim()) { setError('Please write a comment'); return }
    if (!newStars) { setError('Please select a rating'); return }
    const comment = {
      author: currentUser,
      stars: newStars,
      text: newText.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }
    addComment(id, comment)
    setComments(getComments(id))
    setNewText('')
    setNewStars(0)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-navy mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to results
        </button>

        {/* Company card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-navy px-6 py-5 flex items-center gap-4">
            {/* Logo on dark background */}
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1.5 shadow">
              <img
                src={logo}
                alt={company_name}
                className="w-full h-full object-contain"
                onError={e => { e.target.onerror = null; e.target.src = fallbackLogo }}
              />
            </div>
            <div className="text-white min-w-0 flex-1">
              <h1 className="text-xl font-bold">{company_name}</h1>
              {headquarters && (
                <div className="text-sm text-white/60 mt-0.5">📍 {headquarters}</div>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-200 hover:underline mt-0.5 block"
                >
                  {website.replace('https://', '')}
                </a>
              )}
            </div>
            {avgStars && (
              <div className="ml-auto text-center flex-shrink-0">
                <div className="text-2xl font-bold text-amber-400">{avgStars}</div>
                <div className="text-[10px] text-white/50">{comments.length} reviews</div>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            {/* Sectors */}
            <div className="flex flex-wrap gap-1.5">
              {sectors.map(s => (
                <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${SECTOR_COLORS[s] || 'bg-gray-100 text-gray-700'}`}>
                  {s}
                </span>
              ))}
            </div>

            {/* Description */}
            {solution_description && (
              <p className="text-sm text-gray-600 leading-relaxed">{solution_description}</p>
            )}

            {/* Solutions */}
            <div className="flex flex-wrap gap-1.5">
              {solutions.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 bg-gray-50">
                  {s}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <a
                href={website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Visit website →
              </a>
              <button
                onClick={() => navigate(`/partner/${id}/edit`)}
                className="text-xs text-gray-400 hover:text-navy transition-colors"
              >
                Edit →
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">
              EFESO team reviews
              {comments.length > 0 && <span className="ml-2 text-sm font-normal text-gray-400">({comments.length})</span>}
            </h2>
          </div>

          {/* New comment form */}
          <form onSubmit={handleSubmit} className="p-6 border-b border-gray-50">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Leave a review</p>
            <Stars value={newStars} onChange={setNewStars} size="text-2xl" />
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Share your experience working with this technology partner on client projects..."
              rows={3}
              className="w-full mt-3 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-navy text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
              >
                Publish
              </button>
            </div>
          </form>

          {/* Comment list */}
          {comments.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-300">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-sm text-gray-400">No reviews yet</p>
              <p className="text-xs text-gray-300 mt-1">Be the first to share your experience with this partner</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {comments.map((c, i) => (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {c.author?.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-700 capitalize">{c.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stars value={c.stars} size="text-sm" />
                      <span className="text-xs text-gray-300">{c.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-9">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
