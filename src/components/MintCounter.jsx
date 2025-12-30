import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { createPublicClient, http, formatEther } from 'viem'
import { polygonAmoy } from 'viem/chains'
import { useNavigate } from 'react-router-dom'

const NFT_CONTRACT = "0x2a446d6bfd26172e96d9188acaffd499022c8f7a" // UPDATE WITH NEW ADDRESS AFTER REDEPLOYING

const NFT_ABI = [
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalMinted",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "freeClaimCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FREE_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]

function MintCounter() {
  const [minted, setMinted] = useState(0)
  const [maxSupply, setMaxSupply] = useState(5000)
  const [mintPrice, setMintPrice] = useState('0.05')
  const [freeClaimCount, setFreeClaimCount] = useState(0)
  const [freeSupply, setFreeSupply] = useState(1000)
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, mins: 34, secs: 45 })
  const { isConnected } = useAccount()
  const navigate = useNavigate()

  // Fetch real contract data
  useEffect(() => {
    fetchContractData()
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchContractData, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchContractData = async () => {
    try {
      const publicClient = createPublicClient({
        chain: polygonAmoy,
        transport: http('https://rpc-amoy.polygon.technology/')
      })

      const [price, total, max, freeClaimed, freeMax] = await Promise.all([
        publicClient.readContract({
          address: NFT_CONTRACT,
          abi: NFT_ABI,
          functionName: 'MINT_PRICE'
        }),
        publicClient.readContract({
          address: NFT_CONTRACT,
          abi: NFT_ABI,
          functionName: 'totalMinted'
        }),
        publicClient.readContract({
          address: NFT_CONTRACT,
          abi: NFT_ABI,
          functionName: 'MAX_SUPPLY'
        }),
        publicClient.readContract({
          address: NFT_CONTRACT,
          abi: NFT_ABI,
          functionName: 'freeClaimCount'
        }),
        publicClient.readContract({
          address: NFT_CONTRACT,
          abi: NFT_ABI,
          functionName: 'FREE_SUPPLY'
        })
      ])

      setMintPrice(formatEther(price))
      setMinted(Number(total))
      setMaxSupply(Number(max))
      setFreeClaimCount(Number(freeClaimed))
      setFreeSupply(Number(freeMax))
    } catch (err) {
      console.error('Error fetching contract data:', err)
    }
  }

  // Countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev
        
        secs--
        if (secs < 0) {
          secs = 59
          mins--
        }
        if (mins < 0) {
          mins = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        
        return { days, hours, mins, secs }
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  const handleMintClick = () => {
    if (!isConnected) {
      alert('⚠️ Please connect your wallet first!')
      return
    }
    // Navigate to mint page
    navigate('/mint')
  }

  const percentage = (minted / maxSupply) * 100
  const freePercentage = (freeClaimCount / freeSupply) * 100

  return (
    <section className="mint-counter">
      <h2 className="mint-title">🔥 Genesis Mint Live</h2>
      
      <div className="mint-stats">
        {/* Total Minted Progress */}
        <div className="mint-progress">
          <div className="progress-label">Total Minted</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="progress-text">
            <span className="minted-count">{minted.toLocaleString()}</span>
            <span className="total-count">/ {maxSupply.toLocaleString()} NFTs</span>
          </div>
        </div>

        {/* Free Claims Progress */}
        <div className="mint-progress free-claims">
          <div className="progress-label">Free Claims</div>
          <div className="progress-bar">
            <div className="progress-fill free" style={{ width: `${freePercentage}%` }}></div>
          </div>
          <div className="progress-text">
            <span className="minted-count">{freeClaimCount.toLocaleString()}</span>
            <span className="total-count">/ {freeSupply.toLocaleString()} Claimed</span>
            <span className="remaining-count">({freeSupply - freeClaimCount} left!)</span>
          </div>
        </div>

        {/* Timer */}
        <div className="mint-timer">
          <div className="timer-label">Public Sale Ends In:</div>
          <div className="timer-display">
            <div className="time-unit">
              <span className="time-value">{timeLeft.days}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="time-label">Mins</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="time-label">Secs</span>
            </div>
          </div>
        </div>

        {/* Mint Options */}
        <div className="mint-options">
          <div className="mint-option">
            <span className="option-label">🎁 Free Claim:</span>
            <span className="option-value">1 per wallet</span>
          </div>
          <div className="mint-option">
            <span className="option-label">💰 Paid Mint:</span>
            <span className="option-value">{mintPrice} POL</span>
          </div>
        </div>

        <button className="mint-button" onClick={handleMintClick}>
          {isConnected ? 'Mint Now' : 'Connect Wallet to Mint'}
        </button>
      </div>
    </section>
  )
}

export default MintCounter
