import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiBrain } from "react-icons/gi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Please enter your name and password!");
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "url('https://img.freepik.com/free-vector/light-bulb-energy-saving-lamp-glasses-mind-thinking-solution-abstract-low-poly-wireframe-mesh-design-from-connecting-dot-line-vector-illustration-blue-background_587448-490.jpg?t=st=1742401109~exp=1742404709~hmac=9194a77e90e0d0ee6d91d4577359e5e16568041857f94e7e3767f2b79033ad0e&w=1380') center/cover no-repeat",
      }}
    >
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-lg p-5 text-center rounded-3"
        style={{ 
          width: "500px", 
          height: "500px", 
          backdropFilter: "blur(1px)", 
          backgroundColor: "rgba(255, 255, 255, 0.7)", 
          fontFamily: "'Quicksand', sans-serif"
        }}
      >
        {/* Memory-Themed Avatar */}
        <div className="d-flex justify-content-center mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{
              width: "100px",
              height: "100px",
              background: "#E9C46A",
            }}
          >
            <GiBrain size={50} color="white" />
          </div>
        </div>

        <h1 className="fw-bold" style={{ color: "#3D405B", fontFamily: "'Times', cursive" }}>Alimerz</h1>
        <h5 className="text-muted" style={{ fontFamily: "'Times', cursive" }}>Remembering for you so you dont have to</h5>

        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="form-control shadow-sm"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control shadow-sm"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </div>

          {/* Soft Modern Button */}
          <button
            type="submit"
            className="btn btn-lg w-100"
            style={{ backgroundColor: "#E76F51", color: "white", borderRadius: "12px", fontWeight: "bold", fontFamily: "'Quicksand', sans-serif" }}
          >
            Login
          </button>
        </form>

        {/* Sign Up */}
        <p className="mt-3 text-muted" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          No account? {" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-decoration-underline"
            style={{ color: "#E76F51", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;