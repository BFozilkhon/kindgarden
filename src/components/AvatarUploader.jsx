import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function AvatarUploader({ value, onChange }){
  const { t } = useTranslation('t')
  const ref = useRef(null)
  const choose = ()=> ref.current?.click()

  const toBase64Resized = (file, maxSize=256)=> new Promise((resolve, reject)=>{
    const reader = new FileReader()
    reader.onload = ()=>{
      const img = new Image()
      img.onload = ()=>{
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        // Use JPEG to reduce size; fallback to PNG if needed
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
          resolve(dataUrl)
        } catch (e) {
          try { resolve(canvas.toDataURL('image/png')) } catch (err) { reject(err) }
        }
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
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
              const b64 = await toBase64Resized(file, 256)
          onChange?.(b64)
        }}
      />
    </div>
  )
}

