import { useEffect, useState } from 'react'

export function useLocalStorage(key, initial){
  const [value, setValue] = useState(()=>{
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(()=>{
    try {
      localStorage.setItem(key, JSON.stringify(value))
      // notify other hook instances in this tab
      window.dispatchEvent(new CustomEvent('kg_ls_updated', { detail: { key } }))
    } catch {}
  }, [key, value])

  useEffect(()=>{
    const onLs = (e)=>{
      if (!e?.detail || e.detail.key !== key) return
      try {
        const raw = localStorage.getItem(key)
        const parsed = raw ? JSON.parse(raw) : initial
        setValue(parsed)
      } catch {}
    }
    const onStorage = (e)=>{
      if (e.key !== key) return
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : initial
        setValue(parsed)
      } catch {}
    }
    window.addEventListener('kg_ls_updated', onLs)
    window.addEventListener('storage', onStorage)
    return ()=>{
      window.removeEventListener('kg_ls_updated', onLs)
      window.removeEventListener('storage', onStorage)
    }
  }, [key, initial])
  return [value, setValue]
}

