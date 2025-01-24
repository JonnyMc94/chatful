import { MessageHolderProps, User } from '../common/types';
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const ChatContent = () => {
  const [messages, setMessages] = useState<MessageHolderProps[]>([]);

  useEffect(() => {
    // Listen for new messages
    socket.on('newMessage', (message: MessageHolderProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for updated messages
    socket.on('updateMessage', (updatedMessage: MessageHolderProps) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.message.senderID === updatedMessage.message.senderID &&
          msg.message.date === updatedMessage.message.date
            ? updatedMessage
            : msg
        )
      );
    });

    // Listen for deleted messages
    socket.on('deleteMessage', (deletedMessage: MessageHolderProps) => {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) =>
            !(
              msg.message.senderID === deletedMessage.message.senderID &&
              msg.message.date === deletedMessage.message.date
            )
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.off('newMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
    };
  }, []);

  return (
    <div className="flex flex-col items-stretch flex-grow overflow-y-auto p-6">
      {messages.map((data, index) => (
        <MessageHolder key={index} message={data.message} sender={data.sender} />
      ))}
      <div className="mt-auto">
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatContent;