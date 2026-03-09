import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser, getUser } from '../utils/storage'

export default function Login() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (getUser()) navigate('/home', { replace: true })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setUser(trimmed)
    navigate('/home', { replace: true })
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-efeso text-white font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center select-none shadow-sm">
            E
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">EFESO Consulting</div>
            <div className="text-lg font-bold text-navy leading-tight">Ecosystem Partner Finder</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome</h1>
        <p className="text-gray-400 text-sm mb-7">
          Enter your name to access the EFESO partner platform.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Marco Rossi"
              autoFocus
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-shadow"
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-navy text-white py-3 rounded-xl font-semibold text-base hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            Enter →
          </button>
        </form>

        <p className="text-xs text-gray-300 text-center mt-8">
          Confidential Document · EFESO Consulting · v1.0 Demo
        </p>
      </div>
    </div>
  )
}
