export default function ScoreBadge({ score, isTop }) {
  if (score === null) return null

  const ring =
    score >= 75 ? 'bg-green-500' :
    score >= 50 ? 'bg-amber-500' :
    'bg-slate-400'

  return (
    <div className="flex flex-col items-end gap-1 flex-shrink-0">
      {isTop && (
        <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
          ★ Best Match
        </span>
      )}
      <div className={`${ring} text-white rounded-full w-12 h-12 flex flex-col items-center justify-center`}>
        <span className="text-base font-bold leading-none">{score}</span>
        <span className="text-[9px] leading-none opacity-75 mt-0.5">score</span>
      </div>
    </div>
  )
}
