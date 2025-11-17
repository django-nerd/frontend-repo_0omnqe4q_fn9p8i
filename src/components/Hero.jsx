import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Cook smarter. Eat better.
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.6}} className="mt-4 text-lg text-muted-foreground">
            Discover recipes, filter by what matters, and get instant suggestions based on ingredients you have on hand.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.6}} className="mt-8 flex flex-wrap gap-3">
            <a href="/recipes" className="px-5 py-3 rounded-lg bg-primary text-white shadow hover:shadow-md transition">Browse Recipes</a>
            <a href="/what-can-i-cook" className="px-5 py-3 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition">What can I cook?</a>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.6}} className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 animate-in" style={{animationDelay: `${i*40}ms`}}>
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage:`url(https://images.unsplash.com/photo-15${i}?????`}} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
