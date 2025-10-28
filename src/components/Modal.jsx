export default function Modal({ open, onClose, title, children }){
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow p-4 max-w-md w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <button aria-label="Close" onClick={onClose} className="text-slate-500">✖</button>
        </div>
        {children}
      </div>
    </div>
  )
}

