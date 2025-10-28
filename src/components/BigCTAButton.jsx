export default function BigCTAButton({ children, onClick, ariaLabel }){
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || (typeof children==='string'?children:'CTA')}
      className="px-6 py-4 bg-[var(--primary)] text-white rounded-full shadow text-lg active:scale-95 transition-transform"
    >
      {children}
    </button>
  )
}

