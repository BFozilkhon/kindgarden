export default function MathVisual({ game, data }){
  if (game==='counting'){
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: data.count }).map((_,i)=> (
          <div key={i} className="w-16 h-16 bg-white rounded-2xl shadow flex items-center justify-center text-3xl animate-[bounce_1s_ease-in-out_infinite]">
            {data.image}
          </div>
        ))}
      </div>
    )
  }
  if (game==='addition'){
    return (
      <div className="flex items-center justify-center gap-8 text-4xl">
        <span>{'🍌'.repeat(data.a)}</span>
        <span className="text-5xl font-black">+</span>
        <span>{'🍓'.repeat(data.b)}</span>
      </div>
    )
  }
  if (game==='subtraction'){
    return (
      <div className="flex items-center justify-center gap-8 text-4xl">
        <span>{'🎈'.repeat(data.a)}</span>
        <span className="text-5xl font-black">-</span>
        <span>{'🎈'.repeat(data.b)}</span>
      </div>
    )
  }
  if (game==='comparison'){
    return (
      <div className="grid grid-cols-2 gap-8 text-4xl">
        <div className="bg-white rounded-2xl shadow p-6 text-center">{'🦋'.repeat(data.left)}</div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">{'🦋'.repeat(data.right)}</div>
      </div>
    )
  }
  if (game==='numberLine'){
    return (
      <div className="flex items-center justify-center gap-4 text-3xl">
        {data.seq.map((n,i)=> <span key={i} className={`w-14 h-14 rounded-full flex items-center justify-center ${n===null?'bg-amber-200':'bg-white shadow'}`}>{n===null?'?':n}</span>)}
      </div>
    )
  }
  if (game==='shapes'){
    return (
      <div className="flex items-center justify-center gap-4 text-5xl">
        <span>⚪</span><span>⬜</span><span>🔺</span>
      </div>
    )
  }
  return null
}

