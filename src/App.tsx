import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MessageHolder from "./components/MessageHolder";
import MessageBox from "./components/MessageBox";
import SearchBar from "./components/SearchBar";
import ChatCard from "./components/ChatCard";
import ConfirmationModal from "./modals/ConfirmationModal";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // const user = {
  //   id : 2,
  //   username: "Harlei",
  //   email: 'harle_email@gmail.com',
  //   avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
  //   messages: [{
  //     senderID: 2,
  //     recipientID: 1,
  //     recipient: 'Jonathan',
  //     text: "Hello, Good Morning. This is an extra long string to ensure the formatting is correct",
  //     date: new Date()
  //   }],
  // }

  const modalProps = {
    title: "Confirm Action",
    message: "Are you sure you want to confirm action?",
    onConfirm: () => console.log("Confirming action..."),
    onCancel: () => console.log("Cancelled action"),
    isLogout: true,
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* <Sidebar />
          <Navbar /> */}
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<ChatPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
