import React, { useState } from 'react';

interface MessageBoxProps {
  onSendMessage: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return; // Do not send empty messages
    }
    onSendMessage(message);
    setMessage(""); // Clear the input field
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-200">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-grow p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageBox;