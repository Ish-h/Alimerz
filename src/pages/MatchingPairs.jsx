import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation

const cardsArray = [
  "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🥕", "🥕", "🌽", "🌽"
];

export default function MatchingPairs() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setCards(shuffleArray(cardsArray));
  }, []);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleCardClick(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped([...flipped, index]);
  }

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setTimeout(checkMatch, 1000);
    }
  }, [flipped]);

  function checkMatch() {
    const [first, second] = flipped;
    if (cards[first] === cards[second]) {
      setMatched([...matched, first, second]);
    }
    setFlipped([]);
    setDisabled(false);
    setMoves(moves + 1);
  }

  function resetGame() {
    setCards(shuffleArray(cardsArray));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  return (
    <div style={styles.gameContainer}>
      {/* Back to Home Button */}
      <button style={styles.backButton} onClick={() => navigate("/home")}>⬅️ Back to Home</button>
      <button style={styles.challengeButton} onClick={() => navigate("/daily-challenge")}>🏆 Back to Daily Challenge</button>
      <h1 style={styles.title}>🎴 Matching Pairs</h1>
      <p style={styles.moves}>Moves: {moves}</p>
      
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: flipped.includes(index) || matched.includes(index) ? "#fff" : "#444",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            onClick={() => !disabled && handleCardClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </div>
        ))}
      </div>

      {matched.length === cards.length && <p style={styles.winMessage}>🎉 You Won in {moves} moves! 🎉</p>}

      <button style={styles.resetButton} onClick={resetGame}>🔄 Restart</button>
    </div>
  );
}

const styles = {
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    position: "relative",
    backgroundImage: `url("https://t3.ftcdn.net/jpg/00/88/98/18/360_F_88981880_YjJManMJ6hJmKr5CZteFJAkEzXIh8mxW.jpg")`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "#fff",
    color: "#764ba2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
  },
  moves: {
    fontSize: "22px",
    color: "#fff",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 90px)", // Bigger grid for better UI
    gap: "12px",
    justifyContent: "center",
  },
  card: {
    width: "90px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    transition: "0.3s",
  },
  winMessage: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#ffdd57",
    marginTop: "20px",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
  },
  resetButton: {
    marginTop: "20px",
    padding: "12px 20px",
    fontSize: "20px",
    fontWeight: "bold",
    background: "#fff",
    color: "#764ba2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  challengeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 15px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "#fff",
    color: "#ff9800",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};
