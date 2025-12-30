// src/pages/MarketplacePage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from '../components/TiltCard'
import TokenPriceChart from '../components/TokenPriceChart'
import '../styles/landing.css'
import '../styles/components.css'
import cyberSamurai from '../assets/images/character/cyber-samurai.png'
import chronoKnight from '../assets/images/character/chrono-knight.png'
import voidMarine from '../assets/images/character/void-marine.png'

const allNfts = [
  {
    id: 1,
    name: 'Genesis Samurai',
    class: 'Samurai',
    price: '0.5 POL',
    rarity: 'Legendary',
    image: cyberSamurai,
    color: '#FF006E',
    icon: '⚔️',
    description: 'The original warrior from Ancient Japan',
    stats: {
      attack: 95,
      defense: 70,
      speed: 85,
      health: 100
    },
    abilities: ['Shadow Strike', 'Blade Storm', 'Time Slash']
  },
  {
    id: 2,
    name: 'Royal Knight',
    class: 'Knight',
    price: '0.3 POL',
    rarity: 'Epic',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Noble defender from Medieval Europe',
    stats: {
      attack: 75,
      defense: 95,
      speed: 60,
      health: 120
    },
    abilities: ['Shield Bash', 'Divine Protection', 'Holy Strike']
  },
  {
    id: 3,
    name: 'Void Marine',
    class: 'Marine',
    price: '0.2 POL',
    rarity: 'Rare',
    image: voidMarine,
    color: '#FF6A00',
    icon: '🚀',
    description: 'Elite soldier from Future Mars',
    stats: {
      attack: 85,
      defense: 65,
      speed: 90,
      health: 90
    },
    abilities: ['Plasma Blast', 'Jetpack Boost', 'Energy Shield']
  },
  {
    id: 4,
    name: 'Shadow Samurai',
    class: 'Samurai',
    price: '0.4 POL',
    rarity: 'Epic',
    image: cyberSamurai, // reuse or add shadow-samurai.png
    color: '#FF006E',
    icon: '⚔️',
    description: 'Master of stealth from Ancient Japan',
    stats: {
      attack: 90,
      defense: 65,
      speed: 95,
      health: 85
    },
    abilities: ['Silent Strike', 'Smoke Bomb', 'Critical Slash']
  },
  {
    id: 5,
    name: 'Chrono Guardian',
    class: 'Knight',
    price: '0.25 POL',
    rarity: 'Rare',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Time-bending protector from Medieval Europe',
    stats: {
      attack: 70,
      defense: 85,
      speed: 65,
      health: 100
    },
    abilities: ['Time Shield', 'Rewind', 'Temporal Strike']
  },
  {
    id: 6,
    name: 'Void Assassin',
    class: 'Marine',
    price: '0.35 POL',
    rarity: 'Epic',
    image: voidMarine,
    color: '#FF6A00',
    icon: '🚀',
    description: 'Stealth operative from Future Mars',
    stats: {
      attack: 88,
      defense: 60,
      speed: 92,
      health: 80
    },
    abilities: ['Cloak', 'Void Step', 'Sniper Shot']
  },
  {
    id: 7,
    name: 'Shadow Blade',
    class: 'Samurai',
    price: '0.28 POL',
    rarity: 'Rare',
    image: cyberSamurai,
    color: '#FF006E',
    icon: '🗡️',
    description: 'Swift blade master from Ancient Japan',
    stats: {
      attack: 82,
      defense: 68,
      speed: 88,
      health: 85
    },
    abilities: ['Dual Strike', 'Flash Step', 'Counter']
  },
  {
    id: 8,
    name: 'Archer Knight',
    class: 'Knight',
    price: '0.22 POL',
    rarity: 'Rare',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🏹',
    description: 'Long-range defender from Medieval Europe',
    stats: {
      attack: 78,
      defense: 75,
      speed: 70,
      health: 90
    },
    abilities: ['Arrow Rain', 'Piercing Shot', 'Eagle Eye']
  },
  {
    id: 9,
    name: 'Holy Paladin',
    class: 'Knight',
    price: '0.45 POL',
    rarity: 'Epic',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Blessed warrior from Medieval Europe',
    stats: {
      attack: 80,
      defense: 92,
      speed: 62,
      health: 115
    },
    abilities: ['Divine Smite', 'Blessing', 'Healing Light']
  },
  {
    id: 10,
    name: 'Quantum Warrior',
    class: 'Marine',
    price: '0.6 POL',
    rarity: 'Legendary',
    image: voidMarine,
    color: '#FF6A00',
    icon: '💠',
    description: 'Reality-bending soldier from Future Mars',
    stats: {
      attack: 92,
      defense: 75,
      speed: 88,
      health: 105
    },
    abilities: ['Quantum Leap', 'Phase Shift', 'Particle Beam']
  },
  {
    id: 11,
    name: 'Rogue Ninja',
    class: 'Samurai',
    price: '0.24 POL',
    rarity: 'Rare',
    image: cyberSamurai,
    color: '#FF006E',
    icon: '🗡️',
    description: 'Agile infiltrator from Ancient Japan',
    stats: {
      attack: 80,
      defense: 62,
      speed: 93,
      health: 75
    },
    abilities: ['Backstab', 'Vanish', 'Poison Blade']
  },
  {
    id: 12,
    name: 'Sentinel Knight',
    class: 'Knight',
    price: '0.32 POL',
    rarity: 'Epic',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🛡️',
    description: 'Unwavering guardian from Medieval Europe',
    stats: {
      attack: 72,
      defense: 98,
      speed: 58,
      health: 125
    },
    abilities: ['Fortress', 'Taunt', 'Iron Wall']
  },
  {
    id: 13,
    name: 'Blaze Samurai',
    class: 'Samurai',
    price: '0.27 POL',
    rarity: 'Rare',
    image: cyberSamurai,
    color: '#FF006E',
    icon: '🔥',
    description: 'Fire-wielding warrior from Ancient Japan',
    stats: {
      attack: 87,
      defense: 66,
      speed: 82,
      health: 88
    },
    abilities: ['Flame Slash', 'Inferno', 'Burning Spirit']
  },
  {
    id: 14,
    name: 'Nebula Marine',
    class: 'Marine',
    price: '0.7 POL',
    rarity: 'Legendary',
    image: voidMarine,
    color: '#FF6A00',
    icon: '🌌',
    description: 'Cosmic warrior from Future Mars',
    stats: {
      attack: 94,
      defense: 78,
      speed: 86,
      health: 110
    },
    abilities: ['Star Burst', 'Gravity Well', 'Cosmic Shield']
  },
  {
    id: 15,
    name: 'Titan Knight',
    class: 'Knight',
    price: '0.55 POL',
    rarity: 'Epic',
    image: chronoKnight,
    color: '#FFB000',
    icon: '🗿',
    description: 'Colossal defender from Medieval Europe',
    stats: {
      attack: 88,
      defense: 100,
      speed: 55,
      health: 130
    },
    abilities: ['Earthquake', 'Titan Smash', 'Immovable']
  },
  {
    id: 16,
    name: 'Cyber Ronin',
    class: 'Samurai',
    price: '0.29 POL',
    rarity: 'Rare',
    image: cyberSamurai,
    color: '#FF006E',
    icon: '🤖',
    description: 'Tech-enhanced samurai from Ancient Japan',
    stats: {
      attack: 84,
      defense: 70,
      speed: 87,
      health: 82
    },
    abilities: ['Cyber Slash', 'EMP Strike', 'Data Hack']
  },
  {
    id: 17,
    name: 'Phantom Marine',
    class: 'Marine',
    price: '0.31 POL',
    rarity: 'Epic',
    image: voidMarine,
    color: '#FF6A00',
    icon: '👻',
    description: 'Ghost soldier from Future Mars',
    stats: {
      attack: 86,
      defense: 63,
      speed: 91,
      health: 78
    },
    abilities: ['Phantom Strike', 'Invisibility', 'Spectral Shift']
  },
  {
    id: 18,
    name: 'Meteor Knight',
    class: 'Knight',
    price: '0.26 POL',
    rarity: 'Rare',
    image: chronoKnight,
    color: '#FFB000',
    icon: '☄️',
    description: 'Sky warrior from Medieval Europe',
    stats: {
      attack: 76,
      defense: 82,
      speed: 68,
      health: 95
    },
    abilities: ['Meteor Strike', 'Sky Charge', 'Impact Shield']
  }
]


