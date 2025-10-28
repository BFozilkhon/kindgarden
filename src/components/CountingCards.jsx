export default function CountingCards({ icon='🍎', count=5 }){
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({length: count}).map((_,i)=> (
        <div key={i} className="w-14 h-14 flex items-center justify-center text-2xl bg-white rounded-2xl shadow">
          {icon}
        </div>
      ))}
    </div>
  )
}

