import { useNavigate } from 'react-router-dom'
import { getUser, getPartners } from '../utils/storage'

export default function Header() {
  const navigate = useNavigate()
  const user = getUser()
  const count = getPartners().filter(p => p.is_active && p.is_visible).length

  return (
    <header className="bg-navy text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="bg-efeso text-white font-bold text-lg w-9 h-9 rounded flex items-center justify-center select-none">
          E
        </div>
        <div className="text-left">
          <div className="text-[10px] text-blue-200 uppercase tracking-widest leading-none">EFESO Consulting</div>
          <div className="text-sm font-semibold leading-tight mt-0.5">Ecosystem Partner Finder</div>
        </div>
      </button>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-blue-200 uppercase tracking-wide leading-none">Welcome,</div>
          <div className="text-sm font-semibold leading-tight mt-0.5">{user}</div>
        </div>
        <div className="bg-white/10 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          {count} partner
        </div>
      </div>
    </header>
  )
}
