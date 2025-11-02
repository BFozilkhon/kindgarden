/**
 * localDB.js - localStorage-backed data layer with seed & helpers
 * Storage Keys:
 *  - kg_db: main DB snapshot { groups, kids, languageLessons, mathLessons, movementExercises, coinsTransactions }
 *  - kg_currentKidId: selected kid id
 */

/** Internal helpers */
const DB_KEY = 'kg_db'
const RESET_ONCE_KEY = 'kg_reset_once'
const SCHEMA_KEY = 'kg_schema_version'
const SCHEMA_VERSION = '2'

function getDb(){
  try {
    const raw = localStorage.getItem(DB_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
function setDb(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db))
  try { window.dispatchEvent(new Event('kg_db_updated')) } catch {}
}

/** One-time/hard reset helpers */
export function resetLocalStorageHard(){
  try {
    localStorage.removeItem(DB_KEY)
    localStorage.removeItem('kg_currentKidId')
    localStorage.removeItem('kg_currentTeacherId')
    localStorage.removeItem('mathProgress')
  } catch {}
}

export function scheduleResetOnNextLoad(){
  try { localStorage.setItem(RESET_ONCE_KEY, 'pending') } catch {}
}

export function maybeResetOnLoad(){
  try {
    const pending = localStorage.getItem(RESET_ONCE_KEY)
    if (pending === 'pending'){
      resetLocalStorageHard()
      localStorage.setItem(RESET_ONCE_KEY, 'done')
    }
    const currentVersion = localStorage.getItem(SCHEMA_KEY)
    if (currentVersion !== SCHEMA_VERSION){
      resetLocalStorageHard()
      localStorage.setItem(SCHEMA_KEY, SCHEMA_VERSION)
    }
  } catch {}
}
export function getTeachers(){
  const db = getDb(); if(!db) return []
  return db.teachers || []
}

/** Seed if empty */
export function seedIfEmpty(){
  const existing = getDb()
  if (existing) return
  const seed = {
    teachers: [
      { id: 't1', name: 'Dilnoza opa' },
      { id: 't2', name: 'Laylo opa' },
      { id: 't3', name: 'Laziza opa' },
    ],
    groups: [{ id: 'g1', name: 'Sunflowers' }, { id: 'g2', name: 'Rainbows' }],
    kids: [
      // Teacher t1
      { id: 'k1',  name: 'Ali',   avatar: '/assets/avatars/ali.svg',   teacherId:'t1', groupId: 'g1', coins: 12, nominations: ['Most Active'], stats: { wins: 2, played: 4 } },
      { id: 'k2',  name: 'Layla', avatar: '/assets/avatars/layla.svg', teacherId:'t1', groupId: 'g1', coins: 9,  nominations: [], stats: { wins: 1, played: 3 } },
      { id: 'k3',  name: 'Misha', avatar: '/assets/avatars/misha.svg', teacherId:'t1', groupId: 'g2', coins: 7,  nominations: [], stats: { wins: 1, played: 2 } },
      { id: 'k4',  name: 'Zoya',  avatar: '/assets/avatars/zoya.svg',  teacherId:'t1', groupId: 'g1', coins: 6,  nominations: [], stats: { wins: 0, played: 2 } },
      { id: 'k5',  name: 'Timur', avatar: '/assets/avatars/timur.svg', teacherId:'t1', groupId: 'g2', coins: 5,  nominations: [], stats: { wins: 0, played: 1 } },
      // Teacher t2
      { id: 'k6',  name: 'Aisha', avatar: '/assets/avatars/aisha.svg', teacherId:'t2', groupId: 'g1', coins: 8,  nominations: [], stats: { wins: 1, played: 2 } },
      { id: 'k7',  name: 'Omar',  avatar: '/assets/avatars/omar.svg',  teacherId:'t2', groupId: 'g1', coins: 4,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k8',  name: 'Sofia', avatar: '/assets/avatars/sofia.svg', teacherId:'t2', groupId: 'g2', coins: 3,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k9',  name: 'Daler', avatar: '/assets/avatars/daler.svg', teacherId:'t2', groupId: 'g2', coins: 2,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k10', name: 'Nora',  avatar: '/assets/avatars/nora.svg', teacherId:'t2', groupId: 'g1', coins: 1,  nominations: [], stats: { wins: 0, played: 1 } },
      // Teacher t3
      { id: 'k11', name: 'Bek',   avatar: '/assets/avatars/placeholder.svg', teacherId:'t3', groupId: 'g1', coins: 2,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k12', name: 'Malika',avatar: '/assets/avatars/placeholder.svg', teacherId:'t3', groupId: 'g2', coins: 3,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k13', name: 'Rustam',avatar: '/assets/avatars/placeholder.svg', teacherId:'t3', groupId: 'g1', coins: 4,  nominations: [], stats: { wins: 0, played: 1 } },
      { id: 'k14', name: 'Aziza', avatar: '/assets/avatars/placeholder.svg', teacherId:'t3', groupId: 'g2', coins: 5,  nominations: [], stats: { wins: 1, played: 2 } },
      { id: 'k15', name: 'Jasur', avatar: '/assets/avatars/placeholder.svg', teacherId:'t3', groupId: 'g1', coins: 6,  nominations: [], stats: { wins: 1, played: 2 } },
    ],
    languageLessons: [
      // English (updated with provided YouTube IDs + 3-question quizzes)
      { id: 'l-lang-en-fruits', lang: 'en', title: 'Fruits', youtubeId: 'UcGm_PM2IwY', words: ['apple','banana','grape'], song: '/assets/audio/fruits_song.mp3', quiz: [
        { prompt: 'Which is a fruit?', options: ['apple','car','chair'], answer: 'apple' },
        { prompt: 'How many bananas are here? 🍌🍌🍌', options: ['2','3','4'], answer: '3' },
        { prompt: 'Pick the red fruit', options: ['apple','grape','lettuce'], answer: 'apple' },
      ] },
      { id: 'l-lang-en-colors', lang: 'en', title: 'Colors', youtubeId: 'qhOTU8_1Af4', words: ['red','blue','green'], song: '/assets/audio/colors_song.mp3', quiz: [
        { prompt: 'What color is the sky?', options: ['blue','red','green'], answer: 'blue' },
        { prompt: 'Mix red + yellow => ?', options: ['orange','purple','brown'], answer: 'orange' },
        { prompt: 'Which is not a color?', options: ['triangle','blue','pink'], answer: 'triangle' },
      ] },
      { id: 'l-lang-en-body', lang: 'en', title: 'Body', youtubeId: 'E1RaVPoA5ns', words: ['eyes','nose','hands'], song: '/assets/audio/body_song.mp3', quiz: [
        { prompt: 'We use these to see.', options: ['eyes','ears','knees'], answer: 'eyes' },
        { prompt: 'We use these to walk.', options: ['hands','feet','eyes'], answer: 'feet' },
        { prompt: 'We smell with our...', options: ['nose','mouth','ears'], answer: 'nose' },
      ] },
      { id: 'l-lang-en-animals', lang: 'en', title: 'Animals', youtubeId: 'hewioIU4a64', words: ['dog','cat','fish'], song: '/assets/audio/animals_song.mp3', quiz: [
        { prompt: 'Which one barks?', options: ['dog','cat','fish'], answer: 'dog' },
        { prompt: 'Which lives in water?', options: ['lion','fish','monkey'], answer: 'fish' },
        { prompt: "Which says 'meow'?", options: ['cow','cat','duck'], answer: 'cat' },
      ] },
      // Uzbek (updated per request)
      { id: 'l-lang-uz-mevalar', lang: 'uz', title: 'Mevalar', youtubeId: '6QNgOCio4Y4', words: ['olma','banan','uzum'], song: '/assets/audio/fruits_song.mp3' },
      { id: 'l-lang-uz-ranglar', lang: 'uz', title: 'Ranglar', youtubeId: 'XmzbaZQeNNI', words: ['qizil','ko\'k','yashil'], song: '/assets/audio/colors_song.mp3' },
      // Russian (updated per request)
      { id: 'l-lang-ru-frukty', lang: 'ru', title: 'Фрукты', youtubeId: 'BlAmuUrvMYk', words: ['яблоко','банан','виноград'], song: '/assets/audio/fruits_song.mp3', quiz: [
        { prompt:'Что из этого фрукт?', options:['яблоко','машина','стул'], answer:'яблоко' },
        { prompt:'Сколько бананов? 🍌🍌🍌', options:['2','3','4'], answer:'3' },
        { prompt:'Выбери красный фрукт', options:['яблоко','виноград','салат'], answer:'яблоко' },
      ] },
      { id: 'l-lang-ru-cveta', lang: 'ru', title: 'Цвета', youtubeId: 'm9Kv2x3jxec', words: ['красный','синий','зеленый'], song: '/assets/audio/colors_song.mp3', quiz: [
        { prompt:'Какого цвета небо?', options:['синий','красный','зелёный'], answer:'синий' },
        { prompt:'Красный + жёлтый = ?', options:['оранжевый','фиолетовый','коричневый'], answer:'оранжевый' },
        { prompt:'Что не цвет?', options:['треугольник','синий','розовый'], answer:'треугольник' },
      ] },
    ],
    mathLessons: [
      { id: 'l-math-1', title: 'Counting Apples', examples: [{ text: '5 apples + 2 apples', visual: ['apple','apple','apple','apple','apple','apple','apple'] }] },
      { id: 'l-math-2', title: 'Subtract Balloons', examples: [{ text: '6 balloons - 1 balloon', visual: ['balloon','balloon','balloon','balloon','balloon'] }] },
    ],
    movementExercises: [
      { id: 'l-move-1', title: 'Jump and Clap', frames: ['jump','clap','jump','clap'], languages: ['en','uz','ru'] },
      { id: 'l-move-2', title: 'Stretch and Twist', frames: ['stretch','twist','stretch','twist'], languages: ['en','uz','ru'] },
    ],
    coinsTransactions: {
      // kidId: [{ ts, amount, reason, lessonId }]
      k1: [{ ts: Date.now()-86400000, amount: 5, reason: 'Welcome bonus' }],
      k2: [], k3: [], k4: [], k5: [], k6: [], k7: [], k8: [], k9: [], k10: [], k11: [], k12: [], k13: [], k14: [], k15: []
    }
  }
  setDb(seed)
}

/** Groups & Kids */
/**
 * @param {string} groupId
 * @returns {Array} kids in group
 */
export function getKids(groupId, teacherId){
  const db = getDb(); if(!db) return []
  return db.kids.filter(k => (!groupId || k.groupId === groupId) && (!teacherId || k.teacherId === teacherId))
}

/**
 * @param {{id:string,name:string,avatar?:string,groupId:string}} kidObj
 */
export function saveKid(kidObj){
  const db = getDb(); if(!db) return
  const exists = db.kids.find(k=>k.id === kidObj.id)
  if (exists) throw new Error('Kid id already exists')
  db.kids.push({ ...kidObj, coins: kidObj.coins ?? 0, nominations: [], stats: { wins:0, played:0 } })
  db.coinsTransactions[kidObj.id] = []
  setDb(db)
}

/**
 * @param {string} kidId
 * @param {Partial<any>} partial
 */
export function updateKid(kidId, partial){
  const db = getDb(); if(!db) return
  const idx = db.kids.findIndex(k=>k.id===kidId)
  if (idx<0) return
  db.kids[idx] = { ...db.kids[idx], ...partial }
  setDb(db)
}

/** Lessons */
/**
 * @param {'language'|'math'|'movement'} type
 * @returns {Array}
 */
export function getLessons(type){
  const db = getDb(); if(!db) return []
  if (type === 'language') return db.languageLessons
  if (type === 'math') return db.mathLessons
  if (type === 'movement') return db.movementExercises
  return []
}

/**
 * Save result for kid/lesson; updates stats and can add coins if provided in resultObj
 * @param {string} kidId
 * @param {string} lessonId
 * @param {{correct?:number, incorrect?:number, coins?:number, meta?:any}} resultObj
 */
export function saveLessonResult(kidId, lessonId, resultObj={}){
  const db = getDb(); if(!db) return
  const kid = db.kids.find(k=>k.id===kidId)
  if (!kid) return
  kid.stats.played = (kid.stats.played||0) + 1
  if ((resultObj.correct||0) > (resultObj.incorrect||0)) {
    kid.stats.wins = (kid.stats.wins||0) + 1
  }
  if (resultObj.coins && resultObj.coins>0){
    kid.coins = (kid.coins||0) + resultObj.coins
    db.coinsTransactions[kidId] = db.coinsTransactions[kidId] || []
    db.coinsTransactions[kidId].push({ ts: Date.now(), amount: resultObj.coins, reason: 'Lesson reward', lessonId })
  }
  setDb(db)
}

/** Coins / Leaderboard */
/**
 * @param {string} kidId
 * @returns {Array<{ts:number,amount:number,reason:string,lessonId?:string}>}
 */
export function getCoinHistory(kidId){
  const db = getDb(); if(!db) return []
  return db.coinsTransactions[kidId] || []
}

/**
 * @param {string} groupId
 * @returns {Array<{kidId:string, coins:number, name:string, avatar?:string}>}
 */
export function getLeaderboard(groupId){
  const db = getDb(); if(!db) return []
  const kids = db.kids.filter(k=>!groupId || k.groupId===groupId)
  return kids
    .map(k=>({ kidId:k.id, coins:k.coins||0, name:k.name, avatar:k.avatar }))
    .sort((a,b)=>b.coins - a.coins)
}

/** Nominations (simple demo heuristics) */
export function computeNominations(groupId){
  const db = getDb(); if(!db) return {}
  const kids = db.kids.filter(k=>!groupId || k.groupId===groupId)
  if (!kids.length) return {}
  const mostActive = [...kids].sort((a,b)=> (b.stats?.played||0)-(a.stats?.played||0))[0]
  const mostImproved = [...kids].sort((a,b)=> (b.coins||0)-(a.coins||0))[0]
  const bestHelper = kids[Math.floor(Math.random()*kids.length)]
  return {
    mostActive: mostActive?.id,
    mostImproved: mostImproved?.id,
    bestHelper: bestHelper?.id,
  }
}

