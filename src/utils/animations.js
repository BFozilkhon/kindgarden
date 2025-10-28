export function bounce(el){
  if (!el) return
  el.classList.add('animate-bounce')
  setTimeout(()=> el.classList.remove('animate-bounce'), 600)
}

// Simple coin "fly" effect hook-in point (placeholder)
export function coinFly(){
  // In a real app, animate an element from source to coin badge.
}


