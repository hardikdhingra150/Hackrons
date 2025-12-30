import { useEffect, useState } from 'react'

function WalletConnectButton() {
  const [account, setAccount] = useState(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || null)
    }

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => handleAccountsChanged(accounts))
      .catch(() => {})

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const handleClick = async () => {
    setError('')
    setCopied(false)

    // If not connected, open MetaMask connect popup
    if (!account) {
      if (!window.ethereum) {
        setError('Install MetaMask to connect your wallet.')
        return
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const acc = accounts[0] || null
        setAccount(acc)
      } catch (err) {
        if (err.code !== 4001) setError('Failed to connect wallet')
      }
      return
    }

    // If already connected, copy address
    try {
      await navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setError('Could not copy address')
    }
  }

  const label = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Connect Wallet'

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <button className="connect-button" onClick={handleClick}>
        {label}
      </button>

      {copied && (
        <span
          style={{
            position: 'absolute',
            top: '-24px',
            right: 0,
            background: '#4caf50',
            color: '#fff',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            fontWeight: '600',
          }}
        >
          Copied!
        </span>
      )}

      {error && !copied && (
        <span
          style={{
            marginTop: '4px',
            color: '#ff6a00',
            fontSize: '11px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default WalletConnectButton
