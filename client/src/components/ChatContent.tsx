import { MessageHolderProps, User } from '../common/types';
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import UserSelectionModal from '../modals/UserSelectionModal';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); 

const ChatContent = () => {
  const [messages, setMessages] = useState<MessageHolderProps[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [displayUserModal, setDisplayUserModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Listen for new messages
    socket.on('newMessage', (message: MessageHolderProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for updated messages
    socket.on('updateMessage', (updatedMessage: MessageHolderProps) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.message.senderID === updatedMessage.message.senderID &&
          msg.message.date === updatedMessage.message.date
            ? updatedMessage
            : msg
        )
      );
    });

    // Listen for deleted messages
    socket.on('deleteMessage', (deletedMessage: MessageHolderProps) => {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) =>
            !(
              msg.message.senderID === deletedMessage.message.senderID &&
              msg.message.date === deletedMessage.message.date
            )
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.off('newMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
    };
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDisplayUserModal(false);
  };

  const handleSendMessage = (message: string) => {
    if (!selectedUser) {
      setDisplayUserModal(true);
    } else {
      socket.emit("message", { recipientId: selectedUser.id, message });
    }
  };

  return (
    <div className="flex flex-col items-stretch flex-grow overflow-y-auto p-6">
      {messages.map((data, index) => (
        <MessageHolder key={index} message={data.message} sender={data.sender} />
      ))}
      <div className="mt-auto">
        <MessageBox onSendMessage={handleSendMessage} />
      </div>
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

export default ChatContent;