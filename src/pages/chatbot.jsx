import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatbotstyles.css"; // Ensure CSS is imported

function Chatbot() {
  const [userMessage, setUserMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    setLoading(true);
    setChatbotResponse(""); // Clear previous response

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        userMessage: trimmedMessage,
      });
      setChatbotResponse(response.data.message);
    } catch (error) {
      console.error("Error fetching response:", error.response || error.message);
      setChatbotResponse("Sorry, there was an error processing your request.");
    }
    
    setLoading(false);
    setUserMessage(""); // Clear input after sending
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        💬 Chat
      </button>

      {/* Chatbox Container */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot">
            <button className="close-chat" onClick={() => setIsOpen(false)}>✖</button>
            <h4 className="text-center">AI Chatbot</h4>

            {/* Chat Input */}
            <div className="chat-input">
              <input
                type="text"
                value={userMessage}
                onChange={handleMessageChange}
                placeholder="Ask me something..."
                disabled={loading}
              />
              <button onClick={handleSendMessage} disabled={loading || !userMessage.trim()}>
                {loading ? "Loading..." : "Send"}
              </button>
            </div>

            {/* Chatbot Response */}
            {chatbotResponse && (
              <div className="chat-response">
                <strong>Chatbot:</strong> {chatbotResponse}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
