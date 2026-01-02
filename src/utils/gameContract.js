import Web3 from 'web3'
import HackronsGameABI from '../contracts/HackronsGame.json'

const GAME_CONTRACT_ADDRESS = process.env.REACT_APP_GAME_CONTRACT_ADDRESS

class GameContractService {
  constructor() {
    this.web3 = null
    this.contract = null
    this.account = null
  }

  async initialize(account) {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum)
      this.account = account
      this.contract = new this.web3.eth.Contract(
        HackronsGameABI.abi,
        GAME_CONTRACT_ADDRESS
      )
    }
  }

  // Create a battle on-chain
  async createBattle(opponentAddress, myCharacterId, opponentCharacterId) {
    try {
      const result = await this.contract.methods
        .createBattle(opponentAddress, myCharacterId, opponentCharacterId)
        .send({ from: this.account })
      
      const battleId = result.events.BattleCreated.returnValues.battleId
      return battleId
    } catch (error) {
      console.error('Error creating battle:', error)
      throw error
    }
  }

  // Complete a battle and record winner
  async completeBattle(battleId, winnerAddress) {
    try {
      const result = await this.contract.methods
        .completeBattle(battleId, winnerAddress)
        .send({ from: this.account })
      
      return result
    } catch (error) {
      console.error('Error completing battle:', error)
      throw error
    }
  }

  // Get player stats
  async getPlayerStats(playerAddress) {
    try {
      const stats = await this.contract.methods
        .getPlayerStats(playerAddress)
        .call()
      
      return {
        wins: parseInt(stats.wins),
        losses: parseInt(stats.losses),
        gamesPlayed: parseInt(stats.gamesPlayed),
        experiencePoints: parseInt(stats.experiencePoints),
        level: parseInt(stats.level),
        totalDamageDealt: parseInt(stats.totalDamageDealt),
      }
    } catch (error) {
      console.error('Error getting player stats:', error)
      throw error
    }
  }

  // Get character stats from contract
  async getCharacterStats(characterId) {
    try {
      const stats = await this.contract.methods
        .getCharacterStats(characterId)
        .call()
      
      return {
        attack: parseInt(stats.attack),
        defense: parseInt(stats.defense),
        speed: parseInt(stats.speed),
        health: parseInt(stats.health),
        special: parseInt(stats.special),
      }
    } catch (error) {
      console.error('Error getting character stats:', error)
      throw error
    }
  }

  // Get leaderboard
  async getLeaderboard() {
    try {
      const leaderboardAddresses = await this.contract.methods
        .getLeaderboard()
        .call()
      
      // Get stats for each player
      const leaderboard = await Promise.all(
        leaderboardAddresses.map(async (address) => {
          const stats = await this.getPlayerStats(address)
          return {
            address,
            ...stats,
          }
        })
      )
      
      return leaderboard
    } catch (error) {
      console.error('Error getting leaderboard:', error)
      throw error
    }
  }

  // Get battle details
  async getBattle(battleId) {
    try {
      const battle = await this.contract.methods.getBattle(battleId).call()
      
      return {
        battleId: parseInt(battle.battleId),
        player1: battle.player1,
        player2: battle.player2,
        character1Id: parseInt(battle.character1Id),
        character2Id: parseInt(battle.character2Id),
        winner: battle.winner,
        timestamp: parseInt(battle.timestamp),
        isCompleted: battle.isCompleted,
      }
    } catch (error) {
      console.error('Error getting battle:', error)
      throw error
    }
  }

  // Create a guild
  async createGuild(name, tag) {
    try {
      const result = await this.contract.methods
        .createGuild(name, tag)
        .send({ from: this.account })
      
      const guildId = result.events.GuildCreated.returnValues.guildId
      return guildId
    } catch (error) {
      console.error('Error creating guild:', error)
      throw error
    }
  }

  // Join a guild
  async joinGuild(guildId) {
    try {
      await this.contract.methods
        .joinGuild(guildId)
        .send({ from: this.account })
      
      return true
    } catch (error) {
      console.error('Error joining guild:', error)
      throw error
    }
  }

  // Get player's guild
  async getPlayerGuild(playerAddress) {
    try {
      const guildId = await this.contract.methods
        .playerGuild(playerAddress)
        .call()
      
      return parseInt(guildId)
    } catch (error) {
      console.error('Error getting player guild:', error)
      throw error
    }
  }
}

export default new GameContractService()
