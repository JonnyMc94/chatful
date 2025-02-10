import React from 'react';
import { Message } from '../common/types';

interface MessageHolderProps {
  message: Message;
}

const MessageHolder: React.FC<MessageHolderProps> = ({ message }) => {
  const { senderId, recipientId, message: text, timestamp } = message;

  return (
    <div className="message-holder">
      <div className="message-header">
        <span className="message-sender">{senderId}</span>
        <span className="message-recipient">{recipientId}</span>
        <span className="message-date">
          {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Unknown time'}
        </span>
      </div>
      <div className="message-body">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MessageHolder;