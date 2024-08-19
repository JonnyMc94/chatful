import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Log when connected to the server
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen for new messages from the server
    socket.on("message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit("message", message); // Send the message to the server
    setMessage(""); // Clear the input field
  };

  return (
    <div className="flex items-center">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        id="message_input"
        className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter text here..."
        aria-label="Message input"
        required
      />
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-2xl ml-2"
        onClick={onClick}
        aria-label="Send message"
      >
        Send
      </button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;