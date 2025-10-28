export default function ConfettiModal({ open, onClose, message='Great Job!' }){
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow p-6 max-w-sm w-full text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-2xl font-extrabold mb-2">{message}</h3>
        <p className="text-slate-600 mb-4">You earned coins and made progress!</p>
        <button className="px-6 py-3 bg-[var(--primary)] rounded-full text-white" onClick={onClose}>Yay!</button>
      </div>
    </div>
  )
}

