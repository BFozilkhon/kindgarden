import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useKid } from '../lib/useKid'
import CoinDisplay from '../components/CoinDisplay'
import Modal from '../components/Modal'
import { saveLessonResult } from '../lib/localDB'

const ANIMALS = [
  { name: { en:'cat', uz:'mushuk', ru:'кот' }, emoji:'🐱' },
  { name: { en:'dog', uz:'it', ru:'собака' }, emoji:'🐶' },
  { name: { en:'cow', uz:'sigir', ru:'корова' }, emoji:'🐮' },
  { name: { en:'fish', uz:'baliq', ru:'рыба' }, emoji:'🐟' },
  { name: { en:'bird', uz:'qush', ru:'птица' }, emoji:'🐦' },
]

function randomInt(a,b){ return a + Math.floor(Math.random()*(b-a+1)) }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }

export default function CompetitionTF(){
  const { t, i18n } = useTranslation('t')
  const { currentKid } = useKid()
  const [score, setScore] = useState(0)
  const [tLeft, setTLeft] = useState(120)
  const [q, setQ] = useState(()=> makeQuestion(i18n.language))
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if (tLeft<=0){ setOpen(true); return }
    const id = setTimeout(()=> setTLeft(s=>s-1), 1000)
    return ()=> clearTimeout(id)
  }, [tLeft])

  useEffect(()=>{
    // refresh localized question on language change to keep wording correct
    setQ(makeQuestion(i18n.language))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  function makeQuestion(lang){
    const shown = pick(ANIMALS)
    // 50% ask about the shown, 50% ask about a different one
    const askReal = Math.random()<0.5
    let target = shown
    if (!askReal){
      let other = pick(ANIMALS)
      while (other.emoji === shown.emoji){ other = pick(ANIMALS) }
      target = other
    }
    const label = target.name[lang.startsWith('ru')?'ru':lang.startsWith('en')?'en':'uz']
    const text = t('competitions.isIt', { x: label })
    const answer = askReal // true if we asked about the shown animal
    return { emoji: shown.emoji, text, answer }
  }

  function answerPick(val){
    if (tLeft<=0) return
    const ok = Boolean(val) === q.answer
    if (ok){
      setScore(s=>s+1)
      if (currentKid?.id) saveLessonResult(currentKid.id, 'competition:imageTF', { coins:1, correct:1, incorrect:0 })
    }
    setQ(makeQuestion(i18n.language))
  }
  function back(){ window.location.hash = '/competitions' }
  function playAgain(){ setScore(0); setTLeft(120); setQ(makeQuestion(i18n.language)); setOpen(false) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← {t('misc.back')}</button>
        <div className="font-semibold">{currentKid?.name || t('misc.guest')}</div>
        <CoinDisplay coins={currentKid?.coins || 0} />
      </div>
      <div className="bg-white rounded-3xl shadow p-6 space-y-6 text-center">
        <div className="text-sm text-slate-500">{t('competitions.time')}: <span className="font-bold">{tLeft}s</span> • {t('learn.score', { n:'' })?.split(':')[0]}: <span className="font-bold">{score}</span></div>
        <div className="text-[140px] leading-none">{q.emoji}</div>
        <div className="text-2xl font-bold">{q.text}</div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="px-6 py-4 bg-emerald-500 text-white rounded-full shadow active:scale-95" onClick={()=>answerPick(true)}>{t('competitions.true')}</button>
          <button className="px-6 py-4 bg-rose-500 text-white rounded-full shadow active:scale-95" onClick={()=>answerPick(false)}>{t('competitions.false')}</button>
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


