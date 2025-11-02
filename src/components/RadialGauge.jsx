import React from 'react'

export default function RadialGauge({ percent = 0, label = '', size = 96 }){
  const clamped = Math.max(0, Math.min(100, percent))
  const stroke = 10
  const r = (size - stroke) / 2
  const c = size / 2
  const circumference = 2 * Math.PI * r
  const dash = (clamped / 100) * circumference
  return (
    <div className="inline-flex flex-col items-center">
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke="url(#g)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${c} ${c})`}
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-slate-700" fontSize="16" fontWeight="700">{Math.round(clamped)}%</text>
      </svg>
      <div className="text-sm text-slate-600 mt-1">{label}</div>
    </div>
  )
}


