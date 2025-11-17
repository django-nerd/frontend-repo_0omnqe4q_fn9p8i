import { useEffect, useState } from 'react'
import Filters from '../components/Filters'
import RecipeCard from '../components/RecipeCard'
import { apiGet } from '../utils/api'
import { useLocation } from 'react-router-dom'

export default function Recipes(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  async function fetchList(params={}){
    setLoading(true)
    try{
      const data = await apiGet('/api/recipes', params)
      setItems(data.items)
    } finally { setLoading(false) }
  }

  useEffect(()=>{
    const qs = new URLSearchParams(location.search)
    const q = qs.get('q') || ''
    fetchList(q ? { q } : {})
  }, [location.search])

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recipe Library</h1>
          <p className="text-muted-foreground">Filter by ingredients, difficulty, cuisine, time, diet, and rating.</p>
        </div>
      </div>
      <div className="mt-6">
        <Filters onChange={fetchList} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map(it => <RecipeCard key={it.id} item={it} />)}
      </div>
      {loading && <div className="text-center py-10 text-muted-foreground">Loading...</div>}
      {!loading && items.length===0 && <div className="text-center py-10 text-muted-foreground">No recipes found.</div>}
    </main>
  )
}
