import Hero from '../components/Hero'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <main>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl font-semibold">Trending now</motion.h2>
        <p className="text-muted-foreground mt-2">Fresh picks and seasonal favorites</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {["Pasta Primavera","Citrus Salmon","Green Goddess Bowl"].map((t,i)=> (
            <motion.a key={t} href="/recipes" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-cover bg-center h-56 group relative" style={{backgroundImage:`url(https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)})`}}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm opacity-80">Featured</div>
                <div className="text-xl font-semibold">{t}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  )
}
