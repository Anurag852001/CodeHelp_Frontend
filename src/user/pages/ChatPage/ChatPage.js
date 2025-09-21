import { useState } from "react";
import styles from "./ChatPage.module.css";
import { useEffect } from "react";
import { chatApi } from "../../../apiUtils/apiCalls";

function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      content: 'Hi! I\'m your coding assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    addMessage(userMessage, 'user');
    setIsLoading(true);
    setError("");

    try {
      const response = await chatApi(userMessage);
      if (response && response.response && response.response.response) {
        addMessage(response.response.response, 'bot');
      } else {
        addMessage("Sorry, I couldn't process your request. Please try again.", 'bot');
      }
    } catch (err) {
      console.error("Error occurred while calling chat api:", err);
      setError("Failed to get response. Please try again.");
      addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.message} ${styles[message.type]}`}
            >
              <div className={styles.messageContent}>
                {message.content}
              </div>
              <div className={styles.messageTime}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={styles.loadingIndicator}>
                <div className={styles.typingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
        </div>
        
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.inputStyle}
            placeholder="Type your question here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows={1}
          />
          <button 
            className={`${styles.submitButtonStyle} ${isLoading ? styles.disabled : ''}`}
            onClick={handleSubmit}
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
