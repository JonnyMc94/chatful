import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MessageHolder from "./components/MessageHolder";
import MessageBox from './components/MessageBox'
import SearchBar from './components/SearchBar'

function App() {
  const message = {
    id: 1,
    text: "Hello, World! This my first message and Im just testing if the message box will expand with more text.",
    sender: {
      id: 2,
      username: "user1",
      email: "",
    },
    time: "18.05",
    date: new Date(),
    avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <MessageHolder message={message} /> */}
        {/* <MessageBox /> */}
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
