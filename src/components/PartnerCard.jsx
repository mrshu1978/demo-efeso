import { useNavigate } from 'react-router-dom'
import ScoreBadge from './ScoreBadge'
import { getComments } from '../utils/storage'

const SECTOR_COLORS = {
  'ERP & Finance':              'bg-blue-100 text-blue-800',
  'Data & AI':                  'bg-indigo-100 text-indigo-800',
  'Process Automation & RPA':   'bg-purple-100 text-purple-800',
  'CRM & Sales':                'bg-pink-100 text-pink-800',
  'HR & Workforce':             'bg-orange-100 text-orange-800',
  'Cloud & Infrastructure':     'bg-sky-100 text-sky-800',
}

export default function PartnerCard({ partner, isTop = false }) {
  const navigate = useNavigate()
  const { id, full_name, email, phone, avatar, linkedin_url, sectors, solutions, solution_description, score } = partner

  const comments = getComments(id)
  const avgStars = comments.length
    ? Math.round(comments.reduce((sum, c) => sum + c.stars, 0) / comments.length * 10) / 10
    : null

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(full_name)}&background=1B2E5E&color=fff&size=150&bold=true`

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-shadow hover:shadow-md ${
      isTop ? 'border-amber-300 ring-1 ring-amber-200' : 'border-gray-100'
    }`}>
      <div className="p-5 cursor-pointer" onClick={() => navigate(`/partner/${id}`)}>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <img
            src={avatar}
            alt={full_name}
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-100"
            onError={e => { e.target.onerror = null; e.target.src = fallbackAvatar }}
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-base truncate">{full_name}</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-blue-600 hover:underline truncate block"
                  onClick={e => e.stopPropagation()}
                >
                  {email}
                </a>
                {phone && <div className="text-xs text-gray-400 mt-0.5">{phone}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {avgStars && (
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="text-xs font-semibold text-gray-700">{avgStars}</span>
                    <span className="text-xs text-gray-300">({comments.length})</span>
                  </div>
                )}
                <ScoreBadge score={score} isTop={isTop} />
              </div>
            </div>

            {/* Sector chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {sectors.map(s => (
                <span
                  key={s}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${SECTOR_COLORS[s] || 'bg-gray-100 text-gray-700'}`}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Solution description */}
            {solution_description && (
              <p className="text-sm text-gray-500 mt-2 overflow-hidden"
                 style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {solution_description}
              </p>
            )}

            {/* Solution tags */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {solutions.map(s => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 bg-gray-50"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 bg-gray-50/50 rounded-b-xl">
        <a
          href={linkedin_url || 'https://www.linkedin.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
          onClick={e => e.stopPropagation()}
        >
          LinkedIn →
        </a>
        <button
          onClick={() => navigate(`/partner/${id}/edit`)}
          className="text-sm font-medium bg-navy text-white px-4 py-1.5 rounded-lg hover:bg-navy-light transition-colors"
        >
          Edit profile
        </button>
      </div>
    </div>
  )
}
