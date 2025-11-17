import BigCTAButton from '../components/BigCTAButton'
import { useTranslation } from 'react-i18next'

export default function Competitions(){
  const { t } = useTranslation('t')
  const challenges = [
    { key:'addition', icon:'➕', title:t('competitions.addition'), desc:t('competitions.descAdd'), tag:t('competitions.levelEasy') },
    { key:'subtraction', icon:'➖', title:t('competitions.subtraction'), desc:t('competitions.descSub'), tag:t('competitions.levelEasy') },
    { key:'numberMatch', icon:'🏁', title:t('competitions.numberMatch'), desc:t('competitions.descMatch'), tag:t('competitions.levelMedium') },
    { key:'imageTF', icon:'🖼️', title:t('competitions.imageTF'), desc:t('competitions.descTF'), tag:t('competitions.levelEasy'), route:'#/competition-tf' },
    { key:'oddEven', icon:'🔢', title:t('competitions.oddEven'), desc:t('competitions.descOddEven'), tag:t('competitions.levelEasy'), route:'#/competition-odd-even' },
    { key:'compare', icon:'⚖️', title:t('competitions.biggerSmaller'), desc:t('competitions.descCompare'), tag:t('competitions.levelEasy'), route:'#/competition-compare' },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('competitions.title')}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {challenges.map(c=> (
          <div key={c.key} className="bg-white rounded-3xl shadow p-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl">{c.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold">{c.title}</h3>
                <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm">{c.tag}</span>
              </div>
              <p className="text-slate-600 mt-1">{c.desc}</p>
              <a href={c.route || `#/competition?c=${c.key}`} className="inline-block mt-3"><BigCTAButton>{t('competitions.start')}</BigCTAButton></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
 

