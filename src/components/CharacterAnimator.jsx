import { useEffect, useState } from 'react'

export default function CharacterAnimator({ frames=['jump','clap'], speed=800 }){
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(()=>{
    if (paused) return
    const id = setInterval(()=> setIdx(i=> (i+1)%frames.length), speed)
    return ()=> clearInterval(id)
  },[frames, speed, paused])
  const frame = frames[idx]
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-white shadow flex items-center justify-center text-2xl">
        {frame==='jump'?'🦘':frame==='clap'?'👏':frame==='stretch'?'🤸':frame==='twist'?'🌀':'🙂'}
      </div>
      <button className="ml-4 px-3 py-2 rounded-full bg-white shadow" aria-pressed={paused} aria-label={paused? 'Play animation':'Pause animation'} onClick={()=>setPaused(p=>!p)}>{paused?'▶':'⏸'}</button>
    </div>
  )
}

