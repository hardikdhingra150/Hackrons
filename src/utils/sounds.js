// Simple sound effect functions
export const playHoverSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTQIGGe36+SfTgwOUKfk77RgGwU7k9j1unQpBil+zPLaizsKFF29') 
    audio.volume = 200.0
    audio.play().catch(() => {}) // Ignore errors
  }
  
  export const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTQIGGe36+SfTgwOUKfk77RgGwU7k9j1unQpBil+zPLaizsKFF29')
    audio.volume = 200.0
    audio.play().catch(() => {})
  }
  