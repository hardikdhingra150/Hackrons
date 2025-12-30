import { useState, useEffect } from 'react'

function WalletBalance() {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState('0.0000')
  const [nftCount, setNftCount] = useState(0)
  const [fluxBalance, setFluxBalance] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts) => {
      setAddress(accounts[0] || null)
    }

    // Load existing connection
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          loadBalance(accounts[0])
        }
      })
      .catch(() => {})

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  useEffect(() => {
    if (address) {
      loadBalance(address)
      // Simulate NFT and token balances (replace with actual contract calls later)
      setNftCount(Math.floor(Math.random() * 10))
      setFluxBalance(Math.floor(Math.random() * 1000))
    }
  }, [address])

  const loadBalance = async (addr) => {
    try {
      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [addr, 'latest'],
      })
      // Convert hex wei to POL
      const balanceInPol = parseInt(balanceHex, 16) / 1e18
      setBalance(balanceInPol.toFixed(4))
    } catch (err) {
      console.error('Failed to load balance:', err)
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!address) return null

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(10, 5, 8, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '20px',
        borderRadius: '15px',
        border: '2px solid #FFB000',
        minWidth: '220px',
        boxShadow: '0 0 40px rgba(255, 176, 0, 0.4)',
      }}
    >
      <h3
        style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        Your Wallet
      </h3>

      {/* Address with Copy Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          background: 'rgba(255, 176, 0, 0.1)',
          borderRadius: '8px',
          marginBottom: '15px',
          cursor: 'pointer',
        }}
        onClick={copyAddress}
        title="Click to copy address"
      >
        <span style={{ color: '#FFB000', fontSize: '12px' }}>
          {shortAddress}
        </span>
        <span style={{ fontSize: '16px' }}>📋</span>
      </div>

      {/* Copy Notification Popup */}
      {copied && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#4caf50',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
            zIndex: 1001,
            animation: 'fadeInOut 2s ease',
          }}
        >
          ✓ Address Copied!
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
            background: 'rgba(255, 176, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <span style={{ color: '#FFB000', fontSize: '12px' }}>
            POL Balance:
          </span>
          <span
            style={{ color: '#FFD700', fontSize: '12px', fontWeight: 'bold' }}
          >
            {balance}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
            background: 'rgba(255, 176, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <span style={{ color: '#FFB000', fontSize: '12px' }}>
            FLUX Tokens:
          </span>
          <span
            style={{ color: '#FFD700', fontSize: '12px', fontWeight: 'bold' }}
          >
            {fluxBalance}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
            background: 'rgba(255, 176, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <span style={{ color: '#FFB000', fontSize: '12px' }}>
            NFTs Owned:
          </span>
          <span
            style={{ color: '#FFD700', fontSize: '12px', fontWeight: 'bold' }}
          >
            {nftCount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WalletBalance
