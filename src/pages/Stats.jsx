import { useMemo } from 'react'
import { useKid } from '../lib/useKid'
import { getKids, getCoinHistory } from '../lib/localDB'
import { formatDateTime } from '../lib/date'
import { useTranslation } from 'react-i18next'

export default function Stats(){
  const { t, i18n } = useTranslation('t')
  const { teacherId } = useKid()
  const kids = getKids(undefined, teacherId)
  const top = useMemo(()=> kids.slice().sort((a,b)=>(b.coins||0)-(a.coins||0)).slice(0,3), [kids])
  const rest = useMemo(()=> kids.filter(k=> !top.find(x=>x.id===k.id)), [kids, top])
  const nominations = [t('stats.mostActive')||'Eng faol', t('stats.fastLearner')||'Tez o‘rganuvchi', t('stats.creative')||'Ijodkor']

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('stats.title')}</h2>
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">{t('stats.top3')}</h3>
        <ol className="space-y-2">
          {top.map((k,i)=> (
            <li key={k.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={k.avatar || '/assets/avatars/placeholder.png'} className="w-10 h-10 rounded-full" />
                <span>{i+1}. {k.name}</span>
              </div>
              <span className="font-bold text-yellow-600">{k.coins} 🪙</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">{t('stats.nominations')}</h3>
        <ul className="space-y-2">
          {rest.map((k,i)=> (
            <li key={k.id} className="flex items-center justify-between">
              <span>{k.name}</span>
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm">{nominations[i % nominations.length]}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-bold mb-2">{t('nav.selectChild')}</h3>
        <ul className="space-y-1">{kids.map(k=> <li key={k.id}>{k.name} — {k.coins} 🪙</li>)}</ul>
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">{t('stats.coinHistory')}</h3>
        <div className="space-y-4">
          {kids.map(k=> (
            <div key={k.id} className="border rounded-xl p-3">
              <div className="font-semibold mb-1">{k.name}</div>
              <ul className="space-y-1">
                {getCoinHistory(k.id).length ? getCoinHistory(k.id).map((tx, i)=> {
                  const reason = tx.reason === 'Welcome bonus' ? t('reasons.welcomeBonus') : tx.reason === 'Lesson reward' ? t('reasons.lessonReward') : (tx.reason || t('results.activity'))
                  return (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span>{formatDateTime(tx.ts, i18n.language)}</span>
                    <span className={tx.amount>0? 'text-green-700 font-bold':'text-red-700 font-bold'}>{tx.amount>0?'+':''}{tx.amount} 🪙</span>
                    <span className="text-slate-600">{reason}</span>
                  </li>
                )}) : (
                  <li className="text-slate-500 text-sm">{t('stats.empty')}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

