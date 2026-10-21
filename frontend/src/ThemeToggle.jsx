import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [night, setNight] = useState(() => {
    try { return localStorage.getItem('ser.theme') === 'night' } catch { return false }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = night ? 'night' : 'light'
    try { localStorage.setItem('ser.theme', night ? 'night' : 'light') } catch { /* Theme still works in memory. */ }
  }, [night])
  return <button className="theme-toggle" aria-label="Eksperymentalny tryb nocny" aria-pressed={night} onClick={() => setNight(value => !value)}>
    <span aria-hidden="true">{night ? '☾' : '☀'}</span>
    <span>{night ? 'Tryb nocny' : 'Tryb jasny'}<small>{night ? 'Eksperymentalny' : 'Zmień na nocny'}</small></span>
    <span className="theme-track" aria-hidden="true"><span/></span>
  </button>
}
