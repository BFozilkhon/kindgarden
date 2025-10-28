import { useRef, useState } from 'react'

export default function LessonVideoPlayer({ src, onEnded, poster }){
  const ref = useRef(null)
  const [played, setPlayed] = useState(false)

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-white shadow">
      <div className="relative">
        {!played && (
          <button
            className="absolute inset-0 flex items-center justify-center text-white text-xl"
            aria-label="Play video"
            onClick={()=>{ setPlayed(true); ref.current?.play() }}
          >
            <span className="bg-[var(--primary)]/80 px-6 py-3 rounded-full">Play ▶</span>
          </button>
        )}
        <video ref={ref} className="w-full h-auto" controls poster={poster} onEnded={onEnded}>
          <source src={src} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English captions" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </div>
  )
}

