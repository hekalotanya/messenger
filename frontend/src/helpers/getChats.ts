import { API_URL } from './helpers';

export const getChats = async (userId: number): Promise<any> => {
  const chats = await fetch(`${API_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
    }),
  });

  return chats.json();
};
