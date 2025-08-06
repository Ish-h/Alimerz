import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// List of games with names, descriptions, and routes
const games = [
  {
    name: "Matching Tiles",
    description: "Find and match identical tiles.",
    route: "/game/matching",
  },
  {
    name: "Speed Memorization",
    description: "Memorize items as fast as possible.",
    route: "/game/speedmemorization",
  },
  {
    name: "Shopping Cart Challenge",
    description: "Remember and recall shopping items.",
    route: "/game/shopping",
  },
];

export default function DailyChallenge() {
  const [selectedGame, setSelectedGame] = useState(
    games[Math.floor(Math.random() * games.length)]
  );
  const navigate = useNavigate();

  function changeGame() {
    setSelectedGame(games[Math.floor(Math.random() * games.length)]);
  }

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark position-relative"
      style={{
        backgroundImage:
          "url(https://marketplace.canva.com/EAFhNvsW9m8/1/0/1600w/canva-colorful-hand-drawn-there-is-there-are-memory-game-true-or-false-quiz-presentation-t5Ma8swgCoM.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Back to Home Button - More Visible */}
      <button
        className="btn btn-light position-absolute top-0 end-0 m-3 fw-bold"
        style={{ color: "brown", border: "2px solid brown" }}
        onClick={() => navigate("/home")}
      >
        ⬅️ Back to Home
      </button>

      <div
        className="card text-center shadow-lg"
        style={{
          width: "29rem", // Increased the card width
          borderRadius: "15px",
          marginTop: "90px", // Moves the card slightly downward
          background: "rgba(255, 255, 255, 0.49)", // Translucent effect
          backdropFilter: "blur(0px)", // Adds a blur effect for a modern feel
          // Brown border
        }}
      >
        <div className="card-body" style={{ color: "brown" }}>
          <h2 className="card-title" style={{ color: "brown" }}>
            {selectedGame.name}
          </h2>
          <p className="card-text">{selectedGame.description}</p>
          <button
            className="btn w-100 mb-2"
            style={{ background: "white", color: "brown" }}
            onClick={() => navigate(selectedGame.route)}
          >
            🎮 Play Now
          </button>
          <button
            className="btn w-100 mb-2"
            style={{ background: "white", color: "brown" }}
            onClick={changeGame}
          >
            🔄 Change Game
          </button>
        </div>
      </div>
    </div>
  );
}
