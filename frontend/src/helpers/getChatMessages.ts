import { ChatMessage } from '../typedefs/ChatMessage';
import { API_URL } from './helpers';

export const getChatMessages = async (chatId: number): Promise<ChatMessage[]> => {
  const chats = await fetch(`${API_URL}/chat/${chatId}`);

  return chats.json();
};
