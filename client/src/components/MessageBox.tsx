import React from "react";
import { useState } from "react";

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(message)
  }

  return (
    <div className="flex items-center">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        id="first_name"
        className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter text here..."
        required
      />
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-2xl ml-2"
        onClick={onClick}
      >
        Send
      </button>
    </div>
  );
};

export default MessageBox;
