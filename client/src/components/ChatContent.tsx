import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} from "../state/chatSlice";
import { setSelectedUser } from "../state/userSlice";
import axios from "axios";
import io from "socket.io-client";
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import UserSelectionModal from "../modals/UserSelectionModal";
import { decodeJWT } from "../utils/decodeJWT";
import { Message, User } from "../common/types";

const socket = io("http://localhost:3000");

const ChatContent = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const activeChatId = useSelector(
    (state: RootState) => state.chat.activeChatId
  );
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const dispatch = useDispatch();
  const currentUserId = decodeJWT()?.userId;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [displayUserModal, setDisplayUserModal] = useState<boolean>(false);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //useEffect for fetching data and socket listeners
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch users
        const usersResponse = await axios.get("http://localhost:3000/user/users");
        setUsers(usersResponse.data);

        // Fetch messages for the active chat
        if (activeChatId) {
          const messagesResponse = await axios.get(
            `http://localhost:3000/chat/conversation/${activeChatId}`
          );
          dispatch(setMessages(messagesResponse.data));
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    // Socket listeners for real-time updates
    socket.on("newMessage", (message: Message) => {
      dispatch(addMessage(message));
    });

    socket.on("updateMessage", (updatedMessage) => {
      dispatch(updateMessage(updatedMessage));
    });

    socket.on("deleteMessage", (deletedMessage) => {
      dispatch(deleteMessage(deletedMessage));
    });

    // Cleanup socket listeners on unmount
    return () => {
      socket.off("newMessage");
      socket.off("updateMessage");
      socket.off("deleteMessage");
    };
  }, [activeChatId, dispatch]);

  // Scroll to bottom when messages or activeChatId change
  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChatId]);

  const handleSendMessage = async (message: string) => {
    if (!activeChatId) {
      console.error("No active chat to send a message to.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/chat/message", {
        senderId: currentUserId,
        recipientId: selectedUser?.id,
        message,
        conversationId: activeChatId,
      });
      console.log("Message sent:", response.data);

      // Emit the message to the server
      socket.emit("newMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-grow overflow-y-auto p-6">
        {messages.map((data, index) => (
          <MessageHolder key={index} message={data} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="sticky bottom-10 bg-white p-4">
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