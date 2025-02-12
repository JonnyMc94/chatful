import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../common/types';

interface ChatState {
  messages: Message[];
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
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    updateMessage(state, action: PayloadAction<Message>) {
        state.messages = state.messages.map((msg) =>
          msg.senderId === action.payload.senderId &&
          msg.createdAt === action.payload.createdAt
            ? action.payload
            : msg
        );
      },
    deleteMessage(state, action: PayloadAction<Message>) {
        state.messages = state.messages.filter(
          (msg) =>
            !(
              msg.senderId === action.payload.senderId &&
              msg.createdAt === action.payload.createdAt
            )
        );
      },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setActiveChat(state, action: PayloadAction<number | null>) {
      state.activeChatId = action.payload;
    },
  },
});

export const { setMessages, addMessage, updateMessage, deleteMessage, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
