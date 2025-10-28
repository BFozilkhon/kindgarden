import { describe, it, expect, beforeEach } from 'vitest'
import { seedIfEmpty, getLeaderboard } from '../src/lib/localDB'

describe('leaderboard', ()=>{
  beforeEach(()=>{ localStorage.clear(); seedIfEmpty() })
  it('sorts by coins desc', ()=>{
    const lb = getLeaderboard('g1')
    expect(lb[0].coins >= lb[1].coins).toBeTruthy()
  })
})

