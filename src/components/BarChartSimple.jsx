import React from 'react'

export default function BarChartSimple({ data = [], max: maxProp, valueSuffix = '' }){
  const max = maxProp ?? Math.max(1, ...data.map(d=> d.value || 0))
  return (
    <div className="space-y-2">
      {data.map((d, i)=>{
        const pct = Math.max(0, Math.min(100, Math.round(((d.value||0)/max)*100)))
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-24 shrink-0 truncate text-sm text-slate-600">{d.label}</div>
            <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-amber-400" style={{ width: pct + '%' }} />
            </div>
            <div className="w-14 text-right text-sm font-semibold">{d.value}{valueSuffix}</div>
          </div>
        )
      })}
    </div>
  )
}


