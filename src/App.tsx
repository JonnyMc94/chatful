import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MessageHolder from "./components/MessageHolder";
import MessageBox from './components/MessageBox'
import SearchBar from './components/SearchBar'
import ChatCard from './components/ChatCard'
import ConfirmationModal from "./pages/ConfirmationModal";
import LoginPage from "./pages/LoginPage";

function App() {
  

  const user = {
    id : 2,
    username: "Harlei",
    email: 'harle_email@gmail.com',
    avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    messages: [{
      senderID: 2,
      recipientID: 1,
      recipient: 'Jonathan',
      text: "Hello, Good Morning. This is an extra long string to ensure the formatting is correct",
      date: new Date()
    }],
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <MessageHolder message={message} /> */}
        {/* <MessageBox /> */}
        {/* <SearchBar /> */}
        {/* <ChatCard chatCardUser={user}/> */}
        {/* <ConfirmationModal /> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
