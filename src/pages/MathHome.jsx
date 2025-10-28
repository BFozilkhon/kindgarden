export default function MathHome(){
  const games = [
    { key:'counting', label:'Olmalarni sanash 🍎', href:'#/math-game?g=counting', gradient:'from-pink-400 via-purple-400 to-blue-400' },
    { key:'addition', label:'Mevalarni qo‘shish 🍇', href:'#/math-game?g=addition', gradient:'from-amber-400 via-pink-400 to-red-400' },
    { key:'subtraction', label:'Sharlarni ayirish 🎈', href:'#/math-game?g=subtraction', gradient:'from-sky-400 via-teal-400 to-emerald-400' },
    { key:'comparison', label:'Qaysi ko‘p? 🦋', href:'#/math-game?g=comparison', gradient:'from-violet-400 via-fuchsia-400 to-rose-400' },
    { key:'shapes', label:'Shakllar moslash 🔺', href:'#/math-game?g=shapes', gradient:'from-cyan-400 via-blue-400 to-indigo-400' },
    { key:'numberLine', label:'Raqamlar qatori poygasi 🔢', href:'#/math-game?g=numberLine', gradient:'from-lime-400 via-emerald-400 to-teal-400' },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Matematika o‘yinlari</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {games.map(g=> (
          <a key={g.key} href={g.href} className={`rounded-3xl p-6 text-white font-extrabold shadow-lg bg-gradient-to-r ${g.gradient} active:scale-95 transition`}>{g.label}</a>
        ))}
      </div>
    </div>
  )
}

