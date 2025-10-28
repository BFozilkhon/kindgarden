import { describe, it, expect, beforeEach } from 'vitest'
import { seedIfEmpty, getKids } from '../src/lib/localDB'
import { awardCoins } from '../src/lib/coins'

describe('coins', ()=>{
  beforeEach(()=>{ localStorage.clear(); seedIfEmpty() })
  it('awards coins', ()=>{
    const kid = getKids()[0]
    const before = kid.coins
    awardCoins(kid.id, 2, 'Test')
    const after = getKids().find(k=>k.id===kid.id).coins
    expect(after).toBe(before+2)
  })
})

