// User, Avatar, last message sent, time it was sent
import { useState, useEffect } from "react";
import { Message, User } from "../common/types";
import { truncateText } from "../utils/text-manipulation";

interface ChatCardProps {
  chatCardUser: User;
}

const ChatCard = ({ chatCardUser }: ChatCardProps) => {
  const loggedInUserID: number = 1;
  const [lastMessage, setLastMessage] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [senderName, setSendername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (chatCardUser.messages === undefined) {
      return;
    }

    const messages: Message[] = chatCardUser.messages;

    messages.forEach((message) => {
      const recipientID = message.recipientID;
      if (recipientID === loggedInUserID) {
        setLastMessage(message.text);
        setTime(
          message.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setSendername(chatCardUser.username);
        setAvatar(chatCardUser.avatar);
      }
    });
  }, []);

  return (
    <div className="flex flex-row items-center w-full shadow-2xl bg-blue-400 p-4">
      <div className="rounded-full flex items-center justify-center ml-2">
        <img src={avatar} alt="My Avatar" className="w-16 h-16 rounded-full" />
      </div>
      <div className="flex flex-col pl-6 gap-3 flex-grow">
        <div className="flex justify-between items-center">
          <div className="text-3xl text-left text-slate-800">{senderName}</div>
          <span className="text-base text-slate-800">{time}</span>
        </div>
        <p className="text-xl text-left lg:text-sm text-slate-800 line-clamp-1">
          {truncateText(lastMessage, 10)}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
