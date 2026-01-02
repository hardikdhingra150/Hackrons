import React from 'react';
import './FAQPage.css'; // We'll create this too

const FAQPage = () => {
  return (
    <div className="faq-page">
      {/* FAQ Navbar */}
      <nav className="faq-navbar">
        <div className="faq-nav-container">
          <h2>Help Center</h2>
          <div className="faq-nav-links">
            <a href="#overview">Game Overview</a>
            <a href="#rules">Game Rules</a>
            <a href="#characters">Characters</a>
            <a href="#nft">NFT & Tokens</a>
            <a href="#gameplay">How to Play</a>
            <a href="#support">Support</a>
          </div>
          <a href="/game" className="back-btn">← Back to Game</a>
        </div>
      </nav>
      
      {/* FAQ Content */}
      <div className="faq-content">
        
        <section id="overview">
          <h2>🎮 Game Overview</h2>
          
          <div className="faq-item">
            <h3>What is Hackrons?</h3>
            <p>Hackrons is a Web3 blockchain-based NFT fighting game where you collect unique characters as NFTs and battle other players.</p>
          </div>

          <div className="faq-item">
            <h3>What blockchain does Hackrons use?</h3>
            <p>Hackrons is built on Polygon network using POL tokens for transactions.</p>
          </div>

          <div className="faq-item">
            <h3>Do I need crypto to play?</h3>
            <p>You can start for FREE with 3 starter characters. To unlock premium characters, you'll need POL tokens.</p>
          </div>
        </section>

        <section id="rules">
          <h2>⚔️ Game Rules</h2>
          
          <div className="faq-item">
            <h3>How does combat work?</h3>
            <ul>
              <li>Each character starts with full HP</li>
              <li>Players take turns attacking</li>
              <li>Each character has unique abilities and stats</li>
              <li>First player to reduce opponent's HP to 0 wins</li>
            </ul>
          </div>

          <div className="faq-item">
            <h3>What are character stats?</h3>
            <p><strong>Attack:</strong> Damage dealt per hit<br/>
            <strong>Defense:</strong> Damage reduction<br/>
            <strong>Speed:</strong> Turn order priority<br/>
            <strong>Special:</strong> Unique ability power</p>
          </div>

          <div className="faq-item">
            <h3>Can I lose my character in battle?</h3>
            <p>No! Your NFT character is permanently yours. Losing doesn't affect NFT ownership.</p>
          </div>
        </section>

        <section id="characters">
          <h2>👾 Characters</h2>
          
          <div className="faq-item">
            <h3>How many characters are there?</h3>
            <p>21 total: 3 free starter characters + 18 premium NFT characters.</p>
          </div>

          <div className="faq-item">
            <h3>What are the free characters?</h3>
            <ul>
              <li>Cyber Samurai</li>
              <li>Chrono Knight</li>
              <li>Void Marine</li>
            </ul>
          </div>

          <div className="faq-item">
            <h3>How do I unlock premium characters?</h3>
            <p>Visit the Marketplace and purchase character NFTs using POL tokens. Once you own the NFT, the character is unlocked.</p>
          </div>

          <div className="faq-item">
            <h3>Can I own multiple characters?</h3>
            <p>Yes! Buy as many NFTs as you want. Each NFT unlocks that character.</p>
          </div>
        </section>

        <section id="nft">
          <h2>💎 NFTs & Tokens</h2>
          
          <div className="faq-item">
            <h3>What's the difference between POL tokens and NFTs?</h3>
            <p><strong>POL Tokens:</strong> Currency to buy things<br/>
            <strong>NFTs:</strong> The actual characters you own<br/>
            You spend POL tokens to purchase NFTs.</p>
          </div>

          <div className="faq-item">
            <h3>If I have lots of POL tokens, are characters unlocked?</h3>
            <p>No! You must SPEND tokens to BUY the NFT. Only NFT ownership unlocks characters.</p>
          </div>

          <div className="faq-item">
            <h3>How much do character NFTs cost?</h3>
            <p>Prices range from 0.5 POL to 2 POL depending on rarity. Check the Marketplace.</p>
          </div>
        </section>

        <section id="gameplay">
          <h2>🕹️ How to Play</h2>
          
          <div className="faq-item">
            <h3>How do I start playing?</h3>
            <ol>
              <li>Install MetaMask browser extension</li>
              <li>Connect MetaMask wallet to Hackrons</li>
              <li>Claim your FREE starter character</li>
              <li>Go to Battle Arena and fight!</li>
            </ol>
          </div>

          <div className="faq-item">
            <h3>Do I need MetaMask?</h3>
            <p>Yes! MetaMask is required to connect your wallet and verify NFT ownership.</p>
          </div>

          <div className="faq-item">
            <h3>Can I play against friends?</h3>
            <p>Yes! Use the "Private Match" option and share the room code.</p>
          </div>
        </section>

        <section id="support">
          <h2>🆘 Support</h2>
          
          <div className="faq-item">
            <h3>My transaction failed. What do I do?</h3>
            <p>Check if you have enough POL for gas fees. Ensure MetaMask is on Polygon network.</p>
          </div>

          <div className="faq-item">
            <h3>I bought an NFT but character is still locked?</h3>
            <p>Wait for transaction to confirm (1-2 minutes). Refresh the page.</p>
          </div>

          
        </section>

      </div>
    </div>
  );
};

export default FAQPage;
