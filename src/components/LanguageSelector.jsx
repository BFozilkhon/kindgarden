export default function LanguageSelector({ value, onChange, options }){
  return (
    <div className="flex gap-2">
      {options.map(o=> (
        <button
          key={o.key}
          className={`px-4 py-2 rounded-full shadow ${value===o.key?'bg-[var(--primary)] text-white':'bg-white'}`}
          onClick={()=>onChange(o.key)}
          aria-pressed={value===o.key}
          aria-label={`Select ${o.label}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

