import { useState, useEffect, useRef } from 'react'

function AnimatedStats() {
  const [inView, setInView] = useState(false)
  const [counts, setCounts] = useState({ players: 0, nfts: 0, battles: 0, volume: 0 })
  const sectionRef = useRef(null)

  const targets = {
    players: 10247,
    nfts: 5000,
    battles: 52891,
    volume: 1250
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        players: Math.floor(targets.players * progress),
        nfts: Math.floor(targets.nfts * progress),
        battles: Math.floor(targets.battles * progress),
        volume: Math.floor(targets.volume * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView])

  return (
    <section className="animated-stats" ref={sectionRef}>
      <h2 className="stats-title">The Numbers Speak</h2>
      
      <div className="animated-stats-grid">
        <div className="animated-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-number">{counts.players.toLocaleString()}+</div>
          <div className="stat-label">Active Players</div>
        </div>
        
        <div className="animated-stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-number">{counts.nfts.toLocaleString()}</div>
          <div className="stat-label">NFTs Minted</div>
        </div>
        
        <div className="animated-stat-card">
          <div className="stat-icon">⚔️</div>
          <div className="stat-number">{counts.battles.toLocaleString()}+</div>
          <div className="stat-label">Battles Fought</div>
        </div>
        
        <div className="animated-stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-number">${counts.volume}K+</div>
          <div className="stat-label">Trading Volume</div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedStats
