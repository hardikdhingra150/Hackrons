class GameEngine {
    constructor(character1, character2) {
      this.player1 = {
        character: character1,
        currentHP: character1.health,
        maxHP: character1.health,
        effects: [],
      }
      
      this.player2 = {
        character: character2,
        currentHP: character2.health,
        maxHP: character2.health,
        effects: [],
      }
      
      this.turn = 1
      this.currentPlayer = this.player1.character.speed >= this.player2.character.speed ? 1 : 2
      this.battleLog = []
      this.isGameOver = false
      this.winner = null
    }
  
    calculateDamage(attacker, defender, isSpecialAttack = false) {
      let baseDamage = isSpecialAttack ? attacker.special : attacker.attack
      
      // Add randomness (±15%)
      const randomFactor = 0.85 + Math.random() * 0.3
      baseDamage *= randomFactor
      
      // Apply defense
      const damageReduction = defender.defense / (defender.defense + 100)
      const finalDamage = Math.floor(baseDamage * (1 - damageReduction))
      
      // Critical hit chance (10%)
      const isCritical = Math.random() < 0.1
      return {
        damage: isCritical ? finalDamage * 2 : finalDamage,
        isCritical,
      }
    }
  
    attack(attackerId, attackType = 'normal') {
      if (this.isGameOver) return null
  
      const attacker = attackerId === 1 ? this.player1 : this.player2
      const defender = attackerId === 1 ? this.player2 : this.player1
      
      const isSpecial = attackType === 'special'
      const { damage, isCritical } = this.calculateDamage(
        attacker.character,
        defender.character,
        isSpecial
      )
      
      defender.currentHP -= damage
      
      const logEntry = {
        turn: this.turn,
        attacker: attackerId,
        attackType,
        damage,
        isCritical,
        remainingHP: defender.currentHP,
      }
      
      this.battleLog.push(logEntry)
      
      // Check for game over
      if (defender.currentHP <= 0) {
        defender.currentHP = 0
        this.isGameOver = true
        this.winner = attackerId
      }
      
      // Switch turns
      this.currentPlayer = attackerId === 1 ? 2 : 1
      this.turn++
      
      return logEntry
    }
  
    defend(playerId) {
      const player = playerId === 1 ? this.player1 : this.player2
      
      // Defending reduces next incoming damage by 50% and heals 10%
      player.effects.push({
        type: 'defend',
        turns: 1,
        value: 0.5,
      })
      
      const healAmount = Math.floor(player.maxHP * 0.1)
      player.currentHP = Math.min(player.currentHP + healAmount, player.maxHP)
      
      this.battleLog.push({
        turn: this.turn,
        attacker: playerId,
        attackType: 'defend',
        healAmount,
        remainingHP: player.currentHP,
      })
      
      this.currentPlayer = playerId === 1 ? 2 : 1
      this.turn++
    }
  
    getGameState() {
      return {
        player1: {
          ...this.player1,
          hpPercentage: (this.player1.currentHP / this.player1.maxHP) * 100,
        },
        player2: {
          ...this.player2,
          hpPercentage: (this.player2.currentHP / this.player2.maxHP) * 100,
        },
        turn: this.turn,
        currentPlayer: this.currentPlayer,
        isGameOver: this.isGameOver,
        winner: this.winner,
        battleLog: this.battleLog,
      }
    }
  }
  
  export default GameEngine
  