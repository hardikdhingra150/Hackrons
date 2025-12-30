import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [location])

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      background: 'transparent',  // ✅ ADDED THIS
      minHeight: '100vh',         // ✅ ADDED THIS
      width: '100%'               // ✅ ADDED THIS
    }}>
      {children}
    </div>
  )
}

export default PageTransition
