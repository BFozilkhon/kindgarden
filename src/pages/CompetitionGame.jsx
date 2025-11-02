import { useEffect, useMemo, useState } from 'react'
import CoinDisplay from '../components/CoinDisplay'
import { useKid } from '../lib/useKid'
import { addCoins } from '../lib/useMathDB'
import { saveLessonResult } from '../lib/localDB'
import Modal from '../components/Modal'
import { useTranslation } from 'react-i18next'

function getHashParam(key){
  const h = window.location.hash || ''
  const qi = h.indexOf('?')
  if (qi === -1) return null
  const q = h.slice(qi+1)
  const sp = new URLSearchParams(q)
  return sp.get(key)
}

function randomInt(a,b){ return a + Math.floor(Math.random()*(b-a+1)) }

export default function CompetitionGame(){
  const { t } = useTranslation('t')
  const type = getHashParam('c') || 'fastMultiply'
  const { currentKid } = useKid()
  const [score, setScore] = useState(0)
  const [tLeft, setTLeft] = useState(120)
  const [q, setQ] = useState(()=> makeQuestion(type))
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    if (tLeft<=0){ setOpen(true); return }
    const id = setTimeout(()=> setTLeft(s=>s-1), 1000)
    return ()=> clearTimeout(id)
  }, [tLeft])

  function makeQuestion(kind){
    if (kind==='fastMultiply'){
      const a = randomInt(1,9), b = randomInt(1,9), ans = a*b
      const opts = shuffle([ans, ans+1, Math.max(0, ans-1)])
      return { text:`${a} × ${b} = ?`, options: opts, correct: ans }
    }
    if (kind==='numberMatch'){
      const a = randomInt(1,9)
      const opts = shuffle([a, a+1, Math.max(1,a-1)])
      return { text:t('competitions.matchPrompt'), display:a, options: opts, correct:a }
    }
    return { text:'', options:[], correct:null }
  }
  function shuffle(arr){ return [...arr].sort(()=> Math.random()-0.5) }

  function answerPick(v){
    if (tLeft<=0) return
    const ok = v===q.correct
    if (ok){
      setScore(s=>s+1)
      addCoins(currentKid?.id||'anon', 1)
      if (currentKid?.id) saveLessonResult(currentKid.id, 'competition', { coins:1, correct:1, incorrect:0 })
    }
    setQ(makeQuestion(type))
  }
  function back(){ window.location.hash = '/competitions' }
  function finish(){ setTLeft(0); setOpen(true) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← {t('misc.back')}</button>
        <div className="font-semibold">{currentKid?.name || t('misc.guest')}</div>
        <CoinDisplay coins={currentKid?.coins || 0} />
      </div>
      <div className="bg-white rounded-3xl shadow p-6 space-y-4 text-center">
        <div className="text-sm text-slate-500">{t('competitions.time')}: <span className="font-bold">{tLeft}s</span> • {t('learn.score', { n:'' })?.split(':')[0]}: <span className="font-bold">{score}</span></div>
        {type==='numberMatch' && (
          <div className="text-[120px] leading-none text-indigo-600 font-black">{q.display}</div>
        )}
        <div className="text-2xl font-bold">{q.text}</div>
        <div className="flex gap-3 justify-center flex-wrap">
          {q.options.map((o,i)=> (
            <button key={i} className="px-6 py-4 bg-[var(--primary)] text-white rounded-full shadow active:scale-95" onClick={()=>answerPick(o)}>{o}</button>
          ))}
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-full shadow" onClick={finish}>{t('competitions.finish')}</button>
      </div>
      <Modal open={open} onClose={()=> setOpen(false)} title={t('competitions.finished')}>
        <p className="mb-3">{t('competitions.finalScore', { n: score })}</p>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded-full bg-white shadow" onClick={back}>{t('misc.back')}</button>
          <button className="px-4 py-2 rounded-full bg-[var(--primary)] text-white shadow" onClick={()=>{ setScore(0); setTLeft(30); setQ(makeQuestion(type)); setOpen(false) }}>{t('competitions.playAgain')}</button>
        </div>
      </Modal>
    </div>
  )
}

