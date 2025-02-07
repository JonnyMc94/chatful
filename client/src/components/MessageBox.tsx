import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import UserSelectionModal from '../modals/UserSelectionModal';
import { User } from '../common/types'
import axios from "axios";


const socket = io("http://localhost:3000");

const MessageBox = () => {
  const [message, setMessage] = useState<string>("");
  // eslint-disable-next-line
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [displayUserModal, setDisplayUserModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        console.log(response)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

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

  const handleSendMessage = () => {
    if (!selectedUser) {
      setDisplayUserModal(true);
    } else {
      socket.emit("message", { recipientId: selectedUser.id, message });
      setMessage(""); // Clear the input field
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDisplayUserModal(false);
    // Proceed with sending the message
    socket.emit("message", { recipientId: user.id, message });
    setMessage(""); // Clear the input field
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
      {displayUserModal && (
        <UserSelectionModal
          users={users}
          onSelectUser={handleUserSelect}
          onClose={() => setDisplayUserModal(false)}
        />
      )}
    </div>
  );
};

export default MessageBox;