import { MessageHolderProps, User } from '../common/types'

interface MessageHolderPropsWithSender extends MessageHolderProps {
  sender: User;
}

const MessageHolder = ({ message, sender }: MessageHolderPropsWithSender) => {

  const time = message.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const loggedInUserID: number = 1; 
  const senderID: number = sender.id;

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
            src={sender.avatar}
            alt="Sender's Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    )}
    {senderID !== loggedInUserID && (
      <div className="flex justify-start mb-4 cursor-pointer">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src={sender.avatar}
            alt="Sender's Avatar"
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