import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const saved = typeof window !== 'undefined' ? (localStorage.getItem('kg_lang') || 'uz') : 'uz'

const resources = {
  uz: {
    t: {
      nav: { language:'Til', math:'Matematika', karaoke:'Karaoke', cartoons:'Multfilmlar', stats:'Statistika', movement:'Harakat', competitions:'Musobaqalar', profile:'Profil', selectTeacher:'Tarbiyachi tanlang', selectChild:'Bola tanlang' },
      home: { title:"Bog‘chadan boshlab buyuk orzular sari!", subtitle:"Quvnoq darslar, qo‘shiqlar va harakatlar bilan xursand o‘rganish.", startLanguage:'Tilni boshlash', startMath:'Matematikani boshlash', tileLanguage:'Til', tileMath:'Matematika', tileKaraoke:'Karaoke', tileCartoons:'Multfilmlar', tileCompetitions:'Musobaqalar', tileMovement:'Harakat', leaderboard:'Reyting', daily:'Kundalik topshiriq' },
      competitions: { title:'Musobaqalar', start:'Boshlash', addition:'Qo‘shish poygasi', subtraction:'Ayirish poygasi', numberMatch:'Raqam moslash poygasi', imageTF:'Rasmni top (To‘g‘ri/Yolg‘on)', oddEven:'Taq yoki juft?', biggerSmaller:'Qaysi katta?', descAdd:'10 gacha bo‘lgan sonlarni qo‘shish', descSub:'10 gacha bo‘lgan sonlarni ayirish', descMatch:'Raqamni mos to‘plam bilan tez toping', descTF:'Rasmni ko‘r va savolga To‘g‘ri/Yolg‘on javob ber', descOddEven:'Son juftmi yoki toqmi?', descCompare:'Qaysi son kattaroq?', levelEasy:'Oson', levelMedium:'O‘rta', time:'Vaqt', finished:'Musobaqa tugadi', finalScore:'Yakuniy ball: {{n}}', playAgain:'Qayta o‘ynash', finish:'Tugatish', matchPrompt:'Qaysi raqam mos?', true:'To‘g‘ri', false:'Yolg‘on', isIt:'{{x}}mi?' },
      movement: { title:'Harakat', follow:'Birga bajaring!', didIt:'Bajarildi!', greatJobCoins:'Ajoyib! +{{n}} tanga',
        words:{ jump:'Sakra', clap:'Qarsak', stretch:"Cho'zil", twist:'Buril', spin:'Aylan', rightHandUp:'O‘ng qo‘lingni ko‘tar', leftHandUp:'Chap qo‘lingni ko‘tar', oneLeg:'Bir oyoqda tur', toeTouch:'Oyoq uchiga teg' }
      },
      daily: { watchLang:'Til videosini ko‘rish', solveMath:'3 ta matematika masalasini yechish', rewardLabel:'Mukofot: {{n}} 🪙', claim:'Mukofotni olish', claimed:'Olib bo‘lingan ✓' },
      karaoke: { title:'Karaoke', curated:'Tavsiya etilgan karaoke' },
      profile: { title:'Profil', name:'Ism', group:'Guruh', save:'Saqlash', noChild:'Bosh qismdan bolani tanlang.', upload:'Yuklash' },
      results: { top5:'Guruh Top 5', coinHistory:'Tangalar tarixi', activity:'Faoliyat', selectFirst:'Avval bola tanlang.' },
      stats: { title:'Statistika', top3:'Top 3', nominations:'Nominatsiyalar', coinHistory:'Tangalar tarixi', empty:'Tarix yo‘q', mostActive:'Eng faol', fastLearner:'Tez o‘rganuvchi', creative:'Ijodkor', coinsDistribution:'Tangalar taqsimoti (Top 5)', performance:'Ko‘rsatkichlar', winRate:'G‘alaba darajasi', totalCoins:'Jami tangalar', wins:'G‘alabalar', gamesPlayed:'O‘yinlar' },
      footer: { note:'© {{year}} Bolajon • Quvonch bilan o‘rganing!' },
      compare: { left:'Chap', right:'O‘ng', equal:'Teng' },
      shapes: { circle:'Doira', square:'Kvadrat', triangle:'Uchburchak' },
      reasons: { welcomeBonus:'Xush kelibsiz bonusi', lessonReward:'Dars mukofoti', competition:'Musobaqa' },
      mathHome: { title:'Matematika o‘yinlari', counting:'Olmalarni sanash 🍎', addition:'Mevalarni qo‘shish 🍇', subtraction:'Sharlarni ayirish 🎈', comparison:'Qaysi ko‘p? 🦋', shapes:'Shakllar moslash 🔺', line:'Raqamlar qatori poygasi 🔢' },
      learn: { colorsTitle:"Ranglarni o'rganamiz!", numbersTitle:"Raqamlarni o'rganamiz!", animalsTitle:'Hayvonlar bilan tanishamiz!', prev:'‹', next:'›', score:'Ball: {{n}}', hear:'Tovushni eshitish' },
      langLesson: { quick:'Tezkor test', next:'Keyingi', submit:'Jo‘natish' },
      cartoons: { title:'Multfilmlar' },
      misc: { back:'Ortga', guest:'Mehmon' }
    }
  },
  en: {
    t: {
      nav: { language:'Language', math:'Math', karaoke:'Karaoke', cartoons:'Cartoons', stats:'Stats', movement:'Movement', competitions:'Competitions', profile:'Profile', selectTeacher:'Select teacher', selectChild:'Select child' },
      home: { title:'From kindergarten to great dreams!', subtitle:'Playful lessons, songs, and movements for joyful learning.', startLanguage:'Start Language', startMath:'Start Math', tileLanguage:'Language', tileMath:'Math', tileKaraoke:'Karaoke', tileCartoons:'Cartoons', tileCompetitions:'Competitions', tileMovement:'Movement', leaderboard:'Leaderboard', daily:'Daily Quest' },
      competitions: { title:'Competitions', start:'Start', addition:'Addition Sprint', subtraction:'Subtraction Sprint', numberMatch:'Number Matching Race', imageTF:'Image True/False', oddEven:'Odd or Even?', biggerSmaller:'Bigger or Smaller?', descAdd:'Add numbers up to 10', descSub:'Subtract numbers up to 10', descMatch:'Quickly match the number with the correct set', descTF:'Look at the picture and answer True/False', descOddEven:'Is the number odd or even?', descCompare:'Which number is bigger?', levelEasy:'Easy', levelMedium:'Medium', time:'Time', finished:'Competition finished', finalScore:'Final score: {{n}}', playAgain:'Play again', finish:'Finish', matchPrompt:'Which number matches?', true:'True', false:'False', isIt:'Is it {{x}}?' },
      movement: { title:'Movement', follow:'Follow along!', didIt:'I did it!', greatJobCoins:'Great job! +{{n}} coins',
        words:{ jump:'Jump', clap:'Clap', stretch:'Stretch', twist:'Twist', spin:'Spin around', rightHandUp:'Raise your right hand', leftHandUp:'Raise your left hand', oneLeg:'Stand on one leg', toeTouch:'Touch your toes' }
      },
      daily: { watchLang:'Watch a Language video', solveMath:'Solve 3 Math problems', rewardLabel:'Reward: {{n}} 🪙', claim:'Claim Reward', claimed:'Claimed ✓' },
      karaoke: { title:'Karaoke', curated:'Recommended karaoke' },
      profile: { title:'Profile', name:'Name', group:'Group', save:'Save', noChild:'Select a child in the header.', upload:'Upload' },
      results: { top5:'Group Top 5', coinHistory:'Coin History', activity:'Activity', selectFirst:'Select a child first.' },
      stats: { title:'Stats', top3:'Top 3', nominations:'Nominations', coinHistory:'Coin History', empty:'No history', mostActive:'Most Active', fastLearner:'Fast Learner', creative:'Creative Mind', coinsDistribution:'Coins Distribution (Top 5)', performance:'Performance', winRate:'Win Rate', totalCoins:'Total Coins', wins:'Wins', gamesPlayed:'Games Played' },
      footer: { note:'© {{year}} Bolajon • Learn with joy!' },
      compare: { left:'Left', right:'Right', equal:'Equal' },
      shapes: { circle:'Circle', square:'Square', triangle:'Triangle' },
      reasons: { welcomeBonus:'Welcome bonus', lessonReward:'Lesson reward', competition:'Competition' },
      mathHome: { title:'Math Games', counting:'Counting Apples 🍎', addition:'Add Fruits 🍇', subtraction:'Subtract Balloons 🎈', comparison:'Which is more? 🦋', shapes:'Shape Sorter 🔺', line:'Number Line Race 🔢' },
      learn: { colorsTitle:'Let’s learn colors!', numbersTitle:'Let’s learn numbers!', animalsTitle:'Let’s meet animals!', prev:'‹', next:'›', score:'Score: {{n}}', hear:'Play sound' },
      langLesson: { quick:'Quick Quiz', next:'Next', submit:'Submit' },
      cartoons: { title:'Cartoons' },
      misc: { back:'Back', guest:'Guest' }
    }
  },
  ru: {
    t: {
      nav: { language:'Язык', math:'Математика', karaoke:'Караоке', cartoons:'Мультфильмы', stats:'Статистика', movement:'Движение', competitions:'Соревнования', profile:'Профиль', selectTeacher:'Выберите воспитателя', selectChild:'Выберите ребёнка' },
      home: { title:'От детского сада — к большим мечтам!', subtitle:'Весёлые уроки, песни и движения для радостного обучения.', startLanguage:'Начать язык', startMath:'Начать математику', tileLanguage:'Язык', tileMath:'Математика', tileKaraoke:'Караоке', tileCartoons:'Мультфильмы', tileCompetitions:'Соревнования', tileMovement:'Движение', leaderboard:'Рейтинг', daily:'Ежедневное задание' },
      competitions: { title:'Соревнования', start:'Старт', addition:'Спринт на сложение', subtraction:'Спринт на вычитание', numberMatch:'Гонка по сопоставлению чисел', imageTF:'Картинка: Верно/Неверно', oddEven:'Чётное или нечётное?', biggerSmaller:'Больше или меньше?', descAdd:'Сложение чисел до 10', descSub:'Вычитание чисел до 10', descMatch:'Быстро сопоставляй число с правильным набором', descTF:'Смотри на картинку и отвечай Верно/Неверно', descOddEven:'Число чётное или нечётное?', descCompare:'Какое число больше?', levelEasy:'Легко', levelMedium:'Средне', time:'Время', finished:'Соревнование завершено', finalScore:'Итоговый счёт: {{n}}', playAgain:'Играть ещё', finish:'Завершить', matchPrompt:'Какое число подходит?', true:'Верно', false:'Неверно', isIt:'Это {{x}}?' },
      movement: { title:'Движение', follow:'Повторяйте за нами!', didIt:'Готово!', greatJobCoins:'Здорово! +{{n}} монет',
        words:{ jump:'Прыгай', clap:'Хлопай', stretch:'Тянись', twist:'Повернись', spin:'Покрутись', rightHandUp:'Подними правую руку', leftHandUp:'Подними левую руку', oneLeg:'Встань на одну ногу', toeTouch:'Дотронься до носков' }
      },
      daily: { watchLang:'Посмотреть видео по языку', solveMath:'Решить 3 задания по математике', rewardLabel:'Награда: {{n}} 🪙', claim:'Забрать награду', claimed:'Получено ✓' },
      karaoke: { title:'Караоке', curated:'Рекомендуемое караоке' },
      profile: { title:'Профиль', name:'Имя', group:'Группа', save:'Сохранить', noChild:'Выберите ребёнка вверху.', upload:'Загрузить' },
      results: { top5:'Топ 5 группы', coinHistory:'История монет', activity:'Активность', selectFirst:'Сначала выберите ребёнка.' },
      stats: { title:'Статистика', top3:'Топ 3', nominations:'Номинации', coinHistory:'История монет', empty:'Нет записей', mostActive:'Самый активный', fastLearner:'Быстро обучается', creative:'Творческий', coinsDistribution:'Распределение монет (Топ 5)', performance:'Показатели', winRate:'Процент побед', totalCoins:'Всего монет', wins:'Победы', gamesPlayed:'Игр сыграно' },
      footer: { note:'© {{year}} Bolajon • Учимся с радостью!' },
      compare: { left:'Лево', right:'Право', equal:'Равно' },
      shapes: { circle:'Круг', square:'Квадрат', triangle:'Треугольник' },
      reasons: { welcomeBonus:'Приветственный бонус', lessonReward:'Награда за урок', competition:'Соревнование' },
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

