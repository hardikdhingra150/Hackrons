import { useState, useEffect } from 'react'

import cyberSamurai from '../assets/images/character/cyber-samurai.png'
import chronoKnight from '../assets/images/character/chrono-knight.png'
import voidMarine from '../assets/images/character/void-marine.png'

const characters = [
  { id: 1, name: 'Cyber Samurai', class: 'Samurai', description: 'Masters of agility and melee combat from Ancient Japan', image: cyberSamurai, color: '#FF006E', icon: '⚔️' },
  { id: 2, name: 'Chrono Knight', class: 'Knight', description: 'Defenders with unbreakable shields from Medieval Europe', image: chronoKnight, color: '#FFB000', icon: '🛡️' },
  { id: 3, name: 'Void harignton', class: 'Marine', description: 'Tech warriors with advanced weaponry from Future Mars', image: voidMarine, color: '#FF6A00', icon: '🚀' },
]

function ClassSelection({ account }) {
  const [selectedChar, setSelectedChar] = useState(null)
  const [claimed, setClaimed] = useState(false)
  const [claimedChar, setClaimedChar] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const address = account || null
  const isConnected = !!address

  // Load claimed character for this wallet (if any)
  useEffect(() => {
    if (!address) {
      setClaimed(false)
      setClaimedChar(null)
      return
    }

    const stored = localStorage.getItem(
      `claimedCharacter:${address.toLowerCase()}`
    )
    if (stored) {
      const parsed = JSON.parse(stored)
      setClaimed(true)
      setClaimedChar(parsed)
      setSelectedChar(parsed)
    } else {
      setClaimed(false)
      setClaimedChar(null)
    }
  }, [address])

  const handleSelect = (character) => {
    setSelectedChar(character)
    setError('')
  }

  const handleClaim = async () => {
    if (!isConnected || !address) {
      setError('⚠️ Please connect your wallet first!')
      return
    }

    if (!selectedChar) {
      setError('⚠️ Please select a character first!')
      return
    }

    if (claimedChar) {
      setError('❌ You already claimed your free character with this wallet!')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const data = {
        id: selectedChar.id,
        name: selectedChar.name,
        class: selectedChar.class,
        wallet: address,
        claimedAt: new Date().toISOString(),
      }

      localStorage.setItem(
        `claimedCharacter:${address.toLowerCase()}`,
        JSON.stringify(data)
      )

      setClaimed(true)
      setClaimedChar(data)
    } catch (err) {
      console.error('Claim error:', err)
      setError('❌ Failed to save claim locally')
    } finally {
      setIsLoading(false)
    }
  }

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <section className="class-selection">
      <h2 className="class-title">Choose Your Class</h2>
      <p className="class-subtitle">
        {isConnected ? `Wallet: ${shortAddress}` : 'Claim Your FREE Character!'}
      </p>

      <div className="class-grid">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`class-card ${
              selectedChar?.id === char.id ? 'selected' : ''
            }`}
            style={{
              borderColor:
                selectedChar?.id === char.id
                  ? char.color
                  : 'rgba(255, 176, 0, 0.3)',
            }}
            onClick={() => handleSelect(char)}
          >
            <div className="class-icon">
              <img src={char.image} alt={char.name} />
            </div>
            <h3 className="class-name" style={{ color: char.color }}>
              {char.name}
            </h3>
            <p className="class-desc">{char.description}</p>

            {selectedChar?.id === char.id && (
              <div
                className="selected-badge"
                style={{ backgroundColor: char.color }}
              >
                ✓ SELECTED
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="claim-section">
        {!claimed ? (
          <button
            className="claim-button"
            onClick={handleClaim}
            disabled={!selectedChar || !isConnected || isLoading}
          >
            {isLoading ? 'CLAIMING...' : 'CLAIM FREE CHARACTER'}
          </button>
        ) : (
          <div className="success-message">
            🎉 {claimedChar?.name} claimed successfully!
            <br />
            <small style={{ fontSize: '14px', opacity: 0.8 }}>
              Wallet: {shortAddress}
            </small>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      

      </div>
    </section>
  )
}

export default ClassSelection
