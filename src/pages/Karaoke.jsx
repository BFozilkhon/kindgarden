import { getLessons } from '../lib/localDB'

export default function Karaoke(){
  const songs = getLessons('language').map(l=> ({ id:l.id, title:l.title, song:l.song, words:l.words, youtubeId:l.youtubeId }))
  if (!songs.length) return <p>Qo‘shiqlar topilmadi.</p>
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Karaoke</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {songs.map(s=> (
          <div key={s.id} className="bg-white rounded-2xl shadow p-4 space-y-2">
            <h3 className="font-bold">{s.title}</h3>
            {s.song ? (
              <audio controls src={s.song} />
            ) : s.youtubeId ? (
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${s.youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : null}
            <div className="text-lg">{s.words.map((w,i)=> <span key={i} className="px-1">{w}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

