import React, { useState } from 'react';

interface MessageBoxProps {
  onSendMessage: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim() === "") {
      return; // Do not send empty messages
    }
    onSendMessage(message);
    setMessage(""); // Clear the input field
  };

  return (
    <form className="flex items-center p-4 mt-6 border-t border-gray-200" onSubmit={handleSendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-grow p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Send
      </button>
    </form>
  );
};

export default MessageBox;