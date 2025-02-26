import React, { useEffect, useState } from "react";
import { ChatCardProps } from "../common/types";
import { truncateText } from "../utils/text-manipulation";
import { decodeJWT } from "../utils/decodeJWT";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
// import axios from "axios";

const ChatCard = ({ conversation, isActive }: ChatCardProps) => {
  const loggedInUserID = decodeJWT()?.userId;
  const users = useSelector((state: RootState) => state.users.users);
  const [chatData, setChatData] = useState({
    senderName: "",
    avatar: "",
    lastMessage: conversation.lastMessage,
  });

  useEffect(() => {
    // Find the other user in the conversation
    const otherUserId = conversation.user1Id === loggedInUserID ? conversation.user2Id : conversation.user1Id;    
    const otherUser = users.find(user => user.id === otherUserId);    

    if (otherUser) {
      setChatData({
        senderName: otherUser.username,
        avatar: otherUser.avatar,
        lastMessage: conversation.lastMessage,
      });
    }
  }, [loggedInUserID, conversation, users]);

  return (
    <div
      className={`flex flex-row items-center w-full border bg-white p-4 cursor-pointer ${
        isActive ? "bg-gray-300" : ""
      }`}
    >
      <div className="rounded-full flex items-center justify-center ml-2">
        <img src={chatData.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
      </div>
      <div className="flex flex-col pl-6 gap-3 flex-grow">
        <div className="flex justify-between items-center">
          <div className="text-3xl text-left text-slate-800">{chatData.senderName}</div>
        </div>
        <p className="text-xl text-left lg:text-sm text-slate-800 line-clamp-1">
          {truncateText(chatData.lastMessage, 10)}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
