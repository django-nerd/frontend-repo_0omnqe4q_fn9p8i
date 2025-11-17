import { Heart, Star, Bookmark, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { apiPost } from '../utils/api'

const DEMO_USER = 'demo@cookbook.app'

export default function RecipeCard({ item }) {
  async function toggle(type){
    const endpoints = { favorite: '/api/user/favorites', saved: '/api/user/saved', cooked: '/api/user/cooked' }
    const body = { user_email: DEMO_USER, recipe_id: item.id }
    try { await apiPost(endpoints[type], body) } catch(e) { /* ignore for UI demo */ }
  }

  return (
    <motion.div whileHover={{y:-4}} className="group rounded-2xl bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition overflow-hidden border border-black/5 dark:border-white/5">
      <Link to={`/recipes/${item.id}`} className="relative aspect-video overflow-hidden block">
        <img src={item.image_url || `https://source.unsplash.com/800x450/?food,${encodeURIComponent(item.title)}`}
             alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm">{item.rating?.toFixed?.(1) || '4.5'}</span>
        </div>
        <h3 className="mt-1 font-semibold line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="mt-3 text-xs text-muted-foreground flex gap-3">
          <span>{item.prep_time_min} min</span>
          <span className="capitalize">{item.difficulty}</span>
          {item.cuisine && <span>{item.cuisine}</span>}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button onClick={()=>toggle('favorite')} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-sm flex items-center gap-2"><Heart className="w-4 h-4"/> Favorite</button>
          <button onClick={()=>toggle('saved')} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg:white/10 hover:bg:black/10 dark:hover:bg:white/15 text-sm flex items-center gap-2"><Bookmark className="w-4 h-4"/> Save</button>
          <button onClick={()=>toggle('cooked')} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg:white/10 hover:bg:black/10 dark:hover:bg:white/15 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Cooked</button>
        </div>
      </div>
    </motion.div>
  )
}
