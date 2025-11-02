import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Karaoke(){
  const { t } = useTranslation('t')
  const [lang, setLang] = useState('en')
  const catalog = [
    // English (keep as examples)
    { id:'ke1', title:'Johnny Johnny Karaoke', youtubeId:'UK3wTBugH_0', lang:'en' },
    { id:'ke2', title:'ABC Karaoke', youtubeId:'E7KyWrDgJ3A', lang:'en' },
    { id:'ke3', title:'Jingle Bells Karaoke', youtubeId:'8zphtjEssDM', lang:'en' },
    { id:'ke4', title:'Finger Family ("Daddy Finger") Karaoke', youtubeId:'9mLSC6SAwzI', lang:'en' },
    // Uzbek list provided
    { id:'ku1', title:"YOMG'IR YOG'OLOQ", youtubeId:'L6GN_HzVzYE', lang:'uz' },
    { id:'ku2', title:"Bog'chajon | Bolalar qo'shiqlari", youtubeId:'h0IcL35dlno', lang:'uz' },
    { id:'ku3', title:'Tulpor', youtubeId:'CbuGm4KOLsw', lang:'uz' },
    { id:'ku4', title:"O'YNAYMIZ va KUYLAYMIZ", youtubeId:'cGq7UWTVA6c', lang:'uz' },
    // Russian list provided
    { id:'kr1', title:'СБОРНИК караоке песен для детей', youtubeId:'OeJLsKho4Qo', lang:'ru' },
    { id:'kr2', title:'Этот пальчик дедушка', youtubeId:'YmadQ1IhQ4s', lang:'ru' },
    { id:'kr3', title:'Синий трактор По полям', youtubeId:'Z2uEINC1X6U', lang:'ru' },
    { id:'kr4', title:'АРАМ ЗАМ ЗАМ', youtubeId:'wXU9KHKB47w', lang:'ru' },
  ]
  const curated = catalog.filter(c=> c.lang===lang)
  const songs = []
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('karaoke.title')}</h2>
      <div className="space-y-2">
        <div className="flex gap-2 mb-4">
          <button className={`px-3 py-2 rounded-full ${lang==='uz'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('uz')}>🇺🇿 Uzbek</button>
          <button className={`px-3 py-2 rounded-full ${lang==='en'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('en')}>🇬🇧 English</button>
          <button className={`px-3 py-2 rounded-full ${lang==='ru'?'bg-[var(--primary)] text-white':'bg-white text-slate-900'}`} onClick={()=>setLang('ru')}>🇷🇺 Русский</button>
        </div>
          <div className="grid md:grid-cols-2 gap-4">
          {curated.map(s=> (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4 space-y-2">
              <h4 className="font-bold">{s.title}</h4>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${s.youtubeId}`}
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
      {songs.length>0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {songs.map(s=> (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4 space-y-2">
              <h3 className="font-bold">{s.title}</h3>
              {s.song ? (
                <audio controls src={s.song} />
              ) : s.youtubeId ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${s.youtubeId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

