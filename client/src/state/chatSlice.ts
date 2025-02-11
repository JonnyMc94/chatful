import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageHolderProps } from '../common/types';

interface ChatState {
  messages: MessageHolderProps[];
  activeChatId: number | null;
}

const initialState: ChatState = {
  messages: [],
  activeChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<MessageHolderProps[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<MessageHolderProps>) {
      state.messages.push(action.payload);
    },
    setActiveChat(state, action: PayloadAction<number | null>) {
      state.activeChatId = action.payload;
    },
  },
});

export const { setMessages, addMessage, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
