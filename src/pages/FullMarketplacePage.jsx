// src/pages/FullMarketplacePage.jsx
import { Link } from 'react-router-dom'
import TiltCard from '../components/TiltCard'
import TokenPriceChart from '../components/TokenPriceChart'
import '../styles/landing.css'
import '../styles/components.css'

const allNfts = [
  { id: 1,  name: 'Genesis #001',   price: '0.5 POL',  rarity: 'Legendary', img: '⚔️' },
  { id: 2,  name: 'Knight #042',    price: '0.3 POL',  rarity: 'Epic',      img: '🛡️' },
  { id: 3,  name: 'Marine #103',    price: '0.2 POL',  rarity: 'Rare',      img: '🚀' },
  { id: 4,  name: 'Samurai #089',   price: '0.4 POL',  rarity: 'Epic',      img: '⚔️' },
  { id: 5,  name: 'Chrono #215',    price: '0.25 POL', rarity: 'Rare',      img: '🛡️' },
  { id: 6,  name: 'Void #301',      price: '0.35 POL', rarity: 'Epic',      img: '🚀' },
  { id: 7,  name: 'Shadow #144',    price: '0.28 POL', rarity: 'Rare',      img: '🗡️' },
  { id: 8,  name: 'Archer #077',    price: '0.22 POL', rarity: 'Rare',      img: '🏹' },
  { id: 9,  name: 'Paladin #210',   price: '0.45 POL', rarity: 'Epic',      img: '🛡️' },
  { id: 10, name: 'Quantum #512',   price: '0.6 POL',  rarity: 'Legendary', img: '💠' },
  { id: 11, name: 'Rogue #099',     price: '0.24 POL', rarity: 'Rare',      img: '🗡️' },
  { id: 12, name: 'Sentinel #330',  price: '0.32 POL', rarity: 'Epic',      img: '🛡️' },
  { id: 13, name: 'Blaze #404',     price: '0.27 POL', rarity: 'Rare',      img: '🔥' },
  { id: 14, name: 'Nebula #777',    price: '0.7 POL',  rarity: 'Legendary', img: '🌌' },
  { id: 15, name: 'Titan #666',     price: '0.55 POL', rarity: 'Epic',      img: '🗿' },
  { id: 16, name: 'Cyber #256',     price: '0.29 POL', rarity: 'Rare',      img: '🤖' },
  { id: 17, name: 'Phantom #333',   price: '0.31 POL', rarity: 'Epic',      img: '👻' },
  { id: 18, name: 'Meteor #909',    price: '0.26 POL', rarity: 'Rare',      img: '☄️' }
]

function FullMarketplacePage({ account }) {
  const shortAddress =
    account && `${account.slice(0, 6)}...${account.slice(-4)}`

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

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          paddingTop: '40px',
        }}
      >
        <section className="nft-gallery">
          <h2 className="gallery-title">Full Marketplace</h2>
          <p className="gallery-subtitle">Browse the complete arsenal of Hackrons warriors</p>

          <div className="nft-grid">
            {allNfts.map((nft) => (
              <TiltCard key={nft.id} maxTilt={15}>
                <div className="nft-card">
                  <div className="nft-image">
                    <span className="nft-emoji">{nft.img}</span>
                    <span className={`nft-rarity ${nft.rarity.toLowerCase()}`}>
                      {nft.rarity}
                    </span>
                  </div>
                  <div className="nft-info">
                    <h3 className="nft-name">{nft.name}</h3>
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
        </section>

        <TokenPriceChart />
      </div>
    </div>
  )
}

export default FullMarketplacePage
