import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatContent from "../components/ChatContent";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <Navbar />
      <div className="flex flex-grow mt-22">
        <Sidebar />
        <ChatContent />
      </div>
    </div>
  );
};

export default ChatPage;
