import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function CartoonPlayer(){
  const { t } = useTranslation('t')
  const [lang, setLang] = useState('uz')
  const catalog = [
    // Uzbek (keep current)
    { id:'zt-onoQ3cCo', lang:'uz' },
    { id:'2uCpwTO7lMc', lang:'uz' },
    { id:'NGGhAxrlXig', lang:'uz' },
    { id:'BZ0JXuh8194', lang:'uz' },
    { id:'nh7nJHyeWWA', lang:'uz' },
    // English provided
    { id:'hxOApe1P9dM', lang:'en' },
    { id:'G9H2aliqkq8', lang:'en' },
    { id:'jKi2SvWOCXc', lang:'en' },
    { id:'8g8GDLkdUeY', lang:'en' },
    { id:'e_04ZrNroTo', lang:'en' },
    // Russian provided
    { id:'NmaWNWecuBs', lang:'ru' },
    { id:'VY3lVClENHE', lang:'ru' },
    { id:'oOsn3mqgUPM', lang:'ru' },
    { id:'1qDbi0_fAHg', lang:'ru' },
    { id:'wi9gaXcmLOA', lang:'ru' },
  ]
  const vids = catalog.filter(v=> v.lang===lang).map(v=> v.id)
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('cartoons.title')}</h2>
      <div className="flex gap-2">
        <button className={`px-3 py-2 rounded-full ${lang==='uz'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('uz')}>🇺🇿 Uzbek</button>
        <button className={`px-3 py-2 rounded-full ${lang==='en'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('en')}>🇬🇧 English</button>
        <button className={`px-3 py-2 rounded-full ${lang==='ru'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('ru')}>🇷🇺 Русский</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {vids.map(id=> (
          <div key={id} className="bg-white rounded-2xl shadow p-2">
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

