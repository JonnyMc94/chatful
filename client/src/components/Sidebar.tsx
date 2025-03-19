import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setSelectedUser } from '../state/userSlice';
import { RootState }  from '../state/store';
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import UserSelectionModal from "../modals/UserSelectionModal";
import { User } from "../common/types";
import { decodeJWT } from "../utils/decodeJWT";
import io from 'socket.io-client';
import axios from "axios";
import { setActiveChat, addConversation, setConversations } from "../state/chatSlice";

const socket = io('http://localhost:3000');

const Sidebar = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser)
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const id = decodeJWT()?.userId;
    setLoggedInUserId(id || 0);
  }, []);

  useEffect(() => {
    // Fetch initial user data
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        const data = response.data.filter((user: User) => user.id !== loggedInUserID);
        dispatch(setUsers(data)); // Dispatch users to Redux
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Fetch initial conversation data
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chat/messages/${loggedInUserID}`);
        dispatch(setConversations(response.data)); // Dispatch conversations to Redux
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();

    // Listen for real-time updates
    socket.on('newMessage', (newMessage) => {
      const updatedUsers = users.map((user: User) => {
        if (user.id === newMessage.userId) {
          return {
            ...user,
            messages: [...(user.messages || []), newMessage]
          };
        }
        return user;
      });
      dispatch(setUsers(updatedUsers));
    });

    // Cleanup on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, [loggedInUserID, dispatch]);

  const handleCreateConversation = async (selectedUser: User) => {
    try {
      const response = await axios.post('http://localhost:3000/chat/conversation/create', {
        userId: loggedInUserID,
        recipientId: selectedUser.id,
      });
      console.log("Created Conversation:", response.data); // DEBUG: Check response
      const conversationId = response.data.id;
      dispatch(addConversation(response.data));
      dispatch(setActiveChat(conversationId));
      dispatch(setSelectedUser(selectedUser)); // Dispatch setSelectedUser
      setShowUserModal(false);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  return (
    <aside className="w-full h-full flex flex-col bg-slate-800 bg-whatsapp">
    <div className="w-full flex items-center">
      <SearchBar />
      <button
        onClick={() => setShowUserModal(true)}
        className="bg-white h-full text-sm px-4 py-2 rounded-md text-gray-800 dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
      >
        New Chat
      </button>
    </div>
    <div className="w-full overflow-y-auto">
      {conversations.map((conversation) => (
        <ChatCard
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeChatId}
        />
      ))}
    </div>
    {showUserModal && (
      <UserSelectionModal
        users={users}
        onClose={() => setShowUserModal(false)}
        onSelectUser={(selectedUser) => {
          handleCreateConversation(selectedUser);
        }}
      />
    )}
  </aside>
  );
};

export default Sidebar;