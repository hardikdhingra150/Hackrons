import { useEffect } from 'react'
import '../styles/hero.css'


function Hero() {
  useEffect(() => {
    // Create Particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particlesContainer.appendChild(particle);
    }

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const diamonds = document.querySelectorAll('.diamond');
      diamonds.forEach((diamond, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        diamond.style.transform = `translate(-50%, -50%) rotate(45deg) translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      {/* Background Container */}
      <div className="background-container">
        {/* Geometric Patterns */}
        <div className="geometric-bg">
          <div className="diamond diamond-1"></div>
          <div className="diamond diamond-2"></div>
          <div className="diamond diamond-3"></div>
          <div className="diamond diamond-4"></div>
        </div>

        {/* Chevron Pattern */}
        <div className="chevron-pattern">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>

        {/* Glow Lines */}
        <div className="glow-line glow-line-1"></div>
        <div className="glow-line glow-line-2"></div>

        {/* Particles */}
        <div className="particles" id="particles"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>HACKRONS</h1>
          <p className="tagline">Battle Through Time. Own Your Legend.</p>
          <button className="cta-button" onClick={() => alert('🔥 Welcome to Hackrons!')}>
            Start Adventure
          </button>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Characters</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Eras</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Adventures</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
