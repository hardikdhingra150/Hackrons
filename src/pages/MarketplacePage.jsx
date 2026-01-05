import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from '../components/TiltCard'
import TokenPriceChart from '../components/TokenPriceChart'
import { useStats } from '../context/StatsContext' // ← ADD THIS IMPORT
import '../styles/landing.css'
import '../styles/components.css'
import '../styles/marketplace.css'

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

const allNfts = [
  {
    id: 1,
    name: 'Genesis Samurai',
    class: 'Samurai',
    price: '2.5',
    rarity: 'Legendary',
    image: character1,
    color: '#FF006E',
    icon: '⚔️',
    description: 'The original warrior from Ancient Japan',
    stats: { attack: 95, defense: 70, speed: 85, health: 100 },
    abilities: ['Shadow Strike', 'Blade Storm', 'Time Slash'],
    unlockRequirements: {
      battlesWon: 50,
      level: 10,
      polRequired: 2.5,
      achievement: 'Master Warrior'
    }
  },
  {
    id: 2,
    name: 'Royal Knight',
    class: 'Knight',
    price: '1.5',
    rarity: 'Epic',
    image: character2,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Noble defender from Medieval Europe',
    stats: { attack: 75, defense: 95, speed: 60, health: 120 },
    abilities: ['Shield Bash', 'Divine Protection', 'Holy Strike'],
    unlockRequirements: {
      battlesWon: 25,
      level: 7,
      polRequired: 1.5,
      achievement: 'Knight Commander'
    }
  },
  {
    id: 3,
    name: 'Void Marine',
    class: 'Marine',
    price: '1.0',
    rarity: 'Rare',
    image: character3,
    color: '#FF6A00',
    icon: '🚀',
    description: 'Elite soldier from Future Mars',
    stats: { attack: 85, defense: 65, speed: 90, health: 90 },
    abilities: ['Plasma Blast', 'Jetpack Boost', 'Energy Shield'],
    unlockRequirements: {
      battlesWon: 15,
      level: 5,
      polRequired: 1.0,
      achievement: 'Space Warrior'
    }
  },
  {
    id: 4,
    name: 'Shadow Samurai',
    class: 'Samurai',
    price: '2.0',
    rarity: 'Epic',
    image: character4,
    color: '#FF006E',
    icon: '⚔️',
    description: 'Master of stealth from Ancient Japan',
    stats: { attack: 90, defense: 65, speed: 95, health: 85 },
    abilities: ['Silent Strike', 'Smoke Bomb', 'Critical Slash'],
    unlockRequirements: {
      battlesWon: 30,
      level: 8,
      polRequired: 2.0,
      achievement: 'Shadow Master'
    }
  },
  {
    id: 5,
    name: 'Chrono Guardian',
    class: 'Knight',
    price: '1.2',
    rarity: 'Rare',
    image: character5,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Time-bending protector from Medieval Europe',
    stats: { attack: 70, defense: 85, speed: 65, health: 100 },
    abilities: ['Time Shield', 'Rewind', 'Temporal Strike'],
    unlockRequirements: {
      battlesWon: 20,
      level: 6,
      polRequired: 1.2,
      achievement: 'Time Guardian'
    }
  },
  {
    id: 6,
    name: 'Void Assassin',
    class: 'Marine',
    price: '1.8',
    rarity: 'Epic',
    image: character6,
    color: '#FF6A00',
    icon: '🚀',
    description: 'Stealth operative from Future Mars',
    stats: { attack: 88, defense: 60, speed: 92, health: 80 },
    abilities: ['Cloak', 'Void Step', 'Sniper Shot'],
    unlockRequirements: {
      battlesWon: 28,
      level: 8,
      polRequired: 1.8,
      achievement: 'Elite Operative'
    }
  },
  {
    id: 7,
    name: 'Shadow Blade',
    class: 'Samurai',
    price: '1.4',
    rarity: 'Rare',
    image: character7,
    color: '#FF006E',
    icon: '🗡️',
    description: 'Swift blade master from Ancient Japan',
    stats: { attack: 82, defense: 68, speed: 88, health: 85 },
    abilities: ['Dual Strike', 'Flash Step', 'Counter'],
    unlockRequirements: {
      battlesWon: 22,
      level: 6,
      polRequired: 1.4,
      achievement: 'Blade Master'
    }
  },
  {
    id: 8,
    name: 'Archer Knight',
    class: 'Knight',
    price: '1.1',
    rarity: 'Rare',
    image: character8,
    color: '#FFB000',
    icon: '🏹',
    description: 'Long-range defender from Medieval Europe',
    stats: { attack: 78, defense: 75, speed: 70, health: 90 },
    abilities: ['Arrow Rain', 'Piercing Shot', 'Eagle Eye'],
    unlockRequirements: {
      battlesWon: 18,
      level: 5,
      polRequired: 1.1,
      achievement: 'Marksman'
    }
  },
  {
    id: 9,
    name: 'Holy Paladin',
    class: 'Knight',
    price: '2.2',
    rarity: 'Epic',
    image: character9,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Blessed warrior from Medieval Europe',
    stats: { attack: 80, defense: 92, speed: 62, health: 115 },
    abilities: ['Divine Smite', 'Blessing', 'Healing Light'],
    unlockRequirements: {
      battlesWon: 35,
      level: 9,
      polRequired: 2.2,
      achievement: 'Holy Champion'
    }
  },
  {
    id: 10,
    name: 'Quantum Warrior',
    class: 'Marine',
    price: '3.0',
    rarity: 'Legendary',
    image: character10,
    color: '#FF6A00',
    icon: '💠',
    description: 'Reality-bending soldier from Future Mars',
    stats: { attack: 92, defense: 75, speed: 88, health: 105 },
    abilities: ['Quantum Leap', 'Phase Shift', 'Particle Beam'],
    unlockRequirements: {
      battlesWon: 60,
      level: 12,
      polRequired: 3.0,
      achievement: 'Quantum Legend'
    }
  },
  {
    id: 11,
    name: 'Rogue Ninja',
    class: 'Samurai',
    price: '1.3',
    rarity: 'Rare',
    image: character11,
    color: '#FF006E',
    icon: '🗡️',
    description: 'Agile infiltrator from Ancient Japan',
    stats: { attack: 80, defense: 62, speed: 93, health: 75 },
    abilities: ['Backstab', 'Vanish', 'Poison Blade'],
    unlockRequirements: {
      battlesWon: 20,
      level: 6,
      polRequired: 1.3,
      achievement: 'Silent Death'
    }
  },
  {
    id: 12,
    name: 'Sentinel Knight',
    class: 'Knight',
    price: '1.6',
    rarity: 'Epic',
    image: character12,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Unwavering guardian from Medieval Europe',
    stats: { attack: 72, defense: 98, speed: 58, health: 125 },
    abilities: ['Fortress', 'Taunt', 'Iron Wall'],
    unlockRequirements: {
      battlesWon: 26,
      level: 7,
      polRequired: 1.6,
      achievement: 'Unbreakable'
    }
  },
  {
    id: 13,
    name: 'Blaze Samurai',
    class: 'Samurai',
    price: '1.4',
    rarity: 'Rare',
    image: character13,
    color: '#FF006E',
    icon: '🔥',
    description: 'Fire-wielding warrior from Ancient Japan',
    stats: { attack: 87, defense: 66, speed: 82, health: 88 },
    abilities: ['Flame Slash', 'Inferno', 'Burning Spirit'],
    unlockRequirements: {
      battlesWon: 23,
      level: 6,
      polRequired: 1.4,
      achievement: 'Flame Warrior'
    }
  },
  {
    id: 14,
    name: 'Nebula Marine',
    class: 'Marine',
    price: '3.5',
    rarity: 'Legendary',
    image: character14,
    color: '#FF6A00',
    icon: '🌌',
    description: 'Cosmic warrior from Future Mars',
    stats: { attack: 94, defense: 78, speed: 86, health: 110 },
    abilities: ['Star Burst', 'Gravity Well', 'Cosmic Shield'],
    unlockRequirements: {
      battlesWon: 70,
      level: 15,
      polRequired: 3.5,
      achievement: 'Cosmic Emperor'
    }
  },
  {
    id: 15,
    name: 'Titan Knight',
    class: 'Knight',
    price: '2.8',
    rarity: 'Epic',
    image: character15,
    color: '#FFB000',
    icon: '🗿',
    description: 'Colossal defender from Medieval Europe',
    stats: { attack: 88, defense: 100, speed: 55, health: 130 },
    abilities: ['Earthquake', 'Titan Smash', 'Immovable'],
    unlockRequirements: {
      battlesWon: 45,
      level: 10,
      polRequired: 2.8,
      achievement: 'Titan Lord'
    }
  },
  {
    id: 16,
    name: 'Cyber Ronin',
    class: 'Samurai',
    price: '1.5',
    rarity: 'Rare',
    image: character16,
    color: '#FF006E',
    icon: '🤖',
    description: 'Tech-enhanced samurai from Ancient Japan',
    stats: { attack: 84, defense: 70, speed: 87, health: 82 },
    abilities: ['Cyber Slash', 'EMP Strike', 'Data Hack'],
    unlockRequirements: {
      battlesWon: 24,
      level: 7,
      polRequired: 1.5,
      achievement: 'Cyber Samurai'
    }
  },
  {
    id: 17,
    name: 'Phantom Marine',
    class: 'Marine',
    price: '1.6',
    rarity: 'Epic',
    image: character17,
    color: '#FF6A00',
    icon: '👻',
    description: 'Ghost soldier from Future Mars',
    stats: { attack: 86, defense: 63, speed: 91, health: 78 },
    abilities: ['Phantom Strike', 'Invisibility', 'Spectral Shift'],
    unlockRequirements: {
      battlesWon: 27,
      level: 7,
      polRequired: 1.6,
      achievement: 'Ghost Soldier'
    }
  },
  {
    id: 18,
    name: 'Meteor Knight',
    class: 'Knight',
    price: '1.3',
    rarity: 'Rare',
    image: character18,
    color: '#FFB000',
    icon: '☄️',
    description: 'Sky warrior from Medieval Europe',
    stats: { attack: 76, defense: 82, speed: 68, health: 95 },
    abilities: ['Meteor Strike', 'Sky Charge', 'Impact Shield'],
    unlockRequirements: {
      battlesWon: 21,
      level: 6,
      polRequired: 1.3,
      achievement: 'Sky Lord'
    }
  }
]