function MarketplacePage({ account }) {
  const [showFull, setShowFull] = useState(false)

  const shortAddress =
    account && `${account.slice(0, 6)}...${account.slice(-4)}`

  const visibleNfts = showFull ? allNfts : allNfts.slice(0, 6)

  return (
    <div>
      {/* Navbar */}
      <nav>
        <Link to="/" className="logo">⚡ HACKRONS</Link>
        <ul className="nav-links">
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/mint">Mint</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        <button className="connect-button">
          {shortAddress || 'Connect Wallet'}
        </button>
      </nav>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          paddingTop: '40px',
        }}
      >
        <section className="nft-gallery">
          <h2 className="gallery-title">
            {showFull ? 'Full Marketplace' : 'Featured NFTs'}
          </h2>
          <p className="gallery-subtitle">
            {showFull
              ? 'Browse the complete arsenal of Hackrons warriors'
              : 'Explore rare warriors from across time'}
          </p>

          <div className="nft-grid">
  {visibleNfts.map((nft) => (
    <TiltCard key={nft.id} maxTilt={15}>
      <div className="nft-card">
        <div className="nft-image">
          <img src={nft.image} alt={nft.name} />
          <span className={`nft-rarity ${nft.rarity.toLowerCase()}`}>
            {nft.rarity}
          </span>
        </div>
        <div className="nft-info">
          <h3 className="nft-name" style={{ color: nft.color }}>
            {nft.name}
          </h3>
          <p className="nft-class">{nft.class}</p>
          <div className="nft-price">
            <span className="price-label">Price:</span>
            <span className="price-value">{nft.price}</span>
          </div>
          <button className="nft-buy-btn">Buy Now</button>
        </div>
      </div>
    </TiltCard>
  ))}
</div>


          {/* Show button only when viewing 6 */}
          {!showFull && (
            <button
              type="button"
              className="gallery-more-btn"
              onClick={() => setShowFull(true)}
            >
              View Marketplace →
            </button>
          )}
        </section>

        {/* Show token chart only when full view is open */}
        {showFull && <TokenPriceChart />}
      </div>
    </div>
  )
}

export default MarketplacePage
