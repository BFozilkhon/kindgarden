import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import LanguageLesson from './pages/LanguageLesson'
import MathHome from './pages/MathHome'
import MathGame from './pages/MathGame'
import MathResult from './pages/MathResult'
import MovementExercise from './pages/MovementExercise'
import Karaoke from './pages/Karaoke'
import CartoonPlayer from './pages/CartoonPlayer'
import Profile from './pages/Profile'
import ResultBoard from './pages/ResultBoard'
import { useKid } from './lib/useKid'

const routes = {
  '/': Home,
  '/language': LanguageLesson,
  '/math': MathHome,
  '/math-home': MathHome,
  '/math-game': MathGame,
  '/math-results': MathResult,
  '/movement': MovementExercise,
  '/karaoke': Karaoke,
  '/cartoons': CartoonPlayer,
  '/profile': Profile,
  '/results': ResultBoard,
}

function getRoutePath(){
  const raw = window.location.hash.replace('#','') || '/'
  return raw.split('?')[0]
}

export default function App(){
  const [route, setRoute] = useState(getRoutePath())
  const [hashStr, setHashStr] = useState(window.location.hash)
  const Current = useMemo(()=> routes[route] || Home, [route])
  const { currentKid } = useKid()

  useEffect(()=>{
    const onHash = () => { setRoute(getRoutePath()); setHashStr(window.location.hash) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
        <Current key={hashStr} currentKid={currentKid} />
      </main>
      <Footer />
    </div>
  )
}
