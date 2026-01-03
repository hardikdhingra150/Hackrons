// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HackronsMarketplace is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Character {
        string name;
        uint256 attack;
        uint256 defense;
        uint256 speed;
        uint256 health;
        uint256 special;
        string rarity;
        string imageURI;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => Character) public characters;
    mapping(address => uint256[]) public userCharacters;

    event CharacterMinted(address indexed buyer, uint256 tokenId, string name);
    event CharacterListed(uint256 tokenId, uint256 price);
    event CharacterBought(address indexed buyer, uint256 tokenId, uint256 price);

    constructor() ERC721("Hackrons", "HCKN") {}

    // Mint new character
    function mintCharacter(
        string memory name,
        uint256 attack,
        uint256 defense,
        uint256 speed,
        uint256 health,
        uint256 special,
        string memory rarity,
        string memory imageURI,
        uint256 price
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        characters[newTokenId] = Character({
            name: name,
            attack: attack,
            defense: defense,
            speed: speed,
            health: health,
            special: special,
            rarity: rarity,
            imageURI: imageURI,
            price: price,
            forSale: true
        });

        return newTokenId;
    }

    // Buy character
    function buyCharacter(uint256 tokenId) public payable {
        require(characters[tokenId].forSale, "Character not for sale");
        require(msg.value >= characters[tokenId].price, "Insufficient payment");

        characters[tokenId].forSale = false;
        _safeMint(msg.sender, tokenId);
        userCharacters[msg.sender].push(tokenId);

        // Transfer funds to contract owner
        payable(owner()).transfer(msg.value);

        emit CharacterBought(msg.sender, tokenId, msg.value);
    }

    // List character for sale (secondary market)
    function listCharacterForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        characters[tokenId].price = price;
        characters[tokenId].forSale = true;
        emit CharacterListed(tokenId, price);
    }

    // Remove from sale
    function removeFromSale(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        characters[tokenId].forSale = false;
    }

    // Get all characters for sale
    function getCharactersForSale() public view returns (uint256[] memory) {
        uint256 totalTokens = _tokenIds.current();
        uint256 forSaleCount = 0;

        for (uint256 i = 1; i <= totalTokens; i++) {
            if (characters[i].forSale) {
                forSaleCount++;
            }
        }

        uint256[] memory forSaleTokens = new uint256[](forSaleCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalTokens; i++) {
            if (characters[i].forSale) {
                forSaleTokens[index] = i;
                index++;
            }
        }

        return forSaleTokens;
    }

    // Get user's characters
    function getUserCharacters(address user) public view returns (uint256[] memory) {
        return userCharacters[user];
    }

    // Get character details
    function getCharacter(uint256 tokenId) public view returns (Character memory) {
        return characters[tokenId];
    }
}
