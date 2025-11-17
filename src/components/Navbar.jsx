import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Sun, Moon, ChefHat, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { apiGet } from '../utils/api'

export default function Navbar({ theme, toggleTheme }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggest, setShowSuggest] = useState(false)
  const boxRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim().length === 0) { setSuggestions([]); return }
      try {
        const res = await apiGet('/api/recipes', { q: query, limit: 8 })
        setSuggestions(res.items)
      } catch (e) { /* ignore */ }
    }, 200)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(()=>{
    const onDoc = (e)=>{
      if (!boxRef.current) return
      if (!boxRef.current.contains(e.target)) setShowSuggest(false)
    }
    document.addEventListener('click', onDoc)
    return ()=>document.removeEventListener('click', onDoc)
  }, [])

  const linkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
  }`

  const submitSearch = () => {
    if (!query.trim()) return
    setShowSuggest(false)
    navigate(`/recipes?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <button className="md:hidden p-2 rounded hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setOpen(!open)}>
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <ChefHat className="w-5 h-5 text-primary" />
          <span>CookBook</span>
        </Link>
        <nav className={`md:flex items-center gap-1 ml-4 hidden`}>
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/recipes" className={linkClass}>Recipes</NavLink>
          <NavLink to="/what-can-i-cook" className={linkClass}>What Can I Cook?</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        </nav>
        <div className="flex-1" />
        <div className="relative hidden md:block" ref={boxRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={e=>{ setQuery(e.target.value); setShowSuggest(true) }}
            onFocus={()=> setShowSuggest(true)}
            onKeyDown={e=>{ if(e.key==='Enter') submitSearch() }}
            placeholder="Search recipes..."
            className="w-80 pl-9 pr-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 outline-none ring-0 focus:ring-2 focus:ring-primary/30"
          />
          {showSuggest && suggestions.length>0 && (
            <div className="absolute mt-2 w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-lg">
              {suggestions.map(s => (
                <button key={s.id} onClick={()=>{navigate(`/recipes/${s.id}`); setShowSuggest(false)}} className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">
                  <div className="text-sm font-medium line-clamp-1">{s.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{s.description}</div>
                </button>
              ))}
              <button onClick={submitSearch} className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-black/5 dark:hover:bg-white/10">See all results</button>
            </div>
          )}
        </div>
        <button onClick={toggleTheme} className="ml-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {[
            ['/', 'Home'],
            ['/recipes', 'Recipes'],
            ['/what-can-i-cook', 'What Can I Cook?'],
            ['/dashboard', 'Dashboard']
          ].map(([to, label]) => (
            <NavLink key={to} to={to} className="block px-3 py-2 rounded-md text-sm hover:bg-black/5 dark:hover:bg-white/5" onClick={()=>setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 outline-none ring-0 focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      )}
    </header>
  )
}
