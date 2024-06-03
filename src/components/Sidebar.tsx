import React from "react";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { User } from "../common/types";
import WhatsAppBG from "../public/whatsapp-web.png";

const Sidebar = () => {
  const users: User[] = [
    {
      id: 2,
      username: "Harlei",
      email: "harle_email@gmail.com",
      avatar:
        "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      messages: [
        {
          senderID: 2,
          recipientID: 1,
          recipient: "Jonathan",
          text: "Hello, Good Morning. This is an extra long string to ensure the formatting is correct",
          date: new Date(),
        },
      ],
    },
    {
      id: 3,
      username: "David",
      email: "david_email@gmail.com",
      avatar:
        "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      messages: [
        {
          senderID: 2,
          recipientID: 1,
          recipient: "Jonathan",
          text: "Hello, Good Morning. This is an extra long string to ensure the formatting is correct. even longer thant he last to double check the formatting and even more to check more formatting",
          date: new Date(),
        },
      ],
    },
    {
      id: 4,
      username: "Tadhg",
      email: "tadhg_email@gmail.com",
      avatar:
        "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      messages: [
        {
          senderID: 2,
          recipientID: 1,
          recipient: "Jonathan",
          text: "Hello, Good Morning. This is a shorter text string.",
          date: new Date(),
        },
      ],
    },
  ];

  return (
<aside className="w-70 h-full flex flex-col bg-slate-800 bg-whatsapp">
  <div className='w-full'>
    <SearchBar />
  </div>
  <div className="w-full">
    {users.map((user) => (
      <ChatCard key={user.id} chatCardUser={user} />
    ))}
  </div>
</aside>
  );
};

export default Sidebar;
