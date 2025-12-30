import { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What is Hackrons?",
      answer: "Hackrons is a blockchain-based time-travel RPG where you collect NFT warriors from different eras and battle in cross-timeline arena fights."
    },
    {
      question: "How do I mint my first character?",
      answer: "Connect your wallet, choose your character class (Cyber Samurai, Chrono Knight, or Void Marine), and mint for 0.08 POL."
    },
    {
      question: "What is FLUX token?",
      answer: "FLUX is the in-game currency earned by winning battles and completing quests. Use it to upgrade characters or stake for passive rewards."
    },
    {
      question: "Can I trade my characters?",
      answer: "Yes! All characters are ERC-721 NFTs that can be freely traded on our marketplace or platforms like OpenSea."
    },
    {
      question: "What blockchain is Hackrons on?",
      answer: "Hackrons is built on Polygon for fast, low-cost transactions with Chainlink VRF for provably fair randomness."
    },
    {
      question: "When does the game launch?",
      answer: "Genesis NFT mint starts Q1 2025, with closed beta access. Public launch is planned for Q2 2025."
    }
  ]

  return (
    <section className="faq-section">
      <h2 className="faq-title"> Frequently Asked Questions</h2>
      
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-question">
              <span className={`faq-arrow ${openIndex === index ? 'open' : ''}`}>▶</span>
              {faq.question}
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
