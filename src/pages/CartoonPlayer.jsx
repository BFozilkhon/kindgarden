export default function CartoonPlayer(){
  const vids = [
    'zt-onoQ3cCo',
    '2uCpwTO7lMc',
    'NGGhAxrlXig',
    'BZ0JXuh8194',
    'nh7nJHyeWWA',
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Multfilmlar</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {vids.map(id=> (
          <div key={id} className="bg-white rounded-2xl shadow p-2">
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}`}
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
  )
}

