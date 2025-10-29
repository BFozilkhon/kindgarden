export default function Karaoke(){
  // We now only show curated karaoke videos to avoid clutter from lesson words
  const songs = []
  const curated = [
    { id:'kj1', title:'Johnny Johnny Karaoke', youtubeId:'UK3wTBugH_0' },
    { id:'kj2', title:'ABC Karaoke', youtubeId:'E7KyWrDgJ3A' },
    { id:'kj3', title:'Jingle Bells Karaoke', youtubeId:'8zphtjEssDM' },
    { id:'kj4', title:'Finger Family ("Daddy Finger") Karaoke', youtubeId:'9mLSC6SAwzI' },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Karaoke</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Tavsiya etilgan karaoke</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {curated.map(s=> (
            <div key={s.id} className="bg-white rounded-2xl shadow p-4 space-y-2">
              <h4 className="font-bold">{s.title}</h4>
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
            </div>
          ))}
        </div>
      </div>
      {songs.length>0 && (
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

