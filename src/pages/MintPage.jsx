import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/mint.css'

function MintPage() {
  const [address, setAddress] = useState(null)

  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 12,
    mins: 33,
    secs: 49,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Dummy on-chain values (static until you wire the contract)
  const currentSupply = 3259
  const maxNFTs = 5000
  const progress = (currentSupply / maxNFTs) * 100
  const price = '0.05'
  const nftsOwned = 4

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

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, mins, secs } = prev

        if (secs > 0) {
          secs--
        } else {
          secs = 59
          if (mins > 0) {
            mins--
          } else {
            mins = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, mins, secs }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleConnect = async () => {
    setError('')

    if (!window.ethereum) {
      setError('⚠️ Install MetaMask to connect your wallet')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts.length > 0) {
        setAddress(accounts[0])
      }
    } catch (err) {
      if (err.code !== 4001) {
        setError('Failed to connect wallet')
      }
    }
  }

  const handleMint = () => {
    if (!isConnected) {
      setError('⚠️ Please connect your wallet first')
      return
    }

    setError('')
    setSuccess('')

    // Placeholder: simulate mint success for now
    setTimeout(() => {
      setSuccess('🎉 NFT Minted Successfully!')
    }, 500)
  }

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <>
      {/* NAVBAR */}
      <nav>
        <Link to="/" className="logo">
          ⚡ HACKRONS
        </Link>
        <ul className="nav-links">
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/mint">Mint</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/game">Game</Link></li>
          <Link to="/faq">FAQ & RULES</Link>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        <button className="connect-button" onClick={handleConnect}>
          {shortAddress || 'Connect Wallet'}
        </button>
      </nav>

      {/* MINT SECTION */}
      <div className="mint-container">
        <div className="mint-content">
          <div className="mint-header">
            <h1 className="mint-title">
              <span className="mint-icon">🔥</span>
              GENESIS MINT LIVE
            </h1>
          </div>

          <div className="progress-section">
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-text">
              {currentSupply.toLocaleString()} / {maxNFTs.toLocaleString()} Minted
            </p>
          </div>

          <div className="countdown-section">
            <p className="countdown-title">PUBLIC SALE ENDS IN:</p>
            <div className="countdown-timer">
              <div className="countdown-box">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">DAYS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-box">
                <span className="countdown-number">{countdown.hours}</span>
                <span className="countdown-label">HOURS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-box">
                <span className="countdown-number">{countdown.mins}</span>
                <span className="countdown-label">MINS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-box">
                <span className="countdown-number">{countdown.secs}</span>
                <span className="countdown-label">SECS</span>
              </div>
            </div>
          </div>

          <p className="mint-price">Mint Price: {price} POL</p>

          <button
            className="mint-button"
            onClick={handleMint}
            disabled={!isConnected}
          >
            MINT NOW
          </button>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Wallet Info - Below Button */}
          {isConnected && (
            <div className="wallet-info">
              <div className="wallet-title">Your Wallet</div>
              <div className="wallet-stats">
                <div className="wallet-item">
                  <span className="wallet-label">POL Balance</span>
                  <span className="wallet-value">0.0000</span>
                </div>
                <div className="wallet-item">
                  <span className="wallet-label">FLUX Tokens</span>
                  <span className="wallet-value">69</span>
                </div>
                <div className="wallet-item">
                  <span className="wallet-label">NFTs Owned</span>
                  <span className="wallet-value">{nftsOwned}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MintPage
