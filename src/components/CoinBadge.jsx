export default function CoinBadge({ amount=0 }){
  return (
    <div className="flex items-center gap-2 bg-white text-slate-900 px-3 py-2 rounded-full shadow">
      <span className="text-yellow-500 text-xl">🪙</span>
      <span className="font-bold">{amount}</span>
    </div>
  )
}

