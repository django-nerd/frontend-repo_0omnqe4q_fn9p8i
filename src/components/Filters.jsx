import { useEffect, useState } from 'react'

export default function Filters({ onChange }) {
  const [state, setState] = useState({ q:'', ingredients:'', difficulty:'', cuisine:'', max_prep:'', dietary:'', min_rating:'' })

  useEffect(()=>{
    const t = setTimeout(()=>onChange?.(state), 200)
    return ()=>clearTimeout(t)
  }, [state])

  const input = 'px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
      <input className={input} placeholder="Search" value={state.q} onChange={e=>setState(s=>({...s,q:e.target.value}))} />
      <input className={input} placeholder="Ingredients (comma)" value={state.ingredients} onChange={e=>setState(s=>({...s,ingredients:e.target.value}))} />
      <select className={input} value={state.difficulty} onChange={e=>setState(s=>({...s,difficulty:e.target.value}))}>
        <option value="">Difficulty</option>
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select>
      <input className={input} placeholder="Cuisine" value={state.cuisine} onChange={e=>setState(s=>({...s,cuisine:e.target.value}))} />
      <input className={input} placeholder="Max prep (min)" type="number" value={state.max_prep} onChange={e=>setState(s=>({...s,max_prep:e.target.value}))} />
      <input className={input} placeholder="Dietary (comma)" value={state.dietary} onChange={e=>setState(s=>({...s,dietary:e.target.value}))} />
    </div>
  )
}
