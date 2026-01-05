import { createContext, useContext, useState, useEffect } from 'react'

const StatsContext = createContext()

export const useStats = () => {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within StatsProvider')
  }
  return context
}

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalBattles: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    polBalance: 0, // Add POL balance
    totalPolEarned: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const savedStats = localStorage.getItem('playerStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }

  const saveStats = (newStats) => {
    localStorage.setItem('playerStats', JSON.stringify(newStats))
    setStats(newStats)
  }

  const updateAfterBattle = (won, polEarned = 0) => {
    const newStats = { ...stats }
    
    newStats.totalBattles += 1
    if (won) {
      newStats.wins += 1
      newStats.polBalance += polEarned
      newStats.totalPolEarned += polEarned
    } else {
      newStats.losses += 1
    }
    
    newStats.winRate = Math.round((newStats.wins / newStats.totalBattles) * 100) || 0
    
    // Add XP (more for wins)
    const xpGained = won ? 50 : 20
    newStats.xp += xpGained
    
    // Level up check
    while (newStats.xp >= newStats.xpToNextLevel) {
      newStats.xp -= newStats.xpToNextLevel
      newStats.level += 1
      newStats.xpToNextLevel = newStats.level * 100
    }
    
    saveStats(newStats)
  }

  const deductPol = (amount) => {
    const newStats = { ...stats }
    newStats.polBalance -= amount
    saveStats(newStats)
  }

  return (
    <StatsContext.Provider value={{ 
      stats, 
      updateAfterBattle,
      deductPol,
      loadStats 
    }}>
      {children}
    </StatsContext.Provider>
  )
}
