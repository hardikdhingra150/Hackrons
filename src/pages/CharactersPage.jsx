import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/characters.css'

// Import character images
import cyberSamurai from '../assets/images/character/cyber-samurai.png'
import chronoKnight from '../assets/images/character/chrono-knight.png'
import voidMarine from '../assets/images/character/void-marine.png'

function CharactersPage({ account }) {
  const [claimedCharacter, setClaimedCharacter] = useState(null)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [selectedToClaim, setSelectedToClaim] = useState(null)

  const shortAddress = account && `${account.slice(0, 6)}...${account.slice(-4)}`

  // Load claimed character from localStorage
  useEffect(() => {
    const claimed = localStorage.getItem('claimedFreeCharacter')
    if (claimed) {
      setClaimedCharacter(JSON.parse(claimed))
    }
  }, [])

  const freeCharacters = [
    {
      id: 0,
      name: 'Cyber Samurai',
      attack: 85,
      defense: 70,
      speed: 75,
      health: 1000,
      special: 80,
      rarity: 'Common',
      description: 'A futuristic warrior wielding cyber-enhanced katanas',
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
      rarity: 'Common',
      description: 'A time-bending knight with powerful defensive abilities',
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
      rarity: 'Common',
      description: 'A space marine with devastating offensive capabilities',
      image: voidMarine,
    },
  ]

  const handleClaimClick = (character) => {
    if (claimedCharacter) {
      alert('You have already claimed your free character!')
      return
    }
    setSelectedToClaim(character)
    setShowClaimModal(true)
  }

  const confirmClaim = () => {
    if (!account) {
      alert('Please connect your wallet first!')
      setShowClaimModal(false)
      return
    }

    // Save claimed character
    localStorage.setItem('claimedFreeCharacter', JSON.stringify(selectedToClaim))
    setClaimedCharacter(selectedToClaim)
    setShowClaimModal(false)
    alert(`🎉 Success! You claimed ${selectedToClaim.name}!`)
  }

  return (
    <div className="characters-page">
      {/* Navbar */}
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

      {/* Hero Section */}
      <div className="characters-hero">
        <h1 className="characters-title">⚔️ Choose Your Champion</h1>
        <p className="characters-subtitle">
          Claim 1 FREE character to start your journey. Choose wisely!
        </p>
        {claimedCharacter && (
          <div className="claimed-banner">
            ✅ You claimed: <strong>{claimedCharacter.name}</strong>
          </div>
        )}
      </div>

      {/* Free Characters Section */}
      <div className="characters-section">
        <h2 className="section-title">🎁 Free Starter Characters</h2>
        <p className="section-subtitle">Claim ONE character for free to start playing</p>
        
        <div className="characters-grid">
          {freeCharacters.map((char) => (
            <div key={char.id} className={`character-card ${claimedCharacter?.id === char.id ? 'claimed' : ''}`}>
              <div className="card-header">
                <span className="rarity-badge common">{char.rarity}</span>
                {claimedCharacter?.id === char.id && (
                  <span className="owned-badge">✓ OWNED</span>
                )}
              </div>
              
              <div className="character-image-container">
                <img src={char.image} alt={char.name} className="character-image" />
              </div>
              
              <div className="character-info">
                <h3 className="character-name">{char.name}</h3>
                <p className="character-description">{char.description}</p>
                
                <div className="stats-container">
                  <div className="stat">
                    <span className="stat-icon">⚔️</span>
                    <span className="stat-label">ATK</span>
                    <span className="stat-value">{char.attack}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🛡️</span>
                    <span className="stat-label">DEF</span>
                    <span className="stat-value">{char.defense}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⚡</span>
                    <span className="stat-label">SPD</span>
                    <span className="stat-value">{char.speed}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">❤️</span>
                    <span className="stat-label">HP</span>
                    <span className="stat-value">{char.health}</span>
                  </div>
                </div>
                
                <button
                  className={`claim-btn ${claimedCharacter ? 'disabled' : ''}`}
                  onClick={() => handleClaimClick(char)}
                  disabled={claimedCharacter !== null}
                >
                  {claimedCharacter?.id === char.id ? '✓ Claimed' : 
                   claimedCharacter ? 'Already Claimed' : 
                   '🎁 Claim Free'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!claimedCharacter && (
          <div className="claim-info-box">
            <h3>📢 Important</h3>
            <ul>
              <li>You can claim <strong>ONE</strong> free character</li>
              <li>Choose carefully - this choice is permanent</li>
              <li>Want more characters? Visit the <Link to="/marketplace">Marketplace</Link></li>
            </ul>
          </div>
        )}
      </div>

      {/* Claim Confirmation Modal */}
      {showClaimModal && (
        <div className="modal-overlay" onClick={() => setShowClaimModal(false)}>
          <div className="claim-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Your Choice</h2>
            <div className="modal-character">
              <img src={selectedToClaim.image} alt={selectedToClaim.name} />
              <h3>{selectedToClaim.name}</h3>
            </div>
            <p className="modal-warning">
              ⚠️ You can only claim ONE free character. Are you sure you want to claim <strong>{selectedToClaim.name}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowClaimModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmClaim}>
                ✓ Confirm Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharactersPage
