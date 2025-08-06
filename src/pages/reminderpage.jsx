import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const ReminderPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reminderText, setReminderText] = useState("");
  const [reminders, setReminders] = useState([]);
  const [dailyAlarmTime, setDailyAlarmTime] = useState("");

  useEffect(() => {
    localforage.getItem("reminders").then((data) => setReminders(data || []));
    localforage.getItem("dailyAlarmTime").then((time) => setDailyAlarmTime(time || ""));
  }, []);

  const handleAddReminder = () => {
    if (reminderText.trim() === "") return;
    const newReminder = { date: selectedDate.toDateString(), text: reminderText };
    const updatedReminders = [...reminders, newReminder];

    setReminders(updatedReminders);
    localforage.setItem("reminders", updatedReminders);
    setReminderText("");
  };

  const handleDailyAlarmChange = (e) => {
    setDailyAlarmTime(e.target.value);
    localforage.setItem("dailyAlarmTime", e.target.value);
  };

  return (
    <div style={styles.container}>
      <button style={styles.homeButton} onClick={() => navigate("/home")}>🏠 Home</button>
      <h1 style={styles.heading}>📅 Reminder System</h1>

      <div className="glass-card" style={styles.card}>
        <label style={styles.label}>Set Daily Alert:</label>
        <input type="time" value={dailyAlarmTime} onChange={handleDailyAlarmChange} style={styles.input} />

        <div style={styles.calendarContainer}>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        <input 
          type="text" 
          placeholder="Add a reminder..." 
          value={reminderText} 
          onChange={(e) => setReminderText(e.target.value)} 
          style={styles.input} 
        />

        <button onClick={handleAddReminder} style={styles.button}>➕ Add Reminder</button>
      </div>

      <h3 style={styles.subheading}>📌 Your Reminders</h3>
      <div style={styles.reminderContainer}>
        {reminders.length === 0 ? (
          <p style={styles.emptyText}>No reminders yet. Add one above! ✨</p>
        ) : (
          reminders.map((reminder, index) => (
            <div key={index} style={styles.reminderCard}>
              <strong>{reminder.date}</strong>
              <p>{reminder.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundImage: `url('https://img.freepik.com/free-photo/white-alarm-clock-sticker-with-inscription-now-blue-background_169016-33722.jpg?t=st=1742400833~exp=1742404433~hmac=4ee8b245932a24974f24b515c788c7749d9eda82a8292cd179cda001c67d7e21&w=1380')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  },
  homeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#3D405B",
    color: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#3D405B",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Playfair Display', serif",
  },
  subheading: {
    fontSize: "24px",
    color: "#3D405B",
    marginTop: "20px",
    fontFamily: "'Playfair Display', serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    padding: "30px",
    width: "50%",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  label: {
    fontSize: "18px",
    color: "#3D405B",
    fontWeight: "bold",
  },
  input: {
    borderRadius: "10px",
    padding: "12px",
    border: "1px solid rgba(213, 172, 172, 0.5)",
    outline: "none",
    fontSize: "16px",
    background: "rgba(147, 147, 185, 0.2)",
    color: "#3D405B",
    width: "80%",
    margin: "10px auto",
    display: "block",
  },
  button: {
    background: "#3D405B",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "10px",
    width: "100%",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "fit-content",
  },
  reminderContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  reminderCard: {
    background: "rgba(255, 255, 255, 0.3)",
    padding: "15px",
    borderRadius: "10px",
    width: "250px",
    margin: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    color: "#3D405B",
  },
  emptyText: {
    color: "#3D405B",
    fontSize: "18px",
    fontStyle: "italic",
  },
};

export default ReminderPage;