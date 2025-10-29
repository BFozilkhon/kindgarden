import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const saved = typeof window !== 'undefined' ? (localStorage.getItem('kg_lang') || 'uz') : 'uz'

const resources = {
  uz: {
    t: {
      nav: { language:'Til', math:'Matematika', karaoke:'Karaoke', cartoons:'Multfilmlar', results:'Natijalar', profile:'Profil', selectTeacher:'Tarbiyachi tanlang', selectChild:'Bola tanlang' },
      home: { title:'KindGarden ga xush kelibsiz', subtitle:"Quvnoq darslar, qo‘shiqlar va harakatlar bilan xursand o‘rganish.", startLanguage:'Tilni boshlash', startMath:'Matematikani boshlash', tileLanguage:'Til', tileMath:'Matematika', tileKaraoke:'Karaoke', tileCartoons:'Multfilmlar', leaderboard:'Reyting', daily:'Kundalik topshiriq' },
      daily: { watchLang:'Til videosini ko‘rish', solveMath:'3 ta matematika masalasini yechish', rewardLabel:'Mukofot: {{n}} 🪙', claim:'Mukofotni olish', claimed:'Olib bo‘lingan ✓' },
      karaoke: { title:'Karaoke', curated:'Tavsiya etilgan karaoke' },
      profile: { title:'Profil', name:'Ism', group:'Guruh', save:'Saqlash', noChild:'Bosh qismdan bolani tanlang.' },
      results: { top5:'Guruh Top 5', coinHistory:'Tangalar tarixi', activity:'Faoliyat', selectFirst:'Avval bola tanlang.' },
      mathHome: { title:'Matematika o‘yinlari', counting:'Olmalarni sanash 🍎', addition:'Mevalarni qo‘shish 🍇', subtraction:'Sharlarni ayirish 🎈', comparison:'Qaysi ko‘p? 🦋', shapes:'Shakllar moslash 🔺', line:'Raqamlar qatori poygasi 🔢' },
      learn: { colorsTitle:"Ranglarni o'rganamiz!", numbersTitle:"Raqamlarni o'rganamiz!", animalsTitle:'Hayvonlar bilan tanishamiz!', prev:'‹', next:'›', score:'Ball: {{n}}', hear:'Tovushni eshitish' },
      langLesson: { quick:'Tezkor test', next:'Keyingi', submit:'Jo‘natish' },
      cartoons: { title:'Multfilmlar' },
      misc: { back:'Ortga', guest:'Mehmon' }
    }
  },
  en: {
    t: {
      nav: { language:'Language', math:'Math', karaoke:'Karaoke', cartoons:'Cartoons', results:'Results', profile:'Profile', selectTeacher:'Select teacher', selectChild:'Select child' },
      home: { title:'Welcome to KindGarden', subtitle:'Playful lessons, songs, and movements for joyful learning.', startLanguage:'Start Language', startMath:'Start Math', tileLanguage:'Language', tileMath:'Math', tileKaraoke:'Karaoke', tileCartoons:'Cartoons', leaderboard:'Leaderboard', daily:'Daily Quest' },
      daily: { watchLang:'Watch a Language video', solveMath:'Solve 3 Math problems', rewardLabel:'Reward: {{n}} 🪙', claim:'Claim Reward', claimed:'Claimed ✓' },
      karaoke: { title:'Karaoke', curated:'Recommended karaoke' },
      profile: { title:'Profile', name:'Name', group:'Group', save:'Save', noChild:'Select a child in the header.' },
      results: { top5:'Group Top 5', coinHistory:'Coin History', activity:'Activity', selectFirst:'Select a child first.' },
      mathHome: { title:'Math Games', counting:'Counting Apples 🍎', addition:'Add Fruits 🍇', subtraction:'Subtract Balloons 🎈', comparison:'Which is more? 🦋', shapes:'Shape Sorter 🔺', line:'Number Line Race 🔢' },
      learn: { colorsTitle:'Let’s learn colors!', numbersTitle:'Let’s learn numbers!', animalsTitle:'Let’s meet animals!', prev:'‹', next:'›', score:'Score: {{n}}', hear:'Play sound' },
      langLesson: { quick:'Quick Quiz', next:'Next', submit:'Submit' },
      cartoons: { title:'Cartoons' },
      misc: { back:'Back', guest:'Guest' }
    }
  },
  ru: {
    t: {
      nav: { language:'Язык', math:'Математика', karaoke:'Караоке', cartoons:'Мультфильмы', results:'Результаты', profile:'Профиль', selectTeacher:'Выберите воспитателя', selectChild:'Выберите ребёнка' },
      home: { title:'Добро пожаловать в KindGarden', subtitle:'Весёлые уроки, песни и движения для радостного обучения.', startLanguage:'Начать язык', startMath:'Начать математику', tileLanguage:'Язык', tileMath:'Математика', tileKaraoke:'Караоке', tileCartoons:'Мультфильмы', leaderboard:'Рейтинг', daily:'Ежедневное задание' },
      daily: { watchLang:'Посмотреть видео по языку', solveMath:'Решить 3 задания по математике', rewardLabel:'Награда: {{n}} 🪙', claim:'Забрать награду', claimed:'Получено ✓' },
      karaoke: { title:'Караоке', curated:'Рекомендуемое караоке' },
      profile: { title:'Профиль', name:'Имя', group:'Группа', save:'Сохранить', noChild:'Выберите ребёнка вверху.' },
      results: { top5:'Топ 5 группы', coinHistory:'История монет', activity:'Активность', selectFirst:'Сначала выберите ребёнка.' },
      mathHome: { title:'Математические игры', counting:'Считаем яблоки 🍎', addition:'Сложить фрукты 🍇', subtraction:'Вычесть шарики 🎈', comparison:'Где больше? 🦋', shapes:'Сортировка фигур 🔺', line:'Числовая линия 🔢' },
      learn: { colorsTitle:'Учимся цветам!', numbersTitle:'Учимся числам!', animalsTitle:'Знакомимся с животными!', prev:'‹', next:'›', score:'Баллы: {{n}}', hear:'Прослушать звук' },
      langLesson: { quick:'Быстрая викторина', next:'Далее', submit:'Отправить' },
      cartoons: { title:'Мультфильмы' },
      misc: { back:'Назад', guest:'Гость' }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved,
    fallbackLng: 'uz',
    interpolation: { escapeValue: false },
    defaultNS: 't'
  })

export function setLang(lng){
  i18n.changeLanguage(lng)
  try { localStorage.setItem('kg_lang', lng) } catch {}
}

export default i18n

