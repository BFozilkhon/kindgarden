export default function NominationBadge({ label }){
  if (!label) return null
  return (
    <span className="inline-block bg-[var(--accent)] text-white px-3 py-1 rounded-full text-sm shadow">{label}</span>
  )
}

