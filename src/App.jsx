import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Suggest from './pages/Suggest'
import RecipeDetail from './pages/RecipeDetail'
import Dashboard from './pages/Dashboard'
import { AnimatePresence, motion } from 'framer-motion'

export default function App(){
  const [theme, setTheme] = useState('light')
  const location = useLocation()

  useEffect(()=>{
    const stored = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(stored)
  }, [])
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-white text-foreground dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
      <Navbar theme={theme} toggleTheme={()=>setTheme(t=>t==='light'?'dark':'light')} />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-6}} transition={{duration:.25}}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/what-can-i-cook" element={<Suggest />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <footer className="mt-16 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-muted-foreground">© {new Date().getFullYear()} CookBook — Crafted with love.</div>
      </footer>
    </div>
  )
}
