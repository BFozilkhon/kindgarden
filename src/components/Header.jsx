import { useKid } from '../lib/useKid'
import { getLeaderboard } from '../lib/localDB'
import CoinBadge from './CoinBadge'

import logo from '../assets/logo.png'

export default function Header(){
  const { kids, kidId, setKidId, currentKid } = useKid()
  const lb = currentKid ? getLeaderboard(currentKid.groupId) : []

  return (
    <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#/" className="flex items-center gap-2">
          <img src={logo} alt="KindGarden logo" className="w-18 h-18 scale-[1.2] rounded" />
          <span className="text-2xl font-extrabold tracking-wide">KindGarden</span>
        </a>
        <nav className="hidden md:flex gap-4">
          <a className="hover:underline" href="#/language">Til</a>
          <a className="hover:underline" href="#/math-home">Matematika</a>
          <a className="hover:underline" href="#/karaoke">Karaoke</a>
          <a className="hover:underline" href="#/cartoons">Multfilmlar</a>
          <a className="hover:underline" href="#/competitions">Musobaqalar</a>
          <a className="hover:underline" href="#/results">Natijalar</a>
          <a className="hover:underline" href="#/profile">Profil</a>
        </nav>
        <div className="flex items-center gap-2">
          <select
            aria-label="Bola tanlang"
            className="px-3 py-2 rounded-full text-slate-900"
            value={kidId || ''}
            onChange={(e)=>setKidId(e.target.value)}
          >
            {kids.map(k=> <option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
          {currentKid && <CoinBadge amount={currentKid.coins || 0} />}
        </div>
      </div>
      <div className="md:hidden flex gap-3 px-4 pb-3 text-sm">
        <a href="#/language">Til</a>
        <a href="#/math-home">Matematika</a>
        <a href="#/karaoke">Karaoke</a>
      </div>
    </header>
  )
}

