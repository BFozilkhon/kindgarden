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
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#/" className="flex items-center gap-2">
          <img src={logo} alt="KindGarden logo" className="w-18 h-18 scale-[1.2] rounded" />
          <span className="text-2xl font-extrabold tracking-wide">KindGarden</span>
        </a>
        <nav className="hidden md:flex gap-4">
          <a className="hover:underline" href="#/language">{t('nav.language')}</a>
          <a className="hover:underline" href="#/math-home">{t('nav.math')}</a>
          <a className="hover:underline" href="#/karaoke">{t('nav.karaoke')}</a>
          <a className="hover:underline" href="#/cartoons">{t('nav.cartoons')}</a>
          <a className="hover:underline" href="#/results">{t('nav.results')}</a>
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
      {open && (
        <div className="md:hidden px-4 pb-2 text-sm">
          <div className="flex gap-3 overflow-x-auto">
            <a href="#/language">{t('nav.language')}</a>
            <a href="#/math-home">{t('nav.math')}</a>
            <a href="#/karaoke">{t('nav.karaoke')}</a>
            <a href="#/cartoons">{t('nav.cartoons')}</a>
            <a href="#/results">{t('nav.results')}</a>
            <a href="#/profile">{t('nav.profile')}</a>
          </div>
        </div>
      )}
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

