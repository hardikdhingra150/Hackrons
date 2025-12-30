// src/components/NFTGallery.jsx
import { useNavigate } from 'react-router-dom'
import TiltCard from './TiltCard'

const nfts = [
  { id: 1, name: 'Genesis #001',  price: '0.5 POL',  rarity: 'Legendary', img: '⚔️' },
  { id: 2, name: 'Knight #042',   price: '0.3 POL',  rarity: 'Epic',      img: '🛡️' },
  { id: 3, name: 'Marine #103',   price: '0.2 POL',  rarity: 'Rare',      img: '🚀' },
  { id: 4, name: 'Samurai #089',  price: '0.4 POL',  rarity: 'Epic',      img: '⚔️' },
  { id: 5, name: 'Chrono #215',   price: '0.25 POL', rarity: 'Rare',      img: '🛡️' },
  { id: 6, name: 'Void #301',     price: '0.35 POL', rarity: 'Epic',      img: '🚀' }
]

function NFTGallery() {
  const navigate = useNavigate()

  return (
    <section className="nft-gallery">
      <h2 className="gallery-title">Featured NFTs</h2>
      <p className="gallery-subtitle">Explore rare warriors from across time</p>

      <div className="nft-grid">
        {nfts.map((nft) => (
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

      <button
        type="button"
        className="gallery-more-btn"
        onClick={() => navigate('/marketplace')}
      >
        View Marketplace →
      </button>
    </section>
  )
}

export default NFTGallery
