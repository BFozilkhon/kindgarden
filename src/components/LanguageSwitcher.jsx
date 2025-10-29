import { useEffect, useState } from 'react'
import { setLang } from '../lib/i18nConfig'

export default function LanguageSwitcher({ compact=false }){
  const [lng, setLng] = useState(()=> localStorage.getItem('kg_lang') || 'uz')
  useEffect(()=>{ setLang(lng) }, [lng])
  const options = [
    { code:'uz', label:'UZ', icon:'🇺🇿' },
    { code:'en', label:'EN', icon:'🇬🇧' },
    { code:'ru', label:'RU', icon:'🇷🇺' },
  ]
  return (
    <label className="inline-flex items-center gap-1">
      <span className="sr-only">Language</span>
      <select
        className={`px-3 py-2 rounded-full bg-white text-slate-900 ${compact?'text-sm':''}`}
        value={lng}
        onChange={(e)=> setLng(e.target.value)}
      >
        {options.map(o=> (
          <option key={o.code} value={o.code}>{o.icon} {o.label}</option>
        ))}
      </select>
    </label>
  )
}

