import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import TagInput from '../components/TagInput'
import { getPartners, updatePartner } from '../utils/storage'

const SECTORS = [
  'ERP & Finance',
  'Data & AI',
  'Process Automation & RPA',
  'CRM & Sales',
  'HR & Workforce',
  'Cloud & Infrastructure',
]

export default function EditPartner() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const partner = getPartners().find(p => p.id === id)
    if (!partner) { navigate('/home'); return }
    setForm({ ...partner })
  }, [id])

  if (!form) return null

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSave = (e) => {
    e.preventDefault()
    updatePartner(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.full_name || '')}&background=1B2E5E&color=fff&size=150&bold=true`

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-navy mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-6 py-5 flex items-center gap-4">
            <img
              src={form.avatar || fallbackAvatar}
              alt={form.full_name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/30 flex-shrink-0"
              onError={e => { e.target.onerror = null; e.target.src = fallbackAvatar }}
            />
            <div className="text-white min-w-0">
              <h1 className="text-lg font-bold truncate">{form.full_name}</h1>
              <p className="text-sm text-blue-200">{form.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">

            {/* Personal info */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Personal info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full name" value={form.full_name} onChange={v => set('full_name', v)} />
                <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} />
                <Field label="Phone" value={form.phone} onChange={v => set('phone', v)} />
                <Field label="LinkedIn URL" value={form.linkedin_url} onChange={v => set('linkedin_url', v)} />
                <div className="sm:col-span-2">
                  <Field label="Avatar URL" value={form.avatar} onChange={v => set('avatar', v)} />
                </div>
              </div>
            </div>

            {/* Solution description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solution description</label>
              <textarea
                value={form.solution_description || ''}
                onChange={e => set('solution_description', e.target.value)}
                rows={3}
                placeholder="Brief description of the technology solution offered..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Domains & Solutions</p>
              <div className="space-y-4">
                <TagInput
                  label="Technology domains"
                  tags={form.sectors}
                  onChange={v => set('sectors', v)}
                  suggestions={SECTORS}
                />
                <TagInput
                  label="Products / Solutions"
                  tags={form.solutions}
                  onChange={v => set('solutions', v)}
                />
              </div>
            </div>

            {/* Toggles */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Settings</p>
              <div className="flex gap-8">
                <Toggle
                  label="Active profile"
                  description="Partner is present in the system"
                  value={form.is_active}
                  onChange={v => set('is_active', v)}
                />
                <Toggle
                  label="Visible in search"
                  description="Appears in search results"
                  value={form.is_visible}
                  onChange={v => set('is_visible', v)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                  saved
                    ? 'bg-green-500 text-white scale-95'
                    : 'bg-navy text-white hover:bg-navy-light'
                }`}
              >
                {saved ? '✓ Saved!' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
      />
    </div>
  )
}

function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors mt-0.5 ${value ? 'bg-navy' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
      <div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
    </div>
  )
}
