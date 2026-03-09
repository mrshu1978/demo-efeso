import { useState } from 'react'

export default function TagInput({ label, tags, onChange, suggestions = [] }) {
  const [input, setInput] = useState('')
  const [showSugg, setShowSugg] = useState(false)

  const filtered = suggestions.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  )

  const add = (tag) => {
    const t = tag.trim()
    if (t && !tags.includes(t)) onChange([...tags, t])
    setInput('')
    setShowSugg(false)
  }

  const remove = (tag) => onChange(tags.filter(t => t !== tag))

  const handleKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (input.trim()) add(input) }
    if (e.key === 'Backspace' && !input && tags.length) remove(tags[tags.length - 1])
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="border border-gray-300 rounded-lg p-2 min-h-[44px] flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-navy focus-within:border-navy bg-white">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 bg-navy text-white text-xs px-2.5 py-1 rounded-full">
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="hover:text-red-300 leading-none text-base"
            >
              ×
            </button>
          </span>
        ))}
        <div className="relative flex-1 min-w-[120px]">
          <input
            value={input}
            onChange={e => { setInput(e.target.value); setShowSugg(true) }}
            onKeyDown={handleKey}
            onFocus={() => setShowSugg(true)}
            onBlur={() => setTimeout(() => setShowSugg(false), 150)}
            placeholder={tags.length ? '' : 'Aggiungi...'}
            className="w-full text-sm outline-none bg-transparent py-0.5"
          />
          {showSugg && filtered.length > 0 && (
            <div className="absolute top-7 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px] max-h-48 overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={() => add(s)}
                  className="block w-full text-left text-sm px-3 py-2 hover:bg-blue-50 hover:text-navy"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-0.5">Premi Invio per aggiungere · Backspace per rimuovere l'ultimo</p>
    </div>
  )
}
