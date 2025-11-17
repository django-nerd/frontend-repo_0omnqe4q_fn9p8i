import { Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RecipeCard({ item, onFavorite }) {
  return (
    <motion.div whileHover={{y:-4}} className="group rounded-2xl bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition overflow-hidden border border-black/5 dark:border-white/5">
      <div className="relative aspect-video overflow-hidden">
        <img src={item.image_url || `https://source.unsplash.com/800x450/?food,${encodeURIComponent(item.title)}`}
             alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
        <button onClick={()=>onFavorite?.(item)} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white">
          <Heart className="w-4 h-4" />
        </button>
      </div>
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
      </div>
    </motion.div>
  )
}
