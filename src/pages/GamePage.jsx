import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import '../styles/landing.css'

function GamePage({ account }) {
  const shortAddress =
    account && `${account.slice(0, 6)}...${account.slice(-4)}`

  return (
    <div>
      {/* Background Container */}
      

      {/* Navbar */}
      <nav>
        <Link to="/" className="logo">
          ⚡ HACKRONS
        </Link>
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
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            textAlign: 'center',
            background:
              'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '60px',
          }}
        >
          Hackrons Roadmap
        </h1>

        {/* Roadmap Timeline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          <div
            style={{
              padding: '30px',
              background: 'rgba(10, 5, 8, 0.8)',
              borderRadius: '20px',
              borderLeft: '4px solid #FFD700',
            }}
          >
            <h3
              style={{
                color: '#FFD700',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              Q1 2025 - Beta Launch
            </h3>
            <ul style={{ color: '#FFB000', lineHeight: '2' }}>
              <li>Genesis NFT Mint</li>
              <li>Closed Beta Access</li>
              <li>3 Character Classes Available</li>
            </ul>
          </div>

          <div
            style={{
              padding: '30px',
              background: 'rgba(10, 5, 8, 0.8)',
              borderRadius: '20px',
              borderLeft: '4px solid #FF6A00',
            }}
          >
            <h3
              style={{
                color: '#FF6A00',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              Q2 2025 - Marketplace
            </h3>
            <ul style={{ color: '#FFB000', lineHeight: '2' }}>
              <li>NFT Marketplace Launch</li>
              <li>P2P Trading</li>
              <li>Staking Rewards</li>
            </ul>
          </div>

          <div
            style={{
              padding: '30px',
              background: 'rgba(10, 5, 8, 0.8)',
              borderRadius: '20px',
              borderLeft: '4px solid #FFB000',
            }}
          >
            <h3
              style={{
                color: '#FFB000',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              Q3 2025 - Guild Wars
            </h3>
            <ul style={{ color: '#FFB000', lineHeight: '2' }}>
              <li>Guild System</li>
              <li>Team Battles</li>
              <li>Seasonal Tournaments</li>
            </ul>
          </div>

          <div
            style={{
              padding: '30px',
              background: 'rgba(10, 5, 8, 0.8)',
              borderRadius: '20px',
              borderLeft: '4px solid #CC5500',
            }}
          >
            <h3
              style={{
                color: '#CC5500',
                fontSize: '24px',
                marginBottom: '15px',
              }}
            >
              Q4 2025 - Mobile Version
            </h3>
            <ul style={{ color: '#FFB000', lineHeight: '2' }}>
              <li>iOS & Android Launch</li>
              <li>Cross-Platform Play</li>
              <li>Mobile-Exclusive Events</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  )
}

export default GamePage
