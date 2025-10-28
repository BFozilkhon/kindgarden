import { useKid } from '../lib/useKid'
import { getMathProgress, resetMathProgress } from '../lib/useMathDB'

export default function MathResult(){
  const { currentKid } = useKid()
  const p = getMathProgress(currentKid?.id || 'anon')
  const games = Object.entries(p.games || {})

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Math Results</h2>
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Total Coins</div>
          <div className="text-yellow-600 font-bold">{p.totalCoins} 🪙</div>
        </div>
        <ul className="space-y-2">
          {games.map(([key,val])=> (
            <li key={key} className="flex items-center justify-between">
              <span className="capitalize">{key}</span>
              <span>Score: {val.score} / Attempts: {val.attempts}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3">
        <a href="#/math-home" className="px-6 py-3 bg-[var(--primary)] text-white rounded-full shadow">Next Game</a>
        <button className="px-6 py-3 bg-slate-200 rounded-full shadow" onClick={()=>{ resetMathProgress(currentKid?.id || 'anon'); location.reload() }}>Reset</button>
      </div>
    </div>
  )
}

