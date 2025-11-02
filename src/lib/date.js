function pad(n){ return String(n).padStart(2,'0') }
function ordinal(n){
  const s=["th","st","nd","rd"], v=n%100; return n+(s[(v-20)%10]||s[v]||s[0])
}

export function formatDateTime(ts, lang='uz'){
  const d = new Date(ts)
  const month = new Intl.DateTimeFormat(lang, { month:'long' }).format(d)
  const year = d.getFullYear()
  const day = d.getDate()
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
  if (lang.startsWith('en')){
    return `${ordinal(day)} ${month} ${year}, ${time}`
  }
  return `${day} ${month} ${year}, ${time}`
}


