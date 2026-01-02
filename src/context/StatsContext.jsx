import React, { createContext, useContext, useState, useEffect } from 'react'

const StatsContext = createContext()

export const useStats = () => {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within StatsProvider')
  }
  return context
}

export const StatsProvider = ({ children }) => {
  // Load stats from localStorage or initialize
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('hackronsStats')
    return savedStats ? JSON.parse(savedStats) : {
      totalBattles: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
    }
  })

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hackronsStats', JSON.stringify(stats))
  }, [stats])

  const addBattleResult = (won) => {
    const xpGained = won ? 100 : 25
    const newXp = stats.xp + xpGained
    const newLevel = Math.floor(newXp / 100) + 1
    
    setStats(prev => {
      const newTotalBattles = prev.totalBattles + 1
      const newWins = won ? prev.wins + 1 : prev.wins
      const newLosses = won ? prev.losses : prev.losses + 1
      const newWinRate = ((newWins / newTotalBattles) * 100).toFixed(1)

      return {
        totalBattles: newTotalBattles,
        wins: newWins,
        losses: newLosses,
        winRate: parseFloat(newWinRate),
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newLevel * 100,
      }
    })

    return { xpGained, newLevel: Math.floor(newXp / 100) + 1 }
  }

  const resetStats = () => {
    const initialStats = {
      totalBattles: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
    }
    setStats(initialStats)
    localStorage.setItem('hackronsStats', JSON.stringify(initialStats))
  }

  return (
    <StatsContext.Provider value={{ stats, addBattleResult, resetStats }}>
      {children}
    </StatsContext.Provider>
  )
}
