interface Message {
  id: number;
  text: string;
  sender: Sender;
  time: string;
  date: Date;
  avatar: string;
}

interface Sender {
  id: number;
  username: string;
  email: string;
}

interface MessageHolderProps {
  message: Message;
}

const MessageHolder = ({ message }: MessageHolderProps) => {

  const time = message.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const loggedInUserID: number = 1; 
  const senderID: number = message.sender.id;

  return (
    <>
    {senderID === loggedInUserID && (
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-2 gap-1">
          <p className="text-left">{message.text}</p>
          <p className="flex text-xs justify-end">{time}</p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src={message.avatar}
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    )}
    {senderID !== loggedInUserID && (
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src={message.avatar}
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-2 gap-1">
          <p className="text-left">{message.text}</p>
          <p className="flex text-xs justify-end">{time}</p>
        </div>
      </div>
    )}
    
  </>
  )
};

export default MessageHolder;
