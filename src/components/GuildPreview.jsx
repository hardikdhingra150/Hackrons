import React from 'react'
import '../styles/guild.css'

const guildsData = [
  {
    id: 1,
    name: 'Shadow Samurais',
    tag: '[SHDW]',
    members: 847,
    totalWins: 12450,
    level: 45,
    icon: '⚔️',
    color: '#ff0000',
    description: 'Elite warriors dominating the battlefield',
    leader: 'ShadowMaster0x',
    founded: 'Q1 2025',
  },
  {
    id: 2,
    name: 'Chrono Knights',
    tag: '[TIME]',
    members: 692,
    totalWins: 10890,
    level: 42,
    icon: '🛡️',
    color: '#00d4ff',
    description: 'Masters of time and strategy',
    leader: 'ChronoLord99',
    founded: 'Q1 2025',
  },
  {
    id: 3,
    name: 'Void Legion',
    tag: '[VOID]',
    members: 734,
    totalWins: 11200,
    level: 43,
    icon: '🚀',
    color: '#9d00ff',
    description: 'Space warriors conquering the cosmos',
    leader: 'VoidCommander',
    founded: 'Q2 2025',
  },
  {
    id: 4,
    name: 'Cyber Dragons',
    tag: '[CDRG]',
    members: 521,
    totalWins: 8340,
    level: 38,
    icon: '🐉',
    color: '#00ff88',
    description: 'Tech-enhanced fighters rising fast',
    leader: 'DragonKingX',
    founded: 'Q2 2025',
  },
  {
    id: 5,
    name: 'Phoenix Rising',
    tag: '[PHNX]',
    members: 612,
    totalWins: 9670,
    level: 40,
    icon: '🔥',
    color: '#ff9500',
    description: 'Reborn from defeat, unstoppable force',
    leader: 'PhoenixLord',
    founded: 'Q3 2025',
  },
  {
    id: 6,
    name: 'Eternal Guardians',
    tag: '[ETRL]',
    members: 456,
    totalWins: 7120,
    level: 35,
    icon: '🛡️',
    color: '#ffd700',
    description: 'Protectors of the realm',
    leader: 'GuardianPrime',
    founded: 'Q3 2025',
  },
]

function GuildPreview() {
  return (
    <div className="guild-section">
      <h2 className="guild-title">⚔️ Top Guilds</h2>
      <p className="guild-subtitle">
        Join forces with the strongest warriors. Build your legacy together.
      </p>

      <div className="guilds-grid">
        {guildsData.map((guild) => (
          <div
            key={guild.id}
            className="guild-card"
            style={{ borderColor: guild.color }}
          >
            {/* Guild Header */}
            <div className="guild-header">
              <div className="guild-icon" style={{ color: guild.color }}>
                {guild.icon}
              </div>
              <div className="guild-info">
                <div className="guild-name-row">
                  <h3 className="guild-name">{guild.name}</h3>
                  <span className="guild-tag" style={{ 
                    color: guild.color,
                    borderColor: guild.color 
                  }}>
                    {guild.tag}
                  </span>
                </div>
                <p className="guild-description">{guild.description}</p>
              </div>
            </div>

            {/* Guild Stats - Fixed Alignment */}
            <div className="guild-stats">
              <div className="stat-item">
                <div className="stat-label">LEVEL</div>
                <div className="stat-value" style={{ color: guild.color }}>
                  {guild.level}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">MEMBERS</div>
                <div className="stat-value" style={{ color: guild.color }}>
                  {guild.members}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">TOTAL WINS</div>
                <div className="stat-value" style={{ color: guild.color }}>
                  {guild.totalWins.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Guild Footer - Fixed Alignment */}
            <div className="guild-footer">
              <div className="guild-footer-item">
                <span className="footer-label">LEADER:</span>
                <span className="footer-value" style={{ color: guild.color }}>
                  {guild.leader}
                </span>
              </div>
              <div className="guild-footer-item">
                <span className="footer-label">FOUNDED:</span>
                <span className="footer-value" style={{ color: guild.color }}>
                  {guild.founded}
                </span>
              </div>
            </div>

            {/* Join Button */}
            <button
              className="join-guild-btn"
              style={{
                background: guild.color,
              }}
            >
              JOIN GUILD
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


export default GuildPreview
