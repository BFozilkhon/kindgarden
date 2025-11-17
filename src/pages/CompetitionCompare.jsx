import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useKid } from '../lib/useKid'
import CoinDisplay from '../components/CoinDisplay'
import Modal from '../components/Modal'
import { saveLessonResult } from '../lib/localDB'

function randomInt(a,b){ return a + Math.floor(Math.random()*(b-a+1)) }

export default function CompetitionCompare(){
  const { t } = useTranslation('t')
  const { currentKid } = useKid()
  const [score, setScore] = useState(0)
  const [tLeft, setTLeft] = useState(120)
  const [q, setQ] = useState(()=> makeQuestion())
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if (tLeft<=0){ setOpen(true); return }
    const id = setTimeout(()=> setTLeft(s=>s-1), 1000)
    return ()=> clearTimeout(id)
  }, [tLeft])

  function makeQuestion(){
    const a = randomInt(0, 20)
    const b = randomInt(0, 20)
    return { a, b, biggerIsLeft: a > b }
  }
  function back(){ window.location.hash = '/competitions' }
  function playAgain(){ setScore(0); setTLeft(120); setQ(makeQuestion()); setOpen(false) }
  function answerPick(val){
    if (tLeft<=0) return
    const ok = Boolean(val) === q.biggerIsLeft
    if (ok){
      setScore(s=>s+1)
      if (currentKid?.id) saveLessonResult(currentKid.id, 'competition:compare', { coins:1, correct:1, incorrect:0 })
    }
    setQ(makeQuestion())
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← {t('misc.back')}</button>
        <div className="font-semibold">{currentKid?.name || t('misc.guest')}</div>
        <CoinDisplay coins={currentKid?.coins || 0} />
      </div>
      <div className="bg-white rounded-3xl shadow p-6 space-y-6 text-center">
        <div className="text-sm text-slate-500">{t('competitions.time')}: <span className="font-bold">{tLeft}s</span> • {t('learn.score', { n:'' })?.split(':')[0]}: <span className="font-bold">{score}</span></div>
        <div className="text-4xl font-bold flex items-center justify-center gap-8">
          <span className="text-indigo-600">{q.a}</span>
          <span>?</span>
          <span className="text-rose-600">{q.b}</span>
        </div>
        <div className="text-slate-600">{t('competitions.biggerSmaller')}</div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="px-6 py-4 bg-emerald-500 text-white rounded-full shadow active:scale-95" onClick={()=>answerPick(true)}>{t('compare.left')}</button>
          <button className="px-6 py-4 bg-rose-500 text-white rounded-full shadow active:scale-95" onClick={()=>answerPick(false)}>{t('compare.right')}</button>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-full shadow" onClick={()=>setOpen(true)}>{t('competitions.finish')}</button>
      </div>
      <Modal open={open} onClose={playAgain} title={t('competitions.finished')}>
        <p className="mb-3">{t('competitions.finalScore', { n: score })}</p>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-full bg-white shadow" onClick={back}>{t('misc.back')}</button>
          <button className="px-4 py-2 rounded-full bg-[var(--primary)] text-white shadow" onClick={playAgain}>{t('competitions.playAgain')}</button>
        </div>
      </Modal>
    </div>
  )
}


