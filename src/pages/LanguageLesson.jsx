import { useEffect, useState } from 'react'
import { getLessons, saveLessonResult } from '../lib/localDB'
import { languages } from '../lib/i18n'
import LanguageSelector from '../components/LanguageSelector'
import YouTubePlayer from '../components/YouTubePlayer'
import WordCard from '../components/WordCard'
import BigCTAButton from '../components/BigCTAButton'
import { useKid } from '../lib/useKid'
import { useTranslation } from 'react-i18next'

export default function LanguageLesson(){
  const [lang, setLang] = useState('en')
  const lessons = getLessons('language').filter(l=>l.lang===lang)
  const { currentKid } = useKid()
  const [openId, setOpenId] = useState(lessons[0]?.id || null)
  const [selected, setSelected] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const { t, i18n } = useTranslation('t')

  useEffect(()=>{
    // reset selection and quiz index when switching lessons
    setSelected(null)
    setQuizIdx(0)
  }, [openId])

  const finishQuiz = (lesson)=>{
    if (lesson?.quiz && lesson.quiz.length){
      const q = lesson.quiz[quizIdx]
      const correct = selected === q.answer
      const coins = correct ? 5 : 1
      saveLessonResult(currentKid?.id, lesson?.id, { correct: correct?1:0, incorrect: correct?0:1, coins })
      if (quizIdx < lesson.quiz.length-1){
        setQuizIdx(i=>i+1)
        setSelected(null)
      } else {
        alert(correct? 'Great job! +5 coins' : 'Nice try! +1 coin')
      }
      return
    }
    // fallback to words quiz
    const answer = lesson?.words?.[0]
    const correct = selected === answer
    const coins = correct ? 5 : 1
    saveLessonResult(currentKid?.id, lesson?.id, { correct: correct?1:0, incorrect: correct?0:1, coins })
    alert(correct? 'Great job! +5 coins' : 'Nice try! +1 coin')
  }

  if (!lessons.length){
    return (
      <div className="space-y-4">
        <LanguageSelector value={lang} onChange={setLang} options={languages} />
        <p>No lessons found for this language.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <LanguageSelector value={lang} onChange={setLang} options={languages} />
      <div className="space-y-3">
        {lessons.map(lesson=> (
          <div key={lesson.id} className="bg-white rounded-2xl shadow">
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between"
              onClick={()=> setOpenId(id => id===lesson.id ? null : lesson.id)}
              aria-expanded={openId===lesson.id}
            >
              <span className="font-bold">{lesson.title}</span>
              <span>{openId===lesson.id ? '−' : '+'}</span>
            </button>
            {openId===lesson.id && (
              <div className="p-4 space-y-4">
                {lesson.youtubeId ? (
                  <YouTubePlayer youtubeId={lesson.youtubeId} title={lesson.title} />
                ) : null}
                <div className="space-y-2">
                  {(()=>{ const tL = i18n.getFixedT(lesson.lang,'t'); return (
                    <h4 className="font-semibold">{tL('langLesson.quick')}</h4>
                  )})()}
                  {lesson.quiz && lesson.quiz.length ? (
                    <div className="space-y-2">
                      <div className="text-lg font-medium">{lesson.quiz[quizIdx].prompt}</div>
                      <div className="flex gap-3 flex-wrap">
                        {lesson.quiz[quizIdx].options.map(opt=> (
                          <WordCard key={opt} word={opt} selected={selected===opt} onSelect={()=>setSelected(opt)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {lesson.words.map(w=> (
                        <WordCard key={w} word={w} selected={selected===w} onSelect={()=>setSelected(w)} />
                      ))}
                    </div>
                  )}
                  {(()=>{ const tL = i18n.getFixedT(lesson.lang,'t'); return (
                    <BigCTAButton onClick={()=> finishQuiz(lesson)}>{lesson.quiz && lesson.quiz.length && quizIdx<lesson.quiz.length-1 ? tL('langLesson.next') : tL('langLesson.submit')}</BigCTAButton>
                  )})()}
                </div>
                {!lesson.quiz && (
                  <div className="text-lg">
                    {lesson.words.map((w,i)=> (
                      <span key={i} className="px-1">{w}{i<lesson.words.length-1?',':''}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

