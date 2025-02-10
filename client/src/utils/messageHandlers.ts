import { Message } from "../common/types";

export const handleNewMessage = (
  message: Message,
  loggedInUserID: number,
  chatCardUser: any,
  setChatData: React.Dispatch<React.SetStateAction<any>>
) => {
  if (message.recipientId === loggedInUserID) {
    setChatData({
      lastMessage: message.message,
      time: new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderName: chatCardUser.username,
      avatar: chatCardUser.avatar,
    });
  }
};