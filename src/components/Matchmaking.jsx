import React, { useState } from 'react'
import BattleArena from './BattleArena'
import { useStats } from '../context/StatsContext' // Import useStats
import '../styles/matchmaking.css'

// Import marketplace character images
import character1 from '../assets/images/marketplace/character1.png'
import character2 from '../assets/images/marketplace/character2.png'
import character3 from '../assets/images/marketplace/character3.png'
import character4 from '../assets/images/marketplace/character4.png'
import character5 from '../assets/images/marketplace/character5.png'
import character6 from '../assets/images/marketplace/character6.png'
import character7 from '../assets/images/marketplace/character7.png'
import character8 from '../assets/images/marketplace/character8.png'
import character9 from '../assets/images/marketplace/character9.png'
import character10 from '../assets/images/marketplace/character10.png'
import character11 from '../assets/images/marketplace/character11.png'
import character12 from '../assets/images/marketplace/character12.png'
import character13 from '../assets/images/marketplace/character13.png'
import character14 from '../assets/images/marketplace/character14.png'
import character15 from '../assets/images/marketplace/character15.png'
import character16 from '../assets/images/marketplace/character16.png'
import character17 from '../assets/images/marketplace/character17.png'
import character18 from '../assets/images/marketplace/character18.png'

const Matchmaking = ({ account, ownedCharacters, onBack }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [matchmaking, setMatchmaking] = useState(false)
  const [opponent, setOpponent] = useState(null)
  const [inBattle, setInBattle] = useState(false)
  const [matchmakingProgress, setMatchmakingProgress] = useState(0)
  
  const { addBattleResult } = useStats() // Get function to update stats

  const mockOpponents = [
    { name: 'Genesis Samurai', character: { id: 10, name: 'Genesis Samurai', attack: 88, defense: 68, speed: 82, health: 980, special: 85, image: character1 }},
    { name: 'Royal Knight', character: { id: 11, name: 'Royal Knight', attack: 92, defense: 70, speed: 88, health: 950, special: 90, image: character2 }},
    { name: 'Void Marine', character: { id: 12, name: 'Void Marine', attack: 78, defense: 92, speed: 65, health: 1250, special: 75, image: character3 }},
    { name: 'Shadow Samurai', character: { id: 13, name: 'Shadow Samurai', attack: 95, defense: 60, speed: 80, health: 900, special: 98, image: character4 }},
    { name: 'Chrono Guardian', character: { id: 14, name: 'Chrono Guardian', attack: 85, defense: 75, speed: 78, health: 1050, special: 88, image: character5 }},
    { name: 'Void Assassin', character: { id: 15, name: 'Void Assassin', attack: 90, defense: 72, speed: 85, health: 1000, special: 92, image: character6 }},
    { name: 'Shadow Blade', character: { id: 16, name: 'Shadow Blade', attack: 100, defense: 80, speed: 70, health: 1100, special: 95, image: character7 }},
    { name: 'Archer Knight', character: { id: 17, name: 'Archer Knight', attack: 82, defense: 78, speed: 75, health: 1080, special: 90, image: character8 }},
    { name: 'Holy Paladin', character: { id: 18, name: 'Holy Paladin', attack: 93, defense: 65, speed: 90, health: 920, special: 94, image: character9 }},
    { name: 'Quantum Warrior', character: { id: 19, name: 'Quantum Warrior', attack: 80, defense: 88, speed: 68, health: 1200, special: 82, image: character10 }},
    { name: 'Rogue Ninja', character: { id: 20, name: 'Rogue Ninja', attack: 96, defense: 62, speed: 95, health: 890, special: 91, image: character11 }},
    { name: 'Sentinel Knight', character: { id: 21, name: 'Sentinel Knight', attack: 84, defense: 86, speed: 72, health: 1150, special: 80, image: character12 }},
    { name: 'Blaze Samurai', character: { id: 22, name: 'Blaze Samurai', attack: 94, defense: 68, speed: 84, health: 970, special: 89, image: character13 }},
    { name: 'Nebula Marine', character: { id: 23, name: 'Nebula Marine', attack: 76, defense: 82, speed: 78, health: 1100, special: 84, image: character14 }},
    { name: 'Titan Knight', character: { id: 24, name: 'Titan Knight', attack: 86, defense: 80, speed: 88, health: 1020, special: 93, image: character15 }},
    { name: 'Cyber Ronin', character: { id: 25, name: 'Cyber Ronin', attack: 98, defense: 66, speed: 82, health: 940, special: 96, image: character16 }},
    { name: 'Phantom Marine', character: { id: 26, name: 'Phantom Marine', attack: 87, defense: 76, speed: 74, health: 1080, special: 81, image: character17 }},
    { name: 'Meteor Knight', character: { id: 27, name: 'Meteor Knight', attack: 92, defense: 74, speed: 76, health: 1060, special: 88, image: character18 }},
  ]

  const startMatchmaking = () => {
    if (!selectedCharacter) return
    setMatchmaking(true)
    setMatchmakingProgress(0)

    const interval = setInterval(() => {
      setMatchmakingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          findMatch()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const findMatch = () => {
    const randomOpponent = mockOpponents[Math.floor(Math.random() * mockOpponents.length)]
    setOpponent(randomOpponent)
    setTimeout(() => {
      setMatchmaking(false)
      setInBattle(true)
    }, 1000)
  }

  const cancelMatchmaking = () => {
    setMatchmaking(false)
    setMatchmakingProgress(0)
  }

  const handleBattleEnd = (won) => {
    // Update stats
    const result = addBattleResult(won)
    
    setInBattle(false)
    setOpponent(null)
    setSelectedCharacter(null)
    
    if (won) {
      alert(`🎉 Victory! You earned +${result.xpGained} XP and +0.01 POL${result.newLevel > result.newLevel - 1 ? '\n🎊 LEVEL UP! You are now level ' + result.newLevel : ''}`)
    } else {
      alert(`💀 Defeat! Better luck next time. You earned +${result.xpGained} XP`)
    }
  }

  if (inBattle && selectedCharacter && opponent) {
    return (
      <BattleArena
        myCharacter={selectedCharacter}
        opponentCharacter={opponent.character}
        onBattleEnd={handleBattleEnd}
      />
    )
  }

  return (
    <div className="matchmaking-container">
      {onBack && (
        <button className="back-to-menu-btn" onClick={onBack}>
          ← Back to Menu
        </button>
      )}

      <div className="matchmaking-header">
        <h1 className="matchmaking-title">⚔️ Battle Arena</h1>
        <p className="matchmaking-subtitle">Select your character and find a worthy opponent</p>
      </div>

      {!matchmaking && (
        <div className="character-selection">
          <h2 className="selection-title">Your Characters</h2>
          
          <div className="characters-grid">
            {ownedCharacters.map((char) => (
              <div
                key={char.id}
                className={`character-card ${selectedCharacter?.id === char.id ? 'selected' : ''}`}
                onClick={() => setSelectedCharacter(char)}
              >
                <div className="character-glow" />
                
                <div className="character-image-wrapper">
                  <div className="character-image">
                    <img src={char.image} alt={char.name} />
                  </div>
                  {selectedCharacter?.id === char.id && (
                    <div className="selected-overlay">
                      <div className="selected-checkmark">✓</div>
                    </div>
                  )}
                </div>

                <div className="character-info-box">
                  <h3 className="character-name">{char.name}</h3>
                  
                  <div className="character-stats-grid">
                    <div className="stat-item-mini">
                      <div className="stat-icon">⚔️</div>
                      <div className="stat-details">
                        <span className="stat-label">ATK</span>
                        <span className="stat-value">{char.attack}</span>
                      </div>
                    </div>
                    
                    <div className="stat-item-mini">
                      <div className="stat-icon">🛡️</div>
                      <div className="stat-details">
                        <span className="stat-label">DEF</span>
                        <span className="stat-value">{char.defense}</span>
                      </div>
                    </div>
                    
                    <div className="stat-item-mini">
                      <div className="stat-icon">⚡</div>
                      <div className="stat-details">
                        <span className="stat-label">SPD</span>
                        <span className="stat-value">{char.speed}</span>
                      </div>
                    </div>
                    
                    <div className="stat-item-mini">
                      <div className="stat-icon">❤️</div>
                      <div className="stat-details">
                        <span className="stat-label">HP</span>
                        <span className="stat-value">{char.health}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCharacter?.id === char.id && (
                  <div className="selected-badge-ribbon">
                    <span>SELECTED</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {ownedCharacters.length === 0 && (
            <div className="no-characters-message">
              <div className="no-char-icon">😔</div>
              <h3>No Characters Available</h3>
              <p>You need to own at least one character to battle!</p>
              <button className="get-character-btn" onClick={() => window.location.href = '/characters'}>
                Get Free Character
              </button>
            </div>
          )}

          {selectedCharacter && (
            <div className="ready-to-battle">
              <div className="selected-character-display">
                <img src={selectedCharacter.image} alt={selectedCharacter.name} />
                <div className="selected-char-info">
                  <p className="ready-text">Ready to battle with</p>
                  <h3>{selectedCharacter.name}</h3>
                </div>
              </div>
              <button className="start-matchmaking-btn" onClick={startMatchmaking}>
                <span className="btn-icon">⚔️</span>
                Find Match
                <span className="btn-glow" />
              </button>
            </div>
          )}
        </div>
      )}

      {matchmaking && (
        <div className="matchmaking-screen">
          <div className="matchmaking-animation">
            <div className="searching-ring">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="ring ring-3" />
              <div className="searching-icon">🔍</div>
            </div>
            
            <h2 className="searching-text">Searching for Opponent...</h2>
            <p className="matchmaking-hint">Finding a worthy challenger for your {selectedCharacter.name}</p>
            
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${matchmakingProgress}%` }} />
                <div className="progress-shimmer" />
              </div>
              <p className="progress-text">{matchmakingProgress}%</p>
            </div>

            {opponent && matchmakingProgress === 100 && (
              <div className="opponent-found">
                <div className="found-banner">⚔️ OPPONENT FOUND ⚔️</div>
                
                <div className="opponent-card">
                  <div className="opponent-avatar">
                    <img src={opponent.character.image} alt={opponent.character.name} />
                    <div className="avatar-ring" />
                  </div>
                  
                  <h4 className="opponent-name">{opponent.name}</h4>
                  <p className="opponent-character">{opponent.character.name}</p>
                  
                  <div className="opponent-stats-row">
                    <div className="opponent-stat"><span>⚔️</span><span>{opponent.character.attack}</span></div>
                    <div className="opponent-stat"><span>🛡️</span><span>{opponent.character.defense}</span></div>
                    <div className="opponent-stat"><span>⚡</span><span>{opponent.character.speed}</span></div>
                  </div>
                </div>
                
                <p className="battle-starting">
                  <span className="battle-text">Battle starting</span>
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </p>
              </div>
            )}

            <button className="cancel-btn" onClick={cancelMatchmaking}>
              ✕ Cancel Search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Matchmaking
