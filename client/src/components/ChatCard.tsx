import React, { useState, useEffect, useMemo, useRef } from "react";
import { Message, ChatCardProps } from "../common/types";
import { truncateText } from "../utils/text-manipulation";
import { decodeJWT } from "../utils/decodeJWT"
import { handleNewMessage } from "../utils/messageHandlers";
import io, { Socket } from "socket.io-client";


const ChatCard = ({ chatCardUser }: ChatCardProps) => {
  const { username, avatar, messages } = chatCardUser;
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const [chatData, setChatData] = useState({
    lastMessage: "",
    time: "",
    senderName: username,
    avatar: avatar,
  });

  useEffect(() => {
    const id = decodeJWT()?.userId
    setLoggedInUserId(id || 0)
  }, []);

  const initialChatData = useMemo(() => {
    if (!messages) return chatData;

    const lastMessage = messages.find(
      (message) => message.recipientId === loggedInUserID
    );

    if (lastMessage) {
      return {
        lastMessage: lastMessage.message,
        time: new Date(lastMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderName: username,
        avatar: avatar,
      };
    }

    return chatData;
  }, [chatData, messages, loggedInUserID, username, avatar]);

  useEffect(() => {
    setChatData(initialChatData);
  }, [initialChatData]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000"); // Adjust the URL as needed
    }

    const socket = socketRef.current;

    const handleNewMessageCallback = (message: Message) => handleNewMessage(message, loggedInUserID, chatCardUser, setChatData);
    const handleDeleteMessage = (message: Message) => {
      if (message.recipientId === loggedInUserID) {
        setChatData({
          lastMessage: "",
          time: "",
          senderName: username,
          avatar: avatar,
        });
      }
    };

    socket.on("newMessage", handleNewMessageCallback);
    socket.on("updateMessage", handleNewMessageCallback);
    socket.on("deleteMessage", handleDeleteMessage);

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserID, chatCardUser, username, avatar]);

  return (
    <div className="flex flex-row items-center w-full border bg-white p-4">
      <div className="rounded-full flex items-center justify-center ml-2">
        <img src={chatData.avatar} alt="My Avatar" className="w-16 h-16 rounded-full" />
      </div>
      <div className="flex flex-col pl-6 gap-3 flex-grow">
        <div className="flex justify-between items-center">
          <div className="text-3xl text-left text-slate-800">{chatData.senderName}</div>
          <span className="text-base text-slate-800">{chatData.time}</span>
        </div>
        <p className="text-xl text-left lg:text-sm text-slate-800 line-clamp-1">
          {truncateText(chatData.lastMessage, 10)}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;