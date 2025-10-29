import { useKid } from '../lib/useKid'
import { getLeaderboard, getCoinHistory } from '../lib/localDB'
import Leaderboard from '../components/Leaderboard'
import { useTranslation } from 'react-i18next'

export default function ResultBoard(){
  const { t } = useTranslation('t')
  const { currentKid } = useKid()
  if (!currentKid) return <p>{t('results.selectFirst')}</p>
  const lb = getLeaderboard(currentKid.groupId)
  const tx = getCoinHistory(currentKid.id)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-bold mb-3">{t('results.top5')}</h2>
        <Leaderboard items={lb} />
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-bold mb-3">{t('results.coinHistory')}</h2>
        <ul className="space-y-2">
          {tx.slice().reverse().map((t,i)=> (
            <li key={i} className="flex items-center justify-between">
              <span>{new Date(t.ts).toLocaleString()}</span>
              <span className="font-bold">{t.amount>0?'+':''}{t.amount} 🪙</span>
              <span className="text-slate-500">{t.reason || 'Activity'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

