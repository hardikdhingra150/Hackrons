import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CharacterCarousel from '../components/CharacterCarousel'
import ClassSelection from '../components/ClassSelection'
import '../styles/landing.css'
import '../styles/components.css'

function CharactersPage() {
  const [address, setAddress] = useState(null)

  const isConnected = !!address

  // Load existing wallet connection
  useEffect(() => {
    if (!window.ethereum) return

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        }
      })
      .catch(() => {})

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0])
      } else {
        setAddress(null)
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert('Install MetaMask to connect your wallet.')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts.length > 0) {
        setAddress(accounts[0])
      }
    } catch {
      // user rejected; ignore
    }
  }

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div>
      {/* Navbar */}
      <nav>
        <Link to="/" className="logo">⚡ HACKRONS</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/mint">Mint</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        <button className="connect-button" onClick={handleConnect}>
          {shortAddress || 'Connect Wallet'}
        </button>
      </nav>

      {/* Character Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          paddingTop: '60px',
        }}
      >
        <CharacterCarousel />
        <ClassSelection account={address} />
      </div>
    </div>
  )
}

export default CharactersPage
