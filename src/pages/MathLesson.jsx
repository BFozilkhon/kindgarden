import { useState } from 'react'
import { getLessons, saveLessonResult } from '../lib/localDB'
import CountingCards from '../components/CountingCards'
import Timer from '../components/Timer'
import BigCTAButton from '../components/BigCTAButton'
import { useKid } from '../lib/useKid'

export default function MathLesson(){
  const lessons = getLessons('math')
  const [activeId, setActiveId] = useState(lessons[0]?.id || null)
  const active = lessons.find(l=>l.id===activeId)
  const { currentKid } = useKid()
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState('practice') // or 'flash'

  const add = ()=> setCount(c=>Math.min(c+1, 10))
  const sub = ()=> setCount(c=>Math.max(c-1, 0))
  const finish = ()=>{
    const coins = Math.min(10, 1 + count)
    saveLessonResult(currentKid?.id, active?.id, { correct: count>0?1:0, incorrect: 0, coins })
  }

  if (!active) return <p>No math lessons available.</p>

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {lessons.map(l=> (
          <button key={l.id} onClick={()=>setActiveId(l.id)}
            className={`px-4 py-2 rounded-full ${l.id===activeId?'bg-[var(--primary)] text-white':'bg-white shadow'}`}
          >
            {l.title}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button className={`px-4 py-2 rounded-full ${mode==='practice'?'bg-[var(--primary)] text-white':'bg-white shadow'}`} onClick={()=>setMode('practice')}>Practice</button>
        <button className={`px-4 py-2 rounded-full ${mode==='flash'?'bg-[var(--primary)] text-white':'bg-white shadow'}`} onClick={()=>setMode('flash')}>Flash</button>
      </div>

      {mode==='practice' && (
        <div className="space-y-3 bg-white rounded-2xl shadow p-4">
          <h3 className="text-xl font-bold">Manipulatives</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-full" onClick={add} aria-label="Add one">+1</button>
            <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-full" onClick={sub} aria-label="Remove one">-1</button>
          </div>
          <CountingCards count={count} icon="🍎" />
          <BigCTAButton onClick={finish}>Save Result</BigCTAButton>
        </div>
      )}

      {mode==='flash' && (
        <div className="space-y-3 bg-white rounded-2xl shadow p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Timed</h3>
            <Timer seconds={20} onEnd={finish} />
          </div>
          <p>Answer as many as you can! Tap +1 when you solve one.</p>
          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-full" onClick={add}>+1</button>
          <div className="text-3xl font-black">{count}</div>
        </div>
      )}
    </div>
  )
}

