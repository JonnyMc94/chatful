import React from 'react';
import { UserSelectionModalProps } from '../common/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState }  from '../state/store';
import { setUsers, setSelectedUser } from '../state/userSlice';


const UserSelectionModal = ({ users, onSelectUser, onClose }: UserSelectionModalProps) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Select a User</h2>
        <ul className="mb-4 max-h-60 overflow-y-auto">
          {users.map(user => (
            <li
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
            >
              {user.username}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserSelectionModal;