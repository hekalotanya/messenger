import { Chat } from '../typedefs/Chat';
import { API_URL } from './helpers';

export const getChats = async (userId: number): Promise<Chat[]> => {
  const chats = await fetch(`${API_URL}/chats/${userId}`);

  return chats.json();
};
