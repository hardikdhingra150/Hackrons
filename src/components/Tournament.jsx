import React, { useState, useEffect } from 'react'
import '../styles/tournament.css'

const Tournament = ({ account, ownedCharacters }) => {
  const [tournaments, setTournaments] = useState([])
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [enrolledTournaments, setEnrolledTournaments] = useState([])

  useEffect(() => {
    loadTournaments()
  }, [])

  const loadTournaments = () => {
    // Mock tournament data
    const mockTournaments = [
      {
        id: 1,
        name: 'Weekly Champions Cup',
        status: 'Registration Open',
        participants: 45,
        maxParticipants: 64,
        prizePool: '5 POL',
        entryFee: '0.1 POL',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        rounds: 6,
        format: 'Single Elimination',
        rewards: [
          { place: '1st', prize: '2.5 POL', percentage: 50 },
          { place: '2nd', prize: '1.5 POL', percentage: 30 },
          { place: '3rd', prize: '0.75 POL', percentage: 15 },
          { place: '4th', prize: '0.25 POL', percentage: 5 },
        ],
      },
      {
        id: 2,
        name: 'Grand Masters Tournament',
        status: 'In Progress',
        participants: 32,
        maxParticipants: 32,
        prizePool: '10 POL',
        entryFee: '0.5 POL',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        rounds: 5,
        format: 'Single Elimination',
        currentRound: 3,
        rewards: [
          { place: '1st', prize: '5 POL', percentage: 50 },
          { place: '2nd', prize: '3 POL', percentage: 30 },
          { place: '3rd', prize: '1.5 POL', percentage: 15 },
          { place: '4th', prize: '0.5 POL', percentage: 5 },
        ],
      },
      {
        id: 3,
        name: 'Newbie Arena',
        status: 'Registration Open',
        participants: 12,
        maxParticipants: 16,
        prizePool: '1 POL',
        entryFee: 'Free',
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        rounds: 4,
        format: 'Single Elimination',
        levelRestriction: 'Level 1-10 Only',
        rewards: [
          { place: '1st', prize: '0.5 POL', percentage: 50 },
          { place: '2nd', prize: '0.3 POL', percentage: 30 },
          { place: '3rd', prize: '0.15 POL', percentage: 15 },
          { place: '4th', prize: '0.05 POL', percentage: 5 },
        ],
      },
      {
        id: 4,
        name: 'Guild Wars Championship',
        status: 'Coming Soon',
        participants: 0,
        maxParticipants: 128,
        prizePool: '50 POL',
        entryFee: '1 POL',
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        rounds: 7,
        format: 'Guild vs Guild',
        rewards: [
          { place: '1st', prize: '25 POL', percentage: 50 },
          { place: '2nd', prize: '15 POL', percentage: 30 },
          { place: '3rd', prize: '7.5 POL', percentage: 15 },
          { place: '4th', prize: '2.5 POL', percentage: 5 },
        ],
      },
    ]

    setTournaments(mockTournaments)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registration Open':
        return '#00ff88'
      case 'In Progress':
        return '#ff9500'
      case 'Coming Soon':
        return '#00d4ff'
      case 'Completed':
        return '#888'
      default:
        return '#fff'
    }
  }

  const formatTimeRemaining = (startTime) => {
    const now = new Date()
    const diff = startTime - now
    
    if (diff < 0) return 'Started'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const enrollInTournament = (tournamentId) => {
    // Here you would call smart contract
    setEnrolledTournaments([...enrolledTournaments, tournamentId])
    alert('Successfully enrolled in tournament!')
  }

  const TournamentBracket = ({ tournament }) => {
    // Mock bracket data
    const rounds = [
      {
        name: 'Round of 16',
        matches: Array(8).fill(null).map((_, i) => ({
          id: i,
          player1: { name: `Player${i * 2 + 1}`, score: Math.random() > 0.5 ? 1 : 0 },
          player2: { name: `Player${i * 2 + 2}`, score: Math.random() > 0.5 ? 1 : 0 },
        })),
      },
      {
        name: 'Quarter Finals',
        matches: Array(4).fill(null).map((_, i) => ({
          id: i,
          player1: { name: `Winner${i * 2 + 1}`, score: Math.random() > 0.5 ? 1 : 0 },
          player2: { name: `Winner${i * 2 + 2}`, score: Math.random() > 0.5 ? 1 : 0 },
        })),
      },
      {
        name: 'Semi Finals',
        matches: Array(2).fill(null).map((_, i) => ({
          id: i,
          player1: { name: `Winner${i * 2 + 1}`, score: Math.random() > 0.5 ? 1 : 0 },
          player2: { name: `Winner${i * 2 + 2}`, score: Math.random() > 0.5 ? 1 : 0 },
        })),
      },
      {
        name: 'Finals',
        matches: [{
          id: 0,
          player1: { name: 'Finalist1', score: 0 },
          player2: { name: 'Finalist2', score: 0 },
        }],
      },
    ]

    return (
      <div className="tournament-bracket">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="bracket-round">
            <h3 className="round-name">{round.name}</h3>
            <div className="matches">
              {round.matches.map((match) => (
                <div key={match.id} className="bracket-match">
                  <div className={`match-player ${match.player1.score > match.player2.score ? 'winner' : ''}`}>
                    <span>{match.player1.name}</span>
                    <span className="score">{match.player1.score}</span>
                  </div>
                  <div className={`match-player ${match.player2.score > match.player1.score ? 'winner' : ''}`}>
                    <span>{match.player2.name}</span>
                    <span className="score">{match.player2.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="tournament-container">
      <h1 className="tournament-title">🏆 Tournaments</h1>
      <p className="tournament-subtitle">
        Compete in epic tournaments and win amazing prizes
      </p>

      {!selectedTournament ? (
        <div className="tournaments-grid">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="tournament-card">
              {/* Tournament Header */}
              <div className="tournament-header">
                <h2>{tournament.name}</h2>
                <span
                  className="tournament-status"
                  style={{ color: getStatusColor(tournament.status) }}
                >
                  {tournament.status}
                </span>
              </div>

              {/* Tournament Info */}
              <div className="tournament-info">
                <div className="info-row">
                  <span className="info-label">Prize Pool:</span>
                  <span className="info-value prize">{tournament.prizePool}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Entry Fee:</span>
                  <span className="info-value">{tournament.entryFee}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Participants:</span>
                  <span className="info-value">
                    {tournament.participants}/{tournament.maxParticipants}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Format:</span>
                  <span className="info-value">{tournament.format}</span>
                </div>
                {tournament.levelRestriction && (
                  <div className="info-row">
                    <span className="info-label">Restriction:</span>
                    <span className="info-value restriction">
                      {tournament.levelRestriction}
                    </span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Starts In:</span>
                  <span className="info-value">
                    {formatTimeRemaining(tournament.startTime)}
                  </span>
                </div>
              </div>

              {/* Participants Progress Bar */}
              <div className="participants-bar">
                <div
                  className="participants-fill"
                  style={{
                    width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
                  }}
                />
              </div>

              {/* Rewards Preview */}
              <div className="rewards-preview">
                <h4>Rewards:</h4>
                <div className="rewards-list">
                  {tournament.rewards.slice(0, 3).map((reward) => (
                    <div key={reward.place} className="reward-item">
                      <span className="place">{reward.place}:</span>
                      <span className="prize">{reward.prize}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tournament-actions">
                {tournament.status === 'Registration Open' && (
                  <>
                    {!enrolledTournaments.includes(tournament.id) ? (
                      <button
                        className="enroll-btn"
                        onClick={() => enrollInTournament(tournament.id)}
                      >
                        Enroll Now
                      </button>
                    ) : (
                      <button className="enrolled-btn" disabled>
                        ✓ Enrolled
                      </button>
                    )}
                  </>
                )}
                {tournament.status === 'In Progress' && (
                  <button className="view-bracket-btn">View Bracket</button>
                )}
                <button
                  className="details-btn"
                  onClick={() => setSelectedTournament(tournament)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Tournament Details View */
        <div className="tournament-details">
          <button
            className="back-btn"
            onClick={() => setSelectedTournament(null)}
          >
            ← Back to Tournaments
          </button>

          <div className="details-header">
            <h2>{selectedTournament.name}</h2>
            <span
              className="tournament-status"
              style={{ color: getStatusColor(selectedTournament.status) }}
            >
              {selectedTournament.status}
            </span>
          </div>

          <div className="details-content">
            {/* Tournament Info */}
            <div className="details-section">
              <h3>Tournament Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Prize Pool:</span>
                  <span className="detail-value prize">
                    {selectedTournament.prizePool}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Entry Fee:</span>
                  <span className="detail-value">
                    {selectedTournament.entryFee}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Participants:</span>
                  <span className="detail-value">
                    {selectedTournament.participants}/
                    {selectedTournament.maxParticipants}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Format:</span>
                  <span className="detail-value">
                    {selectedTournament.format}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Rounds:</span>
                  <span className="detail-value">
                    {selectedTournament.rounds}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Start Time:</span>
                  <span className="detail-value">
                    {selectedTournament.startTime.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Rewards Breakdown */}
            <div className="details-section">
              <h3>Rewards Breakdown</h3>
              <div className="rewards-table">
                {selectedTournament.rewards.map((reward) => (
                  <div key={reward.place} className="reward-row">
                    <span className="reward-place">{reward.place} Place</span>
                    <div className="reward-bar-container">
                      <div
                        className="reward-bar"
                        style={{ width: `${reward.percentage}%` }}
                      />
                      <span className="reward-percentage">
                        {reward.percentage}%
                      </span>
                    </div>
                    <span className="reward-prize">{reward.prize}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Bracket */}
            {selectedTournament.status === 'In Progress' && (
              <div className="details-section">
                <h3>Tournament Bracket</h3>
                <TournamentBracket tournament={selectedTournament} />
              </div>
            )}

            {/* Rules */}
            <div className="details-section">
              <h3>Tournament Rules</h3>
              <ul className="rules-list">
                <li>All matches are best of 1</li>
                <li>Players have 5 minutes to join their match</li>
                <li>No character switching between rounds</li>
                <li>Disconnections count as forfeit after 2 minutes</li>
                <li>Prize distribution happens automatically after tournament</li>
                <li>Entry fees are non-refundable</li>
              </ul>
            </div>
          </div>

          {selectedTournament.status === 'Registration Open' && (
            <button
              className="enroll-large-btn"
              onClick={() => enrollInTournament(selectedTournament.id)}
            >
              Enroll in Tournament - {selectedTournament.entryFee}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Tournament
