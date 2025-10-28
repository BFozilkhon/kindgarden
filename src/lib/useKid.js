import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { getKids } from './localDB'

export function useKid(){
  const [kidId, setKidId] = useLocalStorage('kg_currentKidId', null)
  const allKids = getKids()
  useEffect(()=>{
    if (!kidId && allKids[0]?.id){ setKidId(allKids[0].id) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const currentKid = useMemo(()=> allKids.find(k=>k.id===kidId) || null, [allKids, kidId])
  return { kidId, setKidId, currentKid, kids: allKids }
}

