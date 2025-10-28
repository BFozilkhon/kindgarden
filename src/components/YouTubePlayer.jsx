import { useState } from 'react'

export default function YouTubePlayer({ youtubeId, onEnded, title='Lesson video' }){
  const [started, setStarted] = useState(false)
  // Note: We use YouTube embed with modest branding and no autoplay.
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-white shadow">
      <div className="relative aspect-video">
        {!started && (
          <button
            className="absolute inset-0 flex items-center justify-center text-white text-xl"
            aria-label="Play video"
            onClick={()=> setStarted(true)}
          >
            <span className="bg-[var(--primary)]/80 px-6 py-3 rounded-full">Play ▶</span>
          </button>
        )}
        {started ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={()=> {/* no-op */}}
          />
        ) : (
          <div className="w-full h-full bg-slate-100" aria-label="YouTube thumbnail placeholder" />
        )}
      </div>
    </div>
  )
}


