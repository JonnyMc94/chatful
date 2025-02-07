import React from 'react';
import { UserSelectionModalProps } from '../common/types';

const UserSelectionModal = ({ users, onSelectUser, onClose }: UserSelectionModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Select a User</h2>
        <ul className="mb-4">
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
        <button onClick={onClose} className="p-2 bg-red-500 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default UserSelectionModal;