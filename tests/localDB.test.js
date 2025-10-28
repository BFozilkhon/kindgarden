import { describe, it, expect, beforeEach } from 'vitest'
import { seedIfEmpty, getKids, getLessons, saveLessonResult } from '../src/lib/localDB'

describe('localDB', ()=>{
  beforeEach(()=>{
    localStorage.clear()
    seedIfEmpty()
  })
  it('seeds kids', ()=>{
    const kids = getKids()
    expect(kids.length).toBeGreaterThan(0)
  })
  it('saves results and increases coins', ()=>{
    const kid = getKids()[0]
    const before = kid.coins
    const lesson = getLessons('language')[0]
    saveLessonResult(kid.id, lesson.id, { correct:1, incorrect:0, coins:3 })
    const after = getKids().find(k=>k.id===kid.id).coins
    expect(after).toBe(before+3)
  })
})

