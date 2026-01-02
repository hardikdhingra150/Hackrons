import { useState } from 'react'
import cyberSamurai from '../assets/images/character/cyber-samurai.png'
import chronoKnight from '../assets/images/character/chrono-knight.png'
import voidMarine from '../assets/images/character/void-marine.png'

const characters = [
  {
    id: 1,
    name: 'Cyber Samurai',
    class: 'Samurai',
    era: 'Ancient Japan',
    stats: { str: 85, agi: 95, def: 70 },
    rarity: 'Legendary',
    color: '#FF006E',
    image: cyberSamurai,
    description: 'Masters of agility and melee combat from Ancient Japan'
  },
  {
    id: 2,
    name: 'Chrono Knight',
    class: 'Knight',
    era: 'Medieval Europe',
    stats: { str: 90, agi: 60, def: 95 },
    rarity: 'Epic',
    color: '#FFB000',
    image: chronoKnight,
    description: 'Defenders with unbreakable shields from Medieval Europe'
  },
  {
    id: 3,
    name: 'Void harignton',
    class: 'Marine',
    era: 'Future Mars',
    stats: { str: 75, agi: 80, def: 85 },
    rarity: 'Rare',
    color: '#FF6A00',
    image: voidMarine,
    description: 'Tech warriors with advanced weaponry from Future Mars'
  }
]

function CharacterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextCharacter = () => {
    setActiveIndex((prev) => (prev + 1) % characters.length)
  }

  const prevCharacter = () => {
    setActiveIndex((prev) => (prev - 1 + characters.length) % characters.length)
  }

  const activeChar = characters[activeIndex]

  return (
    <section className="character-carousel">
      <h2 className="carousel-title">Choose Your Legend</h2>
      
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevCharacter}>‹</button>
        
        <div className="character-display">
          <div 
            className="character-card" 
            style={{ borderColor: activeChar.color }}
          >
            <div className="character-icon">
              <img 
                src={activeChar.image} 
                alt={activeChar.name}
                className="character-image"
              />
            </div>
            
            <h3 className="character-name">{activeChar.name}</h3>
            <div className="character-class" style={{ color: activeChar.color }}>
              {activeChar.class}
            </div>
            <div className="character-era">Era: {activeChar.era}</div>
            <div 
              className="character-rarity" 
              style={{ 
                borderColor: activeChar.color,
                color: activeChar.color 
              }}
            >
              {activeChar.rarity}
            </div>
            
            <div className="character-stats">
              <div className="stat">
                <span>STR</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill" 
                    style={{ 
                      width: `${activeChar.stats.str}%`, 
                      backgroundColor: activeChar.color 
                    }}
                  ></div>
                </div>
                <span>{activeChar.stats.str}</span>
              </div>
              <div className="stat">
                <span>AGI</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill" 
                    style={{ 
                      width: `${activeChar.stats.agi}%`, 
                      backgroundColor: activeChar.color 
                    }}
                  ></div>
                </div>
                <span>{activeChar.stats.agi}</span>
              </div>
              <div className="stat">
                <span>DEF</span>
                <div className="stat-bar">
                  <div 
                    className="stat-fill" 
                    style={{ 
                      width: `${activeChar.stats.def}%`, 
                      backgroundColor: activeChar.color 
                    }}
                  ></div>
                </div>
                <span>{activeChar.stats.def}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="carousel-btn next" onClick={nextCharacter}>›</button>
      </div>
      
      <div className="carousel-indicators">
        {characters.map((char, idx) => (
          <button
            key={char.id}
            className={`indicator ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            style={{ 
              backgroundColor: idx === activeIndex ? char.color : 'transparent',
              borderColor: char.color
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default CharacterCarousel
