import React, { useEffect, useState } from "react";
import { setActiveChat, setMessages } from "../state/chatSlice";
import { setSelectedUser } from "../state/userSlice";
import { ChatCardProps } from "../common/types";
import { truncateText } from "../utils/text-manipulation";
import { decodeJWT } from "../utils/decodeJWT";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import axios from "axios";

const ChatCard = ({ conversation, isActive }: ChatCardProps) => {
  const loggedInUserID = decodeJWT()?.userId;
  const users = useSelector((state: RootState) => state.users.users);
  const [chatData, setChatData] = useState({
    senderName: "",
    avatar: "",
    lastMessage: conversation.lastMessage,
    updatedAt: new Date()
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Find the other user in the conversation
    const otherUserId =
      conversation.user1Id === loggedInUserID
        ? conversation.user2Id
        : conversation.user1Id;
    const otherUser = users.find((user) => user.id === otherUserId);

    if (otherUser) {
      setChatData({
        senderName: otherUser.username,
        avatar: otherUser.avatar,
        lastMessage: conversation.lastMessage,
        updatedAt: conversation.updatedAt
      });
    }
  }, [loggedInUserID, conversation, users]);

  const handleClick = () => {
    dispatch(setActiveChat(conversation.id));
    
    const foundUser = users.find(user => user.id === (conversation.user1Id === loggedInUserID ? conversation.user2Id : conversation.user1Id));
    if (foundUser) {
      dispatch(setSelectedUser(foundUser));
    }
  };

  return (
    <div
      className={`flex flex-row items-center w-full border bg-white p-4 cursor-pointer ${
        isActive ? "bg-gray-300" : ""
      }`}
      onClick={handleClick} // Handle chat selection
    >
      <div className="flex items-start">
        <img
          src={"https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex flex-col pl-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="text-3xl text-left text-slate-800">
            {chatData.senderName}
          </div>
          <span className="text-base text-slate-800">
            {new Date(chatData.updatedAt).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-xl text-left pt-2 lg:text-sm text-slate-800 line-clamp-1">
          {truncateText(chatData.lastMessage, 10)}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;