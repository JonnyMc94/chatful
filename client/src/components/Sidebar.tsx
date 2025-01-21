import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { User } from "../common/types";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Sidebar = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch initial user data
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users'); // Adjust the URL as needed
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Listen for real-time updates
    socket.on('newMessage', (newMessage) => {
      setUsers((prevUsers) => {
        return prevUsers.map(user => {
          if (user.id === newMessage.userId) {
            return {
              ...user,
              messages: [...(user.messages || []), newMessage]
            };
          }
          return user;
        });
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);

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