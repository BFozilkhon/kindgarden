import { useState } from 'react'
import Modal from '../components/Modal'
import BigCTAButton from '../components/BigCTAButton'
import { getKids, saveLessonResult, getLeaderboard, computeNominations } from '../lib/localDB'

export default function Competitions(){
  const groups = [{ id:'g1', name:'Sunflowers' }, { id:'g2', name:'Rainbows' }]
  const [groupId, setGroupId] = useState('g1')
  const [open, setOpen] = useState(false)
  const kids = getKids(groupId)

  const runCompetition = ()=>{
    kids.forEach(k=>{
      const coins = Math.floor(Math.random()*5) // 0..4
      if (coins>0) saveLessonResult(k.id, 'competition', { coins, correct:1, incorrect:0 })
    })
    setOpen(true)
  }

  const lb = getLeaderboard(groupId)
  const noms = computeNominations(groupId)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Guruh musobaqalari</h2>
      <select className="px-3 py-2 rounded-full bg-white shadow" value={groupId} onChange={(e)=>setGroupId(e.target.value)}>
        {groups.map(g=> <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      <div className="sticky top-20 z-10">
        <BigCTAButton onClick={runCompetition}>Musobaqani boshlash</BigCTAButton>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Bayram! 🎉">
        <p className="mb-2">Top 5 yangilandi. Barchaga raxmat!</p>
        <ul className="list-disc pl-6">
          <li>Eng faol: {kids.find(k=>k.id===noms.mostActive)?.name || '-'}</li>
          <li>Eng yordamchi: {kids.find(k=>k.id===noms.bestHelper)?.name || '-'}</li>
          <li>Eng rivojlangan: {kids.find(k=>k.id===noms.mostImproved)?.name || '-'}</li>
        </ul>
      </Modal>

      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-bold mb-2">Top 5</h3>
        <ol className="space-y-1">
          {lb.slice(0,5).map((k,i)=> <li key={k.kidId}>{i+1}. {k.name} — {k.coins} 🪙</li>)}
        </ol>
      </div>
    </div>
  )
}

