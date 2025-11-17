import { useState } from 'react'
import { apiPost } from '../utils/api'
import RecipeCard from '../components/RecipeCard'

export default function Suggest(){
  const [input, setInput] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function submit(){
    const list = input.split(',').map(s=>s.trim()).filter(Boolean)
    setLoading(true)
    try{
      const data = await apiPost('/api/suggest', { ingredients: list })
      setItems(data.items)
    } finally { setLoading(false) }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">What can I cook?</h1>
      <p className="text-muted-foreground mt-1">Enter what you have — we'll match recipes that fit.</p>
      <div className="mt-6 flex gap-3">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. chicken, lemon, garlic" className="flex-1 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10" />
        <button onClick={submit} className="px-5 py-3 rounded-xl bg-primary text-white shadow hover:shadow-md transition">Find Matches</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map(it => <RecipeCard key={it.id} item={it} />)}
      </div>
      {loading && <div className="text-center py-10 text-muted-foreground">Loading...</div>}
    </main>
  )
}
