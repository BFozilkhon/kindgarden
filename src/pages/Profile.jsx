import { useState } from 'react'
import { useKid } from '../lib/useKid'
import AvatarUploader from '../components/AvatarUploader'
import { updateKid, getKids } from '../lib/localDB'

export default function Profile(){
  const { currentKid } = useKid()
  const [name, setName] = useState(currentKid?.name || '')
  const [avatar, setAvatar] = useState(currentKid?.avatar || '')
  const [groupId, setGroupId] = useState(currentKid?.groupId || 'g1')
  const groups = [{ id:'g1', name:'Quyoshlar' }, { id:'g2', name:'Kamalaklar' }]
  const kids = getKids()

  const save = ()=>{
    if (!currentKid) return
    updateKid(currentKid.id, { name, avatar, groupId })
    alert('Saqlandi!')
  }

  if (!currentKid) return <p>Bosh qismdan bolani tanlang.</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profil</h2>
      <AvatarUploader value={avatar} onChange={setAvatar} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <label className="block text-sm">Ism</label>
          <input className="w-full px-3 py-2 rounded-xl bg-slate-50" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4 space-y-2">
          <label className="block text-sm">Guruh</label>
          <select className="w-full px-3 py-2 rounded-xl bg-slate-50" value={groupId} onChange={(e)=>setGroupId(e.target.value)}>
            {groups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
      </div>
      <button className="px-6 py-3 bg-[var(--primary)] text-white rounded-full shadow" onClick={save}>Saqlash</button>

      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-bold mb-2">Barcha bolalar</h3>
        <ul className="space-y-1">{kids.map(k=> <li key={k.id}>{k.name} — {k.coins} 🪙</li>)}</ul>
      </div>
    </div>
  )
}

