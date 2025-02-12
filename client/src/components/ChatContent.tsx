import { MessageHolderProps, User } from '../common/types';
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import UserSelectionModal from '../modals/UserSelectionModal';
import { decodeJWT } from "../utils/decodeJWT"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage, setActiveChat, updateMessage, deleteMessage } from '../state/chatSlice';
import { RootState } from '../state/store';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); 

const ChatContent = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const [pendingMessage, setPendingMessage] = useState<string>("")
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [displayUserModal, setDisplayUserModal] = useState<boolean>(false);

  const dispatch = useDispatch()

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

    socket.on('newMessage', (message: MessageHolderProps) => {
      dispatch(addMessage(message)); // Dispatch message to Redux
    });
  

    // Listen for updated messages
    socket.on('updateMessage', (updatedMessage) => {
      dispatch(updateMessage(updatedMessage));
    });

    // Listen for deleted messages
    socket.on('deleteMessage', (deletedMessage) => {
      dispatch(deleteMessage(deletedMessage));
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
    dispatch(setActiveChat(user.id));
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