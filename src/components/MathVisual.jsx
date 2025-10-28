export default function MathVisual({ game, data }){
  if (game==='counting'){
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: data.count }).map((_,i)=> (
          <div key={i} className="w-12 h-12 bg-white rounded-2xl shadow flex items-center justify-center text-2xl animate-[bounce_1s_ease-in-out_infinite]">
            {data.image}
          </div>
        ))}
      </div>
    )
  }
  if (game==='addition'){
    return (
      <div className="flex items-center justify-center gap-6 text-2xl">
        <span>{'🍌'.repeat(data.a)}</span>
        <span className="text-3xl font-black">+</span>
        <span>{'🍓'.repeat(data.b)}</span>
      </div>
    )
  }
  if (game==='subtraction'){
    return (
      <div className="flex items-center justify-center gap-6 text-2xl">
        <span>{'🎈'.repeat(data.a)}</span>
        <span className="text-3xl font-black">-</span>
        <span>{'🎈'.repeat(data.b)}</span>
      </div>
    )
  }
  if (game==='comparison'){
    return (
      <div className="grid grid-cols-2 gap-6 text-2xl">
        <div className="bg-white rounded-2xl shadow p-4 text-center">{'🦋'.repeat(data.left)}</div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">{'🦋'.repeat(data.right)}</div>
      </div>
    )
  }
  if (game==='numberLine'){
    return (
      <div className="flex items-center justify-center gap-3 text-2xl">
        {data.seq.map((n,i)=> <span key={i} className={`w-12 h-12 rounded-full flex items-center justify-center ${n===null?'bg-amber-200':'bg-white shadow'}`}>{n===null?'?':n}</span>)}
      </div>
    )
  }
  if (game==='shapes'){
    return (
      <div className="flex items-center justify-center gap-3 text-3xl">
        <span>⚪</span><span>⬜</span><span>🔺</span>
      </div>
    )
  }
  return null
}

