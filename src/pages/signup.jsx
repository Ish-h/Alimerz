import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiBrain } from "react-icons/gi";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    age: "",
    medicalCondition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("User signed up:", formData);
    navigate("/home"); // Redirect to Home after sign-up
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "url('https://c02.purpledshub.com/uploads/sites/41/2021/03/GettyImages-1186854394-c-5354ecf.jpg?w=1029&webp=1') center/cover no-repeat",
        
      }}
    >
      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="shadow-lg p-5 text-center rounded-3"
        style={{
          width: "500px",
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          fontFamily: "'Quicksand', sans-serif",
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
        <h5 className="text-muted" style={{ fontFamily: "'Quicksand', sans-serif" }}>Your Memory Companion</h5>

        <form onSubmit={handleSignUp} className="mt-4">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control shadow-sm"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              className="form-control shadow-sm"
              value={formData.phoneNumber}
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

          <div className="mb-3">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="form-control shadow-sm"
              value={formData.age}
              onChange={handleChange}
              required
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            />
          </div>

          <div className="mb-4">
            <select
              className="form-control shadow-sm"
              name="medicalCondition"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
              value={formData.medicalCondition}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Medical Condition</option>
              <option value="Alzheimer's">Alzheimer's</option>
              <option value="Dementia">Dementia</option>
              <option value="Memory Loss">Memory Loss</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100"
            style={{
              backgroundColor: "#E76F51",
              color: "white",
              borderRadius: "12px",
              fontWeight: "bold",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-3 text-muted" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          {" "}
          <span
            onClick={() => navigate("/login")}
            className="text-decoration-underline"
            style={{ color: "#E76F51", cursor: "pointer", fontWeight: "bold" }}
          >
            
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
