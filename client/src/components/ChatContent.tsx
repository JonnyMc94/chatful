import { MessageHolderProps, User } from '../common/types';
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import UserSelectionModal from '../modals/UserSelectionModal';
import { decodeJWT } from "../utils/decodeJWT"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); 

const ChatContent = () => {
  const [messages, setMessages] = useState<MessageHolderProps[]>([]);
  const [pendingMessage, setPendingMessage] = useState<string>("")
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
          msg.message.senderId === updatedMessage.message.senderId &&
          msg.message.createdAt === updatedMessage.message.createdAt
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
              msg.message.senderId === deletedMessage.message.senderId &&
              msg.message.createdAt === deletedMessage.message.createdAt
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

  useEffect(() => {
    if (selectedUser && pendingMessage) {
      console.log("Sending pending message:", pendingMessage);
      handleSendMessage(pendingMessage);
      setPendingMessage("");
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    console.log("User selected:", user);
    setSelectedUser(user);
    setDisplayUserModal(false);
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedUser) {
      console.log("No user selected, setting pending message:", message);
      setPendingMessage(message);
      setDisplayUserModal(true);
    } else {
      try {
        console.log("Sending message:", message);
        const response = await axios.post('http://localhost:3000/chat/message', {
          senderId: decodeJWT()?.userId,
          recipientId: selectedUser.id,
          message: message
        });
        console.log("Message sent:", response.data);
        socket.emit("message", response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-stretch flex-grow overflow-y-auto p-6">
      {messages.map((data, index) => (
        <MessageHolder key={index} message={data.message}/>
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