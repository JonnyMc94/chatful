import { Message, User } from '../common/types';
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import UserSelectionModal from '../modals/UserSelectionModal';
import { decodeJWT } from "../utils/decodeJWT";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage, updateMessage, deleteMessage } from '../state/chatSlice';
import { setSelectedUser } from '../state/userSlice';
import { RootState } from '../state/store';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:3000'); 

const ChatContent = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const [users, setUsers] = useState<User[]>([]);
  const [displayUserModal, setDisplayUserModal] = useState<boolean>(false);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);

  const dispatch = useDispatch();
  const currentUserId = decodeJWT()?.userId;
  
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

    socket.on('newMessage', (message: Message) => {
      dispatch(addMessage(message));
    });

    socket.on('updateMessage', (updatedMessage) => {
      dispatch(updateMessage(updatedMessage));
    });

    socket.on('deleteMessage', (deletedMessage) => {
      dispatch(deleteMessage(deletedMessage));
    });

    return () => {
      socket.off('newMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
    };
  }, [dispatch]);

  useEffect(() => {
    if (activeChatId) {
      // Fetch messages for the active chat
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/chat/conversation/${activeChatId}`);
          dispatch(setMessages(response.data));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [activeChatId, dispatch]);

  const handleSendMessage = async (message: string) => {
    if (!activeChatId) {
      console.error("No active chat to send a message to.");
      return;
    }

    try {
      console.log("Sending message:", message);
      const response = await axios.post('http://localhost:3000/chat/message', {
        senderId: currentUserId,
        recipientId: selectedUser?.id,
        message,
        conversationId: activeChatId,
      });
      console.log("Message sent:", response.data);
      socket.emit("newMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col items-stretch flex-grow overflow-y-auto p-6">
      {messages.map((data, index) => (
        <MessageHolder key={index} message={data}/>
      ))}
      <div className="mt-auto">
        <MessageBox onSendMessage={handleSendMessage} />
      </div>
      {displayUserModal && (
        <UserSelectionModal
          users={users}
          onSelectUser={(user) => dispatch(setSelectedUser(user))}
          onClose={() => setDisplayUserModal(false)}
        />
      )}
    </div>
  );
};

export default ChatContent;