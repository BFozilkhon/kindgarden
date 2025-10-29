import Leaderboard from '../components/Leaderboard'
import BigCTAButton from '../components/BigCTAButton'
import DailyQuest from '../components/DailyQuest'
import spiderman from '../assets/spiderman.webp'
import rabunzel from '../assets/rabunzel.webp'
import ironman from '../assets/ironman.webp'
import elza from '../assets/elza.png'
import buzz from '../assets/buzz.png'
import moana from '../assets/moana.png'
import { useKid } from '../lib/useKid'
import { getLeaderboard } from '../lib/localDB'

export default function Home(){
  const { currentKid } = useKid()
  const lb = currentKid ? getLeaderboard(currentKid.groupId) : []

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl p-6 md:p-10 bg-gradient-to-r from-[color:rgb(141_102_255_/_.2)] to-[color:rgb(255_184_107_/_.25)]">
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[color:rgb(141_102_255_/_.25)] blur-2xl" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[color:rgb(255_184_107_/_.25)] blur-2xl" />
        <div className="grid md:grid-cols-2 gap-6 items-center relative">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">KindGarden ga xush kelibsiz</h1>
            <p className="text-slate-600 mb-5">Quvnoq darslar, qo‘shiqlar va harakatlar bilan xursand o‘rganish.</p>
            <div className="flex gap-3 flex-wrap">
              <a href="#/language"><BigCTAButton ariaLabel="Tilni boshlash">Tilni boshlash</BigCTAButton></a>
              <a href="#/math-home"><BigCTAButton ariaLabel="Matematikani boshlash">Matematikani boshlash</BigCTAButton></a>
            </div>
          </div>
          <HeroCollage />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          <a href="#/language"><Tile>Til</Tile></a>
          <a href="#/math-home"><Tile>Matematika</Tile></a>
          <a href="#/karaoke"><Tile>Karaoke</Tile></a>
          <a href="#/cartoons"><Tile>Multfilmlar</Tile></a>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-2xl font-bold mb-3">Reyting</h2>
          <Leaderboard items={lb} />
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-2xl font-bold mb-3">Kundalik topshiriq</h2>
          <DailyQuest />
        </div>
      </section>
    </div>
  )
}

function Tile({ children }){
  return (
    <div className="bg-white rounded-3xl shadow p-5 text-center text-lg font-bold hover:scale-[1.02] transition">
      {children}
    </div>
  )
}

function HeroCollage(){
  // Simple collage of emoji/illustrations that suggest app areas
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={spiderman} alt="Hero illustration: friendly spider hero" className="h-full object-cover" />
      </div>
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={rabunzel} alt="Hero illustration: adventurous girl with long hair" className="h-full object-cover" />
      </div>
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={ironman} alt="Hero illustration: iron hero" className="h-full object-cover" />
      </div>
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={elza} alt="Hero illustration: ice princess" className="h-full object-cover" />
      </div>
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={buzz} alt="Hero illustration: space ranger" className="h-full object-cover" />
      </div>
      <div className="bg-white rounded-2xl shadow h-28 overflow-hidden flex items-center justify-center">
        <img src={moana} alt="Hero illustration: ocean voyager" className="h-full object-cover" />
      </div>
    </div>
  )
}

