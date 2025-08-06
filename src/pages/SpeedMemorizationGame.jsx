import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const allWords = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet",
  "123", "456", "789", "101", "202", "303", "404", "505", "606", "707"
];

export default function SpeedMemorizationGame() {
  const [memorizeList, setMemorizeList] = useState([]);
  const [choices, setChoices] = useState([]);
  const [showList, setShowList] = useState(true);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateMemorizationSet();
  }, []);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerActive(false);
      checkResults();
    }
  }, [timeLeft]);

  function generateMemorizationSet() {
    const shuffledItems = [...allWords].sort(() => Math.random() - 0.5);
    const memorizedItems = shuffledItems.slice(0, 5);
    const extraItems = shuffledItems.slice(5, 10);
    
    setMemorizeList(memorizedItems);
    setChoices([...memorizedItems, ...extraItems].sort(() => Math.random() - 0.5));
    setShowList(true);
    setSelected([]);
    setMessage("");
    setTimeLeft(15);
    setTimerActive(false);
    setGameOver(false);

    setTimeout(() => {
      setShowList(false);
      setTimerActive(true);
    }, 5000);
  }

  function handleSelection(item) {
    if (!timerActive || gameOver) return;

    if (!memorizeList.includes(item)) {
      setMessage("❌ Oops! Try again!");
      setGameOver(true);
      setTimerActive(false);
      return;
    }

    setSelected((prev) => [...prev, item]);

    if ([...selected, item].length === memorizeList.length) {
      checkResults([...selected, item]);
    }
  }

  function checkResults(finalSelection = selected) {
    const selectedSet = new Set(finalSelection);
    const correctSet = new Set(memorizeList);

    if (selectedSet.size !== correctSet.size) {
      setMessage("❌ Oops! Try again!");
      return;
    }

    for (let word of correctSet) {
      if (!selectedSet.has(word)) {
        setMessage("❌ Oops! Try again!");
        return;
      }
    }

    setMessage("🎉 Well Done! You remembered everything!");
    setGameOver(true);
    setTimerActive(false);
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center" style={styles.container}>
      <button className="btn btn-light position-absolute top-0 start-0 m-3" onClick={() => navigate("/home")}>
        ⬅️ Back to Home
      </button>
      <button style={styles.challengeButton} onClick={() => navigate("/daily-challenge")}>🏆 Back to Daily Challenge</button>
      <h1 className="text-white fw-bold">⚡ Speed Memorization Game</h1>

      {showList ? (
        <div className="p-3 bg-white rounded shadow">
          <h2 className="text-dark">Memorize These:</h2>
          <ul className="list-unstyled">
            {memorizeList.map((item, index) => (
              <li key={index} className="fw-bold text-primary">{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-3 bg-white rounded shadow">
          <h2 className="text-dark">Select the words/numbers you remember:</h2>
          <p className="fw-bold text-danger">Time Left: {timeLeft}s</p>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {choices.map((item, index) => (
              <button 
                key={index} 
                className={`btn ${selected.includes(item) ? "btn-success" : "btn-warning"}`} 
                onClick={() => handleSelection(item)}
                disabled={selected.includes(item) || gameOver}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {message && <p className="fw-bold text-success mt-3">{message}</p>}
      <button className="btn btn-primary mt-3" onClick={generateMemorizationSet}>🔄 Play Again</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: "url('https://opengameart.org/sites/default/files/1_219.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
