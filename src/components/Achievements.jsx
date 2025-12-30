const achievements = [
    { id: 1, name: 'First Battle', icon: '⚔️', desc: 'Win your first battle', unlocked: true, color: '#FFD700' },
    { id: 2, name: 'NFT Collector', icon: '💎', desc: 'Own 10 NFTs', unlocked: true, color: '#FF006E' },
    { id: 3, name: 'Time Traveler', icon: '🌀', desc: 'Visit all 3 eras', unlocked: false, color: '#FFB000' },
    { id: 4, name: 'Champion', icon: '🏆', desc: 'Win 100 battles', unlocked: false, color: '#FF6A00' },
    { id: 5, name: 'Legendary Hunter', icon: '👑', desc: 'Own a Legendary NFT', unlocked: false, color: '#FFD700' },
    { id: 6, name: 'Guild Master', icon: '🛡️', desc: 'Create a guild', unlocked: false, color: '#FF006E' }
  ]
  
  function Achievements() {
    return (
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 60px'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '60px',
          textTransform: 'uppercase'
        }}>
          🏆 Achievements
        </h2>
  
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              style={{
                background: achievement.unlocked ? 'rgba(10, 5, 8, 0.8)' : 'rgba(10, 5, 8, 0.5)',
                padding: '30px',
                borderRadius: '15px',
                border: `2px solid ${achievement.unlocked ? achievement.color : 'rgba(255, 176, 0, 0.3)'}`,
                textAlign: 'center',
                opacity: achievement.unlocked ? 1 : 0.5,
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (achievement.unlocked) {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 10px 40px ${achievement.color}80`
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {achievement.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '20px'
                }}>
                  ✓
                </div>
              )}
              
              <div style={{
                fontSize: '60px',
                marginBottom: '15px',
                filter: achievement.unlocked ? `drop-shadow(0 0 15px ${achievement.color})` : 'grayscale(100%)'
              }}>
                {achievement.icon}
              </div>
              
              <h3 style={{
                color: achievement.unlocked ? achievement.color : '#666',
                fontSize: '18px',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                {achievement.name}
              </h3>
              
              <p style={{
                color: achievement.unlocked ? '#FFB000' : '#666',
                fontSize: '14px'
              }}>
                {achievement.desc}
              </p>
  
              {!achievement.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '48px',
                  opacity: 0.3
                }}>
                  🔒
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default Achievements
  