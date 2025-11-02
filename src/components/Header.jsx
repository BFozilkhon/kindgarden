import { useKid } from '../lib/useKid'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import { useState } from 'react'
import { getLeaderboard } from '../lib/localDB'
import CoinBadge from './CoinBadge'

import logo from '../assets/logo.png'

export default function Header(){
  const { teachers, teacherId, setTeacherId, kids, kidId, setKidId, currentKid } = useKid()
  const { t } = useTranslation('t')
  const lb = currentKid ? getLeaderboard(currentKid.groupId) : []
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#/" className="flex items-center gap-2">
          <img src={logo} alt="Bolajon logo" className="w-18 h-18 scale-[1.2] rounded" />
          <span className="text-2xl font-extrabold tracking-wide">Bolajon</span>
        </a>
        <nav className="hidden md:flex gap-4">
          <a className="hover:underline" href="#/language">{t('nav.language')}</a>
          <a className="hover:underline" href="#/math-home">{t('nav.math')}</a>
          <a className="hover:underline" href="#/movement">{t('nav.movement')}</a>
          <a className="hover:underline" href="#/karaoke">{t('nav.karaoke')}</a>
          <a className="hover:underline" href="#/cartoons">{t('nav.cartoons')}</a>
          <a className="hover:underline" href="#/competitions">{t('nav.competitions')}</a>
          <a className="hover:underline" href="#/stats">{t('nav.stats')}</a>
          <a className="hover:underline" href="#/profile">{t('nav.profile')}</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <select
            aria-label={t('nav.selectTeacher')}
            className="px-3 py-2 rounded-full bg-white text-slate-900 min-w-[170px]"
            value={teacherId || ''}
            onChange={(e)=> setTeacherId(e.target.value)}
          >
            {teachers.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select
            aria-label={t('nav.selectChild')}
            className="px-3 py-2 rounded-full bg-white text-slate-900 min-w-[140px]"
            value={kidId || ''}
            onChange={(e)=>setKidId(e.target.value)}
          >
            {kids.map(k=> <option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
          {currentKid && <CoinBadge amount={currentKid.coins || 0} />}
        </div>
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button className="bg-white/20 px-3 py-2 rounded-full" aria-label="Menu" onClick={()=> setOpen(o=>!o)}>☰</button>
        </div>
      </div>
      {/* Mobile Right Drawer */}
      <div className={`md:hidden fixed inset-0 z-40 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
        {/* Backdrop */}
        <div onClick={()=>setOpen(false)} className={`absolute inset-0 bg-black/30 transition-opacity ${open?'opacity-100':'opacity-0'}`} />
        {/* Drawer Panel */}
        <div className={`absolute right-0 top-0 h-full w-72 bg-white text-slate-900 shadow-xl transition-transform ${open?'translate-x-0':'translate-x-full'}`} role="dialog" aria-modal="true">
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-extrabold text-lg">Menu</span>
            <button onClick={()=>setOpen(false)} aria-label="Close" className="px-3 py-1 rounded-full bg-slate-100">✕</button>
          </div>
          <nav className="p-4 grid gap-3 text-base">
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/language">{t('nav.language')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/math-home">{t('nav.math')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/movement">{t('nav.movement')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/karaoke">{t('nav.karaoke')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/cartoons">{t('nav.cartoons')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/competitions">{t('nav.competitions')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/stats">{t('nav.stats')}</a>
            <a onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100" href="#/profile">{t('nav.profile')}</a>
          </nav>
        </div>
      </div>
      <div className="md:hidden border-t border-white/10 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <select
          aria-label={t('nav.selectTeacher')}
          className="px-3 py-2 rounded-full bg-white text-slate-900 min-w-[160px]"
          value={teacherId || ''}
          onChange={(e)=> setTeacherId(e.target.value)}
        >
          {teachers.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select
          aria-label={t('nav.selectChild')}
          className="px-3 py-2 rounded-full bg-white text-slate-900 min-w-[140px]"
          value={kidId || ''}
          onChange={(e)=>setKidId(e.target.value)}
        >
          {kids.map(k=> <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <div className="shrink-0">
          {currentKid && <CoinBadge amount={currentKid.coins || 0} />}
        </div>
      </div>
    </header>
  )
}

