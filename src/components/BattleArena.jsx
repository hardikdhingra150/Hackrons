import React, { useState, useEffect, useRef } from 'react'
import '../styles/battle.css'

const BattleArena = ({ myCharacter, opponentCharacter, onBattleEnd }) => {
  const [myHealth, setMyHealth] = useState(myCharacter.health)
  const [opponentHealth, setOpponentHealth] = useState(opponentCharacter.health)
  const [turn, setTurn] = useState(1)
  const [battleLog, setBattleLog] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [mySpecialBar, setMySpecialBar] = useState(0)
  const [opponentSpecialBar, setOpponentSpecialBar] = useState(0)
  const [isDefending, setIsDefending] = useState(false)
  const [opponentDefending, setOpponentDefending] = useState(false)
  
  // Image loading states
  const [myImageError, setMyImageError] = useState(false)
  const [opponentImageError, setOpponentImageError] = useState(false)
  
  // Timing bar states
  const [showTimingBar, setShowTimingBar] = useState(false)
  const [timingPosition, setTimingPosition] = useState(0)
  const [timingBarActive, setTimingBarActive] = useState(false)
  const [actionType, setActionType] = useState(null)
  
  const timingIntervalRef = useRef(null)
  const logEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [battleLog])

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const startTimingBar = (type) => {
    setActionType(type)
    setShowTimingBar(true)
    setTimingBarActive(true)
    setTimingPosition(0)
    
    let position = 0
    let direction = 1
    
    timingIntervalRef.current = setInterval(() => {
      position += direction * 1.75
      
      if (position >= 100) {
        direction = -1
        position = 100
      } else if (position <= 0) {
        direction = 1
        position = 0
      }
      
      setTimingPosition(position)
    }, 16)
  }

  const stopTimingBar = () => {
    if (timingIntervalRef.current) {
      clearInterval(timingIntervalRef.current)
      timingIntervalRef.current = null
    }
    
    setTimingBarActive(false)
    
    const hitQuality = calculateHitQuality(timingPosition)
    
    setTimeout(() => {
      setShowTimingBar(false)
      
      if (actionType === 'attack') {
        executeAttack(hitQuality)
      } else if (actionType === 'special') {
        executeSpecialAttack(hitQuality)
      }
    }, 500)
  }

  const calculateHitQuality = (position) => {
    const distance = Math.abs(position - 50)
    
    if (distance <= 5) {
      return { type: 'CRITICAL', multiplier: 2.0, color: '#ffd700' }
    } else if (distance <= 15) {
      return { type: 'EXCELLENT', multiplier: 1.5, color: '#00ff88' }
    } else if (distance <= 30) {
      return { type: 'GOOD', multiplier: 1.0, color: '#00d4ff' }
    } else {
      return { type: 'WEAK', multiplier: 0.5, color: '#ff6b00' }
    }
  }

  const executeAttack = (hitQuality) => {
    const baseDamage = myCharacter.attack
    let damage = Math.floor(baseDamage * hitQuality.multiplier)
    
    if (opponentDefending) {
      damage = Math.floor(damage * 0.5)
    }
    
    const newOpponentHealth = Math.max(0, opponentHealth - damage)
    setOpponentHealth(newOpponentHealth)
    
    const specialGain = 15
    setMySpecialBar(Math.min(100, mySpecialBar + specialGain))
    
    addLog(`Turn ${turn}: ${myCharacter.name} ⚔️ Attack - ${hitQuality.type}! -${damage} DMG`, hitQuality.color)
    
    if (newOpponentHealth <= 0) {
      endBattle(true)
    } else {
      setIsDefending(false)
      setTimeout(() => opponentTurn(), 1500)
    }
    
    setTurn(turn + 1)
  }

  const executeSpecialAttack = (hitQuality) => {
    if (mySpecialBar < 100) return
    
    const specialDamage = Math.floor(myCharacter.special * hitQuality.multiplier * 1.2)
    let damage = specialDamage
    
    if (opponentDefending) {
      damage = Math.floor(damage * 0.7)
    }
    
    const newOpponentHealth = Math.max(0, opponentHealth - damage)
    setOpponentHealth(newOpponentHealth)
    
    setMySpecialBar(0)
    
    addLog(`Turn ${turn}: ${myCharacter.name} ✨ Special Attack - ${hitQuality.type}! -${damage} DMG`, '#9d00ff')
    
    if (newOpponentHealth <= 0) {
      endBattle(true)
    } else {
      setIsDefending(false)
      setTimeout(() => opponentTurn(), 1500)
    }
    
    setTurn(turn + 1)
  }

  const handleDefend = () => {
    setIsDefending(true)
    
    const healAmount = Math.floor(myCharacter.defense * 0.5)
    const newHealth = Math.min(myCharacter.health, myHealth + healAmount)
    setMyHealth(newHealth)
    
    const specialGain = 20
    setMySpecialBar(Math.min(100, mySpecialBar + specialGain))
    
    addLog(`Turn ${turn}: ${myCharacter.name} 🛡️ Defend +${healAmount} HP, +${specialGain}% Special`, '#00d4ff')
    
    setTurn(turn + 1)
    setTimeout(() => opponentTurn(), 1500)
  }

  const opponentTurn = () => {
    const rand = Math.random()
    let shouldDefend = false
    
    if (opponentHealth < opponentCharacter.health * 0.3) {
      shouldDefend = rand < 0.4
    } else if (opponentHealth < opponentCharacter.health * 0.6) {
      shouldDefend = rand < 0.2
    }
    
    if (opponentSpecialBar >= 100 && rand > 0.3 && !shouldDefend) {
      opponentSpecialAttack()
      return
    }
    
    if (shouldDefend) {
      opponentDefend()
    } else {
      opponentAttack()
    }
  }

  const opponentAttack = () => {
    setOpponentDefending(false)
    
    const rand = Math.random()
    let hitQuality
    
    if (rand < 0.1) {
      hitQuality = { type: 'CRITICAL', multiplier: 2.0, color: '#ffd700' }
    } else if (rand < 0.3) {
      hitQuality = { type: 'EXCELLENT', multiplier: 1.5, color: '#00ff88' }
    } else if (rand < 0.7) {
      hitQuality = { type: 'GOOD', multiplier: 1.0, color: '#00d4ff' }
    } else {
      hitQuality = { type: 'WEAK', multiplier: 0.5, color: '#ff6b00' }
    }
    
    const baseDamage = opponentCharacter.attack
    let damage = Math.floor(baseDamage * hitQuality.multiplier)
    
    if (isDefending) {
      damage = Math.floor(damage * 0.5)
    }
    
    const newMyHealth = Math.max(0, myHealth - damage)
    setMyHealth(newMyHealth)
    
    const specialGain = 15
    setOpponentSpecialBar(Math.min(100, opponentSpecialBar + specialGain))
    
    addLog(`Turn ${turn + 1}: ${opponentCharacter.name} ⚔️ Attack - ${hitQuality.type}! -${damage} DMG`, '#ff0000')
    
    if (newMyHealth <= 0) {
      endBattle(false)
    }
    
    setTurn(turn + 2)
  }

  const opponentSpecialAttack = () => {
    setOpponentDefending(false)
    
    const rand = Math.random()
    let hitQuality
    
    if (rand < 0.15) {
      hitQuality = { type: 'CRITICAL', multiplier: 2.0, color: '#ffd700' }
    } else if (rand < 0.4) {
      hitQuality = { type: 'EXCELLENT', multiplier: 1.5, color: '#00ff88' }
    } else {
      hitQuality = { type: 'GOOD', multiplier: 1.0, color: '#00d4ff' }
    }
    
    const specialDamage = Math.floor(opponentCharacter.special * hitQuality.multiplier * 1.2)
    let damage = specialDamage
    
    if (isDefending) {
      damage = Math.floor(damage * 0.7)
    }
    
    const newMyHealth = Math.max(0, myHealth - damage)
    setMyHealth(newMyHealth)
    
    setOpponentSpecialBar(0)
    
    addLog(`Turn ${turn + 1}: ${opponentCharacter.name} ✨ Special - ${hitQuality.type}! -${damage} DMG`, '#9d00ff')
    
    if (newMyHealth <= 0) {
      endBattle(false)
    }
    
    setTurn(turn + 2)
  }

  const opponentDefend = () => {
    setOpponentDefending(true)
    
    const healAmount = Math.floor(opponentCharacter.defense * 0.5)
    const newHealth = Math.min(opponentCharacter.health, opponentHealth + healAmount)
    setOpponentHealth(newHealth)
    
    const specialGain = 20
    setOpponentSpecialBar(Math.min(100, opponentSpecialBar + specialGain))
    
    addLog(`Turn ${turn + 1}: ${opponentCharacter.name} 🛡️ Defend +${healAmount} HP`, '#00d4ff')
    
    setTurn(turn + 2)
  }

  const addLog = (message, color = '#ffffff') => {
    setBattleLog(prev => [...prev, { message, color, id: Date.now() }])
  }

  const endBattle = (won) => {
    setGameOver(true)
    setWinner(won ? 'player' : 'opponent')
    
    if (won) {
      addLog(`🎉 VICTORY! ${myCharacter.name} won the battle!`, '#ffd700')
    } else {
      addLog(`💀 DEFEAT! ${opponentCharacter.name} has defeated you.`, '#ff0000')
    }
    
    setTimeout(() => {
      onBattleEnd(won)
    }, 3000)
  }

  // Character placeholder component
  const CharacterPlaceholder = ({ name, isOpponent }) => (
    <div className="character-placeholder">
      <div className={`placeholder-gradient ${isOpponent ? 'opponent-gradient' : 'player-gradient'}`}>
        <span className="placeholder-initials">{name.substring(0, 2).toUpperCase()}</span>
      </div>
    </div>
  )

  return (
    <div className="battle-arena-container">
      <h1 className="arena-title">Battle Arena</h1>
      <div className="turn-indicator">Turn {turn}</div>

      <div className="battle-field">
        {/* Player Side */}
        <div className="fighter-container player-side">
          <div className="fighter-card">
            <div className="fighter-image">
              {myImageError ? (
                <CharacterPlaceholder name={myCharacter.name} isOpponent={false} />
              ) : (
                <img 
                  src={myCharacter.image} 
                  alt={myCharacter.name}
                  onError={() => setMyImageError(true)}
                />
              )}
              {isDefending && <div className="defending-shield">🛡️</div>}
            </div>
            <h3 className="fighter-name">{myCharacter.name}</h3>
            <div className="health-bar-container">
              <div className="health-bar">
                <div 
                  className="health-fill player-health"
                  style={{ width: `${(myHealth / myCharacter.health) * 100}%` }}
                />
              </div>
              <span className="health-text">{myHealth} / {myCharacter.health}</span>
            </div>
            <div className="special-bar-container">
              <div className="special-bar">
                <div 
                  className="special-fill"
                  style={{ width: `${mySpecialBar}%` }}
                />
              </div>
              <span className="special-text">Special: {mySpecialBar}%</span>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="vs-divider">VS</div>

        {/* Opponent Side */}
        <div className="fighter-container opponent-side">
          <div className="fighter-card">
            <div className="fighter-image">
              {opponentImageError ? (
                <CharacterPlaceholder name={opponentCharacter.name} isOpponent={true} />
              ) : (
                <img 
                  src={opponentCharacter.image} 
                  alt={opponentCharacter.name}
                  onError={() => setOpponentImageError(true)}
                />
              )}
              {opponentDefending && <div className="defending-shield">🛡️</div>}
            </div>
            <h3 className="fighter-name">{opponentCharacter.name}</h3>
            <div className="health-bar-container">
              <div className="health-bar">
                <div 
                  className="health-fill opponent-health"
                  style={{ width: `${(opponentHealth / opponentCharacter.health) * 100}%` }}
                />
              </div>
              <span className="health-text">{opponentHealth} / {opponentCharacter.health}</span>
            </div>
            <div className="special-bar-container">
              <div className="special-bar">
                <div 
                  className="special-fill"
                  style={{ width: `${opponentSpecialBar}%` }}
                />
              </div>
              <span className="special-text">Special: {opponentSpecialBar}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timing Bar */}
      {showTimingBar && (
        <div className="timing-bar-container">
          <h3 className="timing-title">
            {actionType === 'special' ? '⚡ SPECIAL ATTACK' : '⚔️ ATTACK'} - Hit the center!
          </h3>
          <div className="timing-bar-track">
            <div className="timing-zone critical-zone" style={{ left: '45%', width: '10%' }}>
              <span>CRITICAL</span>
            </div>
            <div className="timing-zone excellent-zone" style={{ left: '35%', width: '10%' }} />
            <div className="timing-zone excellent-zone" style={{ left: '55%', width: '10%' }} />
            
            <div 
              className="timing-indicator"
              style={{ left: `${timingPosition}%` }}
            />
          </div>
          <p className="timing-hint">Press any action button to stop!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="action-btn attack-btn"
          onClick={() => {
            if (timingBarActive) {
              stopTimingBar()
            } else if (!gameOver && !showTimingBar) {
              startTimingBar('attack')
            }
          }}
          disabled={gameOver || (showTimingBar && actionType !== 'attack')}
        >
          <span className="btn-icon">⚔️</span>
          <span className="btn-text">ATTACK</span>
        </button>

        <button 
          className="action-btn special-btn"
          onClick={() => {
            if (timingBarActive && actionType === 'special') {
              stopTimingBar()
            } else if (!gameOver && !showTimingBar && mySpecialBar >= 100) {
              startTimingBar('special')
            }
          }}
          disabled={gameOver || mySpecialBar < 100 || (showTimingBar && actionType !== 'special')}
        >
          <span className="btn-icon">✨</span>
          <span className="btn-text">SPECIAL</span>
          {mySpecialBar < 100 && (
            <span className="special-charge">({mySpecialBar}%)</span>
          )}
        </button>

        <button 
          className="action-btn defend-btn"
          onClick={handleDefend}
          disabled={gameOver || showTimingBar}
        >
          <span className="btn-icon">🛡️</span>
          <span className="btn-text">DEFEND</span>
        </button>
      </div>

      {/* Battle Log */}
      <div className="battle-log">
        <h3 className="log-title">Battle Log</h3>
        <div className="log-content">
          {battleLog.map((log) => (
            <div 
              key={log.id} 
              className="log-entry"
              style={{ color: log.color }}
            >
              {log.message}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2 className={`result-title ${winner === 'player' ? 'victory' : 'defeat'}`}>
              {winner === 'player' ? '🎉 VICTORY!' : '💀 DEFEAT!'}
            </h2>
            <p className="result-message">
              {winner === 'player' 
                ? `${myCharacter.name} has proven worthy in battle!` 
                : `${opponentCharacter.name} was too strong this time.`}
            </p>
            <div className="result-stats">
              <div className="stat">
                <span className="stat-label">Your HP:</span>
                <span className="stat-value">{myHealth}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Opponent HP:</span>
                <span className="stat-value">{opponentHealth}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Turns:</span>
                <span className="stat-value">{turn}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BattleArena
