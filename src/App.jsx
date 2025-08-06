// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Login from "./pages/loginpage";
import Signup from "./pages/Signup";
import Diary from "./pages/Diary";
import Todo from "./pages/todo";
import ReminderPage from "./pages/ReminderPage";
import DailyChallenge from "./pages/DailyChallenge";
import MatchingPairs from "./pages/matchingpairs";
import ShoppingCartGame from "./pages/shoppingcart";
import SpeedMemorizationGame from "./pages/SpeedMemorizationGame";
import Chatbot from "./pages/Chatbot"; // Import Chatbot component
import ErrorBoundary from "./components/errorboundary"; // Import the ErrorBoundary component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(loggedIn);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/reminder" element={<ReminderPage />} />
            <Route path="/daily-challenge" element={<DailyChallenge />} />
            <Route path="/game/matching" element={<MatchingPairs />} />
            <Route path="/game/shopping" element={<ShoppingCartGame />} />
            <Route path="/game/speedmemorization" element={<SpeedMemorizationGame />} />
            <Route path="/home" element={<Chatbot />} />

          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {/* Always render the Chatbot (at the bottom-right) if authenticated */}
      {isAuthenticated && (
        <ErrorBoundary>
          <Chatbot />
        </ErrorBoundary>
      )}
    </Router>
  );
};

export default App;
