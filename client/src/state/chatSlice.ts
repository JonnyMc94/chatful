import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Conversation } from '../common/types';
interface ChatState {
  messages: Message[];
  activeChatId: number | null;
  conversations: Conversation[];
}

const initialState: ChatState = {
  messages: [],
  activeChatId: null,
  conversations: [],
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
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
  },
});

export const { setMessages, addMessage, updateMessage, deleteMessage, setActiveChat, addConversation, setConversations } = chatSlice.actions;

export default chatSlice.reducer;
