import { getCoinHistory } from './localDB'

/**
 * Award coins and append transaction history.
 * Prefer saveLessonResult for lesson outcomes; this is for generic awards.
 * @param {string} kidId
 * @param {number} amount 1..10
 * @param {string} reason
 */
export function awardCoins(kidId, amount, reason='Activity'){
  if (!kidId || !amount) return
  // direct write to avoid circular imports
  try {
    const db = JSON.parse(localStorage.getItem('kg_db')||'{}')
    const kid = db.kids?.find(k=>k.id===kidId)
    if (!kid) return
    kid.coins = (kid.coins||0) + amount
    db.coinsTransactions = db.coinsTransactions || {}
    db.coinsTransactions[kidId] = db.coinsTransactions[kidId] || []
    db.coinsTransactions[kidId].push({ ts: Date.now(), amount, reason })
    localStorage.setItem('kg_db', JSON.stringify(db))
  } catch {}
}

