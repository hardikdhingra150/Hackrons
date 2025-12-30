import { Link } from 'react-router-dom'
import '../styles/landing.css'

function LandingPage({ account, setAccount }) {
  const handleConnectOrCopy = async () => {
    // Not connected yet → open MetaMask
    if (!account) {
      if (!window.ethereum) {
        alert('Install MetaMask to connect your wallet.')
        return
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0] || null)
      } catch {
        // user rejected; ignore
      }
      return
    }

    // Already connected → copy to clipboard
    try {
      await navigator.clipboard.writeText(account)
      console.log('Copied address:', account)
    } catch (e) {
      console.log('Clipboard failed:', e)
    }
  }

  const label = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Connect Wallet'

  return (
    <>
      <nav>
        <Link to="/" className="logo">⚡ HACKRONS</Link>
        <ul className="nav-links">
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/mint">Mint</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        <button className="connect-button" onClick={handleConnectOrCopy}>
          {label}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>HACKRONS</h1>
          <p className="tagline">Battle Through Time. Own Your Legend.</p>
          <p className="hero-subtitle">
            Collect legendary warriors from across time. Battle in time portals. 
            Earn & trade rare NFT heroes.
          </p>
          <Link to="/mint">
            <button className="cta-button">▶ ENTER THE ARENA</button>
          </Link>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to Explore</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">⚔️</div>
          <h3 className="feature-title">Epic Time Battles</h3>
          <p className="feature-subtitle">Multi-Era Combat</p>
          <p className="feature-description">
            Pit ancient samurai against futuristic marines in epic time portal battles.
          </p>
          <ul className="feature-list">
            <li>PvP & PvE battles</li>
            <li>Time portal arenas</li>
            <li>Strategic abilities</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👤</div>
          <h3 className="feature-title">Collect Heroes</h3>
          <p className="feature-subtitle">Rare NFT Warriors</p>
          <p className="feature-description">
            Mint unique character NFTs from three legendary eras.
          </p>
          <ul className="feature-list">
            <li>5000+ unique characters</li>
            <li>Dynamic evolution system</li>
            <li>Rare trait combinations</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3 className="feature-title">Play & Earn</h3>
          <p className="feature-subtitle">True Asset Ownership</p>
          <p className="feature-description">
            Win battles, complete quests, and earn FLUX tokens.
          </p>
          <ul className="feature-list">
            <li>FLUX token rewards</li>
            <li>NFT marketplace</li>
            <li>Staking rewards</li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="stats-title">Revolution in Numbers</h2>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Beta Warriors</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✨</div>
            <div className="stat-number">5000</div>
            <div className="stat-label">Genesis NFTs</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚔️</div>
            <div className="stat-number">50K+</div>
            <div className="stat-label">Battles Fought</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🔗</div>
            <div className="stat-number">3</div>
            <div className="stat-label">Time Eras</div>
          </div>
        </div>
      </section>

      {/* Tech / Game Features Section */}
      <section className="tech-section">
        <h2 className="tech-title">Game Features</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-card-icon">🗡️</div>
            <h3 className="tech-card-title">Character Classes</h3>
            <p className="tech-card-subtitle">Three Legendary Eras</p>
            <p className="tech-card-description">
              Choose from three unique character classes.
            </p>
            <ul className="tech-features">
              <li>Cyber Samurai - Agility</li>
              <li>Chrono Knights - Defense</li>
              <li>Void Marines - Range</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-card-icon">🌀</div>
            <h3 className="tech-card-title">Time Portal System</h3>
            <p className="tech-card-subtitle">Travel Through Ages</p>
            <p className="tech-card-description">
              Enter time portals to access different eras.
            </p>
            <ul className="tech-features">
              <li>Ancient Japan portal</li>
              <li>Medieval Europe portal</li>
              <li>Future Mars portal</li>
            </ul>
          </div>

          <div className="tech-card">
            <div className="tech-card-icon">💎</div>
            <h3 className="tech-card-title">NFT Evolution</h3>
            <p className="tech-card-subtitle">Dynamic Upgrades</p>
            <p className="tech-card-description">
              Your character NFTs evolve with gameplay.
            </p>
            <ul className="tech-features">
              <li>Battle-based leveling</li>
              <li>Stat progression</li>
              <li>Ability unlocks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">HACKRONS</div>
          <p className="footer-text">
            © 2025 HACKRONS. Breaking the chains of centralized gaming.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">🎮</a>
            <a href="#" className="social-icon">💬</a>
            <a href="#" className="social-icon">⚔️</a>
          </div>
          <p className="copyright">
            Built on Polygon • Powered by Chainlink VRF
          </p>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
