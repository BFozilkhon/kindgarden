import BigCTAButton from './BigCTAButton'

export default function MathQuestion({ options=[], onAnswer }){
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {options.map((o,i)=> (
        <BigCTAButton key={i} onClick={()=> onAnswer(o)} ariaLabel={`Answer ${o}`}>{o}</BigCTAButton>
      ))}
    </div>
  )
}

