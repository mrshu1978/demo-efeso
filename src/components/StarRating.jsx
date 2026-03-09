import { useState } from 'react'

export default function StarRating({ partnerId, initial = 0, onChange }) {
  const [rating, setRating] = useState(initial)
  const [hover, setHover] = useState(0)

  const handleClick = (star) => {
    const next = star === rating ? 0 : star
    setRating(next)
    onChange?.(next)
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-lg leading-none transition-transform hover:scale-110 focus:outline-none"
          aria-label={`${star} stelle`}
        >
          <span className={
            star <= (hover || rating)
              ? 'text-amber-400'
              : 'text-gray-200'
          }>
            ★
          </span>
        </button>
      ))}
    </div>
  )
}
