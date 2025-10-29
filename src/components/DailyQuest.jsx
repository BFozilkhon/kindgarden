import { useMemo, useState } from 'react'
import BigCTAButton from './BigCTAButton'
import { useKid } from '../lib/useKid'
import { useTranslation } from 'react-i18next'
import { awardCoins } from '../lib/coins'

export default function DailyQuest(){
  const { t } = useTranslation('t')
  const todayKey = useMemo(()=>{
    const d = new Date();
    return `kg_daily_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  }, [])
  const { currentKid } = useKid()
  const [state, setState] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(todayKey)) || { lang:false, math:false, claimed:false } } catch { return { lang:false, math:false, claimed:false } }
  })

  const update = (partial)=>{
    const next = { ...state, ...partial }
    setState(next)
    try { localStorage.setItem(todayKey, JSON.stringify(next)) } catch {}
  }

  const canClaim = state.lang && state.math && !state.claimed
  const claim = ()=>{
    if (!currentKid) return
    if (!canClaim) return
    awardCoins(currentKid.id, 5, 'Kundalik topshiriq')
    update({ claimed: true })
    alert('+5 tanga!')
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        <QuestItem label={t('daily.watchLang')} done={state.lang} onToggle={()=>update({ lang: !state.lang })} icon="📚" />
        <QuestItem label={t('daily.solveMath')} done={state.math} onToggle={()=>update({ math: !state.math })} icon="🔢" />
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-slate-600 text-sm">{t('daily.rewardLabel', { n: 5 })}</span>
        <BigCTAButton onClick={claim} ariaLabel={t('daily.claim')}>{state.claimed? t('daily.claimed') : t('daily.claim')}</BigCTAButton>
      </div>
    </div>
  )
}

function QuestItem({ label, done, onToggle, icon }){
  return (
    <li className={`flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 ${done?'opacity-70':''}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
      <button onClick={onToggle} aria-pressed={done} className={`w-10 h-6 rounded-full ${done?'bg-green-500':'bg-slate-300'} relative`}>
        <span className={`absolute top-0.5 ${done?'right-0.5':'left-0.5'} w-5 h-5 bg-white rounded-full shadow transition-all`} />
      </button>
    </li>
  )
}



