import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatContent from "../components/ChatContent";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <Navbar />
      <div className="flex flex-grow mt-22">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 flex flex-col h-full">
          <ChatContent />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
