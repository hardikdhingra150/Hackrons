import { ConnectButton } from '@rainbow-me/rainbowkit'
import { colors } from '../styles/theme'
import '../styles/navbar.css'


function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: colors.darkBurgundy,
      borderBottom: `2px solid ${colors.amberGold}`
    }}>
      <h1 style={{ color: colors.brightGold, fontSize: '28px' }}>
        ⚡ HACKRONS
      </h1>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <a href="/" style={{ color: colors.amberGold }}>Play</a>
        <a href="/marketplace" style={{ color: colors.amberGold }}>Marketplace</a>
        <a href="/quests" style={{ color: colors.amberGold }}>Quests</a>
      </div>
      
      <ConnectButton />
    </nav>
  )
}

export default Navbar
