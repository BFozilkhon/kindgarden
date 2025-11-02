import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useKid } from '../lib/useKid'
import AvatarUploader from '../components/AvatarUploader'
import { updateKid, getKids, getCoinHistory } from '../lib/localDB'
import { formatDateTime } from '../lib/date'

export default function Profile(){
  const { t, i18n } = useTranslation('t')
  const { currentKid } = useKid()
  const [name, setName] = useState(currentKid?.name || '')
  const [avatar, setAvatar] = useState(currentKid?.avatar || '')
  const [groupId, setGroupId] = useState(currentKid?.groupId || 'g1')
  const groups = [{ id:'g1', name:'Quyoshlar' }, { id:'g2', name:'Kamalaklar' }]
  const kids = getKids()

  // Only resync when the selected kid ID changes (avoid resetting while typing)
  useEffect(()=>{
    setName(currentKid?.name || '')
    setAvatar(currentKid?.avatar || '')
    setGroupId(currentKid?.groupId || 'g1')
  }, [currentKid?.id])

  // Auto-save avatar changes immediately (so uploaded image persists)
  useEffect(()=>{
    if (!currentKid) return
    if (avatar && avatar !== currentKid.avatar){
      updateKid(currentKid.id, { avatar })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, currentKid?.id])

  const save = ()=>{
    if (!currentKid) return
    updateKid(currentKid.id, { name, avatar, groupId })
    alert(t('profile.save'))
  }

  if (!currentKid) return <p>{t('profile.noChild')}</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('profile.title')}</h2>
      <AvatarUploader value={avatar} onChange={setAvatar} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <label className="block text-sm">{t('profile.name')}</label>
          <input className="w-full px-3 py-2 rounded-xl bg-slate-50" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <label className="block text-sm">{t('profile.group')}</label>
          <select className="w-full px-3 py-2 rounded-xl bg-slate-50" value={groupId} onChange={(e)=>setGroupId(e.target.value)}>
            {groups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
      </div>
      <button className="px-6 py-3 bg-[var(--primary)] text-white rounded-full shadow" onClick={save}>{t('profile.save')}</button>


      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-bold mb-2">{t('results.coinHistory')}</h3>
        <ul className="space-y-2">
          {(getCoinHistory(currentKid.id) || []).slice().reverse().map((tx, i)=> {
            const reason = tx.reason === 'Welcome bonus' ? t('reasons.welcomeBonus') : tx.reason === 'Lesson reward' ? t('reasons.lessonReward') : (tx.reason || t('results.activity'))
            return (
              <li key={i} className="flex items-center justify-between text-sm">
              <span>{formatDateTime(tx.ts, i18n.language)}</span>
                <span className={tx.amount>0? 'text-green-700 font-bold':'text-red-700 font-bold'}>{tx.amount>0?'+':''}{tx.amount} 🪙</span>
                <span className="text-slate-600">{reason}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

