import React from 'react';
import { UserSelectionModalProps } from '../common/types'

const UserSelectionModal = ({ users, onSelectUser, onClose }: UserSelectionModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a User</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => onSelectUser(user)}>
              {user.username}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserSelectionModal;