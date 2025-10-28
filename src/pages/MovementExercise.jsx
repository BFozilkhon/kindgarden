import { useState } from 'react'
import { getLessons, saveLessonResult } from '../lib/localDB'
import CharacterAnimator from '../components/CharacterAnimator'
import BigCTAButton from '../components/BigCTAButton'
import { useKid } from '../lib/useKid'

export default function MovementExercise(){
  const moves = getLessons('movement')
  const [activeId, setActiveId] = useState(moves[0]?.id || null)
  const active = moves.find(m=>m.id===activeId)
  const { currentKid } = useKid()
  const [done, setDone] = useState(false)

  const complete = ()=>{
    setDone(true)
    saveLessonResult(currentKid?.id, active?.id, { correct:1, incorrect:0, coins:3 })
  }

  if (!active) return <p>No movement exercises.</p>

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {moves.map(m=> (
          <button key={m.id} onClick={()=>{setActiveId(m.id); setDone(false)}}
            className={`px-4 py-2 rounded-full ${m.id===activeId?'bg-[var(--primary)] text-white':'bg-white shadow'}`}
          >
            {m.title}
          </button>
        ))}
      </div>

      <CharacterAnimator frames={active.frames} />
      <div className="text-slate-600">Follow along! Languages: {active.languages.join(', ')}</div>
      <BigCTAButton onClick={complete} ariaLabel="I did it">I did it!</BigCTAButton>
      {done && <div className="text-green-700 font-bold">Great job! +3 coins</div>}
    </div>
  )
}

