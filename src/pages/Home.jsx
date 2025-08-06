import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbot from "../pages/Chatbot"; // ✅ Ensure this file exists

const Home = () => {
  const navigate = useNavigate();
 
  return (
    <div className="container-fluid p-0">
      {/* Logo and Name at Top Left */}
      <div className="position-absolute top-0 start-0 m-4 d-flex align-items-center">
        <GiBrain size={50} color="white" className="me-2" />
        <h1 className="text-white fw-bold m-0" style={{ fontFamily: "Times, serif" }}>Alimerz</h1>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-cover" style={styles.background}>
        <div style={{ marginTop: "-50px", fontFamily: "sans-serif" }}>
          <h1 className="text-white fw-bold">Welcome to Alimerz</h1>
          <p className="text-light fw-semibold" style={{ fontSize: "1.3rem" }}>
            Your personal assistant for managing daily tasks and memories.
          </p>
          
          {/* Buttons in 2x2 Grid */}
          <div className="row mt-4 w-100 justify-content-center" style={{ fontFamily: "sans-serif" }}>
            {buttons.map((btn, index) => (
              <div key={index} className="col-md-5 col-sm-6 mb-3 d-flex justify-content-center">
                <div className="card text-center shadow border-0 p-3" style={{ backgroundColor: "rgba(77, 74, 137, 0.56)", width: "200px" }}>
                  <div className="card-body">
                    <h5 className="card-title text-white">{btn.icon} {btn.text}</h5>
                    <button className="btn btn-outline-light mt-2" onClick={() => navigate(btn.path)}>More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

const buttons = [
  { text: "Diary Entry", path: "/diary", icon: "📖" },
  { text: "Reminder System", path: "/reminder", icon: "⏰" },
  { text: "To-Do List", path: "/todo", icon: "✅" },
  { text: "Daily Challenge", path: "/daily-challenge", icon: "🎯" },
];

// Custom styles
const styles = {
  background: {
    backgroundImage: `url('https://bigthink.com/wp-content/uploads/2022/01/fakurian-design-58Z17lnVS4U-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  
};

export default Home;
