import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Matchmaking from '../components/Matchmaking'
import Tournament from '../components/Tournament'
import { useStats } from '../context/StatsContext'
import '../styles/game.css'

// Import FREE character images
import cyberSamurai from '../assets/images/character/cyber-samurai.png'
import chronoKnight from '../assets/images/character/chrono-knight.png'
import voidMarine from '../assets/images/character/void-marine.png'

function GamePage({ account }) {
  const [activeMode, setActiveMode] = useState('menu')
  const [ownedCharacters, setOwnedCharacters] = useState([])
  const { stats } = useStats()

  const shortAddress = account && `${account.slice(0, 6)}...${account.slice(-4)}`

  // All available free characters
  const allFreeCharacters = [
    {
      id: 0,
      name: 'Cyber Samurai',
      attack: 85,
      defense: 70,
      speed: 75,
      health: 1000,
      special: 80,
      image: cyberSamurai,
    },
    {
      id: 1,
      name: 'Chrono Knight',
      attack: 75,
      defense: 85,
      speed: 70,
      health: 1200,
      special: 75,
      image: chronoKnight,
    },
    {
      id: 2,
      name: 'Void Marine',
      attack: 90,
      defense: 65,
      speed: 80,
      health: 950,
      special: 85,
      image: voidMarine,
    },
  ]

  // Load owned characters from localStorage
  useEffect(() => {
    loadOwnedCharacters()
  }, [])

  const loadOwnedCharacters = () => {
    let allOwned = []

    // 1. Load claimed free character
    const claimedCharacter = localStorage.getItem('claimedFreeCharacter')
    if (claimedCharacter) {
      try {
        const claimed = JSON.parse(claimedCharacter)
        const fullCharacterData = allFreeCharacters.find(c => c.id === claimed.id)
        if (fullCharacterData) {
          allOwned.push(fullCharacterData)
        }
      } catch (error) {
        console.error('Error loading claimed character:', error)
      }
    }

    // 2. Load purchased characters from marketplace
    const purchasedCharacters = localStorage.getItem('ownedCharacters')
    if (purchasedCharacters) {
      try {
        const purchased = JSON.parse(purchasedCharacters)
        if (Array.isArray(purchased)) {
          // Convert marketplace characters to game format
          const formattedPurchased = purchased.map(char => ({
            id: char.id || char.tokenId,
            name: char.name,
            attack: char.stats?.attack || 85,
            defense: char.stats?.defense || 70,
            speed: char.stats?.speed || 75,
            health: char.stats?.health || 1000,
            special: char.stats?.special || 80,
            image: char.image,
            rarity: char.rarity,
            class: char.class,
            isPurchased: true
          }))
          allOwned = [...allOwned, ...formattedPurchased]
        }
      } catch (error) {
        console.error('Error loading purchased characters:', error)
      }
    }

    setOwnedCharacters(allOwned)
  }

  // Show message if no characters owned
  const hasNoCharacters = ownedCharacters.length === 0

  if (activeMode === 'matchmaking') {
    return (
      <div>
        <nav className="main-navbar">
          <Link to="/" className="logo">⚡ HACKRONS</Link>
          <ul className="nav-links">
            <li><Link to="/characters">CHARACTERS</Link></li>
            <li><Link to="/mint">MINT</Link></li>
            <li><Link to="/marketplace">MARKETPLACE</Link></li>
            <li><Link to="/game">GAME</Link></li>
            <li><Link to="/leaderboard">LEADERBOARD</Link></li>
            <li><Link to="/faq" className="faq-nav-link">FAQ & RULES</Link></li>
          </ul>
          <button className="connect-button">
            {shortAddress || 'Connect Wallet'}
          </button>
        </nav>
        
        <Matchmaking 
          account={account} 
          ownedCharacters={ownedCharacters}
          onBack={() => setActiveMode('menu')}
        />
      </div>
    )
  }

  if (activeMode === 'tournament') {
    return (
      <div>
        <nav className="main-navbar">
          <Link to="/" className="logo">⚡ HACKRONS</Link>
          <ul className="nav-links">
            <li><Link to="/characters">CHARACTERS</Link></li>
            <li><Link to="/mint">MINT</Link></li>
            <li><Link to="/marketplace">MARKETPLACE</Link></li>
            <li><Link to="/game">GAME</Link></li>
            <li><Link to="/leaderboard">LEADERBOARD</Link></li>
            <li><Link to="/faq" className="faq-nav-link">FAQ & RULES</Link></li>
          </ul>
          <button className="connect-button">
            {shortAddress || 'Connect Wallet'}
          </button>
        </nav>
        
        <Tournament 
          account={account} 
          ownedCharacters={ownedCharacters}
          onBack={() => setActiveMode('menu')}
        />
      </div>
    )
  }

  const handleModeClick = (mode) => {
    if (hasNoCharacters) {
      alert('⚠️ You need at least one character to play!\n\nGet started:\n• Claim 1 FREE character from the Characters page\n• Or buy characters from the Marketplace')
      return
    }
    setActiveMode(mode)
  }

  return (
    <div className="game-page">
      <nav className="main-navbar">
        <Link to="/" className="logo">⚡ HACKRONS</Link>
        <ul className="nav-links">
          <li><Link to="/characters">CHARACTERS</Link></li>
          <li><Link to="/mint">MINT</Link></li>
          <li><Link to="/marketplace">MARKETPLACE</Link></li>
          <li><Link to="/game">GAME</Link></li>
          <li><Link to="/leaderboard">LEADERBOARD</Link></li>
          <li><Link to="/faq" className="faq-nav-link">FAQ & RULES</Link></li>
        </ul>
        <button className="connect-button">
          {shortAddress || 'Connect Wallet'}
        </button>
      </nav>

      <div className="game-menu-container">
        <h1 className="game-title">⚔️ Battle Arena</h1>
        <p className="game-subtitle">Choose your game mode and prove your worth</p>

        {/* No Characters Warning */}
        {hasNoCharacters && (
          <div className="no-characters-warning">
            <div className="warning-icon">⚠️</div>
            <h3>No Characters Available</h3>
            <p>You need at least one character to start playing!</p>
            <div className="warning-actions">
              <Link to="/characters" className="warning-btn primary">
                🎁 Claim Free Character
              </Link>
              <Link to="/marketplace" className="warning-btn secondary">
                🛒 Buy from Marketplace
              </Link>
            </div>
          </div>
        )}

        {/* Character Collection Preview */}
        {!hasNoCharacters && (
          <div className="owned-characters-preview">
            <h3>Your Arsenal ({ownedCharacters.length} {ownedCharacters.length === 1 ? 'Character' : 'Characters'})</h3>
            <div className="characters-preview-grid">
              {ownedCharacters.map((char) => (
                <div key={char.id} className="preview-character-card">
                  <img src={char.image} alt={char.name} />
                  <span className="preview-name">{char.name}</span>
                  {char.isPurchased && <span className="purchased-badge">💎</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="game-modes-grid">
          <div 
            className={`game-mode-card ${hasNoCharacters ? 'disabled' : ''}`} 
            onClick={() => handleModeClick('matchmaking')}
          >
            <div className="mode-icon">⚔️</div>
            <h2>Quick Match</h2>
            <p>Jump into a fast-paced 1v1 battle against AI opponents</p>
            <div className="mode-stats">
              <span>🎮 PvE</span>
              <span>⏱️ 5-10 min</span>
              <span>💰 Rewards</span>
            </div>
            <button className="mode-play-btn" disabled={hasNoCharacters}>
              Play Now
            </button>
          </div>

          <div 
            className={`game-mode-card ${hasNoCharacters ? 'disabled' : ''}`}
            onClick={() => handleModeClick('matchmaking')}
          >
            <div className="mode-icon">🏆</div>
            <h2>Ranked Match</h2>
            <p>Compete for leaderboard positions and climb the ranks</p>
            <div className="mode-stats">
              <span>📊 Ranked</span>
              <span>⏱️ 5-10 min</span>
              <span>⭐ ELO Points</span>
            </div>
            <button className="mode-play-btn" disabled={hasNoCharacters}>
              Enter Ranked
            </button>
          </div>

          <div 
            className={`game-mode-card ${hasNoCharacters ? 'disabled' : ''}`}
            onClick={() => handleModeClick('tournament')}
          >
            <div className="mode-icon">🎯</div>
            <h2>Tournaments</h2>
            <p>Join epic multi-round tournaments and win huge prizes</p>
            <div className="mode-stats">
              <span>👥 Multi-player</span>
              <span>⏱️ 1-2 hours</span>
              <span>💎 Big Prizes</span>
            </div>
            <button className="mode-play-btn" disabled={hasNoCharacters}>
              View Tournaments
            </button>
          </div>

          <div 
            className={`game-mode-card ${hasNoCharacters ? 'disabled' : ''}`}
          >
            <div className="mode-icon">🎓</div>
            <h2>Practice Mode</h2>
            <p>Train your skills against dummy opponents</p>
            <div className="mode-stats">
              <span>🤖 Training</span>
              <span>⏱️ Unlimited</span>
              <span>📚 Learn</span>
            </div>
            <button 
              className="mode-play-btn" 
              onClick={() => handleModeClick('matchmaking')}
              disabled={hasNoCharacters}
            >
              Start Training
            </button>
          </div>

          <div className="game-mode-card coming-soon">
            <div className="mode-icon">⚔️</div>
            <h2>Guild Wars</h2>
            <p>Battle with your guild members against other guilds</p>
            <div className="mode-stats">
              <span>👥 Team</span>
              <span>⏱️ Weekly</span>
              <span>🏆 Guild Glory</span>
            </div>
            <button className="mode-play-btn" disabled>Coming Soon</button>
            <div className="coming-soon-badge">SOON</div>
          </div>

          <div className="game-mode-card coming-soon">
            <div className="mode-icon">👹</div>
            <h2>Boss Raids</h2>
            <p>Team up to defeat powerful raid bosses</p>
            <div className="mode-stats">
              <span>👥 Co-op</span>
              <span>⏱️ 15-30 min</span>
              <span>💰 Epic Loot</span>
            </div>
            <button className="mode-play-btn" disabled>Coming Soon</button>
            <div className="coming-soon-badge">SOON</div>
          </div>
        </div>

        {/* Player Stats */}
        <div className="player-stats-card">
          <h3>Your Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.totalBattles}</div>
              <div className="stat-label">Total Battles</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.wins}</div>
              <div className="stat-label">Wins</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.winRate}%</div>
              <div className="stat-label">Win Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.level}</div>
              <div className="stat-label">Level</div>
            </div>
          </div>
          
          <div className="xp-progress-container">
            <div className="xp-label">
              <span>XP: {stats.xp} / {stats.xpToNextLevel}</span>
            </div>
            <div className="xp-progress-bar">
              <div 
                className="xp-progress-fill"
                style={{ width: `${(stats.xp % 100) / (stats.xpToNextLevel / stats.level) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
