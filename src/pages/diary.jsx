import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Diary = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    if (entry.trim() === "") return;
    const newEntries = [{ text: entry, date: new Date().toLocaleString() }, ...entries];
    setEntries(newEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(newEntries));
    setEntry("");
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 text-center" style={styles.background}>
      <h1 className="text-white fw-bold" style={styles.heading}>Diary</h1>
      <p className="text-light mb-4" style={styles.subText}>Express your thoughts and keep track of memories.</p>

      <div className="card p-4 shadow-lg w-50" style={styles.card}>
        <textarea
          className="form-control mb-3"
          rows="6"
          placeholder="Write your thoughts here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          style={styles.textarea}
        />
        <button className="btn btn-primary w-100" onClick={handleSave}>
          Save Entry
        </button>
      </div>

      <div className="card p-3 mt-4 shadow-lg w-50 overflow-auto" style={styles.entryCard}>
        <h3 className="text-center">Past Entries</h3>
        {entries.length === 0 ? (
          <p className="text-center text-muted">No entries yet.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {entries.map((entry, index) => (
              <li key={index} className="list-group-item" style={styles.entryItem}>
                <span className="text-muted small">{entry.date}</span>
                <p className="mb-0">{entry.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="btn btn-outline-light mt-4" onClick={() => navigate("/home")}>
        ⬅ Back to Home
      </button>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: `url('https://img.freepik.com/free-photo/arrangement-optimism-element-with-copy-space_23-2148861688.jpg?t=st=1742399971~exp=1742403571~hmac=eeef18950c1f62edd6351b9890974933b845ae8997241e194246ee2e705d0282&w=1380')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "50px",
    fontWeight: "bold",
    fontFamily: "'Times New Roman', serif",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
    color: "#3D405B",
  },
  subText: {
    fontSize: "22px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    color: "#3D405B",
  },
  card: {
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    backdropFilter: "blur(0px)",
  },
  textarea: {
    background: "rgba(248, 243, 243, 0.02)",
    borderRadius: "5px",
    fontSize: "16px",
    backdropFilter: "blur(1px)",
  },
  entryCard: {
    maxHeight: "200px",
    background: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(1px)",
  },
  entryItem: {
    background: "rgba(255, 255, 255, 0)",
    borderRadius: "5px",
    backdropFilter: "blur(0px)",
  },
};

export default Diary;
