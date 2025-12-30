const topGuilds = [
    { id: 1, name: 'Time Lords', emblem: '👑', members: 247, wins: 1456, color: '#FFD700', recruitment: 'Open' },
    { id: 2, name: 'Chrono Knights', emblem: '🛡️', members: 198, wins: 1289, color: '#FFB000', recruitment: 'Invite Only' },
    { id: 3, name: 'Void Warriors', emblem: '🚀', members: 234, wins: 1198, color: '#FF6A00', recruitment: 'Open' },
    { id: 4, name: 'Samurai Elite', emblem: '⚔️', members: 176, wins: 987, color: '#FF006E', recruitment: 'Open' }
  ]
  
  function GuildPreview() {
    return (
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 60px',
        background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(204, 85, 0, 0.1))'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          🏰 Top Guilds
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: '#FFB000',
          marginBottom: '60px',
          fontSize: '18px'
        }}>
          Join a guild and dominate the battlefield together
        </p>
  
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {topGuilds.map(guild => (
            <div
              key={guild.id}
              style={{
                background: 'rgba(10, 5, 8, 0.8)',
                backdropFilter: 'blur(20px)',
                padding: '30px',
                borderRadius: '20px',
                border: `2px solid ${guild.color}`,
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'
                e.currentTarget.style.boxShadow = `0 20px 60px ${guild.color}80`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Rank Badge */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: guild.color,
                color: '#0A0508',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                #{guild.id}
              </div>
  
              {/* Guild Emblem */}
              <div style={{
                fontSize: '80px',
                marginBottom: '20px',
                filter: `drop-shadow(0 0 30px ${guild.color})`
              }}>
                {guild.emblem}
              </div>
  
              {/* Guild Name */}
              <h3 style={{
                color: guild.color,
                fontSize: '24px',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                {guild.name}
              </h3>
  
              {/* Guild Stats */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '20px',
                padding: '15px 0',
                borderTop: '1px solid rgba(255, 176, 0, 0.2)',
                borderBottom: '1px solid rgba(255, 176, 0, 0.2)'
              }}>
                <div>
                  <div style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold' }}>{guild.members}</div>
                  <div style={{ color: '#8B4513', fontSize: '12px' }}>Members</div>
                </div>
                <div>
                  <div style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold' }}>{guild.wins}</div>
                  <div style={{ color: '#8B4513', fontSize: '12px' }}>Guild Wins</div>
                </div>
              </div>
  
              {/* Recruitment Status */}
              <div style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: guild.recruitment === 'Open' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 176, 0, 0.2)',
                border: `1px solid ${guild.recruitment === 'Open' ? '#00FF00' : '#FFB000'}`,
                borderRadius: '20px',
                color: guild.recruitment === 'Open' ? '#00FF00' : '#FFB000',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                {guild.recruitment}
              </div>
  
              {/* Join Button */}
              <button style={{
                width: '100%',
                padding: '12px',
                background: `linear-gradient(135deg, ${guild.color}40, ${guild.color}20)`,
                border: `2px solid ${guild.color}`,
                borderRadius: '10px',
                color: guild.color,
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}>
                View Guild
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default GuildPreview
  