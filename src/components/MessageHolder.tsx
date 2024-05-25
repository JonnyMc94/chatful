import { MessageHolderProps } from '../common/types'

const MessageHolder = ({ message }: MessageHolderProps) => {

  const time = message.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const loggedInUserID: number = 1; 
  const userID: number = message.user.id;

  return (
    <>
    {userID === loggedInUserID && (
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-2 gap-1">
          <p className="text-left">{message.text}</p>
          <p className="flex text-xs justify-end">{time}</p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src={message.user.avatar}
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    )}
    {userID !== loggedInUserID && (
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src={message.user.avatar}
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
