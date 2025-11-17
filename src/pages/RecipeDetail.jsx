import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../utils/api'

export default function RecipeDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    apiGet(`/api/recipes/${id}`).then(setData)
  }, [id])

  if(!data) return <div className="max-w-4xl mx-auto px-6 py-10">Loading...</div>

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <img src={data.image_url || `https://source.unsplash.com/1200x800/?food,${encodeURIComponent(data.title)}`} alt={data.title} className="w-full rounded-2xl shadow" />
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground mt-2">{data.description}</p>
          <div className="mt-4 text-sm text-muted-foreground flex gap-4">
            <span className="capitalize">{data.difficulty}</span>
            <span>{data.prep_time_min} min prep</span>
            {data.cuisine && <span>{data.cuisine}</span>}
          </div>
          {data.nutrition && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {Object.entries(data.nutrition).map(([k,v])=> (
                <div key={k} className="p-2 rounded bg-black/5 dark:bg-white/10"><span className="font-medium mr-2 capitalize">{k.replace('_',' ')}</span>{v}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="mt-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="mt-3 space-y-2">
            {data.ingredients?.map((ing,i)=> (
              <li key={i} className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary/60" /> {ing.amount && <span className="text-muted-foreground mr-1">{ing.amount}</span>} {ing.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Steps</h2>
          <ol className="mt-3 space-y-3 list-decimal list-inside">
            {data.steps?.map((s,i)=> <li key={i} className="p-3 rounded-lg bg-black/5 dark:bg-white/10">{s}</li>)}
          </ol>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="mt-3 space-y-3">
          {data.reviews?.map(r => (
            <div key={r.id} className="p-3 rounded-lg bg-black/5 dark:bg-white/10">
              <div className="text-sm font-medium">{r.user_name}</div>
              <div className="text-sm text-muted-foreground">{r.rating} / 5</div>
              <div className="mt-1">{r.comment}</div>
            </div>
          ))}
          {data.reviews?.length===0 && <div className="text-muted-foreground">No reviews yet.</div>}
        </div>
      </section>
    </main>
  )
}
