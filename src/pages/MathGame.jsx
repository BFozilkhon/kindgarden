import { useMemo, useState } from 'react'
import { useKid } from '../lib/useKid'
import { addCoins, getMathProgress, saveMathResult } from '../lib/useMathDB'
import { saveLessonResult } from '../lib/localDB'
import { mathData } from '../data/mathData'
import MathVisual from '../components/MathVisual'
import MathQuestion from '../components/MathQuestion'
import CoinDisplay from '../components/CoinDisplay'
import ConfettiModal from '../components/ConfettiModal'
import { useTranslation } from 'react-i18next'

function getHashParam(key){
  const h = window.location.hash || ''
  const qi = h.indexOf('?')
  if (qi === -1) return null
  const q = h.slice(qi+1)
  const sp = new URLSearchParams(q)
  return sp.get(key)
}

function shuffle(arr){ return [...arr].sort(()=> Math.random()-0.5) }

export default function MathGame(){
  const game = getHashParam('g') || 'counting'
  const { currentKid } = useKid()
  const [idx, setIdx] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const progress = getMathProgress(currentKid?.id || 'anon')
  const coins = currentKid?.coins || 0
  const { t } = useTranslation('t')
  const isLearn = ['colors','numbers','animals'].includes(game)

  const q = useMemo(()=>{
    if (game==='counting') return mathData.counting[idx % mathData.counting.length]
    if (game==='addition') return mathData.addition[idx % mathData.addition.length]
    if (game==='subtraction') return mathData.subtraction[idx % mathData.subtraction.length]
    if (game==='comparison') return mathData.comparison[idx % mathData.comparison.length]
    if (game==='numberLine') return mathData.numberLine[idx % mathData.numberLine.length]
    if (game==='shapes') return { target: shuffle(mathData.shapes)[0], options: shuffle(['circle','square','triangle']) }
    return null
  }, [game, idx])

  const options = useMemo(()=>{
    if (!q) return []
    if (game==='counting') return q.options
    if (game==='addition') return q.options
    if (game==='subtraction') return q.options
    if (game==='comparison') return [t('compare.left'), t('compare.right'), t('compare.equal')]
    if (game==='numberLine') return q.options
    if (game==='shapes') return [t('shapes.circle'), t('shapes.square'), t('shapes.triangle')]
    return []
  }, [q, game])

  function isCorrect(selected){
    if (game==='counting') return selected === q.correct
    if (game==='addition') return selected === q.correct
    if (game==='subtraction') return selected === q.correct
    if (game==='comparison'){
      const L=t('compare.left'), R=t('compare.right'), E=t('compare.equal')
      if (q.left===q.right) return selected===E
      return (q.left>q.right && selected===L) || (q.right>q.left && selected===R)
    }
    if (game==='numberLine') return selected === q.correct
    if (game==='shapes'){
      const map = { [t('shapes.circle')]:'circle', [t('shapes.square')]:'square', [t('shapes.triangle')]:'triangle' }
      return map[selected] === q.target
    }
    return false
  }

  const rewardMap = { counting:2, addition:3, subtraction:3, comparison:2, shapes:2, numberLine:4 }

  function onAnswer(selected){
    const ok = isCorrect(selected)
    saveMathResult(currentKid?.id || 'anon', game, ok)
    if (ok){
      const reward = rewardMap[game] || 2
      addCoins(currentKid?.id || 'anon', reward)
      if (currentKid?.id) saveLessonResult(currentKid.id, `math:${game}`, { coins: reward, correct:1, incorrect:0 })
      if (((getMathProgress(currentKid?.id || 'anon').games[game]?.score||0) % 5) === 0){
        setConfetti(true)
      }
      setIdx(i=>i+1)
    } else {
      // small shake by toggling key
      setIdx(i=>i)
    }
  }

  const visualData = useMemo(()=>{
    if (game==='counting') return q
    if (game==='addition') return q
    if (game==='subtraction') return q
    if (game==='comparison') return q
    if (game==='numberLine') return q
    if (game==='shapes') return q
    return null
  }, [q, game])

  function back(){ window.location.hash = '/math-home' }

  if (isLearn){
    const items = game==='colors' ? mathData.colors : game==='numbers' ? mathData.numbers : mathData.animals
    const total = items.length
    const item = items[idx % total]
    const [score, setScore] = useState(0)
    function prev(){ setIdx(i=> (i-1+total)%total) }
    function next(){ setIdx(i=> (i+1)%total); addCoins(currentKid?.id||'anon', 1); setScore(s=>s+1) }
    function hear(){
      try { const u = new SpeechSynthesisUtterance(String(item.name || item)); window.speechSynthesis?.speak(u) } catch {}
    }
    const title = game==='colors' ? t('learn.colorsTitle') : game==='numbers' ? t('learn.numbersTitle') : t('learn.animalsTitle')
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← {t('misc.back')}</button>
          <div className="font-semibold">{currentKid?.name || 'Guest'}</div>
          <CoinDisplay coins={currentKid?.coins || 0} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center">{title}</h2>
        <div className="flex items-center justify-center">
          <div className="rounded-3xl shadow bg-white p-6 md:p-10">
            {game==='colors' && (
              <div className="flex items-center justify-center">
                <div className="rounded-3xl" style={{ width: 320, height: 220, background: item.hex, color: item.text||'#ffffff' }} />
              </div>
            )}
            {game==='numbers' && (
              <div className="text-[120px] md:text-[180px] font-black text-indigo-500 leading-none text-center">{item}</div>
            )}
            {game==='animals' && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-[120px] md:text-[160px] leading-none">{item.emoji}</div>
                <div className="text-xl md:text-2xl font-bold">{item.name}</div>
                <button className="px-5 py-2 rounded-full bg-amber-500 text-white shadow" onClick={hear}>🔊 {t('learn.hear')}</button>
              </div>
            )}
            <div className="mt-6 flex items-center justify-center gap-6">
              <button className="w-12 h-12 rounded-full bg-purple-300 text-white text-2xl" onClick={prev}>{t('learn.prev')}</button>
              <div className="px-6 py-2 rounded-full bg-white shadow font-bold">{(idx%total)+1} / {total}</div>
              <button className="w-12 h-12 rounded-full bg-purple-600 text-white text-2xl" onClick={next}>{t('learn.next')}</button>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <div className="px-6 py-3 rounded-full bg-amber-400 text-white font-bold shadow">⭐ {t('learn.score', { n: score })}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← {t('misc.back')}</button>
        <div className="font-semibold">{currentKid?.name || t('misc.guest')}</div>
        <CoinDisplay coins={currentKid?.coins || 0} />
      </div>
      <div className="bg-white rounded-3xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center capitalize">{(
          game==='counting' ? t('mathHome.counting') :
          game==='addition' ? t('mathHome.addition') :
          game==='subtraction' ? t('mathHome.subtraction') :
          game==='comparison' ? t('mathHome.comparison') :
          game==='numberLine' ? t('mathHome.line') :
          game==='shapes' ? t('mathHome.shapes') : game
        )}</h2>
        <MathVisual game={game} data={visualData} />
        <MathQuestion options={options} onAnswer={onAnswer} />
      </div>
      <ConfettiModal open={confetti} onClose={()=>setConfetti(false)} />
    </div>
  )
}

