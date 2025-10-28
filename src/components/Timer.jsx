import { useEffect, useState } from 'react'

export default function Timer({ seconds=30, onEnd }){
  const [left, setLeft] = useState(seconds)
  useEffect(()=>{
    if (left<=0){ onEnd?.(); return }
    const id = setTimeout(()=> setLeft(left-1), 1000)
    return ()=> clearTimeout(id)
  },[left, onEnd])
  return <div className="px-4 py-2 bg-white rounded-full shadow font-bold">⏱ {left}s</div>
}

