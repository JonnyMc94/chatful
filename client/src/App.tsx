import React from "react";
import "./App.css";
import ConfirmationModal from "./modals/ConfirmationModal";
import LoginPage from "./pages/LoginPage";
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
    title: "Logout Confirmation",
    message: "Are you sure you want to logout?",
    onConfirm: () => console.log("Confirming action..."),
    onCancel: () => console.log("Cancelled action"),
    isLogout: true,
    showModal: true,
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* <Sidebar />
          <Navbar /> */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<ConfirmationModal {...modalProps} />} />
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
