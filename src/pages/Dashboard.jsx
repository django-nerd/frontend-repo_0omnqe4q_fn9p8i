import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../utils/api'

const DEMO_USER = 'demo@cookbook.app'

export default function Dashboard(){
  const [data, setData] = useState(null)
  const [items, setItems] = useState('')

  async function load(){
    const d = await apiGet('/api/user/summary', { user: DEMO_USER })
    setData(d)
    setItems(d.shopping_list.join(', '))
  }
  useEffect(()=>{ load() }, [])

  async function save(){
    await apiPost('/api/user/shopping-list', { user_email: DEMO_USER, items: items.split(',').map(s=>s.trim()).filter(Boolean) })
    load()
  }

  if(!data) return <div className="max-w-5xl mx-auto px-6 py-10">Loading...</div>

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <p className="text-muted-foreground">Save recipes, manage your shopping list, and track cooked dishes.</p>

      <section className="mt-8">
        <h2 className="font-semibold">Shopping list</h2>
        <div className="mt-2 flex gap-3">
          <input value={items} onChange={e=>setItems(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10" placeholder="milk, eggs, butter" />
          <button onClick={save} className="px-4 py-3 rounded-xl bg-primary text-white">Save</button>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">Tip: separate items with commas</div>
      </section>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl bg-black/5 dark:bg-white/10">
          <div className="text-sm text-muted-foreground">Favorites</div>
          <div className="text-2xl font-bold">{data.favorites.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-black/5 dark:bg-white/10">
          <div className="text-sm text-muted-foreground">Saved</div>
          <div className="text-2xl font-bold">{data.saved.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-black/5 dark:bg-white/10">
          <div className="text-sm text-muted-foreground">Cooked</div>
          <div className="text-2xl font-bold">{data.cooked.length}</div>
        </div>
      </section>
    </main>
  )
}
