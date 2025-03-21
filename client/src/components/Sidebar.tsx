import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSelectedUser } from "../state/userSlice";
import { RootState } from "../state/store";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import UserSelectionModal from "../modals/UserSelectionModal";
import { User } from "../common/types";
import { decodeJWT } from "../utils/decodeJWT";
import io from "socket.io-client";
import axios from "axios";
import { setActiveChat, addConversation, setConversations } from "../state/chatSlice";

const socket = io("http://localhost:3000");

const Sidebar = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Fetch conversations and users
  const fetchInitialData = async () => {
    try {
      const id = decodeJWT()?.userId;
      setLoggedInUserId(id || 0);

      // Fetch users
      const usersResponse = await axios.get("http://localhost:3000/user/users");
      const filteredUsers = usersResponse.data.filter((user: User) => user.id !== id);
      dispatch(setUsers(filteredUsers));

      // Fetch conversations
      const conversationsResponse = await axios.get(
        `http://localhost:3000/chat/messages/${id}`
      );
      dispatch(setConversations(conversationsResponse.data));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();

    // Listen for real-time updates
    socket.on("newMessage", (newMessage) => {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === newMessage.conversationId) {
          return {
            ...conversation,
            lastMessage: newMessage.message,
            timestamp: newMessage.timestamp,
          };
        }
        return conversation;
      });
      dispatch(setConversations(updatedConversations));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, conversations]);

  const handleCreateConversation = async (selectedUser: User) => {
    try {
      const response = await axios.post("http://localhost:3000/chat/conversation/create", {
        userId: loggedInUserID,
        recipientId: selectedUser.id,
      });
      const conversationId = response.data.id;
      dispatch(addConversation(response.data));
      dispatch(setActiveChat(conversationId));
      dispatch(setSelectedUser(selectedUser));
      setShowUserModal(false);
    } catch (error) {
      console.error("Error creating conversation:", error);
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