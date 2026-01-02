import { Link } from 'react-router-dom'
import Achievements from '../components/Achievements'
import GuildPreview from '../components/GuildPreview'
import '../styles/landing.css'

const topPlayers = [
  { rank: 1, name: 'CyberSamurai0x', wins: 1247, class: '⚔️' },
  { rank: 2, name: 'ChronoKnight99', wins: 1189, class: '🛡️' },
  { rank: 3, name: 'VoidMarine420', wins: 1156, class: '🚀' },
  { rank: 4, name: 'TemporalHero', wins: 1098, class: '⚔️' },
  { rank: 5, name: 'TimeLordX', wins: 1034, class: '🛡️' },
  { rank: 6, name: 'EonWarrior', wins: 987, class: '🚀' },
  { rank: 7, name: 'ChronoMaster', wins: 945, class: '⚔️' },
  { rank: 8, name: 'VoidHunter', wins: 912, class: '🚀' },
  { rank: 9, name: 'SamuraiPro', wins: 876, class: '⚔️' },
  { rank: 10, name: 'KnightElite', wins: 834, class: '🛡️' },
]

function LeaderboardPage({ account }) {
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
          <Link to="/faq">FAQ & RULES</Link>
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
          padding: '20px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '60px',
          }}
        >
          🏆 Top Warriors
        </h1>

        <div
          style={{
            background: 'rgba(10, 5, 8, 0.8)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid #FFB000',
            marginBottom: '80px',
          }}
        >
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '25px 30px',
                borderBottom:
                  player.rank !== 10
                    ? '1px solid rgba(255, 176, 0, 0.2)'
                    : 'none',
                background:
                  player.rank <= 3 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color:
                    player.rank === 1
                      ? '#FFD700'
                      : player.rank === 2
                      ? '#FFB000'
                      : player.rank === 3
                      ? '#CC5500'
                      : '#8B4513',
                  width: '60px',
                }}
              >
                #{player.rank}
              </div>
              <div style={{ fontSize: '36px', marginRight: '20px' }}>
                {player.class}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  {player.name}
                </div>
                <div style={{ color: '#FFB000', fontSize: '14px' }}>
                  {player.wins} Victories
                </div>
              </div>
              {player.rank <= 3 && <div style={{ fontSize: '32px' }}>👑</div>}
            </div>
          ))}
        </div>

        <GuildPreview />
        <Achievements />
      </div>
    </div>
  )
}

export default LeaderboardPage
