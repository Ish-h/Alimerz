import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = ["Daily Tasks", "Shopping", "Study", "Books of the Week", "Others"];

const Todo = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (category, task) => {
    if (!task.trim()) return;
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks, [category]: [...(prevTasks[category] || []), { text: task, completed: false }] };
      return updatedTasks;
    });
  };

  const toggleTask = (category, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = [...updatedTasks[category]];
      updatedTasks[category][index] = {
        ...updatedTasks[category][index],
        completed: !updatedTasks[category][index].completed,
      };
      return updatedTasks;
    });
  };

  const deleteTask = (category, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = updatedTasks[category].filter((_, i) => i !== index);
      return updatedTasks;
    });
  };

  return (
    <div className="container-fluid text-center min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/desk-workspace-with-various-elements_23-2148043237.jpg?t=st=1742400695~exp=1742404295~hmac=7a7c41fe42ce42d63f5faf78c0d1cd775746d42536af4ae753d81f6291e06f19&w=1380)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <button className="btn btn-danger position-absolute top-0 end-0 m-3" onClick={() => navigate("/home")}>🏠 Home</button>
      <h1 className="display-4 fw-bold">📝 To-Do List</h1>
      <p className="lead">Organize your tasks efficiently!</p>

      <div className="row w-100 mt-4 justify-content-center">
        {categories.map((category) => (
          <div key={category} className="col-md-4 mb-4">
            <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
              <div className="card-body bg-light">
                <h3 className="card-title text-dark">{category}</h3>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder={`Add a ${category.toLowerCase()} task...`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask(category, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                
                {tasks[category]?.length > 0 ? (
                  tasks[category].map((t, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center p-2 border rounded mb-2" style={{ background: t.completed ? "#f8f9fa" : "#f8f9fa" }}>
                      <span className={t.completed ? "text-muted text-decoration-line-through" : "text-dark"}>{t.text}</span>
                      <div>
                        <button className="btn btn-sm btn-success me-2" onClick={() => toggleTask(category, index)}>
                          {t.completed ? "🔄" : "✔️"}
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteTask(category, index)}>❌</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No tasks yet!</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
