import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { getKids, getTeachers } from './localDB'

export function useKid(){
  const [tick, setTick] = useState(0)
  const [teacherId, setTeacherId] = useLocalStorage('kg_currentTeacherId', null)
  const [kidId, setKidId] = useLocalStorage('kg_currentKidId', null)
  const teachers = getTeachers()
  const effectiveTeacherId = teacherId || teachers[0]?.id || null
  const kidsForTeacher = getKids(undefined, effectiveTeacherId)
  useEffect(()=>{
    const onDb = ()=> setTick(t=>t+1)
    window.addEventListener('kg_db_updated', onDb)
    return ()=> window.removeEventListener('kg_db_updated', onDb)
  }, [])
  useEffect(()=>{
    // ensure teacher set
    if (!teacherId && teachers[0]?.id){ setTeacherId(teachers[0].id) }
    // ensure kid set for this teacher
    if ((!kidId || !kidsForTeacher.find(k=>k.id===kidId)) && kidsForTeacher[0]?.id){
      setKidId(kidsForTeacher[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveTeacherId])
  const currentKid = useMemo(()=> kidsForTeacher.find(k=>k.id===kidId) || kidsForTeacher[0] || null, [kidsForTeacher, kidId, tick])
  return { teacherId: effectiveTeacherId, setTeacherId, kidId, setKidId, currentKid, kids: kidsForTeacher, teachers }
}

