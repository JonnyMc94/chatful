import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setSelectedUser } from "../state/userSlice";
import { RootState } from "../state/store";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import UserSelectionModal from "../modals/UserSelectionModal";
import { User, Conversation } from "../common/types";
import { decodeJWT } from "../utils/decodeJWT";
import io from "socket.io-client";
import axios from "axios";
import {
  setActiveChat,
  addConversation,
  setConversations,
} from "../state/chatSlice";

const socket = io("http://localhost:3000");

const Sidebar = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const dispatch = useDispatch();

  const fetchInitialData = async () => {
    try {
      const id = decodeJWT()?.userId;
      setLoggedInUserId(id || 0);

      // Fetch conversations
      const conversationsResponse = await axios.get(
        `http://localhost:3000/chat/messages/${id}`
      );
      const conversations = conversationsResponse.data;
      dispatch(setConversations(conversations));

      // Collect all user IDs from the conversations
      const userIds = new Set(
        conversations.flatMap((conversation: Conversation) => [
          conversation.user1Id,
          conversation.user2Id,
        ])
      );

      // Fetch all users involved in the conversations
      const usersResponse = await axios.get("http://localhost:3000/user/users");
      const allUsers = usersResponse.data.filter((user: User) =>
        userIds.has(user.id)
      );
      dispatch(setUsers(allUsers));

      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setIsLoading(false); // Ensure loading is stopped even on error
    }
  };

  // Fetch data once on component mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    // console.log("Users:", users);
    // console.log("Conversations:", conversations);
  }, [users, conversations]); // Runs whenever users or conversations change

  // Handle real-time updates
  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === newMessage.conversationId) {
          return {
            ...conversation,
            lastMessage: newMessage.message,
            timestamp: newMessage.timestamp,
            isUnread: true, // Mark as unread
          };
        }
        return conversation;
      });
      dispatch(setConversations(updatedConversations));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, conversations]); // Only re-run when conversations change

  const handleCreateConversation = async (selectedUser: User) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/chat/conversation/create",
        {
          userId: loggedInUserID,
          recipientId: selectedUser.id,
        }
      );
      const conversationId = response.data.id;
      dispatch(addConversation(response.data));
      dispatch(setActiveChat(conversationId));
      dispatch(setSelectedUser(selectedUser));
      setShowUserModal(false);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

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