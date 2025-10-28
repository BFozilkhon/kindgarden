const packs = {
  en: {
    home: { title: 'Welcome to KindGarden', language:'Language', math:'Math', movement:'Movement', karaoke:'Karaoke', cartoons:'Cartoons', competitions:'Competitions', results:'Results', profile:'Profile' },
    coins: 'Coins',
    selectChild: 'Choose Child',
    play: 'Play',
    start: 'Start',
    didIt: "I did it!",
  },
  uz: {
    home: { title: 'KindGarden ga xush kelibsiz', language:'Til', math:'Matematika', movement:'Harakat', karaoke:'Karaoke', cartoons:'Multfilmlar', competitions:'Musobaqalar', results:'Natijalar', profile:'Profil' },
    coins: 'Tanga',
    selectChild: 'Bola tanlang',
    play: 'Boshlash',
    start: 'Start',
    didIt: "Bajardim!",
  },
  ru: {
    home: { title: 'Добро пожаловать в KindGarden', language:'Язык', math:'Математика', movement:'Движение', karaoke:'Караоке', cartoons:'Мультфильмы', competitions:'Соревнования', results:'Результаты', profile:'Профиль' },
    coins: 'Монеты',
    selectChild: 'Выбрать ребёнка',
    play: 'Играть',
    start: 'Старт',
    didIt: "Сделал!",
  }
}

export function t(lang='en', path){
  const parts = path.split('.')
  let cur = packs[lang] || packs.en
  for(const p of parts){ cur = cur?.[p] }
  return cur ?? path
}

export const languages = [
  { key:'en', label:'English' },
  { key:'uz', label:"O'zbekcha" },
  { key:'ru', label:'Русский' },
]

