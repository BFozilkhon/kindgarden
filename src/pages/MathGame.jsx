import { useEffect, useMemo, useState } from 'react'
import { useKid } from '../lib/useKid'
import { addCoins, getMathProgress, saveMathResult } from '../lib/useMathDB'
import { mathData } from '../data/mathData'
import MathVisual from '../components/MathVisual'
import MathQuestion from '../components/MathQuestion'
import CoinDisplay from '../components/CoinDisplay'
import ConfettiModal from '../components/ConfettiModal'

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
  const coins = progress.totalCoins || 0

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
    if (game==='comparison') return ['Left','Right','Equal']
    if (game==='numberLine') return q.options
    if (game==='shapes') return q.options
    return []
  }, [q, game])

  function isCorrect(selected){
    if (game==='counting') return selected === q.correct
    if (game==='addition') return selected === q.correct
    if (game==='subtraction') return selected === q.correct
    if (game==='comparison'){
      if (q.left===q.right) return selected==='Equal'
      return (q.left>q.right && selected==='Left') || (q.right>q.left && selected==='Right')
    }
    if (game==='numberLine') return selected === q.correct
    if (game==='shapes') return selected === q.target
    return false
  }

  const rewardMap = { counting:2, addition:3, subtraction:3, comparison:2, shapes:2, numberLine:4 }

  function onAnswer(selected){
    const ok = isCorrect(selected)
    saveMathResult(currentKid?.id || 'anon', game, ok)
    if (ok){
      addCoins(currentKid?.id || 'anon', rewardMap[game] || 2)
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white rounded-full shadow" onClick={back}>← Back</button>
        <div className="font-semibold">{currentKid?.name || 'Guest'}</div>
        <CoinDisplay coins={coins} />
      </div>
      <div className="bg-white rounded-3xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center capitalize">{game}</h2>
        <MathVisual game={game} data={visualData} />
        <MathQuestion options={options} onAnswer={onAnswer} />
      </div>
      <ConfettiModal open={confetti} onClose={()=>setConfetti(false)} />
    </div>
  )
}

