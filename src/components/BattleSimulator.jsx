import { useState } from 'react'

const moves = [
  { name: 'Quick Strike', damage: [15, 25], icon: '⚔️', color: '#FF6A00' },
  { name: 'Power Attack', damage: [25, 40], icon: '💥', color: '#FF006E' },
  { name: 'Defend', damage: [0, 0], heal: [10, 20], icon: '🛡️', color: '#FFB000' },
  { name: 'Special Ability', damage: [40, 60], icon: '✨', color: '#FFD700' }
]

function BattleSimulator() {
  const [playerHP, setPlayerHP] = useState(100)
  const [enemyHP, setEnemyHP] = useState(100)
  const [battleLog, setBattleLog] = useState([])
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const handleMove = (move) => {
    if (gameOver || !playerTurn) return

    let log = []
    let newPlayerHP = playerHP
    let newEnemyHP = enemyHP

    // Player's move
    if (move.heal) {
      const heal = Math.floor(Math.random() * (move.heal[1] - move.heal[0] + 1)) + move.heal[0]
      newPlayerHP = Math.min(100, playerHP + heal)
      log.push(`${move.icon} You used ${move.name} and healed ${heal} HP!`)
    } else {
      const damage = Math.floor(Math.random() * (move.damage[1] - move.damage[0] + 1)) + move.damage[0]
      newEnemyHP -= damage
      log.push(`${move.icon} You used ${move.name} for ${damage} damage!`)
    }

    setPlayerHP(newPlayerHP)
    setEnemyHP(Math.max(0, newEnemyHP))

    if (newEnemyHP <= 0) {
      log.push('🎉 Victory! You defeated the enemy!')
      setGameOver(true)
    } else {
      // Enemy's turn
      setPlayerTurn(false)
      setTimeout(() => {
        const enemyMove = moves[Math.floor(Math.random() * 3)]
        const enemyDamage = Math.floor(Math.random() * (enemyMove.damage[1] - enemyMove.damage[0] + 1)) + enemyMove.damage[0]
        newPlayerHP -= enemyDamage
        log.push(`💀 Enemy used ${enemyMove.name} for ${enemyDamage} damage!`)
        
        setPlayerHP(Math.max(0, newPlayerHP))
        setBattleLog(prev => [...prev, ...log])
        
        if (newPlayerHP <= 0) {
          log.push('💀 Defeat! You were defeated...')
          setGameOver(true)
        }
        
        setPlayerTurn(true)
      }, 1500)
    }

    setBattleLog(prev => [...prev, ...log])
  }

  const resetBattle = () => {
    setPlayerHP(100)
    setEnemyHP(100)
    setBattleLog([])
    setPlayerTurn(true)
    setGameOver(false)
  }

  return (
    <section style={{
      position: 'relative',
      zIndex: 10,
      padding: '80px 60px',
      background: 'rgba(139, 0, 0, 0.2)'
    }}>
      <h2 style={{
        fontSize: '48px',
        fontWeight: 900,
        background: 'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '60px',
        textTransform: 'uppercase'
      }}>
        ⚔️ Battle Simulator
      </h2>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(10, 5, 8, 0.9)',
        padding: '40px',
        borderRadius: '20px',
        border: '2px solid #FFB000'
      }}>
        {/* Health Bars */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>⚔️</div>
            <div style={{ color: '#FFD700', fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>YOU</div>
            <div style={{
              width: '100%',
              height: '25px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '2px solid #FFB000'
            }}>
              <div style={{
                width: `${playerHP}%`,
                height: '100%',
                background: playerHP > 50 ? 'linear-gradient(90deg, #00FF00, #00CC00)' : playerHP > 20 ? 'linear-gradient(90deg, #FFB000, #FF6A00)' : 'linear-gradient(90deg, #FF0000, #CC0000)',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <div style={{ color: '#FFD700', marginTop: '10px', fontSize: '16px' }}>{playerHP}/100 HP</div>
          </div>

          <div style={{ padding: '0 40px', display: 'flex', alignItems: 'center' }}>
            <div style={{
              fontSize: '40px',
              color: '#FFD700',
              fontWeight: 'bold',
              animation: playerTurn && !gameOver ? 'pulse 1s infinite' : 'none'
            }}>
              VS
            </div>
          </div>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>👹</div>
            <div style={{ color: '#FF006E', fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>ENEMY</div>
            <div style={{
              width: '100%',
              height: '25px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '2px solid #FF006E'
            }}>
              <div style={{
                width: `${enemyHP}%`,
                height: '100%',
                background: enemyHP > 50 ? 'linear-gradient(90deg, #00FF00, #00CC00)' : enemyHP > 20 ? 'linear-gradient(90deg, #FFB000, #FF6A00)' : 'linear-gradient(90deg, #FF0000, #CC0000)',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <div style={{ color: '#FF006E', marginTop: '10px', fontSize: '16px' }}>{enemyHP}/100 HP</div>
          </div>
        </div>

        {/* Battle Moves */}
        {!gameOver && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {moves.map((move, i) => (
              <button
                key={i}
                onClick={() => handleMove(move)}
                disabled={!playerTurn}
                style={{
                  padding: '20px',
                  background: playerTurn ? `linear-gradient(135deg, ${move.color}40, ${move.color}20)` : 'rgba(100, 100, 100, 0.2)',
                  border: `2px solid ${playerTurn ? move.color : '#666'}`,
                  borderRadius: '15px',
                  color: playerTurn ? move.color : '#666',
                  fontWeight: 'bold',
                  cursor: playerTurn ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '24px' }}>{move.icon}</span>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div>{move.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    {move.heal ? `Heal: ${move.heal[0]}-${move.heal[1]}` : `DMG: ${move.damage[0]}-${move.damage[1]}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Battle Log */}
        <div style={{
          background: 'rgba(255, 176, 0, 0.05)',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 176, 0, 0.3)',
          maxHeight: '200px',
          overflowY: 'auto',
          marginBottom: gameOver ? '20px' : '0'
        }}>
          <div style={{ color: '#FFB000', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>
            Battle Log:
          </div>
          {battleLog.length === 0 ? (
            <div style={{ color: '#8B4513', fontSize: '12px' }}>Choose your move to start the battle...</div>
          ) : (
            battleLog.map((log, i) => (
              <div key={i} style={{
                color: log.includes('Victory') ? '#00FF00' : log.includes('Defeat') ? '#FF0000' : '#FFB000',
                marginBottom: '5px',
                fontSize: '13px'
              }}>
                {log}
              </div>
            ))
          )}
        </div>

        {/* Reset Button */}
        {gameOver && (
          <button
            onClick={resetBattle}
            style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #FF6A00, #FFB000)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ⚔️ Start New Battle
          </button>
        )}
      </div>
    </section>
  )
}

export default BattleSimulator
