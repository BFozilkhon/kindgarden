import { useTranslation } from 'react-i18next'

export default function MathHome(){
  const { t } = useTranslation('t')
  const games = [
    { key:'counting', label:t('mathHome.counting'), href:'#/math-game?g=counting', gradient:'from-pink-400 via-purple-400 to-blue-400' },
    { key:'addition', label:t('mathHome.addition'), href:'#/math-game?g=addition', gradient:'from-amber-400 via-pink-400 to-red-400' },
    { key:'subtraction', label:t('mathHome.subtraction'), href:'#/math-game?g=subtraction', gradient:'from-sky-400 via-teal-400 to-emerald-400' },
    { key:'comparison', label:t('mathHome.comparison'), href:'#/math-game?g=comparison', gradient:'from-violet-400 via-fuchsia-400 to-rose-400' },
    { key:'shapes', label:t('mathHome.shapes'), href:'#/math-game?g=shapes', gradient:'from-cyan-400 via-blue-400 to-indigo-400' },
    { key:'numberLine', label:t('mathHome.line'), href:'#/math-game?g=numberLine', gradient:'from-lime-400 via-emerald-400 to-teal-400' },
    // Learn games
    { key:'colors', label:t('learn.colorsTitle'), href:'#/math-game?g=colors', gradient:'from-rose-400 via-red-400 to-orange-400' },
    { key:'numbers', label:t('learn.numbersTitle'), href:'#/math-game?g=numbers', gradient:'from-blue-400 via-indigo-400 to-violet-400' },
    { key:'animals', label:t('learn.animalsTitle'), href:'#/math-game?g=animals', gradient:'from-amber-400 via-orange-400 to-rose-400' },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('mathHome.title')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {games.map(g=> (
          <a key={g.key} href={g.href} className={`rounded-3xl p-6 text-white font-extrabold shadow-lg bg-gradient-to-r ${g.gradient} active:scale-95 transition`}>{g.label}</a>
        ))}
      </div>
    </div>
  )
}

