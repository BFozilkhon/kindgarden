export default function WordCard({ word, selected, onSelect }){
  return (
    <button
      className={`px-4 py-3 rounded-2xl border-2 ${selected?'border-[var(--primary)] bg-[color:rgb(141_102_255_/_.1)]':'border-transparent bg-white'} shadow`}
      onClick={onSelect}
      aria-pressed={!!selected}
    >
      <span className="text-lg font-semibold">{word}</span>
    </button>
  )
}

