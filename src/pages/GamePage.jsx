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

  // Load owned character from localStorage
  useEffect(() => {
    const claimedCharacter = localStorage.getItem('claimedFreeCharacter')
    if (claimedCharacter) {
      const claimed = JSON.parse(claimedCharacter)
      // Find the full character data
      const fullCharacterData = allFreeCharacters.find(c => c.id === claimed.id)
      if (fullCharacterData) {
        setOwnedCharacters([fullCharacterData])
      }
    }
  }, [])

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

        <div className="game-modes-grid">
          <div className="game-mode-card" onClick={() => setActiveMode('matchmaking')}>
            <div className="mode-icon">⚔️</div>
            <h2>Quick Match</h2>
            <p>Jump into a fast-paced 1v1 battle against AI opponents</p>
            <div className="mode-stats">
              <span>🎮 PvE</span>
              <span>⏱️ 5-10 min</span>
              <span>💰 Rewards</span>
            </div>
            <button className="mode-play-btn">Play Now</button>
          </div>

          <div className="game-mode-card" onClick={() => setActiveMode('matchmaking')}>
            <div className="mode-icon">🏆</div>
            <h2>Ranked Match</h2>
            <p>Compete for leaderboard positions and climb the ranks</p>
            <div className="mode-stats">
              <span>📊 Ranked</span>
              <span>⏱️ 5-10 min</span>
              <span>⭐ ELO Points</span>
            </div>
            <button className="mode-play-btn">Enter Ranked</button>
          </div>

          <div className="game-mode-card" onClick={() => setActiveMode('tournament')}>
            <div className="mode-icon">🎯</div>
            <h2>Tournaments</h2>
            <p>Join epic multi-round tournaments and win huge prizes</p>
            <div className="mode-stats">
              <span>👥 Multi-player</span>
              <span>⏱️ 1-2 hours</span>
              <span>💎 Big Prizes</span>
            </div>
            <button className="mode-play-btn">View Tournaments</button>
          </div>

          <div className="game-mode-card">
            <div className="mode-icon">🎓</div>
            <h2>Practice Mode</h2>
            <p>Train your skills against dummy opponents</p>
            <div className="mode-stats">
              <span>🤖 Training</span>
              <span>⏱️ Unlimited</span>
              <span>📚 Learn</span>
            </div>
            <button className="mode-play-btn" onClick={() => setActiveMode('matchmaking')}>
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
