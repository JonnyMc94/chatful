import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../state/userSlice';
import { RootState }  from '../state/store';
import SearchBar from "./SearchBar";
import ChatCard from "./ChatCard";
import UserSelectionModal from "../modals/UserSelectionModal";
import { User } from "../common/types";
import { decodeJWT } from "../utils/decodeJWT"

import io from 'socket.io-client';
import axios from "axios";


const socket = io('http://localhost:3000');

const Sidebar = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [loggedInUserID, setLoggedInUserId] = useState<number>(0);
  const [showUserModal, setShowUserModal] = useState<boolean>(false)
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
      <div className='w-full flex items-center'>
        <SearchBar />
        <button
          onClick={() => setShowUserModal(true)}
          className="bg-white h-full text-sm px-4 py-2 rounded-md text-gray-800 dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
          >
          New Chat
        </button>
      </div>
      <div className="w-full">
        {users
          .filter((user: User) => user.id !== loggedInUserID)
          .map((user: User) => (
            <ChatCard key={user.id} chatCardUser={user} />
          ))}
      </div>
      {showUserModal && (
        <UserSelectionModal
          users={users}
          onClose={() => setShowUserModal(false)}
          onSelectUser={(selectedUser) => {
            console.log('User selected:', selectedUser); // Placeholder for next implementation
            setShowUserModal(false);
          }}
        />
      )}
    </aside>
  );
};

export default Sidebar;