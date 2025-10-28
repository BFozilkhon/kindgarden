export default function CoinDisplay({ coins=0 }){
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow">
      <span className="text-yellow-500 text-xl">🪙</span>
      <span className="font-bold">{coins}</span>
    </div>
  )
}

