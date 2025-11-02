import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function AvatarUploader({ value, onChange }){
  const { t } = useTranslation('t')
  const ref = useRef(null)
  const choose = ()=> ref.current?.click()

  const toBase64 = (file)=> new Promise((res, rej)=>{
    const r = new FileReader()
    r.onload = ()=> res(r.result)
    r.onerror = rej
    r.readAsDataURL(file)
  })

  return (
    <div className="flex items-center gap-3">
      <img
        src={value || '/assets/avatars/placeholder.png'}
        alt="Avatar preview"
        className="w-16 h-16 rounded-full object-cover bg-white shadow"
      />
      <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-full shadow" onClick={choose}>{t('profile.upload')}</button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e)=>{
          const file = e.target.files?.[0]
          if (!file) return
          const b64 = await toBase64(file)
          onChange?.(b64)
        }}
      />
    </div>
  )
}

