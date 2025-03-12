import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../common/types';

interface UserState {
  users: User[],
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null, // Initialize selectedUser as null

};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User>){
      state.selectedUser = action.payload;
    }
  },
});

export const { setUsers, setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
