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
    updateMessage(state, action: PayloadAction<MessageHolderProps>) {
        state.messages = state.messages.map((msg) =>
          msg.message.senderId === action.payload.message.senderId &&
          msg.message.createdAt === action.payload.message.createdAt
            ? action.payload
            : msg
        );
      },
    deleteMessage(state, action: PayloadAction<MessageHolderProps>) {
        state.messages = state.messages.filter(
          (msg) =>
            !(
              msg.message.senderId === action.payload.message.senderId &&
              msg.message.createdAt === action.payload.message.createdAt
            )
        );
      },
    addMessage(state, action: PayloadAction<MessageHolderProps>) {
      state.messages.push(action.payload);
    },
    setActiveChat(state, action: PayloadAction<number | null>) {
      state.activeChatId = action.payload;
    },
  },
});

export const { setMessages, addMessage, updateMessage, deleteMessage, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
