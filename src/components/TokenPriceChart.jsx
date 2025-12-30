import { useState, useEffect } from 'react'

function TokenPriceChart() {
  const [price, setPrice] = useState(0.45)
  const [change, setChange] = useState(0)
  const [priceHistory, setPriceHistory] = useState([0.42, 0.43, 0.44, 0.45, 0.46, 0.45, 0.47, 0.45])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 0.02
      const newPrice = Math.max(0.1, price + randomChange)
      const percentChange = ((newPrice - price) / price) * 100
      
      setPrice(newPrice)
      setChange(percentChange)
      setPriceHistory(prev => [...prev.slice(1), newPrice])
    }, 5000)

    return () => clearInterval(interval)
  }, [price])

  const maxPrice = Math.max(...priceHistory)
  const minPrice = Math.min(...priceHistory)

  return (
    <section style={{
      position: 'relative',
      zIndex: 10,
      padding: '80px 60px',
      background: 'rgba(10, 5, 8, 0.5)'
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
        📈 FLUX Token Price
      </h2>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(10, 5, 8, 0.8)',
        padding: '40px',
        borderRadius: '20px',
        border: '2px solid #FFB000'
      }}>
        {/* Current Price */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#FFD700',
            marginBottom: '10px'
          }}>
            ${price.toFixed(4)}
          </div>
          <div style={{
            fontSize: '18px',
            color: change >= 0 ? '#00FF00' : '#FF0000',
            fontWeight: 'bold'
          }}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}% (24h)
          </div>
        </div>

        {/* Simple Chart */}
        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          marginBottom: '30px',
          padding: '20px',
          background: 'rgba(255, 176, 0, 0.05)',
          borderRadius: '15px'
        }}>
          {priceHistory.map((p, i) => {
            const height = ((p - minPrice) / (maxPrice - minPrice)) * 100
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  background: i === priceHistory.length - 1 
                    ? 'linear-gradient(to top, #FF6A00, #FFD700)'
                    : 'linear-gradient(to top, #CC5500, #FFB000)',
                  borderRadius: '5px 5px 0 0',
                  transition: 'height 0.5s ease',
                  position: 'relative',
                  boxShadow: '0 0 20px rgba(255, 176, 0, 0.4)'
                }}
              />
            )
          })}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 176, 0, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8B4513', fontSize: '12px', marginBottom: '8px' }}>24h Volume</div>
            <div style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold' }}>$2.4M</div>
          </div>
          <div style={{
            background: 'rgba(255, 176, 0, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8B4513', fontSize: '12px', marginBottom: '8px' }}>Market Cap</div>
            <div style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold' }}>$45M</div>
          </div>
          <div style={{
            background: 'rgba(255, 176, 0, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8B4513', fontSize: '12px', marginBottom: '8px' }}>Circulating Supply</div>
            <div style={{ color: '#FFD700', fontSize: '20px', fontWeight: 'bold' }}>100M</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TokenPriceChart
