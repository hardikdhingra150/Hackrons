// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HackronsNFT.sol";

contract HackronsGame {
    HackronsNFT public nftContract;
    
    struct CharacterStats {
        uint256 attack;
        uint256 defense;
        uint256 speed;
        uint256 health;
        uint256 special;
    }
    
    struct Player {
        address playerAddress;
        uint256 characterId;
        uint256 wins;
        uint256 losses;
        uint256 totalDamageDealt;
        uint256 gamesPlayed;
        uint256 experiencePoints;
        uint256 level;
    }
    
    struct Battle {
        uint256 battleId;
        address player1;
        address player2;
        uint256 character1Id;
        uint256 character2Id;
        address winner;
        uint256 timestamp;
        bool isCompleted;
    }
    
    struct Guild {
        string name;
        string tag;
        address leader;
        uint256 totalWins;
        uint256 level;
        uint256 memberCount;
        mapping(address => bool) members;
    }
    
    // Mappings
    mapping(address => Player) public players;
    mapping(uint256 => CharacterStats) public characterStats;
    mapping(uint256 => Battle) public battles;
    mapping(uint256 => Guild) public guilds;
    mapping(address => uint256) public playerGuild;
    
    // Leaderboard
    address[] public leaderboard;
    
    uint256 public battleCount;
    uint256 public guildCount;
    
    // Events
    event BattleCreated(uint256 battleId, address player1, address player2);
    event BattleCompleted(uint256 battleId, address winner, uint256 rewardAmount);
    event PlayerLevelUp(address player, uint256 newLevel);
    event GuildCreated(uint256 guildId, string name, address leader);
    event PlayerJoinedGuild(address player, uint256 guildId);
    
    constructor(address _nftContract) {
        nftContract = HackronsNFT(_nftContract);
        initializeCharacterStats();
    }
    
    function initializeCharacterStats() internal {
        // Free Characters
        characterStats[0] = CharacterStats(85, 70, 75, 1000, 80);  // Cyber Samurai
        characterStats[1] = CharacterStats(75, 85, 70, 1200, 75);  // Chrono Knight
        characterStats[2] = CharacterStats(90, 65, 80, 950, 85);   // Void Marine
        
        // Premium Characters
        characterStats[3] = CharacterStats(95, 75, 85, 1100, 90);  // Genesis Samurai
        characterStats[4] = CharacterStats(80, 90, 75, 1300, 85);  // Temporal Guardian
        characterStats[5] = CharacterStats(88, 78, 82, 1050, 88);  // Void Assassin
        characterStats[6] = CharacterStats(92, 80, 88, 1150, 92);  // Chrono Warrior
        characterStats[7] = CharacterStats(78, 88, 72, 1250, 80);  // Quantum Defender
        characterStats[8] = CharacterStats(100, 70, 95, 1000, 95); // Shadow Ronin
        characterStats[9] = CharacterStats(85, 85, 80, 1150, 85);  // Time Reaver
        characterStats[10] = CharacterStats(90, 75, 90, 1050, 90); // Void Specter
        characterStats[11] = CharacterStats(82, 92, 70, 1350, 82); // Eternal Sentinel
        characterStats[12] = CharacterStats(98, 72, 92, 1000, 98); // Chrono Blade
        characterStats[13] = CharacterStats(88, 82, 85, 1100, 88); // Quantum Samurai
        characterStats[14] = CharacterStats(95, 78, 88, 1080, 95); // Void Hunter
        characterStats[15] = CharacterStats(80, 95, 75, 1400, 80); // Time Guardian
        characterStats[16] = CharacterStats(92, 88, 82, 1200, 92); // Shadow Knight
        characterStats[17] = CharacterStats(85, 80, 88, 1100, 85); // Chrono Assassin
        characterStats[18] = CharacterStats(105, 65, 98, 950, 100);// Legendary Warrior
        characterStats[19] = CharacterStats(88, 88, 88, 1200, 88); // Ultimate Guardian
        characterStats[20] = CharacterStats(110, 70, 100, 1000, 105); // Mythic Champion
    }
    
    function createBattle(address opponent, uint256 myCharacterId, uint256 opponentCharacterId) external returns (uint256) {
        require(msg.sender != opponent, "Cannot battle yourself");
        require(nftContract.ownerOf(myCharacterId) == msg.sender || myCharacterId <= 2, "You don't own this character");
        
        battleCount++;
        
        battles[battleCount] = Battle({
            battleId: battleCount,
            player1: msg.sender,
            player2: opponent,
            character1Id: myCharacterId,
            character2Id: opponentCharacterId,
            winner: address(0),
            timestamp: block.timestamp,
            isCompleted: false
        });
        
        emit BattleCreated(battleCount, msg.sender, opponent);
        return battleCount;
    }
    
    function completeBattle(uint256 battleId, address winner) external {
        Battle storage battle = battles[battleId];
        require(!battle.isCompleted, "Battle already completed");
        require(winner == battle.player1 || winner == battle.player2, "Invalid winner");
        
        battle.winner = winner;
        battle.isCompleted = true;
        
        // Update player stats
        address loser = winner == battle.player1 ? battle.player2 : battle.player1;
        
        players[winner].wins++;
        players[winner].gamesPlayed++;
        players[winner].experiencePoints += 100;
        
        players[loser].losses++;
        players[loser].gamesPlayed++;
        players[loser].experiencePoints += 25;
        
        // Level up check
        if (players[winner].experiencePoints >= players[winner].level * 100) {
            players[winner].level++;
            emit PlayerLevelUp(winner, players[winner].level);
        }
        
        // Update leaderboard
        updateLeaderboard(winner);
        
        // Reward (can be POL tokens or in-game currency)
        uint256 reward = 1 ether / 100; // 0.01 POL
        payable(winner).transfer(reward);
        
        emit BattleCompleted(battleId, winner, reward);
    }
    
    function updateLeaderboard(address player) internal {
        bool exists = false;
        for (uint i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == player) {
                exists = true;
                break;
            }
        }
        
        if (!exists) {
            leaderboard.push(player);
        }
        
        // Sort leaderboard (bubble sort for simplicity)
        for (uint i = 0; i < leaderboard.length - 1; i++) {
            for (uint j = 0; j < leaderboard.length - i - 1; j++) {
                if (players[leaderboard[j]].wins < players[leaderboard[j + 1]].wins) {
                    address temp = leaderboard[j];
                    leaderboard[j] = leaderboard[j + 1];
                    leaderboard[j + 1] = temp;
                }
            }
        }
    }
    
    function createGuild(string memory name, string memory tag) external {
        guildCount++;
        Guild storage newGuild = guilds[guildCount];
        newGuild.name = name;
        newGuild.tag = tag;
        newGuild.leader = msg.sender;
        newGuild.level = 1;
        newGuild.memberCount = 1;
        newGuild.members[msg.sender] = true;
        
        playerGuild[msg.sender] = guildCount;
        
        emit GuildCreated(guildCount, name, msg.sender);
    }
    
    function joinGuild(uint256 guildId) external {
        require(playerGuild[msg.sender] == 0, "Already in a guild");
        require(guildId <= guildCount && guildId > 0, "Guild doesn't exist");
        
        Guild storage guild = guilds[guildId];
        guild.members[msg.sender] = true;
        guild.memberCount++;
        
        playerGuild[msg.sender] = guildId;
        
        emit PlayerJoinedGuild(msg.sender, guildId);
    }
    
    function getPlayerStats(address player) external view returns (Player memory) {
        return players[player];
    }
    
    function getCharacterStats(uint256 characterId) external view returns (CharacterStats memory) {
        return characterStats[characterId];
    }
    
    function getLeaderboard() external view returns (address[] memory) {
        return leaderboard;
    }
    
    function getBattle(uint256 battleId) external view returns (Battle memory) {
        return battles[battleId];
    }
    
    receive() external payable {}
}
