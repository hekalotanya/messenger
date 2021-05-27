import { API_URL } from './helpers';

export const getChats = async (userId: number): Promise<any> => {
  const chats = await fetch(`${API_URL}/chats/${userId}`);

  return chats.json();
};