function MarketplacePage({ account }) {
  const [showFull, setShowFull] = useState(false)
  const [buyingId, setBuyingId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [purchasedNft, setPurchasedNft] = useState(null)
  const [filterRarity, setFilterRarity] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [sortBy, setSortBy] = useState('price-low')
  const [ownedCharacterIds, setOwnedCharacterIds] = useState([])

  // ← ADD THIS: Get stats and deductPol from context
  const { stats, deductPol } = useStats()

  const shortAddress = account && `${account.slice(0, 6)}...${account.slice(-4)}`

  // ← ADD THIS FUNCTION: Check if character can be unlocked
  const canUnlockCharacter = (character) => {
    if (!character.unlockRequirements) return { canUnlock: true }
    
    const req = character.unlockRequirements
    const playerPol = parseFloat(stats.polBalance || 0)
    
    return {
      canUnlock: stats.wins >= req.battlesWon && 
                 stats.level >= req.level && 
                 playerPol >= req.polRequired,
      battlesNeeded: Math.max(0, req.battlesWon - stats.wins),
      levelNeeded: Math.max(0, req.level - stats.level),
      polNeeded: Math.max(0, req.polRequired - playerPol)
    }
  }

  useEffect(() => {
    loadOwnedCharacters()
  }, [])

  const loadOwnedCharacters = () => {
    const owned = JSON.parse(localStorage.getItem('ownedCharacters') || '[]')
    const ids = owned.map(char => char.id)
    setOwnedCharacterIds(ids)
  }

  const isCharacterOwned = (characterId) => {
    return ownedCharacterIds.includes(characterId)
  }

  const filteredNfts = allNfts
    .filter(nft => filterRarity === 'all' || nft.rarity.toLowerCase() === filterRarity)
    .filter(nft => filterClass === 'all' || nft.class.toLowerCase() === filterClass)
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rarity':
          const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 }
          return rarityOrder[b.rarity] - rarityOrder[a.rarity]
        default:
          return 0
      }
    })

  const visibleNfts = showFull ? filteredNfts : filteredNfts.slice(0, 6)

  // ← UPDATE THIS FUNCTION
  const handleBuyClick = (nft) => {
    if (isCharacterOwned(nft.id)) {
      alert('⚠️ You already own this character!\n\nCheck your collection in the Game page.')
      return
    }

    // Check unlock requirements
    const unlockStatus = canUnlockCharacter(nft)
    
    if (!unlockStatus.canUnlock) {
      let message = '🔒 CHARACTER LOCKED!\n\nRequirements to unlock:\n\n'
      
      if (unlockStatus.battlesNeeded > 0) {
        message += `⚔️ Win ${unlockStatus.battlesNeeded} more battles\n`
      }
      
      if (unlockStatus.levelNeeded > 0) {
        message += `📈 Reach Level ${nft.unlockRequirements.level}\n`
      }
      
      if (unlockStatus.polNeeded > 0) {
        message += `💰 Earn ${unlockStatus.polNeeded.toFixed(2)} more POL\n`
      }
      
      message += `\n🎯 Achievement: ${nft.unlockRequirements.achievement}`
      
      alert(message)
      return
    }

    setSelectedNft(nft)
    setShowModal(true)
  }
  
  // ← UPDATE THIS FUNCTION
  const confirmPurchase = async () => {
    if (!account) {
      alert('⚠️ Please connect your wallet first!\n\nClick the "Connect Wallet" button at the top right.')
      return
    }

    if (isCharacterOwned(selectedNft.id)) {
      alert('⚠️ You already own this character!')
      setShowModal(false)
      return
    }

    // Check requirements again
    const unlockStatus = canUnlockCharacter(selectedNft)
    if (!unlockStatus.canUnlock) {
      alert('❌ You don\'t meet the requirements!')
      setShowModal(false)
      return
    }

    setBuyingId(selectedNft.id)
    setShowModal(false)

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to purchase characters!')
      }

      alert(`💰 Processing payment of ${selectedNft.price} POL...\n\n⏳ Please wait while we process your transaction.`)

      await mockPurchase(selectedNft)
      
      // Deduct POL from balance
      deductPol(parseFloat(selectedNft.price))
      
      const ownedCharacters = JSON.parse(localStorage.getItem('ownedCharacters') || '[]')
      const newCharacter = {
        ...selectedNft,
        tokenId: selectedNft.id,
        purchasedAt: new Date().toISOString(),
        owner: account,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`
      }
      ownedCharacters.push(newCharacter)
      localStorage.setItem('ownedCharacters', JSON.stringify(ownedCharacters))

      loadOwnedCharacters()
      setPurchasedNft(selectedNft)
      setShowSuccessModal(true)
      setBuyingId(null)

    } catch (error) {
      console.error('Purchase failed:', error)
      
      let errorMessage = '❌ Purchase Failed\n\n'
      
      if (error.message.includes('MetaMask')) {
        errorMessage += 'Please install MetaMask browser extension to continue.'
      } else if (error.message.includes('insufficient funds')) {
        errorMessage += `You don't have enough POL in your wallet.\n\nRequired: ${selectedNft.price} POL`
      } else if (error.message.includes('rejected')) {
        errorMessage += 'You cancelled the transaction.'
      } else {
        errorMessage += error.message || 'Please try again later.'
      }
      
      alert(errorMessage)
      setBuyingId(null)
    }
  }
  
  const mockPurchase = (nft) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve()
        } else {
          reject(new Error('Transaction failed. Please try again.'))
        }
      }, 3000)
    })
  }

  return (
    <div>
      <nav>
        <Link to="/" className="logo">⚡ HACKRONS</Link>
        <ul className="nav-links">
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/mint">Mint</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/faq">FAQ & RULES</Link></li>
        </ul>
        <button className="connect-button">
          {shortAddress || 'Connect Wallet'}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', paddingTop: '40px' }}>
        <section className="nft-gallery">
          <h2 className="gallery-title">
            {showFull ? '🛒 Full Marketplace' : '⭐ Featured NFTs'}
          </h2>
          <p className="gallery-subtitle">
            {showFull
              ? 'Browse the complete arsenal of Hackrons warriors'
              : 'Explore rare warriors from across time'}
          </p>

          {/* ← ADD THIS: Show POL Balance */}
          <div className="marketplace-pol-display">
            <span className="pol-icon">💰</span>
            <span className="pol-amount">{stats.polBalance.toFixed(2)} POL</span>
            <span className="pol-label">Your Balance</span>
            <span className="pol-hint">Win battles to earn more POL!</span>
          </div>

          {ownedCharacterIds.length > 0 && (
            <div className="owned-count-banner">
              <span>💎 You own {ownedCharacterIds.length} character{ownedCharacterIds.length > 1 ? 's' : ''}</span>
              <Link to="/game" className="view-collection-link">View Collection →</Link>
            </div>
          )}

          {showFull && (
            <div className="marketplace-filters">
              <div className="filter-group">
                <label>Rarity:</label>
                <select value={filterRarity} onChange={(e) => setFilterRarity(e.target.value)}>
                  <option value="all">All</option>
                  <option value="legendary">Legendary</option>
                  <option value="epic">Epic</option>
                  <option value="rare">Rare</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Class:</label>
                <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                  <option value="all">All</option>
                  <option value="samurai">Samurai</option>
                  <option value="knight">Knight</option>
                  <option value="marine">Marine</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Sort:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="rarity">Rarity</option>
                </select>
              </div>

              <div className="results-count">
                {filteredNfts.length} characters available
              </div>
            </div>
          )}

          <div className="nft-grid">
            {visibleNfts.map((nft) => {
              const unlockStatus = canUnlockCharacter(nft) // ← ADD THIS
              
              return (
                <TiltCard key={nft.id} maxTilt={15}>
                  <div className={`nft-card ${isCharacterOwned(nft.id) ? 'owned' : ''}`}>
                    <div className="nft-image">
                      <img src={nft.image} alt={nft.name} />
                      <span className={`nft-rarity ${nft.rarity.toLowerCase()}`}>
                        {nft.rarity}
                      </span>
                      {isCharacterOwned(nft.id) && (
                        <div className="owned-badge">✓ OWNED</div>
                      )}
                      {/* ← ADD THIS: Lock badge */}
                      {!isCharacterOwned(nft.id) && !unlockStatus.canUnlock && (
                        <div className="lock-badge">🔒 LOCKED</div>
                      )}
                    </div>
                    <div className="nft-info">
                      <h3 className="nft-name" style={{ color: nft.color }}>
                        {nft.icon} {nft.name}
                      </h3>
                      <p className="nft-class">{nft.class}</p>
                      
                      {showFull && (
                        <>
                          <p className="nft-description">{nft.description}</p>
                          
                          {/* ← ADD THIS: Requirements box */}
                          {nft.unlockRequirements && (
                            <div className="requirements-box">
                              <div className="req-title">🎯 Requirements:</div>
                              <div className="req-item">
                                <span>⚔️ Wins:</span>
                                <span className={stats.wins >= nft.unlockRequirements.battlesWon ? 'met' : 'not-met'}>
                                  {stats.wins}/{nft.unlockRequirements.battlesWon}
                                </span>
                              </div>
                              <div className="req-item">
                                <span>📈 Level:</span>
                                <span className={stats.level >= nft.unlockRequirements.level ? 'met' : 'not-met'}>
                                  {stats.level}/{nft.unlockRequirements.level}
                                </span>
                              </div>
                              <div className="req-item">
                                <span>💰 POL:</span>
                                <span className={stats.polBalance >= nft.unlockRequirements.polRequired ? 'met' : 'not-met'}>
                                  {stats.polBalance.toFixed(2)}/{nft.unlockRequirements.polRequired}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <div className="nft-price">
                        <span className="price-label">Price:</span>
                        <span className="price-value">
                          <span className="crypto-icon">Ⓜ</span>
                          {nft.price} POL
                        </span>
                      </div>
                      
                      {/* ← UPDATE THIS: Button logic */}
                      <button 
                        className="nft-buy-btn"
                        onClick={() => handleBuyClick(nft)}
                        disabled={
                          buyingId === nft.id || 
                          isCharacterOwned(nft.id) ||
                          !unlockStatus.canUnlock
                        }
                      >
                        {isCharacterOwned(nft.id) ? (
                          <>✓ Owned</>
                        ) : !unlockStatus.canUnlock ? (
                          <>🔒 Locked</>
                        ) : buyingId === nft.id ? (
                          <>
                            <span className="spinner"></span>
                            Processing...
                          </>
                        ) : (
                          <>🛒 Buy Now</>
                        )}
                      </button>
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </div>

          {!showFull && (
            <button
              type="button"
              className="gallery-more-btn"
              onClick={() => setShowFull(true)}
            >
              View Full Marketplace →
            </button>
          )}
        </section>

        {showFull && <TokenPriceChart />}
      </div>

      {/* Modals remain the same */}
      {showModal && selectedNft && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Purchase</h2>
            <img src={selectedNft.image} alt={selectedNft.name} className="modal-image" />
            <h3 style={{ color: selectedNft.color }}>{selectedNft.name}</h3>
            <p className="modal-description">{selectedNft.description}</p>
            
            <div className="modal-stats">
              <div className="stat-row">
                <span>⚔️ Attack:</span>
                <span>{selectedNft.stats.attack}</span>
              </div>
              <div className="stat-row">
                <span>🛡️ Defense:</span>
                <span>{selectedNft.stats.defense}</span>
              </div>
              <div className="stat-row">
                <span>⚡ Speed:</span>
                <span>{selectedNft.stats.speed}</span>
              </div>
              <div className="stat-row">
                <span>❤️ Health:</span>
                <span>{selectedNft.stats.health}</span>
              </div>
            </div>

            <div className="modal-price">
              <span className="price-label">Total Price:</span>
              <span className="price-value">
                <span className="crypto-icon">Ⓜ</span>
                {selectedNft.price} POL
              </span>
            </div>

            <div className="modal-info">
              ⚠️ This will deduct {selectedNft.price} POL from your balance
            </div>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmPurchase}>
                ✓ Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && purchasedNft && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">🎉</div>
            <h2>Purchase Successful!</h2>
            
            <img src={purchasedNft.image} alt={purchasedNft.name} />
            
            <h3 style={{ color: purchasedNft.color }}>
              {purchasedNft.icon} {purchasedNft.name}
            </h3>
            
            <p>Congratulations! You now own this legendary warrior!</p>
            
            <div className="transaction-details">
              <div className="detail-row">
                <span className="detail-label">Character Class:</span>
                <span className="detail-value">{purchasedNft.class}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Rarity:</span>
                <span className="detail-value">{purchasedNft.rarity}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Purchase Time:</span>
                <span className="detail-value">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="modal-price">
              <div className="price-label" style={{ fontSize: '14px', marginBottom: '10px', color: 'rgba(255,255,255,0.6)' }}>
                Amount Paid
              </div>
              <div className="price-value">
                <span className="crypto-icon">Ⓜ</span>
                {purchasedNft.price} POL
              </div>
            </div>

            <div className="modal-buttons">
              <Link to="/game" className="play-button">
                ⚔️ Play Now
              </Link>
              <button className="close-button" onClick={() => {
                setShowSuccessModal(false)
                loadOwnedCharacters()
              }}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketplacePage
