import chatReducer, { setMessages, updateMessage, deleteMessage } from './chatSlice';
import { Message } from '../common/types';

describe('chatSlice', () => {
  const initialState = {
    messages: [] as Message[],
    activeChatId: null,
  };

  const mockMessage: Message = {
    id: 1,
    senderId: 1,
    recipientId: 2,
    message: 'Hello',
    timestamp: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('should return the initial state', () => {
    expect(chatReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle setMessages', () => {
    const newState = chatReducer(initialState, setMessages([mockMessage]));
    expect(newState.messages).toHaveLength(1);
    expect(newState.messages[0]).toEqual(mockMessage);
  });

  test('should handle updateMessage', () => {
    const stateWithMessage = {
      messages: [mockMessage],
      activeChatId: null,
    };

    const updatedMessage: Message = {
      ...mockMessage,
      message: 'Updated message',
    };

    const newState = chatReducer(stateWithMessage, updateMessage(updatedMessage));
    expect(newState.messages[0].message).toBe('Updated message');
  });

  test('should handle deleteMessage', () => {
    const stateWithMessage = {
      messages: [mockMessage],
      activeChatId: null,
    };

    const newState = chatReducer(stateWithMessage, deleteMessage(mockMessage));
    expect(newState.messages).toHaveLength(0);
  });
});
