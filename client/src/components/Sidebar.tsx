import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../state/userSlice';
import { RootState }  from '../state/store';
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import { User } from "../common/types";
import { decodeJWT } from "../utils/decodeJWT"

import io from 'socket.io-client';
import axios from "axios";


const socket = io('http://localhost:3000');

const Sidebar = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const id = decodeJWT()?.userId
    setLoggedInUserId(id || 0)
  }, []);

  useEffect(() => {
    // Fetch initial user data
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/users');
        const data = response.data.filter((user: User) => user.id !== loggedInUserID);
        dispatch(setUsers(data)); // Dispatch users to Redux
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Listen for real-time updates
    socket.on('newMessage', (newMessage) => {
      const updatedUsers = users.map((user: User) => {
        if (user.id === newMessage.userId) {
          return {
            ...user,
            messages: [...(user.messages || []), newMessage]
          };
        }
        return user;
      });
      dispatch(setUsers(updatedUsers));
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
        {users.map((user: User) => (
          <ChatCard key={user.id} chatCardUser={user} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;