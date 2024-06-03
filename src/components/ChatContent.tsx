import { MessageHolderProps, User } from '../common/types'
import MessageHolder from "./MessageHolder";
import MessageBox from "./MessageBox";


const ChatContent = () => {
  const dummyMessages = [
    {
      message: {
        senderID: 1,
        recipientID: 2,
        recipient: "User2",
        text: "Hello, how are you?",
        date: new Date(),
      },
      sender: {
        id: 1,
        username: "User1",
        email: "user1@example.com",
        avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      },
    },
    {
      message: {
        senderID: 2,
        recipientID: 1,
        recipient: "User1",
        text: "I'm good, thanks! How about you?",
        date: new Date(),
      },
      sender: {
        id: 2,
        username: "User2",
        email: "user2@example.com",
        avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      },
    },
    {
      message: {
        senderID: 1,
        recipientID: 2,
        recipient: "User2",
        text: "I'm doing well, thank you!",
        date: new Date(),
      },
      sender: {
        id: 1,
        username: "User1",
        email: "user1@example.com",
        avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      },
    },
  ];

  return (
    <div className="flex flex-col items-stretch flex-grow overflow-y-auto p-6">
      {dummyMessages.map((data, index) => (
        <MessageHolder key={index} message={data.message} sender={data.sender} />
      ))}
      <div className="mt-auto">
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatContent;