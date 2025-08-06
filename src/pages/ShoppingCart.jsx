import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const allItems = [
  "🍎 Apple", "🍌 Banana", "🥕 Carrot", "🍞 Bread",
  "🧀 Cheese", "🥛 Milk", "🍫 Chocolate", "🥚 Eggs",
  "🍊 Orange", "🍗 Chicken"
];

export default function ShoppingCartGame() {
  const [shoppingList, setShoppingList] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [incorrectSelection, setIncorrectSelection] = useState(false);
  const [showList, setShowList] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateShoppingList();
  }, []);

  function generateShoppingList() {
    const shuffledItems = [...allItems].sort(() => Math.random() - 0.5);
    const selectedItems = shuffledItems.slice(0, 4);
    const extraItems = shuffledItems.slice(4, 8); // Add distraction items
    setShoppingList(selectedItems);
    setChoices([...selectedItems, ...extraItems].sort(() => Math.random() - 0.5));
    setSelectedItems([]);
    setIncorrectSelection(false);
    setShowList(true);
    setMessage("");

    setTimeout(() => setShowList(false), 3000); // Hide list after 3 seconds
  }

  function handleSelection(item) {
    if (!selectedItems.includes(item)) {
      if (shoppingList.includes(item)) {
        setSelectedItems((prev) => [...prev, item]);
      } else {
        setIncorrectSelection(true);
        setMessage("❌ Wrong choice! Try again.");
      }
    }
  }

  useEffect(() => {
    if (selectedItems.length === shoppingList.length &&
        shoppingList.every(item => selectedItems.includes(item))) {
      setMessage("🎉 You remembered everything!");
    }
  }, [selectedItems, shoppingList]);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/home")}>⬅️ Back to Home</button>
      <button style={styles.challengeButton} onClick={() => navigate("/daily-challenge")}>🏆 Back to Daily Challenge</button>

      <h1 style={styles.title}>🛒 Shopping Cart Memory Game</h1>
      {showList ? (
        <div style={styles.listContainer}>
          <h2 style={styles.subtitle}>Memorize These Items:</h2>
          <ul style={styles.list}>
            {shoppingList.map((item, index) => (
              <li key={index} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={styles.selectionContainer}>
          <h2 style={styles.subtitle}>Select the items you remember:</h2>
          <div style={styles.choicesGrid}>
            {choices.map((item, index) => (
              <button
                key={index}
                style={{
                  ...styles.choiceButton,
                  backgroundColor: selectedItems.includes(item)
                    ? "#4CAF50" // Green for correct
                    : incorrectSelection && !shoppingList.includes(item)
                    ? "#FF6347" // Red for incorrect
                    : "#ffeb3b", // Default yellow
                  color: selectedItems.includes(item) ? "#fff" : "#333",
                  cursor: selectedItems.includes(item) ? "not-allowed" : "pointer",
                }}
                onClick={() => handleSelection(item)}
                disabled={selectedItems.includes(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
      <button style={styles.resetButton} onClick={generateShoppingList}>🔄 Play Again</button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    position: "relative",
    backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/009/877/974/non_2x/pixel-art-shopping-street-with-shops-and-avenue-with-lamp-and-trees-cityscape-background-for-8bit-game-vector.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backdropFilter: "blur(5px)",
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
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
  },
  listContainer: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#555",
    margin: "5px 0",
  },
  selectionContainer: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  },
  choicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    gap: "10px",
  },
  choiceButton: {
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "#ffeb3b",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "20px",
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
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};
