export default function Leaderboard({ items=[] }){
  return (
    <ol className="bg-white rounded-2xl shadow p-4 space-y-2">
      {items.slice(0,5).map((it, idx)=> (
        <li key={it.kidId} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={it.avatar || '/assets/avatars/placeholder.png'} alt={it.name} className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold">{idx+1}. {it.name}</span>
          </div>
          <span className="text-yellow-600 font-bold">{it.coins} 🪙</span>
        </li>
      ))}
    </ol>
  )
}

