import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CharactersPage from './pages/CharactersPage'
import MintPage from './pages/MintPage'
import MarketplacePage from './pages/MarketplacePage'
import GamePage from './pages/GamePage'
import LeaderboardPage from './pages/LeaderboardPage'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import FAQPage from './components/FAQPage'
import { StatsProvider } from './context/StatsContext'

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)

  // Single MetaMask listener for the whole app
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || null)
    }

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch(() => {})

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  return (
    <StatsProvider>
      <div style={{ background: 'transparent', minHeight: '100vh' }}>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

        {!loading && (
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <LandingPage account={account} setAccount={setAccount} />
                </PageTransition>
              }
            />

            <Route path="/faq" element={<FAQPage />} />

            <Route
              path="/characters"
              element={
                <PageTransition>
                  <CharactersPage account={account} />
                </PageTransition>
              }
            />

            <Route
              path="/mint"
              element={
                <PageTransition>
                  <MintPage account={account} />
                </PageTransition>
              }
            />

            <Route
              path="/marketplace"
              element={
                <PageTransition>
                  <MarketplacePage account={account} />
                </PageTransition>
              }
            />

            <Route
              path="/game"
              element={
                <PageTransition>
                  <GamePage account={account} />
                </PageTransition>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <PageTransition>
                  <LeaderboardPage account={account} />
                </PageTransition>
              }
            />
          </Routes>
        )}
      </div>
    </StatsProvider>
  )
}

export default App
