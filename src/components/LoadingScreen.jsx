import { useState, useEffect } from 'react'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Time Portals...')

  const loadingTexts = [
    'Opening Time Portals...',
    'Summoning Ancient Warriors...',
    'Preparing Battle Arena...',
    'Charging Cyber Weapons...',
    'Loading Medieval Fortress...',
    'Deploying Future Marines...',
    'Almost Ready for Battle...'
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete && onComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)])
    }, 1500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0A0508 0%, #1a0a0f 50%, #2d0a0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Battlefield Smoke Effect */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at bottom, rgba(139, 0, 0, 0.3), transparent 60%), radial-gradient(ellipse at top, rgba(204, 85, 0, 0.2), transparent 60%)',
        animation: 'smokeMove 10s ease infinite'
      }} />

      {/* Battle Grid Floor */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundImage: `
          linear-gradient(rgba(255, 106, 0, 0.1) 2px, transparent 2px),
          linear-gradient(90deg, rgba(255, 106, 0, 0.1) 2px, transparent 2px)
        `,
        backgroundSize: '50px 50px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'bottom',
        opacity: 0.3
      }} />

      {/* Warrior Silhouettes - Left Side (Ancient) */}
      <div style={{
        position: 'absolute',
        left: '10%',
        bottom: '20%',
        fontSize: '80px',
        opacity: 0.2,
        animation: 'warriorStance 3s ease-in-out infinite',
        filter: 'drop-shadow(0 0 20px #FF6A00)'
      }}>
        ⚔️
      </div>
      <div style={{
        position: 'absolute',
        left: '20%',
        bottom: '15%',
        fontSize: '70px',
        opacity: 0.15,
        animation: 'warriorStance 3.5s ease-in-out infinite',
        animationDelay: '0.5s'
      }}>
        🗡️
      </div>

      {/* Warrior Silhouettes - Right Side (Future) */}
      <div style={{
        position: 'absolute',
        right: '10%',
        bottom: '20%',
        fontSize: '80px',
        opacity: 0.2,
        animation: 'warriorStance 3s ease-in-out infinite reverse',
        filter: 'drop-shadow(0 0 20px #FFB000)'
      }}>
        🚀
      </div>
      <div style={{
        position: 'absolute',
        right: '20%',
        bottom: '15%',
        fontSize: '70px',
        opacity: 0.15,
        animation: 'warriorStance 3.5s ease-in-out infinite reverse',
        animationDelay: '0.3s'
      }}>
        🛡️
      </div>

      {/* Battle Explosion Effects */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            border: '2px solid rgba(255, 106, 0, 0.3)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `battlePulse ${2 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}

      {/* Lightning Strikes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '30%',
        width: '3px',
        height: '100px',
        background: 'linear-gradient(to bottom, #FFD700, transparent)',
        animation: 'lightning 4s ease-in-out infinite',
        boxShadow: '0 0 20px #FFD700'
      }} />
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '35%',
        width: '3px',
        height: '120px',
        background: 'linear-gradient(to bottom, #FF6A00, transparent)',
        animation: 'lightning 5s ease-in-out infinite',
        animationDelay: '1s',
        boxShadow: '0 0 20px #FF6A00'
      }} />

      {/* Time Portal Rifts */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(255, 106, 0, 0.4), transparent 70%)',
        borderRadius: '50%',
        animation: 'portalSpin 4s linear infinite',
        border: '2px solid rgba(255, 106, 0, 0.6)'
      }} />
      <div style={{
        position: 'absolute',
        top: '35%',
        right: '15%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(255, 176, 0, 0.4), transparent 70%)',
        borderRadius: '50%',
        animation: 'portalSpin 5s linear infinite reverse',
        border: '2px solid rgba(255, 176, 0, 0.6)'
      }} />

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Battle Logo */}
        <div style={{
          fontSize: '120px',
          marginBottom: '30px',
          animation: 'logoGlow 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 40px rgba(255, 106, 0, 0.8))',
          textShadow: '0 0 50px rgba(255, 176, 0, 0.6)'
        }}>
          ⚡
        </div>
        
        <h1 style={{
          fontSize: '72px',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #FF6A00, #FFB000, #FFD700, #FFB000, #FF6A00)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          letterSpacing: '12px',
          textShadow: '0 0 80px rgba(255, 106, 0, 0.8)',
          animation: 'titleShine 3s ease infinite'
        }}>
          HACKRONS
        </h1>

        <div style={{
          color: '#FF6A00',
          fontSize: '18px',
          marginBottom: '50px',
          textAlign: 'center',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          animation: 'fadeInOut 2s ease-in-out infinite'
        }}>
          Battle Through Time
        </div>

        {/* Battle Progress Bar */}
        <div style={{
          width: '600px',
          height: '12px',
          background: 'rgba(10, 5, 8, 0.8)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '25px',
          border: '2px solid rgba(255, 106, 0, 0.6)',
          boxShadow: '0 0 30px rgba(255, 106, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #CC5500 0%, #FF6A00 30%, #FFB000 60%, #FFD700 100%)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 40px rgba(255, 176, 0, 1)',
            animation: 'progressGlow 1.5s ease infinite',
            position: 'relative'
          }}>
            {/* Battle Sparks on progress bar */}
            <div style={{
              position: 'absolute',
              right: '-5px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '10px',
              height: '10px',
              background: '#FFD700',
              borderRadius: '50%',
              boxShadow: '0 0 20px #FFD700',
              animation: 'spark 0.5s ease infinite'
            }} />
          </div>
        </div>

        {/* Progress Percentage with Battle Indicator */}
        <div style={{
          color: '#FFD700',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '25px',
          textAlign: 'center',
          textShadow: '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 106, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>⚔️</span>
          {progress}%
          <span style={{ animation: 'pulse 1s ease-in-out infinite', animationDelay: '0.5s' }}>🛡️</span>
        </div>

        {/* Loading Text */}
        <div style={{
          color: '#FFB000',
          fontSize: '20px',
          textAlign: 'center',
          animation: 'fadeInOut 1.8s ease-in-out infinite',
          letterSpacing: '3px',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(255, 176, 0, 0.8)'
        }}>
          {loadingText}
        </div>
      </div>

      {/* Battle Particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? '#FF6A00' : '#FFD700',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `battleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: `0 0 10px currentColor`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes logoGlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 40px rgba(255, 106, 0, 0.8)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 60px rgba(255, 176, 0, 1)); }
        }
        
        @keyframes titleShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes battleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -20px) rotate(90deg); }
          50% { transform: translate(-10px, -40px) rotate(180deg); }
          75% { transform: translate(10px, -20px) rotate(270deg); }
        }

        @keyframes progressGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 176, 0, 0.8); }
          50% { box-shadow: 0 0 50px rgba(255, 215, 0, 1); }
        }

        @keyframes smokeMove {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.6; }
          50% { transform: scale(1.1) translateY(-20px); opacity: 0.8; }
        }

        @keyframes battlePulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }

        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          93%, 97% { opacity: 1; }
        }

        @keyframes portalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes warriorStance {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }

        @keyframes spark {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(1.5); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
