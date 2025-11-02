import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getLessons, saveLessonResult } from '../lib/localDB'
import CharacterAnimator from '../components/CharacterAnimator'
import BigCTAButton from '../components/BigCTAButton'
import { useKid } from '../lib/useKid'

export default function MovementExercise(){
  const { t } = useTranslation('t')
  const moves = getLessons('movement')
  const [activeId, setActiveId] = useState(moves[0]?.id || null)
  const active = moves.find(m=>m.id===activeId)
  const { currentKid } = useKid()
  const [done, setDone] = useState(false)
  const actionLabel = (code)=> ({
    jump: t('movement.words.jump'),
    clap: t('movement.words.clap'),
    stretch: t('movement.words.stretch'),
    twist: t('movement.words.twist'),
  }[code] || code)

  const complete = ()=>{
    setDone(true)
    saveLessonResult(currentKid?.id, active?.id, { correct:1, incorrect:0, coins:3 })
  }

  if (!active) return <p>{t('movement.title')}</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('movement.title')}</h2>
      <div className="flex gap-2 overflow-x-auto">
        {moves.map(m=> (
          <button key={m.id} onClick={()=>{setActiveId(m.id); setDone(false)}}
            className={`px-4 py-2 rounded-full ${m.id===activeId?'bg-[var(--primary)] text-white':'bg-white shadow'}`}
          >
            {[...new Set(m.frames)].map(actionLabel).join(' & ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow p-6 flex flex-col items-center gap-4">
        <CharacterAnimator frames={active.frames} />
        <button
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--primary)] text-white shadow"
          onClick={()=>{
            try{ const u = new SpeechSynthesisUtterance(actionLabel(active.frames[0])); window.speechSynthesis?.speak(u) } catch {}
          }}
        >
          🔊 {actionLabel(active.frames[0])}
        </button>
      </div>
      <div className="text-slate-600">{t('movement.follow')}</div>
      <BigCTAButton onClick={complete} ariaLabel={t('movement.didIt')}>{t('movement.didIt')}</BigCTAButton>
      {done && <div className="text-green-700 font-bold">{t('movement.greatJobCoins', { n: 3 })}</div>}
    </div>
  )
}

