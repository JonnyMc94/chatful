import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatContent from "../components/ChatContent";

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
