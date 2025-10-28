const KEY = 'mathProgress'

function read(){
  try { return JSON.parse(localStorage.getItem(KEY)) || null } catch { return null }
}
function write(obj){
  try { localStorage.setItem(KEY, JSON.stringify(obj)) } catch {}
}

export function getMathProgress(userId){
  const cur = read()
  if (!cur || cur.userId !== userId){
    return { userId, games: {}, totalCoins: 0 }
  }
  return cur
}

export function saveMathResult(userId, gameType, correct){
  const cur = getMathProgress(userId)
  const g = cur.games[gameType] || { score: 0, attempts: 0 }
  g.attempts += 1
  if (correct) g.score += 1
  cur.games[gameType] = g
  cur.userId = userId
  write(cur)
  return cur
}

export function addCoins(userId, amount){
  if (!amount) return
  const cur = getMathProgress(userId)
  cur.totalCoins = (cur.totalCoins || 0) + amount
  cur.userId = userId
  write(cur)
  return cur.totalCoins
}

export function resetMathProgress(userId){
  const cur = { userId, games: {}, totalCoins: 0 }
  write(cur)
}

