import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../utils/api'

const DEMO_USER = 'demo@cookbook.app'

export default function RecipeDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [review, setReview] = useState({ user_name: 'Guest', rating: 5, comment: '' })
  const [busy, setBusy] = useState(false)

  async function load(){
    const d = await apiGet(`/api/recipes/${id}`)
    setData(d)
  }

  useEffect(()=>{ load() }, [id])

  async function submitReview(){
    if (!review.comment.trim()) return
    setBusy(true)
    try{
      await apiPost(`/api/recipes/${id}/reviews`, { recipe_id: id, ...review })
      setReview(r=>({...r, comment:''}))
      await load()
    } finally { setBusy(false) }
  }

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
          {data.video_url && (
            <div className="mt-4">
              <video controls className="w-full rounded-lg">
                <source src={data.video_url} type="video/mp4" />
              </video>
            </div>
          )}
          {data.nutrition && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {Object.entries(data.nutrition).map(([k,v])=> (
                <div key={k} className="p-2 rounded bg-black/5 dark:bg:white/10"><span className="font-medium mr-2 capitalize">{k.replace('_',' ')}</span>{v}</div>
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
            {data.steps?.map((s,i)=> <li key={i} className="p-3 rounded-lg bg-black/5 dark:bg:white/10">{s}</li>)}
          </ol>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="mt-3 space-y-3">
          {data.reviews?.map(r => (
            <div key={r.id} className="p-3 rounded-lg bg-black/5 dark:bg:white/10">
              <div className="text-sm font-medium">{r.user_name}</div>
              <div className="text-sm text-muted-foreground">{r.rating} / 5</div>
              <div className="mt-1">{r.comment}</div>
            </div>
          ))}
          {data.reviews?.length===0 && <div className="text-muted-foreground">No reviews yet.</div>}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-black/5 dark:bg:white/10">
          <div className="font-medium">Add your review</div>
          <div className="mt-2 grid sm:grid-cols-3 gap-3">
            <input value={review.user_name} onChange={e=>setReview(r=>({...r, user_name: e.target.value}))} className="px-3 py-2 rounded-lg bg-black/5 dark:bg:white/10" placeholder="Your name" />
            <select value={review.rating} onChange={e=>setReview(r=>({...r, rating: Number(e.target.value)}))} className="px-3 py-2 rounded-lg bg-black/5 dark:bg:white/10">
              {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} stars</option>)}
            </select>
            <button disabled={busy || !review.comment.trim()} onClick={submitReview} className="px-3 py-2 rounded-lg bg-primary text-white disabled:opacity-60">Submit</button>
          </div>
          <textarea value={review.comment} onChange={e=>setReview(r=>({...r, comment: e.target.value}))} className="mt-3 w-full min-h-[90px] px-3 py-2 rounded-lg bg-black/5 dark:bg:white/10" placeholder="Share your experience..." />
        </div>
      </section>
    </main>
  )
}
